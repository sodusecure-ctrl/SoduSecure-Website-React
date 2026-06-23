import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "TISAX Penetrationstest – Informationssicherheit Automotive | SODU Secure",
  description:
    "TISAX (VDA-ISA) ist der Informationssicherheits-Standard der Automobilindustrie. Wir bereiten Sie mit Gap-Analyse und Penetrationstests auf das TISAX-Assessment vor.",
  alternates: { canonical: "/tisax" },
};

const data: RegulationContent = {
  slug: "tisax",
  badgeIcon: "factory",
  badgeText: "TISAX · VDA-ISA · ENX Association",
  title: "TISAX",
  titleAccent: "Informationssicherheit für die Automobilindustrie",
  heroIntro:
    "TISAX (Trusted Information Security Assessment Exchange) ist das Prüf- und Austauschverfahren für Informationssicherheit in der Automobilindustrie. Wir bereiten Sie mit Gap-Analyse und technischen Penetrationstests gezielt auf Ihr TISAX-Assessment vor.",
  heroPrimaryCta: "Kostenlose TISAX-Erstberatung",
  whatIs: {
    title: "Was ist TISAX?",
    paragraphs: [
      "TISAX steht für „Trusted Information Security Assessment Exchange\" und ist das branchenweite Verfahren, mit dem Unternehmen der Automobilindustrie ihren Informationssicherheits-Reifegrad bewerten und die Ergebnisse untereinander austauschen. Inhaltliche Grundlage ist der Prüfkatalog VDA ISA (Information Security Assessment), der sich an der ISO/IEC 27001 orientiert.",
      "Betrieben wird TISAX von der ENX Association im Auftrag des Verbands der Automobilindustrie (VDA). Das eigentliche Assessment führen akkreditierte Prüfdienstleister durch; die Ergebnisse (TISAX-Label) werden über die ENX-Plattform geteilt und sind in der Regel drei Jahre gültig. So muss ein Zulieferer seine Sicherheit nicht gegenüber jedem OEM einzeln nachweisen.",
    ],
  },
  facts: [
    { label: "Grundlage", value: "VDA ISA (ISO 27001)" },
    { label: "Betreiber", value: "ENX Association" },
    { label: "Label-Gültigkeit", value: "3 Jahre" },
  ],
  penalties: {
    title: "Was passiert ohne TISAX-Label?",
    intro:
      "TISAX ist kein Gesetz, sondern eine vertragliche Marktanforderung: Viele OEMs und Tier-1-Zulieferer setzen ein gültiges TISAX-Label voraus, bevor sie sensible Daten oder Entwicklungsaufträge vergeben.",
    items: [
      {
        value: "Kein Marktzugang",
        label: "Auftragsvoraussetzung fehlt",
        desc: "Ohne gültiges TISAX-Label werden Sie bei vielen Automobilherstellern und großen Zulieferern gar nicht erst als Lieferant zugelassen.",
      },
      {
        value: "Verlorene Aufträge",
        label: "Projekte gehen an Wettbewerber",
        desc: "Gerade bei prototypen- oder datenintensiven Projekten ist das Label faktisch Pflicht – fehlt es, gewinnt der Wettbewerb mit Nachweis.",
      },
      {
        value: "Sicherheitsrisiko",
        label: "Unentdeckte Schwachstellen",
        desc: "Ohne technische Verifikation Ihrer Schutzmaßnahmen bleiben Lücken unentdeckt – ein reales Risiko für Entwicklungsdaten und Prototypen.",
      },
    ],
  },
  obligations: {
    title: "Welche Anforderungen stellt",
    accent: "TISAX?",
    intro:
      "TISAX prüft Ihre Informationssicherheit anhand des VDA-ISA-Katalogs. Der geforderte Prüftiefe-Grad richtet sich nach dem Assessment-Level (AL1–AL3): Je höher der Schutzbedarf der verarbeiteten Daten, desto tiefer die Prüfung – inklusive Vor-Ort-Audits.",
    points: [
      "Selbstbewertung (Self-Assessment) entlang des VDA-ISA-Katalogs",
      "Festlegung des passenden Assessment-Levels (AL2/AL3) je nach Schutzbedarf",
      "Technische und organisatorische Maßnahmen nachweisbar umsetzen",
      "Prüfung durch einen akkreditierten TISAX-Prüfdienstleister, Label-Veröffentlichung über ENX",
    ],
    sidebarTitle: "Der Weg zum TISAX-Label",
    steps: [
      { label: "Scope & Ziel festlegen", sub: "Standorte, Daten und Assessment-Level definieren" },
      { label: "Self-Assessment", sub: "Reifegrad entlang VDA ISA bewerten" },
      { label: "Gap-Behebung", sub: "Lücken schließen – inkl. technischer Verifikation per Pentest" },
      { label: "Akkreditiertes Audit", sub: "Prüfung durch zugelassenen TISAX-Dienstleister" },
      { label: "Label über ENX", sub: "Ergebnis teilen – gültig für 3 Jahre" },
    ],
  },
  servicesTitle: "Wie wir Sie auf TISAX vorbereiten",
  servicesIntro:
    "Wir sind kein TISAX-Prüfdienstleister – wir bringen Sie technisch und organisatorisch in den prüffähigen Zustand und weisen die Wirksamkeit Ihrer Maßnahmen nach.",
  services: [
    { icon: "clipboard", title: "Gap-Analyse VDA ISA", desc: "Abgleich Ihres Ist-Zustands mit dem VDA-ISA-Katalog und priorisierte Maßnahmenliste bis zur Audit-Reife." },
    { icon: "target", title: "Penetrationstests", desc: "Technische Verifikation Ihrer Schutzmaßnahmen – ein anerkanntes Mittel, um die Wirksamkeit für das Assessment zu belegen." },
    { icon: "lock", title: "Härtung & Remediation", desc: "Konkrete Umsetzungsbegleitung bei der Behebung gefundener Schwachstellen und Konfigurationsmängel." },
    { icon: "shield", title: "Prototypen- & Datenschutz", desc: "Unterstützung bei höheren Schutzbedarfen (z. B. Prototypenschutz), wie sie bei AL3 gefordert werden." },
  ],
  whoForTitle: "Wer braucht TISAX?",
  whoForIntro:
    "TISAX richtet sich an alle Unternehmen, die für die Automobilindustrie arbeiten und dabei schützenswerte Informationen verarbeiten.",
  whoFor: [
    { icon: "factory", title: "Automobilzulieferer", desc: "Tier-1- bis Tier-n-Zulieferer, die Daten von OEMs verarbeiten oder Komponenten entwickeln." },
    { icon: "briefcase", title: "Entwicklungsdienstleister", desc: "Engineering- und Software-Dienstleister mit Zugriff auf Entwicklungs- oder Prototypendaten." },
    { icon: "server", title: "IT- & Cloud-Dienstleister", desc: "Anbieter, die IT-Services oder Datenverarbeitung für die Automobilbranche erbringen." },
    { icon: "building", title: "Lieferanten mit OEM-Daten", desc: "Jedes Unternehmen, von dem ein Hersteller ein gültiges TISAX-Label verlangt." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir klären Standorte, Datenarten und das passende Assessment-Level.", icon: "message" },
    { step: "02", title: "Gap-Analyse", desc: "Bewertung Ihres Reifegrads entlang des VDA-ISA-Katalogs.", icon: "fileSearch" },
    { step: "03", title: "Pentest & Härtung", desc: "Technische Verifikation der Maßnahmen und Behebung der Findings.", icon: "target" },
    { step: "04", title: "Audit-Vorbereitung", desc: "Wir machen Ihre Dokumentation und Technik prüffähig für den akkreditierten Prüfer.", icon: "clipboard" },
    { step: "05", title: "Re-Test & Nachweis", desc: "Nachtest der behobenen Schwachstellen als belastbarer Wirksamkeitsnachweis.", icon: "award" },
  ],
  faqs: [
    { q: "Was bedeutet TISAX?", a: "TISAX steht für „Trusted Information Security Assessment Exchange\". Es ist das Verfahren der Automobilindustrie zur Bewertung und zum Austausch von Informationssicherheits-Nachweisen, inhaltlich basierend auf dem VDA-ISA-Katalog und betrieben von der ENX Association." },
    { q: "Ist ein Penetrationstest für TISAX Pflicht?", a: "TISAX selbst ist ein Assessment-Verfahren und schreibt keinen einzelnen Pentest namentlich vor. Penetrationstests sind aber ein anerkanntes und praxisübliches Mittel, um die technische Wirksamkeit Ihrer Sicherheitsmaßnahmen für das Assessment nachzuweisen – besonders bei höherem Schutzbedarf (AL3)." },
    { q: "Was sind die Assessment-Level AL1, AL2 und AL3?", a: "Die Assessment-Level bestimmen die Prüftiefe nach Schutzbedarf: AL1 ist eine reine Selbstauskunft, AL2 umfasst eine Prüfung durch einen Dienstleister (meist per Plausibilitätsprüfung/Remote), AL3 beinhaltet eine tiefergehende Vor-Ort-Prüfung – typisch für hohen Schutzbedarf und Prototypendaten." },
    { q: "Wie lange ist ein TISAX-Label gültig?", a: "Ein TISAX-Label ist in der Regel drei Jahre gültig. Danach ist ein erneutes Assessment erforderlich, um den Nachweis aktuell zu halten." },
    { q: "Sind Sie ein TISAX-Prüfdienstleister?", a: "Nein. Das offizielle TISAX-Assessment darf nur von akkreditierten Prüfdienstleistern durchgeführt werden. Wir bereiten Sie darauf vor: Gap-Analyse, Penetrationstests zur Wirksamkeitsprüfung, Härtung und Audit-Vorbereitung." },
  ],
  related: [
    { href: "/iso-27001", label: "ISO 27001", desc: "Der internationale Standard, auf dem der VDA-ISA-Katalog aufbaut." },
    { href: "/nis2", label: "NIS2", desc: "EU-Cybersicherheitspflichten für wesentliche und wichtige Einrichtungen." },
    { href: "/penetration-testing", label: "Penetrationstest", desc: "Technische Angriffssimulation zur Verifikation Ihrer Schutzmaßnahmen." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
