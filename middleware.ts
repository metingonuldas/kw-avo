// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * ENV
 * - NEXT_PUBLIC_MAINTENANCE_MODE = "true" | "false"
 * - NEXT_PUBLIC_BYPASS_CODE      = "<senin_kodun>"
 */
const BYPASS_CODE = process.env.NEXT_PUBLIC_BYPASS_CODE || "";
const MAINTENANCE_ON =
  (process.env.NEXT_PUBLIC_MAINTENANCE_MODE || "false").toLowerCase() === "true";

/** İzinli yollar (bakımda da açık) */
const ALLOW_LIST_PREFIXES = [
  "/maintenance",
  "/_next",          // Next asset'leri
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/images",
  "/media",
  "/og",             // varsa OG endpoint'in
  "/api/health",     // örnek sağlık ucu
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, searchParams } = url;

  // ALLOW LIST — bu yollar her zaman geçsin
  if (ALLOW_LIST_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // --- BYPASS AÇ: /?bypass=<code> ---
  const bypassParam = searchParams.get("bypass");
  if (bypassParam && BYPASS_CODE && bypassParam === BYPASS_CODE) {
    const clean = new URL(url);
    clean.searchParams.delete("bypass");

    const res = NextResponse.redirect(clean);
    // bypass çerezi
    res.cookies.set("mw_bypass", "1", {
      path: "/",
      sameSite: "lax",
      httpOnly: false, // layout tarafından okunmayacak; sadece middleware kontrol ediyor
    });
    // bakım görünüm çerezi reset
    res.cookies.set("mw_maint", "0", { path: "/" });
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  // --- BYPASS KAPAT: /?bypass=off ---
  if (bypassParam === "off") {
    const clean = new URL(url);
    clean.searchParams.delete("bypass");

    const res = NextResponse.redirect(clean);
    res.cookies.delete("mw_bypass");
    res.cookies.delete("mw_maint");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  // Bypass çerezi var mı?
  const hasBypass = req.cookies.get("mw_bypass")?.value === "1";

  // Bakım kapalıysa veya bypass varsa normal devam
  if (!MAINTENANCE_ON || hasBypass) {
    const res = NextResponse.next();
    res.cookies.set("mw_maint", "0", { path: "/" });
    return res;
  }

  // Bakım açık ve bypass yok → maintenance sayfasına rewrite + bakım çerezi 1
  const res = NextResponse.rewrite(new URL("/maintenance", req.url));
  res.cookies.set("mw_maint", "1", { path: "/" });
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  // API ve statik görüntü işleyicilerini hariç tut
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};