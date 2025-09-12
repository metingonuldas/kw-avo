import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Office = {
  slug: string;
  name: string;
  areas: string[];
  address: string;
  phone?: string;
  location: { lat: number; lng: number };
};

const DIR = path.join(process.cwd(), "content", "offices");

export function getAllOffices(): Office[] {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith(".md"));
  return files.map(file => {
    const src = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data } = matter(src);
    return {
      slug: data.slug ?? file.replace(/\.md$/, ""),
      name: data.name ?? "Office",
      areas: data.areas ?? [],
      address: data.address ?? "",
      phone: data.phone ?? "",
      location: data.location ?? { lat: 0, lng: 0 },
    } as Office;
  });
}