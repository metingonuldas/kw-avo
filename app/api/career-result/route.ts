import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PROFILES = ["D", "I", "S", "C"];
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max = 300) {
  return String(value || "").trim().slice(0, max);
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

    const email = clean(body.email, 180).toLowerCase();
    const phone = clean(body.phone, 30);
    const disc = body.disc && typeof body.disc === "object" ? body.disc : {};
    const primary = clean(disc.primary, 4);
    const secondary = clean(disc.secondary, 4);
    const scores = disc.scores && typeof disc.scores === "object"
      ? Object.fromEntries(
          Object.entries(disc.scores)
            .filter(([key]) => PROFILES.includes(clean(key, 2)))
            .map(([key, value]) => [clean(key, 2), Number(value) || 0]),
        )
      : undefined;

    if (!email && !phone) return NextResponse.json({ error: "invalid_contact" }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    if (phone && !/^[0-9+ ()-]{10,20}$/.test(phone)) return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
    if (!PROFILES.includes(primary)) return NextResponse.json({ error: "invalid_profile" }, { status: 400 });

    const attribution = body.attribution || {};

    if (!process.env.PORTAL_LEAD_URL || !process.env.PORTAL_LEAD_SECRET) {
      return NextResponse.json({ error: "server_config" }, { status: 500 });
    }

    try {
      const portalResponse = await fetch(process.env.PORTAL_LEAD_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-webhook-secret": process.env.PORTAL_LEAD_SECRET,
        },
        body: JSON.stringify({
          source_form: "career_compass",
          email, phone,
          consent_terms: true,
          disc: { primary, secondary: secondary || undefined, scores },
          attribution,
        }),
      });
      if (!portalResponse.ok) {
        console.error("Portal result sync failed:", portalResponse.status);
        return NextResponse.json({ error: "portal_error" }, { status: 502 });
      }
    } catch (portalError) {
      console.error("Portal result sync error:", portalError);
      return NextResponse.json({ error: "portal_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Career result error:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
