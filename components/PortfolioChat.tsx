'use client';

import { useEffect, useRef } from 'react';
import { useCustomChat } from '@/hooks/use-custom-chat';
import Linkify from 'linkify-react';

export function PortfolioChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useCustomChat();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Mesaj geldikçe en alta kaydır
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[640px] w-full border rounded-xl shadow-2xl bg-white overflow-hidden font-sans">
      {/* Üst Başlık */}
      <div className="bg-[#ba0c2f] p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse absolute top-0 right-0" />
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
              AI
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">KW AVO Asistan</h2>
            <p className="text-xs text-white/80">Portföy Danışmanınız</p>
          </div>
        </div>
      </div>

      {/* Mesaj Alanı */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 mt-10 p-6">
            <div className="text-4xl mb-4">🏠</div>
            <p className="font-medium text-gray-800">
              Merhaba! Size nasıl yardımcı olabilirim?
            </p>
            <p className="text-sm mt-2 text-gray-600">
              &quot;Mavişehir&apos;de 3+1 daire var mı?&quot;
              <br />
              veya &quot;20 milyon TL altı villalar neler?&quot;
              <br />
              gibi sorular sorabilirsiniz.
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#ba0c2f] text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">
                <Linkify
                  options={{
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'text-[#ba0c2f] underline font-medium',
                  }}
                >
                  {m.content}
                </Linkify>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-500 text-xs py-2 px-4 rounded-full shadow-sm animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              Portföyler taranıyor...
            </div>
          </div>
        )}

        {error && (
          <div className="text-xs text-red-500 mt-2">
            Bir hata oluştu: {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Giriş Alanı */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-gray-100 flex gap-3"
      >
        <input
          className="flex-1 p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ba0c2f]/20 focus:border-[#ba0c2f] transition-all text-sm text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Aradığınız evi tarif edin..."
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#ba0c2f] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#a00a29] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 transform duration-100"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}
