// app/scarlet-coaching/page.tsx
export const dynamic = "force-static";

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const SCARLET = "#3B0C4E";

export const metadata: Metadata = {
  title: "Scarlet Koçluk Takımı",
  description:
    "Keller Williams’ta tüm danışmanların yararlanabileceği kapsamlı Üretkenlik Koçluğu Programı: Scarlet Koçluk Takımı.",
  alternates: { canonical: "/scarlet-coaching" },
  openGraph: {
    title: "Scarlet Koçluk Takımı | KW Alesta • KW Viya • KW Orsa",
    description:
      "Scarlet Koçluk Takımı ile odaklanmayı artıran, üretkenliği yükselten ve danışmanları hedeflerine ulaştıran güçlü bir yapı.",
    url: "/scarlet-coaching",
    images: [
      {
        url: "/images/kw-hero-cover.png",
        width: 1200,
        height: 630,
        alt: "Scarlet Koçluk Takımı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/kw-hero-cover.png"],
  },
};

export default function ScarletCoachingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {/* HERO */}
      <section className="rounded-3xl border border-black/5 bg-white shadow-sm">
        <div className="border-b border-black/5 bg-gray-50/60 px-4 py-4 sm:px-8 sm:py-5 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-black/10 bg-white">
              <Image
                src="/media/logos/scarlet-kocluk.png"
                alt="Scarlet Koçluk Takımı"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                Üretkenlik Koçluğu
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                Scarlet Koçluk Takımı
              </h1>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-8 sm:py-8">
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 max-w-3xl">
            Keller Williams’ta tüm danışmanların yararlanabileceği kapsamlı bir{" "}
            <strong>Üretkenlik Koçluğu Programı</strong> sunuyoruz. Scarlet
            Koçluk Takımı, odaklanmayı artıran, üretkenliği yükselten ve
            danışmanları hedeflerine ulaştıran güçlü bir yapı sağlar.
          </p>

          {/* Badgeler */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-[13px]">
            <span
              className="rounded-full px-3 py-1 text-white"
              style={{ backgroundColor: SCARLET }}
            >
              Üretkenlik Odaklı
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              Kepli Danışman hedefi
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              Tek yetkili portföy &amp; satış
            </span>
          </div>
        </div>
      </section>

      {/* PROGRAMIN AMACI */}
      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Programın Amacı
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-700">
            Amacımız, programa katılan tüm danışmanların;
          </p>

          <ul className="mt-4 space-y-3 text-sm sm:text-base text-gray-700">
            <li className="flex gap-2">
              <span
                className="mt-1 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: SCARLET }}
              />
              <span>
                <strong>%25’inin</strong> bir yıl içinde{" "}
                <strong>Kepli Danışman</strong> haline gelmesi.
              </span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: SCARLET }}
              />
              <span>
                <strong>%50’sinin</strong> her ay mutlaka en az bir{" "}
                <strong>tek yetkili satılık portföy sözleşmesi</strong> alarak
                veya en az bir satış yaparak üretken olması.
              </span>
            </li>
          </ul>

          <h3 className="mt-6 text-base sm:text-lg font-semibold text-gray-900">
            Scarlet Üretkenlik Koçluğu
          </h3>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-700">
            Üretkenlik Koçlarımız; danışmanların başarılı sonuçlar alabilmeleri
            için aktivitelere odaklanan, doğru soruları sorarak derinlere inen
            ve her zaman beklentilerin net bir şekilde belirlendiği güçlü bir
            koçluk programı yürütürler.
          </p>
        </div>

        {/* Yan kart */}
        <aside className="space-y-4">
          <div
            className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm"
            style={{ borderColor: `${SCARLET}26` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
              Kimler için?
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Scarlet Koçluk, üretim yapmak ve işini disiplinle büyütmek isteyen
              her Keller Williams danışmanı için tasarlanmış bir programdır.
            </p>
          </div>
        </aside>
      </section>

      {/* ÖZELLİK KARTLARI */}
      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: SCARLET }}
            />
            Aktivite Odaklı
          </div>
          <h3 className="mt-3 text-base font-semibold text-gray-900">
            Aksiyon takibi ve davranış alışkanlığı
          </h3>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            Scarlet koçluğu, danışmanın günlük aksiyonlarını takip eder ve
            üretken davranışların güçlenmesini sağlar. Odak; sonuçtan önce
            doğru aktivite setini inşa etmektir.
          </p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: SCARLET }}
            />
            Beklentilerin Sorgulanması
          </div>
          <h3 className="mt-3 text-base font-semibold text-gray-900">
            Net hedefler, şeffaf takip
          </h3>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            Her danışman için net hedefler belirlenir; süreç boyunca motivasyon,
            takip görüşmeleri ve performans ölçümleri ile beklentiler kontrol
            edilir.
          </p>
        </div>
      </section>

      {/* CTA BLOĞU */}
      <section className="mt-12">
        <div
          className="rounded-3xl px-6 py-7 sm:px-8 sm:py-9 text-center text-sm sm:text-base"
          style={{ background: "linear-gradient(135deg,#3B0C4E,#7C3AED)" }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            Programa Katılmak İster misin?
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm sm:text-base text-white/80">
            Scarlet Koçluk Programı, üretim yapmak ve işini disiplinle büyütmek
            isteyen her danışman için açık bir programdır. Detaylar ve
            başvuru için bizimle iletişime geç.
          </p>

          <div className="mt-5 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50"
            >
              Başvuru için iletişime geç
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}