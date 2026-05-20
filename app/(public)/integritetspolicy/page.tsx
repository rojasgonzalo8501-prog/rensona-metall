import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Hur Rensona Metall (Mercaskroten i Sverige AB) hanterar dina personuppgifter enligt GDPR.",
};

export default function IntegritetspolicyPage() {
  return (
    <>
      <section className="py-20 md:py-28 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-dark)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: "var(--color-cu-b)" }} />
            <span className="font-mono text-[8.5px] tracking-[1.8px] uppercase" style={{ color: "var(--color-cu-b)" }}>Legal</span>
          </div>
          <h1 className="font-display text-[48px] md:text-[64px] leading-[0.92] tracking-wide uppercase mb-3" style={{ color: "var(--color-white)" }}>
            Integritetspolicy.
          </h1>
          <p className="font-body text-sm" style={{ color: "rgba(250,247,243,0.4)" }}>
            Senast uppdaterad: maj 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-14" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--color-txt)",
              lineHeight: 1.8,
            }}
          >
            <Section title="1. Personuppgiftsansvarig">
              <p>
                Mercaskroten i Sverige AB, organisationsnummer <strong>556634-0815</strong>, Magasinsgatan 2, 749 35 Enköping,
                är personuppgiftsansvarig för den behandling av personuppgifter som beskrivs i denna policy.
              </p>
              <p>
                Kontakt: <a href="mailto:info@rensonametall.se" style={{ color: "var(--color-cu)" }}>info@rensonametall.se</a> · 0171-210 02
              </p>
            </Section>

            <Section title="2. Vilka uppgifter samlar vi in?">
              <p>Vi samlar in följande uppgifter när du gör en bokningsförfrågan via vår webbplats:</p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li>Namn</li>
                <li>Telefonnummer</li>
                <li>E-postadress (valfritt)</li>
                <li>Adress där fordonet befinner sig</li>
                <li>Fordonets registreringsnummer, märke, modell och årsmodell</li>
                <li>Valt betalningssätt</li>
              </ul>
            </Section>

            <Section title="3. Varför behandlar vi dina uppgifter?">
              <p>Uppgifterna används uteslutande för att:</p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li>Hantera och bekräfta din bokningsförfrågan</li>
                <li>Kontakta dig för att boka tid för upphämtning</li>
                <li>Utfärda skrotningsintyg och genomföra avregistrering hos Transportstyrelsen</li>
              </ul>
              <p>
                Rättslig grund: <strong>Fullgörande av avtal</strong> (artikel 6.1 b GDPR) och i förekommande fall
                <strong> rättslig förpliktelse</strong> (artikel 6.1 c GDPR) avseende skrotningsdokumentation.
              </p>
            </Section>

            <Section title="4. Hur länge sparar vi uppgifterna?">
              <p>
                Kontaktuppgifter och bokningsdetaljer sparas i maximalt 24 månader efter avslutat uppdrag.
                Skrotningsintyg och transportdokumentation sparas i 7 år i enlighet med bokföringslagen.
              </p>
            </Section>

            <Section title="5. Delning med tredje part">
              <p>Vi delar dina uppgifter med:</p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Transportstyrelsen</strong> — för avregistrering av skrotat fordon (rättslig förpliktelse)</li>
                <li><strong>Resend Inc.</strong> — e-posttjänst för intern notifiering om bokningar (personuppgiftsbiträde)</li>
              </ul>
              <p>Vi säljer aldrig dina uppgifter till tredje part.</p>
            </Section>

            <Section title="6. Dina rättigheter">
              <p>Enligt GDPR har du rätt att:</p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Begära tillgång</strong> till de uppgifter vi har om dig</li>
                <li><strong>Begära rättelse</strong> av felaktiga uppgifter</li>
                <li><strong>Begära radering</strong> ("rätten att bli bortglömd") om det inte finns rättslig grund att behålla uppgifterna</li>
                <li><strong>Invända</strong> mot behandling</li>
                <li><strong>Inge klagomål</strong> till Integritetsskyddsmyndigheten (IMY), imy.se</li>
              </ul>
              <p>
                Kontakta oss på <a href="mailto:info@rensonametall.se" style={{ color: "var(--color-cu)" }}>info@rensonametall.se</a> för att utöva dina rättigheter.
              </p>
            </Section>

            <Section title="7. Säkerhet">
              <p>
                Vi vidtar tekniska och organisatoriska åtgärder för att skydda dina personuppgifter mot obehörig åtkomst,
                förlust och förstörelse. All kommunikation till och från webbplatsen sker krypterat via HTTPS.
              </p>
            </Section>

            <Section title="8. Ändringar">
              <p>
                Vi kan komma att uppdatera denna policy. Den senaste versionen finns alltid tillgänglig på rensonametall.se/integritetspolicy.
                Väsentliga ändringar kommuniceras via e-post till berörda registrerade.
              </p>
            </Section>
          </div>

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
            <Link href="/" className="btn-cu" style={{ fontSize: "0.72rem", padding: "0.6rem 1.2rem" }}>
              ← Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.03em", color: "var(--color-cu)", marginBottom: "0.75rem" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
