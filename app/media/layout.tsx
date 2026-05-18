import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Kit",
  description:
    "KW Alesta, KW Viya ve KW Orsa logoları, renk paleti ve marka kullanım dosyaları.",
  alternates: { canonical: "/media" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Media Kit | KW Alesta • KW Viya • KW Orsa",
    description: "Logolar ve marka kullanım dosyaları.",
    url: "/media",
    images: [{ url: "/og?title=Media%20Kit", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Media%20Kit"],
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
