import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Handshake,
  Home,
  MapPin,
  Megaphone,
  SearchCheck,
  ShieldCheck,
  Store,
  Trees,
  Users,
} from "lucide-react";
import SellerLeadForm from "@/components/forms/SellerLeadForm";

export const metadata: Metadata = {
  title: "İzmir'de Evimi Satmak İstiyorum | Ücretsiz Satış Görüşmesi",
  description:
    "İzmir'deki gayrimenkulünüzün doğru fiyat aralığını ve satış stratejisini KW Alesta, KW Viya ve KW Orsa bölge uzmanlarıyla ücretsiz değerlendirin.",
  alternates: { canonical: "/evimi-satmak-istiyorum" },
  openGraph: {
    title: "İzmir'de Evimi Satmak İstiyorum | KW Alesta Viya Orsa",
    description: "Gayrimenkulünüz için ücretsiz fiyat ve satış stratejisi görüşmesi talep edin.",
    url: "/evimi-satmak-istiyorum",
    images: [{ url: "/og?title=Gayrimenkul%C3%BCn%C3%BCz%C3%BC%20Satmay%C4%B1%20m%C4%B1%20D%C3%BC%C5%9F%C3%BCn%C3%BCyorsunuz%3F", width: 1200, height: 630 }],
  },
};

const benefits = [
  {
    icon: BarChart3,
    title: "Gerçekçi fiyat konumlandırması",
    text: "Bölge emsalleri, güncel rekabet ve mülkünüzün özellikleri birlikte değerlendirilir.",
  },
  {
    icon: Megaphone,
    title: "Mülke özel pazarlama planı",
    text: "Doğru alıcıya ulaşmak için ilan, görsel, dijital tanıtım ve saha planı oluşturulur.",
  },
  {
    icon: Users,
    title: "Geniş danışman ağı",
    text: "İzmir'deki üç bölge müdürlüğü ve 500'ün üzerinde danışmanın iş birliği gücünden yararlanılır.",
  },
  {
    icon: ShieldCheck,
    title: "Şeffaf ve kontrollü süreç",
    text: "Sürecin her aşamasında bilgi alır, kararları danışmanınızla birlikte verirsiniz.",
  },
];

const propertyTypes = [
  { icon: Building2, label: "Daire" },
  { icon: Home, label: "Villa ve müstakil ev" },
  { icon: Trees, label: "Arsa, tarla ve arazi" },
  { icon: Store, label: "İşyeri ve ticari" },
];

const faqs = [
  {
    question: "Satış görüşmesi gerçekten ücretsiz mi?",
    answer: "Evet. İlk piyasa ve satış stratejisi görüşmesi ücretsizdir ve mülkünüzü portföye verme zorunluluğu oluşturmaz.",
  },
  {
    question: "Bu çalışma resmî ekspertiz raporu yerine geçer mi?",
    answer: "Hayır. Bu çalışma satış kararınıza yardımcı olan piyasa ön değerlendirmesidir; banka, mahkeme veya resmî işlemlerde gereken SPK lisanslı ekspertiz raporu değildir.",
  },
  {
    question: "Mülküm İzmir'in merkezinde değilse başvurabilir miyim?",
    answer: "Evet. İzmir'in tüm ilçelerinden konut, arsa, villa ve ticari gayrimenkul taleplerini değerlendiriyoruz.",
  },
  {
    question: "Henüz satmaya kesin karar vermedim. Yine de görüşebilir miyiz?",
    answer: "Elbette. Görüşmenin amacı size doğru fiyat, zamanlama ve satış seçenekleri konusunda net bir çerçeve sunmaktır.",
  },
];

