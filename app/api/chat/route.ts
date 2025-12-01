// app/api/chat/route.ts
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages ?? [];

    // 1) Kullanıcının son mesajını bul
    const lastUserMessage = [...messages]
      .reverse()
      .find((m: any) => m.role === "user");

    const userQuery: string =
      typeof lastUserMessage?.content === "string"
        ? lastUserMessage.content
        : "";

    // 2) Aynı origin'den scraper'ı çağır
    const requestUrl = new URL(req.url);
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;

    let listings: any[] = [];
    let listingsContext = "";

    try {
      const scrapeRes = await fetch(`${baseUrl}/api/scrape?all=true`, {
        cache: "no-store",
      });

      const scrapeJson = await scrapeRes.json();

      if (scrapeJson.data && Array.isArray(scrapeJson.data)) {
        listings = scrapeJson.data;
      }
    } catch (err) {
      console.error("Scraper Hatası:", err);
    }

    // 3) JS filtreleme (lokasyon + oda + tür)
    let filteredListings = listings;

    if (userQuery && listings.length > 0) {
      const q = userQuery.toLowerCase();

      // Bölge / mahalle eş anlam haritası
    const aliases: Record<string, string[]> = {
      "güzelbahçe": ["gülbahçe"],
      "gülbahçe": ["güzelbahçe"],

      // Urla için mahalle eşlemesi
      "urla": [
        "şirinkent mahallesi",
        "torasan mahallesi",
      ],
    };

      const queryWords = q.split(/\s+/).filter(Boolean);

      const hasVilla = q.includes("villa");
      const hasDaire = q.includes("daire");

      // Query'de geçen oda formatlarını yakala (4+1, 3+1 vs)
      const roomPatternMatches = q.match(/\d\+\d/g) || [];
      const roomPatterns = Array.from(new Set(roomPatternMatches));

      const haystackFor = (item: any) =>
        `${item.title} ${item.specs} ${item.location} ${item.link ?? ""}`.toLowerCase();


      // 3.a) Önce lokasyon kelimelerini çıkar (alias map'inde olanlar)
      const locationKeysInQuery = Object.keys(aliases).filter((key) =>
        q.includes(key)
      );

      let candidateListings = listings;

      if (locationKeysInQuery.length > 0) {
        const locFiltered = listings.filter((item) => {
          const haystack = haystackFor(item);

          return locationKeysInQuery.some((key) => {
            if (haystack.includes(key)) return true;

            const aliasList = aliases[key] || [];
            return aliasList.some((alias) => haystack.includes(alias));
          });
        });

        // Eğer gerçekten o lokasyonda ilan varsa, SADECE onları kullan
        if (locFiltered.length > 0) {
          candidateListings = locFiltered;
        }
      }

      // 3.b) Aday ilanlar üzerinde basit skor hesapla
      const scored = candidateListings.map((item) => {
        const haystack = haystackFor(item);
        let score = 0;

        // Lokasyon eşleşmeleri ekstra puan (örn. güzelbahçe / gülbahçe)
        locationKeysInQuery.forEach((key) => {
          if (haystack.includes(key)) score += 5;
          const aliasList = aliases[key] || [];
          if (aliasList.some((alias) => haystack.includes(alias))) {
            score += 5;
          }
        });

        // Villa / daire türü
        if (hasVilla && haystack.includes("villa")) score += 4;
        if (hasDaire && haystack.includes("daire")) score += 3;

        // Oda formatı (4+1 vb)
        roomPatterns.forEach((pattern) => {
          if (haystack.includes(pattern)) score += 3;
        });

        // Diğer kelimeler (çok genel olmayanlar)
        queryWords.forEach((word) => {
          if (word.length <= 3) return; // çok kısa kelimeleri geç
          if (haystack.includes(word)) score += 1;
        });

        return { item, score };
      });

      // Skora göre sırala, en iyileri al
      scored.sort((a, b) => b.score - a.score);

      filteredListings = scored
        .filter((s) => s.score > 0)
        .map((s) => s.item);

      // Skor 0 ise (hiçbir şey eşleşmediyse) tüm listeyi kullan
      if (filteredListings.length === 0) {
        filteredListings = candidateListings;
      }
    }

    // 4) Context string'ini hazırla (max 20 ilan)
    const limited = filteredListings.slice(0, 20);

    if (limited.length > 0) {
      listingsContext = limited
        .map(
          (item: any, index: number) => `
[#${index + 1}]
İlan: ${item.title}
Fiyat: ${item.price}
Konum: ${item.location}
Özellikler: ${item.specs}
Link: ${item.link}
Görsel: ${item.image}
`
        )
        .join("\n---\n");
    } else {
      listingsContext =
        "Şu an portföy listesi çekilemedi veya görüntülenemiyor.";
    }

    // 5) Sistem prompt
    const systemPrompt = `
Sen KW AVO (Alesta Viya Orsa) gayrimenkul şirketinin yapay zeka asistanısın.

GÖREVİN:
Kullanıcının sorusuna göre aşağıdaki [PORTFÖY] içinden en uygun ilanları bul ve SADECE aşağıdaki FORMATTA cevap ver.

KURALLAR:
1. Sadece listede olan ilanları göster.
2. En fazla 3 ilan göster.
3. Cevap ASLA tekrar etmesin.
4. Linkler DÜZ URL olarak tek satırda verilsin.
5. Emoji kullan ama abartma.

✅ MUTLAKA BU FORMATTA YAZ:

🏠 **[İLAN BAŞLIĞI]**
📍 Konum: [Konum]
🛏 Oda: [Özellikler]
💰 Fiyat: [Fiyat]
🔗 İlan Linki: [URL]

---

SON SATIR:
"İsterseniz bu ilanlardan biri için sizi hemen danışmanımıza yönlendirebilirim. 😊"

[PORTFÖY]:
${listingsContext}
`;

    // 6) Gemini ile TEK SEFERDE cevap (stream yok)
    const result = await generateText({
      model: google("gemini-2.5-flash-lite"),
      system: systemPrompt,
      messages,
    });

    return new Response(JSON.stringify({ text: result.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API Hatası:", error);
    return new Response(
      JSON.stringify({ error: "Sunucu hatası oluştu." }),
      { status: 500 }
    );
  }
}
