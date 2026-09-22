import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sendOpenAiLeadConversion } from "@/lib/openai-ads";

export const dynamic = "force-dynamic";

const PROPERTY_TYPES = ["Daire", "Villa / Müstakil Ev", "Arsa / Tarla", "İşyeri / Ticari", "Diğer"];
const SALE_TIMES = ["En kısa sürede", "1–3 ay içinde", "3–6 ay içinde", "Şimdilik araştırıyorum"];
const CONTACT_TIMES = ["En kısa sürede", "09:00–12:00", "12:00–17:00", "17:00 sonrası"];
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
    const phone = clean(body.phone, 30);
    const email = clean(body.email, 180).toLowerCase();
    const district = clean(body.district, 80);
    const propertyType = clean(body.property_type, 60);
    const saleTime = clean(body.sale_time, 60);
    const preferredTime = clean(body.preferred_time, 60);
    const startedAt = Number(body.form_started_at || 0);
    const eventId = clean(body.event_id, 80);
    // Existing sales forms without this field remain sales leads.
    const intent = body.property_intent === undefined ? "sell" : body.property_intent;
    if (intent !== "sell" && intent !== "rent") {
      return NextResponse.json({ error: "invalid_selection" }, { status: 400 });
    }
    const intentLabel = intent === "rent" ? "Kiraya Verme" : "Satış";

    if (body.website) return NextResponse.json({ ok: true });
    if (!startedAt || Date.now() - startedAt < 2500) {
      return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
    }
    if (!name || district.length < 2) return NextResponse.json({ error: "invalid_contact" }, { status: 400 });
    if (!/^[0-9+ ()-]{10,20}$/.test(phone)) return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!PROPERTY_TYPES.includes(propertyType) || !SALE_TIMES.includes(saleTime) || !CONTACT_TIMES.includes(preferredTime)) {
      return NextResponse.json({ error: "invalid_selection" }, { status: 400 });
    }
    if (!body.consent_terms) return NextResponse.json({ error: "consent_required" }, { status: 400 });

    const attribution = body.attribution || {};
    const campaignRows = [
      ["Kaynak", attribution.utm_source],
      ["Kanal", attribution.utm_medium],
      ["Kampanya", attribution.utm_campaign],
      ["Reklam İçeriği", attribution.utm_content],
      ["Anahtar Kelime", attribution.utm_term],
      ["GCLID", attribution.gclid],
      ["FBCLID", attribution.fbclid],
      ["Açılış Sayfası", attribution.landing_page],
      ["Yönlendiren", attribution.referrer],
    ].filter(([, value]) => value);

    const leadReference = createHash("sha256")
      .update(`${eventId}:${phone}:${district}`)
      .digest("hex")
      .slice(0, 12);

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#18181b">
        <div style="background:#ba0c2f;color:white;padding:22px;border-radius:12px 12px 0 0">
          <p style="margin:0 0 5px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px">Mülk Sahibi Lead'i</p>
          <h1 style="margin:0;font-size:22px">Yeni ${intentLabel} Görüşmesi Talebi</h1>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:0;padding:24px;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#71717a">Ad Soyad</td><td style="padding:8px 0;font-weight:bold">${html(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#71717a">Telefon</td><td style="padding:8px 0;font-weight:bold"><a href="tel:${html(phone)}">${html(phone)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#71717a">E-posta</td><td style="padding:8px 0">${html(email || "—")}</td></tr>
            <tr><td style="padding:8px 0;color:#71717a">İlçe</td><td style="padding:8px 0;font-weight:bold">${html(district)}</td></tr>
            <tr><td style="padding:8px 0;color:#71717a">Mülk Türü</td><td style="padding:8px 0">${html(propertyType)}</td></tr>
            <tr><td style="padding:8px 0;color:#71717a">İşlem Türü</td><td style="padding:8px 0;font-weight:bold">${intentLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#71717a">${intentLabel} Zamanı</td><td style="padding:8px 0">${html(saleTime)}</td></tr>
            <tr><td style="padding:8px 0;color:#71717a">Aranma Zamanı</td><td style="padding:8px 0">${html(preferredTime)}</td></tr>
          </table>
          <div style="margin-top:20px;padding:15px;background:#fff7ed;border-radius:10px;color:#9a3412">
            <strong>Operasyon notu:</strong> Çalışma saatlerinde ideal ilk temas süresi 5 dakika, en fazla 15 dakikadır.
          </div>
          <hr style="border:0;border-top:1px solid #e5e7eb;margin:22px 0" />
          <h2 style="font-size:16px;margin:0 0 10px">Reklam ve kaynak bilgisi</h2>
          ${campaignRows.length ? campaignRows.map(([label, value]) => `<p style="margin:7px 0"><strong>${html(label)}:</strong> ${html(value)}</p>`).join("") : "<p>Doğrudan / kaynak bilgisi yok</p>"}
          <p style="margin-top:18px;font-size:11px;color:#71717a">Lead referansı: ${leadReference} · Event ID: ${html(eventId)}</p>
        </div>
      </div>`;

    const recipients = (process.env.SELLER_LEAD_TO || process.env.CONTACT_TO || process.env.ADVISOR_LEAD_TO || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!recipients.length) return NextResponse.json({ error: "server_config" }, { status: 500 });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: `KWAVO <${process.env.CONTACT_FROM || "iletisim@kwavo.net"}>`,
      to: recipients,
      ...(email ? { replyTo: email } : {}),
      subject: `Yeni ${intentLabel} Talebi: ${name} — ${district} / ${propertyType}`,
      html: emailHtml,
    });

    if (result.error) throw new Error(result.error.message);

    if (body.measurement_consent === true && eventId) {
      try {
        await sendOpenAiLeadConversion({
          eventId,
          sourceUrl: clean(body.source_url, 1000),
          oppref: clean(attribution.oppref, 500),
          browserReference: clean(body.openai_browser_ref, 500),
          email,
          phone,
          ipAddress: ip,
          userAgent: clean(request.headers.get("user-agent"), 500),
        });
      } catch (conversionError) {
        // Lead ulaştı; ölçüm servisindeki hata formu başarısız göstermemeli.
        console.error("OpenAI Ads seller conversion error:", conversionError);
      }
    }

    return NextResponse.json({ ok: true, event_id: eventId, lead_reference: leadReference });
  } catch (error) {
    console.error("Seller lead error:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
