import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: string;
  cover?: string;
  coverAlt?: string;
  featured: boolean;
  draft: boolean;
  readingTime: number;
  searchText: string;
};

export type BlogPost = {
  meta: BlogPostMeta;
  content: string;
};

export type BlogHeading = {
  level: 2 | 3;
  text: string;
  id: string;
};

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value.trim()) return value;
  return new Date().toISOString();
}

export function slugifyCategory(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const slugifyHeading = slugifyCategory;

export function extractBlogHeadings(content: string): BlogHeading[] {
  return content
    .split("\n")
    .map((line) => line.match(/^(##|###)\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const text = match[2].replace(/[*_`\[\]]/g, "").trim();
      return {
        level: match[1] === "##" ? 2 : 3,
        text,
        id: slugifyHeading(text),
      };
    });
}

function estimateReadingTime(content: string): number {
  const plainText = toPlainText(content);
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function toPlainText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`\[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parsePost(file: string): BlogPost {
  const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(source);
  const slug = file.replace(/\.mdx?$/, "");
  const category = String(data.category ?? "Keller Williams");

  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
      description: String(data.description ?? data.summary ?? ""),
      date: toDateString(data.date),
      updatedAt: data.updatedAt ? toDateString(data.updatedAt) : undefined,
      category,
      categorySlug: slugifyCategory(category),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      author: String(data.author ?? "KW Alesta Viya Orsa"),
      cover: data.cover ? String(data.cover) : undefined,
      coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
      featured: Boolean(data.featured),
      draft: Boolean(data.draft),
      readingTime: estimateReadingTime(content),
      searchText: toPlainText(content),
    },
    content,
  };
}

function blogFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => /\.mdx?$/.test(file));
}

export function getAllBlogPosts(options: { includeDrafts?: boolean } = {}): BlogPostMeta[] {
  return blogFiles()
    .map((file) => parsePost(file).meta)
    .filter((post) => options.includeDrafts || !post.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = blogFiles().find((name) => name.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  return parsePost(file);
}

export function getBlogCategories() {
  const counts = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of getAllBlogPosts()) {
    const current = counts.get(post.categorySlug);
    counts.set(post.categorySlug, {
      name: post.category,
      slug: post.categorySlug,
      count: (current?.count ?? 0) + 1,
    });
  }
  return [...counts.values()].sort((a, b) => a.name.localeCompare(b.name, "tr-TR"));
}

export function getBlogPostsByCategory(categorySlug: string): BlogPostMeta[] {
  return getAllBlogPosts().filter((post) => post.categorySlug === categorySlug);
}

export function getRelatedBlogPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
  return getAllBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.categorySlug === post.categorySlug ? 3 : 0) +
        candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || +new Date(b.candidate.date) - +new Date(a.candidate.date))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
