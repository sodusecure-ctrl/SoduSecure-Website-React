import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "ISO 27001: Zertifizierung, Anforderungen & Pentest",
  description:
    "Was ist ISO 27001? Anforderungen, Ablauf der Zertifizierung und die Rolle von Penetrationstests. Wir bringen Sie mit Gap-Analyse, Pentests und prüffähigen Nachweisen zur ISO-27001-Konformität.",
  alternates: { canonical: "/iso-27001" },
};

const data: RegulationContent = {
  slug: "iso-27001",
  sourcesIntro: [
    "ISO/IEC 27001:2022 fordert in Control A.8.8 das systematische Management technischer Schwachstellen. Zertifizierungsauditoren akzeptieren aktuelle Penetrationstest-Berichte als Nachweis, dass Schwachstellen identifiziert, bewertet und behandelt werden."
  ],
  sources: [
    {
      "label": "ISO/IEC 27001 – offizielle Normseite",
      "url": "https://www.iso.org/standard/27001"
    },
    {
      "label": "OWASP Top 10",
      "url": "https://owasp.org/www-project-top-ten/"
    }
  ],
  badgeIcon: "shield",
  badgeText: "ISO/IEC 27001 · ISMS · International zertifizierbar",
  title: "ISO 27001",
  titleAccent: "Informationssicherheit nachweisbar zertifiziert",
  heroIntro:
    "ISO 27001 ist der weltweit führende Standard für Informationssicherheits-Managementsysteme (ISMS). Wir bringen Sie technisch und organisatorisch zur Zertifizierung – mit Gap-Analyse, Penetrationstests und prüffähigen Nachweisen.",
  heroPrimaryCta: "Kostenlose ISO-27001-Erstberatung",
  whatIs: {
    title: "Was ist ISO 27001?",
    paragraphs: [
      "ISO/IEC 27001 ist die international anerkannte Norm für Informationssicherheits-Managementsysteme (ISMS). Sie definiert, wie Organisationen Informationssicherheit systematisch aufbauen, betreiben und kontinuierlich verbessern – risikobasiert und über alle Bereiche hinweg.",
      "Anders als reine Leitfäden ist ISO 27001 zertifizierbar: Eine akkreditierte Zertifizierungsstelle prüft Ihr ISMS und stellt ein für drei Jahre gültiges Zertifikat aus. Der Anhang A der Fassung von 2022 umfasst 93 Sicherheitsmaßnahmen in vier Themenfeldern – organisatorisch, personenbezogen, physisch und technologisch.",
    ],
  },
  facts: [
    { label: "Norm", value: "ISO/IEC 27001:2022" },
    { label: "Maßnahmen (Anhang A)", value: "93 Controls" },
    { label: "Zertifikat gültig", value: "3 Jahre" },
  ],
  penalties: {
    title: "Was passiert ohne ISO 27001?",
    intro:
      "ISO 27001 ist eine freiwillige Zertifizierung – es gibt keine direkte Geldstrafe für das Fehlen. Die Konsequenzen sind wirtschaftlich und treffen Sie meist indirekt über Verträge und andere Gesetze.",
    items: [
      {
        value: "Verlorene Aufträge",
        label: "Ausschluss bei Ausschreibungen",
        desc: "Im B2B-Geschäft und im öffentlichen Sektor ist ISO 27001 häufig Pflichtkriterium. Ohne Zertifikat scheitern Sie an Ausschreibungen und Lieferanten-Audits.",
      },
      {
        value: "Indirekter Gesetzesdruck",
        label: "DSGVO, NIS2 & Co.",
        desc: "DSGVO (Art. 32), NIS2 und BSI-Grundschutz verlangen den 'Stand der Technik'. ISO 27001 ist der etablierte Nachweis – fehlt er, steigt das Bußgeldrisiko aus diesen Gesetzen.",
      },
      {
        value: "Entzug des Zertifikats",
        label: "Bei Mängeln im Audit",
        desc: "Schwere Abweichungen in den jährlichen Überwachungsaudits können zur Aussetzung oder zum Entzug des Zertifikats führen – mit unmittelbarem Vertrauens- und Wettbewerbsverlust.",
      },
    ],
  },
  obligations: {
    title: "Welche Anforderungen stellt",
    accent: "ISO 27001?",
    intro:
      "ISO 27001 verlangt ein gelebtes Managementsystem: von der Risikoanalyse über dokumentierte Richtlinien bis zur regelmäßigen Wirksamkeitsprüfung der Maßnahmen.",
    points: [
      "ISMS mit definiertem Geltungsbereich, Sicherheitszielen und Verantwortung der Leitung",
      "Systematische Risikobewertung und -behandlung mit Statement of Applicability (SoA)",
      "Umsetzung der einschlägigen Maßnahmen aus Anhang A (93 Controls in 4 Themen)",
      "Nachweis der Wirksamkeit – u. a. durch interne Audits, Management-Review und Penetrationstests (Control 8.29)",
    ],
    sidebarTitle: "Der Weg zum ISO-27001-Zertifikat",
    steps: [
      { label: "Gap-Analyse", sub: "Soll-Ist-Abgleich gegen Norm und Anhang A" },
      { label: "ISMS aufbauen", sub: "Risikoanalyse, Richtlinien, SoA und Prozesse etablieren" },
      { label: "Technische Prüfung", sub: "Penetrationstests als Wirksamkeitsnachweis der Controls" },
      { label: "Internes Audit", sub: "Eigenprüfung und Management-Review vor der Zertifizierung" },
      { label: "Zertifizierungsaudit", sub: "Stufe 1 & 2 durch eine akkreditierte Zertifizierungsstelle" },
    ],
  },
  servicesTitle: "Wie wir Sie ISO-27001-konform machen",
  servicesIntro:
    "Wir besetzen den technischen Kern der Zertifizierung: Wir prüfen die Wirksamkeit Ihrer Sicherheitsmaßnahmen und liefern die prüffähigen Nachweise, die Auditoren sehen wollen.",
  services: [
    { icon: "fileSearch", title: "ISO-27001 Gap-Analyse", desc: "Strukturierter Abgleich Ihres aktuellen Sicherheitsstands gegen die Normanforderungen und die Maßnahmen aus Anhang A – mit priorisiertem Maßnahmenplan." },
    { icon: "search", title: "Penetrationstests", desc: "Manuelle Sicherheitstests Ihrer Anwendungen, APIs, Netzwerke und Infrastruktur – als technischer Wirksamkeitsnachweis für Control 8.29 / 8.8." },
    { icon: "shield", title: "Technische Maßnahmenberatung", desc: "Konkrete Empfehlungen zur Umsetzung der technischen Controls – von Zugriffskontrolle über Kryptographie bis Logging und Monitoring." },
    { icon: "clipboard", title: "Audit-Nachweise & Retest", desc: "Revisionssichere Prüfberichte mit CVSS-Bewertung und kostenloser Retest nach Behebung – direkt verwendbar für das Zertifizierungsaudit." },
  ],
  whoForTitle: "Für wen lohnt sich ISO 27001?",
  whoForIntro:
    "ISO 27001 ist branchenübergreifend anwendbar – vom Start-up bis zum Konzern, On-Premise wie in der Cloud.",
  whoFor: [
    { icon: "server", title: "IT- & SaaS-Unternehmen", desc: "Software-Häuser und Cloud-Anbieter, die Kunden und Partnern Sicherheit nachweisen müssen." },
    { icon: "briefcase", title: "B2B-Dienstleister", desc: "Unternehmen, die in Ausschreibungen und Lieferketten ein anerkanntes Sicherheitszertifikat brauchen." },
    { icon: "landmark", title: "Finanz & Versicherung", desc: "Stark regulierte Branchen, in denen ISO 27001 Erwartung von Aufsicht und Kunden ist." },
    { icon: "building", title: "KMU & Mittelstand", desc: "Wachsende Unternehmen, die Informationssicherheit strukturiert und nachweisbar aufstellen wollen." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir klären Geltungsbereich, Ausgangslage und den schnellsten Weg zum Zertifikat.", icon: "message" },
    { step: "02", title: "Gap-Analyse", desc: "Systematischer Soll-Ist-Abgleich gegen ISO 27001 und die Maßnahmen aus Anhang A.", icon: "fileSearch" },
    { step: "03", title: "Technische Sicherheitsprüfung", desc: "Penetrationstests und Schwachstellenanalyse als Wirksamkeitsnachweis Ihrer Controls.", icon: "target" },
    { step: "04", title: "Bericht & Maßnahmenplan", desc: "Detaillierter Bericht mit CVSS-Bewertung und priorisierten, umsetzbaren Empfehlungen.", icon: "clipboard" },
    { step: "05", title: "Begleitung zum Audit", desc: "Unterstützung bis zum Zertifizierungsaudit und kostenloser Retest nach Behebung der Findings.", icon: "award" },
  ],
  faqs: [
    { q: "Ist ISO 27001 Pflicht?", a: "ISO 27001 ist grundsätzlich freiwillig. In vielen Branchen und Ausschreibungen ist das Zertifikat aber faktische Voraussetzung, und Gesetze wie DSGVO, NIS2 und BSI-Grundschutz verlangen Maßnahmen, die sich mit ISO 27001 nachweisen lassen." },
    { q: "Schreibt ISO 27001 Penetrationstests vor?", a: "Die Norm verlangt den Nachweis der Wirksamkeit technischer Maßnahmen. Control 8.29 (Sicherheitstests) und 8.8 (Umgang mit technischen Schwachstellen) machen Penetrationstests zum etablierten Mittel, dieses Sicherheitsniveau zu belegen – üblicherweise mindestens einmal jährlich." },
    { q: "Wie lange dauert die Zertifizierung?", a: "Typischerweise 6–12 Monate, abhängig vom Reifegrad Ihrer bestehenden Sicherheit. Eine erste Gap-Analyse lässt sich meist innerhalb von 1–2 Wochen durchführen." },
    { q: "Wie viele Maßnahmen umfasst ISO 27001?", a: "Die Fassung ISO/IEC 27001:2022 enthält in Anhang A 93 Sicherheitsmaßnahmen, gegliedert in vier Themen: organisatorisch, personenbezogen, physisch und technologisch. Welche davon gelten, bestimmt Ihre Risikobewertung (Statement of Applicability)." },
    { q: "Sind Sie eine Zertifizierungsstelle?", a: "Nein. Das Zertifikat stellt eine akkreditierte Zertifizierungsstelle (z. B. TÜV, DEKRA, DQS) aus. Wir liefern die technischen Prüfungen und Nachweise und bereiten Sie so vor, dass Sie das Audit bestehen." },
  ],
  related: [
    { href: "/iso-27001-zertifizierung", label: "ISO 27001 Zertifizierung", desc: "Ablauf, Kosten und Pentest-Anforderungen der Zertifizierung." },
    { href: "/tisax", label: "TISAX", desc: "Automotive-Informationssicherheit auf Basis der ISO/IEC 27001 (VDA-ISA)." },
    { href: "/nis2", label: "NIS2", desc: "Cybersicherheitspflichten – häufig mit ISO 27001 nachweisbar." },
    { href: "/dora", label: "DORA", desc: "Digitale operationale Resilienz im Finanzsektor." },
    { href: "/bsig", label: "BSIG / KRITIS", desc: "Anforderungen an Betreiber Kritischer Infrastrukturen." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
