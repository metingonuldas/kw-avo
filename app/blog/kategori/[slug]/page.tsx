import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogCategories, getBlogPostsByCategory } from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);
  if (!category) return {};
  const title = `${category.name} Yazıları`;
  const description = `${category.name} hakkında güncel rehberler, deneyimler ve uygulanabilir bilgiler.`;
  const [firstPost] = getBlogPostsByCategory(slug);
  const images = firstPost?.cover
    ? [{ url: firstPost.cover, width: 1600, height: 900, alt: firstPost.coverAlt ?? firstPost.title }]
    : [{ url: "/og/default.png", width: 1994, height: 873, alt: "KW Alesta Viya Orsa" }];
  return {
    title,
    description,
    alternates: { canonical: `/blog/kategori/${slug}` },
    openGraph: { type: "website", title, description, url: `/blog/kategori/${slug}`, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);
  if (!category) notFound();
  const posts = getBlogPostsByCategory(slug);
  return (
    <main className="min-h-screen bg-[#faf9f8]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/blog" className="text-sm font-semibold text-brand">← Tüm yazılar</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">Kategori</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{category.name}</h1>
          <p className="mt-4 text-neutral-600">{category.count} rehber ve güncel içerik</p>
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-7 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-20">
        {posts.map((post, index) => <BlogCard key={post.slug} post={post} priority={index < 2} />)}
      </section>
    </main>
  );
}
