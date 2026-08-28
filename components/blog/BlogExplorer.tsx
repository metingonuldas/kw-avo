"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostMeta } from "@/lib/blog";

type Category = { name: string; slug: string; count: number };

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function BlogExplorer({ posts, categories }: { posts: BlogPostMeta[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    const term = normalize(query.trim());
    return posts.filter((post) => {
      const categoryMatches = activeCategory === "all" || post.categorySlug === activeCategory;
      if (!categoryMatches) return false;
      if (!term) return true;
      const searchable = normalize([
        post.title,
        post.description,
        post.category,
        post.searchText,
        ...post.tags,
      ].join(" "));
      return searchable.includes(term);
    });
  }, [activeCategory, posts, query]);

  const reset = () => {
    setQuery("");
    setActiveCategory("all");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
      <div className="rounded-[1.75rem] border border-black/8 bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.05)] sm:p-5">
        <div className="flex h-14 items-center gap-3 rounded-2xl border border-black/10 bg-[#faf9f8] px-4 transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-light">
          <Search className="h-5 w-5 shrink-0 text-neutral-400" aria-hidden />
          <input
            id="blog-search"
            type="search"
            aria-label="Blog yazılarında ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Blog yazılarında ara..."
            autoComplete="off"
            className="min-w-0 flex-1 appearance-none bg-transparent text-base text-neutral-950 outline-none placeholder:text-neutral-400 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="shrink-0 rounded-full p-2 text-neutral-400 transition hover:bg-black/5 hover:text-neutral-800" aria-label="Aramayı temizle">
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Kategoriye göre filtrele">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            aria-pressed={activeCategory === "all"}
            className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === "all" ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
          >
            Tümü <span className="ml-1 opacity-60">{posts.length}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              aria-pressed={activeCategory === category.slug}
              className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category.slug ? "bg-brand text-white" : "bg-brand-light text-brand hover:bg-brand hover:text-white"}`}
            >
              {category.name} <span className="ml-1 opacity-60">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-neutral-500" aria-live="polite">
          {filteredPosts.length} yazı gösteriliyor
        </p>
        {(query || activeCategory !== "all") && (
          <button type="button" onClick={reset} className="text-sm font-semibold text-brand hover:underline">
            Filtreleri temizle
          </button>
        )}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => <BlogCard key={post.slug} post={post} priority={index < 3} />)}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-black/15 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-neutral-950">Aramanızla eşleşen yazı bulunamadı</h2>
          <p className="mt-2 text-sm text-neutral-500">Farklı bir kelime deneyebilir veya filtreleri temizleyebilirsiniz.</p>
          <button type="button" onClick={reset} className="mt-5 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white">Tüm yazıları göster</button>
        </div>
      )}
    </section>
  );
}
