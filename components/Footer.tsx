// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

const linksLeft = [
  { label: "Hakkımızda", href: "/about" },
  { label: "Ofisler", href: "/offices" },
  { label: "İletişim", href: "/contact" },
  { label: "Basın", href: "/press" },
];

const linksRight = [
  { label: "Liderlik", href: "/leadership" },
  { label: "Teknoloji", href: "/technology" },
  { label: "Media Kit", href: "/media" },
  { label: "Projeler", href: "/projects" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-neutral-50/70">
      {/* üst şerit – ufak CTA */}
      <div className="bg-gradient-to-r from-neutral-100 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium">
            İzmir’de gayrimenkulde daha büyük işler kurmak için buradayız.
          </h3>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Danışman Ol
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-white"
            >
              Hakkımızda
            </Link>
          </div>
        </div>
      </div>

      {/* ana alan */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid gap-10 md:grid-cols-12">
          {/* marka bloğu */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/media/logos/kw-alestaviyaorsa.svg"
                alt="KW Alesta • KW Viya • KW Orsa"
                width={360}
                height={100}
                className="h-16 w-auto"
                priority
              />
            </Link>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              KW Alesta, KW Viya ve KW Orsa — eğitim,
              teknoloji ve paylaşım kültürüyle danışmanlarımızın üretimini
              büyütür.
            </p>

            {/* sosyal */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://instagram.com/kwalestaviyaorsa"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg p-2 ring-1 ring-black/10 hover:bg-white"
              >
                {/* instagram icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70 group-hover:opacity-100">
                  <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3a6 6 0 1 1 0 12a6 6 0 0 1 0-12m0 2.2a3.8 3.8 0 1 0 0 7.6a3.8 3.8 0 0 0 0-7.6M18.5 6a1.1 1.1 0 1 1 0 2.2a1.1 1.1 0 0 1 0-2.2Z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/kwalestaviyaorsa"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg p-2 ring-1 ring-black/10 hover:bg-white"
              >
                {/* linkedin icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70 group-hover:opacity-100">
                  <path fill="currentColor" d="M6.94 6.5A2.44 2.44 0 1 1 6.93 1.6a2.44 2.44 0 0 1 .01 4.9M2.5 22V8.7h4.9V22zm7.4 0V8.7h4.7v1.83h.07c.65-1.16 2.26-2.39 4.65-2.39c4.98 0 5.9 3.28 5.9 7.54V22h-4.9v-5.7c0-1.36-.02-3.1-1.9-3.1c-1.91 0-2.2 1.49-2.2 3v5.8z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/kwizmir"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg p-2 ring-1 ring-black/10 hover:bg-white"
              >
                {/* facebook icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="opacity-70 group-hover:opacity-100"
                >
                  <path
                    fill="currentColor"
                    d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1c.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v2h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* link sütunları */}
          <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Bağlantılar
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                {linksLeft.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Kurumsal
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                {linksRight.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* küçük adres bloğu (opsiyonel – istersen düzenle/sil) */}
            <div className="col-span-2 rounded-2xl border border-black/10 bg-white/70 p-4">
              <p className="text-sm font-medium">KW Alesta • KW Viya • KW Orsa</p>
              <p className="text-xs text-neutral-600 mt-1">
                İzmir’de üç lokasyon: Ege Perla • Çiğli • Urla
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <Link href="/offices" className="rounded-lg px-3 py-1 ring-1 ring-black/10 hover:bg-neutral-50">
                  Ofislerimiz
                </Link>
                <Link href="/projects" className="rounded-lg px-3 py-1 ring-1 ring-black/10 hover:bg-neutral-50">
                  Projeler
                </Link>
                <Link href="/contact" className="rounded-lg px-3 py-1 ring-1 ring-black/10 hover:bg-neutral-50">
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* alt çizgi */}
        <div className="mt-8 border-t pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
          <p>
            © {year} KW Alesta • KW Viya • KW Orsa. Tüm hakları saklıdır.
            Yerel franchise ofisleri bağımsız olarak işletilir.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Gizlilik
            </Link>
            <Link href="/terms" className="hover:underline">
              Kullanım Şartları
            </Link>
            <a
              href="mailto:hello@kwavo.com"
              className="hover:underline"
            >
              hello@kwavo.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}