"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Compass,
  Copy,
  RefreshCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { captureAttribution, trackAdvisorLead } from "@/lib/marketing";
import CareerAssistant from "@/components/career/CareerAssistant";

type StyleKey = "D" | "I" | "S" | "C";
type Answer = { text: string; style: StyleKey };
type Question = { prompt: string; context: string; answers: Answer[] };
type IntakeData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  occupation: string;
  city: string;
  district: string;
  education: string;
  gender: string;
  entrepreneurship: string;
};

const QUESTIONS: Question[] = [
  {
    context: "Yeni fırsat",
    prompt: "Beklenmedik şekilde iyi bir portföy fırsatı geldiğinde ilk refleksiniz hangisi olur?",
    answers: [
      { text: "Hızlıca şartları netleştirir, sonraki adımı belirlerim.", style: "D" },
      { text: "Doğru kişileri arar, fırsatın heyecanını paylaşırım.", style: "I" },
      { text: "Süreci sakin biçimde planlayıp herkesin hazır olduğundan emin olurum.", style: "S" },
      { text: "Bölge verisini ve detayları inceleyip fırsatı doğrularım.", style: "C" },
    ],
  },
  {
    context: "İlk görüşme",
    prompt: "Yeni bir müşteriyle ilk görüşmede doğal olarak neye ağırlık verirsiniz?",
    answers: [
      { text: "İhtiyacın sonucunu ve karar kriterlerini netleştirmeye.", style: "D" },
      { text: "Rahat, enerjik ve güven veren bir bağ kurmaya.", style: "I" },
      { text: "Sözünü kesmeden dinlemeye ve kendisini güvende hissettirmeye.", style: "S" },
      { text: "Doğru sorularla tüm beklentileri eksiksiz anlamaya.", style: "C" },
    ],
  },
  {
    context: "Belirsizlik",
    prompt: "Yeterli bilginin olmadığı bir durumda nasıl ilerlersiniz?",
    answers: [
      { text: "Kontrollü bir risk alır, hareket ederek öğrenirim.", style: "D" },
      { text: "Farklı insanlarla konuşur, seçenekleri çoğaltırım.", style: "I" },
      { text: "Bildiklerime dayanarak istikrarlı ve temkinli ilerlerim.", style: "S" },
      { text: "Eksik veriyi bulur, riskleri görünür hale getiririm.", style: "C" },
    ],
  },
  {
    context: "Yoğun gün",
    prompt: "Aynı anda birçok iş biriktiğinde sizi en iyi anlatan yaklaşım hangisi?",
    answers: [
      { text: "En yüksek sonucu yaratacak işi seçer ve bitiririm.", style: "D" },
      { text: "İletişimde kalır, enerjimi koruyarak işleri hareketlendiririm.", style: "I" },
      { text: "Rutinimi bozmadan işleri sırayla tamamlarım.", style: "S" },
      { text: "Listeleyip öncelik, süre ve bağımlılıklarına göre planlarım.", style: "C" },
    ],
  },
  {
    context: "İtiraz",
    prompt: "Bir müşteri önerinize güçlü biçimde itiraz ettiğinde ne yaparsınız?",
    answers: [
      { text: "Konuyu doğrudan ele alır, net seçenekler sunarım.", style: "D" },
      { text: "Havayı yumuşatır, ortak bir dil kurmaya çalışırım.", style: "I" },
      { text: "Endişesini sabırla dinler, güveni korurum.", style: "S" },
      { text: "İtirazın dayanağını inceler, kanıtlarla yanıtlarım.", style: "C" },
    ],
  },
  {
    context: "Takım çalışması",
    prompt: "Bir ekip çalışmasında çoğunlukla hangi rol size kendiliğinden gelir?",
    answers: [
      { text: "Hedefi koyan ve karar alınmasını sağlayan kişi.", style: "D" },
      { text: "İnsanları bir araya getirip motivasyonu yükselten kişi.", style: "I" },
      { text: "Uyumu koruyup herkesin katkı vermesini sağlayan kişi.", style: "S" },
      { text: "Planı, kaliteyi ve detayları kontrol eden kişi.", style: "C" },
    ],
  },
  {
    context: "Değişim",
    prompt: "Çalışma sisteminizde büyük bir değişiklik olduğunda ilk tepkiniz nedir?",
    answers: [
      { text: "Yeni sistemi hızla dener, avantajını kullanmaya bakarım.", style: "D" },
      { text: "Ekipte konuşur, yeni olasılıkları heyecanla keşfederim.", style: "I" },
      { text: "Geçiş için zaman ve net bir destek planı isterim.", style: "S" },
      { text: "Nasıl çalıştığını öğrenir, eski sistemle karşılaştırırım.", style: "C" },
    ],
  },
  {
    context: "Hedef baskısı",
    prompt: "İddialı bir hedefin gerisinde kaldığınızı gördüğünüzde ne yaparsınız?",
    answers: [
      { text: "Tempoyu artırır, sonucu değiştirecek hamleye odaklanırım.", style: "D" },
      { text: "Çevremden enerji ve yeni bağlantılar alırım.", style: "I" },
      { text: "Düzenli çalışmayı sürdürür, adım adım açığı kapatırım.", style: "S" },
      { text: "Rakamları analiz eder, sorunun kaynağını düzeltirim.", style: "C" },
    ],
  },
  {
    context: "Müzakere",
    prompt: "Zorlu bir pazarlıkta sizi en çok ne güçlendirir?",
    answers: [
      { text: "Net sınırlar ve sonuç alma kararlılığı.", style: "D" },
      { text: "İkna gücü ve karşı tarafla kurduğum bağ.", style: "I" },
      { text: "Sabır ve iki tarafın da kazanacağı zemini korumak.", style: "S" },
      { text: "Hazırlık, veri ve ayrıntılara hâkimiyet.", style: "C" },
    ],
  },
  {
    context: "Geri bildirim",
    prompt: "İşinizle ilgili eleştirel bir geri bildirim aldığınızda nasıl karşılarsınız?",
    answers: [
      { text: "İşe yarayan kısmı alır ve hızla aksiyona geçerim.", style: "D" },
      { text: "Konuşarak niyeti ve farklı bakışları anlamaya çalışırım.", style: "I" },
      { text: "Sakin biçimde dinler, ilişkiyi korumaya özen gösteririm.", style: "S" },
      { text: "Somut örnek ister, nerede iyileşeceğimi analiz ederim.", style: "C" },
    ],
  },
  {
    context: "Başarı anı",
    prompt: "Başarılı bir işlemi tamamladığınızda sizi en çok ne tatmin eder?",
    answers: [
      { text: "Zor bir hedefi aşmış ve kazanmış olmak.", style: "D" },
      { text: "Başarıyı insanlarla paylaşmak ve takdir görmek.", style: "I" },
      { text: "Müşterinin uzun vadeli güvenini kazanmış olmak.", style: "S" },
      { text: "Sürecin doğru, eksiksiz ve kaliteli ilerlemiş olması.", style: "C" },
    ],
  },
  {
    context: "Kendi işiniz",
    prompt: "Kendi işinizi büyütürken hangi cümle size daha yakın gelir?",
    answers: [
      { text: "Büyük hedef koyarım; engelleri yolda çözerim.", style: "D" },
      { text: "Görünür olur, ilişkilerimi fırsata dönüştürürüm.", style: "I" },
      { text: "Güvene dayalı, kalıcı bir müşteri çevresi kurarım.", style: "S" },
      { text: "Ölçer, sistem kurar ve sürekli iyileştiririm.", style: "C" },
    ],
  },
];

