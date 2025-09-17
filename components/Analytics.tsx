"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const search = useSearchParams();

  // GA script’i ekle
  useEffect(() => {
    if (!id) return;

    // gtag script
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s1);

    const s2 = document.createElement("script");
    s2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}', { send_page_view: false });
    `;
    document.head.appendChild(s2);

    return () => {
      document.head.removeChild(s1);
      document.head.removeChild(s2);
    };
  }, [id]);

  // route değişiminde page_view gönder
  useEffect(() => {
    if (!id) return;
    // tam URL
    const url = pathname + (search?.toString() ? `?${search.toString()}` : "");
    // @ts-ignore
    window.gtag?.("event", "page_view", { page_location: url, page_path: pathname });
  }, [id, pathname, search]);

  return null;
}