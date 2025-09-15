"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

export default function OfficeSelect({
  name,
  options,
  value,
  onChange,
  placeholder = "Seçin…",
}: {
  name: string;
  options: Option[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(s) || o.value.toLowerCase().includes(s)
    );
  }, [options, q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
      return;
    }
    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = filtered[activeIndex];
      if (it) {
        onChange?.(it.value);
        setOpen(false);
        setQ("");
      }
    }
  };

  return (
    <div ref={containerRef} className="relative" onKeyDown={onKeyDown}>
      <input type="hidden" name={name} value={value ?? ""} />

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-xl border border-black/10 px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? "" : "text-gray-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg width="18" height="18" viewBox="0 0 20 20" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border border-black/10 bg-white shadow-lg">
          <div className="p-2 border-b border-black/10">
            <input
              autoFocus
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActiveIndex(0);
              }}
              placeholder="Ara: Alesta / Viya / Orsa…"
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <ul ref={listRef} role="listbox" className="max-h-56 overflow-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">Sonuç yok</li>
            )}
            {filtered.map((o, i) => {
              const active = i === activeIndex;
              const selectedItem = o.value === value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedItem}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      onChange?.(o.value);
                      setOpen(false);
                      setQ("");
                    }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between ${
                      active ? "bg-gray-50" : ""
                    }`}
                  >
                    <span>{o.label}</span>
                    {selectedItem && (
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
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