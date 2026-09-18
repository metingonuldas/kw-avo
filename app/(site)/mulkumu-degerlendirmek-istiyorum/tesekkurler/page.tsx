import type { Metadata } from "next";
import PropertyLeadThankYou from "@/components/forms/PropertyLeadThankYou";

export const metadata: Metadata = {
  title: "Talebiniz Alındı",
  description: "Gayrimenkul satış veya kiraya verme görüşmesi talebiniz alınmıştır.",
  robots: { index: false, follow: false },
};

export default function PropertyOwnerThankYouPage() {
  return <PropertyLeadThankYou allowRental />;
}
