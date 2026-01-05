"use client";

import { useState } from "react";
// Önizleme ortamında next/link hatasını önlemek için standart <a> etiketi kullanıyoruz.
// Gerçek projede: import Link from "next/link";
import GiftWheel from "@/components/GiftWheel";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

// Hediye Listesi
const PRIZES = [
  "YO elinden kahve 🙂",
  "İsme Özel Ajanda 📘",
  "KW Tişörtü 👕",
  "Sinema Bileti 🎬",
  "Kitap Hediyesi 📚",
  "Tebrikler! (Pas) 👏",
  "10 Lead Desteği 📞",
  "Instagram Postu 📸",
];

export default function AppointmentGamePage() {
  const [winner, setWinner] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSpinEnd = (result: string) => {
    setWinner(result);
    setShowModal(true);

    // Konfeti Patlat
    if (result !== "Tebrikler! (Pas) 👏") {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Arka Plan Süslemeleri */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#ba0c2f]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-3xl"></div>
      </div>

      <div className="z-10 text-center max-w-2xl mx-auto mb-8 mt-12 md:mt-0">
        <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-[#ba0c2f] font-bold text-xs tracking-widest uppercase mb-4">
          Motivasyon Zamanı
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
          YAP BİR <span className="text-[#ba0c2f]">RANDEVU!</span>
        </h1>
        <p className="text-lg text-gray-600">
          Randevunu al, sisteme gir, çarkı çevir ve anında hediyeni kazan! 
          <br className="hidden md:block"/> Bol şanslar Dileriz! 🚀
        </p>
      </div>

      {/* Çark Alanı */}
      <div className="z-10 w-full flex justify-center mb-12">
        <GiftWheel items={PRIZES} onSpinEnd={handleSpinEnd} />
      </div>

      {/* Sonuç Modalı */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-[#ba0c2f]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                🎁
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tebrikler!</h2>
              <p className="text-gray-500 mb-6">Şansına çıkan hediye:</p>
              
              <div className="py-4 px-6 bg-gray-50 rounded-xl border border-gray-200 mb-8">
                <span className="text-xl md:text-2xl font-black text-[#ba0c2f]">{winner}</span>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Harika!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}