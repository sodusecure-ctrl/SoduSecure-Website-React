import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "DSGVO-Penetrationstest – Art. 32 nachweisen | SODU Secure",
  description:
    "DSGVO Art. 32 verlangt regelmäßige Überprüfung technischer Maßnahmen. Wir liefern den Penetrationstest als Wirksamkeitsnachweis – Festpreis ab 2.500 €.",
  alternates: { canonical: "/dsgvo-penetrationstest" },
};

const data: RegulationContent = {
  slug: "dsgvo-penetrationstest",
  badgeIcon: "lock",
  badgeText: "DSGVO Art. 32 · Datenschutz · Art. 83",
  title: "DSGVO-Penetrationstest",
  titleAccent: "Technische Maßnahmen nach Art. 32 nachweisen",
  heroIntro:
    "Die DSGVO verlangt nicht nur Sicherheitsmaßnahmen, sondern auch deren regelmäßige Überprüfung. Ein Penetrationstest ist der etablierte Nachweis, dass Ihre technischen und organisatorischen Maßnahmen (TOM) nach Art. 32 wirksam sind – manuell von OSCP-zertifizierten Hackern, Festpreis ab 2.500 €.",
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
    { q: "Schreibt die DSGVO einen Penetrationstest vor?", a: "Die DSGVO nennt keinen Penetrationstest namentlich. Art. 32 Abs. 1 lit. d verlangt aber ein Verfahren zur regelmäßigen Überprüfung der Wirksamkeit der Sicherheitsmaßnahmen. Ein Penetrationstest ist das etablierte und anerkannte Mittel, diese Anforderung technisch zu erfüllen." },
    { q: "Wie oft sollte man einen DSGVO-Penetrationstest durchführen?", a: "Üblich ist mindestens einmal jährlich sowie nach wesentlichen Änderungen an Systemen, die personenbezogene Daten verarbeiten. Die genaue Frequenz richtet sich nach dem Risiko der Verarbeitung." },
    { q: "Was kostet ein DSGVO-Penetrationstest?", a: "Ein fokussierter Test startet bei SODU Secure ab 2.500 € als Festpreis. Der genaue Preis hängt vom Umfang der datenverarbeitenden Systeme ab – nutzen Sie unseren Pentest-Konfigurator für eine Einordnung." },
    { q: "Hilft der Bericht bei einem Datenschutz-Audit?", a: "Ja. Unser Bericht dokumentiert die geprüften Maßnahmen, gefundene Schwachstellen und deren Behebung mit CVSS-Bewertung – geeignet als Nachweis gegenüber Aufsichtsbehörden und im Rahmen von Auftragsverarbeitungs-Audits." },
    { q: "Gilt das auch für Auftragsverarbeiter?", a: "Ja. Art. 32 verpflichtet ausdrücklich auch Auftragsverarbeiter. Viele Auftraggeber verlangen vertraglich einen Nachweis wirksamer technischer Maßnahmen – ein Penetrationstest liefert ihn." },
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
