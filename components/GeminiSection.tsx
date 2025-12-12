"use client";

// Önizleme ortamı için standart <img> kullanıyoruz.
// Gerçek projede: import Image from "next/image";

export default function GeminiSection() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-white">
      {/* Arka Plan Efekti (KW Kırmızı/Gri Gradyan) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 -z-10" />
      
      {/* Dekoratif Şekiller - KW Renkleri */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ba0c2f]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Sol: Görsel / Logo Alanı */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100 p-8 group hover:scale-[1.02] transition-transform duration-500">
              
              {/* Arkadaki kırmızı hare */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ba0c2f]/10 to-black/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <img
                src="/images/Google_Gemini_logo_2025.svg"
                alt="Google Gemini Logo"
                width={300}
                height={100}
                className="w-3/4 h-auto drop-shadow-sm"
              />
              
              {/* Sağ alt köşe ikon - Kırmızı Çerçeve */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white rounded-2xl shadow-lg border border-[#ba0c2f]/10 flex items-center justify-center p-4 rotate-12 group-hover:rotate-6 transition-transform duration-300">
                 <img
                    src="/images/Google_Gemini_icon_2025.svg"
                    alt="Gemini Icon"
                    width={40}
                    height={40}
                    className="w-full h-full"
                 />
              </div>
            </div>
          </div>

          {/* Sağ: Metin Alanı */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ba0c2f]/10 text-[#ba0c2f] text-xs font-bold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ba0c2f] animate-pulse" />
              KW Danışmanlarına Ücretsiz
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Yapay Zeka Gücü <br/>
              <span className="text-[#ba0c2f]">
                Gemini Pro
              </span> ile İşinizde
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Google'ın en gelişmiş yapay zeka modeli <strong>Gemini Pro</strong>, Keller Williams teknolojisiyle birleşiyor. 
              İlan metinleri, pazar analizleri ve müşteri iletişimi artık çok daha hızlı ve akıllı.
            </p>

            <ul className="space-y-4 mb-10 text-left mx-auto md:mx-0 max-w-md">
              {[
                "Saniyeler içinde profesyonel ilan açıklamaları",
                "Detaylı bölge analizleri ve veri yorumlama",
                "Kişiselleştirilmiş pazarlama stratejileri",
                "7/24 Akıllı asistan desteği"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <svg className="w-6 h-6 text-[#ba0c2f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <a 
              href="https://gemini.google.com/"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ba0c2f] hover:bg-[#a00a29] text-white text-lg font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-95 group"
            >
              Gemini'yi Keşfet
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}