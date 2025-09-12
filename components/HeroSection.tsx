// components/HeroSection.tsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] grid place-items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        aria-hidden
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 text-center text-white">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Girişimcinin geliştiği yer
        </h1>
        <p className="mt-3 text-base sm:text-lg opacity-90">
          KW Alesta • KW Viya • KW Orsa
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium bg-white text-gray-900 hover:opacity-90 transition"
          >
            Danışman Ol
          </Link>
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium ring-1 ring-white/70 hover:bg-white/10 transition"
          >
            Eğitim Takvimi
          </Link>
        </div>
      </div>
    </section>
  );
}