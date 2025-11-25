// components/culture/CultureCard.tsx
"use client";

import { motion } from "framer-motion";

export default function CultureCard({
  id,
  text,
  onClick,
}: {
  id: number;
  text: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.35, delay: id * 0.01 }}
      className="
        group relative text-left
        rounded-2xl border border-black/10 bg-white p-5
        shadow-[0_6px_20px_rgba(0,0,0,0.04)]
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]
        transition-shadow
        focus:outline-none focus:ring-2 focus:ring-black/10
      "
      aria-label={`Kültür Kartı ${id}`}
    >
      {/* numara rozet */}
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-red-600/10 px-2 text-xs font-semibold text-red-700">
          {id}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-gray-400">
          Kültür Kartı
        </span>
      </div>

      {/* metin */}
      <p className="text-sm leading-relaxed text-gray-800 line-clamp-5">
        {text}
      </p>

      {/* hover alt çizgi */}
      <div className="mt-4 h-px w-0 bg-red-600/60 transition-all duration-300 group-hover:w-12" />

      {/* sağ alt mini ikon */}
      <span className="pointer-events-none absolute bottom-4 right-4 text-gray-300 group-hover:text-red-500 transition-colors">
        ♠
      </span>
    </motion.button>
  );
}