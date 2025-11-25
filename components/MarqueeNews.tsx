// components/MarqueeNews.tsx

import Link from "next/link";

// Geçici / statik haber şeridi öğeleri
const NEWS_ITEMS = [
  {
    label: "Girişimcilerin geliştiği yer...",
    href: "/about",
  },
  {
    label: "Eğitim Haftası başlıyor — her gün yeni bir büyüme fırsatı.",
    href: "/about",
  },
  {
    label: "İzmir'de 3 bölge müdürlüğümüzü ziyaret edin.",
    href: "/offices",
  },
  {
    label: "Yeni projeler yayında — İzmir’in geleceğini birlikte inşa ediyoruz.",
    href: "/projects",
  },
  {
    label: "KWAVO 500+ danışmanla büyümeye devam ediyor.",
    href: "/leadership",
  },
];

export default function MarqueeNews() {
  // Hiç item yoksa hiç göstermeyelim
  if (NEWS_ITEMS.length === 0) return null;

  // Akışın kesilmemesi için iki kez tekrar edelim
  const loop = [...NEWS_ITEMS, ...NEWS_ITEMS];

  return (
    <div className="w-full bg-white border-y border-black/5 kw-marquee">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-700">
        <div className="relative overflow-hidden">
          <div className="kw-marquee-track whitespace-nowrap flex gap-6">
            {loop.map((item, i) => (
              <Link
                key={item.label + "-" + i}
                href={item.href}
                className="inline-flex items-center gap-2 hover:text-red-600"
              >
                <span className="inline-block rounded-full bg-red-600/10 text-red-700 px-2 py-0.5 text-[11px]">
                  Haberler
                </span>
                <span className="truncate">{item.label}</span>
                <span className="opacity-40">{"//"}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}