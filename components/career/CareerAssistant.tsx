"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, CalendarCheck, LoaderCircle, MessageCircle, ShieldCheck, Sparkles, UserRound, X } from "lucide-react";

type StyleKey = "D" | "I" | "S" | "C";
type ChatMessage = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Bu kariyer bana uygun olabilir mi?",
  "Kazanç modeli nasıl çalışıyor?",
  "Deneyimim yoksa nasıl başlarım?",
  "Hangi eğitim ve araçlar sunuluyor?",
  "Detaylı sonucumu nasıl öğrenebilirim?",
];

export default function CareerAssistant({ firstName, primary, secondary, scores }: {
  firstName: string;
  primary: StyleKey;
  secondary: StyleKey;
  scores: Record<StyleKey, number>;
}) {
  const initialMessage = useMemo<ChatMessage>(() => ({
    role: "assistant",
    content: `${firstName ? `Merhaba ${firstName}` : "Merhaba"}, ben Mira 👋 Ön değerlendirmeniz hazır. Profilinizin ayrıntılarını burada açmadan; gayrimenkul kariyeri, çalışma modeli ve KW AVO'daki desteklerle ilgili sorularınızı yanıtlayabilirim. En çok neyi merak ediyorsunuz?`,
  }), [firstName]);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const timer = window.setTimeout(() => {
      if (desktop) setOpen(true);
      else setShowNudge(true);
    }, desktop ? 1200 : 700);
    return () => window.clearTimeout(timer);
  }, []);

  function scrollToBottom() {
    window.setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 20);
  }

  function openChat() {
    setOpen(true);
    setShowNudge(false);
    scrollToBottom();
  }

  async function sendMessage(text: string) {
    const cleanText = text.trim().slice(0, 1600);
    if (!cleanText || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: cleanText }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setLoading(true);
    scrollToBottom();

    try {
      const response = await fetch("/api/career-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, context: { firstName, primary, secondary, scores } }),
      });
      if (!response.ok || !response.body) throw new Error("chat_failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages([...nextMessages, { role: "assistant", content: assistantText }]);
        scrollToBottom();
      }
    } catch {
      setMessages(nextMessages);
      setError("Mira şu anda yanıt veremiyor. Lütfen kısa bir süre sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  if (!open) {
    return (
      <div className="fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] right-3 z-[60] flex items-end gap-2 sm:bottom-5 sm:right-5">
        {showNudge && (
          <button onClick={openChat} className="max-w-[220px] rounded-2xl rounded-br-md border border-black/10 bg-white px-4 py-3 text-left shadow-[0_14px_42px_rgba(0,0,0,0.18)] transition active:scale-[0.98] sm:max-w-[250px]">
            <span className="block text-sm font-black text-neutral-900">Merhaba, ben Mira 👋</span>
            <span className="mt-1 block text-xs leading-5 text-neutral-500">Kariyer ve KW AVO hakkında merak ettiklerinizi sorabilirsiniz.</span>
          </button>
        )}
        <button onClick={openChat} aria-label="Mira kariyer asistanını aç" className="relative h-16 w-16 shrink-0 rounded-full border-[3px] border-white bg-white shadow-[0_12px_38px_rgba(0,0,0,0.3)] transition active:scale-95 sm:h-[72px] sm:w-[72px] sm:hover:-translate-y-1">
          <span className="absolute inset-0 overflow-hidden rounded-full"><Image src="/images/career/mira-avatar.png" alt="Mira Kariyer Asistanı" fill sizes="72px" className="object-cover" priority /></span>
          <span aria-hidden="true" className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-white bg-emerald-500 shadow-[0_2px_8px_rgba(16,185,129,0.65)]"><span className="h-1.5 w-1.5 rounded-full bg-white/80" /></span>
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Mira Kariyer Asistanı" className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.3)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[410px]">
      <header className="flex items-center justify-between gap-3 bg-[#1e1b1c] px-4 py-3.5 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0"><span className="absolute inset-0 overflow-hidden rounded-full border-2 border-white/20"><Image src="/images/career/mira-avatar.png" alt="Mira" fill sizes="48px" className="object-cover" priority /></span><span aria-hidden="true" className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-[#1e1b1c] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.75)]" /></div>
          <div className="min-w-0"><div className="flex items-center gap-2"><h2 className="font-black">Mira</h2><span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/60">Yapay zekâ</span></div><div className="mt-0.5 flex items-center gap-2 text-xs"><span className="min-w-0 flex-1 truncate text-white/55">KW AVO Kariyer Asistanı</span><span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-emerald-300"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]" />Çevrimiçi</span></div></div>
        </div>
        <button onClick={() => setOpen(false)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Sohbeti kapat"><X size={21} /></button>
      </header>

      <div ref={listRef} className="h-[min(53dvh,440px)] min-h-[300px] space-y-4 overflow-y-auto overscroll-contain bg-[#f7f5f2] px-3 py-4 sm:h-[440px] sm:px-5 sm:py-5" aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full"><Image src="/images/career/mira-avatar.png" alt="" fill sizes="32px" className="object-cover" /></div>}
            <div className={`max-w-[calc(100%_-_40px)] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-sm leading-6 shadow-sm sm:max-w-[82%] ${message.role === "user" ? "rounded-br-md bg-[#ba0c2f] text-white" : "rounded-bl-md border border-black/8 bg-white text-neutral-700"}`}>{message.content || <span className="inline-flex items-center gap-2 text-neutral-400"><LoaderCircle className="animate-spin" size={15} /> Düşünüyor…</span>}</div>
            {message.role === "user" && <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#ba0c2f]/10 text-[#ba0c2f] sm:flex"><UserRound size={17} /></div>}
          </div>
        ))}
        {messages.length === 1 && (
          <div className="pt-1">
            <p className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400"><Sparkles size={13} /> Hızlı sorular</p>
            <div className="grid gap-2">{STARTERS.map((starter) => <button key={starter} onClick={() => void sendMessage(starter)} className="min-h-10 rounded-xl border border-black/10 bg-white px-3 py-2 text-left text-xs font-semibold text-neutral-600 transition active:scale-[0.99] hover:border-[#ba0c2f]/40 hover:text-[#ba0c2f]">{starter}</button>)}</div>
          </div>
        )}
      </div>

      <div className="border-t border-black/8 bg-white">
        <a href="#gorusme-formu" onClick={() => setOpen(false)} className="flex min-h-10 items-center justify-center gap-2 border-b border-black/8 px-4 py-2 text-xs font-bold text-[#ba0c2f] transition hover:bg-[#fff7f8]"><CalendarCheck size={15} /> Ücretsiz kariyer görüşmesi planla</a>
        <form onSubmit={submit} className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4">
          <div className="flex items-end gap-2 rounded-2xl border border-black/15 bg-white p-2 pl-3 focus-within:border-[#ba0c2f] focus-within:ring-2 focus-within:ring-[#ba0c2f]/10">
            <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(input); } }} rows={1} maxLength={1600} disabled={loading} placeholder="Mira'ya sorunuzu yazın…" className="max-h-24 min-h-10 min-w-0 flex-1 resize-none bg-transparent py-2 text-base outline-none disabled:opacity-60 sm:text-sm" aria-label="Mira'ya mesajınız" />
            <button type="submit" disabled={loading || !input.trim()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ba0c2f] text-white transition hover:bg-[#a00a29] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Mesajı gönder"><ArrowUp size={19} /></button>
          </div>
          <div className="mt-2 flex items-start justify-between gap-3 text-[10px] leading-4 text-neutral-400"><span className="inline-flex items-start gap-1"><MessageCircle className="mt-0.5 shrink-0" size={11} /> Mira hata yapabilir; önemli bilgileri uzmanla teyit edin.</span><span className="inline-flex shrink-0 items-center gap-1"><ShieldCheck size={11} /> Kişisel bilgi paylaşmayın</span></div>
          {error && <p role="alert" className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
        </form>
      </div>
    </aside>
  );
}
