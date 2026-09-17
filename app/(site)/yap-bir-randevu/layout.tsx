import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yap Bir Randevu!",
  description:
    "Randevunu al, sisteme gir, çarkı çevir ve anında hediyeni kazan! KWAVO motivasyon etkinliği.",
  alternates: { canonical: "/yap-bir-randevu" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Yap Bir Randevu! | KWAVO",
    description: "Çarkı çevir, hediyeni kazan!",
    url: "/yap-bir-randevu",
    images: [{ url: "/og?title=Yap%20Bir%20Randevu", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Yap%20Bir%20Randevu"],
  },
};

export default function YapBirRandevuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
