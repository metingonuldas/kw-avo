"use client";

import { useState } from "react";

type Subject =
  | "Genel Bilgi"
  | "Danışman Olmak İstiyorum"
  | "Ofis / Randevu"
  | "Basın / Medya"
  | "Diğer";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<Subject>("Genel Bilgi");
  const [message, setMessage] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject,
        message,
        consent_terms: agree1,
        consent_marketing: agree2,
      }),
    });

    setSubmitting(false);
    setOk(res.ok);
    if (res.ok) {
      setName("");
      setEmail("");
      setPhone("");
      setSubject("Genel Bilgi");
      setMessage("");
      setAgree1(false);
      setAgree2(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+90 5XX XXX XX XX"
            autoComplete="tel"
          />
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

      {/* Mesaj */}
      <div>
        <label className="block text-sm font-medium">Mesaj</label>
        <textarea
          className="mt-1 block w-full min-h-[120px] rounded-2xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Bize nasıl yardımcı olabiliriz?"
        />
      </div>

      {/* Aydınlatma & İzinler */}
      <div className="space-y-3 text-sm text-gray-700">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded border-gray-300"
            checked={agree1}
            onChange={(e) => setAgree1(e.target.checked)}
          />
          <span>
            Bu kutuyu işaretleyerek{" "}
            <a
              href="#"
              className="underline"
              onClick={(e) => e.preventDefault()}
              aria-disabled
            >
              Kullanım Şartları
            </a>{" "}
            ve{" "}
            <a
              href="#"
              className="underline"
              onClick={(e) => e.preventDefault()}
              aria-disabled
            >
              Gizlilik Politikası
            </a>
            ’nı kabul etmiş olursun.
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded border-gray-300"
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
          className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-4 py-2.5 font-medium text-white hover:opacity-90 disabled:opacity-50 sm:w-auto"
        >
          {submitting ? "Gönderiliyor..." : "Gönder"}
        </button>
        {ok === true && (
          <p className="mt-2 text-sm text-green-600">
            Teşekkürler! Mesajın alındı.
          </p>
        )}
        {ok === false && (
          <p className="mt-2 text-sm text-red-600">
            Üzgünüz, bir sorun oluştu. Lütfen tekrar dene.
          </p>
        )}
      </div>
    </form>
  );
}