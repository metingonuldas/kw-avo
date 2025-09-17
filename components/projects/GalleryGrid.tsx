import Image from "next/image";

type Props = {
  images: string[];
  /** Galeri kutularının oranı: kare ya da geniş */
  aspect?: "square" | "wide";
};

export default function GalleryGrid({ images, aspect = "wide" }: Props) {
  // Kare için 'aspect-square', geniş için 4:3 (md'de 16:9)
  const ratioClass =
    aspect === "square" ? "aspect-square" : "aspect-[4/3] md:aspect-[16/9]";

  return (
    <section className="mt-10">
      <h2 className="text-lg font-medium mb-3">Galeri</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <div
            key={src + i}
            className={`relative ${ratioClass} overflow-hidden rounded-2xl bg-gray-100 border border-black/10`}
          >
            <Image
              src={src}
              alt={`Galeri görseli ${i + 1}`}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}