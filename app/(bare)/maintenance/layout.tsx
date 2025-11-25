import "@/app/globals.css";
import { ReactNode } from "react";

export default function MaintenanceLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="force-light" data-theme="light">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </head>

      {/* root ile bire bir aynı sınıflar */}
      <body className="flex min-h-screen flex-col bg-white text-black">
        {/* Navbar/Footer yok; içeriği burada ortalıyoruz */}
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}