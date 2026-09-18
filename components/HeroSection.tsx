"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, House } from "lucide-react";
import styles from "./HeroSection.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const } },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={sectionRef} className="relative h-[80svh] min-h-[540px] w-full overflow-hidden">
      {/* Parallax arka plan */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/kw-hero-cover.png"
          alt="KWAVO"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110"
        />
      </motion.div>

      {/* Animated overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content with staggered entrance */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center"
        style={{ y: contentY }}
      >
        <motion.div
          className="text-center text-white max-w-2xl px-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* SVG logo with scale-in */}
          <motion.div className="flex justify-center" variants={scaleIn}>
            <Image
              src="/images/avo-herotext.svg"
              alt="Girişimcilerin Geliştiği Yer"
              width={500}
              height={120}
              priority
            />
          </motion.div>

          {/* Subtitle fade up */}
          <motion.p className="mt-4 text-lg text-gray-200" variants={fadeUp}>
            KW Alesta &bull; KW Viya &bull; KW Orsa ile İzmir&apos;de gayrimenkul sektörünü
            yeniden tanımlıyoruz.
          </motion.p>

          <motion.div className="mt-8" variants={fadeUp}>
            <Link href="/mulkumu-degerlendirmek-istiyorum" className={styles.sellerLink}>
              <span className={styles.sellerIcon} aria-hidden="true"><House size={24} strokeWidth={1.8} /></span>
              <span>Evimi Satmak veya Kiraya Vermek İstiyorum</span>
              <ArrowUpRight className={styles.sellerArrow} size={22} aria-hidden="true" />
            </Link>
            <p className="mt-3 text-sm text-white/80">Ücretsiz görüşme · Taahhüt gerektirmez</p>
          </motion.div>

          {/* Secondary navigation */}
          <motion.div className="mt-5 flex flex-wrap justify-center gap-3" variants={fadeUp}>
            <Link
              href="/about"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/15 transition-colors"
            >
              Hakkımızda
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/15 transition-colors"
            >
              İletişime Geç
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
