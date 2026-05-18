"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Dünya Standartlarında Eğitim",
    desc:
      "Eğitim, koçluk ve mentorluk ekosistemimizle danışmanların büyümesini hızlandırıyoruz.",
    cta: { label: "Nasıl Gelişiyoruz", href: "/technology" },
    image: "/images/avo-hp-c1.png",
  },
  {
    title: "Ortak Bir Misyon",
    desc:
      "1983'ten beri girişimcilere daha büyük işler kurmaları için fırsatlar sunuyoruz.",
    cta: { label: "Daha Fazla", href: "/about" },
    image: "/images/avo-hp-c2.png",
  },
  {
    title: "Küresel Ölçekte Büyüme",
    desc:
      "Modellerimiz ve sistemlerimiz her pazarda kârlılık çerçevesi sağlar.",
    cta: { label: "Ofislerimiz", href: "/offices" },
    image: "/images/avo-hp-c3.png",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FeatureCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        Biz, Kariyerleri ve İşleri Büyütüyoruz
      </motion.h2>

      <motion.div
        className="mt-6 grid gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {cards.map((c) => (
          <motion.article
            key={c.title}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group rounded-2xl border border-black/10 bg-white overflow-hidden"
          >
            {/* Image with zoom on hover */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>

            <div className="p-5">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{c.desc}</p>

              <Link
                href={c.cta.href}
                className="mt-4 inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-black/10 group-hover:bg-black group-hover:text-white transition-colors"
              >
                {c.cta.label}
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
