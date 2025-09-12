// lib/press.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PressMeta = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  summary?: string;
  cover?: string;
};

const PRESS_DIR = path.join(process.cwd(), "content", "press");

export function getAllPress(): PressMeta[] {
  const files = fs.readdirSync(PRESS_DIR).filter(f => f.endsWith(".mdx"));
  const items = files.map((file) => {
    const source = fs.readFileSync(path.join(PRESS_DIR, file), "utf8");
    const { data } = matter(source);
    const slug = file.replace(/\.mdx$/, "");
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      tags: data.tags ?? [],
      summary: data.summary ?? "",
      cover: data.cover ?? "",
    } as PressMeta;
  });
  return items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPressBySlug(slug: string) {
  const full = path.join(PRESS_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(full, "utf8");
  const { data, content } = matter(source);
  const meta: PressMeta = {
    slug,
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString(),
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    cover: data.cover ?? "",
  };
  return { meta, content };
}

export function getAllPressSlugs() {
  return fs.readdirSync(PRESS_DIR)
    .filter(f => f.endsWith(".mdx"))
    .map(f => f.replace(/\.mdx$/, ""));
}