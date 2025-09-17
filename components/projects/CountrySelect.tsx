"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CountrySelect({
  value,
  options,
  type,
}: {
  value: string;      // "Tümü" | "Türkiye" | "ABD" | "Almanya" ...
  options: string[];
  type: string;       // "all" | "project" | "villa" | "visa"
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [highlight, setHighlight] = useState(
    Math.max(0, options.findIndex((o) => o === value))
  );

  const rootRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Seçim yapınca URL’i güncelle
  const apply = (v: string) => {
    setSelected(v);
    setOpen(false);

    const params = new URLSearchParams(sp.toString());

    // type parametresini koru
    if (type && type !== "all") params.set("type", type);
    else params.delete("type");

    // country parametresi
    if (v === "Tümü") params.delete("country");
    else params.set("country", v);

    const qs = params.toString();
    router.push(qs ? `/projects?${qs}` : "/projects");
  };

  // Klavye ile gezinme
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      apply(options[highlight]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        className={[
          "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm",
          "bg-white ring-1 ring-black/15 hover:bg-gray-50",
          "shadow-sm transition focus:outline-none focus:ring-2 focus:ring-black/20",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
      >
        <span className="text-gray-600">Ülke:</span>
        <span className="font-medium">{selected}</span>
        <svg
          className={`ml-1 h-4 w-4 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-activedescendant={`opt-${highlight}`}
          className="absolute z-50 mt-2 w-48 rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden"
        >
          <ul className="max-h-64 overflow-auto py-1">
            {options.map((opt, i) => {
              const isActive = i === highlight;
              const isSelected = opt === selected;
              return (
                <li
                  id={`opt-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  key={opt}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => apply(opt)}
                    className={[
                      "flex w-full items-center justify-between px-3 py-2 text-sm",
                      isActive ? "bg-gray-100" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <span className="text-left">{opt}</span>
                    {isSelected && (
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4 text-green-600"
                        aria-hidden
                      >
                        <path
                          d="M7.5 11.5l-2-2L4 11l3.5 3.5L16 6l-1.5-1.5-7 7z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}