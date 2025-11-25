// app/press/page.tsx
export const dynamic = "force-static";

export const metadata = {
  title: "Basın Bültenleri",
  description:
    "KWAVO basın duyuruları ve medya içerikleri yakında güncellenecek.",
  robots: {
    index: false,   // ⬅️ sayfa indekslenmesin
    follow: false,   // linkleri takip edebilir
  },
};

export default function PressPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold">Basın Bültenleri</h1>
      <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">
        Basın duyuruları, medya haberleri ve resmi açıklamalar{" "}
        <span className="font-semibold">yakında güncellenecek.</span>{" "}
        Bu alan için yeni içerikler hazırlıyoruz.
      </p>
    </main>
  );
}