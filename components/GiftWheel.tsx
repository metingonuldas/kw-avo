"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface GiftWheelProps {
  items: string[];
  onSpinEnd: (winner: string) => void;
}

export default function GiftWheel({ items, onSpinEnd }: GiftWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  
  // Ses referansları
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);

  // useRef ile dönüş açısını hafızada tutuyoruz (Sürekli ileri dönüş için)
  const rotationRef = useRef(0);
  
  // KW Kurumsal Renk Paleti
  const colors = ["#ba0c2f", "#111111", "#991b1b", "#333333", "#dc2626", "#555555"];
  const numSegments = items.length;
  const segmentAngle = 360 / numSegments;

  // Ses dosyalarını yükle
  useEffect(() => {
    // Ses dosyalarının public/sounds klasöründe olduğunu varsayıyoruz
    // Eğer dosyalar yoksa hata vermemesi için try-catch bloğu veya kontrol eklenebilir ama
    // tarayıcılar genellikle dosya bulunamazsa sadece konsola 404 yazar, çökmez.
    spinAudioRef.current = new Audio("/sounds/spin.mp3");
    winAudioRef.current = new Audio("/sounds/win.mp3");
    
    if (spinAudioRef.current) {
        spinAudioRef.current.loop = true; 
        spinAudioRef.current.volume = 0.5;
    }
    if (winAudioRef.current) {
        winAudioRef.current.volume = 0.8;
    }
  }, []);

  // Dilimleri oluşturacak CSS Gradyan kodu
  const gradientString = items
    .map((_, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      const color = colors[index % colors.length];
      return `${color} ${startAngle}deg ${endAngle}deg`;
    })
    .join(", ");

  const spin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Dönüş sesini başlat
    if (spinAudioRef.current) {
        spinAudioRef.current.currentTime = 0;
        spinAudioRef.current.play().catch(e => console.log("Ses çalma hatası (Dosya eksik olabilir):", e));
    }

    const randomIndex = Math.floor(Math.random() * numSegments);
    const extraSpins = 5; // Her seferinde en az 5 tam tur
    
    // Hedefin (Seçilen ödülün) merkez açısını hesapla
    // Çarkın 0 derecesi (Saat 12 yönü) referans alınır.
    const segmentCenter = randomIndex * segmentAngle + segmentAngle / 2;
    
    // Hedefin göstergeye (Saat 12'ye) gelmesi için gereken açı: 360 - merkez
    const targetAngle = 360 - segmentCenter;

    // Mevcut toplam dönüş miktarını al
    const currentRotation = rotationRef.current;
    
    // Şu anki görsel açımızı (0-360 arası) bulalım
    const normalizedRotation = currentRotation % 360;
    
    // Hedefe ulaşmak için gereken farkı hesapla
    let adjustment = targetAngle - normalizedRotation;
    
    // Hep ileri gitmek istiyoruz, eğer fark negatifse bir tur ekle
    if (adjustment < 0) {
      adjustment += 360;
    }
    
    // Yeni toplam açı = Eski Açı + (Ekstra Turlar) + (Hedef Ayarı)
    const newTotalRotation = currentRotation + (360 * extraSpins) + adjustment;

    // Yeni değeri kaydet
    rotationRef.current = newTotalRotation;

    await controls.start({
      rotate: newTotalRotation,
      transition: { 
        duration: 5, 
        ease: [0.16, 1, 0.3, 1] // Daha doğal bir yavaşlama eğrisi (Bezier)
      },
    });

    setIsSpinning(false);
    
    // Dönüş sesini durdur
    if (spinAudioRef.current) {
        spinAudioRef.current.pause();
        spinAudioRef.current.currentTime = 0;
    }
    
    // Kazanma sesini çal
    if (winAudioRef.current) {
        winAudioRef.current.play().catch(e => console.log("Ses çalma hatası:", e));
    }

    onSpinEnd(items[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      {/* Gösterge Oku */}
      <div className="relative z-20 -mb-6 drop-shadow-xl">
        <div className="h-12 w-10 bg-white border-4 border-gray-900" 
             style={{ 
               clipPath: "polygon(50% 100%, 0 0, 100% 0)", 
             }} 
        />
      </div>

      {/* Çarkın Gövdesi */}
      <div className="relative rounded-full border-[8px] border-gray-900 shadow-2xl overflow-hidden bg-black">
        <motion.div
          className="relative rounded-full"
          animate={controls}
          initial={{ rotate: 0 }}
          style={{
            width: "min(90vw, 500px)",
            height: "min(90vw, 500px)",
            background: `conic-gradient(${gradientString})`,
          }}
        >
          {items.map((item, index) => {
            const rotation = segmentAngle * index + segmentAngle / 2;
            
            return (
              <div
                key={index}
                className="absolute top-0 left-0 w-full h-full flex justify-center"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {/* Yazı Alanı - Eski Düzen (Yatay, kelime bazlı alt alta) */}
                {/* pt-4 ile dış kenardan (yukarıdan) biraz boşluk bırakıyoruz */}
                <div className="pt-4 sm:pt-8 h-1/2 flex flex-col justify-start items-center">
                   <div
                    className="text-white font-bold uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs drop-shadow-md text-center leading-tight w-[60px] sm:w-[80px]"
                  >
                    {/* Kelimeleri boşluktan bölüp alt alta yazdırıyoruz */}
                    {item.split(" ").map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
        
        {/* Çarkın Merkezindeki Dekoratif Nokta */}
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-900 -translate-x-1/2 -translate-y-1/2 shadow-lg z-10 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#ba0c2f] rounded-full"></div>
        </div>
      </div>

      {/* Başlat Butonu */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="mt-12 group relative inline-flex items-center justify-center px-12 py-4 text-xl font-black text-white transition-all bg-[#ba0c2f] rounded-full hover:bg-[#a00a29] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(186,12,47,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-white/20"
      >
        <span className="relative z-10 flex items-center gap-3">
          {isSpinning ? "DÖNÜYOR..." : "ÇARKI ÇEVİR"}
        </span>
      </button>
    </div>
  );
}