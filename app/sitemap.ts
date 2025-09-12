import { MetadataRoute } from "next";
import { getAllPress } from "@/lib/press";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    "", "about", "leadership", "press", "technology", "offices", "contact", "media",
  ].map((p) => ({
    url: `${base}/${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  // Press yazıları
  const pressPages: MetadataRoute.Sitemap = getAllPress().map((post) => ({
    url: `${base}/press/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...pressPages];
}