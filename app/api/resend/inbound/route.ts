import { NextResponse } from "next/server";
import { Resend, type WebhookEventPayload } from "resend";
import PostalMime from "postal-mime";

export const runtime = "nodejs";
export const maxDuration = 60;

const SOURCE = "iletisim@kwavo.net";
const DESTINATION = "alestaviyaorsa@gmail.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_INBOUND_API_KEY;
  const webhookSecret = process.env.RESEND_INBOUND_WEBHOOK_SECRET;
  if (!apiKey || !webhookSecret) {
    return NextResponse.json({ error: "inbound_not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  let event: WebhookEventPayload;
  try {
    event = resend.webhooks.verify({
      payload: await request.text(),
      headers: {
        id: request.headers.get("svix-id") || "",
        timestamp: request.headers.get("svix-timestamp") || "",
        signature: request.headers.get("svix-signature") || "",
      },
      webhookSecret,
    });
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type !== "email.received") {
    return NextResponse.json({ ignored: true });
  }
  if (!Array.isArray(event.data.to) || !event.data.to.some(
    (recipient) => recipient.trim().toLowerCase() === SOURCE,
  )) {
    return NextResponse.json({ ignored: true });
  }
  if (!event.data.email_id) {
    return NextResponse.json({ error: "missing_email_id" }, { status: 400 });
  }

  try {
    const { data: email, error: receiveError } = await resend.emails.receiving.get(event.data.email_id);
    if (receiveError || !email?.raw?.download_url) {
      return NextResponse.json({ error: "receive_failed" }, { status: 502 });
    }
    const raw = await fetch(email.raw.download_url, { signal: AbortSignal.timeout(20_000) });
    if (!raw.ok) return NextResponse.json({ error: "download_failed" }, { status: 502 });
    const parsed = await PostalMime.parse(await raw.arrayBuffer(), { attachmentEncoding: "base64" });
    const replyTo = email.reply_to?.length ? email.reply_to : [email.from];
    const { error } = await resend.emails.send({
      from: `KW Alesta Viya Orsa <${SOURCE}>`,
      to: DESTINATION,
      replyTo,
      subject: email.subject || "(Konusuz)",
      text: parsed.text || "",
      html: parsed.html || undefined,
      attachments: parsed.attachments.map((attachment) => ({
        filename: attachment.filename || "attachment",
        content: attachment.content as string,
        contentType: attachment.mimeType,
        contentId: attachment.contentId?.replace(/^<|>$/g, ""),
      })),
    }, { idempotencyKey: `inbound-forward/${event.data.email_id}` });

    if (error) {
      // Return a failure so Resend retries; never log email contents or credentials.
      console.error("Inbound forwarding failed", { name: error.name });
      return NextResponse.json({ error: "forward_failed" }, { status: 502 });
    }
    return NextResponse.json({ forwarded: true });
  } catch {
    return NextResponse.json({ error: "forward_unavailable" }, { status: 502 });
  }
}
