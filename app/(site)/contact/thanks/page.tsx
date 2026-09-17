// app/contact/thanks/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teşekkürler | İletişim",
  description: "Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.",
  robots: { index: false, follow: false },
};

export default function Thanks() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Teşekkürler!</h1>
      <p className="mt-2 text-gray-600">Mesajınız bize ulaştı; en kısa sürede döneceğiz.</p>
    </main>
  );
}