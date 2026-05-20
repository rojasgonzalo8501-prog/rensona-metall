import type { Metadata } from "next";
import { COMPANY } from "@/lib/utils";
import { SkrotaForm } from "./SkrotaForm";

export const metadata: Metadata = {
  title: "Boka bilskrotning — Rensona Metall",
  description: "Boka gratis upphämtning av din bil. Auktoriserad bilskrotning i Enköping. Slå upp ditt regnummer och få ett estimerat erbjudande direkt.",
};

const STEPS = [
  { n: "1", title: "Ange regnummer", desc: "Slå upp ditt fordon och se ett estimerat erbjudande direkt." },
  { n: "2", title: "Fyll i kontaktinfo", desc: "Namn, telefon och adress där bilen står." },
  { n: "3", title: "Vi ringer tillbaka", desc: "Bekräftelse och hämtningstid inom 2 timmar på kontorstid." },
  { n: "4", title: "Betalt vid hämtning", desc: "Swish, bankgiro eller kontant — du väljer." },
];

const TRUST = [
  { title: "Gratis hämtning", desc: "Ingen kostnad för transport" },
  { title: "Betalt direkt", desc: "Swish vid upphämtning" },
  { title: "Vi sköter pappren", desc: "Avregistrering ingår" },
  { title: "98% återvinns", desc: "EU ELV-certifierat" },
];

export default function SkrotaPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-dark)", color: "var(--color-white)" }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: "var(--color-cu-b)" }} />
            <span className="font-mono text-[8.5px] tracking-[1.8px] uppercase" style={{ color: "var(--color-cu-b)" }}>Bilskrotning</span>
            <div className="w-6 h-px" style={{ background: "var(--color-cu-b)" }} />
          </div>
          <h1 className="font-display text-[48px] md:text-[72px] lg:text-[88px] leading-[0.9] tracking-wide uppercase mb-4">
            Boka gratis hämtning.
          </h1>
          <p className="font-serif-it text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: "rgba(250,247,243,0.6)" }}>
            Vi hämtar din bil utan kostnad i hela Mälardalen.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-10 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-bg2)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold"
                  style={{ background: "var(--color-cu)", color: "var(--color-dark)" }}>
                  {n}
                </div>
                <div>
                  <div className="font-medium text-sm mb-0.5" style={{ color: "var(--color-txt)" }}>{title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--color-txt2)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,320px] gap-12 items-start">
            {/* Form */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px" style={{ background: "var(--color-cu)" }} />
                <span className="font-mono text-[8.5px] tracking-[1.8px] uppercase" style={{ color: "var(--color-cu)" }}>Förfrågan</span>
              </div>
              <h2 className="font-display text-[36px] md:text-[48px] leading-[0.92] tracking-wide uppercase mb-3" style={{ color: "var(--color-txt)" }}>
                Skrotningsförfrågan.
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--color-txt2)" }}>
                Fyll i formuläret nedan så ringer vi upp med bekräftelse och tid.
              </p>
              <SkrotaForm />
            </div>

            {/* Sidebar */}
            <div className="hidden lg:flex flex-col gap-4 sticky top-24">
              {/* Phone */}
              <div className="rounded-xl p-5" style={{ background: "var(--color-white)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="font-mono text-[8.5px] tracking-[1.3px] uppercase mb-2" style={{ color: "var(--color-txt2)" }}>Ring direkt</div>
                <a href={`tel:${COMPANY.phone.replace(/[^0-9]/g, "")}`}
                  className="font-display text-3xl tracking-wider uppercase block mb-1 hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-cu)" }}>
                  {COMPANY.phone}
                </a>
                <div className="font-mono text-[8px] tracking-[1px] uppercase" style={{ color: "var(--color-txt2)" }}>
                  Mån–Tors 07:00–16:30 · Fre 07:00–15:00
                </div>
              </div>

              {/* Trust */}
              <div className="rounded-xl p-5" style={{ background: "var(--color-white)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="space-y-3">
                  {TRUST.map((t) => (
                    <div key={t.title} className="flex items-start gap-3">
                      <span className="mt-0.5" style={{ color: "var(--color-cu)" }}>✓</span>
                      <div>
                        <div className="font-medium text-sm" style={{ color: "var(--color-txt)" }}>{t.title}</div>
                        <div className="text-xs" style={{ color: "var(--color-txt2)" }}>{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="rounded-xl p-5" style={{ background: "var(--color-white)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="font-mono text-[8.5px] tracking-[1.3px] uppercase mb-2" style={{ color: "var(--color-txt2)" }}>Besöksadress</div>
                <div className="text-sm font-medium mb-0.5" style={{ color: "var(--color-txt)" }}>Magasinsgatan 2</div>
                <div className="text-sm" style={{ color: "var(--color-txt2)" }}>749 35 Enköping</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
