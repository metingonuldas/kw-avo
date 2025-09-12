"use client";

import { useState } from "react";

export default function ContactPage() {
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    const json = await res.json();
    setMsg(json.ok ? "Mail gönderildi ✅" : "Hata ❌");
    if (json.ok) form.reset();
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">İletişim</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Ad Soyad" className="w-full border p-2 rounded" />
        <input name="email" type="email" placeholder="E-posta" className="w-full border p-2 rounded" />
        <textarea name="message" placeholder="Mesaj" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Gönder
        </button>
      </form>
      {msg && <p className="mt-4">{msg}</p>}
    </main>
  );
}