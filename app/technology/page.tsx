// app/technology/page.tsx
export const dynamic = "force-static";

import Image from "next/image";
import Link from "next/link";
import TechnologyHero from "@/components/technology/TechnologyHero";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknoloji ve İş Ortaklıkları",
  description:
    "KW Command, dijital pazarlama araçları ve iş ortaklıklarıyla danışmanlarımızın işini tek ekosistemde kolaylaştırıyoruz.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Teknoloji ve İş Ortaklıkları | KW Alesta • KW Viya • KW Orsa",
    description:
      "CRM, otomasyon, raporlama, dijital pazarlama ve entegrasyonlarla üretimi artıran teknoloji ekosistemi.",
    url: "/technology",
    images: [
      {
        url: "/og?title=Teknoloji%20ve%20İş%20Ortaklıkları",
        width: 1200,
        height: 630,
        alt: "KWAVO Teknoloji",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Teknoloji%20ve%20İş%20Ortaklıkları"],
  },
};

export default function TechnologyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <TechnologyHero />
      
      {/* HERO — Laptop görseli + metin */}
      <section className="relative mt-6 overflow-hidden rounded-2xl">
        <div className="relative h-[46vh] min-h-[360px] w-full">
          <Image
            src="/images/avo-command-laptop.png"
            alt="KW Command masaüstü uygulaması"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        </div>

        <div className="absolute inset-0 grid place-items-center px-4">
          <div className="mx-auto w-full max-w-3xl text-center text-white drop-shadow
                          opacity-100 translate-y-0 transition">
            <h1 className="text-2xl sm:text-4xl font-semibold">
              KW Command: Tüm İşiniz Tek Platformda
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90">
              CRM, fırsat yönetimi, akış otomasyonları, pazarlama ve raporlama — hepsi
              aynı ekranda. Danışmanlarımızın üretimini artırmak için tasarlandı.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                Bilgi Al
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-white/70 text-white hover:bg-white/10"
              >
                Nasıl Çalışıyoruz?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GRID — Masaüstü & Mobil mockup + metinler */}
      <section className="py-12">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Masaüstü kartı */}
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden
                          opacity-100 translate-y-0 transition">
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
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden
                          opacity-100 translate-y-0 transition">
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