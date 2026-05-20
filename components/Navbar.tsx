"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/metall",   label: "Metallhandel" },
  { href: "/foretag",  label: "Företag" },
  { href: "/#how",     label: "Hur det funkar" },
  { href: "/#pris",    label: "Pris" },
  { href: "/om-oss",   label: "Om oss" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "backdrop-blur-md bg-[var(--color-dark)]/90 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="text-[var(--color-cu)] leading-none font-display" style={{ fontSize: "1.5rem", letterSpacing: "0.04em" }}>
              RENSONA
            </span>
            <span className="text-white/90 leading-none hidden sm:block font-display" style={{ fontSize: "1.5rem", letterSpacing: "0.04em" }}>
              METALL
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/70 hover:text-[var(--color-cu-b)] transition-colors font-mono"
                style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:017121002"
              className="hidden sm:block text-white/70 hover:text-[var(--color-cu-b)] transition-colors font-mono"
              style={{ fontSize: "0.72rem" }}
            >
              0171-210 02
            </a>
            <Link href="/skrota" className="btn-cu hidden md:inline-flex" style={{ padding: "0.5rem 1.1rem", fontSize: "0.72rem" }}>
              Boka hämtning
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label={open ? "Stäng meny" : "Öppna meny"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className="block w-6 h-px bg-white transition-all duration-200"
                style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
              />
              <span
                className="block w-6 h-px bg-white transition-all duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="block w-6 h-px bg-white transition-all duration-200"
                style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          pointerEvents: open ? "auto" : "none",
          background: open ? "rgba(15,10,6,0.96)" : "rgba(15,10,6,0)",
          backdropFilter: open ? "blur(12px)" : "blur(0px)",
        }}
        onClick={() => setOpen(false)}
      >
        <div
          className="flex flex-col items-center justify-center h-full gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-white/80 hover:text-[var(--color-cu)] transition-colors"
              style={{ fontSize: "2.2rem", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/skrota"
            className="btn-cu mt-4"
            style={{ fontSize: "0.8rem", padding: "0.75rem 2rem" }}
            onClick={() => setOpen(false)}
          >
            Boka hämtning
          </Link>
          <a
            href="tel:017121002"
            className="font-mono text-white/40 hover:text-[var(--color-cu)] transition-colors mt-2"
            style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            0171-210 02
          </a>
        </div>
      </div>
    </>
  );
}
