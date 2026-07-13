import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "Penetrationstest Deutschland – zertifizierte Pentester",
  description:
    "Penetrationstest deutschlandweit: OSCP-zertifizierte Pentester, DSGVO-konform, Berichte auf Deutsch. Web, API, Netzwerk, Active Directory & Cloud – Festpreis ab 1.499 €.",
  alternates: { canonical: "/penetrationstest-deutschland" },
};

const data: RegulationContent = {
  slug: "penetrationstest-deutschland",
  badgeIcon: "shield",
  badgeText: "Penetrationstest · Deutschlandweit",
  title: "Penetrationstest Deutschland",
  titleAccent: "zertifizierte Pentester, bundesweit",
  heroIntro:
    "Wir führen professionelle Penetrationstests für Unternehmen in ganz Deutschland durch – remote und vor Ort. OSCP-zertifizierte Pentester, DSGVO-konforme Durchführung und prüffähige Berichte auf Deutsch, mit transparenten Festpreisen.",
  heroPrimaryCta: "Kostenlose Erstberatung",
  whatIs: {
    title: "Was ist ein Penetrationstest?",
    paragraphs: [
      "Ein Penetrationstest ist eine kontrollierte, manuelle Angriffssimulation auf Ihre IT-Systeme. Zertifizierte Sicherheitsexperten gehen wie echte Angreifer vor, um ausnutzbare Schwachstellen aufzudecken – bevor es jemand anderes tut. Im Unterschied zu einem reinen automatisierten Scan werden Schwachstellen tatsächlich verifiziert und mit Proof-of-Concept belegt.",
      "In Deutschland gewinnt das Thema durch regulatorische Anforderungen stark an Bedeutung: NIS2, ISO 27001, DORA und die DSGVO erwarten den Nachweis wirksamer technischer Sicherheitsmaßnahmen. Ein regelmäßiger Penetrationstest liefert genau diesen Nachweis – und reduziert das Risiko teurer Sicherheitsvorfälle.",
    ],
  },
  facts: [
    { label: "Abdeckung", value: "Deutschlandweit" },
    { label: "Berichte", value: "Deutsch & Englisch" },
    { label: "Standard", value: "OSCP-zertifiziert" },
  ],
  obligations: {
    title: "Warum ein Penetrationstest in",
    accent: "Deutschland?",
    intro:
      "Ob aus regulatorischer Pflicht oder zur eigenen Absicherung – ein Penetrationstest schafft Klarheit über die reale Angreifbarkeit Ihrer Systeme.",
    points: [
      "Nachweis technischer Maßnahmen für NIS2, ISO 27001, DORA und DSGVO",
      "Manuelle Verifikation statt reiner Scanner-Treffer – belegt mit Proof-of-Concept",
      "Deutschsprachige, prüffähige Berichte inkl. Maßnahmenkatalog",
      "DSGVO-konforme Durchführung – Datenverarbeitung in Deutschland",
    ],
    sidebarTitle: "Ihr Pentest-Projekt",
    steps: [
      { label: "Scoping", sub: "Ziele und Umfang gemeinsam festlegen" },
      { label: "Durchführung", sub: "Manueller Test durch zertifizierte Pentester" },
      { label: "Bericht", sub: "Priorisierte Findings auf Deutsch" },
      { label: "Abschlussgespräch", sub: "Ergebnisse persönlich besprechen" },
      { label: "Re-Test", sub: "Behebung kostenlos nachprüfen" },
    ],
  },
  servicesTitle: "Unsere Penetrationstests im Überblick",
  servicesIntro:
    "Wir decken alle gängigen Scopes ab – einzeln oder kombiniert als Full-Scope-Engagement.",
  services: [
    { icon: "globe", title: "Web & API", desc: "Web-Applikationen und Schnittstellen nach OWASP – manuell getestet, ab 1.499 €." },
    { icon: "network", title: "Netzwerk & Infrastruktur", desc: "Interne und externe Netzwerke, Server und Dienste im Detail geprüft." },
    { icon: "server", title: "Active Directory", desc: "Angriffspfade in der Windows-Domäne bis zur Domänenübernahme." },
    { icon: "search", title: "Cloud", desc: "AWS- und Cloud-Umgebungen auf Fehlkonfigurationen und Angriffspfade prüfen." },
  ],
  whoForTitle: "Für wen wir arbeiten",
  whoForIntro:
    "Vom Start-up bis zum Konzern – wir unterstützen Unternehmen jeder Größe in ganz Deutschland.",
  whoFor: [
    { icon: "building", title: "KMU & Mittelstand", desc: "Bezahlbare, scoped Pentest-Pakete für Unternehmen mit begrenzten IT-Ressourcen." },
    { icon: "factory", title: "Konzerne & Enterprise", desc: "Umfangreiche Engagements inkl. Full-Scope und Red-Team-Komponenten." },
    { icon: "heart", title: "Gesundheit & Finanzen", desc: "Regulierte Branchen mit hohen Anforderungen an Datenschutz und Compliance." },
    { icon: "globe", title: "SaaS & E-Commerce", desc: "Digitale Geschäftsmodelle, deren Sicherheit geschäftskritisch ist." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir bestimmen den passenden Umfang für Ihr Unternehmen.", icon: "message" },
    { step: "02", title: "Durchführung", desc: "Manueller Penetrationstest durch OSCP-zertifizierte Experten – remote oder vor Ort.", icon: "target" },
    { step: "03", title: "Bericht", desc: "Priorisierte, deutschsprachige Dokumentation mit Proof-of-Concepts.", icon: "clipboard" },
    { step: "04", title: "Abschlussgespräch", desc: "Persönliche Besprechung der Ergebnisse und nächsten Schritte.", icon: "message" },
    { step: "05", title: "Re-Test", desc: "Kostenloser Nachtest der behobenen Schwachstellen.", icon: "award" },
  ],
  faqs: [
    { q: "Was kostet ein Penetrationstest in Deutschland?", a: "Ein fokussierter Test (z. B. eine Web-App) startet bei Sodu Secure ab 1.499 €. Ein vollständiger manueller Penetrationstest liegt je nach Umfang typischerweise ab 7.000 €. Den genauen Festpreis ermitteln wir nach einem kostenlosen Scoping-Gespräch – nutzen Sie auch unseren Pentest-Konfigurator." },
    { q: "Führt ihr Pentests remote oder vor Ort durch?", a: "Beides. Die meisten Tests führen wir effizient remote durch. Für interne Netzwerke, Active Directory oder auf Wunsch bieten wir auch Tests vor Ort bei Ihnen an – deutschlandweit." },
    { q: "Sind die Penetrationstests DSGVO-konform?", a: "Ja. Wir führen Penetrationstests datenschutzkonform durch, regeln die Auftragsverarbeitung vertraglich und verarbeiten Daten in Deutschland. Auf Wunsch unterstützen wir Sie auch bei der Dokumentation für Ihre Compliance." },
    { q: "Welche Qualifikationen haben eure Pentester?", a: "Unsere Pentester sind unter anderem OSCP-zertifiziert und arbeiten zu 100 % manuell – kein reines Tool-Scanning. Jeder Befund wird mit einem Proof-of-Concept belegt und priorisiert." },
    { q: "In welchen Städten seid ihr aktiv?", a: "Wir arbeiten deutschlandweit – von Berlin über Hamburg, München, Köln und Frankfurt bis in den ländlichen Raum. Da wir überwiegend remote testen, ist der Standort für die meisten Projekte kein begrenzender Faktor." },
  ],
  related: [
    { href: "/pentest-berlin", label: "Pentest Berlin", desc: "Unser regionaler Schwerpunkt mit lokalem Bezug." },
    { href: "/pentest-kosten", label: "Pentest Kosten", desc: "Transparente Preisübersicht für Penetrationstests." },
    { href: "/pentest-konfigurator", label: "Pentest-Konfigurator", desc: "Stellen Sie Ihren Test zusammen und sehen Sie sofort eine Preisspanne." },
  ],
  relatedHeading: "Mehr zum Penetrationstest",
  relatedSubtext: "Vertiefen Sie einzelne Themen oder berechnen Sie direkt Ihren individuellen Richtpreis.",
  ctaTitle: "Penetrationstest in ganz Deutschland",
  ctaText: "Kostenlose Erstberatung – wir analysieren Ihre Ausgangslage und erstellen ein transparentes Festpreisangebot.",
};

export default function Page() {
  return <RegulationPage data={data} />;
}
