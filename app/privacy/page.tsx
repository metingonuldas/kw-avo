// app/privacy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Gizlilik Politikası | KW Alesta • KW Viya • KW Orsa",
  description:
    "KWAVO web sitesi ve iletişim formlarında işlenen kişisel verilere ilişkin bilgilendirme.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <p className="text-xs font-medium tracking-wide text-gray-500">
        GİZLİLİK POLİTİKASI
      </p>
      <h1 className="mt-1 text-3xl font-semibold">Gizlilik Politikası</h1>
      <p className="mt-3 text-sm text-gray-600">
        Bu metin, BTA GAYRİMENKUL TİCARET ANONİM ŞİRKETİ olarak web
        sitemiz ve dijital kanallarımız aracılığıyla elde ettiğimiz kişisel
        verilerin hangi amaçlarla işlendiği ve nasıl korunduğu hakkında genel
        bilgi vermek için hazırlanmıştır.
      </p>

      <section className="mt-6 space-y-5 text-sm text-gray-700 leading-relaxed">
        <div>
          <h2 className="font-semibold">
            1. Hangi Verileri Topluyoruz?
          </h2>
          <p className="mt-1">
            İletişim formu, danışmanlık başvurusu veya teklif talepleriniz
            sırasında paylaştığınız; ad-soyad, e-posta adresi, telefon numarası,
            tercih ettiğiniz ofis ve mesaj içerikleri gibi temel iletişim
            verileri işlenmektedir.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            2. Verileri Hangi Amaçlarla İşliyoruz?
          </h2>
          <p className="mt-1">
            Paylaştığınız veriler;
          </p>
          <ul className="mt-1 list-disc pl-5 space-y-1">
            <li>Size geri dönüş yapabilmek,</li>
            <li>Talep ve sorularınızı ilgili ofise yönlendirmek,</li>
            <li>Hizmet kalitemizi ölçmek ve geliştirmek,</li>
            <li>
              (Onay vermeniz halinde) bilgilendirme ve duyuruları iletmek
            </li>
          </ul>
          <p className="mt-1">
            amaçlarıyla, ilgili mevzuat çerçevesinde işlenmektedir.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            3. Hukuki Dayanak
          </h2>
          <p className="mt-1">
            Verileriniz, başvurunuzun değerlendirilmesi ve iletişimin sağlanması
            için zorunlu olması, meşru menfaatlerimizin bulunması ve açık
            rızanızın alınması hallerinde{" "}
            KVKK ve ilgili mevzuat uyarınca işlenir.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            4. Veri Saklama Süresi
          </h2>
          <p className="mt-1">
            Kişisel verileriniz; ilgili mevzuatta öngörülen süreler, şirket
            içi saklama politikalarımız ve hizmetin gerektirdiği makul süreler
            boyunca saklanır; sonrasında mevzuata uygun yöntemlerle silinir,
            yok edilir veya anonim hale getirilir.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            5. Üçüncü Taraflarla Paylaşım
          </h2>
          <p className="mt-1">
            Verileriniz, yalnızca talebinizi karşılamak ve operasyonel
            süreçleri yürütmek amacıyla; KW Türkiye organizasyonu, yetkili
            iş ortaklarımız ve yasal zorunluluk halinde ilgili kamu kurumları
            ile paylaşılabilir. Ticari amaçlarla üçüncü kişilere satılmaz.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            6. Haklarınız
          </h2>
          <p className="mt-1">
            KVKK kapsamında; kişisel verilerinize erişme, düzeltilmesini veya
            silinmesini talep etme, işlenme amacını ve aktarıldığı üçüncü
            kişileri öğrenme gibi haklara sahipsiniz. Bu haklarınızı kullanmak
            için{" "}
            <Link href="/contact" className="underline">
              iletişim formu
            </Link>{" "}
            üzerinden bize ulaşabilirsiniz.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            7. Güncellemeler
          </h2>
          <p className="mt-1">
            Bu politika gerektiğinde güncellenebilir. Güncel versiyon her zaman
            bu sayfada yayımlanır.
          </p>
        </div>
      </section>
    </main>
  );
}