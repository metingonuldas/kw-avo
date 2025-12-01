// hooks/use-custom-chat.ts
'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function useCustomChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Yeni soru geldiğinde eski isteği iptal etmek için
  const abortRef = useRef<AbortController | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    // 1) Kullanıcı mesajını hemen ekle
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 2) Eski bir istek devam ediyorsa iptal et
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // 3) API'ye mevcut tüm mesaj geçmişini gönder
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || '',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        // Yeni istekte eskiyi iptal ettik, bunu hata göstermeye gerek yok
        console.warn('Chat isteği iptal edildi.');
      } else {
        console.error('Chat Error:', err);
        setError(err?.message || 'Bilinmeyen bir hata oluştu.');
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  return { messages, input, handleInputChange, handleSubmit, isLoading, error };
}
