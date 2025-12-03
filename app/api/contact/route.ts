import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const SUBJECTS = [
  "Genel Bilgi",
  "Danışman Olmak İstiyorum",
  "Ofis / Randevu",
  "Basın / Medya",
  "Diğer",
] as const;
type Subject = (typeof SUBJECTS)[number];

// Yeni eklenen Ofis Seçenekleri
const OFFICES = ["KW Alesta", "KW Viya", "KW Orsa"] as const;
type Office = (typeof OFFICES)[number];

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();
    const phone = String(body?.phone || "").trim();
    const subject = (body?.subject as Subject) || "Genel Bilgi";
    // Yeni eklenen alan: Ofis seçimi (Opsiyonel olabilir, sadece danışmanlıkta zorunlu olabilir)
    const office = (body?.office as Office) || "Belirtilmemiş"; 
    
    const consent_terms = Boolean(body?.consent_terms);
    const consent_marketing = Boolean(body?.consent_marketing);

    // --- Sunucu doğrulamaları ---
    if (!name) return NextResponse.json({ error: "missing_name" }, { status: 400 });
    if (!email || !isEmail(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    if (!message) return NextResponse.json({ error: "missing_message" }, { status: 400 });
    if (!consent_terms) return NextResponse.json({ error: "consent_required" }, { status: 400 });
    if (phone && !/^\d{11}$/.test(phone)) return NextResponse.json({ error: "invalid_phone" }, { status: 400 });

    // Eğer konu "Danışman Olmak İstiyorum" ise ve ofis seçilmemişse hata döndürebiliriz (İsteğe bağlı)
    /*
    if (subject === "Danışman Olmak İstiyorum" && office === "Belirtilmemiş") {
       return NextResponse.json({ error: "missing_office" }, { status: 400 });
    }
    */

    const safeSubject = SUBJECTS.includes(subject) ? subject : "Genel Bilgi";

    // --- Modern HTML E-posta Şablonu ---
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f5; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
        .header { background-color: #ba0c2f; padding: 24px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
        .content { padding: 32px; }
        .intro { font-size: 16px; color: #52525b; margin-bottom: 24px; border-bottom: 1px solid #f4f4f5; padding-bottom: 16px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-bottom: 4px; display: block; }
        .value { font-size: 16px; color: #18181b; font-weight: 500; }
        .message-box { background-color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #ba0c2f; color: #334155; white-space: pre-wrap; margin-top: 8px; font-size: 15px; }
        .footer { background-color: #f4f4f5; padding: 20px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #e4e4e7; }
        .tag { display: inline-block; padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 600; background: #e4e4e7; color: #52525b; margin-right: 6px; }
        .tag-active { background: #dcfce7; color: #166534; }
        a { color: #ba0c2f; text-decoration: none; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Başlık -->
        <div class="header">
          <h1>KW Alesta • Viya • Orsa</h1>
        </div>
        
        <!-- İçerik -->
        <div class="content">
          <div class="intro">
            <strong>${name}</strong> web sitesi üzerinden yeni bir form gönderdi.
          </div>

          <div style="display: flex; gap: 20px;">
            <div class="field" style="flex: 1;">
              <span class="label">Ad Soyad</span>
              <div class="value">${name}</div>
            </div>
            <div class="field" style="flex: 1;">
              <span class="label">Telefon</span>
              <div class="value"><a href="tel:${phone}">${phone || "-"}</a></div>
            </div>
          </div>

          <div class="field">
            <span class="label">E-Posta</span>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>

          <div style="display: flex; gap: 20px;">
            <div class="field" style="flex: 1;">
              <span class="label">Konu</span>
              <div class="value">${safeSubject}</div>
            </div>
            <div class="field" style="flex: 1;">
              <span class="label">Tercih Edilen Ofis</span>
              <div class="value" style="color: #ba0c2f; font-weight: 700;">${office}</div>
            </div>
          </div>

          <div class="field">
            <span class="label">Mesaj</span>
            <div class="message-box">${message}</div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f4f4f5;">
            <span class="label" style="margin-bottom: 10px;">Yasal İzinler</span>
            <div>
              <span class="tag ${consent_terms ? 'tag-active' : ''}">
                KVKK: ${consent_terms ? "ONAYLI" : "RED"}
              </span>
              <span class="tag ${consent_marketing ? 'tag-active' : ''}">
                Pazarlama: ${consent_marketing ? "ONAYLI" : "RED"}
              </span>
            </div>
          </div>
        </div>

        <!-- Alt Bilgi -->
        <div class="footer">
          <p style="margin: 0;">Bu mesaj <strong>kwavo.net</strong> iletişim formundan gönderilmiştir.</p>
          <p style="margin: 5px 0 0 0;">${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const toRaw = process.env.CONTACT_TO || "";
    const toList = toRaw.split(",").map((s) => s.trim()).filter(Boolean);

    if (toList.length === 0) {
      console.error("CONTACT_TO .env boş");
      return NextResponse.json({ error: "server_config" }, { status: 500 });
    }

    await resend.emails.send({
      from: `KWAVO <${process.env.CONTACT_FROM || "iletisim@kwavo.net"}>`,
      to: toList,
      subject: `Yeni Talep: ${name} - ${safeSubject} (${office})`, // Konuya da ofisi ekledim
      html: htmlTemplate,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT API error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}