import HeroSection from "@/components/HeroSection";
import MarqueeNews from "@/components/MarqueeNews";
import FeatureCards from "@/components/FeatureCards";
import StatsSection from "@/components/StatsSection";
// app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://kwavo.net"), // domain prod'a geçince bu
  title: {
    default: "KW Alesta Viya Orsa | Girişimcilerin Geliştiği Yer.",
    template: "%s | KWAVO",
  },
  description:
    "KW Alesta • KW Viya • KW Orsa olarak İzmir’de eğitim, teknoloji ve güçlü danışman ekosistemiyle büyüyoruz.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "KWAVO",
    images: [
      {
        url: "/og/default.png", // public/og/default.png koyacağız
        width: 1200,
        height: 630,
        alt: "KW Alesta • KW Viya • KW Orsa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/default.png"],
  },
};

export default function HomePage() {
  return (
    <main>
      {/* 1) Latest news */}
      <MarqueeNews />

      {/* 2) Hero (sende zaten hazır) */}
      <HeroSection />

      {/* 3) Hover'lı kartlar */}
      <FeatureCards />

      {/* 4) İstatistikler + görsel */}
      <StatsSection />
    </main>
  );
}