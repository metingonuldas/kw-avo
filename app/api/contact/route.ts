import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    await resend.emails.send({
      from: process.env.CONTACT_FROM!,       // onboarding@resend.dev (local sandbox)
      to: process.env.CONTACT_TO!,           // Resend'de Test Recipient olan adresin
      subject: `Test İletişim Mesajı - ${name || "Anonim"}`,
      replyTo: email || undefined,           // <<<<<<<<<<  reply_to değil, replyTo
      html: `<p><b>Ad:</b> ${name || "-"}<br/><b>Email:</b> ${email || "-"}<br/><b>Mesaj:</b> ${message || "-"}</p>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}