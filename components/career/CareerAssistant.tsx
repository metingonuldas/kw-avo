"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { ArrowUp, Bot, LoaderCircle, MessageCircle, ShieldCheck, Sparkles, UserRound } from "lucide-react";

type StyleKey = "D" | "I" | "S" | "C";
type ChatMessage = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Profilim gayrimenkulde bana nasıl avantaj sağlar?",
  "Hiç deneyimim yok, nereden başlamalıyım?",
  "Hangi ofis bana daha uygun olabilir?",
  "Danışmanlık modeli maaşlı bir iş mi?",
];

export default function CareerAssistant({
  firstName,
  primary,
  secondary,
  scores,
}: {
  firstName: string;
  primary: StyleKey;
  secondary: StyleKey;
  scores: Record<StyleKey, number>;
}) {
  const initialMessage = useMemo<ChatMessage>(() => ({
    role: "assistant",
    content: `Merhaba ${firstName}, ben AVO. Kariyer Pusulası sonucunuzda ${primary} profiliniz baskın, ${secondary} profiliniz destekleyici görünüyor. Sonucunuzu birlikte yorumlayabilir veya gayrimenkul danışmanlığıyla ilgili merak ettiklerinizi konuşabiliriz.`,
  }), [firstName, primary, secondary]);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    window.setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 20);
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
        body: JSON.stringify({
          messages: nextMessages,
          context: { firstName, primary, secondary, scores },
        }),
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
      setError("AVO şu anda yanıt veremiyor. Lütfen kısa bir süre sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm sm:rounded-[2rem]">
      <div className="flex flex-col gap-3 border-b border-black/8 bg-[#1e1b1c] px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ba0c2f] sm:h-12 sm:w-12 sm:rounded-2xl"><Bot size={24} /><span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#1e1b1c] bg-emerald-400" /></div>
          <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="font-black">AVO Kariyer Asistanı</h2><span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/60">Yapay zekâ</span></div><p className="mt-1 text-xs leading-4 text-white/55">Profilinizi ve danışmanlık modelini birlikte konuşun</p></div>
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-white/55"><ShieldCheck size={15} /> Hassas bilgiler modele gönderilmez</div>
      </div>

      <div ref={listRef} className="h-[min(55dvh,430px)] min-h-[320px] space-y-4 overflow-y-auto overscroll-contain bg-[#f7f5f2] px-3 py-5 sm:h-[430px] sm:space-y-5 sm:px-7 sm:py-6" aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#1e1b1c] text-white"><Bot size={17} /></div>}
            <div className={`max-w-[calc(100%_-_40px)] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-sm leading-6 shadow-sm sm:max-w-[82%] sm:px-4 ${message.role === "user" ? "rounded-br-md bg-[#ba0c2f] text-white" : "rounded-bl-md border border-black/8 bg-white text-neutral-700"}`}>
              {message.content || <span className="inline-flex items-center gap-2 text-neutral-400"><LoaderCircle className="animate-spin" size={15} /> Düşünüyor…</span>}
            </div>
            {message.role === "user" && <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#ba0c2f]/10 text-[#ba0c2f] sm:flex"><UserRound size={17} /></div>}
          </div>
        ))}
        {messages.length === 1 && (
          <div className="pt-2">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400"><Sparkles size={14} /> Bir soruyla başlayın</p>
            <div className="grid gap-2 sm:flex sm:flex-wrap">{STARTERS.map((starter) => <button key={starter} onClick={() => void sendMessage(starter)} className="min-h-11 rounded-xl border border-black/10 bg-white px-3 py-2 text-left text-xs font-semibold text-neutral-600 transition active:scale-[0.99] hover:border-[#ba0c2f]/40 hover:text-[#ba0c2f] sm:min-h-0 sm:rounded-full">{starter}</button>)}</div>
          </div>
        )}
      </div>

      <form onSubmit={submit} className="border-t border-black/8 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5">
        <div className="flex items-end gap-2 rounded-2xl border border-black/15 bg-white p-2 pl-3 focus-within:border-[#ba0c2f] focus-within:ring-2 focus-within:ring-[#ba0c2f]/10 sm:gap-3 sm:pl-4">
          <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(input); } }} rows={2} maxLength={1600} disabled={loading} placeholder="AVO'ya sorunuzu yazın…" className="max-h-32 min-h-12 min-w-0 flex-1 resize-none bg-transparent py-2 text-base outline-none disabled:opacity-60 sm:text-sm" aria-label="AVO'ya mesajınız" />
          <button type="submit" disabled={loading || !input.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ba0c2f] text-white transition hover:bg-[#a00a29] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Mesajı gönder"><ArrowUp size={20} /></button>
        </div>
        <div className="mt-2 flex text-[11px] leading-4 text-neutral-400 sm:items-center sm:justify-between sm:gap-3"><span className="hidden sm:inline">Enter: gönder · Shift + Enter: yeni satır</span><span className="inline-flex items-start gap-1"><MessageCircle className="mt-0.5 shrink-0" size={12} /> AVO hata yapabilir; önemli bilgileri uzmanla teyit edin.</span></div>
        {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      </form>
    </section>
  );
}
