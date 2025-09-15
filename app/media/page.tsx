// app/media/page.tsx
import Link from "next/link";
import Image from "next/image"; // ← EKLE

const base = "/media";

const logos = [
  { title: "KW Alesta Logo (SVG)", file: `${base}/logos/kw-alesta.svg` },
  { title: "KW Viya Logo (SVG)", file: `${base}/logos/kw-viya.svg` },
  { title: "KW Orsa Logo (SVG)", file: `${base}/logos/kw-orsa.svg` },
  { title: "KW Alesta • Viya • Orsa Ortak Logo (SVG)", file: `${base}/logos/kw-alestaviyaorsa.svg` },
];

export const dynamic = "force-static";

export default function MediaPage() {
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
            <div key={l.file} className="rounded-2xl border border-black/10 overflow-hidden">
              <div className="relative aspect-[3/2] bg-white grid place-items-center p-6">
                {/* width/height vererek optimize Image kullan */}
                <Image
                  src={l.file}
                  alt={l.title}
                  width={1200}
                  height={800}
                  className="max-h-full max-w-full p-6 h-auto w-auto"
                  priority={false}
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
            Logolar yalnızca orantılı biçimde ölçeklenmeli; renkler değiştirilmemeli, eğilmemeli veya efekt eklenmemelidir. Yeterli boşluk bırakın ve arka plan kontrastını koruyun.
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
            Keller Williams® markası ve logoları Keller Williams Realty, Inc.’in tescilli markalarıdır. Yerel franchise ofisleri bağımsız olarak işletilir.
          </p>
        </div>
      </section>
    </main>
  );
}