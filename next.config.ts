import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Güvenlik başlıklarını ekliyoruz
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Basit bir CSP politikası.
          // İleride Google Analytics, Vercel Analytics vb. için burayı güncellemek gerekebilir.
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; connect-src 'self' https:;",
          },
        ],
      },
    ];
  },

  // Dış kaynaklardan gelen görsellere izin veriyoruz
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  // TS hatalarını fail saymaya devam (güvenli tercih)
  // Eğer TS hatalarını da yoksaymak istersen burayı true yapabilirsin.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;