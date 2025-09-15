import HeroSection from "@/components/HeroSection";
import MarqueeNews from "@/components/MarqueeNews";
import FeatureCards from "@/components/FeatureCards";
import StatsSection from "@/components/StatsSection";

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