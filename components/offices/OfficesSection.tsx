"use client";

import { useMemo, useState } from "react";
import type { Office } from "@/lib/offices";
import OfficeMap from "@/components/OfficeMap";
import Link from "next/link";

type FilterKey = "ALL" | "Alesta" | "Viya" | "Orsa";

const filters: { key: FilterKey; label: string }[] = [
  { key: "ALL", label: "Tümü" },
  { key: "Alesta", label: "Alesta (Bayraklı – Ege Perla)" },
  { key: "Viya", label: "Viya (Çiğli)" },
  { key: "Orsa", label: "Orsa (Urla)" },
];

/** areas içinden Alesta/Viya/Orsa eşleşmesi (case-insensitive) */
function matchesBrand(o: Office, key: FilterKey): boolean {
  if (key === "ALL") return true;
  const hay = [o.name, ...(o.areas ?? [])].join(" ").toLowerCase();
  return hay.includes(key.toLowerCase());
}

/** Kart üstünde göstermek için türetilmiş etiket  */
function brandLabel(o: Office): string | null {
  const hay = [o.name, ...(o.areas ?? [])].join(" ").toLowerCase();
  if (hay.includes("alesta")) return "Alesta";
  if (hay.includes("viya")) return "Viya";
  if (hay.includes("orsa")) return "Orsa";
  return null;
}

// Görseli olmayan ofisler için yer tutucu
function Placeholder({ label = "Görsel – 1200×800" }: { label?: string }) {
  return (
    <div className="relative aspect-[3/2] grid place-items-center bg-gray-100 border-b border-black/10">
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-500">
        {label}
      </div>
    </div>
  );
}

export default function OfficesSection({ offices }: { offices: Office[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<FilterKey>("ALL");

  const filtered = useMemo(() => {
    const byBrand = offices.filter((o) => matchesBrand(o, active));
    const q = query.trim().toLowerCase();
    if (!q) return byBrand;
    return byBrand.filter((o) => {
      const hay = [o.name, ...(o.areas ?? []), o.address ?? "", o.phone ?? ""]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [offices, active, query]);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Ofisler</h1>
        <p className="mt-3 text-sm text-gray-600">
          İzmir’de <b>Bayraklı (Alesta)</b>, <b>Çiğli (Viya)</b> ve <b>Urla (Orsa)</b>
          bölgelerinde hizmet veriyoruz. Haritadan konumu açabilir veya doğrudan randevu isteyebilirsiniz.
        </p>
      </header>

      {/* Arama + Filtreler */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ofis adı, adres veya telefon ara…"
          className="w-full sm:max-w-sm rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
        />

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-xl px-3 py-1.5 text-sm ring-1 ring-black/10 ${
                active === f.key ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Harita */}
      <section className="mt-8">
        <OfficeMap offices={filtered} />
        <p className="mt-2 text-[11px] text-gray-400">
          * Harita üzerinde pin’e tıklayarak adresi ve ofis adını görebilirsiniz.
        </p>
      </section>

      {/* Kartlar */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {filtered.map((o) => (
          <article
            key={o.slug}
            className="rounded-2xl border border-black/10 bg-white overflow-hidden"
          >
            {/* Görsel yer tutucu (sonradan next/image ile değiştir) */}
            <Placeholder />

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{o.name}</h3>
                  <p className="text-xs text-gray-500">
                    {brandLabel(o) ?? (o.areas?.length ? o.areas.join(" • ") : "")}
                  </p>
                </div>
                {o.phone && (
                  <a
                    href={`tel:${o.phone}`}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
                  >
                    Ara
                  </a>
                )}
              </div>

              {o.address && (
                <p className="mt-3 text-sm text-gray-600">{o.address}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {/* Google Maps yönlendirme */}
                {o.location && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${o.location.lat},${o.location.lng}`}
                    target="_blank"
                    className="text-sm underline underline-offset-4 hover:opacity-80"
                  >
                    Haritada Aç
                  </a>
                )}

                {/* Randevu / iletişim */}
                <Link
                  href={`/contact?office=${encodeURIComponent(o.slug)}`}
                  className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium bg-black text-white hover:opacity-90"
                >
                  Randevu Al
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}