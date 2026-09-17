import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, GraduationCap, LineChart, Users, Workflow } from "lucide-react";
import AdvisorLeadForm from "@/components/forms/AdvisorLeadForm";

export const metadata: Metadata = {
  title: "Gayrimenkul Danışmanı Ol | İzmir",
  description:
    "KW Alesta, KW Viya veya KW Orsa’da gayrimenkul danışmanlığı kariyerini keşfet. Eğitim, koçluk, teknoloji ve güçlü ekip desteğiyle tanışma görüşmesi planla.",
  alternates: { canonical: "/danisman-ol" },
  openGraph: {
    title: "İzmir’de Gayrimenkul Danışmanı Ol | KWAVO",
    description: "Kendi işini kurarken eğitim, koçluk, teknoloji ve güçlü bir ekosistemden destek al.",
    url: "/danisman-ol",
    images: [{ url: "/og?title=Gayrimenkul%20Dan%C4%B1%C5%9Fman%C4%B1%20Ol", width: 1200, height: 630 }],
  },
};

const benefits = [
  { icon: GraduationCap, title: "Sürekli eğitim", text: "Temelden ileri seviyeye eğitim, koçluk ve mentorluk programları." },
  { icon: Workflow, title: "Hazır iş modeli", text: "İş planı, operasyon ve üretim süreçlerinde uygulanabilir sistemler." },
  { icon: LineChart, title: "Teknoloji ve pazarlama", text: "Müşteri yönetimi, dijital araçlar ve pazarlama desteği." },
  { icon: Users, title: "Güçlü topluluk", text: "İzmir’de üç ofis ve 500’ün üzerinde danışmandan oluşan paylaşım kültürü." },
];

export default function AdvisorLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "İzmir’de Gayrimenkul Danışmanı Ol",
    url: "https://www.kwavo.net/danisman-ol",
    description: "KWAVO gayrimenkul danışmanlığı kariyer tanışma sayfası.",
    about: { "@id": "https://www.kwavo.net/#organization" },
  };

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(186,12,47,0.45),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">KW Alesta • KW Viya • KW Orsa</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Gayrimenkulde kendi işinizi büyütmeye hazır mısınız?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
              Deneyiminiz olsun veya olmasın; eğitim, koçluk, teknoloji ve güçlü bir
              ekosistemle gayrimenkul danışmanlığı kariyerini birlikte planlayalım.
            </p>
            <ul className="mt-7 grid gap-3 text-sm text-neutral-200 sm:grid-cols-2">
              {["Ücretsiz tanışma görüşmesi", "İzmir’de üç ofis seçeneği", "Deneyim şartı yok", "Kendi işinizi kurma modeli"].map((item) => (
                <li key={item} className="flex items-center gap-2"><CheckCircle2 size={18} className="text-red-400" />{item}</li>
              ))}
            </ul>
          </div>

          <div id="basvuru" className="rounded-3xl bg-white p-5 text-black shadow-2xl sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wider text-[#ba0c2f]">İlk adımı atın</p>
            <h2 className="mt-1 text-2xl font-bold">Tanışma görüşmesi planlayın</h2>
            <p className="mt-2 mb-2 text-sm text-gray-600">Bilgilerinizi bırakın; tercih ettiğiniz ofis sizi uygun zaman aralığında arasın.</p>
            <p className="mb-5 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
              Bu bir maaşlı pozisyon değil; gayrimenkulde kendi işinizi kurmaya yönelik danışmanlık modelidir.
            </p>
            <AdvisorLeadForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#ba0c2f]">Neden KWAVO?</p>
          <h2 className="mt-2 text-3xl font-bold">Tek başınıza değil, güçlü bir sistemle ilerleyin</h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-black/10 p-5">
              <Icon className="text-[#ba0c2f]" />
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Sadece bilgi almak istiyorsanız da görüşebiliriz</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">Görüşme bir iş teklifi veya taahhüt değildir. Kariyer hedeflerinizi dinleyip modelimizi şeffaf biçimde anlatırız.</p>
          <Link href="#basvuru" className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white">Görüşme Talebi Oluştur</Link>
        </div>
      </section>
    </main>
  );
}
