import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "PCI DSS Penetrationstest – Pflicht nach Requirement 11.4",
  description:
    "PCI DSS verlangt regelmäßige interne und externe Penetrationstests (Requirement 11.4). Wir liefern PCI-konforme Pentests inkl. Segmentierungstest – nach v4.0.",
  alternates: { canonical: "/pci-dss-penetrationstest" },
};

const data: RegulationContent = {
  slug: "pci-dss-penetrationstest",
  sourcesIntro: [
    "PCI DSS 4.0 schreibt in Requirement 11.4 interne und externe Penetrationstests mindestens jährlich sowie nach wesentlichen Infrastruktur- oder Anwendungsänderungen vor – inklusive Tests der Netzwerk-Segmentierung."
  ],
  sources: [
    {
      "label": "PCI Security Standards Council",
      "url": "https://www.pcisecuritystandards.org/"
    },
    {
      "label": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/"
    }
  ],
  badgeIcon: "banknote",
  badgeText: "PCI DSS v4.0 · Requirement 11.4",
  title: "PCI DSS Penetrationstest",
  titleAccent: "Pflicht nach Requirement 11.4",
  heroIntro:
    "Der PCI DSS (Payment Card Industry Data Security Standard) verlangt von allen Unternehmen, die Karteninhaberdaten speichern, verarbeiten oder übertragen, regelmäßige interne und externe Penetrationstests. Wir liefern PCI-konforme Pentests inklusive Segmentierungsprüfung.",
  heroPrimaryCta: "Kostenlose PCI-DSS-Erstberatung",
  whatIs: {
    title: "Was ist der PCI DSS?",
    paragraphs: [
      "Der PCI DSS ist der Sicherheitsstandard der Kreditkartenindustrie, herausgegeben vom PCI Security Standards Council (gegründet von u. a. Visa, Mastercard, American Express). Er definiert in zwölf übergeordneten Anforderungen, wie Karteninhaberdaten zu schützen sind. Die aktuelle Version ist v4.0 (bzw. v4.0.1).",
      "Für Penetrationstests ist Requirement 11.4 maßgeblich: Es verlangt eine dokumentierte Pentest-Methodik sowie interne und externe Penetrationstests mindestens alle zwölf Monate und nach signifikanten Änderungen. Wird die Cardholder Data Environment (CDE) durch Segmentierung vom übrigen Netz getrennt, muss zusätzlich die Wirksamkeit dieser Segmentierung getestet werden.",
    ],
  },
  facts: [
    { label: "Herausgeber", value: "PCI SSC" },
    { label: "Pflicht", value: "Requirement 11.4" },
    { label: "Turnus", value: "mind. alle 12 Monate" },
  ],
  penalties: {
    title: "Was droht ohne PCI-DSS-Konformität?",
    intro:
      "PCI DSS ist eine vertragliche Pflicht gegenüber Banken und Kartenanbietern. Verstöße werden über die Acquirer und Card Brands durchgesetzt – besonders teuer wird es nach einem Datenleck.",
    items: [
      {
        value: "Vertragsstrafen",
        label: "Fines durch Card Brands",
        desc: "Acquirer-Banken können bei Nichtkonformität monatliche Strafzahlungen verhängen und weiterreichen.",
      },
      {
        value: "Höhere Haftung",
        label: "Teure Folgen nach Datenpanne",
        desc: "Bei einem Vorfall ohne Nachweis der Konformität drohen Haftung, Forensik-Kosten, Wiederausstellung von Karten und Reputationsschaden.",
      },
      {
        value: "Akzeptanzverlust",
        label: "Verlust der Kartenakzeptanz",
        desc: "Im Extremfall kann die Fähigkeit, Kartenzahlungen zu akzeptieren, eingeschränkt oder entzogen werden.",
      },
    ],
  },
  obligations: {
    title: "Was verlangt",
    accent: "Requirement 11.4?",
    intro:
      "Requirement 11.4 fordert einen strukturierten, wiederkehrenden Pentest-Prozess für die Cardholder Data Environment – auf Netzwerk- und Applikationsebene, von innen und außen.",
    points: [
      "Dokumentierte, anerkannte Pentest-Methodik (z. B. angelehnt an NIST SP 800-115)",
      "Externer und interner Penetrationstest mindestens alle 12 Monate und nach signifikanten Änderungen",
      "Prüfung auf Netzwerk- und Applikationsebene über den gesamten CDE-Perimeter",
      "Segmentierungstest zur Bestätigung, dass die CDE wirksam isoliert ist (Service Provider: alle 6 Monate)",
    ],
    sidebarTitle: "Der Weg zum PCI-Pentest-Nachweis",
    steps: [
      { label: "Scope & CDE", sub: "Karteninhaberdaten-Umgebung und Perimeter abgrenzen" },
      { label: "Externer Pentest", sub: "Internetseitig erreichbare Systeme der CDE prüfen" },
      { label: "Interner Pentest", sub: "Angriffspfade aus dem internen Netz in die CDE testen" },
      { label: "Segmentierungstest", sub: "Wirksamkeit der Netz-Trennung bestätigen" },
      { label: "Bericht & Re-Test", sub: "Findings beheben und prüffähig nachweisen" },
    ],
  },
  servicesTitle: "Unsere PCI-DSS-Penetrationstests",
  servicesIntro:
    "Wir decken die in Requirement 11.4 geforderten Testarten ab – mit nachvollziehbarer, prüffähiger Dokumentation.",
  services: [
    { icon: "globe", title: "Externer Pentest", desc: "Prüfung der von außen erreichbaren Systeme der CDE auf ausnutzbare Schwachstellen." },
    { icon: "network", title: "Interner Pentest", desc: "Test der Angriffspfade aus dem internen Netzwerk in die Karteninhaberdaten-Umgebung." },
    { icon: "scale", title: "Segmentierungstest", desc: "Nachweis, dass die CDE wirksam von Out-of-Scope-Netzen getrennt ist – wie von 11.4 gefordert." },
    { icon: "search", title: "Applikations-Pentest", desc: "Prüfung der zahlungsrelevanten Anwendungen auf Schwachstellen (passend zu Requirement 6)." },
  ],
  whoForTitle: "Wer braucht einen PCI-DSS-Pentest?",
  whoForIntro:
    "PCI DSS betrifft jede Organisation, die Karteninhaberdaten speichert, verarbeitet oder überträgt – unabhängig von der Größe.",
  whoFor: [
    { icon: "building", title: "Händler (Merchants)", desc: "Online- und stationäre Händler, die Kartenzahlungen akzeptieren." },
    { icon: "banknote", title: "Payment Service Provider", desc: "Zahlungsdienstleister und Payment-Gateways mit Zugriff auf Kartendaten." },
    { icon: "globe", title: "E-Commerce-Plattformen", desc: "Webshops und Plattformen, die Zahlungsdaten verarbeiten oder weiterleiten." },
    { icon: "server", title: "Service Provider", desc: "Dienstleister, die kartendatenrelevante Systeme für andere betreiben (verkürzter Segmentierungs-Turnus)." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir grenzen Ihre CDE ab und bestimmen den passenden Testumfang nach 11.4.", icon: "message" },
    { step: "02", title: "Externer & interner Pentest", desc: "Netzwerk- und Applikationsebene über den gesamten CDE-Perimeter.", icon: "target" },
    { step: "03", title: "Segmentierungstest", desc: "Bestätigung der wirksamen Isolierung der Karteninhaberdaten-Umgebung.", icon: "scale" },
    { step: "04", title: "Bericht & Maßnahmen", desc: "Prüffähige Dokumentation mit priorisiertem Maßnahmenkatalog.", icon: "clipboard" },
    { step: "05", title: "Re-Test", desc: "Nachtest der behobenen Findings als Konformitätsnachweis.", icon: "award" },
  ],
  faqs: [
    { q: "Verlangt PCI DSS einen Penetrationstest?", a: "Ja. Requirement 11.4 des PCI DSS fordert eine dokumentierte Pentest-Methodik sowie interne und externe Penetrationstests mindestens alle zwölf Monate und nach signifikanten Änderungen der Cardholder Data Environment." },
    { q: "Wie oft muss ein PCI-DSS-Pentest durchgeführt werden?", a: "Mindestens alle 12 Monate und zusätzlich nach jeder signifikanten Änderung an Infrastruktur oder Anwendungen der CDE. Wird Segmentierung genutzt, müssen Service Provider deren Wirksamkeit alle 6 Monate testen, andere Organisationen mindestens jährlich." },
    { q: "Was ist die Cardholder Data Environment (CDE)?", a: "Die CDE umfasst alle Personen, Prozesse und Systeme, die Karteninhaberdaten speichern, verarbeiten oder übertragen – inklusive direkt verbundener Systeme. Sie bestimmt den Scope des Penetrationstests." },
    { q: "Was ist ein Segmentierungstest?", a: "Wenn die CDE durch Netzwerksegmentierung vom restlichen Netz getrennt wird, verlangt PCI DSS einen Test, der bestätigt, dass diese Trennung wirksam ist und keine Angriffspfade aus Out-of-Scope-Netzen in die CDE bestehen." },
    { q: "Welche PCI-DSS-Version gilt aktuell?", a: "Aktuell ist PCI DSS v4.0 bzw. die Pflege-Version v4.0.1. Version 4.0 hat v3.2.1 abgelöst; die zukunftsdatierten Anforderungen sind seit dem 31. März 2025 verbindlich umzusetzen." },
  ],
  related: [
    { href: "/iso-27001", label: "ISO 27001", desc: "Internationaler Standard für Informationssicherheits-Managementsysteme." },
    { href: "/dora", label: "DORA", desc: "EU-Verordnung zur digitalen operationalen Resilienz im Finanzsektor." },
    { href: "/penetration-testing", label: "Penetrationstest", desc: "Manuelle Angriffssimulation für Web, API, Netzwerk & mehr." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
