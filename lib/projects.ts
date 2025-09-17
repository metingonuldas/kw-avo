import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  title: string;
  type: "project" | "villa" | "visa";
  country: string;
  city: string;
  developer: string;
  status: string;
  price_from: string;
  hero: string;
  gallery: string[];
  brochure: string;
  priority: number;
  published: boolean;
  date: string;
};

const DIR = path.join(process.cwd(), "content", "projects");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((file) => {
      const src = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data } = matter(src);

      return {
        slug: data.slug ?? file.replace(/\.(mdx|md)$/, ""),
        title: data.title ?? "Proje",
        type: (data.type ?? "project") as Project["type"],
        country: data.country ?? "",
        city: data.city ?? "",
        developer: data.developer ?? "",
        status: data.status ?? "",
        price_from: data.price_from ?? "",
        hero: data.hero ?? "",
        gallery: data.gallery ?? [],
        brochure: data.brochure ?? "",
        priority: Number(data.priority ?? 0),
        published: data.published ?? true,
        date: data.date ?? "",
      } as Project;
    })
    .filter((p) => p.published !== false)
    .sort((a, b) => {
      // Öncelik (priority) sırası
      const pa = a.priority ?? 0;
      const pb = b.priority ?? 0;
      if (pa !== pb) return pb - pa;

      // Tarihe göre (en yeni üstte)
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
}

export function getProjectBySlug(slug: string): { meta: Project; body: string } | null {
  const file = ["mdx", "md"]
    .map((ext) => path.join(DIR, `${slug}.${ext}`))
    .find((f) => fs.existsSync(f));

  if (!file) return null;

  const src = fs.readFileSync(file, "utf8");
  const { content, data } = matter(src);

  const meta: Project = {
    slug,
    title: data.title ?? "Proje",
    type: (data.type ?? "project") as Project["type"],
    country: data.country ?? "",
    city: data.city ?? "",
    developer: data.developer ?? "",
    status: data.status ?? "",
    price_from: data.price_from ?? "",
    hero: data.hero ?? "",
    gallery: data.gallery ?? [],
    brochure: data.brochure ?? "",
    priority: Number(data.priority ?? 0),
    published: data.published ?? true,
    date: data.date ?? "",
  };

  return { meta, body: content };
}