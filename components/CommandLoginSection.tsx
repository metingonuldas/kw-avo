"use client";

export default function CommandLoginSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl my-12 shadow-2xl border border-black/10 group">
      {/* --- Arka Plan Videosu --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      >
        <source src="/videos/kw_command_bg-video.mp4" type="video/mp4" />
        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white/20 text-4xl font-bold">
          KW COMMAND
        </div>
      </video>

      {/* --- Karartma Katmanı (Overlay) --- */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10" />

      {/* --- İçerik --- */}
      <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-5xl text-white">
        
        {/* Üst Etiket */}
        <div className="inline-flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
           <div className="w-1.5 h-12 bg-[#ba0c2f]" /> {/* KW Kırmızı Çizgi */}
           <div>
             <span className="block text-xs font-bold tracking-[0.2em] text-[#ba0c2f] uppercase mb-1">
               Teknoloji Ortağınız
             </span>
             <span className="block text-2xl md:text-3xl font-light tracking-wide text-white">
               KW Command
             </span>
           </div>
        </div>
        
        {/* Başlık */}
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Gayrimenkulün Geleceğini <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba0c2f] to-red-400">
            Bugünden Yönetin
          </span>
        </h2>
        
        {/* Açıklama */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Veri tabanı yönetiminden pazarlamaya, işlem takibinden raporlamaya kadar 
          ihtiyacınız olan her şey tek bir akıllı platformda. İşinizi büyütmek hiç bu kadar kolay olmamıştı.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <a 
            href="https://console.command.kw.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#ba0c2f] hover:bg-[#a00a29] text-white text-lg font-bold rounded-xl transition-all hover:shadow-[0_0_30px_-5px_rgba(186,12,47,0.5)] active:scale-95 group/btn"
          >
            Command'e Giriş Yap
            <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}