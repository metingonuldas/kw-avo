import type { PropertyIntent } from "./property-intent";

export type Attribution = {
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
  oppref: string;
};

const STORAGE_KEY = "kwavo_attribution_v1";
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "oppref",
] as const;

const emptyAttribution = (): Attribution => ({
  landing_page: "",
  referrer: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  gclid: "",
  fbclid: "",
  oppref: "",
});

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return emptyAttribution();

  const params = new URLSearchParams(window.location.search);
  let stored = emptyAttribution();

  try {
    stored = { ...stored, ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    // Bozuk veya engellenmiş depolama ölçümü durdurmamalı.
  }

  const hasCampaignParameter = ATTRIBUTION_KEYS.some((key) => params.has(key));
  const next: Attribution = {
    ...stored,
    landing_page: stored.landing_page || window.location.href,
    referrer: stored.referrer || document.referrer,
  };

  if (hasCampaignParameter) {
    for (const key of ATTRIBUTION_KEYS) next[key] = params.get(key) || "";
    next.landing_page = window.location.href;
    next.referrer = document.referrer;
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Form yine çalışmaya devam eder.
  }

  return next;
}

export function trackAdvisorLead(eventId: string, office: string) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "advisor_lead_submit_success",
    event_id: eventId,
    lead_type: "advisor_candidate",
    office,
  });

  window.gtag?.("event", "generate_lead", {
    event_id: eventId,
    lead_type: "advisor_candidate",
    office,
  });

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-16783249031";
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || "f7KYCImf-eIcEIed8MI-";
  if (adsId && conversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${adsId}/${conversionLabel}`,
      event_id: eventId,
    });
  }

  window.fbq?.(
    "track",
    "Lead",
    { content_name: "Danışman Adayı", content_category: office },
    { eventID: eventId },
  );

  window.oaiq?.(
    "measure",
    "lead_created",
    { type: "customer_action" },
    { event_id: eventId },
  );
}

export function hasMeasurementConsent() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("kwavo_consent_v1") === "all";
}

export function getOpenAiBrowserReference() {
  if (typeof document === "undefined") return "";
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("__obref="));
  return cookie ? decodeURIComponent(cookie.slice("__obref=".length)) : "";
}

export function trackSellerLead(eventId: string, propertyType: string, district: string, intent: PropertyIntent = "sell") {
  if (typeof window === "undefined") return;
  const leadType = intent === "rent" ? "property_landlord" : "property_seller";

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: intent === "rent" ? "landlord_lead_submit_success" : "seller_lead_submit_success",
    event_id: eventId,
    lead_type: leadType,
    property_intent: intent,
    property_type: propertyType,
    district,
  });

  window.gtag?.("event", "generate_lead", {
    event_id: eventId,
    lead_type: leadType,
    property_intent: intent,
    property_type: propertyType,
    district,
  });

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-16783249031";
  const conversionLabel = intent === "rent"
    ? process.env.NEXT_PUBLIC_GOOGLE_ADS_LANDLORD_LEAD_LABEL
    : process.env.NEXT_PUBLIC_GOOGLE_ADS_SELLER_LEAD_LABEL || "8WT-CIy-pegcEIed8MI-";
  if (adsId && conversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${adsId}/${conversionLabel}`,
      event_id: eventId,
    });
  }

  window.fbq?.(
    "track",
    "Lead",
    {
      content_name: intent === "rent" ? "Kiraya Verme Talebi" : "Mülk Sahibi Talebi",
      property_intent: intent,
      content_category: propertyType,
      district,
    },
    { eventID: eventId },
  );

  window.oaiq?.(
    "measure",
    "lead_created",
    { type: "customer_action" },
    { event_id: eventId },
  );
}
