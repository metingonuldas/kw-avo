"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative">
      {/* Görsel Yer Tutucu */}
      <div className="relative h-[52vh] min-h-[360px] bg-gray-100">
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-2 text-xs text-gray-500">
            Arkaplan Görseli – 1920×800
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative -mt-28 rounded-2xl bg-white p-6 shadow-lg sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Biz KW Alesta • KW Viya • KW Orsa’yız
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Keller Williams kültürü ve modelleriyle; eğitim, teknoloji ve iş
            ortaklıkları üzerine kurulu bir girişimcilik topluluğuyuz. İzmir’de
            danışmanlarımızın işlerini büyütmeleri için ölçeklenebilir bir yapı sunuyoruz.
          </p>
        </motion.div>
      </div>
    </section>
  );
}