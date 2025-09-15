// app/error.tsx
"use client";
export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Bir hata oluştu</h1>
        <p className="mt-2 text-gray-600">{error.message}</p>
        <a href="/" className="mt-6 inline-block rounded-xl bg-black px-4 py-2 text-white">Ana sayfa</a>
      </body>
    </html>
  );
}