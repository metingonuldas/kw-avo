// app/about/page.tsx
export const dynamic = "force-static";

import Link from "next/link";
import AboutHero from "@/components/about/AboutHero";
import ValuesIcons from "@/components/about/ValuesIcons";
import Timeline from "@/components/about/Timeline";
import LeadershipTeaser from "@/components/about/LeadershipTeaser";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "KWAVO, Keller Williams girişimci kültürünü İzmir’e taşıyan KW Alesta, KW Viya ve KW Orsa bölge müdürlüklerinden oluşur.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Hakkımızda | KW Alesta • KW Viya • KW Orsa",
    description:
      "Eğitim, teknoloji ekosistemi ve kazan–kazan kültürüyle İzmir’de büyüyen üç bölge müdürlüğü.",
    url: "/about",
    images: [
      {
        url: "/og?title=Hakkımızda",
        width: 1200,
        height: 630,
        alt: "Hakkımızda | KWAVO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Hakkımızda"],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* 🔥 Schema.org: Organization */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "KWAVO – KW Alesta • KW Viya • KW Orsa",
            legalName: "Keller Williams AV Orsa Group",
            url: "https://kwavo.net",
            logo: "https://kwavo.net/media/logos/kw-alestaviyaorsa.svg",
            description:
              "KWAVO, Keller Williams’ın girişimci kültürünü İzmir’e taşıyan KW Alesta, KW Viya ve KW Orsa bölge müdürlüklerinden oluşan gayrimenkul danışmanlık ekosistemidir.",
            numberOfEmployees: "500+",
            foundingDate: "2020",
            areaServed: {
              "@type": "City",
              name: "İzmir",
              addressRegion: "İzmir",
              addressCountry: "TR",
            },
            department: [
              {
                "@type": "Organization",
                name: "KW Alesta",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Bayraklı – Ege Perla",
                  addressRegion: "İzmir",
                  addressCountry: "TR",
                },
              },
              {
                "@type": "Organization",
                name: "KW Viya",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Çiğli",
                  addressRegion: "İzmir",
                  addressCountry: "TR",
                },
              },
              {
                "@type": "Organization",
                name: "KW Orsa",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Güzelbahçe",
                  addressRegion: "İzmir",
                  addressCountry: "TR",
                },
              },
            ],
            sameAs: [
              "https://www.instagram.com/kwalesta",
              "https://www.instagram.com/kwviya",
              "https://www.instagram.com/kworsa",
            ],
          }),
        }}
      />

      <main>
        {/* 0) Üst görsel + özet kartı */}
        <AboutHero />

        {/* 1) Giriş metni */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <header className="max-w-3xl">
            <h1 className="text-3xl font-semibold">Hakkımızda</h1>
            <p className="mt-3 text-sm text-gray-600">
              KWAVO, Keller Williams’ın girişimci kültürünü İzmir’e taşıyan üç
              bölge müdürlüğünden oluşur:{" "}
              <b>KW Alesta (Bayraklı – Ege Perla)</b>,{" "}
              <b>KW Viya (Çiğli)</b> ve <b>KW Orsa (Güzelbahçe)</b>. Amacımız; emlak
              danışmanlığını <b>yüksek üretim, güçlü teknoloji ekosistemi</b> ve
              <b> sürdürülebilir iş ortaklıkları</b> ile dönüştürmektir.
            </p>
          </header>

          {/* 2) Eğitim / Teknoloji / Kültür kartları */}
          <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Dünya standartlarında eğitim",
                desc:
                  "Temel–ileri satış, alım, dijital pazarlama, komisyon planlama. Haftalık/aylık programlar ve rol oyunlarıyla pekiştirme.",
              },
              {
                title: "Teknoloji ekosistemi",
                desc:
                  "CRM, ilan portalları, dijital pazarlama, raporlama ve entegrasyonlarla gayrimenkul danışmanının tüm ihtiyaçlarını tek ekosistemde topluyoruz.",
              },
              {
                title: "Kazan-Kazan kültürü",
                desc:
                  "Paylaşım ve şeffaflık. Mentorluk, takım bazlı öğrenme ve üretkenlik topluluklarıyla büyüme.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-black/10 bg-white p-5"
              >
                <h3 className="font-medium">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
              </div>
            ))}
          </section>

          {/* 3) Değerler */}
          <div className="mt-12">
            <ValuesIcons />
          </div>

          {/* 4) Kime hitap ediyoruz */}
          <section className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 p-5">
              <h3 className="font-medium">Yeni başlayan danışman</h3>
              <p className="mt-2 text-sm text-gray-600">
                İlk 90 gün için net <b>yol haritası</b>, günlük ve haftalık aksiyonlar.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 p-5">
              <h3 className="font-medium">Üretim yapan danışman</h3>
              <p className="mt-2 text-sm text-gray-600">
                <b>Koçluk + otomasyon</b> ile pipeline hızlandırma ve müşteri yönetimi.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 p-5 sm:col-span-2">
              <h3 className="font-medium">Takım kurmak isteyen lider</h3>
              <p className="mt-2 text-sm text-gray-600">
                İşe alım, eğitim programları ve <b>paylaşım kültürünü</b> destekleyen
                güçlü bir yapı.
              </p>
            </div>
          </section>

          {/* 5) CTA’lar */}
          <section className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/danisman-ol"
              className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Danışman Ol
            </Link>
            <Link
              href="/media"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
            >
              Media Kit
            </Link>
          </section>
        </section>

        {/* 6) Timeline */}
        <Timeline />

        {/* 7) Liderlik teaser */}
        <LeadershipTeaser />
      </main>
    </>
  );
}
