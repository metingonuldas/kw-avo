import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Başvurunuz Alındı",
  description: "Danışmanlık tanışma görüşmesi talebiniz alındı.",
  robots: { index: false, follow: false },
};

export default function AdvisorThanksPage() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <CheckCircle2 size={64} className="text-green-600" />
      <h1 className="mt-5 text-3xl font-bold">Başvurunuz bize ulaştı</h1>
      <p className="mt-3 max-w-xl text-gray-600">Ekibimiz seçtiğiniz zaman aralığını dikkate alarak sizinle iletişime geçecek. Görüşmede hedeflerinizi ve hangi ofisin size daha uygun olduğunu birlikte değerlendireceğiz.</p>
      <Link href="/" className="mt-7 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white">Ana Sayfaya Dön</Link>
    </main>
  );
}
