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
}
