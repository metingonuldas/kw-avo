import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Image from "next/image";
import { getAllPressSlugs, getPressBySlug } from "@/lib/press";

export async function generateStaticParams() {
  return getAllPressSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { meta } = getPressBySlug(params.slug);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const og = `${base}/og?title=${encodeURIComponent(meta.title)}`;

  return {
    title: meta.title,
    description: meta.summary,
    openGraph: { title: meta.title, description: meta.summary, images: [og] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.summary, images: [og] },
  };
}

export default function PressArticle({ params }: { params: { slug: string } }) {
  let meta, content;
  try {
    ({ meta, content } = getPressBySlug(params.slug));
  } catch {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 prose prose-zinc">
      <div className="mb-6">
        <time className="text-xs text-gray-500">
          {new Date(meta.date).toLocaleDateString("tr-TR")}
        </time>
        <h1 className="mt-1">{meta.title}</h1>
        {meta.cover ? (
          <div className="relative aspect-[16/9] w-full my-4 rounded-xl overflow-hidden bg-gray-100">
            <Image src={meta.cover} alt="" fill className="object-cover" />
          </div>
        ) : null}
      </div>

      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
          },
        }}
      />
    </main>
  );
}
