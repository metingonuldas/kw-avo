import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* Sol: Logo + telif */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/media/logos/kw-alestaviyaorsa.svg" // PNG kullanacaksan: "/images/kw-hero-c.png" + unoptimized
              alt="KWAVO"
              width={260}
              height={80}
              className="h-20 w-auto"
              // unoptimized
            />
          </Link>
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} KW Alesta • KW Viya • KW Orsa. Tüm hakları saklıdır.
          </p>
        </div>

        {/* Orta: Hızlı bağlantılar */}
        <div className="flex flex-col items-center md:items-center">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Bağlantılar
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
            <li><Link className="hover:underline" href="/about">Hakkımızda</Link></li>
            <li><Link className="hover:underline" href="/offices">Ofisler</Link></li>
            <li><Link className="hover:underline" href="/contact">İletişim</Link></li>
            <li><Link className="hover:underline" href="/press">Basın</Link></li>
          </ul>
        </div>

        {/* Sağ: Kurumsal grubu */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Kurumsal
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li><Link className="hover:underline" href="/leadership">Liderlik</Link></li>
            <li><Link className="hover:underline" href="/technology">Teknoloji</Link></li>
            <li><Link className="hover:underline" href="/media">Media Kit</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}