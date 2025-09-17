// app/projects/page.tsx
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import CountrySelect from "@/components/projects/CountrySelect";
import { getAllProjects, type Project } from "@/lib/projects";

type TypeFilter = "all" | "project" | "villa" | "visa";

const TYPE_TABS: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "project", label: "Proje" },
  { key: "villa", label: "Villa" },
  { key: "visa", label: "Golden Visa" },
];

// Sabit liste (istersen dinamikleştiririz)
const COUNTRY_TABS = ["Tümü", "Türkiye", "ABD", "Almanya"] as const;
type CountryFilter = (typeof COUNTRY_TABS)[number];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; country?: string }>;
}) {
  const { type = "all", country = "Tümü" } = await searchParams;

  const t: TypeFilter = (["project", "villa", "visa"].includes(type || "")
    ? (type as TypeFilter)
    : "all");

  const c: CountryFilter = (COUNTRY_TABS.includes((country as CountryFilter) || "Tümü")
    ? (country as CountryFilter)
    : "Tümü");

  const all = getAllProjects();

  const filtered = all.filter((p) => {
    const matchType = t === "all" ? true : p.type === t;
    const matchCountry =
      c === "Tümü" ? true : (p.country || "").toLowerCase() === c.toLowerCase();
    return matchType && matchCountry;
  });

  // Mevcut parametreleri koruyarak link üret (select client’ta push yapıyor)
  const buildHref = (next: Partial<{ type: TypeFilter }>) => {
    const params = new URLSearchParams();
    const nt = next.type ?? t;
    if (nt !== "all") params.set("type", nt);
    if (c !== "Tümü") params.set("country", c);
    const qs = params.toString();
    return qs ? `/projects?${qs}` : "/projects";
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Projeler</h1>

        {/* Tip sekmeleri + Ülke seçici aynı satırda */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {TYPE_TABS.map((tab) => {
            const active = t === tab.key;
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
              </Link>
            );
          })}

          {/* Ülke seçici (client) */}
          <CountrySelect
            value={c}
            options={COUNTRY_TABS as unknown as string[]}
            type={t}
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
  );
}