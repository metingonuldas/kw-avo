export const dynamic = "force-static";

import Image from "next/image";
import Link from "next/link";
import TechnologyHero from "@/components/technology/TechnologyHero";
import CommandLoginSection from "@/components/CommandLoginSection";
// Yeni Gemini Bileşenini İçe Aktar
import GeminiSection from "@/components/GeminiSection";

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
      
      {/* Command Videosu Bölümü */}
      <div className="mt-8">
        <CommandLoginSection />
      </div>

      {/* YENİ: Gemini Pro Bölümü */}
      <div className="mt-16 md:mt-24">
        <GeminiSection />
      </div>

      {/* Mevcut Özellik Kartları */}
      <section className="py-12 mt-12 border-t border-gray-100">
        <div className="text-center mb-12">
           <h3 className="text-2xl font-bold text-gray-900">KW Ekosistemi</h3>
           <p className="text-gray-500 mt-2">İşinizi büyütmek için ihtiyacınız olan tüm araçlar.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Masaüstü kartı */}
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden opacity-100 translate-y-0 transition hover:shadow-md group">
            <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
              <Image
                src="/images/avo-command-laptop.png"
                alt="KW Command masaüstü ekranı"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Masaüstü Uygulaması
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                CRM, pipeline, görevler ve akış otomasyonları tek panelde. Takım ve
                lider raporlarıyla işlerinizi şeffaf ve ölçülebilir yönetin.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Fırsat & teklif yönetimi</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> SmartPlans ile otomasyon</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Pazarlama ve sosyal gönderiler</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Detaylı performans raporları</li>
              </ul>
            </div>
          </div>

          {/* Mobil kartı */}
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden opacity-100 translate-y-0 transition hover:shadow-md group">
            <div className="relative aspect-[16/10] md:aspect-[3/4] bg-gray-50 overflow-hidden">
              <Image
                src="/images/avo-command-mobile.png"
                alt="KW Command mobil uygulaması"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Mobil Uygulama
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Saha odaklı, hızlı ve basit. Müşteri kayıtları, görevler, aranacaklar
                listesi ve fırsatlar — her şey cebinizde.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Lead & müşteri kartları</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Günlük görev & hatırlatmalar</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Fırsatları sahada güncelleme</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Anlık bildirim ve takip</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-14 mt-12">
        <div className="rounded-3xl bg-gray-900 p-8 sm:p-12 text-center text-white relative overflow-hidden">
          {/* Arka plan deseni */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ba0c2f]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Teknolojiyle Üretimi Artırmak İster misiniz?
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              KWAVO’da danışmanlarımızı hem eğitim hem teknolojiyle destekliyoruz.
              Command ve Gemini Pro ile veri temelli, ölçeklenebilir bir iş kurun.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Danışman Ol
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-medium ring-1 ring-white/30 hover:bg-white/10 transition-colors"
              >
                Hakkımızda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}