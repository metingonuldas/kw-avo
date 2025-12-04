export const dynamic = "force-static";

import Image from "next/image";
import Link from "next/link";
import TechnologyHero from "@/components/technology/TechnologyHero";
import CommandLoginSection from "@/components/CommandLoginSection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknoloji ve İş Ortaklıkları",
  description:
    "KW Command, dijital pazarlama araçları ve iş ortaklıklarıyla danışmanlarımızın işini tek ekosistemde kolaylaştırıyoruz.",
  alternates: { canonical: "/technology" },
};

export default function TechnologyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-12">
      <TechnologyHero />
      
      <div className="mt-8">
        <CommandLoginSection />
      </div>

      <section className="py-12">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Masaüstü kartı */}
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden opacity-100 translate-y-0 transition hover:shadow-md">
            <div className="relative aspect-[16/10] bg-gray-50">
              <Image
                src="/images/avo-command-laptop.png"
                alt="KW Command masaüstü ekranı"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold">Masaüstü Uygulaması</h2>
              <p className="mt-2 text-sm text-gray-600">
                CRM, pipeline, görevler ve akış otomasyonları tek panelde. Takım ve
                lider raporlarıyla işlerinizi şeffaf ve ölçülebilir yönetin.
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-gray-700">
                <li>• Fırsat & teklif yönetimi</li>
                <li>• SmartPlans ile otomasyon</li>
                <li>• Pazarlama ve sosyal gönderiler</li>
                <li>• Detaylı performans raporları</li>
              </ul>
            </div>
          </div>

          {/* Mobil kartı */}
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden opacity-100 translate-y-0 transition hover:shadow-md">
            <div className="relative aspect-[3/4] bg-gray-50">
              <Image
                src="/images/avo-command-mobile.png"
                alt="KW Command mobil uygulaması"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold">Mobil Uygulama</h2>
              <p className="mt-2 text-sm text-gray-600">
                Saha odaklı, hızlı ve basit. Müşteri kayıtları, görevler, aranacaklar
                listesi ve fırsatlar — her şey cebinizde.
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-gray-700">
                <li>• Lead & müşteri kartları</li>
                <li>• Günlük görev & hatırlatmalar</li>
                <li>• Fırsatları sahada güncelleme</li>
                <li>• Anlık bildirim ve takip</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-14">
        <div className="rounded-2xl border border-black/10 bg-gray-50 p-6 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl font-semibold">
            Teknolojiyle Üretimi Artırmak İster misiniz?
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            KWAVO’da danışmanlarımızı hem eğitim hem teknolojiyle destekliyoruz.
            Command ile veri temelli ve ölçeklenebilir bir iş kurun.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Danışman Ol
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-white"
            >
              Hakkımızda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}