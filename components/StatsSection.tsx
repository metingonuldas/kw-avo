"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  {
    icon: "📍",
    value: "3 Bölge Müdürlüğü",
    label: "KW Alesta • KW Viya • KW Orsa",
  },
  {
    icon: "👥",
    value: "500+ Danışman",
    label: "İzmir’de en geniş gayrimenkul danışmanı ağı",
  },
  {
    icon: "🎓",
    value: "500+ Saat / Yıl",
    label: "Eğitim, koçluk ve mentorluk oturumları",
  },
  {
    icon: "🚀",
    value: "Üretime Odaklı Model",
    label: "Teknoloji, pazarlama ve operasyon desteği",
  },
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        {/* Sol metin + istatistikler */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Her Yıl Daha Güçlü Bir Organizasyon
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            KW Alesta, KW Viya ve KW Orsa olarak İzmir’de üç bölge müdürlüğü ve
            500’ün üzerinde danışmanla; eğitim, teknoloji ve paylaşım kültürü
            merkezli bir iş modeliyle büyümeye devam ediyoruz.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Amacımız, danışmanlarımızın sürdürülebilir ve kârlı işler kurmasını
            sağlayan güçlü bir altyapı sunmak: model, sistem, eğitim ve
            operasyon desteği bir arada.
          </p>

          <ul className="mt-6 space-y-4">
            {stats.map((s, i) => (
              <li key={s.value} className="flex items-start gap-4">
                <div className="text-2xl">{s.icon}</div>
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="text-lg font-semibold"
                  >
                    {s.value}
                  </motion.div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[11px] text-gray-400">
            *Rakamlar KWAVO organizasyonu için yaklaşık değerlerdir ve dönemsel
            olarak güncellenebilir.
          </p>
        </div>

        {/* Sağ görsel */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/avo-stats.jpg"
            alt="KWAVO organizasyon yapısı"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}