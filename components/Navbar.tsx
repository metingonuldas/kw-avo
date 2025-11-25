"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

/* Üstte duran linkler */
const primaryLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/offices", label: "Ofisler" },
  { href: "/projects",  label: "Projeler" },
  { href: "/contact", label: "İletişim" },
];

/* Kurumsal alt menü */
const corporateMenu = [
  { href: "/leadership", label: "Lider Ekip" },
  { href: "/scarlet", label: "Scarlet Koçluk Takımı" },
  { href: "/culture-cards", label: "Kültür Kartları" }, // ✅ yeni sayfa
  { href: "/press", label: "Basın" },
  { href: "/technology", label: "Teknoloji" },
  { href: "/media", label: "Media Kit" },
];

/* Dropdown animasyonları (desktop) */
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 30, mass: 0.6 },
  },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12 } },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCorpOpen, setMobileCorpOpen] = useState(false);
  const [corpOpen, setCorpOpen] = useState(false);
  const corpMenuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (corpMenuRef.current && !corpMenuRef.current.contains(e.target as Node)) {
        setCorpOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setCorpOpen(false);
        setMobileOpen(false);
        setMobileCorpOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/media/logos/kw-alestaviyaorsa.svg"
            alt="KWAVO"
            width={260}
            height={80}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Masaüstü menü */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {primaryLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Kurumsal */}
          <li className="relative" ref={corpMenuRef}>
            <button
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setCorpOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={corpOpen}
            >
              Kurumsal
              <svg width="10" height="10" viewBox="0 0 20 20" aria-hidden>
                <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>

            <AnimatePresence>
              {corpOpen && (
                <motion.div
                  key="corp-menu"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-black/10 bg-white shadow-lg"
                  role="menu"
                >
                  <ul className="py-2 text-sm">
                    {corporateMenu.map((m) => (
                      <li key={m.href}>
                        <Link
                          href={m.href}
                          className="block px-3 py-2 hover:bg-gray-50 rounded-md"
                          role="menuitem"
                          onClick={() => setCorpOpen(false)}
                        >
                          {m.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Sağ CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-black text-white hover:opacity-90"
        >
          Danışman Ol
        </Link>

        {/* Mobil hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 ring-1 ring-black/10"
          onClick={() => {
            const next = !mobileOpen;
            setMobileOpen(next);
            if (!next) setMobileCorpOpen(false);
          }}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobil menü */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden border-t border-black/5 bg-white overflow-hidden"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 text-sm">
              {/* Düz linkler */}
              <div className="space-y-1">
                {primaryLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* Kurumsal accordion */}
              <button
                className="mt-2 flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50"
                onClick={() => setMobileCorpOpen((v) => !v)}
                aria-expanded={mobileCorpOpen}
                aria-controls="mobile-corporate"
              >
                <span>Kurumsal</span>
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  animate={{ rotate: mobileCorpOpen ? 180 : 0 }}
                  transition={{ duration: 0.16 }}
                >
                  <path
                    d="M5 7l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </motion.svg>
              </button>

              <AnimatePresence initial={false}>
                {mobileCorpOpen && (
                  <motion.div
                    id="mobile-corporate"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-3 pr-3">
                      {corporateMenu.map((m) => (
                        <Link
                          key={m.href}
                          href={m.href}
                          className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileCorpOpen(false);
                          }}
                        >
                          {m.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA */}
              <Link
                href="/contact"
                className="mt-3 block rounded-lg px-3 py-2 bg-black text-white text-center font-medium hover:opacity-90"
                onClick={() => setMobileOpen(false)}
              >
                Danışman Ol
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}