// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

const COLS = [
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/about" },
      { label: "Liderlik", href: "/leadership" },
      { label: "Teknoloji", href: "/technology" },
      { label: "Media Kit", href: "/media" },
    ],
  },
  {
    title: "Kaynaklar",
    links: [
      { label: "Ofisler", href: "/offices" },
      { label: "Projeler", href: "/projects" },
      { label: "Basın", href: "/press" },
      { label: "İletişim", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Logo + kısa metin */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/media/logos/kw-alestaviyaorsa.svg"
                alt="KW Alesta • KW Viya • KW Orsa"
                width={260}
                height={80}
                className="h-16 w-auto"
                priority
              />
            </Link>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              KW Alesta, KW Viya ve KW Orsa — eğitim, teknoloji ve paylaşım
              kültürüyle İzmir’de danışmanlarımızın üretimini büyütür.
            </p>
          </div>

          {/* Link sütunları */}
          <div className="md:col-span-8 grid gap-8 sm:grid-cols-2">
            {COLS.map((col) => (
              <nav key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {col.title}
                </h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-neutral-700 hover:text-black">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="mt-10 border-t pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            © {year} BTA GAYRİMENKUL TİCARET ANONİM ŞİRKETİ. Tüm hakları saklıdır.
            Yerel franchise ofisleri bağımsız olarak işletilir.
          </p>

          {/* Sosyal ikonlar */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/kwizmir"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-md p-2 ring-1 ring-black/10 hover:bg-neutral-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70 group-hover:opacity-100">
                <path
                  fill="currentColor"
                  d="M13 10h3l-1 4h-2v8h-4v-8H7v-4h2V8a5 5 0 0 1 5-5h2v4h-2a1 1 0 0 0-1 1z"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com/kwalestaviyaorsa"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-md p-2 ring-1 ring-black/10 hover:bg-neutral-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70 group-hover:opacity-100">
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3a6 6 0 1 1 0 12a6 6 0 0 1 0-12m0 2.2a3.8 3.8 0 1 0 0 7.6a3.8 3.8 0 0 0 0-7.6M18.5 6a1.1 1.1 0 1 1 0 2.2a1.1 1.1 0 0 1 0-2.2Z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/kwalestaviyaorsa"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-md p-2 ring-1 ring-black/10 hover:bg-neutral-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70 group-hover:opacity-100">
                <path
                  fill="currentColor"
                  d="M6.94 6.5A2.44 2.44 0 1 1 6.93 1.6a2.44 2.44 0 0 1 .01 4.9M2.5 22V8.7h4.9V22zm7.4 0V8.7h4.7v1.83h.07c.65-1.16 2.26-2.39 4.65-2.39c4.98 0 5.9 3.28 5.9 7.54V22h-4.9v-5.7c0-1.36-.02-3.1-1.9-3.1c-1.91 0-2.2 1.49-2.2 3v5.8z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}