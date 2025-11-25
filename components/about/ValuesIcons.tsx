"use client";

import { motion } from "framer-motion";
import {
  Handshake,
  Target,
  BookOpenCheck,
  UsersRound,
  Cpu,
  LineChart,
} from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Kazan–Kazan",
    desc: "Şeffaflık, iş birliği ve paylaşım kültürü; birlikte ve sürdürülebilir şekilde büyürüz.",
  },
  {
    icon: BookOpenCheck,
    title: "Eğitim & Koçluk",
    desc: "Düzenli eğitimler, rol oyunları ve bire bir koçlukla üretime dayalı gelişim.",
  },
  {
    icon: Cpu,
    title: "Teknoloji Ekosistemi",
    desc: "CRM, ilan portali entegrasyonları, dijital pazarlama araçları ve otomasyonla danışmanların tüm iş akışını güçlendiririz.",
  },
  {
    icon: UsersRound,
    title: "Topluluk",
    desc: "Mentorluk, takım bazlı üretkenlik ve güçlü paylaşım ağı ile destekleyici bir kültür oluştururuz.",
  },
  {
    icon: Target,
    title: "Müşteri Odaklılık",
    desc: "Servis kalitesi, süreç hızı ve müşteri deneyimini her adımda iyileştiririz.",
  },
  {
    icon: LineChart,
    title: "Sürdürülebilir Üretim",
    desc: "Ölçülebilir takip ve kârlı büyüme için doğru modeller uygularız.",
  },
];

export default function ValuesIcons() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-semibold">Değerlerimiz</h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group rounded-2xl border border-black/10 bg-white p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-xl ring-1 ring-black/10 bg-gray-50 p-2 group-hover:bg-black group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-600">{v.desc}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}