const PROFILES: Record<StyleKey, {
  name: string;
  tagline: string;
  color: string;
  soft: string;
  summary: string;
  strengths: string[];
  watch: string;
  action: string;
}> = {
  D: {
    name: "Öncü",
    tagline: "Harekete geçirir, sonucu sahiplenir",
    color: "#ba0c2f",
    soft: "#f9e9ed",
    summary: "Hız, cesaret ve netlik sizin doğal avantajınız. Gayrimenkulde hedef belirleme, müzakere ve fırsatı aksiyona dönüştürme alanlarında öne çıkabilirsiniz.",
    strengths: ["Hızlı karar", "Sonuç odağı", "Müzakere cesareti"],
    watch: "Hızınızın, bazı müşterilerin ihtiyaç duyduğu düşünme ve güven süresini gölgede bırakmamasına dikkat edin.",
    action: "Haftalık hedef panosu ve net aktivite metrikleriyle çalışın.",
  },
  I: {
    name: "Bağ Kurucu",
    tagline: "İlişkileri fırsata, enerjiyi harekete dönüştürür",
    color: "#df6b22",
    soft: "#fff0e4",
    summary: "İletişim, görünürlük ve iyimserlik sizin doğal avantajınız. Gayrimenkulde çevre geliştirme, güven yaratma ve kişisel marka alanlarında öne çıkabilirsiniz.",
    strengths: ["Güçlü iletişim", "Çevre geliştirme", "İlham verme"],
    watch: "Yeni bağlantıların heyecanı içinde takip, kayıt ve süreç disiplinini ikinci plana atmamaya dikkat edin.",
    action: "İlişki gücünüzü düzenli takip sistemi ve içerik takvimiyle birleştirin.",
  },
  S: {
    name: "Dengeleyici",
    tagline: "Güven inşa eder, ilişkileri sürdürülebilir kılar",
    color: "#3f8069",
    soft: "#e7f3ef",
    summary: "Sabır, sadakat ve dinleme gücü sizin doğal avantajınız. Gayrimenkulde uzun vadeli müşteri ilişkileri, referans ağı ve sakin problem çözmede öne çıkabilirsiniz.",
    strengths: ["Aktif dinleme", "Güven oluşturma", "İstikrar"],
    watch: "Uyumu korumak adına zor konuşmaları veya gerekli değişiklikleri gereğinden fazla ertelememeye dikkat edin.",
    action: "Güçlü hizmet rutininize haftalık yeni bağlantı hedefleri ekleyin.",
  },
  C: {
    name: "Stratejist",
    tagline: "Veriyi içgörüye, sistemi güvene dönüştürür",
    color: "#465d78",
    soft: "#e9eef4",
    summary: "Analiz, hazırlık ve kalite sizin doğal avantajınız. Gayrimenkulde doğru fiyatlama, bölge uzmanlığı ve hatasız süreç yönetiminde öne çıkabilirsiniz.",
    strengths: ["Analitik düşünme", "Planlama", "Kalite standardı"],
    watch: "Kusursuz bilgi arayışının karar almayı ve sahaya çıkmayı geciktirmemesine dikkat edin.",
    action: "Analiz için süre sınırı koyun; öğrendiklerinizi düzenli içerikle görünür kılın.",
  },
};

