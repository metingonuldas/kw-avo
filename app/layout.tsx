// app/layout.tsx
import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"; // YENİ EKLENEN SATIR 👇

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

        {/* Vercel Araçları 👇 */}
        <SpeedInsights />
        <Analytics /> 

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KW Alesta • KW Viya • KW Orsa",
              url:
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://kw-avo.vercel.app",
              logo: "/media/logos/kw-alestaviyaorsa.svg",
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}