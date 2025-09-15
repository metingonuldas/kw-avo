import { getAllOffices } from "@/lib/offices";
import OfficesSection from "@/components/offices/OfficesSection";

export const metadata = {
  title: "Ofisler | KW Alesta • KW Viya • KW Orsa",
  description:
    "İzmir’de Bayraklı (Alesta), Çiğli (Viya) ve Urla (Orsa) bölgelerinde hizmet veriyoruz.",
};

export default async function OfficesPage() {
  // Node fs kullanan fonksiyon burada (server’da) çalışmalı
  const offices = getAllOffices();
  return <OfficesSection offices={offices} />;
}