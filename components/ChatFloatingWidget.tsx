"use client";

import { useState } from "react";
import { PortfolioChat } from "@/components/PortfolioChat";
import { MessageCircle } from "lucide-react";

export default function ChatFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* DESKTOP / TABLET: sağ altta geniş chat paneli */}
      <div className="hidden md:flex fixed bottom-4 right-4 z-40 flex-col items-end">
        {isOpen && (
          <div className="mb-3 w-[420px] lg:w-[500px] max-h-[80vh]">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <PortfolioChat />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#ba0c2f] text-white shadow-xl hover:bg-[#a00a29] transition-colors active:scale-95"
          aria-label="İlan Arama Botu"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">İlan Arama Botu</span>
        </button>
      </div>

      {/* MOBILE: sağ altta, web ile aynı köşe */}
      <div className="md:hidden fixed bottom-4 right-4 z-40 flex flex-col items-end">
        {isOpen && (
          <div className="mb-3 w-[90vw] max-w-[420px] max-h-[80vh]">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <PortfolioChat />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#ba0c2f] text-white shadow-xl hover:bg-[#a00a29] transition-colors active:scale-95"
          aria-label="İlan Arama Botu"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">İlan Arama Botu</span>
        </button>
      </div>
    </>
  );
}
