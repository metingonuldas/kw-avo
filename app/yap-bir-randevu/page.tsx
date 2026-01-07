"use client";

import { useState } from "react";
import GiftWheel, { PrizeItem } from "@/components/GiftWheel";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

// Hediye Listesi
const PRIZES: PrizeItem[] = [
  { name: "YO Elinden Türk Kahvesi", weight: 1 },
  { name: "2 Adet Instagram Postu", weight: 1 },
  { name: "Ofis Malzemesi", weight: 1 },
  { name: "Sahibinden.com Doping", weight: 0.5 },
  { name: "Kupa Bardak", weight: 1 },
  { name: "Takım Lideri Özel Hedef Oturumu", weight: 1 },
  { name: "Hepsiemlak Doping", weight: 0.5 },
  { name: "Muharrem Ünaldılar ile bire bir", weight: 1 },
  { name: "Ölçüm Malzemesi", weight: 1 },
  { name: "Koçlarla İş Çarkı Çalışmasına Katılım Hakkı", weight: 0.5 }, 
  { name: "Saha Ekipmanı", weight: 1 },
  { name: "Emine Er ile bire bir", weight: 1 }
];

export default function AppointmentGamePage() {
  const [winner, setWinner] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSpinEnd = (resultName: string) => {
    setWinner(resultName);
    setShowModal(true);

    if (resultName !== "YO Elinden Türk Kahvesi") {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 overflow-hidden relative flex items-center justify-center p-4">
      
      {/* Arka Plan Süslemeleri */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#ba0c2f]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-3xl"></div>
      </div>

      {/* ANA İÇERİK KAPSAYICISI - GRID YAPISI */}
      {/* Mobilde tek sütun, Geniş ekranda (lg) 2 sütun */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        
        {/* SOL TARA: BAŞLIK VE METİN */}
        <div className="text-center lg:text-left order-1 lg:order-1 flex flex-col justify-center items-center lg:items-start lg:pl-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-[#ba0c2f] font-bold text-xs tracking-widest uppercase mb-6">
              Motivasyon Zamanı
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              YAP BİR <br/>
              <span className="text-[#ba0c2f]">RANDEVU!</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Randevunu al, sisteme gir, çarkı çevir ve anında hediyeni kazan!
              <br className="mt-2"/> Bol şanslar Dileriz! 🚀
            </p>

             {/* Dekoratif bir ok veya çizgi eklenebilir (Opsiyonel) */}
             <div className="hidden lg:block w-24 h-2 bg-[#ba0c2f] rounded-full mt-4"></div>
        </div>

        {/* SAĞ TARAF: ÇARK */}
        <div className="flex justify-center items-center order-2 lg:order-2 w-full">
            {/* Çark componenti kendi içinde max-width 700px'e kadar büyüyecek */}
            <GiftWheel items={PRIZES} onSpinEnd={handleSpinEnd} />
        </div>

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