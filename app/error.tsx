"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // İstersen error.digest'i loglayabilirsin
  return (
    <html>
      <body className="min-h-screen grid place-items-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">Bir şeyler ters gitti</h1>
          <p className="mt-2 text-gray-600">Lütfen tekrar deneyin.</p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-lg px-4 py-2 bg-black text-white hover:opacity-90"
            >
              Yeniden Dene
            </button>
            <Link
              href="/"
              className="rounded-lg px-4 py-2 ring-1 ring-black/10 hover:bg-gray-50"
            >
              Ana sayfa
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}