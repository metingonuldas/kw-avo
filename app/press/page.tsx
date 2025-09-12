import Link from "next/link";
import Image from "next/image";
import { getAllPress } from "@/lib/press";

export const dynamic = "force-static";

export default function PressPage() {
  const items = getAllPress();
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Basın Bültenleri</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <Link key={item.slug} href={`/press/${item.slug}`}
                className="group rounded-2xl border border-black/10 overflow-hidden hover:shadow-sm transition">
            <div className="relative aspect-[16/9] bg-gray-100">
              {item.cover ? (
                <Image src={item.cover} alt="" fill className="object-cover" />
              ) : null}
            </div>
            <div className="p-4">
              <time className="text-xs text-gray-500">
                {new Date(item.date).toLocaleDateString("tr-TR")}
              </time>
              <h2 className="mt-1 text-lg font-medium group-hover:underline">{item.title}</h2>
              {item.summary ? (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.summary}</p>
              ) : null}
              {item.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100">
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}