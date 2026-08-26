import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, PhoneCall, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Talebiniz Alındı",
  description: "Gayrimenkul satış görüşmesi talebiniz alınmıştır.",
  robots: { index: false, follow: false },
};

export default function SellerLeadThankYouPage() {
  return (
    <main className="relative isolate flex min-h-[72vh] items-center overflow-hidden bg-neutral-950 px-4 py-16 text-white sm:px-6">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_25%_20%,rgba(186,12,47,0.48),transparent_35%)]" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:52px_52px]" />

      <div className="mx-auto w-full max-w-3xl rounded-[32px] border border-white/15 bg-white/10 p-7 text-center shadow-2xl backdrop-blur sm:p-12">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-white text-[#ba0c2f]">
          <CheckCircle2 size={42} />
        </div>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-red-300">Talebiniz başarıyla alındı</p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Sizi kısa süre içinde arayacağız.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-300">
          Bölge ekibimiz mülkünüz ve satış hedefiniz hakkında kısa bir ön görüşme yapmak için belirttiğiniz zaman aralığında sizinle iletişime geçecek.
        </p>

        <div className="mt-9 grid gap-3 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><Clock3 className="text-red-300" size={21} /><strong className="mt-3 block text-sm">Hızlı geri dönüş</strong><span className="mt-1 block text-xs leading-5 text-neutral-400">Çalışma saatlerinde öncelikli takip</span></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><PhoneCall className="text-red-300" size={21} /><strong className="mt-3 block text-sm">Kısa ön görüşme</strong><span className="mt-1 block text-xs leading-5 text-neutral-400">Mülk ve satış hedefinizi dinleriz</span></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><ShieldCheck className="text-red-300" size={21} /><strong className="mt-3 block text-sm">Taahhütsüz süreç</strong><span className="mt-1 block text-xs leading-5 text-neutral-400">Karar tamamen size aittir</span></div>
        </div>

        <Link href="/" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-neutral-950 transition hover:bg-neutral-100">
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}
