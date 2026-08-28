import type { BlogHeading } from "@/lib/blog";

export default function ArticleToc({ headings }: { headings: BlogHeading[] }) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label="İçindekiler" className="sticky top-24 rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">Bu yazıda</p>
      <ol className="mt-4 space-y-3 text-sm leading-5">
        {headings.filter((heading) => heading.level === 2).map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="text-neutral-600 transition hover:text-brand">{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
