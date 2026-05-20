import type { Metadata } from "next";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Metallhandel — Rensona Metall",
  description: "Vi köper koppar, aluminium, järnskrot, mässing och rostfritt. Dagsaktuella LME-priser, direkt betalning, ingen mellanhanda.",
};

const METALS = [
  { name: "Koppar", grade: "1A blankt · Kabelkoppar · Rörkoppar", price: "68–74 kr/kg", desc: "Kablar, rör, plåt och ledning. Bäst betalt för rent, isolationsfritt material." },
  { name: "Aluminium", grade: "Profil · Gjutgods · Folier", price: "14–18 kr/kg", desc: "Fönsterprofiler, gjutgods, fordonsdelar och aluminiumplåt. Priset varierar med legering." },
  { name: "Järnskrot", grade: "Blandat järn · Konstruktionsstål", price: "1,80–2,40 kr/kg", desc: "Stålbalkar, gjutjärn, maskiner och tyngre konstruktioner. Volymbonus vid större leveranser." },
  { name: "Mässing", grade: "Blankt · Blandad mässing", price: "38–44 kr/kg", desc: "Kranar, armaturer, svarvstickor och ventiler. Sorterat material ger högre pris." },
  { name: "Rostfritt", grade: "304 · 316 · Blandat", price: "12–16 kr/kg", desc: "Serveringsutrustning, tankar, balustrad och rör. Pris beror på nickelhalt." },
  { name: "Bly", grade: "Rent bly · Batteribly", price: "14–17 kr/kg", desc: "Plomber, kabelmantel och ackumulatorbly. Hanteras enligt miljölagstiftning." },
];

const SERVICES = [
  { title: "Privatpersoner", desc: "Kör in ditt skrotmetall till oss på Magasinsgatan 2, måndag–fredag. Vägning och betalning direkt på plats." },
  { title: "Företag & industri", desc: "Vi hämtar större volymer direkt från er anläggning. Avtal, transportdokumentation och vägning ingår.", cta: true },
  { title: "Rivning & sanering", desc: "Samarbetar ni med rivningsprojekt? Vi hanterar klassificering, transport och återvinning av allt metallhaltigt material.", cta: true },
];

export default function MetallPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-dark)", color: "var(--color-white)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: "var(--color-cu-b)" }} />
            <span className="font-mono text-[8.5px] tracking-[1.8px] uppercase" style={{ color: "var(--color-cu-b)" }}>Metallhandel</span>
          </div>
          <h1 className="font-display text-[48px] md:text-[72px] lg:text-[88px] leading-[0.9] tracking-wide uppercase mb-4">
            Vi betalar marknadens<br />
            <span style={{ color: "var(--color-cu)" }}>bästa metallpris.</span>
          </h1>
          <p className="font-serif-it text-xl md:text-2xl max-w-2xl mb-10" style={{ color: "rgba(250,247,243,0.6)" }}>
            Prissatt dagligen mot London Metal Exchange. Inga mellanhänder, inga schabloner.
          </p>
          <a href="#prislista" className="btn-cu" style={{ display: "inline-block" }}>
            Se dagens priser →
          </a>
        </div>
      </section>

      {/* Price grid */}
      <section id="prislista" className="py-16 md:py-24 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: "var(--color-cu)" }} />
            <span className="font-mono text-[8.5px] tracking-[1.8px] uppercase" style={{ color: "var(--color-cu)" }}>Dagsaktuella priser</span>
          </div>
          <h2 className="font-display text-[40px] md:text-[56px] leading-[0.92] tracking-wide uppercase mb-3" style={{ color: "var(--color-txt)" }}>
            Inköpspriser.
          </h2>
          <p className="font-serif-it text-lg mb-10" style={{ color: "var(--color-txt2)" }}>
            Priserna uppdateras vardagar. Ring för aktuell notering vid större volymer.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {METALS.map((m) => (
              <div key={m.name} className="rounded-xl p-6" style={{ background: "var(--color-white)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="font-mono text-[8px] tracking-[1.2px] uppercase mb-3" style={{ color: "var(--color-txt2)" }}>{m.grade}</div>
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <h3 className="font-display text-2xl tracking-wider uppercase" style={{ color: "var(--color-txt)" }}>{m.name}</h3>
                  <span className="font-mono text-sm font-bold" style={{ color: "var(--color-cu)", whiteSpace: "nowrap" }}>{m.price}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-txt2)" }}>{m.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs italic" style={{ color: "var(--color-txt2)" }}>
            * Priser exkl. moms. Slutpris fastställs vid vägning. Gäller fr.o.m. veckans LME-notering.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-white)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: "var(--color-cu)" }} />
            <span className="font-mono text-[8.5px] tracking-[1.8px] uppercase" style={{ color: "var(--color-cu)" }}>Hur det fungerar</span>
          </div>
          <h2 className="font-display text-[40px] md:text-[56px] leading-[0.92] tracking-wide uppercase mb-10" style={{ color: "var(--color-txt)" }}>
            Vi kör för alla.
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-2xl p-7 flex flex-col" style={{ background: "var(--color-bg)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="font-mono text-[8.5px] tracking-[1.3px] uppercase mb-2" style={{ color: "var(--color-cu)" }}>★</div>
                <h3 className="font-display text-2xl tracking-wider uppercase mb-3" style={{ color: "var(--color-txt)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--color-txt2)" }}>{s.desc}</p>
                {s.cta && (
                  <a href="/foretag" className="btn-cu" style={{ alignSelf: "flex-start" }}>Kontakta oss →</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + hours */}
      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-dark)", color: "var(--color-white)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px" style={{ background: "var(--color-cu-b)" }} />
              <span className="font-mono text-[8.5px] tracking-[1.8px] uppercase" style={{ color: "var(--color-cu-b)" }}>Öppettider</span>
            </div>
            <h2 className="font-display text-[36px] md:text-[48px] leading-[0.92] tracking-wide uppercase mb-6">
              Välkommen till anläggningen.
            </h2>
            <div className="space-y-0 mb-6">
              {[["Måndag – Torsdag", "07:00 – 16:30"], ["Fredag", "07:00 – 15:00"], ["Lördag – Söndag", "Stängt"]].map(([day, time]) => (
                <div key={day} className="flex justify-between py-3" style={{ borderBottom: "1px solid rgba(250,247,243,0.07)" }}>
                  <span className="text-sm" style={{ color: "rgba(250,247,243,0.55)" }}>{day}</span>
                  <span className="font-mono text-sm" style={{ color: "var(--color-cu)" }}>{time}</span>
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: "rgba(250,247,243,0.4)" }}>{COMPANY.address}</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-serif-it text-xl md:text-2xl" style={{ color: "rgba(250,247,243,0.7)" }}>
              Osäker på vilket pris du kan förvänta dig? Ring oss — vi svarar snabbt och ärligt.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${COMPANY.phone.replace(/[^0-9]/g, "")}`} className="btn-cu">Ring {COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} className="btn-ghost">{COMPANY.email}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
