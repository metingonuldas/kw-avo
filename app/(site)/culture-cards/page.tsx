// app/culture-cards/page.tsx
export const dynamic = "force-static";

import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { CULTURE_CARDS } from "@/lib/culture-cards";
import CultureCardsGridClient from "@/components/culture/CultureCardsGridClient";

export const metadata: Metadata = {
  title: "Kültür Kartları",
  description:
    "Keller Williams kültür kartları; iş birliği, etik, üretkenlik ve kazan–kazan yaklaşımını 52 ilke ile özetler.",
  alternates: { canonical: "/culture-cards" },
  openGraph: {
    title: "Kültür Kartları | KW Alesta • KW Viya • KW Orsa",
    description:
      "Keller Williams kültürünün 52 ilkesini modern kartlar halinde keşfedin.",
    url: "/culture-cards",
    images: [
      {
        url: "/og?title=Kültür%20Kartları",
        width: 1200,
        height: 630,
        alt: "Keller Williams Kültür Kartları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Kültür%20Kartları"],
  },
};

export default function CultureCardsPage() {
  return (
    <>
      {/* Schema.org: ItemList */}
      <Script
        id="culture-cards-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "KWAVO Kültür Kartları",
            itemListElement: CULTURE_CARDS.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `Kültür Kartı ${c.id}`,
              description: c.text,
              url: "https://kwavo.net/culture-cards",
            })),
          }),
        }}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {/* HERO */}
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-4 h-20 w-20 rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
            <Image
              src="/media/logos/kw-culture-cards.png"
              alt="KW Kültür Kartları"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Kültür Kartları
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
            Keller Williams’da işimizi büyüten şey sadece üretim değil; <b>kültür</b>.
            Aşağıdaki 52 ilke, birlikte çalışma biçimimizin ve sahadaki duruşumuzun
            pusulasıdır.
          </p>

          {/* mini rozetler */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              52 İlke
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              Kazan–Kazan
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              Etik & Üretkenlik
            </span>
          </div>
        </header>

        {/* Client grid */}
        <CultureCardsGridClient />
      </main>
    </>
  );
}