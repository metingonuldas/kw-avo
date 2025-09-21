"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TechnologyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 space-y-16">
      {/* Canva iş birliği bölümü */}
      <section className="grid gap-8 md:grid-cols-2 items-center">
        {/* Metin */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold">
            KW x Canva İş Ortaklığı
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Canva ile yaptığımız iş birliği sayesinde danışmanlarımız gayrimenkule 
            özel yüzlerce hazır tasarım şablonuna erişiyor. 
            Markanızı güçlendirecek, kolayca kişiselleştirilebilir tasarımları 
            dakikalar içinde kullanıma hazır hale getirebilirsiniz.
          </p>
        </motion.div>

        {/* Görsel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md"
        >
          <Image
            src="/images/avo-canva-hero.jpg" // senin 1280x450 görselin
            alt="KW x Canva İş Ortaklığı"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* Diğer mevcut teknoloji içeriklerin buraya devam edecek */}
    </main>
  );
}