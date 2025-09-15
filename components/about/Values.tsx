"use client";

import { motion } from "framer-motion";

const values = [
  {
    title: "Eğitim & Koçluk",
    desc:
      "Düzenli eğitimler, atölyeler ve koçlukla danışmanlarımızın performansını yükseltiyoruz.",
    ph: "Görsel – 800×600",
  },
  {
    title: "Teknoloji",
    desc:
      "Araçlarımız veri odaklı karar almayı ve tekrar eden işlerin otomasyonunu sağlar.",
    ph: "Görsel – 800×600",
  },
  {
    title: "Paylaşım Kültürü",
    desc:
      "Birlikte kazanmanın gücüne inanıyoruz. Bilgiyi ve fırsatları ekipçe büyütürüz.",
    ph: "Görsel – 800×600",
  },
];

export default function Values() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-semibold">Değerlerimiz</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {values.map((v, i) => (
          <motion.article
            key={v.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-black/10 bg-white overflow-hidden"
          >
            {/* Görsel Yer Tutucu */}
            <div className="relative aspect-[4/3] bg-gray-100 grid place-items-center border-b border-black/10">
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-500">
                {v.ph}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{v.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}