// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/offices", label: "Ofisler" },
  { href: "/contact", label: "İletişim" },
];

// Kurumsal alt menüsü
const corporateMenu = [
  { href: "/leadership", label: "Liderlik" },
  { href: "/press", label: "Basın" },
  { href: "/technology", label: "Teknoloji" },
  { href: "/media", label: "Media Kit" }, // 👈 buradan erişilecek
  // { href: "/kvkk", label: "KVKK" }, // ileride eklersin
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [corpOpen, setCorpOpen] = useState(false); // desktop klavye erişimi için
  const corpMenuRef = useRef<HTMLLIElement>(null);

  // Menü dışında tıklayınca Kurumsal menüyü kapat
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!corpMenuRef.current) return;
      if (!corpMenuRef.current.contains(e.target as Node)) setCorpOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          KW Alesta • Viya • Orsa
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-5 text-sm">
          {primaryLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`hover:opacity-80 ${
                  pathname === l.href ? "font-medium underline underline-offset-8" : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Kurumsal dropdown */}
          <li className="relative" ref={corpMenuRef}>
            <button
              className="hover:opacity-80"
              aria-haspopup="menu"
              aria-expanded={corpOpen}
              onClick={() => setCorpOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setCorpOpen(false);
                if (e.key === "ArrowDown") setCorpOpen(true);
              }}
            >
              Kurumsal
            </button>

            <div
              className={`absolute left-0 top-full mt-2 w-56 rounded-xl border border-black/10 bg-white shadow-lg transition
                          ${corpOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              role="menu"
            >
              <ul className="py-2 text-sm">
                {corporateMenu.map((m) => (
                  <li key={m.href}>
                    <Link
                      href={m.href}
                      className={`block px-3 py-2 hover:bg-gray-50 ${
                        pathname === m.href ? "font-medium" : ""
                      }`}
                      role="menuitem"
                      onClick={() => setCorpOpen(false)}
                    >
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        {/* Sağ CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium bg-black text-white hover:opacity-90"
        >
          Danışman Ol
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center rounded-lg px-3 py-2 ring-1 ring-black/10"
          onClick={() => setMobileOpen((s) => !s)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Menüyü aç/kapat"
        >
          Menü
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-black/5 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-1 text-sm">
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block rounded-lg px-3 py-2 hover:bg-gray-50 ${
                  pathname === l.href ? "font-medium" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            {/* Kurumsal başlığı */}
            <div className="mt-2 px-3 py-2 text-xs uppercase text-gray-500">Kurumsal</div>
            {corporateMenu.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className={`block rounded-lg px-3 py-2 hover:bg-gray-50 ${
                  pathname === m.href ? "font-medium" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {m.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="block rounded-lg px-3 py-2 bg-black text-white text-center font-medium hover:opacity-90 mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Danışman Ol
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}