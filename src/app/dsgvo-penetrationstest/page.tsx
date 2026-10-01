import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "DSGVO-Penetrationstest | Art. 32 nachweisen",
  description:
    "DSGVO Art. 32 verlangt regelmäßige Überprüfung technischer Maßnahmen. Penetrationstest als Wirksamkeitsnachweis - individuell kalkuliert, meist 4.000 bis 20.000 €.",
  alternates: { canonical: "/dsgvo-penetrationstest" },
};

const data: RegulationContent = {
  slug: "dsgvo-penetrationstest",
  sourcesIntro: [
    "Art. 32 Abs. 1 lit. d DSGVO fordert ein „Verfahren zur regelmäßigen Überprüfung, Bewertung und Evaluierung der Wirksamkeit der technischen und organisatorischen Maßnahmen“. Penetrationstests sind das etablierte Instrument, um diese Wirksamkeit zu belegen – auch gegenüber Aufsichtsbehörden nach einem Vorfall."
  ],
  sources: [
    {
      "label": "EUR-Lex: Verordnung (EU) 2016/679 (DSGVO), Art. 32",
      "url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj"
    },
    {
      "label": "BSI – Bundesamt für Sicherheit in der Informationstechnik",
      "url": "https://www.bsi.bund.de/"
    }
  ],
  badgeIcon: "lock",
  badgeText: "DSGVO Art. 32 · Datenschutz · Art. 83",
  title: "DSGVO-Penetrationstest",
  titleAccent: "Technische Maßnahmen nach Art. 32 nachweisen",
  heroIntro:
    "Die DSGVO verlangt nicht nur Sicherheitsmaßnahmen, sondern auch deren regelmäßige Überprüfung. Ein Penetrationstest ist der etablierte Nachweis, dass Ihre technischen und organisatorischen Maßnahmen (TOM) nach Art. 32 wirksam sind – manuell von OSCP-zertifizierten Hackern, individuell kalkuliert - meist zwischen 4.000 und 20.000 €.",
  heroPrimaryCta: "Kostenlose DSGVO-Erstberatung",
  whatIs: {
    title: "Was verlangt Art. 32 DSGVO?",
    paragraphs: [
      "Artikel 32 DSGVO („Sicherheit der Verarbeitung\") verpflichtet Verantwortliche und Auftragsverarbeiter, geeignete technische und organisatorische Maßnahmen zu treffen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten – unter Berücksichtigung von Stand der Technik, Implementierungskosten sowie Art, Umfang und Zweck der Verarbeitung.",
      "Entscheidend für Sicherheitstests ist Art. 32 Abs. 1 lit. d: gefordert ist ein „Verfahren zur regelmäßigen Überprüfung, Bewertung und Evaluierung der Wirksamkeit\" der Maßnahmen. Ein Penetrationstest setzt genau das um – er prüft die Maßnahmen aus Angreiferperspektive und belegt ihre Wirksamkeit mit reproduzierbaren Proof-of-Concepts.",
    ],
  },
  facts: [
    { label: "Rechtsgrundlage", value: "DSGVO Art. 32" },
    { label: "Bußgeldrahmen", value: "bis 20 Mio. € / 4 %" },
    { label: "Nachweis", value: "regelmäßige Tests" },
  ],
  penalties: {
    title: "Was droht bei unzureichender Sicherheit?",
    intro:
      "Werden personenbezogene Daten unzureichend geschützt, drohen nicht nur Bußgelder der Aufsichtsbehörden, sondern auch Schadenersatz und Reputationsschäden – besonders nach einem meldepflichtigen Datenleck.",
    items: [
      {
        value: "Bis 20 Mio. €",
        label: "Bußgelder nach Art. 83",
        desc: "Verstöße gegen die Sicherheitspflichten können mit Geldbußen bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes geahndet werden – je nachdem, welcher Betrag höher ist.",
      },
      {
        value: "Schadenersatz",
        label: "Ansprüche Betroffener (Art. 82)",
        desc: "Betroffene können materiellen und immateriellen Schadenersatz verlangen. Nach einem Vorfall summieren sich Einzelansprüche schnell.",
      },
      {
        value: "Meldepflicht",
        label: "72-Stunden-Frist nach Art. 33",
        desc: "Datenschutzverletzungen sind binnen 72 Stunden an die Aufsicht zu melden. Fehlende Nachweise zu Schutzmaßnahmen verschärfen die Bewertung.",
      },
    ],
  },
  obligations: {
    title: "Welche Maßnahmen nennt",
    accent: "Art. 32?",
    intro:
      "Art. 32 nennt Schutzziele und verlangt deren regelmäßige Überprüfung. Ein Penetrationstest adressiert die technische Seite davon direkt.",
    points: [
      "Pseudonymisierung und Verschlüsselung personenbezogener Daten",
      "Vertraulichkeit, Integrität, Verfügbarkeit und Belastbarkeit der Systeme",
      "Rasche Wiederherstellbarkeit nach einem physischen oder technischen Zwischenfall",
      "Verfahren zur regelmäßigen Überprüfung der Wirksamkeit – z. B. durch Penetrationstests",
    ],
    sidebarTitle: "Der Weg zum DSGVO-Nachweis",
    steps: [
      { label: "Scoping", sub: "Welche Systeme verarbeiten personenbezogene Daten?" },
      { label: "Penetrationstest", sub: "Technische Prüfung der Schutzmaßnahmen aus Angreifersicht" },
      { label: "Bewertung", sub: "Findings nach Risiko und Datenschutz-Relevanz einordnen" },
      { label: "Behebung", sub: "Schwachstellen schließen, TOM nachschärfen" },
      { label: "Nachweis", sub: "Prüffähiger Bericht für Aufsicht und Auftraggeber" },
    ],
  },
  servicesTitle: "Wie wir Ihre DSGVO-Konformität technisch absichern",
  servicesIntro:
    "Wir liefern den technischen Wirksamkeitsnachweis nach Art. 32 – mit Berichten, die für Aufsicht und Auftragsverarbeitungs-Audits geeignet sind.",
  services: [
    { icon: "search", title: "Penetrationstest", desc: "Manuelle Prüfung der Systeme, die personenbezogene Daten verarbeiten – Web, API, Netzwerk und Cloud." },
    { icon: "lock", title: "Prüfung der Verschlüsselung", desc: "Bewertung von Transport- und Datenverschlüsselung sowie Zugriffskontrollen auf sensible Daten." },
    { icon: "shield", title: "Resilienz & Wiederherstellung", desc: "Prüfung auf Belastbarkeit und sichere Wiederherstellbarkeit nach einem Zwischenfall." },
    { icon: "clipboard", title: "Prüffähige Berichte", desc: "Dokumentation mit CVSS-Bewertung und Datenschutz-Bezug – vorlagefähig für Aufsicht und AV-Audits." },
  ],
  whoForTitle: "Wer braucht einen DSGVO-Penetrationstest?",
  whoForIntro:
    "Jede Organisation, die personenbezogene Daten verarbeitet, muss die Wirksamkeit ihrer Schutzmaßnahmen nachweisen können.",
  whoFor: [
    { icon: "globe", title: "SaaS & Online-Dienste", desc: "Anbieter, die Kunden- und Nutzerdaten verarbeiten und gegenüber Kunden Sicherheit belegen müssen." },
    { icon: "heart", title: "Gesundheit & Soziales", desc: "Verarbeiter besonders schützenswerter Daten nach Art. 9 mit erhöhtem Schutzbedarf." },
    { icon: "banknote", title: "Finanz & Versicherung", desc: "Branchen mit sensiblen Finanzdaten und strenger Aufsicht." },
    { icon: "server", title: "Auftragsverarbeiter", desc: "Dienstleister, die im Auftrag Daten verarbeiten und Nachweise für ihre Auftraggeber brauchen." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir bestimmen die datenverarbeitenden Systeme und den passenden Testumfang.", icon: "message" },
    { step: "02", title: "Penetrationstest", desc: "Manuelle Sicherheitsprüfung aus Angreiferperspektive.", icon: "target" },
    { step: "03", title: "Bewertung & Bericht", desc: "Priorisierte Findings mit Datenschutz-Bezug und CVSS-Bewertung.", icon: "clipboard" },
    { step: "04", title: "Behebung", desc: "Konkrete Empfehlungen zur Schließung der Schwachstellen.", icon: "shield" },
    { step: "05", title: "Re-Test & Nachweis", desc: "Kostenloser Nachtest und prüffähiger Wirksamkeitsnachweis.", icon: "award" },
  ],
  faqs: [
    { q: "Was besagt Art. 32 der DSGVO?", a: "Art. 32 DSGVO verpflichtet Verantwortliche und Auftragsverarbeiter zu technischen und organisatorischen Maßnahmen, die ein dem Risiko angemessenes Schutzniveau sicherstellen. Genannt werden Pseudonymisierung und Verschlüsselung, die Sicherstellung von Vertraulichkeit, Integrität, Verfügbarkeit und Belastbarkeit, die rasche Wiederherstellbarkeit nach einem Zwischenfall sowie ein Verfahren zur regelmäßigen Überprüfung und Bewertung der Wirksamkeit dieser Maßnahmen." },
    { q: "Für wen gilt die DSGVO?", a: "Die DSGVO gilt für jede Stelle, die personenbezogene Daten verarbeitet - unabhängig von der Unternehmensgröße. Erfasst sind Verantwortliche und Auftragsverarbeiter mit Niederlassung in der EU sowie Unternehmen außerhalb der EU, die Personen in der EU Waren oder Dienstleistungen anbieten oder deren Verhalten beobachten. Auch ein Zwei-Personen-Betrieb mit Kundendatenbank fällt darunter." },
    { q: "Schreibt die DSGVO einen Penetrationstest vor?", a: "Die DSGVO nennt keinen Penetrationstest namentlich. Art. 32 Abs. 1 lit. d verlangt aber ein Verfahren zur regelmäßigen Überprüfung der Wirksamkeit der Sicherheitsmaßnahmen. Ein Penetrationstest ist das etablierte und anerkannte Mittel, diese Anforderung technisch zu erfüllen." },
    { q: "Wie oft sollte man einen DSGVO-Penetrationstest durchführen?", a: "Üblich ist mindestens einmal jährlich sowie nach wesentlichen Änderungen an Systemen, die personenbezogene Daten verarbeiten. Die genaue Frequenz richtet sich nach dem Risiko der Verarbeitung." },
    { q: "Was kostet ein DSGVO-Penetrationstest?", a: "Ein manueller DSGVO-Penetrationstest wird bei Sodu Secure individuell nach Aufwand und Tagessätzen kalkuliert - meist zwischen 4.000 und 20.000 €, abhängig vom Umfang der datenverarbeitenden Systeme. Den Einstieg bildet ein automatisierter Schwachstellenscan ab 1.499 €. Den Preis bestimmt hier vor allem, wie viele Verarbeitungstätigkeiten aus Ihrem Verzeichnis technisch geprüft werden sollen, denn jede zusätzliche Anwendung mit personenbezogenen Daten bringt eigene Zugriffsrollen mit." },
    { q: "Hilft der Bericht bei einem Datenschutz-Audit?", a: "Ja. Unser Bericht dokumentiert die geprüften Maßnahmen, gefundene Schwachstellen und deren Behebung mit CVSS-Bewertung. Sie erhalten ihn in Deutsch und Englisch, sodass er sich gegenüber Aufsichtsbehörden, im Rahmen von Auftragsverarbeitungs-Audits und bei internationalen Konzernmüttern als Wirksamkeitsnachweis einreichen lässt. Entscheidend ist für Prüfer dabei weniger die Fundliste als der dokumentierte Umgang damit." },
    { q: "Gilt das auch für Auftragsverarbeiter?", a: "Ja. Art. 32 verpflichtet ausdrücklich auch Auftragsverarbeiter. Viele Auftraggeber verlangen vertraglich einen Nachweis wirksamer technischer Maßnahmen - ein Penetrationstest liefert ihn und beschleunigt Lieferantenfreigaben spürbar." },
    { q: "Was besagt Artikel 34 der DSGVO?", a: "Art. 34 DSGVO verlangt, dass Sie betroffene Personen unverzüglich über eine Datenpanne informieren, wenn diese voraussichtlich ein hohes Risiko für ihre Rechte und Freiheiten bedeutet. Die Benachrichtigung kann entfallen, wenn die Daten wirksam verschlüsselt und damit unbrauchbar waren. Ergänzend fordert Art. 33 die Meldung an die Aufsichtsbehörde binnen 72 Stunden." },
    { q: "Wie läuft ein DSGVO-Penetrationstest ab?", a: "Im Scoping bestimmen wir gemeinsam die Systeme, die personenbezogene Daten verarbeiten. Danach prüfen unsere Pentester diese Anwendungen, APIs und Netzwerke manuell mit den Techniken realer Angreifer, mit Schwerpunkt auf Authentifizierung, Berechtigungen, Verschlüsselung und Datenabfluss. Im Bericht ordnen wir jedes Finding dem betroffenen Verarbeitungsvorgang zu. Die behobenen Punkte prüfen wir anschließend ohne Aufpreis nach." },
    { q: "Werden beim Penetrationstest personenbezogene Daten verarbeitet?", a: "Wir testen bevorzugt auf Staging-Systemen mit Testdaten. Ist nur die Produktivumgebung realistisch, schließen wir vorab eine Vereinbarung zur Auftragsverarbeitung und eine Verschwiegenheitserklärung, begrenzen den Zugriff auf das für den Nachweis Nötige und löschen alle erhobenen Daten nach Projektende. Produktivdaten werden weder exportiert noch verändert." },
    { q: "Wie lange dauert ein DSGVO-Penetrationstest?", a: "Ein fokussierter Test einer Webanwendung mit Backend dauert typischerweise fünf bis zehn Arbeitstage, größere Umgebungen mit mehreren Anwendungen und internem Netz zwei bis vier Wochen. Den Bericht erhalten Sie kurz nach Testende, gefolgt von einer Nachbesprechung mit Ihrem Team. Muss in der Produktivumgebung getestet werden, stimmen wir das Testfenster vorab mit Ihrem Datenschutzbeauftragten ab." },
    { q: "Reicht ein automatisierter Schwachstellenscan für Art. 32?", a: "Für eine erste Bestandsaufnahme ja, als alleiniger Wirksamkeitsnachweis in der Regel nicht. Ein Scanner findet bekannte Schwachstellen in Versionen und Konfigurationen, aber keine fehlerhaften Berechtigungslogiken, keine Wege zu fremden Kundendatensätzen und keine Angriffsketten. Genau diese Fälle sind bei personenbezogenen Daten die kritischen. Sinnvoll ist die Kombination aus laufendem Scan und jährlichem Pentest." },
  ],
  related: [
    { href: "/nis2", label: "NIS2", desc: "Cybersicherheitspflichten für wesentliche und wichtige Einrichtungen." },
    { href: "/iso-27001", label: "ISO 27001", desc: "Der etablierte Nachweis für den 'Stand der Technik'." },
    { href: "/penetration-testing", label: "Penetrationstest", desc: "Manuelle Angriffssimulation für Web, API, Netzwerk & mehr." },
  ],
  relatedHeading: "Verwandte Themen",
  relatedSubtext: "Datenschutz und Informationssicherheit greifen ineinander. Sehen Sie sich verwandte Pflichten an.",
  ctaTitle: "DSGVO-konform – nachweisbar.",
  ctaText: "Kostenlose Erstberatung – wir zeigen Ihnen, wie ein Penetrationstest Ihre technischen Maßnahmen nach Art. 32 belegt.",
};

export default function Page() {
  return <RegulationPage data={data} />;
}
