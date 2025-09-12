import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Leader = {
  slug: string;
  name: string;
  title: string;
  photo?: string;
  linkedin?: string;
  bio_tr?: string;
  bio_en?: string;
};

const LEADERS_DIR = path.join(process.cwd(), "content", "leaders");

export function getAllLeaders(): Leader[] {
  const files = fs.readdirSync(LEADERS_DIR).filter(f => f.endsWith(".md"));
  return files.map((file) => {
    const src = fs.readFileSync(path.join(LEADERS_DIR, file), "utf8");
    const { data } = matter(src);
    return {
      slug: data.slug ?? file.replace(/\.md$/, ""),
      name: data.name ?? "Unnamed",
      title: data.title ?? "",
      photo: data.photo ?? "",
      linkedin: data.linkedin ?? "",
      bio_tr: data.bio_tr ?? "",
      bio_en: data.bio_en ?? "",
    } as Leader;
  }).sort((a, b) => a.name.localeCompare(b.name));
}