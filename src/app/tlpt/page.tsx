import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "TLPT – Threat-Led Penetration Testing (DORA) | SODU Secure",
  description:
    "Was ist TLPT? Bedrohungsgeleitetes Penetration Testing nach DORA (Art. 26) und TIBER-EU – Pflicht für bedeutende Finanzunternehmen. Wir liefern die technischen Angriffssimulationen.",
  alternates: { canonical: "/tlpt" },
};

const data: RegulationContent = {
  slug: "tlpt",
  badgeIcon: "target",
  badgeText: "TLPT · DORA Art. 26-27 · TIBER-EU",
  title: "TLPT",
  titleAccent: "Threat-Led Penetration Testing",
  heroIntro:
    "Das Threat-Led Penetration Testing (TLPT) ist ein bedrohungsgeleiteter Penetrationstest, der reale Angreifer auf Ihre kritischen Funktionen nachstellt. Unter DORA wird er für bedeutende Finanzunternehmen verpflichtend – wir liefern die technischen Angriffssimulationen.",
  heroPrimaryCta: "Kostenlose TLPT-Erstberatung",
  whatIs: {
    title: "Was ist TLPT (Threat-Led Penetration Testing)?",
    paragraphs: [
      "TLPT ist ein bedrohungsorientierter, intelligence-geführter Penetrationstest: Statt einzelne Systeme isoliert zu prüfen, wird auf Basis aktueller Bedrohungsinformationen (Threat Intelligence) ein realistisches Angriffsszenario gegen die kritischen oder wichtigen Funktionen eines Unternehmens durchgespielt – inklusive Menschen, Prozessen und Technik.",
      "Rechtlich verankert ist TLPT in der EU-Verordnung DORA (Art. 26–27). Methodisch baut es auf dem europäischen TIBER-EU-Rahmenwerk auf. Bedeutende Finanzunternehmen müssen TLPT mindestens alle drei Jahre durchführen; der Umfang wird von der Aufsicht risikobasiert festgelegt.",
    ],
  },
  facts: [
    { label: "Rechtsgrundlage", value: "DORA Art. 26-27" },
    { label: "Rahmenwerk", value: "TIBER-EU" },
    { label: "Turnus", value: "mind. alle 3 Jahre" },
  ],
  penalties: {
    title: "Was droht ohne TLPT?",
    intro:
      "TLPT ist für bedeutende Finanzunternehmen kein Kann, sondern ein verbindlicher Bestandteil des DORA-Testprogramms. Versäumnisse werden von der Finanzaufsicht durchgesetzt.",
    items: [
      {
        value: "Aufsichtsmaßnahmen",
        label: "Sanktionen durch BaFin & EZB",
        desc: "Fehlt der geforderte TLPT-Nachweis, drohen aufsichtsrechtliche Maßnahmen, Geldbußen und verbindliche Auflagen bis hin zu Einschränkungen der Geschäftstätigkeit.",
      },
      {
        value: "Erhöhtes Angriffsrisiko",
        label: "Unentdeckte Angriffspfade",
        desc: "Ohne realistische Angriffssimulation bleiben zusammenhängende Schwachstellen über Menschen, Prozesse und Technik unentdeckt – genau die Pfade, die echte Angreifer nutzen.",
      },
      {
        value: "Persönliche Haftung",
        label: "Verantwortung der Leitung",
        desc: "Das Leitungsorgan trägt die Letztverantwortung für die digitale operationale Resilienz – Versäumnisse können persönlich und reputativ teuer werden.",
      },
    ],
  },
  obligations: {
    title: "Welche Anforderungen stellt",
    accent: "TLPT?",
    intro:
      "TLPT folgt einem strukturierten, mehrphasigen Ablauf nach TIBER-EU – von der Threat Intelligence über die Angriffsdurchführung (Red Team) bis zur gemeinsamen Auswertung mit dem Verteidigungsteam (Blue Team).",
    points: [
      "Scoping der kritischen oder wichtigen Funktionen gemeinsam mit der Aufsicht",
      "Threat-Intelligence-Phase: realistische, auf Ihr Institut zugeschnittene Angreiferszenarien",
      "Red-Teaming gegen Produktionssysteme – verdeckt und kontrolliert",
      "Purple-Teaming, Abschlussbericht und Nachweis gegenüber der Aufsicht",
    ],
    sidebarTitle: "Der Weg zum TLPT-Nachweis",
    steps: [
      { label: "Scoping", sub: "Kritische Funktionen und Testumfang nach DORA festlegen" },
      { label: "Threat Intelligence", sub: "Bedrohungsgeleitete, realistische Angriffsszenarien" },
      { label: "Red Teaming", sub: "Verdeckte Angriffssimulation auf Produktionssysteme" },
      { label: "Purple Teaming", sub: "Gemeinsame Auswertung mit Ihrem Blue Team" },
      { label: "Bericht & Nachweis", sub: "Aufsichtskonforme Dokumentation und Remediation" },
    ],
  },
  servicesTitle: "Wie wir Ihr TLPT durchführen",
  servicesIntro:
    "Wir besetzen die technische Kernrolle des TLPT: realistische, bedrohungsgeleitete Angriffssimulationen mit aufsichtskonformer Dokumentation.",
  services: [
    { icon: "search", title: "Threat Intelligence", desc: "Aufbereitung realistischer Angreiferprofile und Szenarien auf Basis aktueller Bedrohungslage für Ihr Institut." },
    { icon: "target", title: "Red Teaming", desc: "Verdeckte, zielgerichtete Angriffssimulation gegen Ihre kritischen Funktionen – realitätsnah und kontrolliert." },
    { icon: "shield", title: "Purple Teaming", desc: "Gemeinsame Auswertung mit Ihrem Verteidigungsteam, um Erkennungs- und Reaktionsfähigkeit messbar zu verbessern." },
    { icon: "clipboard", title: "Aufsichtskonforme Berichte", desc: "Nachvollziehbare Dokumentation entlang TIBER-EU – vorlagefähig gegenüber der Finanzaufsicht." },
  ],
  whoForTitle: "Wer ist von TLPT betroffen?",
  whoForIntro:
    "TLPT richtet sich an bedeutende Finanzunternehmen, deren Ausfall erhebliche Auswirkungen auf den Finanzsektor hätte – sowie an deren kritische IKT-Dienstleister.",
  whoFor: [
    { icon: "landmark", title: "Banken & Kreditinstitute", desc: "Bedeutende Institute mit kritischen oder wichtigen Funktionen im Sinne von DORA." },
    { icon: "shield", title: "Versicherungen", desc: "Große Versicherungs- und Rückversicherungsunternehmen unter DORA-Aufsicht." },
    { icon: "banknote", title: "Zahlungs- & Wertpapierdienste", desc: "Zahlungsinstitute, Wertpapierfirmen und Handelsplätze mit Systemrelevanz." },
    { icon: "server", title: "Kritische IKT-Dienstleister", desc: "Anbieter, die kritische Dienste für den Finanzsektor erbringen und in den Testumfang fallen." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir bestimmen kritische Funktionen und den passenden TLPT-Umfang nach DORA.", icon: "message" },
    { step: "02", title: "Threat Intelligence", desc: "Bedrohungsgeleitete Szenarien, zugeschnitten auf Ihr Institut.", icon: "fileSearch" },
    { step: "03", title: "Red-Team-Angriffssimulation", desc: "Verdeckte, kontrollierte Angriffe gegen Ihre kritischen Funktionen.", icon: "target" },
    { step: "04", title: "Purple Teaming & Bericht", desc: "Gemeinsame Auswertung mit Ihrem Blue Team und aufsichtskonforme Dokumentation.", icon: "clipboard" },
    { step: "05", title: "Remediation & Re-Test", desc: "Begleitung bei der Behebung und Nachtest der kritischen Findings.", icon: "award" },
  ],
  faqs: [
    { q: "Was ist der Unterschied zwischen TLPT und einem normalen Pentest?", a: "Ein klassischer Penetrationstest prüft definierte Systeme oder Anwendungen. TLPT ist bedrohungsgeleitet: Auf Basis realer Threat Intelligence wird ein vollständiges, realistisches Angriffsszenario gegen die kritischen Funktionen eines Unternehmens durchgespielt – über Menschen, Prozesse und Technik hinweg, in der Regel gegen Produktionssysteme." },
    { q: "Für wen ist TLPT verpflichtend?", a: "Unter DORA (Art. 26) müssen bedeutende Finanzunternehmen, die von der zuständigen Behörde dafür bestimmt werden, mindestens alle drei Jahre ein TLPT durchführen. Die genaue Betroffenheit und der Umfang werden risikobasiert von der Aufsicht festgelegt." },
    { q: "Was ist TIBER-EU?", a: "TIBER-EU (Threat Intelligence-based Ethical Red Teaming) ist der von der EZB veröffentlichte europäische Rahmen für bedrohungsgeleitete Red-Team-Tests. Die TLPT-Anforderungen aus DORA bauen methodisch auf TIBER-EU auf." },
    { q: "Stört ein TLPT den laufenden Betrieb?", a: "TLPT wird verdeckt und kontrolliert gegen Produktionssysteme durchgeführt. Jeder potenziell impactvolle Schritt wird mit einem kleinen, eingeweihten Kreis (White Team) abgestimmt, um Risiken für den Betrieb auszuschließen." },
    { q: "Was kostet ein TLPT?", a: "TLPT-Projekte sind individuell und richten sich nach Umfang, kritischen Funktionen und Szenariotiefe. In der Regel bewegt sich der Aufwand deutlich über einem fokussierten Pentest. Wir erstellen nach einem kostenlosen Scoping-Gespräch ein verbindliches Festpreisangebot." },
  ],
  related: [
    { href: "/dora", label: "DORA", desc: "Die EU-Verordnung, die TLPT verpflichtend macht." },
    { href: "/nis2", label: "NIS2", desc: "Cybersicherheitspflichten für wesentliche und wichtige Einrichtungen." },
    { href: "/iso-27001", label: "ISO 27001", desc: "Internationaler Standard für Informationssicherheit." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
