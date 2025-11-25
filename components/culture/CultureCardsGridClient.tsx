// components/culture/CultureCardsGridClient.tsx
"use client";

import { useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import { CULTURE_CARDS } from "@/lib/culture-cards";
import CultureCard from "@/components/culture/CultureCard";

type CultureCardItem = {
  id: number;
  text: string;
  category?: string;
};

export default function CultureCardsGridClient() {
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CULTURE_CARDS as CultureCardItem[];
    return (CULTURE_CARDS as CultureCardItem[]).filter((c) =>
      c.text.toLowerCase().includes(s)
    );
  }, [q]);

  const active = activeId
    ? (CULTURE_CARDS as CultureCardItem[]).find((c) => c.id === activeId)
    : null;

  return (
    <>
      {/* Search */}
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Kartlarda ara (örn. eğitim, etik, üretim...)"
          className="w-full bg-transparent text-sm outline-none"
          aria-label="Kültür kartlarında ara"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-xs text-gray-500 hover:text-black"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Grid */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CultureCard
            key={c.id}
            id={c.id}
            text={c.text}
            onClick={() => setActiveId(c.id)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-gray-500">
            Aramanla eşleşen kart bulunamadı.
          </p>
        )}
      </section>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Kültür Kartı ${active.id}`}
          onClick={() => setActiveId(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-red-600/10 px-2 text-sm font-semibold text-red-700">
                  {active.id}
                </span>
                <span className="text-xs uppercase tracking-wide text-gray-400">
                  Kültür Kartı
                </span>
              </div>

              <button
                onClick={() => setActiveId(null)}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-base leading-relaxed text-gray-900">
              {active.text}
            </p>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveId(null)}
                className="rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}