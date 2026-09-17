import type { Metadata } from "next";
import CareerCompass from "@/components/career/CareerCompass";

export const metadata: Metadata = {
  title: "Kariyer Pusulası | Gayrimenkul Çalışma Stili Testi",
  description:
    "DISC yaklaşımından ilham alan kısa testi tamamla; gayrimenkul danışmanlığındaki çalışma stilini ve güçlü yönlerini keşfet.",
  alternates: { canonical: "/kariyer-pusulasi" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function CareerCompassPage() {
  return <CareerCompass />;
}
