// app/terms/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Kullanım Şartları | KW Alesta • KW Viya • KW Orsa",
  description:
    "KWAVO web sitesi ve dijital kanallarının kullanımına ilişkin genel şartlar.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <p className="text-xs font-medium tracking-wide text-gray-500">
        KULLANIM ŞARTLARI
      </p>
      <h1 className="mt-1 text-3xl font-semibold">Kullanım Şartları</h1>
      <p className="mt-3 text-sm text-gray-600">
        Bu sayfa, BTA GAYRİMENKUL TİCARET ANONİM ŞİRKETİ web sitesi
        ve çevrim içi kanallarının kullanımına ilişkin temel şartları özetler.
        Bu metin bilgilendirme amaçlıdır, hukuki danışmanlık yerine geçmez.
      </p>

      <section className="mt-6 space-y-5 text-sm text-gray-700 leading-relaxed">
        <div>
          <h2 className="font-semibold">1. Hizmetin Kapsamı</h2>
          <p className="mt-1">
            KWAVO, gayrimenkul danışmanlığı alanında eğitim, koçluk, teknoloji
            ve aracılık hizmetleri sunan bir bölge müdürlüğü yapılanmasıdır.
            Bu web sitesi; ofislerimiz, projelerimiz, ekibimiz ve iletişim
            kanallarımız hakkında bilgi vermek amacıyla hazırlanmıştır.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">2. Bilgi ve İçerik</h2>
          <p className="mt-1">
            Sitede yer alan içerikler (metin, görsel, fiyat, proje bilgisi vb.)
            güncel tutulmaya çalışılsa da, yalnızca genel bilgilendirme
            niteliğindedir ve bağlayıcı teklif oluşturmaz. İlan, proje ve
            kampanya detayları; ofislerimiz ve proje yetkilileri tarafından
            teyit edilmelidir.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">3. Kullanıcı Yükümlülükleri</h2>
          <p className="mt-1">
            Web sitesini kullanırken yürürlükteki mevzuata, kişilik haklarına
            ve dürüstlük kurallarına uygun davranmayı; form ve iletişim
            kanallarını kötüye kullanmamayı, yanlış veya yanıltıcı bilgi
            paylaşmamayı kabul etmiş olursunuz.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">4. Fikri Mülkiyet</h2>
          <p className="mt-1">
            Sitede yer alan logo, görsel, metin ve tasarımlar KWAVO veya ilgili
            hak sahiplerine aittir. Önceden yazılı izin alınmaksızın
            kopyalanamaz, çoğaltılamaz, ticari amaçla kullanılamaz.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">5. Üçüncü Taraf Bağlantıları</h2>
          <p className="mt-1">
            Sitede, iş ortaklarımıza veya projelere ait üçüncü taraf web
            sitelerine yönlendiren bağlantılar bulunabilir. Bu sitelerin
            içerikleri ve güvenliği KWAVO&apos;nun sorumluluğunda değildir.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">6. Değişiklik Hakkı</h2>
          <p className="mt-1">
            KWAVO, siteyi ve bu kullanım şartlarını önceden bildirimde
            bulunmaksızın güncelleme veya değiştirme hakkını saklı tutar.
            Güncel metin her zaman bu sayfada yayımlanır.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">7. İletişim</h2>
          <p className="mt-1">
            Kullanım şartlarına ilişkin soru ve talepleriniz için{" "}
            <Link href="/contact" className="underline">
              iletişim formu
            </Link>{" "}
            üzerinden bize ulaşabilirsiniz.
          </p>
        </div>
      </section>
    </main>
  );
}