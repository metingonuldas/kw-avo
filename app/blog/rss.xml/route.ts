import { getAllBlogPosts } from "@/lib/blog";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kwavo.net").replace(/\/$/, "");
  const posts = getAllBlogPosts();
  const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${base}/blog/${post.slug}</link>
      <guid isPermaLink="true">${base}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      ${post.cover ? `<enclosure url="${base}${post.cover}" type="image/jpeg" />` : ""}
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>KW Alesta Viya Orsa Blog</title>
    <link>${base}/blog</link>
    <description>Gayrimenkul kariyeri, eğitim, teknoloji ve Keller Williams iş modeli hakkında güncel rehberler.</description>
    <language>tr-TR</language>
    <lastBuildDate>${new Date(posts[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
