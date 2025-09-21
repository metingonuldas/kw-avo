// app/media/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

const base = "/media";

const logos = [
  { title: "KW Alesta Logo (SVG)", file: `${base}/logos/kw-alesta.svg` },
  { title: "KW Viya Logo (SVG)", file: `${base}/logos/kw-viya.svg` },
  { title: "KW Orsa Logo (SVG)", file: `${base}/logos/kw-orsa.svg` },
  {
    title: "KW Alesta • Viya • Orsa Ortak Logo (SVG)",
    file: `${base}/logos/kw-alestaviyaorsa.svg`,
  },
];

const palette = [
  {
    name: "KW® Red",
    hex: "#CE011F",
    rgb: "206, 1, 31",
    pantone: "Pantone 200",
    cmyk: "0 100 66 13",
  },
  {
    name: "KW® Main Gray",
    hex: "#828282",
    rgb: "130, 130, 130",
    pantone: "Pantone 424",
    cmyk: "0 0 0 60",
  },
  {
    name: "Light Gray",
    hex: "#CCCCCC",
    rgb: "204, 204, 204",
    pantone: "-",
    cmyk: "0 0 0 25",
  },
  {
    name: "Medium Gray",
    hex: "#4D4D4D",
    rgb: "77, 77, 77",
    pantone: "-",
    cmyk: "0 0 0 85",
  },
  {
    name: "Black",
    hex: "#000000",
    rgb: "0, 0, 0",
    pantone: "-",
    cmyk: "40 20 20 100",
  },
];

export const dynamic = "force-static";

export default function MediaPage() {
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // no-op
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Media Kit</h1>
          <p className="mt-2 text-sm text-gray-600">
            KW Alesta • KW Viya • KW Orsa logoları ve marka kullanım dosyaları.
          </p>
        </div>

        <a
          href={`${base}/brand-kit.zip`}
          download
          className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-black text-white hover:opacity-90"
        >
          Tüm Paketi İndir (.zip)
        </a>
      </div>

      {/* Logos */}
      <section className="mt-8">
        <h2 className="text-lg font-medium">Logolar</h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((l) => (
            <div
              key={l.file}
              className="rounded-2xl border border-black/10 overflow-hidden bg-white"
            >
              <div className="relative aspect-[3/2] grid place-items-center p-6">
                <Image
                  src={l.file}
                  alt={l.title}
                  width={600}
                  height={400}
                  className="object-contain max-h-full max-w-full"
                />
              </div>

              <div className="p-4 flex items-center justify-between gap-3">
                <p className="text-sm">{l.title}</p>
                <a
                  href={l.file}
                  download
                  className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
                >
                  İndir
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marka Kullanım */}
      <section className="mt-10">
        <h2 className="text-lg font-medium">Marka Kullanım</h2>
        <div className="mt-3 space-y-3 text-sm text-gray-700">
          <p>
            Logolar yalnızca orantılı biçimde ölçeklenmeli; renkler
            değiştirilmemeli, eğilmemeli veya efekt eklenmemelidir. Yeterli
            boşluk bırakın ve arka plan kontrastını koruyun.
          </p>
          <ul className="list-disc pl-5">
            <li>Minimum logo genişliği: 120px (ekran), 25mm (baskı)</li>
            <li>Arka planlarda kontrastı koruyun</li>
            <li>Monokrom versiyon gerektiğinde kullanılabilir</li>
          </ul>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={`${base}/brand-guidelines.pdf`}
              className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
              target="_blank"
            >
              Marka Rehberi (PDF)
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
            >
              Kurumsal kullanım için iletişime geçin
            </Link>
          </div>

          <p className="text-xs text-gray-500 pt-2">
            Keller Williams® markası ve logoları Keller Williams Realty, Inc.’in
            tescilli markalarıdır. Yerel franchise ofisleri bağımsız olarak
            işletilir.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="mt-12">
        <h2 className="text-lg font-medium">Renk Paleti</h2>
        <p className="mt-2 text-sm text-gray-600">
          Baskıda Pantone/CMYK; dijitalde RGB/HEX değerlerini kullanın.
        </p>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((c) => (
            <div
              key={c.name + c.hex}
              className="rounded-2xl overflow-hidden border border-black/10 bg-white"
            >
              {/* Swatch */}
              <div
                className="h-24 w-full"
                style={{ backgroundColor: c.hex }}
                aria-label={`${c.name} swatch`}
              />
              {/* Details */}
              <div className="p-4 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{c.name}</p>
                  <span className="text-xs text-gray-500">{c.pantone}</span>
                </div>

                <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                  <div>
                    <dt className="text-[11px] text-gray-500">HEX</dt>
                    <dd className="font-mono">{c.hex}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-gray-500">RGB</dt>
                    <dd className="font-mono">{c.rgb}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-gray-500">CMYK</dt>
                    <dd className="font-mono">{c.cmyk}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => copy(c.hex)}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 ring-black/10 hover:bg-gray-50"
                  >
                    HEX kopyala
                  </button>
                  <button
                    onClick={() => copy(`rgb(${c.rgb})`)}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 ring-black/10 hover:bg-gray-50"
                  >
                    RGB kopyala
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}