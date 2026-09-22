import type { Metadata } from "next";
import { BarChart3, CheckCircle2, Handshake, MapPin, Megaphone } from "lucide-react";
import SellerLeadForm from "@/components/forms/SellerLeadForm";

const title = "Evimi Satmak veya Kiraya Vermek İstiyorum";
const description = "İzmir'deki mülkünüzü satmak veya kiraya vermek için KW Alesta, KW Viya ve KW Orsa bölge uzmanlarıyla ücretsiz ön görüşme yapın.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/mulkumu-degerlendirmek-istiyorum" },
  openGraph: {
    title,
    description,
    url: "/mulkumu-degerlendirmek-istiyorum",
    images: [{
      url: "/images/ads/openai-ev-sahibi-v1.png",
      width: 1536,
      height: 1024,
      alt: "İzmir'de bir mülk sahibi ile gayrimenkul danışmanının değerlendirme görüşmesi",
    }],
  },
};

const steps = [
  { icon: Handshake, title: "Hedefinizi dinleyelim", text: "Satış veya kiraya verme tercihinizi, mülkünüzün özelliklerini ve zamanlamanızı birlikte netleştirelim." },
  { icon: BarChart3, title: "Piyasayı değerlendirelim", text: "Bölgenizdeki satılık veya kiralık emsalleri inceleyerek mülkünüze uygun fiyat aralığını konuşalım." },
  { icon: Megaphone, title: "Size uygun planı oluşturalım", text: "Doğru alıcıya veya kiracıya ulaşmak için sunum, pazarlama ve görüşme sürecini planlayalım." },
];

export default function PropertyOwnerPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(186,12,47,0.46),transparent_45%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-100">
              <MapPin size={15} aria-hidden="true" /> İzmir&apos;de mülk sahipleri için
            </p>
            <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Satmak ya da kiraya vermek.<br /><span className="text-red-300">İlk adımı birlikte atalım.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-300">
              Mülkünüz için doğru fiyatı, zamanlamayı ve pazarlama planını bölge uzmanlarımızla değerlendirin. Hedefinizi seçin, sizinle iletişime geçelim.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-neutral-200">
              {["Satış veya kiraya verme için ücretsiz ön görüşme", "Konut, villa, arsa ve ticari mülk", "Herhangi bir taahhüt gerektirmez"].map((item) => (
                <li key={item} className="flex items-center gap-3"><CheckCircle2 size={18} className="shrink-0 text-red-400" aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <p className="mt-8 border-t border-white/15 pt-6 text-sm leading-6 text-neutral-400">KW Alesta · Bayraklı<br />KW Viya · Çiğli<br />KW Orsa · Güzelbahçe</p>
          </div>
          <div id="gorusme-formu" className="scroll-mt-24 rounded-[28px] bg-white p-5 text-black shadow-2xl sm:p-7">
            <SellerLeadForm allowRental />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="text-3xl font-black tracking-tight">Mülkünüz için nasıl ilerliyoruz?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-black/10 bg-neutral-50 p-6">
              <Icon size={26} className="text-[#ba0c2f]" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm leading-6 text-neutral-500">İlk görüşme ücretsizdir ve mülkünüzü portföye verme zorunluluğu oluşturmaz. Bu hizmet, kiralık ev arayanlar için değil, mülkünü satmak veya kiraya vermek isteyen mülk sahipleri içindir.</p>
      </section>
    </main>
  );
}
