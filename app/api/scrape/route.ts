import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

type Listing = {
  title: string;
  price: string;
  location: string;
  specs: string;
  link?: string;
  image?: string;
};

// -------- BASİT BELLEK CACHE -------- //
type CacheState = {
  data: Listing[];
  pagesFetched: number[];
  updatedAt: number;
};

let listingsCache: CacheState | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 dakika

function isCacheValid() {
  if (!listingsCache) return false;
  return Date.now() - listingsCache.updatedAt < CACHE_TTL_MS;
}

// Tek bir sayfayı çekip ilanları parse eden yardımcı fonksiyon
async function fetchListingsPage(page: number): Promise<Listing[]> {
  const targetUrl = `https://kwavo.com.tr/portfolio?page=${page}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      console.warn(
        `Siteye erişilemedi! Sayfa: ${page}, Durum kodu: ${response.status}`
      );
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const listings: Listing[] = [];

    $(".listing-card-one").each((_, element) => {
      // 1. Görsel
      const imageElement = $(element).find("img").first();
      let image =
        imageElement.attr("src") || imageElement.attr("data-src") || undefined;

      // 2. Başlık
      const title = $(element)
        .find("h3, h4, h5, .title")
        .text()
        .trim();

      // 3. Link
      let link = $(element).find("a").first().attr("href") || undefined;

      // 4. Fiyat
      const price = $(element)
        .find(".price, span:contains('₺'), span:contains('TL')")
        .text()
        .trim();

      // 5. Konum
      const location = $(element)
        .find(".location, .address, .fa-map-marker-alt + span")
        .text()
        .trim();

      // 6. Özellikler
      const details: string[] = [];
      $(element)
        .find("ul li")
        .each((_, li) => {
          const text = $(li).text().trim();
          if (text) details.push(text);
        });

      // Link ve resim düzeltmeleri
      if (link && !link.startsWith("http")) {
        link = `https://kwavo.com.tr${link}`;
      }
      if (image && !image.startsWith("http")) {
        image = `https://kwavo.com.tr${image}`;
      }

      if (title) {
        listings.push({
          title,
          price: price || "Fiyat Belirtilmemiş",
          location: location || "Konum Yok",
          specs: details.join(" • "),
          link,
          image,
        });
      }
    });

    return listings;
  } catch (err) {
    console.error(`Sayfa çekilirken hata oluştu: ${page}`, err);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get("page");
    const allParam = searchParams.get("all");

    const fetchAll = allParam === "true";

    // all=true ise ve cache geçerliyse, direkt RAM'den dön
    if (fetchAll && isCacheValid()) {
      return NextResponse.json({
        success: true,
        pages: listingsCache!.pagesFetched,
        total_found: listingsCache!.data.length,
        data: listingsCache!.data,
        cached: true,
      });
    }

    let allListings: Listing[] = [];
    const pagesFetched: number[] = [];

    if (fetchAll) {
      // ✅ Burayı ihtiyaca göre ayarlayabilirsin.
      // İlk etapta 8–10 sayfa bile genelde yeterli olur.
      const MAX_PAGES = 20;

      const pageNumbers = Array.from({ length: MAX_PAGES }, (_, i) => i + 1);

      // Tüm sayfaları PARALEL çek
      const results = await Promise.all(
        pageNumbers.map((page) => fetchListingsPage(page))
      );

      results.forEach((list, idx) => {
        const page = pageNumbers[idx];
        if (list.length > 0) {
          allListings = allListings.concat(list);
          pagesFetched.push(page);
        }
      });

      // Cache'i güncelle
      listingsCache = {
        data: allListings,
        pagesFetched,
        updatedAt: Date.now(),
      };
    } else {
      // Tek sayfa modu (default: 1)
      const page = Number(pageParam || "1");
      const pageListings = await fetchListingsPage(page);
      allListings = pageListings;
      pagesFetched.push(page);
    }

    return NextResponse.json({
      success: true,
      pages: pagesFetched,
      total_found: allListings.length,
      data: allListings,
      cached: fetchAll ? false : undefined,
    });
  } catch (error: any) {
    console.error("Scrape error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
