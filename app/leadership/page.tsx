// app/leadership/page.tsx
import LeaderCard from "@/components/LeaderCard";
import { getAllLeaders, OfficeKey } from "@/lib/leaders";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lider Ekip",
  description:
    "KWAVO lider ekibi; eğitim, teknoloji, operasyon ve büyüme odaklı yöneticilerden oluşur. KW Alesta, KW Viya ve KW Orsa bölge liderlerini tanıyın.",
  alternates: { canonical: "/leadership" },
  openGraph: {
    title: "Lider Ekip | KW Alesta • KW Viya • KW Orsa",
    description: "İzmir’de üç ofisin lider kadrosunu ve uzman ekiplerini keşfedin.",
    url: "/leadership",
    images: [{ url: "/og?title=Lider%20Ekip", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Lider%20Ekip"],
  },
};

export default async function LeadershipPage({
  searchParams,
}: {
  searchParams: Promise<{ office?: string }>;
}) {
  // 🟢 Next 15 uyumlu — direkt destructure
  const { office } = await searchParams;

  // Veri
  const leaders = getAllLeaders();

  const currentFilter: OfficeKey | "all" =
    office && (office === "alesta" || office === "viya" || office === "orsa")
      ? office
      : "all";

  const filteredLeaders =
    currentFilter === "all"
      ? leaders
      : leaders.filter((l) => l.offices?.includes(currentFilter));

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Lider Ekip</h1>
          <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
            KW Alesta • KW Viya • KW Orsa liderlik ekibi; eğitim, teknoloji ve
            büyüme odaklı çalışır. Ofise göre filtreleyerek ekipleri görebilirsin.
          </p>
        </div>

        {/* Filtre Butonları */}
        <div className="inline-flex rounded-full bg-neutral-100 p-1 text-xs sm:text-sm">
          {[
            { key: "all", label: "Tüm Ofisler" },
            { key: "alesta", label: "KW Alesta" },
            { key: "viya", label: "KW Viya" },
            { key: "orsa", label: "KW Orsa" },
          ].map((f) => {
            const active = currentFilter === f.key;
            const href =
              f.key === "all" ? "/leadership" : `/leadership?office=${f.key}`;

            return (
              <Link
                key={f.key}
                href={href}
                scroll={false}
                className={[
                  "rounded-full px-4 py-1.5 transition",
                  active
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-white",
                ].join(" ")}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Lider Kartları */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLeaders.map((leader) => (
          <LeaderCard key={leader.slug} leader={leader} />
        ))}
      </section>
    </main>
  );
}