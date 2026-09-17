import type { Metadata } from "next";
import Link from "next/link";
import BlogExplorer from "@/components/blog/BlogExplorer";
import { getAllBlogPosts, getBlogCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Gayrimenkul ve Emlak Danışmanlığı Blogu",
  description: "Emlak danışmanlığı, gayrimenkul kariyeri, eğitim, teknoloji ve Keller Williams iş modeli hakkında güncel rehberler.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
  openGraph: {
    title: "Gayrimenkul ve Emlak Danışmanlığı Blogu | KW Alesta Viya Orsa",
    description: "Gayrimenkul kariyerini bilgi, sistem ve teknolojiyle büyütmek isteyenler için rehberler.",
    url: "/blog",
    type: "website",
    images: [{
      url: "/images/blog/gayrimenkul-danismanligi-size-uygun-mu.jpg",
      width: 1600,
      height: 900,
      alt: "Gayrimenkul ve emlak danışmanlığı rehberleri",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gayrimenkul ve Emlak Danışmanlığı Blogu | KW Alesta Viya Orsa",
    description: "Gayrimenkul kariyerini bilgi, sistem ve teknolojiyle büyütmek isteyenler için rehberler.",
    images: ["/images/blog/gayrimenkul-danismanligi-size-uygun-mu.jpg"],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getBlogCategories();
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kwavo.net").replace(/\/$/, "");
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gayrimenkul ve Emlak Danışmanlığı Blogu",
    description: "Emlak danışmanlığı, gayrimenkul kariyeri, eğitim, teknoloji ve Keller Williams iş modeli hakkında güncel rehberler.",
    url: `${base}/blog`,
    inLanguage: "tr-TR",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${base}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <main className="overflow-hidden bg-[#faf9f8]">
      <section className="relative border-b border-black/5 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(186,12,47,0.1),transparent_28%),radial-gradient(circle_at_82%_5%,rgba(0,0,0,0.06),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Bilgiyle büyüyen kariyerler</p>
            <h1 className="mt-5 max-w-3xl text-[2.25rem] font-semibold leading-[1.03] tracking-[-0.045em] text-neutral-950 sm:text-6xl">
              Gayrimenkulde başarı için doğru bilgi, gerçek deneyim.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
              Emlak danışmanlığına başlamak, uzmanlığını geliştirmek ve kendi işini sistemlerle büyütmek isteyenler için uygulanabilir rehberler.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <span>{posts.length} özgün rehber</span>
              <span aria-hidden>•</span>
              <span>{categories.length} konu kategorisi</span>
            </div>
          </div>
        </div>
      </section>

      <BlogExplorer posts={posts} categories={categories} />

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950 px-7 py-10 text-white sm:px-12 sm:py-14">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand opacity-40 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">Kariyerini keşfet</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">Gayrimenkul danışmanlığı sana uygun mu?</h2>
            <p className="mt-4 leading-7 text-neutral-300">KW Alesta Viya Orsa’nın eğitim, teknoloji ve liderlik sistemiyle İzmir’de nasıl bir kariyer kurabileceğini birlikte değerlendirelim.</p>
            <Link href="/danisman-ol" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-red-50">
              Danışmanlığı keşfet
            </Link>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
    </main>
  );
}
