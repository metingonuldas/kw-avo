// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-sm text-gray-600">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KW Alesta • Viya • Orsa. Tüm hakları saklıdır.</p>
          <p className="opacity-80">
            Keller Williams® markası ve logoları Keller Williams Realty, Inc.’in tescilli markalarıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}