import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "MDR & Cybersecurity für Medizinprodukte | SODU Secure",
  description:
    "Was verlangt die MDR (EU 2017/745) zur Cybersicherheit? Security-Tests für Medizinprodukte-Software nach MDCG 2019-16, IEC 62304 & 81001-5-1 – wir unterstützen Hersteller.",
  alternates: { canonical: "/mdr" },
};

const data: RegulationContent = {
  slug: "mdr",
  badgeIcon: "heart",
  badgeText: "MDR · EU 2017/745 · MDCG 2019-16",
  title: "MDR",
  titleAccent: "Cybersicherheit für Medizinprodukte",
  heroIntro:
    "Die EU-Medizinprodukteverordnung verlangt nachweisbare IT-Sicherheit für Medizinprodukte mit Software. Wir testen Ihre Geräte- und App-Software so, dass sie der Cybersicherheits-Bewertung der Benannten Stelle standhält.",
  heroPrimaryCta: "Kostenlose MDR-Erstberatung",
  heroSecondary: { href: "/bsi-tr-03161", label: "BSI TR-03161 für DiGA" },
  whatIs: {
    title: "Was ist die MDR?",
    paragraphs: [
      "Die MDR (Medical Device Regulation, Verordnung (EU) 2017/745) ist die EU-weite Verordnung für Medizinprodukte und gilt verbindlich seit dem 26. Mai 2021. Sie umfasst ausdrücklich auch Software als Medizinprodukt (Software as a Medical Device, SaMD).",
      "Anhang I der MDR fordert in den grundlegenden Sicherheits- und Leistungsanforderungen (insbesondere Ziffer 17.2) IT-Sicherheit über den gesamten Produktlebenszyklus. Die konkrete Auslegung erfolgt über die Leitlinie MDCG 2019-16 sowie die Normen IEC 62304 und IEC 81001-5-1.",
    ],
  },
  facts: [
    { label: "Rechtsgrundlage", value: "EU 2017/745" },
    { label: "Gilt seit", value: "26. Mai 2021" },
    { label: "Leitlinie", value: "MDCG 2019-16" },
  ],
  penalties: {
    title: "Was passiert ohne MDR-Cybersicherheitsnachweis?",
    intro:
      "Die Cybersicherheit ist Teil der grundlegenden Sicherheits- und Leistungsanforderungen. Ohne Nachweis riskieren Hersteller den Marktzugang, behördliche Eingriffe und Haftung.",
    items: [
      {
        value: "Keine CE-Kennzeichnung",
        label: "Kein Marktzugang",
        desc: "Ohne belastbaren Sicherheitsnachweis verweigert die Benannte Stelle die Konformitätsbewertung – das Produkt darf nicht in Verkehr gebracht werden.",
      },
      {
        value: "Rückruf & Marktrücknahme",
        label: "Behördliche Eingriffe",
        desc: "Zuständige Behörden können Produkte vom Markt nehmen, Rückrufe anordnen und den Vertrieb untersagen, wenn Sicherheitsanforderungen nicht erfüllt sind.",
      },
      {
        value: "Bußgelder & Haftung",
        label: "Sanktionen nach MPDG",
        desc: "Verstöße werden in Deutschland nach dem Medizinprodukterecht-Durchführungsgesetz (MPDG) geahndet – zzgl. Produkthaftung bei Schäden durch unsichere Software.",
      },
    ],
  },
  obligations: {
    title: "Welche Cybersecurity-Pflichten bringt",
    accent: "die MDR mit sich?",
    intro:
      "Hersteller müssen Cybersicherheit „by design\" umsetzen und über den gesamten Lebenszyklus aufrechterhalten. Die Benannte Stelle prüft diese Nachweise im Rahmen der Konformitätsbewertung.",
    points: [
      "IT-Sicherheitsanforderungen nach Anhang I (GSPR 17.2) – Schutz vor unbefugtem Zugriff und Manipulation",
      "Security im gesamten Software-Lebenszyklus gemäß IEC 62304 und IEC 81001-5-1",
      "Bedrohungsanalyse (Threat Modeling) und Risikomanagement nach MDCG 2019-16",
      "Technische Dokumentation mit Nachweis der Sicherheitsverifizierung für die Benannte Stelle",
    ],
    sidebarTitle: "Der Weg zur MDR-Konformität",
    steps: [
      { label: "Threat Modeling", sub: "Bedrohungen und Angriffsflächen Ihres Produkts systematisch erfassen" },
      { label: "Gap-Analyse", sub: "Abgleich gegen MDCG 2019-16 und die relevanten Normen" },
      { label: "Security-Test / Pentest", sub: "Technische Prüfung von Gerät, App und Backend" },
      { label: "Findings beheben", sub: "Schwachstellen schließen und Maßnahmen verifizieren" },
      { label: "Dokumentation", sub: "Prüfnachweise für die technische Dokumentation und Benannte Stelle" },
    ],
  },
  servicesTitle: "Wie wir Medizinprodukte-Software absichern",
  servicesIntro:
    "Wir kombinieren Penetrationstests mit dem regulatorischen Blick auf MDCG 2019-16 – damit Ihre Sicherheitsnachweise bei der Benannten Stelle bestehen.",
  services: [
    { icon: "target", title: "Threat Modeling", desc: "Strukturierte Bedrohungsanalyse Ihres Medizinprodukts nach MDCG 2019-16 – Grundlage für ein belastbares Sicherheitskonzept." },
    { icon: "search", title: "Penetrationstest", desc: "Manuelle Sicherheitstests von Geräte-Firmware, Mobile App, Web-Portal und Backend-APIs – inklusive Schnittstellen und Kommunikation." },
    { icon: "fileSearch", title: "Gap-Analyse MDCG 2019-16", desc: "Abgleich Ihrer Sicherheitsmaßnahmen gegen die Cybersecurity-Leitlinie und die Normen IEC 62304 / IEC 81001-5-1." },
    { icon: "clipboard", title: "Nachweise für die Tech-Doku", desc: "Prüfberichte und Verifizierungsnachweise, die Sie direkt in Ihre technische Dokumentation für die Benannte Stelle übernehmen können." },
  ],
  whoForTitle: "Für wen ist das?",
  whoForIntro:
    "Unsere MDR-Sicherheitsprüfung richtet sich an alle Hersteller von Medizinprodukten mit Software-Anteil.",
  whoFor: [
    { icon: "stethoscope", title: "Medizingerätehersteller", desc: "Hersteller vernetzter Geräte mit Firmware, Funk- oder Netzwerkschnittstellen." },
    { icon: "heart", title: "SaMD-Hersteller", desc: "Anbieter von Software als Medizinprodukt – Web, Mobile oder Cloud." },
    { icon: "briefcase", title: "MedTech-Startups", desc: "Junge Unternehmen, die früh auf sichere Entwicklung und Zulassbarkeit setzen." },
    { icon: "users", title: "Entwicklungsdienstleister", desc: "Dienstleister, die Medizinprodukte-Software für Dritte entwickeln und Sicherheit nachweisen müssen." },
  ],
  process: [
    { step: "01", title: "Erstgespräch", desc: "Kostenlos: Wir verstehen Ihr Produkt, die Risikoklasse und den regulatorischen Rahmen.", icon: "message" },
    { step: "02", title: "Threat Modeling & Gap-Analyse", desc: "Bedrohungsanalyse und Abgleich gegen MDCG 2019-16 sowie die relevanten Normen.", icon: "fileSearch" },
    { step: "03", title: "Security-Test / Pentest", desc: "Technische Prüfung von Gerät, App, Backend und Schnittstellen nach realistischen Angriffsszenarien.", icon: "target" },
    { step: "04", title: "Bericht & Empfehlungen", desc: "Detaillierter Prüfbericht mit CVSS-Bewertung und konkreten Handlungsempfehlungen.", icon: "clipboard" },
    { step: "05", title: "Dokumentation & Re-Test", desc: "Verifizierungsnachweise für die Tech-Doku und kostenloser Retest nach Behebung.", icon: "award" },
  ],
  faqs: [
    { q: "Verlangt die MDR wirklich Cybersicherheit?", a: "Ja. Anhang I der MDR fordert in den grundlegenden Sicherheits- und Leistungsanforderungen (u.a. Ziffer 17.2) ausdrücklich IT-Sicherheit für Produkte mit Software. Die Cybersicherheits-Leitlinie MDCG 2019-16 konkretisiert, wie Hersteller dies umsetzen und nachweisen." },
    { q: "Sind Sie eine Benannte Stelle?", a: "Nein. Die Konformitätsbewertung und CE-Kennzeichnung erfolgt durch eine Benannte Stelle. Wir liefern die technischen Sicherheitsprüfungen und Nachweise, die Sie für die technische Dokumentation und das Audit benötigen – und bereiten Sie optimal darauf vor." },
    { q: "Welche Normen sind relevant?", a: "Zentral sind die Leitlinie MDCG 2019-16 (Cybersecurity für Medizinprodukte) sowie die Normen IEC 62304 (Software-Lebenszyklus) und IEC 81001-5-1 (Security im Lebenszyklus von Health-Software). Unsere Prüfmethodik orientiert sich an diesen Vorgaben und an OWASP." },
    { q: "Was wird beim Pentest geprüft?", a: "Je nach Produkt prüfen wir Geräte-Firmware und -Schnittstellen, Mobile Apps, Web-Portale, Backend-APIs sowie die Kommunikation und Datenhaltung – mit Fokus auf Authentifizierung, Verschlüsselung, Zugriffskontrolle und Manipulationsschutz." },
    { q: "Wie lange dauert eine MDR-Sicherheitsprüfung?", a: "Je nach Umfang und Komplexität typischerweise 2–4 Wochen. Eine erste Gap-Analyse und ein Threat Modeling lassen sich oft innerhalb von 1–2 Wochen umsetzen." },
  ],
  related: [
    { href: "/bsi-tr-03161", label: "BSI TR-03161", desc: "Sicherheitsanforderungen für digitale Gesundheitsanwendungen (DiGA/DiPA)." },
    { href: "/pentest-gesundheitsanwendungen", label: "Pentest Gesundheit", desc: "Penetrationstests speziell für Gesundheitsanwendungen." },
    { href: "/iso-27001", label: "ISO 27001", desc: "Internationaler Standard für Informationssicherheit." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