const STYLE_ORDER: StyleKey[] = ["D", "I", "S", "C"];

const BALANCED_ANSWER_ORDERS: StyleKey[][] = [
  ["D", "I", "S", "C"],
  ["I", "C", "D", "S"],
  ["S", "D", "C", "I"],
  ["C", "S", "I", "D"],
  ["I", "D", "C", "S"],
  ["S", "C", "D", "I"],
  ["C", "I", "S", "D"],
  ["D", "S", "I", "C"],
  ["S", "I", "C", "D"],
  ["C", "D", "I", "S"],
  ["D", "C", "S", "I"],
  ["I", "S", "D", "C"],
];

function shuffled<T>(values: readonly T[]) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function createAnswerPlan() {
  const tieOrder = shuffled(STYLE_ORDER);
  const styleMap = Object.fromEntries(STYLE_ORDER.map((key, index) => [key, tieOrder[index]])) as Record<StyleKey, StyleKey>;
  const orders = shuffled(BALANCED_ANSWER_ORDERS).map((order) => order.map((key) => styleMap[key]));
  return { orders, tieOrder };
}

function calculate(answers: StyleKey[], tieOrder: StyleKey[]) {
  const scores = { D: 0, I: 0, S: 0, C: 0 } satisfies Record<StyleKey, number>;
  answers.forEach((answer) => { scores[answer] += 1; });
  const ranked = [...STYLE_ORDER].sort((a, b) => scores[b] - scores[a] || tieOrder.indexOf(a) - tieOrder.indexOf(b));
  const percentages = Object.fromEntries(STYLE_ORDER.map((key) => [key, Math.round((scores[key] / QUESTIONS.length) * 100)])) as Record<StyleKey, number>;
  return { scores, percentages, primary: ranked[0], secondary: ranked[1] };
}

