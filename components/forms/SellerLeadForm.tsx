"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import { captureAttribution, trackSellerLead } from "@/lib/marketing";
import { PROPERTY_INTENT_LABELS, type PropertyIntent } from "@/lib/property-intent";

const PROPERTY_TYPES = ["Daire", "Villa / Müstakil Ev", "Arsa / Tarla", "İşyeri / Ticari", "Diğer"];
const SALE_TIMES = ["En kısa sürede", "1–3 ay içinde", "3–6 ay içinde", "Şimdilik araştırıyorum"];
const CONTACT_TIMES = ["En kısa sürede", "09:00–12:00", "12:00–17:00", "17:00 sonrası"];

export default function SellerLeadForm({ allowRental = false }: { allowRental?: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState<PropertyIntent | "">(allowRental ? "" : "sell");
  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [saleTime, setSaleTime] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    captureAttribution();
    setStartedAt(Date.now());
  }, []);

  const firstStepReady = Boolean(intent && district.trim().length >= 2 && propertyType && saleTime);
  const fieldClass =
    "mt-1.5 block w-full rounded-xl border border-black/15 bg-white px-3.5 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#ba0c2f] focus:ring-4 focus:ring-[#ba0c2f]/10";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!intent || !firstStepReady || submitting) return;
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const eventId = crypto.randomUUID();
    const payload = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      preferred_time: String(form.get("preferred_time") || ""),
      district,
      property_type: propertyType,
      sale_time: saleTime,
      property_intent: intent,
      consent_terms: form.get("consent_terms") === "on",
      website: String(form.get("website") || ""),
      form_started_at: startedAt,
      event_id: eventId,
      attribution: captureAttribution(),
    };

    try {
      const response = await fetch("/api/seller-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "request_failed");
      }

      trackSellerLead(eventId, propertyType, district, intent);
      router.push(allowRental ? "/mulkumu-degerlendirmek-istiyorum/tesekkurler" : "/evimi-satmak-istiyorum/tesekkurler");
    } catch {
      setSubmitting(false);
      setError("Talebiniz şu anda gönderilemedi. Lütfen kısa bir süre sonra tekrar deneyin.");
    }
  }

  return (
    <form onSubmit={submit} aria-label={allowRental ? "Gayrimenkul satış veya kiraya verme görüşmesi formu" : "Gayrimenkul satış görüşmesi formu"}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ba0c2f]">Ücretsiz ön görüşme</p>
          <h2 className="mt-1 text-2xl font-black text-neutral-950">Mülkünüzü birlikte değerlendirelim</h2>
        </div>
        <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-600">
          {step}/2
        </span>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full rounded-full bg-[#ba0c2f] transition-all duration-300" style={{ width: step === 1 ? "50%" : "100%" }} />
      </div>

      {step === 1 ? (
        <div className="mt-6 space-y-4">
          {allowRental && (
            <fieldset>
              <legend className="text-sm font-semibold text-neutral-800">Mülkünüz için ne düşünüyorsunuz?</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(["sell", "rent"] as const).map((value) => (
                  <label key={value} className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-semibold transition ${intent === value ? "border-[#ba0c2f] bg-[#ba0c2f]/5 text-[#ba0c2f]" : "border-black/15 text-neutral-700 hover:bg-neutral-50"}`}>
                    <input type="radio" name="property_intent" value={value} checked={intent === value} onChange={() => setIntent(value)} required className="accent-[#ba0c2f]" />
                    {PROPERTY_INTENT_LABELS[value]}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <label className="block text-sm font-semibold text-neutral-800">
            Mülkün bulunduğu ilçe
            <input
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              required
              autoComplete="address-level2"
              className={fieldClass}
              placeholder="Örn. Karşıyaka"
            />
          </label>

          <label className="block text-sm font-semibold text-neutral-800">
            Gayrimenkul türü
            <select value={propertyType} onChange={(event) => setPropertyType(event.target.value)} required className={fieldClass}>
              <option value="" disabled>Seçin</option>
              {PROPERTY_TYPES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label className="block text-sm font-semibold text-neutral-800">
            {intent === "rent" ? "Ne zaman kiraya vermeyi düşünüyorsunuz?" : intent === "sell" ? "Ne zaman satmayı düşünüyorsunuz?" : "Ne zaman ilerlemeyi düşünüyorsunuz?"}
            <select value={saleTime} onChange={(event) => setSaleTime(event.target.value)} required className={fieldClass}>
              <option value="" disabled>Seçin</option>
              {SALE_TIMES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <button
            type="button"
            disabled={!firstStepReady}
            onClick={() => setStep(2)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ba0c2f] px-5 py-3.5 font-bold text-white transition hover:bg-[#a00a29] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Devam Et <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-neutral-50 p-3 text-xs leading-5 text-neutral-600">
            <strong className="text-neutral-900">{district}</strong> · {propertyType} · {saleTime}
            {allowRental && intent && <span className="mt-1 block font-semibold text-[#ba0c2f]">{PROPERTY_INTENT_LABELS[intent]}</span>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-neutral-800">
              Ad Soyad
              <input name="name" required autoComplete="name" className={fieldClass} />
            </label>
            <label className="text-sm font-semibold text-neutral-800">
              Telefon
              <input
                name="phone"
                required
                autoComplete="tel"
                inputMode="tel"
                pattern="[0-9+ ()-]{10,20}"
                placeholder="05XX XXX XX XX"
                className={fieldClass}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-neutral-800">
              Aranma zamanı
              <select name="preferred_time" required defaultValue="" className={fieldClass}>
                <option value="" disabled>Seçin</option>
                {CONTACT_TIMES.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-neutral-800">
              E-posta <span className="font-normal text-neutral-500">(isteğe bağlı)</span>
              <input name="email" type="email" autoComplete="email" className={fieldClass} />
            </label>
          </div>

          <label className="flex items-start gap-2.5 text-xs leading-5 text-neutral-600">
            <input name="consent_terms" type="checkbox" required className="mt-1 accent-[#ba0c2f]" />
            <span>
              Talebimin değerlendirilmesi ve benimle iletişime geçilmesi için kişisel verilerimin işlenmesini kabul ediyorum.
              {" "}<a href="/privacy" target="_blank" className="font-semibold underline">Gizlilik Politikası</a>
            </span>
          </label>

          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-px w-px"
            aria-hidden="true"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center justify-center rounded-xl border border-black/15 px-4 py-3.5 text-sm font-bold transition hover:bg-neutral-50"
              aria-label="Önceki adıma dön"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ba0c2f] px-5 py-3.5 font-bold text-white transition hover:bg-[#a00a29] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Talebiniz gönderiliyor…" : "Görüşme Talebi Oluştur"}
              {!submitting && <ArrowRight size={18} />}
            </button>
          </div>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        </div>
      )}

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-black/10 pt-4 text-center text-[11px] leading-4 text-neutral-500">
        <span className="flex flex-col items-center gap-1"><Clock3 size={15} />Hızlı dönüş</span>
        <span className="flex flex-col items-center gap-1"><ShieldCheck size={15} />Gizli bilgi</span>
        <span className="flex flex-col items-center gap-1"><CheckCircle2 size={15} />Taahhütsüz</span>
      </div>

      <p className="mt-4 rounded-lg bg-neutral-50 px-3 py-2 text-center text-[11px] font-medium leading-4 text-neutral-600">
        Görüşme ücretsizdir ve mülkünüzü portföye verme zorunluluğu oluşturmaz.
      </p>
    </form>
  );
}
