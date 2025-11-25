"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LeadershipTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        {/* Görsel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <Image
              src="/images/avo-leadership-min.jpg"
              alt="Liderlik Ekibi"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Metin + CTA */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Lider Ekibimizle Tanışın
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Etki alanını büyütmek isteyen deneyimli liderler ve yeni nesil
            yöneticilerle büyüyoruz. Sorumluluk ve özgürlüğü dengede tutan bir
            kültür benimsiyoruz.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/leadership"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-black text-white hover:opacity-90"
            >
              Liderlik
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
            >
              Bizimle Çalış
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}