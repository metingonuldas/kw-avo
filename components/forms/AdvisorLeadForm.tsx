"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { captureAttribution, trackAdvisorLead } from "@/lib/marketing";

const OFFICES = [
  { value: "KW Alesta", label: "KW Alesta — Bayraklı / Ege Perla" },
  { value: "KW Viya", label: "KW Viya — Çiğli" },
  { value: "KW Orsa", label: "KW Orsa — Güzelbahçe" },
  { value: "Kararsızım", label: "Kararsızım — birlikte değerlendirelim" },
];

export default function AdvisorLeadForm() {
  const router = useRouter();
  const [startedAt, setStartedAt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    captureAttribution();
    setStartedAt(Date.now());
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const eventId = crypto.randomUUID();
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      office: String(form.get("office") || ""),
      experience: String(form.get("experience") || ""),
      preferred_time: String(form.get("preferred_time") || ""),
      note: String(form.get("note") || ""),
      consent_terms: form.get("consent_terms") === "on",
      consent_marketing: form.get("consent_marketing") === "on",
      website: String(form.get("website") || ""),
      form_started_at: startedAt,
      event_id: eventId,
      attribution: captureAttribution(),
    };

    try {
      const response = await fetch("/api/advisor-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "request_failed");
      }

      trackAdvisorLead(eventId, payload.office);
      router.push("/danisman-ol/tesekkurler");
    } catch {
      setSubmitting(false);
      setError("Başvurunuz şu anda gönderilemedi. Lütfen kısa bir süre sonra tekrar deneyin.");
    }
  }

  const fieldClass =
    "mt-1 block w-full rounded-xl border border-black/15 bg-white px-3 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

  return (
    <form onSubmit={submit} className="space-y-4" aria-label="Danışmanlık görüşmesi formu">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Ad Soyad
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="text-sm font-medium">
          Telefon
          <input
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9+ ()-]{10,20}"
            className={fieldClass}
            placeholder="05XX XXX XX XX"
          />
        </label>
      </div>

      <label className="block text-sm font-medium">
        E-posta
        <input name="email" type="email" required autoComplete="email" className={fieldClass} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Görüşmek istediğiniz ofis
          <select name="office" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Ofis seçin</option>
            {OFFICES.map((office) => <option key={office.value} value={office.value}>{office.label}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">
          Gayrimenkul deneyiminiz
          <select name="experience" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Seçin</option>
            <option value="Deneyimim yok">Deneyimim yok</option>
            <option value="1 yıldan az">1 yıldan az</option>
            <option value="1-3 yıl">1–3 yıl</option>
            <option value="3 yıldan fazla">3 yıldan fazla</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium">
        Sizinle ne zaman iletişim kuralım?
        <select name="preferred_time" required defaultValue="" className={fieldClass}>
          <option value="" disabled>Zaman aralığı seçin</option>
          <option value="En kısa sürede">En kısa sürede</option>
          <option value="Hafta içi 09:00-12:00">Hafta içi 09:00–12:00</option>
          <option value="Hafta içi 12:00-17:00">Hafta içi 12:00–17:00</option>
          <option value="Hafta içi 17:00 sonrası">Hafta içi 17:00 sonrası</option>
        </select>
      </label>

      <label className="block text-sm font-medium">
        Eklemek istediğiniz bir not <span className="font-normal text-gray-500">(isteğe bağlı)</span>
        <textarea name="note" rows={3} maxLength={800} className={fieldClass} />
      </label>

      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-px w-px"
        aria-hidden="true"
      />

      <div className="space-y-3 text-xs leading-relaxed text-gray-600">
        <label className="flex items-start gap-2">
          <input name="consent_terms" type="checkbox" required className="mt-0.5" />
          <span>
            Başvurumun değerlendirilmesi ve benimle iletişime geçilmesi için kişisel
            verilerimin işlenmesini kabul ediyorum. <a href="/privacy" target="_blank" className="underline">Gizlilik Politikası</a>
          </span>
        </label>
        <label className="flex items-start gap-2">
          <input name="consent_marketing" type="checkbox" className="mt-0.5" />
          <span>Etkinlik, eğitim ve kariyer fırsatları hakkında bilgilendirme almak istiyorum.</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-[#ba0c2f] px-5 py-3.5 font-semibold text-white transition hover:bg-[#a00a29] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Başvurunuz gönderiliyor…" : "Tanışma Görüşmesi Planla"}
      </button>

      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <p className="text-center text-xs text-gray-500">Başvuru ücretsizdir; maaşlı bir iş başvurusu veya herhangi bir taahhüt oluşturmaz.</p>
    </form>
  );
}
