import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kw-avo.vercel.app"),
  title: { default: "KW Alesta • KW Viya • KW Orsa", template: "%s | KWAVO" },
  description: "Girişimcinin geliştiği yer. Eğitim, teknoloji ve paylaşım kültürüyle İzmir’de büyüyoruz.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "KWAVO",
    description: "Girişimcinin geliştiği yer.",
    images: [{ url: "/og/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="force-light" data-theme="light">
      <head>
        {/* tarayıcıya yalnızca açık şema kullan dediğimiz meta */}
        <meta name="color-scheme" content="light" />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-black">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KW Alesta • KW Viya • KW Orsa",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://kw-avo.vercel.app",
              logo: "/media/logos/kw-alestaviyaorsa.svg",
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}