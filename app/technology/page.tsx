import Link from "next/link";

export const metadata = {
  title: "Teknoloji | KW Alesta • KW Viya • KW Orsa",
  description:
    "Tek panel teknoloji: CRM, otomasyon, lead yönetimi ve raporlama ile emlak danışmanları için geleceğin teknolojisi.",
};

export default function TechnologyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Teknoloji</h1>
        <p className="mt-3 text-sm text-gray-600">
          KW danışmanları için özel geliştirilen platformlar: CRM, otomasyon, lead yakalama ve
          raporlama. Tüm işini tek panelden yönet.
        </p>
      </header>

      {/* Örnek içerik */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "CRM ve Otomasyon",
            desc: "Müşteri bilgilerini tek panelde topla, görevleri otomatikleştir.",
          },
          {
            title: "Lead Yönetimi",
            desc: "Potansiyel müşterileri adil şekilde dağıt, dönüşüm oranını artır.",
          },
          {
            title: "Raporlama",
            desc: "Satış, pazarlama ve ekip performansını canlı takip et.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
          >
            <h3 className="font-medium">{c.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <p className="text-sm text-gray-600">
          Daha fazla bilgi için{" "}
          <Link
            href="/press"
            className="underline underline-offset-4 hover:opacity-80"
          >
            basın sayfamızı
          </Link>{" "}
          ziyaret edin.
        </p>
      </section>
    </main>
  );
}