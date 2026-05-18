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
    label: "İzmir'de en geniş gayrimenkul danışmanı ağı",
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

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95, x: 40 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        {/* Sol metin + istatistikler */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-semibold"
            variants={itemVariants}
          >
            Her Yıl Daha Güçlü Bir Organizasyon
          </motion.h2>
          <motion.p className="mt-3 text-sm text-gray-600" variants={itemVariants}>
            KW Alesta, KW Viya ve KW Orsa olarak İzmir&apos;de üç bölge müdürlüğü ve
            500&apos;ün üzerinde danışmanla; eğitim, teknoloji ve paylaşım kültürü
            merkezli bir iş modeliyle büyümeye devam ediyoruz.
          </motion.p>
          <motion.p className="mt-2 text-sm text-gray-600" variants={itemVariants}>
            Amacımız, danışmanlarımızın sürdürülebilir ve kârlı işler kurmasını
            sağlayan güçlü bir altyapı sunmak: model, sistem, eğitim ve
            operasyon desteği bir arada.
          </motion.p>

          <ul className="mt-6 space-y-4">
            {stats.map((s) => (
              <motion.li
                key={s.value}
                className="flex items-start gap-4"
                variants={itemVariants}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {s.icon}
                </motion.div>
                <div>
                  <div className="text-lg font-semibold">{s.value}</div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.p
            className="text-sm text-muted-foreground mt-2"
            variants={itemVariants}
          >
            İstatistikler KWAVO organizasyonunun güncel durumunu yansıtmak amacıyla
            periyodik olarak güncellenen yaklaşık değerlerdir.
          </motion.p>
        </motion.div>

        {/* Sağ görsel — slide in from right */}
        <motion.div
          className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={imageVariants}
        >
          <Image
            src="/images/avo-stats.jpg"
            alt="KWAVO organizasyon yapısı"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
