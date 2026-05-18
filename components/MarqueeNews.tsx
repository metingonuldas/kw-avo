"use client";

import Link from "next/link";

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
    label: "Yeni projeler yayında — İzmir'in geleceğini birlikte inşa ediyoruz.",
    href: "/projects",
  },
  {
    label: "KWAVO 500+ danışmanla büyümeye devam ediyor.",
    href: "/leadership",
  },
];

function MarqueeTrack() {
  return (
    <div className="flex gap-6 whitespace-nowrap">
      {NEWS_ITEMS.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="inline-flex items-center gap-2 hover:text-red-600 transition-colors"
        >
          <span className="inline-block rounded-full bg-red-600/10 text-red-700 px-2 py-0.5 text-[11px]">
            Haberler
          </span>
          <span className="truncate">{item.label}</span>
          <span className="opacity-40">{"//"}</span>
        </Link>
      ))}
    </div>
  );
}

export default function MarqueeNews() {
  if (NEWS_ITEMS.length === 0) return null;

  return (
    <>
      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 25s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className="w-full bg-white border-y border-black/5"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-700">
          <div className="relative overflow-hidden">
            <div className="marquee-track flex gap-6 w-max">
              <MarqueeTrack />
              <MarqueeTrack />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
