// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Sayfa bulunamadı</h1>
      <p className="mt-2 text-gray-600">Aradığınız sayfa taşınmış ya da silinmiş olabilir.</p>
      <a href="/" className="mt-6 inline-block rounded-xl bg-black px-4 py-2 text-white">Ana sayfaya dön</a>
    </main>
  );
}