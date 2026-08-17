"use client";

import { useEffect, useState } from "react";

type ConsentChoice = "all" | "necessary";

const STORAGE_KEY = "kwavo_consent_v1";

function updateGoogleConsent(choice: ConsentChoice) {
  const granted = choice === "all" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: granted,
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
  });
}

function loadMetaPixel(pixelId: string) {
  if (window.fbq) return;

  type MetaQueue = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[];
    loaded: boolean;
    version: string;
  };
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as MetaQueue;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.dataset.kwavoMetaPixel = "true";
  document.head.appendChild(script);

  fbq("init", pixelId);
  fbq("track", "PageView");
}

export default function ConsentManager() {
  const [visible, setVisible] = useState(false);
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1074097965148552";

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
    if (saved === "all" || saved === "necessary") {
      updateGoogleConsent(saved);
      if (saved === "all" && metaPixelId) loadMetaPixel(metaPixelId);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(timer);
  }, [metaPixelId]);

  function save(choice: ConsentChoice) {
    localStorage.setItem(STORAGE_KEY, choice);
    updateGoogleConsent(choice);
    if (choice === "all" && metaPixelId) loadMetaPixel(metaPixelId);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      aria-label="Çerez tercihleri"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-4 shadow-2xl sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-gray-700">
          Siteyi geliştirmek ve reklam sonuçlarını ölçmek için analitik ve pazarlama
          teknolojileri kullanıyoruz. Seçiminizi dilediğiniz zaman tarayıcı verilerini
          temizleyerek yenileyebilirsiniz. <a href="/privacy" className="underline">Detaylar</a>
        </p>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => save("necessary")}
            className="rounded-xl border border-black/15 px-4 py-2 text-sm font-medium"
          >
            Yalnızca gerekli
          </button>
          <button
            type="button"
            onClick={() => save("all")}
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
          >
            Tümünü kabul et
          </button>
        </div>
      </div>
    </aside>
  );
}
