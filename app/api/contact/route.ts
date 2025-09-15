// app/api/contact/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, office } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "alestaviyaorsa@gmail.com", // senin alıcı mail
      subject: `Yeni iletişim formu: ${name || "İsimsiz"}`,
      replyTo: email,
      html: `
        <p><b>Ad Soyad:</b> ${name || "-"}</p>
        <p><b>Email:</b> ${email || "-"}</p>
        <p><b>Ofis:</b> ${office || "-"}</p>
        <p><b>Mesaj:</b></p>
        <p>${message || "-"}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}