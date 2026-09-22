import { createHash } from "node:crypto";

const DEFAULT_PIXEL_ID = "7yrR64Pby1j835dHz5Uumk";
const DEFAULT_SOURCE_URL = "https://www.kwavo.net/danisman-ol";

type LeadConversion = {
  eventId: string;
  sourceUrl: string;
  oppref?: string;
  browserReference?: string;
  email: string;
  phone: string;
  ipAddress?: string;
  userAgent?: string;
};

function sha256(value: string) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function safeSourceUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && (url.hostname === "kwavo.net" || url.hostname === "www.kwavo.net")) {
      return url.toString();
    }
  } catch {
    // Use the known conversion page when the client URL is absent or malformed.
  }
  return DEFAULT_SOURCE_URL;
}

function normalizedPhone(value: string) {
  return value.replace(/[\s().+-]/g, "").replace(/^0+/, "");
}

export async function sendOpenAiLeadConversion(conversion: LeadConversion) {
  const apiKey = process.env.OPENAI_ADS_CONVERSIONS_API_KEY;
  if (!apiKey) return { sent: false, reason: "not_configured" } as const;

  const pixelId = process.env.OPENAI_ADS_PIXEL_ID
    || process.env.NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID
    || DEFAULT_PIXEL_ID;
  const phone = normalizedPhone(conversion.phone);
  const user: Record<string, string | string[]> = {
    emails_sha256: [sha256(conversion.email.trim().toLowerCase())],
    countries: ["TR"],
  };

  if (conversion.browserReference) user.obref = conversion.browserReference;
  if (/^\d{8,15}$/.test(phone)) user.phone_numbers_sha256 = [sha256(phone)];
  if (conversion.ipAddress && conversion.ipAddress !== "unknown") user.ip_address = conversion.ipAddress;
  if (conversion.userAgent) user.user_agent = conversion.userAgent;

  const event: Record<string, unknown> = {
    id: conversion.eventId,
    type: "lead_created",
    timestamp_ms: Date.now(),
    source_url: safeSourceUrl(conversion.sourceUrl),
    action_source: "web",
    user,
    data: { type: "customer_action" },
  };
  if (conversion.oppref) event.oppref = conversion.oppref;

  const response = await fetch(`https://bzr.openai.com/v1/events?pid=${encodeURIComponent(pixelId)}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ validate_only: false, events: [event] }),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`OpenAI Ads conversion request failed with ${response.status}`);
  }

  return { sent: true } as const;
}
