import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "BSIG §8a Pentest & KRITIS-Nachweis | SODU Secure",
  description:
    "Was fordert das BSI-Gesetz (BSIG) von KRITIS-Betreibern? § 8a Nachweis alle zwei Jahre, Meldepflichten und Stand der Technik – wir prüfen Ihre Systeme und bereiten den Nachweis vor.",
  alternates: { canonical: "/bsig" },
};

const data: RegulationContent = {
  slug: "bsig",
  badgeIcon: "landmark",
  badgeText: "BSIG · KRITIS · § 8a BSIG",
  title: "BSIG",
  titleAccent: "Sicherheit für Kritische Infrastrukturen",
  heroIntro:
    "Das BSI-Gesetz verpflichtet KRITIS-Betreiber, IT-Sicherheit nach dem Stand der Technik umzusetzen und alle zwei Jahre nachzuweisen. Wir liefern die technischen Prüfungen und bereiten Ihren § 8a-Nachweis vor.",
  heroPrimaryCta: "Kostenlose KRITIS-Erstberatung",
  heroSecondary: { href: "/penetration-testing", label: "Mehr zum Penetrationstest" },
  whatIs: {
    title: "Was ist das BSIG?",
    paragraphs: [
      "Das BSI-Gesetz (Gesetz über das Bundesamt für Sicherheit in der Informationstechnik, BSIG) ist die zentrale rechtliche Grundlage für die IT-Sicherheit Kritischer Infrastrukturen (KRITIS) in Deutschland. Welche Anlagen als KRITIS gelten, regelt die BSI-Kritisverordnung (BSI-KritisV) über sektorspezifische Schwellenwerte.",
      "Kernstück ist § 8a BSIG: Betreiber müssen angemessene organisatorische und technische Vorkehrungen nach dem Stand der Technik treffen und deren Umsetzung mindestens alle zwei Jahre gegenüber dem BSI nachweisen. § 8b regelt zudem die Meldepflicht bei erheblichen Störungen.",
    ],
  },
  facts: [
    { label: "Rechtsgrundlage", value: "BSI-Gesetz (BSIG)" },
    { label: "Nachweis nach § 8a", value: "Alle 2 Jahre" },
    { label: "Schwellenwerte", value: "BSI-KritisV" },
  ],
  obligations: {
    title: "Welche Pflichten bringt",
    accent: "das BSIG mit sich?",
    intro:
      "KRITIS-Betreiber stehen in der Nachweispflicht. Das BSI kann Mängel beanstanden und deren Beseitigung verlangen – ein technischer Sicherheitsnachweis ist daher unverzichtbar.",
    points: [
      "Angemessene technische und organisatorische Sicherheitsmaßnahmen nach dem Stand der Technik (§ 8a Abs. 1)",
      "Nachweis der Umsetzung gegenüber dem BSI mindestens alle zwei Jahre (§ 8a Abs. 3)",
      "Meldepflicht bei erheblichen IT-Störungen an das BSI (§ 8b)",
      "Einsatz von Systemen zur Angriffserkennung (SzA) für viele Betreiber verpflichtend",
    ],
    sidebarTitle: "Der Weg zum § 8a-Nachweis",
    steps: [
      { label: "KRITIS-Einstufung", sub: "Fällt Ihre Anlage unter die Schwellenwerte der BSI-KritisV?" },
      { label: "Gap-Analyse", sub: "Abgleich gegen Stand der Technik und branchenspezifische Standards (B3S)" },
      { label: "Technische Prüfung", sub: "Penetrationstests und Schwachstellenanalyse der kritischen Systeme" },
      { label: "Mängel beheben", sub: "Lücken schließen und Maßnahmen dokumentieren" },
      { label: "Nachweis einreichen", sub: "Prüfung vorbereiten und Nachweis gegenüber dem BSI erbringen" },
    ],
  },
  servicesTitle: "Wie wir Ihren KRITIS-Nachweis vorbereiten",
  servicesIntro:
    "Wir liefern die technische Substanz für Ihren § 8a-Nachweis: realistische Sicherheitstests Ihrer kritischen Systeme und prüffähige Berichte.",
  services: [
    { icon: "fileSearch", title: "KRITIS Gap-Analyse", desc: "Abgleich Ihrer Sicherheitsmaßnahmen gegen den Stand der Technik und – sofern vorhanden – Ihren branchenspezifischen Sicherheitsstandard (B3S)." },
    { icon: "search", title: "Penetrationstests", desc: "Manuelle Sicherheitsprüfung Ihrer IT- und OT-nahen Systeme, Netzwerke und Anwendungen – als technischer Nachweis Ihres Sicherheitsniveaus." },
    { icon: "network", title: "Prüfung der Angriffserkennung", desc: "Wir bewerten Ihre Systeme zur Angriffserkennung (SzA) und Ihre Fähigkeit, Angriffe zu erkennen und darauf zu reagieren." },
    { icon: "clipboard", title: "Nachweis & Reporting", desc: "Revisionssichere Berichte mit Risikobewertung und Maßnahmenplan – als Grundlage für Ihren § 8a-Nachweis gegenüber dem BSI." },
  ],
  whoForTitle: "Wer ist KRITIS-Betreiber?",
  whoForIntro:
    "KRITIS umfasst Anlagen, deren Ausfall zu erheblichen Versorgungsengpässen oder Gefährdungen führen würde – definiert über Sektoren und Schwellenwerte.",
  whoFor: [
    { icon: "factory", title: "Energie & Wasser", desc: "Strom-, Gas-, Kraftstoff- und Wasserversorgung sowie Entsorgung." },
    { icon: "heart", title: "Gesundheit & Ernährung", desc: "Kliniken, Labore, Arzneimittelversorgung und Lebensmittelversorgung." },
    { icon: "landmark", title: "Finanz & Versicherung", desc: "Banken, Börsen, Versicherungen und Zahlungsverkehrsdienstleister." },
    { icon: "network", title: "IT, TK & Transport", desc: "Informationstechnik, Telekommunikation, Verkehr und Logistik." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Einstufung", desc: "Kostenlos: Wir klären Ihre KRITIS-Betroffenheit und den Umfang des Nachweises.", icon: "message" },
    { step: "02", title: "Gap-Analyse", desc: "Soll-Ist-Abgleich gegen den Stand der Technik und branchenspezifische Standards.", icon: "fileSearch" },
    { step: "03", title: "Penetrationstest", desc: "Technische Sicherheitsprüfung Ihrer kritischen Systeme, Netzwerke und Anwendungen.", icon: "target" },
    { step: "04", title: "Bericht & Maßnahmen", desc: "Detaillierter Bericht mit CVSS-Bewertung und priorisierten Handlungsempfehlungen.", icon: "clipboard" },
    { step: "05", title: "Nachweis & Re-Test", desc: "Vorbereitung des § 8a-Nachweises und kostenloser Retest nach Behebung der Findings.", icon: "award" },
  ],
  faqs: [
    { q: "Was ist der § 8a-Nachweis?", a: "Nach § 8a Abs. 3 BSIG müssen KRITIS-Betreiber dem BSI mindestens alle zwei Jahre nachweisen, dass sie angemessene Sicherheitsvorkehrungen nach dem Stand der Technik umgesetzt haben. Der Nachweis erfolgt typischerweise über Audits, Prüfungen oder Zertifizierungen – Penetrationstests sind ein wichtiger technischer Baustein." },
    { q: "Woran erkenne ich, ob ich KRITIS-Betreiber bin?", a: "Maßgeblich sind die Sektoren und Schwellenwerte der BSI-Kritisverordnung (BSI-KritisV). Wird ein Schwellenwert (z.B. versorgte Personen, Anlagengröße) überschritten, gilt die Anlage als Kritische Infrastruktur. In unserer Erstberatung helfen wir bei der Einordnung." },
    { q: "Wie hängt das BSIG mit NIS2 zusammen?", a: "NIS2 erweitert den Kreis der regulierten Unternehmen deutlich über die klassischen KRITIS hinaus. In Deutschland werden die NIS2-Anforderungen über das NIS2-Umsetzungsgesetz in das BSIG integriert. Viele Betreiber müssen daher künftig sowohl KRITIS- als auch NIS2-Pflichten erfüllen." },
    { q: "Sind Penetrationstests für den Nachweis Pflicht?", a: "Das BSIG verlangt Maßnahmen „nach dem Stand der Technik\". Penetrationstests sind die etablierte Methode, um die Wirksamkeit dieser Maßnahmen technisch zu belegen und Schwachstellen vor Angreifern zu finden – und damit ein zentraler Bestandteil eines belastbaren Nachweises." },
    { q: "Was droht bei fehlendem Nachweis?", a: "Das BSI kann die Beseitigung von Sicherheitsmängeln anordnen und Verstöße mit Bußgeldern ahnden. Wichtiger noch: Ohne wirksame Maßnahmen steigt das reale Risiko von Ausfällen kritischer Versorgung erheblich." },
  ],
  related: [
    { href: "/nis2", label: "NIS2", desc: "Erweiterte Cybersicherheitspflichten für wesentliche und wichtige Einrichtungen." },
    { href: "/dora", label: "DORA", desc: "Digitale operationale Resilienz für den Finanzsektor." },
    { href: "/iso-27001", label: "ISO 27001", desc: "Internationaler Standard für Informationssicherheits-Managementsysteme." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
