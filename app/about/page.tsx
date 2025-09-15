export const dynamic = "force-static";

import Link from "next/link";
import AboutHero from "@/components/about/AboutHero";
import ValuesIcons from "@/components/about/ValuesIcons";
import Timeline from "@/components/about/Timeline";
import LeadershipTeaser from "@/components/about/LeadershipTeaser";

export const metadata = {
  title: "Hakkımızda | KW Alesta • KW Viya • KW Orsa",
  description:
    "Girişimcilerin geliştiği yer. Eğitim, teknoloji ve paylaşım kültürüyle İzmir’de büyüyoruz.",
};

export default function AboutPage() {
  return (
    <main>
      {/* 0) Üst görsel + özet kartı (placeholder’lı) */}
      <AboutHero />

      {/* 1) Senin giriş başlığı + giriş metni */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold">Hakkımızda</h1>
          <p className="mt-3 text-sm text-gray-600">
            KWAVO, Keller Williams’ın girişimci kültürünü İzmir’e taşıyan üç bölge
            müdürlüğünden oluşur: <b>KW Alesta (Bayraklı – Ege Perla)</b>,{" "}
            <b>KW Viya (Çiğli)</b> ve <b>KW Orsa (Urla)</b>. Amacımız; emlak
            danışmanlığını <b>yüksek üretim, güçlü teknoloji</b> ve
            <b> sürdürülebilir iş ortaklığı</b> ile dönüştürmektir.
          </p>
        </header>

        {/* 2) 3 sütun – Eğitim / Teknoloji / Kültür (senin kutuların) */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Dünya standartlarında eğitim",
              desc:
                "Temel-ileri satış, alım, dijital pazarlama, komisyon planlama. Haftalık/aylık programlar ve rol oyunlarıyla pekiştirme.",
            },
            {
              title: "Tek panel teknoloji",
              desc:
                "CRM, otomasyon, lead yakalama/dağıtım, raporlama ve mobil uygulamalarla uçtan uca süreç yönetimi.",
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

        {/* 3) Değerlerimiz – ikonlu grid (lucide-react ile) */}
        <div className="mt-12">
          <ValuesIcons />
        </div>

        {/* 4) Kime hitap ediyoruz – senin üçgen blokların */}
        <section className="mt-4 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-5">
            <h3 className="font-medium">Yeni başlayan danışman</h3>
            <p className="mt-2 text-sm text-gray-600">
              İlk 90 gün için net <b>yol haritası</b>, üretime odaklı günlük/haftalık
              aksiyonlar ve temel satış eğitimleri.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 p-5">
            <h3 className="font-medium">Üretim yapan danışman</h3>
            <p className="mt-2 text-sm text-gray-600">
              <b>Koçluk + otomasyon</b> ile pipeline hızlandırma, kanal verimliliği ve
              müşteri deneyimini iyileştirme.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 p-5 sm:col-span-2">
            <h3 className="font-medium">Takım kurmak isteyen lider</h3>
            <p className="mt-2 text-sm text-gray-600">
              Bölge desteği, işe alım ve eğitim programları, kârlılığı gözeten{" "}
              <b>paylaşım kültürü</b>.
            </p>
          </div>
        </section>

        {/* 5) CTA’lar */}
        <section className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
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

      {/* 6) Zaman Çizelgesi */}
      <Timeline />

      {/* 7) Liderlik teaser + CTA */}
      <LeadershipTeaser />
    </main>
  );
}