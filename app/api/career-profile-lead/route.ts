import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const EDUCATION = ["Lise", "Ön lisans", "Lisans", "Yüksek lisans", "Doktora", "Diğer"];
const GENDERS = ["Kadın", "Erkek", "Belirtmek istemiyorum", "Diğer"];
const ENTREPRENEURSHIP = ["Evet", "Hayır"];
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max = 300) {
  return String(value || "").trim().slice(0, max);
}

function html(value: unknown) {
  return clean(value, 1200)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function rateLimited(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 10 * 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

export async function POST(request: Request) {
  const ip = clean(request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown", 80);
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });

    const firstName = clean(body.first_name, 70);
    const lastName = clean(body.last_name, 70);
    const email = clean(body.email, 180).toLowerCase();
    const phone = clean(body.phone, 30);
    const birthDate = clean(body.birth_date, 10);
    const occupation = clean(body.occupation, 100);
    const city = clean(body.city, 70);
    const district = clean(body.district, 70);
    const education = clean(body.education, 40);
    const gender = clean(body.gender, 40);
    const entrepreneurship = clean(body.entrepreneurship, 10);
    const startedAt = Number(body.form_started_at || 0);

    if (!startedAt || Date.now() - startedAt < 1500) return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
    if (!firstName || !lastName || !occupation || !city || !district) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    if (!/^[0-9+ ()-]{10,20}$/.test(phone)) return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) return NextResponse.json({ error: "invalid_birth_date" }, { status: 400 });
    if (!EDUCATION.includes(education) || !GENDERS.includes(gender) || !ENTREPRENEURSHIP.includes(entrepreneurship)) {
      return NextResponse.json({ error: "invalid_selection" }, { status: 400 });
    }
    if (!body.consent_terms) return NextResponse.json({ error: "consent_required" }, { status: 400 });

    const attribution = body.attribution || {};
    const campaignRows = [
      ["Kaynak", attribution.utm_source], ["Kanal", attribution.utm_medium],
      ["Kampanya", attribution.utm_campaign], ["İçerik", attribution.utm_content],
      ["Anahtar Kelime", attribution.utm_term], ["Açılış Sayfası", attribution.landing_page],
      ["Yönlendiren", attribution.referrer],
    ].filter(([, value]) => value);

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#18181b">
        <div style="background:#1e1b1c;color:white;padding:22px;border-radius:12px 12px 0 0"><h1 style="margin:0;font-size:21px">Yeni Kariyer Pusulası Katılımcısı</h1></div>
        <div style="border:1px solid #e5e7eb;border-top:0;padding:24px;border-radius:0 0 12px 12px">
          <p><strong>Ad Soyad:</strong> ${html(firstName)} ${html(lastName)}</p>
          <p><strong>Telefon:</strong> ${html(phone)}</p><p><strong>E-posta:</strong> ${html(email)}</p>
          <p><strong>Doğum tarihi:</strong> ${html(birthDate)}</p><p><strong>Meslek:</strong> ${html(occupation)}</p>
          <p><strong>Konum:</strong> ${html(district)} / ${html(city)}</p>
          <p><strong>Eğitim:</strong> ${html(education)}</p><p><strong>Cinsiyet:</strong> ${html(gender)}</p>
          <p><strong>Daha önce girişimde bulundu mu?</strong> ${html(entrepreneurship)}</p>
          <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0" />
          <h2 style="font-size:16px">Reklam kaynağı</h2>
          ${campaignRows.length ? campaignRows.map(([label, value]) => `<p><strong>${html(label)}:</strong> ${html(value)}</p>`).join("") : "<p>Doğrudan / kaynak bilgisi yok</p>"}
        </div>
      </div>`;

    const recipients = (process.env.ADVISOR_LEAD_TO || process.env.CONTACT_TO || "")
      .split(",").map((value) => value.trim()).filter(Boolean);
    if (!recipients.length) return NextResponse.json({ error: "server_config" }, { status: 500 });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: `KWAVO <${process.env.CONTACT_FROM || "iletisim@kwavo.net"}>`,
      to: recipients,
      replyTo: email,
      subject: `Kariyer Pusulası Katılımcısı: ${firstName} ${lastName} — ${district}/${city}`,
      html: emailHtml,
    });

    if (result.error) throw new Error(result.error.message);

    // E-posta zaten gitti; portal senkronizasyonu başarısız olsa da ziyaretçinin
    // gönderimi başarısız sayılmamalı.
    if (process.env.PORTAL_LEAD_URL && process.env.PORTAL_LEAD_SECRET) {
      try {
        const portalResponse = await fetch(process.env.PORTAL_LEAD_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-webhook-secret": process.env.PORTAL_LEAD_SECRET,
          },
          body: JSON.stringify({
            source_form: "career_compass",
            name: `${firstName} ${lastName}`.trim(),
            email, phone,
            occupation, city, district, education,
            consent_terms: true,
            attribution,
          }),
        });
        if (!portalResponse.ok) {
          console.error("Portal lead sync failed:", portalResponse.status);
        }
      } catch (portalError) {
        console.error("Portal lead sync error:", portalError);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Career profile lead error:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