export default function SellerLandingPreviewPage() {
  return (
    <main className="overflow-hidden bg-white text-neutral-950">
      <section className="relative isolate bg-neutral-950 text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(186,12,47,0.46),transparent_36%),radial-gradient(circle_at_85%_85%,rgba(186,12,47,0.2),transparent_30%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:52px_52px]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-red-100 backdrop-blur">
              <MapPin size={15} /> İzmir&apos;in tamamında
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
              Gayrimenkulünüzü satmayı mı düşünüyorsunuz?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300 lg:text-xl">
              Mülkünüzün piyasa konumunu, doğru fiyat aralığını ve satış planını İzmir bölge uzmanlarımızla ücretsiz değerlendirin.
            </p>

            <ul className="mt-8 grid gap-3 text-sm text-neutral-200 sm:grid-cols-2">
              {["Ücretsiz satış stratejisi görüşmesi", "Konut, villa, arsa ve ticari mülk", "İzmir'de üç bölge müdürlüğü", "Herhangi bir taahhüt gerektirmez"].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-7">
              <div><strong className="block text-3xl font-black">3</strong><span className="text-xs uppercase tracking-wider text-neutral-400">Bölge müdürlüğü</span></div>
              <div><strong className="block text-3xl font-black">500+</strong><span className="text-xs uppercase tracking-wider text-neutral-400">Danışman ağı</span></div>
              <div><strong className="block text-3xl font-black">30</strong><span className="text-xs uppercase tracking-wider text-neutral-400">İzmir ilçesi</span></div>
            </div>
          </div>

          <div id="degerleme-formu" className="rounded-[28px] bg-white p-5 text-black shadow-2xl shadow-black/40 sm:p-7">
            <SellerLeadForm />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-center text-sm font-bold text-neutral-700 sm:grid-cols-3 sm:px-6">
          <span>KW Alesta · Bayraklı</span>
          <span>KW Viya · Çiğli</span>
          <span>KW Orsa · Güzelbahçe</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ba0c2f]">Satışın ilk adımı</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Doğru fiyatı değil, doğru satış planını konuşalım</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-neutral-600 lg:justify-self-end">
            Bir gayrimenkulü başarılı biçimde satmak yalnızca ilan vermek değildir. Fiyatlama, sunum, alıcı hedefleme ve görüşme yönetimi tek bir plan içinde ilerlemelidir.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="group rounded-3xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#ba0c2f]/40 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[#ba0c2f]/10 text-[#ba0c2f]"><Icon size={22} /></span>
                <span className="text-xs font-black text-neutral-300">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-neutral-950 py-16 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-400">Nasıl ilerliyoruz?</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Üç adımda daha net bir satış kararı</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/15 lg:grid-cols-3">
            {[
              { icon: SearchCheck, number: "01", title: "Mülkü ve hedefinizi dinleriz", text: "Konum, mülk türü, satış zamanlaması ve beklentinizi kısa bir görüşmede netleştiririz." },
              { icon: BarChart3, number: "02", title: "Piyasa konumunu değerlendiririz", text: "Emsalleri, güncel rekabeti ve alıcı davranışını birlikte okuyarak gerçekçi bir çerçeve çıkarırız." },
              { icon: Handshake, number: "03", title: "Satış yol haritasını sunarız", text: "Fiyatlandırma, pazarlama ve görüşme sürecini kapsayan uygulanabilir seçenekleri paylaşırız." },
            ].map(({ icon: Icon, number, title, text }) => (
              <article key={title} className="bg-neutral-950 p-7 sm:p-9">
                <div className="flex items-center justify-between text-red-400"><Icon size={28} /><span className="text-sm font-black">{number}</span></div>
                <h3 className="mt-12 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ba0c2f]">Geniş uzmanlık alanı</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">İzmir&apos;deki farklı mülk türleri için bölge uzmanlığı</h2>
          <p className="mt-5 max-w-xl leading-7 text-neutral-600">
            Merkez ilçelerden sahil hattına kadar mülkünüz, kendi bölgesindeki rekabet ve alıcı profiliyle birlikte değerlendirilir.
          </p>
          <Link href="#degerleme-formu" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#ba0c2f] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#a00a29]">
            Ücretsiz Görüşme Talep Et <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {propertyTypes.map(({ icon: Icon, label }) => (
            <div key={label} className="flex min-h-36 flex-col justify-between rounded-3xl border border-black/10 bg-neutral-50 p-6">
              <Icon className="text-[#ba0c2f]" size={27} />
              <strong className="text-lg">{label}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ba0c2f]">Merak edilenler</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Sık sorulan sorular</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group rounded-2xl border border-black/10 bg-white p-5 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold">
                  {question}<span className="text-xl text-[#ba0c2f] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl border-t border-black/10 pt-4 text-sm leading-7 text-neutral-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ba0c2f] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-100">Karar vermeden önce bilgi alın</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Mülkünüz için doğru satış planını birlikte oluşturalım.</h2>
          </div>
          <Link href="#degerleme-formu" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-black text-[#ba0c2f] transition hover:bg-red-50">
            Görüşme Talep Et <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}
