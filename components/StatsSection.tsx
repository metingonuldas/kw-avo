"use client";

import { motion } from "framer-motion";

const stats = [
  { icon: "🏠", label: "ABD Satış Hacmi", value: "$370.8B" },
  { icon: "👥", label: "Danışman", value: "165,000+" },
  { icon: "🏆", label: "No. 1", value: "Ajan Sayısında Dünya Lideri" },
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        {/* Sol metin + istatistikler */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Her Yıl Zirveyi Zorluyoruz
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Ajan sayısı, işlem sayısı ve satış hacminde dünyanın en büyük
            gayrimenkul franchise’ları arasında yer alıyoruz.
          </p>

          <ul className="mt-6 space-y-4">
            {stats.map((s, i) => (
              <li key={s.label} className="flex items-start gap-4">
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

          <p className="mt-4 text-[11px] text-gray-400">*Veriler değişebilir.</p>
        </div>

        {/* Sağ görsel yer tutucu */}
        <div className="relative">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl aspect-[3/4] grid place-items-center">
            <div className="text-xs text-gray-500 bg-white px-3 py-1.5 rounded-lg border">
              Görsel Alanı 900×1200
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}