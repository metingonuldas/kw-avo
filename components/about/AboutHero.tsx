"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative">
      {/* Arkaplan Görseli */}
      <div className="relative h-[52vh] min-h-[360px]">
        <Image
          src="/images/about-hero-bg.png"
          alt="KWAVO Hakkımızda"
          fill
          priority
          className="object-cover"
        />
        {/* Koyu overlay */}
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