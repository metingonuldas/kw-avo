export const dynamic = "force-static";

export default function TechnologyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Teknoloji</h1>
        <p className="mt-3 text-sm text-gray-600">
          Tek panelde uçtan uca iş akışı: CRM, otomasyon, lead yakalama/dağıtım,
          pazarlama ve raporlama. Amaç: <b>daha öngörülebilir üretim</b> ve
          <b> tutarlı müşteri deneyimi</b>.
        </p>
      </header>

      {/* Özellikler */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            t: "CRM & Pipeline",
            d: "İlişki, teklif, görev yönetimi; akıllı hatırlatıcılar ve görsel pipeline.",
          },
          {
            t: "Lead Yakalama & Dağıtım",
            d: "Form entegrasyonları, web-chat ve otomatik ön niteliklendirme.",
          },
          {
            t: "Pazarlama Otomasyonu",
            d: "İlan senkronu, çok kanallı yayın, şablonlu sosyal medya içerikleri.",
          },
          {
            t: "Raporlama",
            d: "Hedef-gerçekleşen takibi, kanal performansı ve komisyon simülasyonu.",
          },
          {
            t: "Mobil Deneyim",
            d: "Sahada teklif-görev akışı, tek tık paylaşım ve bildirimler.",
          },
          {
            t: "Uyum & Entegrasyon",
            d: "Google Workspace/Microsoft 365, KVKK uyumlu kayıt politikaları.",
          },
        ].map((i) => (
          <div
            key={i.t}
            className="rounded-2xl border border-black/10 bg-white p-5"
          >
            <h3 className="font-medium">{i.t}</h3>
            <p className="mt-2 text-sm text-gray-600">{i.d}</p>
          </div>
        ))}
      </section>

      {/* Eğitim Takvimi – hızlı embed (istersen) */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Eğitim Takvimi</h2>
          <a
            href="/press"
            className="text-sm underline underline-offset-4 hover:opacity-80"
          >
            Duyurular
          </a>
        </div>

        {/* Google Calendar embed kullanacaksanız src'yi değiştirin */}
        <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <iframe
            src="https://calendar.google.com/calendar/embed?src=rc=c_cmkhev11uso7ce72emae092ehc%40group.calendar.google.com&ctz=Europe%2FIstanbul"
            className="h-full w-full"
            loading="lazy"
          />
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Takvim bağlantınız yoksa bu bölümü kaldırabilir ya da içerikleri Basın
          sayfasından duyurabilirsiniz.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-12 flex flex-wrap items-center gap-3">
        <a
          href="/contact"
          className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Teknolojiyi Deneyimle
        </a>
        <a
          href="/media"
          className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-gray-50"
        >
          Media Kit
        </a>
      </section>
    </main>
  );
}