// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // ✅ Statik sayfalar (press ve media HARİÇ)
  const staticPaths = [
    "",               // home
    "about",
    "leadership",
    "technology",
    "offices",
    "contact",
    "projects",
    "culture-cards",
    // eğer varsa ekleyebilirsin:
    // "terms",
    // "privacy",
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}/${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  // ✅ Proje detay sayfaları (hepsi taransın)
  const projectPages: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}