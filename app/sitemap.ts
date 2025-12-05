import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Sitelinks adayı olan yüksek öncelikli sayfalar
  const highPriority = ["projects", "offices", "contact", "technology"];
  
  // Standart öncelikli sayfalar
  const normalPriority = ["about", "leadership", "culture-cards"];

  // 1. Ana Sayfa (En Yüksek)
  const home: MetadataRoute.Sitemap = [{
    url: base,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }];

  // 2. Yüksek Öncelikli Sayfalar (0.9)
  const highPages: MetadataRoute.Sitemap = highPriority.map((p) => ({
    url: `${base}/${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Normal Sayfalar (0.7)
  const normalPages: MetadataRoute.Sitemap = normalPriority.map((p) => ({
    url: `${base}/${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 4. Proje Detay Sayfaları (0.8)
  const projectPages: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...home, ...highPages, ...normalPages, ...projectPages];
}