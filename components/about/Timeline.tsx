"use client";

import { motion } from "framer-motion";

const milestones = [
  { year: "2018", title: "Kuruluş", text: "İlk ofis ve temel ekip." },
  { year: "2020", title: "Büyüme", text: "Eğitim yatırımları, ortaklıklar, ölçek." },
  { year: "2023", title: "Viya & Orsa", text: "İzmir’de iki yeni bölge; topluluk genişledi." },
  { year: "2025", title: "Teknoloji Atılımı", text: "Otomasyon ve raporlama standart hâl aldı." },
];

export default function Timeline() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-semibold">Zaman Çizelgesi</h2>

      <div className="relative mt-8">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-black/10 via-black/20 to-black/10" />

        <ul className="space-y-8">
          {milestones.map((m, i) => (
            <li key={m.year} className="relative pl-10 sm:pl-16">
              <span className="absolute left-3.5 sm:left-5 top-1.5 inline-block h-2.5 w-2.5 rounded-full bg-red-600" />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-xl border border-black/10 bg-white p-4"
              >
                <div className="text-xs text-gray-500">{m.year}</div>
                <div className="text-base font-semibold">{m.title}</div>
                <p className="mt-1.5 text-sm text-gray-600">{m.text}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}