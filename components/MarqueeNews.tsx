import Link from "next/link";
import { getAllPress } from "@/lib/press"; // zaten mevcut lib/press.ts'i kullanıyoruz

export default async function MarqueeNews() {
  const items = (await getAllPress())
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 8);

  if (items.length === 0) return null;

  // içeriği iki kez tekrar edip tek parça gibi akıtalım
  const loop = [...items, ...items];

  return (
    <div className="w-full bg-white border-y border-black/5 kw-marquee">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-700">
        <div className="relative overflow-hidden">
          <div className="kw-marquee-track whitespace-nowrap flex gap-6">
            {loop.map((p, i) => (
              <Link
                key={p.slug + "-" + i}
                href={`/press/${p.slug}`}
                className="inline-flex items-center gap-2 hover:text-red-600"
              >
                <span className="inline-block rounded-full bg-red-600/10 text-red-700 px-2 py-0.5 text-[11px]">
                  Haberler
                </span>
                <span className="truncate">{p.title}</span>
                <span className="opacity-40">{"//"}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}