import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] w-full">
      {/* Arka plan görseli */}
      <Image
        src="/images/kw-hero-cover.jpg"
        alt="KWAVO"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Koyu overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* İçerik */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white max-w-2xl px-4">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Girişimcilerin Geliştiği Yer
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            KW Alesta • KW Viya • KW Orsa ile İzmir’de gayrimenkul sektörünü
            yeniden tanımlıyoruz.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/about"
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700"
            >
              Hakkımızda
            </a>
            <a
              href="/contact"
              className="rounded-xl bg-white/90 px-5 py-3 text-sm font-medium text-black hover:bg-white"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}