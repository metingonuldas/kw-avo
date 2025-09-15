"use client";

import Link from "next/link";

const cards = [
  {
    title: "Dünya Standartlarında Eğitim",
    desc:
      "Eğitim, koçluk ve mentorluk ekosistemimizle danışmanların büyümesini hızlandırıyoruz.",
    cta: { label: "Nasıl Gelişiyoruz", href: "/technology" },
    placeholder: { w: 640, h: 360, label: "Görsel Alanı 1280×720" },
  },
  {
    title: "Ortak Bir Misyon",
    desc:
      "1983’ten beri girişimcilere daha büyük işler kurmaları için fırsatlar sunuyoruz.",
    cta: { label: "Daha Fazla", href: "/about" },
    placeholder: { w: 640, h: 360, label: "Görsel Alanı 1280×720" },
  },
  {
    title: "Küresel Ölçekte Büyüme",
    desc:
      "Modellerimiz ve sistemlerimiz her pazarda kârlılık çerçevesi sağlar.",
    cta: { label: "Ofislerimiz", href: "/offices" },
    placeholder: { w: 640, h: 360, label: "Görsel Alanı 1280×720" },
  },
];

export default function FeatureCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Biz, Kariyerleri ve İşleri Büyütüyoruz
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.title}
            className="group rounded-2xl border border-black/10 bg-white overflow-hidden"
          >
            {/* Görsel Yer Tutucu */}
            <div className="relative bg-gray-100 border-b border-black/10 aspect-[16/9] grid place-items-center">
              <div className="text-xs text-gray-500">
                <div className="rounded-lg border-2 border-dashed border-gray-300 px-3 py-1.5 bg-white">
                  {c.placeholder.label}
                </div>
              </div>
              {/* hover efekti */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{c.desc}</p>

              <Link
                href={c.cta.href}
                className="mt-4 inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-black/10 group-hover:bg-black group-hover:text-white transition-colors"
              >
                {c.cta.label}
                <span className="ml-2 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}