function ResultBars({ percentages }: { percentages: Record<StyleKey, number> }) {
  return (
    <div className="space-y-3">
      {STYLE_ORDER.map((key) => (
        <div key={key} className="grid grid-cols-[72px_1fr_40px] items-center gap-2 text-xs sm:grid-cols-[88px_1fr_44px] sm:gap-3 sm:text-sm">
          <span className="truncate font-semibold">{PROFILES[key].name}</span>
          <div className="h-2.5 overflow-hidden rounded-full bg-black/8">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${percentages[key]}%`, backgroundColor: PROFILES[key].color }} />
          </div>
          <span className="text-right font-bold tabular-nums">%{percentages[key]}</span>
        </div>
      ))}
    </div>
  );
}

export default function CareerCompass() {
  const [phase, setPhase] = useState<"intro" | "intake" | "quiz" | "result">("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<StyleKey[]>([]);
  const [intake, setIntake] = useState<IntakeData | null>(null);
  const [copied, setCopied] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [intakeSubmitting, setIntakeSubmitting] = useState(false);
  const [intakeError, setIntakeError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [answerPlan, setAnswerPlan] = useState({ orders: BALANCED_ANSWER_ORDERS, tieOrder: STYLE_ORDER });
  const result = useMemo(() => calculate(answers, answerPlan.tieOrder), [answers, answerPlan.tieOrder]);

  useEffect(() => { captureAttribution(); }, []);

  useEffect(() => {
    const targets = {
      intro: "pusula-baslangic",
      intake: "aday-formu",
      quiz: "pusula-kart",
      result: "sonuc",
    } as const;
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.getElementById(targets[phase])?.focus({ preventScroll: true });
      });
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [phase, current]);

  function showIntake() {
    setStartedAt(Date.now());
    setPhase("intake");
  }

  function beginQuiz() {
    setPhase("quiz");
    setCurrent(0);
    setAnswers([]);
  }

  function restartQuiz() {
    setPhase("quiz");
    setCurrent(0);
    setAnswers([]);
  }

  async function submitIntake(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIntakeSubmitting(true);
    setIntakeError("");
    const form = new FormData(event.currentTarget);
    const data: IntakeData = {
      first_name: String(form.get("first_name") || ""),
      last_name: String(form.get("last_name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      birth_date: String(form.get("birth_date") || ""),
      occupation: String(form.get("occupation") || ""),
      city: String(form.get("city") || ""),
      district: String(form.get("district") || ""),
      education: String(form.get("education") || ""),
      gender: String(form.get("gender") || ""),
      entrepreneurship: String(form.get("entrepreneurship") || ""),
    };

    try {
      const response = await fetch("/api/career-profile-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent_terms: form.get("consent_terms") === "on",
          website: String(form.get("website") || ""),
          form_started_at: startedAt,
          attribution: captureAttribution(),
        }),
      });
      if (!response.ok) throw new Error("request_failed");
      setAnswerPlan(createAnswerPlan());
      setIntake(data);
      beginQuiz();
    } catch {
      setIntakeError("Bilgileriniz şu anda kaydedilemedi. Lütfen kısa bir süre sonra tekrar deneyin.");
    } finally {
      setIntakeSubmitting(false);
    }
  }

  function choose(style: StyleKey) {
    const next = [...answers];
    next[current] = style;
    setAnswers(next);
    if (current === QUESTIONS.length - 1) {
      setPhase("result");
    } else {
      setCurrent((value) => value + 1);
    }
  }

  async function shareResult() {
    const profile = PROFILES[result.primary];
    const text = `KWAVO Kariyer Pusulası sonucum: ${profile.name} — ${profile.tagline}. Sen de çalışma stilini keşfet:`;
    if (navigator.share) {
      await navigator.share({ title: "KWAVO Kariyer Pusulası", text, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    const form = new FormData(event.currentTarget);
    const eventId = crypto.randomUUID();
    const payload = {
      name: intake ? `${intake.first_name} ${intake.last_name}` : "",
      email: intake?.email || "",
      phone: intake?.phone || "",
      office: String(form.get("office") || "Kararsızım"),
      experience: String(form.get("experience") || "Deneyimim yok"),
      preferred_time: String(form.get("preferred_time") || "En kısa sürede"),
      note: "Kariyer Pusulası üzerinden görüşme talebi.",
      profile: result.primary,
      secondary_profile: result.secondary,
      profile_scores: result.percentages,
      consent_terms: true,
      consent_marketing: false,
      website: String(form.get("website") || ""),
      form_started_at: startedAt || Date.now() - 5000,
      event_id: eventId,
      attribution: captureAttribution(),
    };
    try {
      const response = await fetch("/api/advisor-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("request_failed");
      trackAdvisorLead(eventId, payload.office);
      setSubmitted(true);
    } catch {
      setFormError("Talebiniz şu anda gönderilemedi. Lütfen kısa bir süre sonra tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  if (phase === "intro") {
    return (
      <main id="pusula-baslangic" tabIndex={-1} className="min-h-[calc(100vh-64px)] min-h-[calc(100dvh-64px)] overflow-hidden bg-[#f5f1eb] text-[#181515] outline-none">
        <section className="relative mx-auto grid min-h-[calc(100dvh-64px)] max-w-7xl items-center gap-8 px-4 py-8 sm:gap-12 sm:px-8 sm:py-12 lg:min-h-[760px] lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute -left-44 top-4 h-80 w-80 rounded-full bg-[#ba0c2f]/10 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ba0c2f]/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8f0a25]">
              <Compass size={15} /> KWAVO Kariyer Pusulası
            </div>
            <h1 className="mt-6 max-w-3xl text-[2.6rem] font-black leading-[0.98] tracking-[-0.05em] sm:mt-7 sm:text-6xl lg:text-7xl">Gayrimenkulde nasıl bir iz bırakırsınız?</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:mt-6 sm:text-lg sm:leading-8">12 kısa senaryoda doğal çalışma stilinizi keşfedin. Sonuçta size özel güçlü yönler, gelişim ipuçları ve danışmanlık yol haritası alın.</p>
            <button onClick={showIntake} className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-2xl bg-[#ba0c2f] px-6 py-4 font-bold text-white shadow-[0_16px_45px_rgba(186,12,47,0.28)] transition active:scale-[0.99] sm:mt-8 sm:w-auto sm:hover:-translate-y-0.5 sm:hover:bg-[#a00a29]">
              Ücretsiz testi başlat <ArrowRight size={19} />
            </button>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-2"><Sparkles size={16} /> Yaklaşık 3 dakika</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={16} /> Sonucu görmek için üyelik gerekmez</span>
            </div>
          </div>
          <div className="relative rounded-3xl border border-black/10 bg-[#1e1b1c] p-3 shadow-2xl sm:rounded-[2rem] sm:p-6">
            <div className="rounded-2xl bg-white p-5 sm:rounded-[1.5rem] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">Olası sonuçlar</p>
              <h2 className="mt-2 text-2xl font-black">Dört stil, tek bir doğru yok.</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Pusula, baskın eğiliminizi ve onu destekleyen ikinci stilinizi gösterir.</p>
              <div className="mt-5 grid gap-2.5 min-[360px]:grid-cols-2 sm:mt-6 sm:gap-3">
                {STYLE_ORDER.map((key) => (
                  <article key={key} className="rounded-xl border border-black/10 p-3 sm:rounded-2xl sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-black text-white sm:h-10 sm:w-10 sm:rounded-xl" style={{ backgroundColor: PROFILES[key].color }}>{key}</span><h3 className="text-sm font-bold sm:text-base">{PROFILES[key].name}</h3></div>
                    <p className="mt-2 text-xs leading-4 text-neutral-500 sm:mt-3 sm:text-sm sm:leading-5">{PROFILES[key].tagline}</p>
                  </article>
                ))}
              </div>
            </div>
            <p className="px-4 pb-1 pt-4 text-center text-xs leading-5 text-white/50">Kişisel farkındalık içindir; bilimsel tanı veya işe alım elemesi değildir.</p>
          </div>
        </section>
      </main>
    );
  }

  if (phase === "intake") {
    const fieldClass = "mt-1.5 min-h-12 w-full rounded-xl border border-black/15 bg-white px-3 py-3 text-base font-normal outline-none transition focus:border-[#ba0c2f] focus:ring-2 focus:ring-[#ba0c2f]/10";
    return (
      <main className="min-h-[calc(100vh-64px)] min-h-[calc(100dvh-64px)] bg-[#f5f1eb] px-3 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-10 lg:py-14">
        <section id="aday-formu" tabIndex={-1} className="mx-auto max-w-4xl outline-none">
          <button onClick={() => setPhase("intro")} className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black sm:mb-5"><ArrowLeft size={17} /> Geri dön</button>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl sm:rounded-[2rem]">
            <div className="border-b border-black/8 bg-[#1e1b1c] px-5 py-5 text-white sm:px-9 sm:py-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Adım 1 / 2</p>
              <h1 className="mt-2 text-2xl font-black sm:text-3xl">Sizi biraz tanıyalım</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">Bilgileriniz sonucu değiştirmez. Kariyer Pusulası deneyimini takip edebilmemiz ve talebiniz halinde sizinle iletişim kurabilmemiz için kullanılır.</p>
            </div>
            <form onSubmit={submitIntake} className="grid gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-9">
              <label className="text-sm font-semibold">Ad<input name="first_name" required autoComplete="given-name" className={fieldClass} placeholder="Adınız" /></label>
              <label className="text-sm font-semibold">Soyad<input name="last_name" required autoComplete="family-name" className={fieldClass} placeholder="Soyadınız" /></label>
              <label className="text-sm font-semibold">E-posta<input name="email" required type="email" autoComplete="email" className={fieldClass} placeholder="ornek@email.com" /></label>
              <label className="text-sm font-semibold">Telefon<input name="phone" required autoComplete="tel" inputMode="tel" pattern="[0-9+ ()-]{10,20}" className={fieldClass} placeholder="05XX XXX XX XX" /></label>
              <label className="text-sm font-semibold">Doğum tarihi<input name="birth_date" required type="date" className={fieldClass} /></label>
              <label className="text-sm font-semibold">Meslek<input name="occupation" required className={fieldClass} placeholder="Mesleğiniz" /></label>
              <label className="text-sm font-semibold">Yaşadığınız il<input name="city" required autoComplete="address-level1" className={fieldClass} placeholder="İzmir" /></label>
              <label className="text-sm font-semibold">Yaşadığınız ilçe<input name="district" required autoComplete="address-level2" className={fieldClass} placeholder="İlçeniz" /></label>
              <label className="text-sm font-semibold">Eğitim durumu<select name="education" required defaultValue="" className={fieldClass}><option value="" disabled>Seçin</option><option>Lise</option><option>Ön lisans</option><option>Lisans</option><option>Yüksek lisans</option><option>Doktora</option><option>Diğer</option></select></label>
              <label className="text-sm font-semibold">Cinsiyet<select name="gender" required defaultValue="" className={fieldClass}><option value="" disabled>Seçin</option><option>Kadın</option><option>Erkek</option><option>Belirtmek istemiyorum</option><option>Diğer</option></select></label>
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-semibold">Daha önce kendi işinizi kurdunuz veya bir girişimde bulundunuz mu?</legend>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm"><label className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-black/10 px-4"><input name="entrepreneurship" type="radio" value="Hayır" required /> Hayır</label><label className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-black/10 px-4"><input name="entrepreneurship" type="radio" value="Evet" required /> Evet</label></div>
              </fieldset>
              <input name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-px w-px" aria-hidden="true" />
              <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-neutral-50 p-4 text-xs leading-5 text-neutral-600 sm:col-span-2"><input name="consent_terms" type="checkbox" required className="mt-1 h-4 w-4 shrink-0" /><span>Bilgilerimin başvuru sürecinin yürütülmesi ve benimle iletişim kurulması amacıyla işlenmesini kabul ediyorum. <a href="/privacy" target="_blank" className="font-semibold underline">Gizlilik Politikası</a></span></label>
              <div className="flex flex-col-reverse gap-3 border-t border-black/8 pt-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-neutral-500"><ShieldCheck className="mr-1 inline" size={15} /> Bilgileriniz üçüncü kişilerle pazarlama amacıyla paylaşılmaz.</p>
                <button disabled={intakeSubmitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ba0c2f] px-6 py-3.5 font-bold text-white transition hover:bg-[#a00a29] disabled:opacity-60 sm:w-auto">{intakeSubmitting ? "Kaydediliyor…" : "Kaydet ve teste geç"}<ArrowRight size={18} /></button>
              </div>
              {intakeError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{intakeError}</p>}
            </form>
          </div>
        </section>
      </main>
    );
  }

  if (phase === "quiz") {
    const question = QUESTIONS[current];
    const orderedAnswers = answerPlan.orders[current].map((style) => {
      const answer = question.answers.find((item) => item.style === style);
      if (!answer) throw new Error(`Missing ${style} answer for question ${current + 1}`);
      return answer;
    });
    const progress = ((current + 1) / QUESTIONS.length) * 100;
    return (
      <main className="flex min-h-[calc(100vh-64px)] min-h-[calc(100dvh-64px)] items-start bg-[#f5f1eb] px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center sm:px-6 sm:py-10">
        <section id="pusula-kart" tabIndex={-1} className="mx-auto w-full max-w-4xl outline-none">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold text-neutral-500 sm:mb-5 sm:text-sm"><span>{question.context}</span><span className="tabular-nums">{current + 1} / {QUESTIONS.length}</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#ba0c2f] transition-all duration-300" style={{ width: `${progress}%` }} /></div>
          <div className="mt-4 rounded-3xl border border-black/10 bg-white p-4 shadow-xl sm:mt-6 sm:rounded-[2rem] sm:p-9">
            <h1 className="max-w-3xl text-[1.35rem] font-black leading-tight sm:text-3xl">{question.prompt}</h1>
            <p className="mt-2 text-xs leading-5 text-neutral-500 sm:mt-3 sm:text-sm">Size en yakın olan seçeneği düşünmeden, doğal refleksinize göre işaretleyin.</p>
            <div className="mt-5 grid gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
              {orderedAnswers.map((answer) => (
                <button key={answer.style} onClick={() => choose(answer.style)} className={`group flex min-h-[72px] touch-manipulation items-center justify-between gap-3 rounded-2xl border p-4 text-left text-sm font-medium leading-5 transition active:scale-[0.99] sm:min-h-24 sm:gap-4 sm:p-5 sm:text-[15px] sm:leading-6 sm:hover:-translate-y-0.5 sm:hover:border-[#ba0c2f]/50 sm:hover:bg-[#fff8f9] ${answers[current] === answer.style ? "border-[#ba0c2f] bg-[#fff8f9]" : "border-black/10"}`}>
                  <span>{answer.text}</span><ChevronRight className="shrink-0 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-[#ba0c2f]" size={20} />
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4 sm:mt-7 sm:pt-5">
              <button disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-neutral-500 disabled:invisible"><ArrowLeft size={17} /> Geri</button>
              <span className="text-xs text-neutral-400">Doğru veya yanlış cevap yok.</span>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const primary = PROFILES[result.primary];
  const secondary = PROFILES[result.secondary];
  return (
    <main id="sonuc" tabIndex={-1} className="min-h-[calc(100vh-64px)] min-h-[calc(100dvh-64px)] bg-[#f5f1eb] px-3 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] outline-none sm:px-6 sm:py-10 lg:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl sm:rounded-[2rem] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative flex min-h-[310px] flex-col justify-between p-5 text-white sm:min-h-[390px] sm:p-10" style={{ backgroundColor: primary.color }}>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[42px] border-white/10" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Baskın çalışma stiliniz</p>
              <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl font-black shadow-lg sm:mt-8 sm:h-24 sm:w-24 sm:rounded-3xl sm:text-5xl" style={{ color: primary.color }}>{result.primary}</div>
            </div>
            <div className="relative mt-8 sm:mt-12">
              <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">{primary.name}</h1>
              <p className="mt-3 max-w-sm text-lg leading-7 text-white/80">{primary.tagline}</p>
              <p className="mt-5 text-sm text-white/65">Destekleyici stil: <strong className="text-white">{secondary.name} ({result.secondary})</strong></p>
            </div>
          </div>
          <div className="p-5 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ba0c2f]">Kariyer Pusulası sonucunuz</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Doğal avantajınızı işe dönüştürün.</h2></div>
              <button onClick={shareResult} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-neutral-50 sm:w-auto">{copied ? <Copy size={17} /> : <Share2 size={17} />}{copied ? "Bağlantı kopyalandı" : "Sonucu paylaş"}</button>
            </div>
            <p className="mt-6 text-base leading-7 text-neutral-600">{primary.summary}</p>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-4">
              {primary.strengths.map((strength) => <div key={strength} className="rounded-xl p-3 sm:rounded-2xl sm:p-4" style={{ backgroundColor: primary.soft }}><Check size={18} style={{ color: primary.color }} /><p className="mt-2 text-xs font-bold leading-4 sm:text-sm">{strength}</p></div>)}
            </div>
            <div className="mt-8"><ResultBars percentages={result.percentages} /></div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-black/10 bg-white p-5 sm:rounded-[1.75rem] sm:p-8">
            <div className="flex items-center gap-3"><div className="rounded-xl bg-amber-100 p-2.5 text-amber-700"><BarChart3 size={22} /></div><h2 className="text-xl font-black">Denge noktası</h2></div>
            <p className="mt-4 leading-7 text-neutral-600">{primary.watch}</p>
          </article>
          <article className="rounded-3xl border border-black/10 bg-[#1e1b1c] p-5 text-white sm:rounded-[1.75rem] sm:p-8">
            <div className="flex items-center gap-3"><div className="rounded-xl bg-white/10 p-2.5"><Target size={22} /></div><h2 className="text-xl font-black">İlk gelişim hamleniz</h2></div>
            <p className="mt-4 leading-7 text-white/70">{primary.action}</p>
          </article>
        </div>

        <CareerAssistant
          firstName={intake?.first_name || "Merhaba"}
          primary={result.primary}
          secondary={result.secondary}
          scores={result.percentages}
        />

        <section className="mt-6 rounded-3xl border border-black/10 bg-white p-5 sm:rounded-[2rem] sm:p-9">
          {!submitted ? (
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ba0c2f]">Sonraki adım</p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">Bu profil gayrimenkulde nasıl çalışır?</h2>
                <p className="mt-4 leading-7 text-neutral-600">Sonucunuzu bir kariyer görüşmesinde birlikte yorumlayalım. Görüşme ücretsizdir; maaşlı iş başvurusu veya taahhüt değildir.</p>
              </div>
              <form onSubmit={submitLead} className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">Görüşmek istediğiniz ofis<select name="office" defaultValue="Kararsızım" className="mt-1.5 min-h-12 w-full rounded-xl border border-black/15 bg-white px-3 py-3 text-base font-normal outline-none focus:border-[#ba0c2f]"><option>Kararsızım</option><option>KW Alesta</option><option>KW Viya</option><option>KW Orsa</option></select></label>
                <label className="text-sm font-semibold">Gayrimenkul deneyimi<select name="experience" defaultValue="Deneyimim yok" className="mt-1.5 min-h-12 w-full rounded-xl border border-black/15 bg-white px-3 py-3 text-base font-normal outline-none focus:border-[#ba0c2f]"><option>Deneyimim yok</option><option>1 yıldan az</option><option>1-3 yıl</option><option>3 yıldan fazla</option></select></label>
                <label className="text-sm font-semibold">Uygun zaman<select name="preferred_time" defaultValue="En kısa sürede" className="mt-1.5 min-h-12 w-full rounded-xl border border-black/15 bg-white px-3 py-3 text-base font-normal outline-none focus:border-[#ba0c2f]"><option>En kısa sürede</option><option>Hafta içi 09:00-12:00</option><option>Hafta içi 12:00-17:00</option><option>Hafta içi 17:00 sonrası</option></select></label>
                <input name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-px w-px" aria-hidden="true" />
                <button disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ba0c2f] px-5 py-3.5 font-bold text-white transition hover:bg-[#a00a29] disabled:opacity-60 sm:col-span-2">{submitting ? "Gönderiliyor…" : "Profilimi Bir Uzmanla Yorumla"}<ArrowRight size={18} /></button>
                {formError && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{formError}</p>}
              </form>
            </div>
          ) : (
            <div className="py-6 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check size={28} /></div><h2 className="mt-4 text-2xl font-black">Görüşme talebiniz alındı.</h2><p className="mt-2 text-neutral-600">Ekibimiz tercih ettiğiniz ofis ve zaman bilgisini dikkate alarak sizinle iletişim kuracak.</p></div>
          )}
        </section>

        <div className="mt-7 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="max-w-3xl text-xs leading-5 text-neutral-500">Bu kısa çalışma, DISC davranış yaklaşımından ilham alan bir öz farkındalık deneyimidir. Psikometrik değerlendirme, klinik tanı veya işe alım eleme aracı değildir.</p>
          <button onClick={restartQuiz} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-black"><RefreshCcw size={16} /> Testi yeniden çöz</button>
        </div>
      </section>
    </main>
  );
}
