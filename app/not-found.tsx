import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  // Kök not-found (site) düzeninin dışında render edilir; Navbar/Footer burada eklenir
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[60vh] grid place-items-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Sayfa bulunamadı</h1>
          <p className="mt-2 text-gray-600">Aradığınız sayfa mevcut değil.</p>
          <div className="mt-6">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 ring-1 ring-black/10 hover:bg-gray-50"
            >
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}