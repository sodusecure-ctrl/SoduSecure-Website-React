import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "DORA-Verordnung: Digitale operationale Resilienz",
  description:
    "Was ist DORA? Pflichten für Finanzunternehmen, Threat-Led Penetration Testing (TLPT) und Resilienztests - wir unterstützen Sie bei der DORA-Konformität.",
  alternates: { canonical: "/dora" },
};

const data: RegulationContent = {
  slug: "dora",
  sourcesIntro: [
    "DORA verpflichtet Finanzunternehmen in Art. 24–26 zu einem Programm für Tests der digitalen operationalen Resilienz – von Schwachstellenbewertungen bis zu bedrohungsorientierten Penetrationstests (TLPT), die für bedeutende Institute mindestens alle drei Jahre vorgeschrieben sind."
  ],
  sources: [
    {
      "label": "EUR-Lex: Verordnung (EU) 2022/2554 (DORA)",
      "url": "https://eur-lex.europa.eu/eli/reg/2022/2554/oj"
    },
    {
      "label": "BSI-Lagebericht zur IT-Sicherheit in Deutschland",
      "url": "https://www.bsi.bund.de/DE/Service-Navi/Publikationen/Lagebericht/lagebericht_node.html"
    }
  ],
  badgeIcon: "banknote",
  badgeText: "DORA · EU 2022/2554 · seit 17.01.2025",
  title: "DORA",
  titleAccent: "Digitale Resilienz im Finanzsektor",
  heroIntro:
    "Der Digital Operational Resilience Act verpflichtet Finanzunternehmen, ihre IT gegen Ausfälle und Angriffe widerstandsfähig zu machen – inklusive bedrohungsorientierter Penetrationstests. Wir liefern die technischen Tests dazu.",
  heroPrimaryCta: "Kostenlose DORA-Erstberatung",
  heroSecondary: { href: "/red-team-assessment", label: "Mehr zum Red Teaming" },
  whatIs: {
    title: "Was ist DORA?",
    paragraphs: [
      "DORA (Digital Operational Resilience Act, Verordnung (EU) 2022/2554) ist eine EU-Verordnung, die die digitale operationale Resilienz des Finanzsektors stärkt. Sie gilt unmittelbar in allen Mitgliedstaaten und ist seit dem 17. Januar 2025 anzuwenden.",
      "DORA bündelt die Anforderungen an das IKT-Risikomanagement in einem einheitlichen Rahmen und ruht auf fünf Säulen: IKT-Risikomanagement, Behandlung und Meldung von IKT-Vorfällen, Testen der digitalen operationalen Resilienz, Management des Drittparteienrisikos und Informationsaustausch.",
    ],
  },
  facts: [
    { label: "Rechtsgrundlage", value: "EU 2022/2554" },
    { label: "Anzuwenden seit", value: "17. Januar 2025" },
    { label: "Geltung", value: "Unmittelbar (Verordnung)" },
  ],
  penalties: {
    title: "Was droht bei Verstößen gegen DORA?",
    intro:
      "DORA gilt unmittelbar und wird von den Finanzaufsichtsbehörden durchgesetzt. Bei Versäumnissen drohen aufsichtsrechtliche Maßnahmen, empfindliche Geldbußen und Zwangsgelder.",
    items: [
      {
        value: "Aufsichtsmaßnahmen",
        label: "Sanktionen durch BaFin & EZB",
        desc: "Die Aufsicht kann verwaltungsrechtliche Sanktionen, Geldbußen und verbindliche Auflagen verhängen – bis hin zur Einschränkung der Geschäftstätigkeit.",
      },
      {
        value: "Bis 1 % Tagesumsatz",
        label: "Zwangsgelder für IKT-Drittdienstleister",
        desc: "Kritische IKT-Drittdienstleister unter EU-Aufsicht riskieren tägliche Zwangsgelder von bis zu 1 % des durchschnittlichen weltweiten Tagesumsatzes – über bis zu 6 Monate.",
      },
      {
        value: "Persönliche Haftung",
        label: "Verantwortung der Leitungsorgane",
        desc: "Das Leitungsorgan trägt die Letztverantwortung für das IKT-Risikomanagement. Versäumnisse können persönlich und reputativ teuer werden.",
      },
    ],
  },
  obligations: {
    title: "Welche Pflichten bringt",
    accent: "DORA mit sich?",
    intro:
      "DORA verlangt einen regelmäßigen, risikobasierten Testzyklus. Bedeutende Finanzunternehmen müssen zudem alle drei Jahre ein bedrohungsorientiertes Penetrationstesting (TLPT) nach dem TIBER-EU-Rahmen durchführen.",
    points: [
      "Robustes IKT-Risikomanagement mit klaren Verantwortlichkeiten auf Leitungsebene",
      "Regelmäßige Resilienztests: Schwachstellenanalysen, Penetrationstests, Szenario-Tests",
      "Threat-Led Penetration Testing (TLPT) alle 3 Jahre für bedeutende Institute",
      "Meldung schwerwiegender IKT-Vorfälle und Management des Drittparteienrisikos",
    ],
    sidebarTitle: "Der Weg zur DORA-Resilienz",
    steps: [
      { label: "Scoping", sub: "Welche kritischen Funktionen und Systeme sind betroffen?" },
      { label: "Resilienz-Assessment", sub: "Bewertung des IKT-Risikomanagements und der Testlandschaft" },
      { label: "Penetrationstests / TLPT", sub: "Technische Tests bis hin zu bedrohungsorientierten Angriffssimulationen" },
      { label: "Findings beheben", sub: "Schwachstellen schließen, Resilienz nachweislich erhöhen" },
      { label: "Berichte & Wiederholung", sub: "Dokumentation für Aufsicht und regelmäßige Re-Tests" },
    ],
  },
  servicesTitle: "Wie wir Ihre DORA-Tests durchführen",
  servicesIntro:
    "DORA macht regelmäßiges, realistisches Testen zur Pflicht. Genau das ist unser Kerngeschäft – von der Schwachstellenanalyse bis zur bedrohungsorientierten Angriffssimulation.",
  services: [
    { icon: "search", title: "Penetrationstests", desc: "Manuelle, tiefgehende Sicherheitstests Ihrer Anwendungen, APIs und Infrastruktur als Teil Ihres DORA-Testprogramms." },
    { icon: "target", title: "Threat-Led Penetration Testing", desc: "Bedrohungsorientierte Angriffssimulationen in Anlehnung an den TIBER-EU-Rahmen – realistische Szenarien gegen Ihre kritischen Funktionen." },
    { icon: "shield", title: "Schwachstellen- & Resilienz-Assessment", desc: "Strukturierte Bewertung Ihrer IKT-Systeme und ihrer Widerstandsfähigkeit gegen Ausfälle und Angriffe." },
    { icon: "clipboard", title: "Aufsichtskonforme Berichte", desc: "Detaillierte, nachvollziehbare Testberichte mit Risikobewertung und Maßnahmen – vorlagefähig gegenüber der Aufsicht." },
  ],
  whoForTitle: "Wer ist von DORA betroffen?",
  whoForIntro:
    "DORA gilt für nahezu den gesamten Finanzsektor sowie für kritische IKT-Drittdienstleister, die diese Unternehmen beliefern.",
  whoFor: [
    { icon: "landmark", title: "Banken & Kreditinstitute", desc: "Klassische Banken, Zahlungsinstitute und E-Geld-Institute." },
    { icon: "shield", title: "Versicherungen", desc: "Versicherungs- und Rückversicherungsunternehmen sowie Vermittler." },
    { icon: "banknote", title: "Wertpapier & Krypto", desc: "Wertpapierfirmen, Handelsplätze und Anbieter von Krypto-Dienstleistungen." },
    { icon: "server", title: "IKT-Drittdienstleister", desc: "Cloud-Anbieter und IT-Dienstleister, die kritische Dienste für den Finanzsektor erbringen." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir bestimmen die kritischen Funktionen und den passenden Testumfang nach DORA.", icon: "message" },
    { step: "02", title: "Resilienz-Assessment", desc: "Bewertung Ihres IKT-Risikomanagements und Ihrer bestehenden Testlandschaft.", icon: "fileSearch" },
    { step: "03", title: "Penetrationstest / TLPT", desc: "Durchführung der technischen Tests – bis hin zu bedrohungsorientierten Angriffssimulationen.", icon: "target" },
    { step: "04", title: "Bericht & Maßnahmen", desc: "Aufsichtskonformer Bericht mit CVSS-Bewertung und priorisierten Empfehlungen.", icon: "clipboard" },
    { step: "05", title: "Re-Test & Zyklus", desc: "Kostenloser Retest nach Behebung und Planung des regelmäßigen DORA-Testzyklus.", icon: "award" },
  ],
  faqs: [
    { q: "Seit wann gilt DORA?", a: "DORA ist seit dem 17. Januar 2025 anzuwenden. Als EU-Verordnung gilt sie unmittelbar in allen Mitgliedstaaten, ohne dass ein nationales Umsetzungsgesetz erforderlich ist. Eine Übergangsfrist gibt es nicht: Die Anforderungen an IKT-Risikomanagement, Vorfallmeldung und Resilienztests sind für betroffene Finanzunternehmen bereits verbindlich." },
    { q: "Was sind die 5 Säulen von DORA?", a: "DORA ruht auf fünf Säulen: dem IKT-Risikomanagement, der Behandlung und Meldung IKT-bezogener Vorfälle, dem Testen der digitalen operationalen Resilienz, dem Management des Risikos durch IKT-Drittdienstleister sowie dem freiwilligen Austausch von Informationen über Cyberbedrohungen. Penetrationstests und TLPT gehören zur dritten Säule und liefern zugleich Belege für die erste." },
    { q: "Wer ist DORA-pflichtig?", a: "DORA gilt für rund zwanzig Arten von Finanzunternehmen: Banken, Zahlungs- und E-Geld-Institute, Wertpapierfirmen, Versicherer und Rückversicherer, Versicherungsvermittler, Kapitalverwaltungsgesellschaften, Handelsplätze, Krypto-Dienstleister, Ratingagenturen und weitere. Hinzu kommen IKT-Drittdienstleister, die für Finanzunternehmen kritische Leistungen erbringen. Kleinstunternehmen unterliegen einem vereinfachten Rahmen, sind aber nicht ausgenommen." },
    { q: "Was ist Threat-Led Penetration Testing (TLPT)?", a: "TLPT ist ein bedrohungsorientierter Penetrationstest, der reale Angreifer und aktuelle Bedrohungsszenarien nachstellt. Bedeutende Finanzunternehmen müssen TLPT mindestens alle drei Jahre durchführen – methodisch angelehnt an den europäischen TIBER-EU-Rahmen." },
    { q: "Müssen wir als kleines Finanzunternehmen alles umsetzen?", a: "DORA folgt dem Proportionalitätsprinzip: Umfang und Tiefe der Anforderungen richten sich nach Größe, Risikoprofil und Bedeutung des Unternehmens. TLPT ist nur für bedeutende Institute verpflichtend, regelmäßige Penetrationstests und Schwachstellenanalysen betreffen jedoch nahezu alle." },
    { q: "Gilt DORA auch für unsere IT-Dienstleister?", a: "Ja. DORA bezieht kritische IKT-Drittdienstleister ausdrücklich ein. Finanzunternehmen müssen das Drittparteienrisiko aktiv steuern, und kritische Anbieter unterliegen einer direkten europäischen Aufsicht." },
    { q: "Wie helfen Sie konkret bei DORA?", a: "Wir übernehmen die technische Säule: Penetrationstests, TLPT-nahe Angriffssimulationen und Schwachstellenanalysen samt aufsichtskonformer Berichte. Damit weisen Sie die geforderte Resilienz Ihrer Systeme nach. Unsere Tester arbeiten mit OSCP-, OSWE- und CEH-Zertifizierung und haben über 500 Penetrationstests durchgeführt, remote oder vor Ort bei Ihnen." },
    { q: "Wie oft verlangt DORA Penetrationstests?", a: "Das Testprogramm nach Art. 24 und 25 muss mindestens jährlich alle kritischen IKT-Systeme und -Anwendungen abdecken. Dazu zählen Schwachstellenbewertungen, Netzwerksicherheitstests und Penetrationstests. Bedeutende Finanzunternehmen, die von der Aufsicht dafür bestimmt werden, führen zusätzlich mindestens alle drei Jahre ein Threat-Led Penetration Testing durch." },
    { q: "Wie läuft ein DORA-Penetrationstest ab?", a: "Zuerst bestimmen wir gemeinsam die kritischen oder wichtigen Funktionen und leiten daraus den Scope ab. Danach testen unsere Pentester Ihre Anwendungen, APIs und Netzwerke manuell, inklusive der Schnittstellen zu IKT-Drittdienstleistern. Jedes Finding ordnen wir der betroffenen Funktion zu, damit sich der Test in Ihr Testprogramm nach Art. 24 und 25 einfügt." },
    { q: "Was kostet ein DORA-Penetrationstest?", a: "Ein manueller Penetrationstest wird individuell nach Aufwand kalkuliert und liegt meist zwischen 4.000 und 20.000 EUR, je nach Zahl der kritischen Funktionen, Anwendungen und Schnittstellen. Der automatisierte Schwachstellenscan als Einstieg kostet ab 1.499 EUR. Den Aufwand treibt bei Finanzunternehmen vor allem die Zahl der IKT-Drittdienstleister im Prüfumfang, weil jede Schnittstelle nach außen gesondert betrachtet und mit dem Anbieter abgestimmt werden muss." },
    { q: "Was droht bei Verstößen gegen DORA?", a: "Die zuständigen Aufsichtsbehörden können Anordnungen treffen, Tätigkeiten einschränken und Sanktionen verhängen; die Höhe richtet sich nach nationalem Recht. Kritische IKT-Drittdienstleister können mit Zwangsgeldern von bis zu 1 % des durchschnittlichen weltweiten Tagesumsatzes belegt werden. Hinzu kommen Reputationsschäden und Nachfragen von Kunden und Wirtschaftsprüfern." },
    { q: "Was muss im DORA-Bericht an die Aufsicht stehen?", a: "Die Aufsicht erwartet nachvollziehbare Belege: Scope und Methodik des Tests, die gefundenen Schwachstellen mit Risikobewertung, die getroffenen Gegenmaßnahmen und den Nachweis der Behebung. Genau so ist unser Bericht aufgebaut - mit Management Summary für die Geschäftsleitung und technischem Teil für Ihre IT, auf Deutsch und Englisch." },
  ],
  related: [
    { href: "/tlpt", label: "TLPT", desc: "Threat-Led Penetration Testing – unter DORA (Art. 26) für bedeutende Finanzunternehmen verpflichtend." },
    { href: "/nis2", label: "NIS2", desc: "Cybersicherheitspflichten für wesentliche und wichtige Einrichtungen." },
    { href: "/bsig", label: "BSIG / KRITIS", desc: "Anforderungen an Betreiber Kritischer Infrastrukturen." },
    { href: "/iso-27001", label: "ISO 27001", desc: "Internationaler Standard für Informationssicherheit." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
