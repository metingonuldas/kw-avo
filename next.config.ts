import type { NextConfig } from "next";

// next.config.mjs veya next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Basit CSP (Maps ve Resend'a göre genişletilebilir)
          { key: "Content-Security-Policy", value:
            "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; connect-src 'self' https:;" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // istersen spesifik domain ekle
    ],
  },
};
export default nextConfig;
