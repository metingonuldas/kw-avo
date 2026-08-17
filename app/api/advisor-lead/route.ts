import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const OFFICES = ["KW Alesta", "KW Viya", "KW Orsa", "Kararsızım"];
const EXPERIENCES = ["Deneyimim yok", "1 yıldan az", "1-3 yıl", "3 yıldan fazla"];
const TIMES = ["En kısa sürede", "Hafta içi 09:00-12:00", "Hafta içi 12:00-17:00", "Hafta içi 17:00 sonrası"];
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
    const name = clean(body.name, 100);
    const email = clean(body.email, 180).toLowerCase();
    const phone = clean(body.phone, 30);
    const office = clean(body.office, 40);
    const experience = clean(body.experience, 40);
    const preferredTime = clean(body.preferred_time, 60);
    const note = clean(body.note, 800);
    const startedAt = Number(body.form_started_at || 0);
    const eventId = clean(body.event_id, 80);

    if (body.website) return NextResponse.json({ ok: true });
    if (!startedAt || Date.now() - startedAt < 2500) return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "invalid_contact" }, { status: 400 });
    if (!/^[0-9+ ()-]{10,20}$/.test(phone)) return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
    if (!OFFICES.includes(office) || !EXPERIENCES.includes(experience) || !TIMES.includes(preferredTime)) {
      return NextResponse.json({ error: "invalid_selection" }, { status: 400 });
    }
    if (!body.consent_terms) return NextResponse.json({ error: "consent_required" }, { status: 400 });

    const attribution = body.attribution || {};
    const campaignRows = [
      ["Kaynak", attribution.utm_source], ["Kanal", attribution.utm_medium],
      ["Kampanya", attribution.utm_campaign], ["İçerik", attribution.utm_content],
      ["Anahtar Kelime", attribution.utm_term], ["GCLID", attribution.gclid],
      ["FBCLID", attribution.fbclid], ["Açılış Sayfası", attribution.landing_page],
      ["Yönlendiren", attribution.referrer],
    ].filter(([, value]) => value);

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#18181b">
        <div style="background:#ba0c2f;color:white;padding:22px;border-radius:12px 12px 0 0"><h1 style="margin:0;font-size:21px">Yeni Danışman Adayı</h1></div>
        <div style="border:1px solid #e5e7eb;border-top:0;padding:24px;border-radius:0 0 12px 12px">
          <p><strong>Ad Soyad:</strong> ${html(name)}</p><p><strong>Telefon:</strong> ${html(phone)}</p>
          <p><strong>E-posta:</strong> ${html(email)}</p><p><strong>Ofis:</strong> ${html(office)}</p>
          <p><strong>Deneyim:</strong> ${html(experience)}</p><p><strong>Uygun zaman:</strong> ${html(preferredTime)}</p>
          <p><strong>Not:</strong> ${html(note || "—")}</p>
          <p><strong>Pazarlama izni:</strong> ${body.consent_marketing ? "Evet" : "Hayır"}</p>
          <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0" />
          <h2 style="font-size:16px">Reklam kaynağı</h2>
          ${campaignRows.length ? campaignRows.map(([label, value]) => `<p><strong>${html(label)}:</strong> ${html(value)}</p>`).join("") : "<p>Doğrudan / kaynak bilgisi yok</p>"}
          <p style="font-size:11px;color:#71717a">Event ID: ${html(eventId)} · Lead hash: ${createHash("sha256").update(email).digest("hex").slice(0, 12)}</p>
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
      subject: `Yeni Danışman Adayı: ${name} — ${office}`,
      html: emailHtml,
    });

    if (result.error) throw new Error(result.error.message);
    return NextResponse.json({ ok: true, event_id: eventId });
  } catch (error) {
    console.error("Advisor lead error:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
