import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleToc from "@/components/blog/ArticleToc";
import BlogCard from "@/components/blog/BlogCard";
import { extractBlogHeadings, getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || post.meta.draft) return {};
  const { meta } = post;
  const images = meta.cover
    ? [{ url: meta.cover, width: 1600, height: 900, alt: meta.coverAlt ?? meta.title }]
    : [{ url: "/og/default.png", width: 1994, height: 873, alt: "KW Alesta Viya Orsa" }];
  return {
    title: meta.seoTitle ?? meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${meta.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: `/blog/${meta.slug}`,
      publishedTime: meta.date,
      modifiedTime: meta.updatedAt,
      authors: [meta.author],
      tags: meta.tags,
      images,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || post.meta.draft) notFound();
  const { meta, content } = post;
  const headings = extractBlogHeadings(content);
  const related = getRelatedBlogPosts(meta);
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kwavo.net").replace(/\/$/, "");
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updatedAt ?? meta.date,
    inLanguage: "tr-TR",
    articleSection: meta.category,
    keywords: meta.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${base}/blog/${meta.slug}` },
    image: meta.cover ? { "@type": "ImageObject", url: `${base}${meta.cover}`, width: 1600, height: 900 } : undefined,
    author: { "@type": "Organization", name: meta.author, url: base },
    publisher: {
      "@type": "Organization",
      name: "KW Alesta Viya Orsa",
      url: base,
      logo: { "@type": "ImageObject", url: `${base}/media/logos/kw-alestaviyaorsa.svg` },
    },
    isPartOf: { "@type": "Blog", name: "KW Alesta Viya Orsa Blog", url: `${base}/blog` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: base },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${base}/blog/${meta.slug}` },
    ],
  };

  return (
    <main className="bg-[#faf9f8]">
      <article>
        <header className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-neutral-500" aria-label="İçerik yolu">
              <Link href="/blog" className="hover:text-brand">Blog</Link><span aria-hidden>/</span>
              <Link href={`/blog/kategori/${meta.categorySlug}`} className="hover:text-brand">{meta.category}</Link>
            </nav>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-neutral-500">
              <span className="rounded-full bg-brand-light px-3 py-1 text-brand">{meta.category}</span>
              <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</time>
              <span>{meta.readingTime} dk okuma</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.045em] text-neutral-950 sm:text-6xl">{meta.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">{meta.description}</p>
            <p className="mt-6 text-sm font-medium text-neutral-700">{meta.author}</p>
          </div>
        </header>

        {meta.cover && (
          <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-neutral-100 shadow-[0_24px_80px_rgba(0,0,0,0.1)] sm:aspect-[16/8] sm:rounded-[2rem]">
              <Image src={meta.cover} alt={meta.coverAlt ?? meta.title} fill priority sizes="(max-width: 1200px) 100vw, 1152px" className="object-cover" />
            </div>
          </div>
        )}

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-16">
          <div className="min-w-0 rounded-[1.5rem] border border-black/5 bg-white px-5 py-7 shadow-sm sm:rounded-[2rem] sm:px-10 sm:py-12">
            {headings.filter((heading) => heading.level === 2).length >= 2 && (
              <details className="mb-8 rounded-2xl border border-black/8 bg-[#faf9f8] p-4 lg:hidden">
                <summary className="cursor-pointer font-semibold text-neutral-900">Bu yazıda</summary>
                <ol className="mt-4 space-y-3 border-t border-black/8 pt-4 text-sm leading-5">
                  {headings.filter((heading) => heading.level === 2).map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="text-neutral-600 transition hover:text-brand">{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <ArticleBody source={content} />
          </div>
          <aside className="hidden lg:block"><ArticleToc headings={headings} /></aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">İlgili yazılar</h2>
          <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <BlogCard key={item.slug} post={item} />)}</div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  );
}
