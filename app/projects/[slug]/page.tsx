import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProjectBySlug, type Project } from "@/lib/projects";
import GalleryGrid from "@/components/projects/GalleryGrid";

// Artık params bir Promise tipinde:
type Params = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Params) {
  // <-- params'ı await et
  const { slug } = await params;

  const data = getProjectBySlug(slug);
  if (!data) return notFound();

  const p: Project = data.meta;

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/projects" className="hover:underline">
          Projeler
        </Link>{" "}
        / <span className="text-gray-700">{p.title}</span>
      </nav>

      {/* Başlık */}
      <header className="mt-2">
        <h1 className="text-3xl font-semibold">{p.title}</h1>
        {(p.city || p.country) && (
          <p className="mt-1 text-gray-600">
            {[p.city, p.country].filter(Boolean).join(", ")}
          </p>
        )}
      </header>

      {/* Hero */}
      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={p.hero}
          alt={p.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Özet */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryItem label="Tür" value={badgeText(p.type)} />
        {p.status && <SummaryItem label="Durum" value={p.status} />}
        {p.developer && <SummaryItem label="Geliştirici" value={p.developer} />}
        {p.price_from && <SummaryItem label="Başlangıç" value={p.price_from} />}
      </section>

      {/* Galeri */}
      {p.gallery?.length ? (
        <>
          <h2 className="mt-10 text-lg font-medium">Galeri</h2>
          <div className="mt-4">
            <GalleryGrid images={p.gallery} aspect="square" />
          </div>
        </>
      ) : null}

      {/* Aksiyonlar */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          İletişime Geç
        </Link>
        {p.brochure ? (
          <a
            href={p.brochure}
            className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
            target="_blank"
            rel="noreferrer"
          >
            Broşürü indir (PDF)
          </a>
        ) : null}
      </div>
    </main>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function badgeText(type: Project["type"]) {
  if (type === "visa") return "Golden Visa";
  if (type === "villa") return "Villa";
  return "Proje";
}