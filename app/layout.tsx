import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kw-avo.vercel.app"),
  title: {
    default: "KW Alesta • KW Viya • KW Orsa",
    template: "%s | KW Alesta Viya Orsa",
  },
  description:
    "Girişimcinin geliştiği yer. Eğitim, teknoloji ve paylaşım kültürüyle İzmir’de büyüyoruz.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
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
        "@type": "Organization",
        "@id": "https://kwavo.net/#organization",
        "name": "KW Alesta • KW Viya • KW Orsa",
        "url": "https://kwavo.net",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kwavo.net/media/logos/kw-alestaviyaorsa.svg"
        },
        "sameAs": [
          "https://www.instagram.com/kwalestaviyaorsa",
          "https://www.linkedin.com/company/kwalestaviyaorsa",
          "https://www.facebook.com/kwalestaviyaorsa" // Varsa ekle veya kaldır
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+90-232-000-0000", // BURAYI GÜNCELLE: Gerçek numaranı yaz
          "contactType": "customer service",
          "areaServed": "TR",
          "availableLanguage": "Turkish"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://kwavo.net/#website",
        "url": "https://kwavo.net",
        "name": "KWAVO",
        "description": "Girişimcinin geliştiği yer.",
        "publisher": { "@id": "https://kwavo.net/#organization" },
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
      </head>
      <body className="flex min-h-screen flex-col bg-white text-black">
        {/* Navbar ve Footer bakım modunda gizlenir */}
        {!isMaintenance && <Navbar />}

        <div className="flex-1">{children}</div>

        {!isMaintenance && <Footer />}

        {/* --- ANALİTİK VE PERFORMANS ARAÇLARI --- */}
        
        {/* 1. Vercel Hız Ölçümü */}
        <SpeedInsights />
        
        {/* 2. Vercel Basit Analiz */}
        <Analytics /> 

        {/* 3. Google Analytics 4 */}
        <GoogleAnalytics gaId="G-ZYB6BQGKQ5" />

        {/* 4. JSON-LD Schema (Google Sitelinks için Kritik) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}