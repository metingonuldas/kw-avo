import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllBlogPosts, getBlogCategories } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kwavo.net").replace(/\/$/, "");

  // Sitelinks adayı olan yüksek öncelikli sayfalar
  const highPriority = ["evimi-satmak-istiyorum", "danisman-ol", "projects", "offices", "contact", "technology"];
  
  // Standart öncelikli sayfalar
  const normalPriority = ["about", "leadership", "culture-cards", "scarlet", "blog"];

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

  const blogPosts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogCategories: MetadataRoute.Sitemap = getBlogCategories().map((category) => ({
    url: `${base}/blog/kategori/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...home, ...highPages, ...normalPages, ...projectPages, ...blogPosts, ...blogCategories];
}
