"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

// Tipleri tekrar tanımlıyoruz (veya dışarıdan import edilebilir)
export interface PrizeItem {
  name: string;
  weight: number;
}

interface GiftWheelProps {
  items: PrizeItem[];
  onSpinEnd: (winnerName: string) => void;
}

export default function GiftWheel({ items, onSpinEnd }: GiftWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const rotationRef = useRef(0);
  
  const colors = ["#ba0c2f", "#111111", "#991b1b", "#333333", "#dc2626", "#555555"];

  const totalWeight = useMemo(() => items.reduce((acc, item) => acc + item.weight, 0), [items]);
  
  const segments = useMemo(() => {
    let currentAngle = 0;
    return items.map((item, index) => {
      const angleSize = (item.weight / totalWeight) * 360;
      const segment = {
        ...item,
        startAngle: currentAngle,
        endAngle: currentAngle + angleSize,
        centerAngle: currentAngle + (angleSize / 2),
        color: colors[index % colors.length],
      };
      currentAngle += angleSize;
      return segment;
    });
  }, [items, totalWeight, colors]);

  const gradientString = segments
    .map((seg) => `${seg.color} ${seg.startAngle}deg ${seg.endAngle}deg`)
    .join(", ");

  useEffect(() => {
    spinAudioRef.current = new Audio("/sounds/spin.mp3");
    winAudioRef.current = new Audio("/sounds/win.mp3");
    if (spinAudioRef.current) { spinAudioRef.current.loop = true; spinAudioRef.current.volume = 0.5; }
    if (winAudioRef.current) { winAudioRef.current.volume = 0.8; }
  }, []);

  const spin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    if (spinAudioRef.current) { spinAudioRef.current.currentTime = 0; spinAudioRef.current.play().catch(() => {}); }

    const randomWeight = Math.random() * totalWeight;
    let accumulatedWeight = 0;
    let winnerIndex = 0;
    for (let i = 0; i < items.length; i++) {
        accumulatedWeight += items[i].weight;
        if (randomWeight <= accumulatedWeight) { winnerIndex = i; break; }
    }
    
    const winningSegment = segments[winnerIndex];
    const extraSpins = 5;
    const segmentCenter = winningSegment.centerAngle;
    const safeZone = (winningSegment.endAngle - winningSegment.startAngle) * 0.4;
    const randomOffset = (Math.random() * safeZone * 2) - safeZone;
    const targetAngle = 360 - (segmentCenter + randomOffset);

    const currentRotation = rotationRef.current;
    const normalizedRotation = currentRotation % 360;
    let adjustment = targetAngle - normalizedRotation;
    if (adjustment < 0) adjustment += 360;
    
    const newTotalRotation = currentRotation + (360 * extraSpins) + adjustment;
    rotationRef.current = newTotalRotation;

    await controls.start({
      rotate: newTotalRotation,
      transition: { duration: 5, ease: [0.16, 1, 0.3, 1] },
    });

    setIsSpinning(false);
    if (spinAudioRef.current) { spinAudioRef.current.pause(); spinAudioRef.current.currentTime = 0; }
    if (winAudioRef.current) { winAudioRef.current.play().catch(() => {}); }

    onSpinEnd(items[winnerIndex].name);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-4 relative">
      {/* Gösterge Oku */}
      <div className="relative z-20 -mb-5 sm:-mb-8 drop-shadow-xl">
        <div className="h-10 w-8 sm:h-16 sm:w-12 bg-white border-4 border-gray-900" 
             style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }} />
      </div>

      {/* Çarkın Gövdesi */}
      <div className="relative rounded-full border-[8px] border-gray-900 shadow-2xl overflow-hidden bg-black">
        <motion.div
          className="relative rounded-full"
          animate={controls}
          initial={{ rotate: 0 }}
          style={{
            // BURASI DEĞİŞTİ: Maksimum boyutu 500px'den 700px'e çıkardık.
            // Mobilde ekranın %90'ı, Masaüstünde 700px'e kadar büyüyebilir.
            width: "min(90vw, 700px)",
            height: "min(90vw, 700px)",
            background: `conic-gradient(${gradientString})`,
          }}
        >
          {segments.map((seg, index) => {
            const textLength = seg.name.length;
            // Font boyutlarını biraz daha büyüttük çünkü çark büyüdü
            let fontSize = "11px"; 
            let lineHeight = "1.2";

            if (seg.weight < 1) {
                if (textLength > 35) { fontSize = "8px"; lineHeight = "1.1"; } 
                else if (textLength > 25) { fontSize = "9px"; lineHeight = "1.15"; } 
                else { fontSize = "10px"; lineHeight = "1.2"; }
            } else {
                // Normal dilimler için font
                 fontSize = "12px";
            }
            
            return (
              <div key={index} className="absolute top-0 left-0 w-full h-full flex justify-center" style={{ transform: `rotate(${seg.centerAngle}deg)` }}>
                <div className="pt-5 sm:pt-10 h-1/2 flex flex-col justify-start items-center">
                   <div className="text-white font-bold uppercase tracking-wider drop-shadow-md text-center w-[80px] sm:w-[120px]"
                    style={{ fontSize, lineHeight }}
                  >
                    {seg.name.split(" ").map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
        
        {/* Merkez Nokta */}
        <div className="absolute top-1/2 left-1/2 w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-full border-4 border-gray-900 -translate-x-1/2 -translate-y-1/2 shadow-lg z-10 flex items-center justify-center">
            <div className="w-3 h-3 sm:w-5 sm:h-5 bg-[#ba0c2f] rounded-full"></div>
        </div>
      </div>

      {/* Buton */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="mt-8 sm:mt-12 group relative inline-flex items-center justify-center px-8 py-3 sm:px-12 sm:py-4 text-lg sm:text-xl font-black text-white transition-all bg-[#ba0c2f] rounded-full hover:bg-[#a00a29] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(186,12,47,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-white/20"
      >
        <span className="relative z-10 flex items-center gap-2 sm:gap-3">
          {isSpinning ? "DÖNÜYOR..." : "ÇARKI ÇEVİR"}
        </span>
      </button>
    </div>
  );
}