import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

export default function BlogCard({ post, priority = false }: { post: BlogPostMeta; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/8 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.1)]">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-neutral-100">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt ?? post.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(186,12,47,0.2),transparent_48%),linear-gradient(145deg,#f6f3f4,#ebe7e8)]" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500">
          <Link href={`/blog/kategori/${post.categorySlug}`} className="rounded-full bg-brand-light px-3 py-1 text-brand hover:bg-brand hover:text-white">
            {post.category}
          </Link>
          <span>{post.readingTime} dk okuma</span>
        </div>

        <h2 className="mt-4 text-xl font-semibold leading-tight tracking-[-0.025em] text-neutral-950 sm:text-2xl">
          <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-brand">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">{post.description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 text-sm">
          <time dateTime={post.date} className="text-neutral-500">
            {new Date(post.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          <Link href={`/blog/${post.slug}`} className="font-semibold text-brand" aria-label={`Yazıyı oku: ${post.title}`}>
            Yazıyı oku <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
