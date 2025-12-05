"use client";

import { useState } from "react";
// Önizleme ortamında next/link hatasını önlemek için standart <a> etiketi kullanıyoruz.
// Gerçek projede: import Link from "next/link";
import OfficeSelect from "./OfficeSelect";

type Subject =
  | "Genel Bilgi"
  | "Danışman Olmak İstiyorum"
  | "Ofis / Randevu"
  | "Basın / Medya"
  | "Diğer";

// Ofis seçenekleri
const OFFICE_OPTIONS = [
  { value: "KW Alesta", label: "KW Alesta (Bayraklı - Ege Perla)" },
  { value: "KW Viya", label: "KW Viya (Çiğli)" },
  { value: "KW Orsa", label: "KW Orsa (Urla)" },
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<Subject>("Genel Bilgi");
  
  // YENİ STATE: Ofis seçimi için
  const [office, setOffice] = useState(""); 

  const [message, setMessage] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);

    // API'ye gönderilecek veriyi hazırlıyoruz
    const payload = {
      name,
      email,
      phone,
      subject,
      message,
      // Eğer danışmanlık seçildiyse ofisi gönder, değilse boş gönder
      office: subject === "Danışman Olmak İstiyorum" ? office : "Belirtilmemiş",
      consent_terms: agree1,
      consent_marketing: agree2,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmitting(false);
      setOk(res.ok);
      if (res.ok) {
        // Formu sıfırla
        setName("");
        setEmail("");
        setPhone("");
        setSubject("Genel Bilgi");
        setOffice(""); 
        setMessage("");
        setAgree1(false);
        setAgree2(false);
      }
    } catch (error) {
      setSubmitting(false);
      setOk(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 font-sans text-gray-900">
      {/* Ad Soyad + E-posta */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Ad Soyad</label>
          <input
            className="mt-1 block w-full rounded-2xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Adınız ve soyadınız"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">E-posta</label>
          <input
            className="mt-1 block w-full rounded-2xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="ornek@eposta.com"
          />
        </div>
      </div>

      {/* Telefon + Konu */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Telefon</label>
          <input
            className="mt-1 block w-full rounded-2xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
            name="phone"
            value={phone}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              if (onlyNums.length <= 11) setPhone(onlyNums);
            }}
            placeholder="05XXXXXXXXX"
            autoComplete="tel"
            required
            minLength={11}
            maxLength={11}
            pattern="[0-9]{11}"
            inputMode="numeric"
          />
          <p className="mt-1 text-xs text-gray-500">
            Telefon numarası 11 haneli olmalıdır.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium">Konu</label>
          <div className="relative">
            <select
              className="mt-1 block w-full appearance-none rounded-2xl border border-black/10 bg-white px-3 py-2 pr-9 outline-none focus:ring-2 focus:ring-black/10"
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
            >
              <option>Genel Bilgi</option>
              <option>Danışman Olmak İstiyorum</option>
              <option>Ofis / Randevu</option>
              <option>Basın / Medya</option>
              <option>Diğer</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>
        </div>
      </div>

      {/* --- DİNAMİK OFİS SEÇİMİ --- */}
      {subject === "Danışman Olmak İstiyorum" && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-sm font-medium mb-1 text-red-600">
            Hangi ofisimizle ilgileniyorsunuz?
          </label>
          <OfficeSelect
            name="office"
            options={OFFICE_OPTIONS}
            value={office}
            onChange={setOffice}
            placeholder="Ofis Seçiniz (Zorunlu değil ama önerilir)"
          />
        </div>
      )}

      {/* Mesaj */}
      <div>
        <label className="block text-sm font-medium">Mesaj</label>
        <textarea
          className="mt-1 block w-full min-h-[120px] rounded-2xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Size nasıl yardımcı olabiliriz?"
        />
      </div>

      {/* Aydınlatma & İzinler */}
      <div className="space-y-3 text-sm text-gray-700">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            checked={agree1}
            onChange={(e) => setAgree1(e.target.checked)}
            required
          />
          <span>
            Bu kutuyu işaretleyerek{" "}
            <a
              href="/terms"
              className="underline hover:text-red-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kullanım Şartları
            </a>{" "}
            ve{" "}
            <a
              href="/privacy"
              className="underline hover:text-red-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gizlilik Politikası
            </a>
            ’nı kabul etmiş olursun.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            checked={agree2}
            onChange={(e) => setAgree2(e.target.checked)}
          />
          <span>
            Bu kutuyu işaretleyerek telefon/e-posta yoluyla bilgilendirme
            almayı kabul edersin. İstediğin zaman vazgeçebilirsin.
          </span>
        </label>
      </div>

      {/* Gönder */}
      <div className="pt-2">
        <button
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#ba0c2f] px-6 py-3 font-medium text-white transition-all hover:bg-[#a00a29] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        >
          {submitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Gönderiliyor...
            </>
          ) : "Gönder"}
        </button>
        
        {ok === true && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 animate-in fade-in slide-in-from-top-2">
            <p className="font-medium">Teşekkürler! Mesajın başarıyla alındı.</p>
            <p className="text-sm mt-1">Ekibimiz en kısa sürede dönüş yapacaktır.</p>
          </div>
        )}
        
        {ok === false && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 animate-in fade-in slide-in-from-top-2">
            <p className="font-medium">Üzgünüz, bir sorun oluştu.</p>
            <p className="text-sm mt-1">Lütfen internet bağlantınızı kontrol edip tekrar deneyin.</p>
          </div>
        )}
      </div>
    </form>
  );
}