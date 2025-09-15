"use client";

import { useState } from "react";
import OfficeSelect from "@/components/forms/OfficeSelect";

type Opt = { value: string; label: string };

export default function ContactForm({
  prefillOffice,
  options,
}: {
  prefillOffice?: string;
  options: Opt[];
}) {
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [office, setOffice] = useState(
    options.find((o) => o.value === prefillOffice)?.value ?? ""
  );
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [errorText, setErrorText] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErrorText("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          office,
          replyTo: email,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || (data as any)?.ok === false) {
        throw new Error((data as any)?.error || "Mesaj gönderilemedi.");
      }

      setOk(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {                    // ← değişti
      const msg =
        err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.";
      setOk(false);
      setErrorText(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">İletişim</h1>

      {/* durum panelleri */}
      {ok === true && (
        <div className="mb-4 rounded-xl bg-green-50 text-green-900 text-sm px-4 py-3 ring-1 ring-green-200">
          Mesajın alındı. En kısa sürede dönüş yapacağız. ✅
        </div>
      )}
      {ok === false && (
        <div className="mb-4 rounded-xl bg-red-50 text-red-900 text-sm px-4 py-3 ring-1 ring-red-200">
          {errorText || "Gönderim sırasında bir sorun oluştu."}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ad Soyad</label>
          <input
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-posta</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ofis</label>
          <OfficeSelect
            name="office"
            options={options}
            value={office}
            onChange={setOffice}
            placeholder="Ofis seçin veya arayın…"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mesaj</label>
          <textarea
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* basit honeypot (botlar için) */}
        <input
          type="text"
          name="company"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Gönderiliyor…" : "Gönder"}
        </button>
      </form>
    </main>
  );
}