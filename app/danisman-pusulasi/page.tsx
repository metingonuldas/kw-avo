import type { Metadata } from "next";
import CareerCompass from "@/components/career/CareerCompass";

export const metadata: Metadata = {
  title: "Danışman Pusulası | KWAVO Gelişim Değerlendirmesi",
  description:
    "KWAVO danışmanları için çalışma yaklaşımı ve gelişim görüşmesi değerlendirmesi.",
  alternates: { canonical: "/danisman-pusulasi" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdvisorCompassPage() {
  return <CareerCompass mode="advisor" />;
}
