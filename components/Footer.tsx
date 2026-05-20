import Link from "next/link";

const CERTS = [
  { title: "Länsstyrelsen", sub: "SFS 1997:185" },
  { title: "Naturvårdsverket", sub: "ELV-hantering" },
  { title: "Transportstyrelsen", sub: "Digital avregistrering" },
  { title: "EU ELV-direktiv", sub: "2000/53/EG" },
];

const SERVICES = [
  { label: "Bilskrotning", href: "/skrota" },
  { label: "Metallhandel", href: "/metall" },
  { label: "Företagstjänst", href: "/foretag" },
  { label: "Hur det funkar", href: "/#how" },
  { label: "Prislista", href: "/#pris" },
];

const LEGAL = [
  { label: "Integritetspolicy", href: "/integritetspolicy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Villkor", href: "/villkor" },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--color-dark2, #1a1008)", borderTop: "1px solid rgba(200,121,65,0.15)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="font-display mb-2" style={{ fontSize: "1.5rem", letterSpacing: "0.04em" }}>
            <span style={{ color: "var(--color-cu)" }}>RENSONA </span>
            <span style={{ color: "var(--color-white)" }}>METALL</span>
          </div>
          <p className="font-serif-it mb-4" style={{ color: "var(--color-cu)", fontSize: "0.95rem" }}>
            Vi skrotar smart.
          </p>
          <p className="font-body" style={{ color: "rgba(250,247,243,0.45)", fontSize: "0.8rem", lineHeight: 1.7 }}>
            Mercaskroten i Sverige AB<br />
            Org.nr 556634-0815<br />
            Auktoriserad bilskrotare sedan 1984
          </p>
        </div>

        {/* Tjänster */}
        <nav aria-label="Tjänster">
          <h4 className="font-mono mb-4" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(250,247,243,0.4)" }}>
            Tjänster
          </h4>
          {SERVICES.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body block mb-2 transition-colors"
              style={{ color: "rgba(250,247,243,0.6)", fontSize: "0.9rem", textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Kontakt */}
        <div>
          <h4 className="font-mono mb-4" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(250,247,243,0.4)" }}>
            Kontakt
          </h4>
          <address className="font-body" style={{ fontStyle: "normal", color: "rgba(250,247,243,0.6)", fontSize: "0.9rem", lineHeight: 1.8 }}>
            Magasinsgatan 2, 749 35 Enköping<br />
            <a href="tel:017121002" style={{ color: "var(--color-cu)", textDecoration: "none" }}>0171-210 02</a><br />
            <a href="mailto:info@rensonametall.se" style={{ color: "var(--color-cu)", textDecoration: "none" }}>info@rensonametall.se</a><br />
            <span style={{ color: "rgba(250,247,243,0.4)", fontSize: "0.8rem" }}>Mån–Fre 07:00–16:30</span>
          </address>
        </div>

        {/* Certifikat */}
        <div>
          <h4 className="font-mono mb-4" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(250,247,243,0.4)" }}>
            Certifikat
          </h4>
          {CERTS.map((c) => (
            <div key={c.title} className="font-body mb-1.5" style={{ color: "rgba(250,247,243,0.6)", fontSize: "0.85rem" }}>
              <span aria-hidden style={{ color: "var(--color-cu)", marginRight: "0.5rem" }}>✓</span>
              {c.title}
              <span className="font-mono" style={{ fontSize: "0.65rem", color: "rgba(250,247,243,0.35)", marginLeft: "0.4rem" }}>{c.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(250,247,243,0.3)", margin: 0 }}>
          © 2026 Mercaskroten i Sverige AB · Org.nr 556634-0815
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {LEGAL.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono transition-colors"
              style={{ fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(250,247,243,0.3)", textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
