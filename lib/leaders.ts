// lib/leaders.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type OfficeKey = "alesta" | "viya" | "orsa";

export type Leader = {
  slug: string;
  name: string;
  title: string;
  photo?: string;

  /** Liste sırası (küçük sayı = önce) */
  order?: number;

  /** Bu liderin bağlı olduğu ofis(ler) */
  offices?: OfficeKey[];

  linkedin?: string;
  instagram?: string;
  email?: string;
  phone?: string;
};

const LEADERS_DIR = path.join(process.cwd(), "content", "leaders");

export function getAllLeaders(): Leader[] {
  const files = fs.readdirSync(LEADERS_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const src = fs.readFileSync(path.join(LEADERS_DIR, file), "utf8");
      const { data } = matter(src);

      // offices alanını güvenli şekilde parse et
      const offices = Array.isArray(data.offices)
        ? (data.offices.filter((o: unknown) =>
            typeof o === "string" &&
            (o === "alesta" || o === "viya" || o === "orsa")
          ) as OfficeKey[])
        : undefined;

      // order: sayı yoksa 999 (sona at)
      let order: number | undefined;
      if (typeof data.order === "number") {
        order = data.order;
      } else if (typeof data.order === "string" && !Number.isNaN(Number(data.order))) {
        order = Number(data.order);
      } else {
        order = 999;
      }

      const leader: Leader = {
        slug: data.slug ?? file.replace(/\.md$/, ""),
        name: data.name ?? "İsimsiz",
        title: data.title ?? "",
        photo: data.photo ?? "",
        order,
        offices,
        linkedin: data.linkedin || "",
        instagram: data.instagram || "",
        email: data.email || "",
        phone: data.phone || "",
      };

      return leader;
    })
    .sort((a, b) => {
      // önce order’a göre, eşitse isme göre sırala
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name, "tr");
    });
}