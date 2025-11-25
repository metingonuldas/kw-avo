import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Bakım Modu | KWAVO",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <Image
        src="/media/logos/kw-alestaviyaorsa.svg"
        alt="KW Alesta • KW Viya • KW Orsa"
        width={220}
        height={80}
        className="mb-6"
        priority
      />

      <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800 text-xs">
        Bakım Modu
      </div>

      <h1 className="mt-4 text-2xl sm:text-3xl font-semibold">
        Kısa bir bakım çalışması yapıyoruz
      </h1>
      <p className="mt-3 text-sm text-gray-600 max-w-md">
        Siteyi çok yakında tekrar erişime açacağız. Anlayışınız için teşekkürler.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">

        <a
          href="mailto:info@kwavo.net"
          className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
        >
          info@kwavo.net
        </a>
      </div>
    </main>
  );
}