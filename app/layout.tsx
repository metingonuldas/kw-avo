import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import ConsentManager from "@/components/marketing/ConsentManager";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.kwavo.net"),
  title: {
    default: "KW Alesta • KW Viya • KW Orsa",
    template: "%s | KW Alesta Viya Orsa",
  },
  description:
    "Girişimcinin geliştiği yer. Eğitim, teknoloji ve paylaşım kültürüyle İzmir’de büyüyoruz.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "KW Alesta Viya Orsa",
    url: "/",
    title: "KW Alesta • KW Viya • KW Orsa",
    description: "Girişimcinin geliştiği yer.",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cookie’lerden bakım modunu oku
  const cookieStore = await cookies();
  const isMaintenance = cookieStore.get("mw_maint")?.value === "1";

  // Gelişmiş Schema.org Yapısal Verisi (Organization + WebSite)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": "https://www.kwavo.net/#organization",
        "name": "KW Alesta • KW Viya • KW Orsa",
        "alternateName": ["KWAVO", "Keller Williams İzmir", "KW Alesta Viya Orsa"],
        "legalName": "BTA Gayrimenkul Ticaret Anonim Şirketi",
        "url": "https://www.kwavo.net",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.kwavo.net/media/logos/kw-alestaviyaorsa.svg"
        },
        "description":
          "İzmir'de üç bölge müdürlüğü (KW Alesta, KW Viya, KW Orsa) ve 500'ün üzerinde gayrimenkul danışmanıyla hizmet veren Keller Williams franchise organizasyonu. Eğitim, teknoloji ve paylaşım kültürüyle danışmanların üretimini büyütür.",
        "areaServed": {
          "@type": "City",
          "name": "İzmir"
        },
        "knowsAbout": [
          "gayrimenkul danışmanlığı",
          "emlak alım satım",
          "gayrimenkul kariyeri",
          "emlak franchise",
          "gayrimenkul eğitimi"
        ],
        "parentOrganization": {
          "@type": "Organization",
          "name": "Keller Williams Realty",
          "url": "https://www.kw.com"
        },
        "sameAs": [
          "https://www.instagram.com/kwalestaviyaorsa",
          "https://www.linkedin.com/company/kwalestaviyaorsa",
          "https://www.facebook.com/kwizmir"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+90-232-461-2171",
          "contactType": "customer service",
          "areaServed": "TR",
          "availableLanguage": "Turkish"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.kwavo.net/#website",
        "url": "https://www.kwavo.net",
        "name": "KW Alesta Viya Orsa",
        "alternateName": ["KWAVO", "kwavo.net"],
        "description": "Girişimcinin geliştiği yer.",
        "publisher": { "@id": "https://www.kwavo.net/#organization" },
        "inLanguage": "tr-TR"
      }
    ]
  };

  return (
    <html lang="tr" className="force-light" data-theme="light">
      <head>
        {/* Her zaman açık tema */}
        <meta name="color-scheme" content="light" />
        {/* Bakım modundayken indexlenmesin */}
        {isMaintenance && <meta name="robots" content="noindex, nofollow" />}
        <Script id="kwavo-consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=window.gtag||gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col bg-white text-black">
        {/* Navbar ve Footer bakım modunda gizlenir */}
        {!isMaintenance && <Navbar />}

        <div className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>

        {!isMaintenance && <Footer />}

        {/* --- ANALİTİK VE PERFORMANS ARAÇLARI --- */}
        
        {/* 1. Vercel Hız Ölçümü */}
        <SpeedInsights />
        
        {/* 2. Vercel Basit Analiz */}
        <Analytics /> 

        {/* 3. Google Analytics 4 */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-ZYB6BQGKQ5"} />

        {/* 4. Google Ads dönüşüm hedefi */}
        <Script id="kwavo-google-ads-config" strategy="afterInteractive">
          {`window.gtag&&window.gtag('config','${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-16783249031"}');`}
        </Script>

        {/* 5. Kullanıcı izni ve Meta Pixel */}
        <ConsentManager />

        {/* 6. JSON-LD Schema (Google Sitelinks için Kritik) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
