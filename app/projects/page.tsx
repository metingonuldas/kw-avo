// app/projects/page.tsx
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import CountrySelect from "@/components/projects/CountrySelect";
import { getAllProjects, type Project } from "@/lib/projects";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "İzmir ve yurtdışında yetkili olduğumuz konut projeleri, villalar ve Golden Visa programı kapsamındaki yatırımları keşfedin.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projeler | KW Alesta • KW Viya • KW Orsa",
    description:
      "Konut projeleri, villalar ve Golden Visa yatırımlarını filtreleyerek inceleyin.",
    url: "/projects",
    images: [
      {
        url: "/og?title=Projeler",
        width: 1200,
        height: 630,
        alt: "KWAVO Projeler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Projeler"],
  },
};

type TypeFilter = "all" | "project" | "villa" | "visa";

const TYPE_TABS_ALL: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "project", label: "Proje" },
  { key: "villa", label: "Villa" },
  { key: "visa", label: "Golden Visa" },
];

const COUNTRY_FALLBACK = ["Tümü"] as const;
type CountryFilter = string;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; country?: string }>;
}) {
  const { type = "all", country = "Tümü" } = await searchParams;

  const all = getAllProjects();

  // --- COUNTRY TABS ---
  const countriesFromData = Array.from(
    new Set(
      all
        .map((p) => p.country)
        .filter(Boolean)
        .map((c) => String(c))
    )
  ).sort((a, b) => a.localeCompare(b, "tr"));

  const COUNTRY_TABS: readonly string[] = [
    ...COUNTRY_FALLBACK,
    ...countriesFromData,
  ];

  const c: CountryFilter = COUNTRY_TABS.includes(country) ? country : "Tümü";

  const projectsByCountry =
    c === "Tümü"
      ? all
      : all.filter(
          (p) => (p.country || "").toLowerCase() === c.toLowerCase()
        );

  // --- TYPE TABS (boşları gizle) ---
  const typeCounts = projectsByCountry.reduce<Record<TypeFilter, number>>(
    (acc, p) => {
      const t = (p.type || "project") as TypeFilter;
      if (t in acc) acc[t] += 1;
      return acc;
    },
    { all: projectsByCountry.length, project: 0, villa: 0, visa: 0 }
  );

  const TYPE_TABS = TYPE_TABS_ALL.filter((tab) => {
    if (tab.key === "all") return true;
    return typeCounts[tab.key] > 0;
  });

  const t: TypeFilter = (["project", "villa", "visa"].includes(type || "")
    ? (type as TypeFilter)
    : "all");

  const safeType: TypeFilter =
    t !== "all" && typeCounts[t] === 0 ? "all" : t;

  const filtered = projectsByCountry.filter((p) => {
    const matchType = safeType === "all" ? true : p.type === safeType;
    return matchType;
  });

  // --- Query Param Builder ---
  const buildHref = (next: Partial<{ type: TypeFilter; country: string }>) => {
    const params = new URLSearchParams();
    const nt = next.type ?? safeType;
    const nc = next.country ?? c;

    if (nt !== "all") params.set("type", nt);
    if (nc !== "Tümü") params.set("country", nc);

    const qs = params.toString();
    return qs ? `/projects?${qs}` : "/projects";
  };

  return (
    <>
      {/* 🔥 SCHEMA: ItemList */}
      <Script
        id="projects-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: filtered.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: `https://kwavo.net/projects/${p.slug}`,
            })),
          }),
        }}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Projeler</h1>

          {/* Filtreler */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {TYPE_TABS.map((tab) => {
              const active = safeType === tab.key;
              return (
                <Link
                  key={tab.key}
                  href={buildHref({ type: tab.key })}
                  className={[
                    "inline-flex items-center rounded-full px-3 py-1.5 text-sm ring-1 transition",
                    active
                      ? "bg-black text-white ring-black"
                      : "ring-black/15 hover:bg-gray-50",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {tab.label}
                  {tab.key !== "all" && (
                    <span className="ml-1.5 text-[11px] opacity-70">
                      ({typeCounts[tab.key]})
                    </span>
                  )}
                </Link>
              );
            })}

            <CountrySelect
              value={c}
              options={COUNTRY_TABS as unknown as string[]}
              type={safeType}
            />
          </div>
        </header>

        {/* Kartlar */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p: Project) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-sm text-gray-500">
              Bu filtrelere uygun sonuç bulunamadı.
            </p>
          )}
        </section>
      </main>
    </>
  );
}