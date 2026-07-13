import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "BSI TR-03161: Sicherheit für DiGA & DiPA",
  description:
    "Was verlangt die BSI TR-03161? Sicherheitsanforderungen für digitale Gesundheitsanwendungen (DiGA/DiPA), Pflicht seit 2025 (§ 139e SGB V). Wir bereiten Sie mit Gap-Analyse und Pentest auf die Zertifizierung vor.",
  alternates: { canonical: "/bsi-tr-03161" },
};

const data: RegulationContent = {
  slug: "bsi-tr-03161",
  badgeIcon: "heart",
  badgeText: "BSI TR-03161 · DiGA & DiPA · § 139e SGB V",
  title: "BSI TR-03161",
  titleAccent: "Sicherheit für digitale Gesundheitsanwendungen",
  heroIntro:
    "Die Technische Richtlinie BSI TR-03161 definiert verbindliche Sicherheitsanforderungen für digitale Gesundheitsanwendungen. Wir bereiten Ihre DiGA/DiPA mit Gap-Analyse und Penetrationstests optimal auf die offizielle Zertifizierung vor.",
  heroPrimaryCta: "Kostenlose TR-03161-Erstberatung",
  whatIs: {
    title: "Was ist die BSI TR-03161?",
    paragraphs: [
      "Die TR-03161 ist eine Technische Richtlinie des Bundesamts für Sicherheit in der Informationstechnik (BSI). Sie definiert verbindliche Sicherheitsanforderungen für digitale Gesundheitsanwendungen und gliedert sich in drei Teile: mobile Anwendungen, Web-Anwendungen und Hintergrundsysteme (Backends/APIs).",
      "Seit 2025 ist der Nachweis der Konformität gesetzlich vorgeschrieben, um in das DiGA-Verzeichnis des BfArM aufgenommen zu werden (Grundlage: DiGAV, § 139e SGB V). Methodisch baut die Richtlinie auf etablierten OWASP-Standards auf – MASVS, MASTG und ASVS.",
    ],
  },
  facts: [
    { label: "Herausgeber", value: "BSI" },
    { label: "Pflicht seit", value: "2025 (DiGA)" },
    { label: "Grundlage", value: "§ 139e SGB V / DiGAV" },
  ],
  penalties: {
    title: "Was passiert ohne TR-03161-Nachweis?",
    intro:
      "Ohne den Sicherheitsnachweis nach TR-03161 bleibt Ihrer Anwendung der regulierte Gesundheitsmarkt verschlossen – mit unmittelbaren wirtschaftlichen Folgen.",
    items: [
      {
        value: "Keine DiGA-Aufnahme",
        label: "Ausschluss vom Verzeichnis",
        desc: "Ohne TR-03161-Konformität wird Ihre Anwendung nicht in das DiGA-Verzeichnis des BfArM aufgenommen.",
      },
      {
        value: "Keine Erstattung",
        label: "Kein Kassenmarkt",
        desc: "Nur gelistete DiGA sind verordnungs- und erstattungsfähig durch die gesetzlichen Krankenkassen – ohne Listung entfällt dieser gesamte Markt.",
      },
      {
        value: "Verzögerung & Kosten",
        label: "Teure Nachbesserung",
        desc: "Werden Sicherheitslücken erst in der offiziellen Prüfung gefunden, drohen Ablehnung, erneute Prüfungen und monatelange Verzögerungen beim Marktstart.",
      },
    ],
  },
  obligations: {
    title: "Welche Anforderungen stellt",
    accent: "die TR-03161?",
    intro:
      "Hersteller müssen Sicherheit über die gesamte Anwendung nachweisen – von der mobilen App über das Web-Frontend bis zu Backend und Schnittstellen.",
    points: [
      "Sicherheitsanforderungen für mobile Apps (Teil 1) nach OWASP MASVS / MASTG",
      "Prüfaspekte für Web-Anwendungen (Teil 2) nach OWASP ASVS",
      "Sicherheit der Hintergrundsysteme (Teil 3): Authentifizierung, Kryptographie, Datenhaltung, APIs",
      "Nachweis durch Zertifikat einer BSI-anerkannten Prüfstelle als Voraussetzung für die DiGA-Listung",
    ],
    sidebarTitle: "Der Weg ins DiGA-Verzeichnis",
    steps: [
      { label: "Entwicklung", sub: "DiGA/DiPA nach Sicherheitsstandards entwickeln" },
      { label: "Gap-Analyse", sub: "Abgleich gegen alle Prüfaspekte der TR-03161" },
      { label: "Sicherheitsprüfung", sub: "Penetrationstests von App, Web und Backend (wir bereiten Sie vor)" },
      { label: "Zertifizierung", sub: "Offizielle Prüfung durch eine BSI-anerkannte Stelle" },
      { label: "BfArM-Antrag", sub: "Aufnahme ins DiGA-Verzeichnis und Erstattungsfähigkeit" },
    ],
  },
  servicesTitle: "Was wir konkret anbieten",
  servicesIntro:
    "Vorbereitende Sicherheitsprüfungen nach den Prüfaspekten der TR-03161 – von der Gap-Analyse bis zur Begleitung in die offizielle Zertifizierung.",
  services: [
    { icon: "fileSearch", title: "Gap-Analyse", desc: "Systematische Prüfung Ihrer Anwendung gegen alle Prüfaspekte der TR-03161 – wir zeigen konkret, wo Handlungsbedarf besteht." },
    { icon: "search", title: "Schwachstellenanalyse & Pentest", desc: "Technische Sicherheitsprüfung nach den Bedrohungsszenarien der TR-03161, orientiert an OWASP MASVS, MASTG und ASVS." },
    { icon: "clipboard", title: "Beratung zur Umsetzung", desc: "Konkrete, priorisierte Empfehlungen und Unterstützung bei der technischen Umsetzung der Sicherheitsanforderungen." },
    { icon: "award", title: "Vorbereitung auf die Zertifizierung", desc: "Wir bereiten Sie so auf die offizielle Prüfung durch eine BSI-anerkannte Prüfstelle vor, dass Sie beim ersten Anlauf bestehen." },
  ],
  whoForTitle: "Für wen ist das?",
  whoForIntro:
    "Unsere TR-03161-Sicherheitsprüfung richtet sich an alle, die digitale Anwendungen im Gesundheitswesen entwickeln oder betreiben.",
  whoFor: [
    { icon: "stethoscope", title: "DiGA-Hersteller", desc: "Hersteller digitaler Gesundheitsanwendungen, die ins DiGA-Verzeichnis aufgenommen werden wollen oder bereits gelistet sind." },
    { icon: "users", title: "DiPA-Hersteller", desc: "Anbieter digitaler Pflegeanwendungen mit Sicherheitsnachweis-Pflicht gegenüber dem BfArM." },
    { icon: "heart", title: "Healthtech-Startups", desc: "Junge Unternehmen im Gesundheitswesen, die von Anfang an auf sichere Entwicklung setzen." },
    { icon: "globe", title: "App-Entwickler im Gesundheitswesen", desc: "Entwicklungsdienstleister, die Gesundheitsanwendungen für Dritte entwickeln und Sicherheit nachweisen müssen." },
  ],
  process: [
    { step: "01", title: "Erstgespräch", desc: "Kostenlos: Wir verstehen Ihre Anwendung, den Entwicklungsstand und die regulatorischen Anforderungen.", icon: "message" },
    { step: "02", title: "Gap-Analyse", desc: "Systematische Überprüfung gegen die Prüfaspekte der TR-03161 mit klarem Statusüberblick.", icon: "fileSearch" },
    { step: "03", title: "Technische Prüfung", desc: "Penetrationstest, Code- und Konfigurationsprüfung nach TR-03161-Maßstäben.", icon: "target" },
    { step: "04", title: "Bericht & Empfehlungen", desc: "Detaillierter Prüfbericht mit Findings, CVSS-Bewertungen und priorisierten Handlungsempfehlungen.", icon: "clipboard" },
    { step: "05", title: "Begleitung zur Zertifizierung", desc: "Unterstützung bei der Behebung und Vorbereitung der Dokumentation für die offizielle Prüfung.", icon: "award" },
  ],
  faqs: [
    { q: "Was ist die BSI TR-03161?", a: "Die BSI TR-03161 ist eine Technische Richtlinie des Bundesamts für Sicherheit in der Informationstechnik (BSI). Sie definiert Sicherheitsanforderungen für digitale Gesundheitsanwendungen (DiGA) und ist in drei Teile gegliedert: Mobile Apps, Web-Anwendungen und Hintergrundsysteme (Backends/APIs)." },
    { q: "Ist die TR-03161 Pflicht für DiGA-Hersteller?", a: "Ja. Seit 2025 müssen DiGA-Hersteller die Sicherheitsanforderungen der TR-03161 nachweisen, um in das DiGA-Verzeichnis des BfArM aufgenommen zu werden. Grundlage sind die Digitale-Gesundheitsanwendungen-Verordnung (DiGAV) sowie § 139e SGB V." },
    { q: "Sind Sie eine BSI-anerkannte Prüfstelle?", a: "Nein. Das offizielle TR-03161-Zertifikat kann nur durch eine BSI-anerkannte Stelle ausgestellt werden. Wir bieten die ideale Vorbereitung: Wir führen den gesamten technischen Prüfprozess vorab durch, identifizieren alle Schwachstellen und bereiten Sie so vor, dass Sie die offizielle Zertifizierung beim ersten Anlauf bestehen." },
    { q: "Was passiert, wenn meine DiGA die Anforderungen nicht erfüllt?", a: "Ohne den Sicherheitsnachweis nach TR-03161 kann Ihre Anwendung nicht in das DiGA-Verzeichnis aufgenommen werden – und ist damit nicht durch die gesetzlichen Krankenkassen erstattungsfähig. Ein vorbereitender Test hilft, Lücken früh zu erkennen und kostspielige Verzögerungen zu vermeiden." },
    { q: "Wie lange dauert eine vorbereitende TR-03161-Prüfung?", a: "Je nach Umfang und Komplexität der Anwendung typischerweise 2–4 Wochen. Die Gap-Analyse allein lässt sich oft innerhalb von 1–2 Wochen durchführen." },
    { q: "Welche Standards bilden die Grundlage der TR-03161?", a: "Die TR-03161 baut maßgeblich auf etablierten OWASP-Standards auf: OWASP MASVS und der Mobile Security Testing Guide (MASTG) für mobile Anwendungen sowie OWASP ASVS für Web-Anwendungen. Unsere Prüfmethodik orientiert sich genau an diesen Frameworks." },
  ],
  related: [
    { href: "/mdr", label: "MDR", desc: "Cybersicherheit für Medizinprodukte mit Software." },
    { href: "/pentest-gesundheitsanwendungen", label: "Pentest Gesundheit", desc: "Penetrationstests speziell für Gesundheitsanwendungen." },
    { href: "/iso-27001", label: "ISO 27001", desc: "Internationaler Standard für Informationssicherheit." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
