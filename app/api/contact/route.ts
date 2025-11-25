// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic"; // dev/edge cache'i zorlamasın

const SUBJECTS = [
  "Genel Bilgi",
  "Danışman Olmak İstiyorum",
  "Ofis / Randevu",
  "Basın / Medya",
  "Diğer",
] as const;
type Subject = (typeof SUBJECTS)[number];

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
    const consent_terms = Boolean(body?.consent_terms);        // KVKK/Şartlar
    const consent_marketing = Boolean(body?.consent_marketing); // opsiyonel

    // --- Sunucu doğrulamaları ---
    if (!name) {
      return NextResponse.json({ error: "missing_name" }, { status: 400 });
    }
    if (!email || !isEmail(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "missing_message" }, { status: 400 });
    }
    if (!consent_terms) {
      // KVKK/Şartlar işaretlenmeden gönderilmesin
      return NextResponse.json({ error: "consent_required" }, { status: 400 });
    }
    if (phone && !/^\d{11}$/.test(phone)) {
      // Telefon boş olabilir; doluysa tam 11 rakam olmalı (başındaki 0 dâhil)
      return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
    }

    const safeSubject = SUBJECTS.includes(subject) ? subject : "Genel Bilgi";

    // --- E-posta içeriği ---
    const lines = [
      `<p><strong>Ad Soyad:</strong> ${name}</p>`,
      `<p><strong>Email:</strong> ${email}</p>`,
      `<p><strong>Telefon:</strong> ${phone || "-"}</p>`,
      `<p><strong>Konu:</strong> ${safeSubject}</p>`,
      `<p><strong>Mesaj:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
      `<hr/>`,
      `<p style="font-size:12px;color:#666">
        KVKK/Şartlar onayı: ${consent_terms ? "EVET" : "HAYIR"}<br/>
        Pazarlama izni: ${consent_marketing ? "EVET" : "HAYIR"}
      </p>`,
    ].join("");

    const resend = new Resend(process.env.RESEND_API_KEY);
    const toRaw = process.env.CONTACT_TO || "";
    const toList = toRaw.split(",").map((s) => s.trim()).filter(Boolean);

    if (toList.length === 0) {
      console.error("CONTACT_TO .env boş");
      return NextResponse.json({ error: "server_config" }, { status: 500 });
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM || "onboarding@resend.dev",
      to: toList,
      subject: `Yeni iletişim formu: ${name}`,
      html: lines,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT API error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}