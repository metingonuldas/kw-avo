import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { createCareerAssistantPrompt } from "@/lib/career-assistant/prompt";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

type StyleKey = "D" | "I" | "S" | "C";
const STYLE_KEYS: StyleKey[] = ["D", "I", "S", "C"];
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max: number) {
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
  return current.count > 25;
}

export async function POST(request: Request) {
  const ip = clean(request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown", 80);
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return NextResponse.json({ error: "model_not_configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const rawMessages = Array.isArray(body.messages) ? body.messages.slice(-14) : [];
    const messages = rawMessages
      .map((message: unknown) => {
        const item = message && typeof message === "object" ? message as Record<string, unknown> : {};
        const role = item.role === "assistant" ? "assistant" as const : "user" as const;
        return { role, content: clean(item.content, 1600) };
      })
      .filter((message: { content: string }) => message.content);

    const rawContext = body.context && typeof body.context === "object"
      ? body.context as Record<string, unknown>
      : {};
    const primary = STYLE_KEYS.includes(rawContext.primary as StyleKey) ? rawContext.primary as StyleKey : "D";
    const secondary = STYLE_KEYS.includes(rawContext.secondary as StyleKey) ? rawContext.secondary as StyleKey : "I";
    const rawScores = rawContext.scores && typeof rawContext.scores === "object"
      ? rawContext.scores as Record<string, unknown>
      : {};
    const scores = Object.fromEntries(STYLE_KEYS.map((key) => [key, Math.max(0, Math.min(100, Number(rawScores[key]) || 0))])) as Record<StyleKey, number>;

    if (!messages.length) return NextResponse.json({ error: "message_required" }, { status: 400 });

    const result = streamText({
      model: google(process.env.CAREER_CHAT_MODEL || "gemini-3.6-flash"),
      system: createCareerAssistantPrompt({
        firstName: clean(rawContext.firstName, 50) || "Merhaba",
        primary,
        secondary,
        scores,
      }),
      messages,
      maxOutputTokens: 1600,
      providerOptions: {
        google: {
          thinkingConfig: { thinkingLevel: "low", includeThoughts: false },
        },
      },
    });

    return result.toTextStreamResponse({
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Career chat error:", error);
    return NextResponse.json({ error: "chat_failed" }, { status: 500 });
  }
}
