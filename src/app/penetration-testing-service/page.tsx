"use client";

import Link from "next/link";
import {
  Shield,
  Phone,
  Mail,
  CheckCircle,
  Globe,
  Server,
  Users,
  FileText,
  Lock,
  Target,
  ArrowRight,
  Star,
  Building2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Zap,
  Award,
  BookOpen,
  ExternalLink,
  Calculator,
  TrendingUp,
  ShieldAlert,
  Briefcase,
  Info,
  Code2,
  Cloud,
  Search,
  BarChart3,
  Layers,
  GitBranch,
} from "lucide-react";
import { useState } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penetration Testing Service – Professionelle Pentest-Dienstleistungen | SODU Secure",
  description: "Umfassende Penetration Testing Services: Web-App, API, Netzwerk, Cloud & Active Directory. OSCP-zertifiziert, manuell, DSGVO-konform. Pentest Service Deutschlandweit.",
  keywords: [
    "penetration testing service",
    "pentest service",
    "pentest dienstleistungen",
    "penetrationstest deutschland",
    "pentest anbieter deutschland",
    "cybersecurity service"
  ],
};

const PHONE = "+49 179 239 6294";
const PHONE_HREF = "tel:+4917923962949";
const EMAIL = "sodusecure@gmail.com";
const EMAIL_HREF = "mailto:sodusecure@gmail.com";

const SERVICES = [
  {
    icon: Globe,
    title: "Web Application Pentest",
    desc: "OWASP Top 10, Business Logic Flaws, Auth-Bypasses, IDOR – manuelles Testing Ihrer Webanwendungen, fokussiert auf reale Ausnutzbarkeit statt Scanner-Rauschen. Inkl. CVSS-bewerteter Befunde.",
    color: "red",
    href: "/services/web-application-testing",
  },
  {
    icon: Server,
    title: "Active Directory Pentest",
    desc: "Kerberoasting, Pass-the-Hash, AS-REP Roasting, GPO-Exploits – wir testen, wie weit ein Angreifer in Ihrer AD-Umgebung kommt. Vollständiges Domain-Admin-Eskalationsszenario inbegriffen.",
    color: "blue",
    href: "/services/infrastructure-testing",
  },
  {
    icon: Code2,
    title: "API Security Testing",
    desc: "OWASP API Security Top 10 – fehlerhafte Objektautorisierung, übermäßige Datenexposition, Injection-Schwachstellen. Manuelles API-Testing für REST, GraphQL und SOAP.",
    color: "purple",
    href: "/services/api-security-testing",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Pentest",
    desc: "Fehlkonfigurierte S3-Buckets, IAM-Privilege-Escalation, exponierte Secrets in CI/CD-Pipelines. Wir testen AWS-, Azure- und GCP-Umgebungen auf real ausnutzbare Risiken.",
    color: "teal",
    href: "/services/cloud-devops-testing",
  },
  {
    icon: Target,
    title: "Netzwerk & Infrastruktur",
    desc: "Firewall-Regeln, Segmentierungslücken, exponierte Dienste, SNMP-Fehlkonfigurationen – systematischer interner und externer Netzwerk-Pentest nach PTES-Standard.",
    color: "green",
    href: "/services/network-audit",
  },
  {
    icon: Users,
    title: "Phishing-Simulation",
    desc: "Realistische Phishing-Kampagnen, die echte Angreifer nachahmen. Klickraten-Auswertung, Empfehlungen für Awareness-Training und Mitarbeiter-Risikoprofiling.",
    color: "amber",
    href: "/services/security-audit",
  },
];

const WHY_US = [
  {
    icon: Target,
    title: "Offensiver Denkansatz",
    desc: "Wir denken wie Angreifer. Kein automatisiertes Scan-Reporting – jeder Befund wird manuell mit Proof-of-Concept-Exploits und realer Impact-Bewertung validiert.",
  },
  {
    icon: Award,
    title: "Standards-konforme Methodik",
    desc: "OWASP Testing Guide, PTES, MITRE ATT&CK – strukturiert, reproduzierbar und audit-fähig. Jeder Test folgt einem konsistenten, dokumentierten Vorgehensmodell.",
  },
  {
    icon: Zap,
    title: "Priorisierte, umsetzbare Berichte",
    desc: "Kein 200-Seiten-PDF, das keiner liest. Priorisierte Remediation-Roadmap, CVSS-Scoring und maßgeschneiderte Empfehlungen passend zu Ihrer Infrastruktur und Ihrem Budget.",
  },
  {
    icon: Building2,
    title: "KMU- & Enterprise-Erfahrung",
    desc: "Von Startups bis zum Mittelstand – wir skalieren unseren Pentest-Service auf Ihre Umgebung, Ihr Budget und Ihre Compliance-Anforderungen.",
  },
  {
    icon: Shield,
    title: "Transparente Festpreise",
    desc: "Keine Überraschungen durch Stundensätze. Jeder Auftrag wird vorab mit einem Festpreis-Angebot kalkuliert – Sie wissen genau, was Sie zahlen.",
  },
  {
    icon: Users,
    title: "Klare Kommunikation",
    desc: "Kick-off-Meeting, laufende Updates bei kritischen Befunden und eine Abschlusspräsentation mit Ihrem Team. Sie wissen immer, was wir testen und was wir gefunden haben.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Kostenloses Erstgespräch",
    desc: "Wir besprechen Ihre Infrastruktur, Angriffsfläche und Ziele. Sie erhalten ein Festpreis-Angebot innerhalb von 24 Stunden – keine versteckten Tagessätze.",
  },
  {
    step: "02",
    title: "Kick-off & Scope-Freigabe",
    desc: "Gemeinsame Festlegung von Testgrenzen, Ansprechpartnern, Testzeitraum und Erfolgskriterien – alles schriftlich in einem unterschriebenen Pentesting-Vertrag.",
  },
  {
    step: "03",
    title: "Aktives Testing",
    desc: "Unser Team führt den Pentest manuell und strukturiert durch. Sie erhalten Echtzeit-Benachrichtigungen bei kritischen Befunden während des Engagements.",
  },
  {
    step: "04",
    title: "Bericht & Präsentation",
    desc: "Executive Summary + technischer Bericht mit CVSS-Scoring + priorisierte Remediation-Roadmap. Optionale Abschlusspräsentation mit Ihrem Team.",
  },
];

const FAQS = [
  {
    q: "Was ist ein Penetration Testing Service?",
    a: "Ein Penetration Testing Service simuliert reale Cyberangriffe auf Ihre Systeme, um ausnutzbare Schwachstellen zu identifizieren, bevor es ein Angreifer tut. Im Gegensatz zu automatisierten Scans führt ein professioneller Pentest ein menschlicher Tester durch – er versucht aktiv, Schwachstellen auszunutzen, Angriffsketten zu bilden und reales Geschäftsrisiko mit Proof-of-Concept-Nachweisen zu belegen.",
  },
  {
    q: "Was kostet ein Penetration Testing Service?",
    a: "Pentest-Kosten reichen von 2.500 € für einen fokussierten Web-App-Test bis 15.000 €+ für ein vollständiges KMU-Engagement inkl. Active Directory und Phishing-Simulation. Nutzen Sie unseren Pentest-Preisrechner für eine individuelle Schätzung – oder kontaktieren Sie uns für ein Festpreis-Angebot innerhalb von 24 Stunden.",
  },
  {
    q: "Wie lange dauert ein Penetrationstest?",
    a: "Ein fokussierter Web-App-Pentest dauert typischerweise 3–5 Werktage aktives Testing. Ein umfassendes KMU-Engagement (extern + Active Directory + Phishing) dauert 2–4 Wochen vom Kick-off bis zum Abschlussbericht. Wir passen Zeitpläne an Ihre geschäftlichen Anforderungen an.",
  },
  {
    q: "Was ist der Unterschied zwischen einem Pentest und einem Vulnerability Scan?",
    a: "Ein Vulnerability Scan setzt automatisierte Tools ein, um bekannte CVEs zu markieren – mit vielen False Positives. Ein Penetrationstest geht weiter: Ein menschlicher Tester nutzt Schwachstellen aktiv aus, bildet Angriffsketten und repliziert reales Angreiferverhalten. Nur ein Pentest zeigt, ob eine Schwachstelle in Ihrer Umgebung tatsächlich ausnutzbar ist.",
  },
  {
    q: "Ist ein Penetration Testing Service für NIS2-Compliance erforderlich?",
    a: "Die NIS2-Richtlinie (in Deutschland als NIS2UmsuCG umgesetzt) verpflichtet betroffene Einrichtungen zu regelmäßigen Sicherheitsüberprüfungen. Pentests sind ein zentrales Compliance-Instrument. Das BSI empfiehlt Pentests explizit im IT-Grundschutz Standard 200-3. DORA schreibt für Finanzeinrichtungen zusätzlich Threat-Led Penetration Testing (TLPT) vor.",
  },
  {
    q: "Welche Ergebnisse erhalte ich nach dem Pentest?",
    a: "Sie erhalten: (1) Executive Summary für Geschäftsführung und Vorstand, (2) detaillierten technischen Bericht mit CVSS-bewerteten Befunden und Reproduktionsschritten, (3) priorisierte Remediation-Roadmap, (4) optionale Abschlusspräsentation mit Ihren IT- und Security-Teams, (5) Retesting kritischer Befunde ohne Aufpreis.",
  },
  {
    q: "Bieten Sie Pentests für KMUs an?",
    a: "Ja – KMUs sind unser Kernsegment. Wir bieten scoped Festpreis-Pentest-Pakete ab 2.500 € an, die für begrenzte IT-Ressourcen konzipiert sind und reale Angriffsvektoren abdecken. Bewerben Sie sich für unser Berliner KMU-Pilotprogramm für einen vollständig subventionierten Pentest im Wert von bis zu 15.000 €.",
  },
  {
    q: "Ist ein Penetrationstest DSGVO-konform?",
    a: "Alle Tests laufen auf Basis eines unterschriebenen Pentesting-Vertrags mit klar definiertem Scope. Wir verarbeiten keine personenbezogenen Daten ohne Rechtsgrundlage und schließen auf Wunsch einen Auftragsverarbeitungsvertrag (AVV) ab. Wir beraten Sie zur DSGVO-Konformität im Rahmen jedes Auftrags.",
  },
];

const STATS = [
  {
    value: "72 %",
    label: "der deutschen Unternehmen waren in den letzten 2 Jahren Opfer eines Cyberangriffs",
    source: "Bitkom 2023",
    href: "https://www.bitkom.org/Presse/Presseinformation/Bitkom-Studie-Wirtschaftsschutz-2023",
  },
  {
    value: "4,29 Mio. €",
    label: "durchschnittlicher Schaden pro Datenpanne weltweit",
    source: "IBM Cost of a Data Breach 2023",
    href: "https://www.ibm.com/de-de/reports/data-breach",
  },
  {
    value: "287 Tage",
    label: "bleibt ein Angreifer durchschnittlich unentdeckt",
    source: "IBM Cost of a Data Breach 2023",
    href: "https://www.ibm.com/de-de/reports/data-breach",
  },
  {
    value: "43 %",
    label: "aller Datenpannen betreffen kleine Unternehmen",
    source: "Verizon DBIR 2023",
    href: "https://www.verizon.com/business/resources/reports/dbir/",
  },
];

const COMPLIANCE = [
  {
    name: "NIS2-Richtlinie (NIS2UmsuCG)",
    desc: "Die EU-NIS2-Richtlinie, in Deutschland als NIS2UmsuCG umgesetzt, verpflichtet wichtige und besonders wichtige Einrichtungen zu regelmäßigen technischen Sicherheitsüberprüfungen. Pentests sind ein zentrales Compliance-Instrument – schätzungsweise 30.000–40.000 deutsche Unternehmen sind betroffen.",
    source: "BSI – NIS2-Umsetzung",
    href: "https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html",
  },
  {
    name: "ISO/IEC 27001:2022",
    desc: "Annex A Controls A.8.8 (Technisches Schwachstellenmanagement) und A.8.29 (Sicherheitstests in Entwicklung und Abnahme) schreiben technische Sicherheitstests explizit vor. Pentests liefern direkte Nachweise für Auditoren und Zertifizierungsstellen.",
    source: "ISO/IEC 27001:2022",
    href: "https://www.iso.org/standard/27001",
  },
  {
    name: "DSGVO Art. 32",
    desc: "Art. 32 DSGVO verlangt ein Verfahren zur regelmäßigen Überprüfung, Bewertung und Evaluierung der Wirksamkeit technischer und organisatorischer Maßnahmen. Penetrationstests sind eine anerkannte Methode zur Erfüllung dieser Pflicht.",
    source: "DSGVO Art. 32",
    href: "https://dsgvo-gesetz.de/art-32-dsgvo/",
  },
  {
    name: "DORA (Digital Operational Resilience Act)",
    desc: "Für Finanzunternehmen in Europa (Fintechs, Banken, Versicherungen) schreibt DORA seit Januar 2025 Threat-Led Penetration Testing (TLPT) als verbindliche Anforderung vor. Regelmäßige Pentests sind keine Option mehr.",
    source: "BaFin – DORA",
    href: "https://www.bafin.de/DE/Aufsicht/FinTech/DORA/dora_node.html",
  },
  {
    name: "BSI IT-Grundschutz (Standard 200-3)",
    desc: "Das BSI empfiehlt Penetrationstests im IT-Grundschutz Standard 200-3 (Risikoanalyse) und im IT-Grundschutz-Kompendium ausdrücklich als Schlüsselmaßnahme zur Risikoidentifikation und -minderung für Behörden und Unternehmen.",
    source: "BSI IT-Grundschutz",
    href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html",
  },
  {
    name: "Cyberversicherung – Nachweispflichten",
    desc: "Führende Cyberversicherer (Allianz Cyber, Hiscox, AXA XL) verlangen im Underwriting-Prozess zunehmend Nachweise über durchgeführte Penetrationstests. Unternehmen ohne aktuellen Pentest-Bericht erhalten höhere Prämien oder eingeschränkten Versicherungsschutz.",
    source: "Hiscox Cyber Readiness Report 2023",
    href: "https://www.hiscox.de/cyberversicherung/cyber-readiness-report",
  },
];

const COMPANY_TYPES = [
  {
    icon: Briefcase,
    type: "Startups & KMU (1–99 Mitarbeiter)",
    color: "amber",
    threat:
      "KMUs werden überproportional häufig angegriffen: opportunistische Angriffe, Phishing, Credential Stuffing und Ransomware-as-a-Service. Angreifer nutzen schwache Passwörter, fehlende MFA und ungepatchte Systeme.",
    riskFacts: [
      "43 % aller Datenpannen betreffen kleine Unternehmen (Verizon DBIR 2023)",
      "Durchschnittlicher Schaden pro Angriff für KMUs: über 200.000 € – existenzbedrohend",
      "74 % der KMUs haben keinen dedizierten IT-Sicherheitsverantwortlichen (Bitkom 2022)",
    ],
    pentestValue:
      "Ein Basis-Pentest ab ~2.500 € prüft Ihre externe Angriffsfläche, E-Mail-Sicherheit und Webpräsenz. Sie erhalten eine konkrete To-do-Liste mit Sofortmaßnahmen und wissen genau, wo Sie tatsächlich verwundbar sind.",
    sources: [
      { label: "Verizon DBIR 2023", href: "https://www.verizon.com/business/resources/reports/dbir/" },
      { label: "Bitkom 2022", href: "https://www.bitkom.org" },
    ],
  },
  {
    icon: Building2,
    type: "Mittelstand (100–500 Mitarbeiter)",
    color: "red",
    threat:
      "Mittelständische Unternehmen kombinieren wertvolle Daten (IP, Finanzen, Kundendaten) mit gewachsener IT-Infrastruktur ohne strukturiertes Security-Management. Active Directory, VPNs und Cloud-Hybridumgebungen akkumulieren Risiken über Jahre.",
    riskFacts: [
      "68 % der deutschen KMUs hatten 2023 einen Sicherheitsvorfall (BSI Lagebericht 2023/24)",
      "Ransomware-Angriffe kosten KMUs im Schnitt 167 Tage Ausfallzeit und über 1 Mio. € (Sophos 2023)",
      "NIS2 betrifft schätzungsweise 30.000–40.000 Unternehmen in Deutschland, viele davon Mittelstand",
    ],
    pentestValue:
      "Ein umfassender Pentest (extern + Active Directory + Phishing) deckt Ihr vollständiges Risikoprofil auf. Er liefert Nachweise für Cyberversicherungen, unterstützt die NIS2-Compliance und erstellt eine strukturierte Remediation-Roadmap.",
    sources: [
      { label: "BSI Lagebericht 2023/24", href: "https://www.bsi.bund.de/DE/Service-Navi/Publikationen/Lageberichte/lageberichte_node.html" },
      { label: "Sophos State of Ransomware 2023", href: "https://www.sophos.com" },
    ],
  },
  {
    icon: TrendingUp,
    type: "Scale-ups & Tech-Unternehmen",
    color: "blue",
    threat:
      "Tech-Unternehmen entwickeln schnell – Sicherheit bleibt im Backlog. Neue Features, CI/CD-Pipelines, Cloud-Dienste und APIs entstehen schneller als Security-Reviews stattfinden. Das Ergebnis: wachsende Sicherheitsschulden.",
    riskFacts: [
      "91 % der Startups haben vor der ersten Finanzierungsrunde keine formale Sicherheitsstrategie (ENISA 2023)",
      "Investoren und Enterprise-Kunden fordern zunehmend Pentest-Nachweise vor Vertragsabschluss",
      "APIs gehören zu den am häufigsten angegriffenen Vektoren (OWASP API Security Top 10)",
    ],
    pentestValue:
      "Web-App- und API-Pentests decken Auth-Fehler, Business-Logic-Probleme und Injection-Schwachstellen auf, bevor Ihr Produkt skaliert. Wir liefern Berichte, die Investor-Due-Diligence und Enterprise-Procurement-Zyklen standhalten.",
    sources: [
      { label: "ENISA SME Cybersecurity 2023", href: "https://www.enisa.europa.eu/publications/cybersecurity-for-smes" },
      { label: "OWASP API Security Top 10", href: "https://owasp.org/www-project-api-security/" },
    ],
  },
  {
    icon: Award,
    type: "Enterprise (500+ Mitarbeiter)",
    color: "purple",
    threat:
      "Enterprises haben komplexe Infrastrukturrisiken: Active-Directory-Domains, Hybrid-Cloud-Umgebungen und Supply-Chain-Abhängigkeiten. Angreifer nutzen privilegierte Accounts, AD-Fehlkonfigurationen oder kompromittierte Zulieferer als Einstiegspunkt.",
    riskFacts: [
      "80 % der Active-Directory-Umgebungen haben kritische Fehlkonfigurationen (Semperis 2023)",
      "Supply-Chain-Angriffe stiegen 2022 um 600 % (ENISA Threat Landscape 2022)",
      "Cyber ist das #1-Geschäftsrisiko weltweit – 3. Jahr in Folge (Allianz Risk Barometer 2024)",
    ],
    pentestValue:
      "Red-Team-Engagements, interne Netzwerktests, AD-Angriffssimulationen und Purple-Team-Übungen – wir testen Ihre Detection- und Response-Fähigkeiten mit MITRE ATT&CK-Mapping und C-Level-Executive-Reporting.",
    sources: [
      { label: "Semperis AD Risk 2023", href: "https://www.semperis.com" },
      { label: "ENISA Threat Landscape 2023", href: "https://www.enisa.europa.eu" },
      { label: "Allianz Risk Barometer 2024", href: "https://commercial.allianz.com" },
    ],
  },
];

const colorMap: Record<string, string> = {
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

const sizeColorMap: Record<string, { badge: string; border: string; icon: string }> = {
  amber: {
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    border: "border-amber-500/20 hover:border-amber-500/40",
    icon: "text-amber-400",
  },
  red: {
    badge: "bg-red-500/10 border-red-500/20 text-red-400",
    border: "border-red-500/20 hover:border-red-500/40",
    icon: "text-red-400",
  },
  blue: {
    badge: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    border: "border-blue-500/20 hover:border-blue-500/40",
    icon: "text-blue-400",
  },
  purple: {
    badge: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    border: "border-purple-500/20 hover:border-purple-500/40",
    icon: "text-purple-400",
  },
};

export default function PenetrationTestingServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav
            className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-gray-300 transition-colors">
              SODU Secure
            </Link>
            <span>/</span>
            <span className="text-gray-300">Penetration Testing Service</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Professioneller Pentest – OWASP · PTES · MITRE ATT&amp;CK</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Penetrationstest Service –</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Professionelle Pentest-Dienstleistungen.
            </span>
            <br />
            <span className="text-white">Manuell. Methodisch. Wirkungsvoll.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            SODU Secure liefert professionelle Penetrationstests für Web-Applikationen, Netzwerke, APIs,
            Active Directory und Cloud-Infrastrukturen. Wir simulieren echte Angriffe – damit Sie Ihre
            Risiken kennen, bevor ein Angreifer sie ausnutzt. Erfahren Sie mehr über Penetrationstest Deutschland und Pentest Services.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/request-pentest"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-red-900/40 hover:scale-105"
            >
              <Calculator className="w-5 h-5" />
              Pentest Kosten Berechnen
            </Link>
            <Link
              href="/request-pentest"
              className="inline-flex items-center gap-2 border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 font-semibold px-8 py-4 rounded-xl transition-all duration-200"
            >
              <Layers className="w-4 h-4" />
              Pentest Konfigurieren
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {[
              "Festpreis – keine überraschenden Tagessätze",
              "Manuelles Testing – nicht nur Scanner-Output",
              "DSGVO-konform · NDA auf Anfrage",
            ].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-400 mb-1">{s.value}</div>
                <div className="text-sm text-gray-400 mb-2 leading-snug">{s.label}</div>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <BookOpen className="w-3 h-3" />
                  {s.source}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS A PENETRATION TESTING SERVICE ─────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
              <Search className="w-3.5 h-3.5" />
              <span>Was ist das?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Was ist ein{" "}
              <span className="text-red-400">Penetration Testing Service?</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Ein Penetration Testing Service ist ein strukturierter, autorisierter Versuch, Ihre Systeme zu
              kompromittieren – genau wie ein echter Angreifer. Anders als automatisierte Schwachstellen-Scanner,
              die lange Listen theoretischer CVEs erzeugen, nutzt ein professioneller Pentest menschliche Expertise:
              Schwachstellen werden aktiv ausgenutzt, zu Angriffspfaden verknüpft und der reale Geschäftsschaden demonstriert.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Das Ergebnis ist kein roher Scan-Report – sondern eine validierte, priorisierte Liste echter Risiken
              mit Proof-of-Concept-Nachweisen, CVSS-Scores und konkreten Handlungsempfehlungen, zugeschnitten auf
              Ihre spezifische Umgebung.
            </p>
            <div className="space-y-3">
              {[
                "Manuell validierte Befunde – null Falschmeldungen",
                "CVSS-bewertet und nach Geschäftsauswirkung priorisiert",
                "Angriffsketten-Analyse – keine isolierten Einzelfunde",
                "Umsetzbare Maßnahmen-Roadmap",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pentest vs Scan comparison */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-5 text-center text-sm uppercase tracking-wider">
              Pentest vs. Schwachstellen-Scan
            </h3>
            <div className="space-y-3">
              {[
                { label: "Manuelle Ausnutzung", pentest: true, scan: false },
                { label: "Angriffsketten-Analyse", pentest: true, scan: false },
                { label: "Geschäftsauswirkung dokumentiert", pentest: true, scan: false },
                { label: "Garantiert keine Falschmeldungen", pentest: true, scan: false },
                { label: "Proof-of-Concept-Nachweise", pentest: true, scan: false },
                { label: "Erkennt Fehlkonfigurationen", pentest: true, scan: true },
                { label: "Erkennt bekannte CVEs", pentest: true, scan: true },
                {
                  label: "Compliance-Audit-Nachweis",
                  pentest: true,
                  scan: false,
                },
                { label: "Vollständig automatisiert", pentest: false, scan: true },
                { label: "Schnelle Durchführung (Stunden)", pentest: false, scan: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 text-sm py-1.5 border-b border-white/5 last:border-0"
                >
                  <span className="flex-1 text-gray-300">{row.label}</span>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-1 w-16 justify-center">
                      {row.pentest ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <span className="w-4 h-4 flex items-center justify-center text-gray-600">✕</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 w-16 justify-center">
                      {row.scan ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <span className="w-4 h-4 flex items-center justify-center text-gray-600">✕</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end gap-0 pt-2">
                <div className="flex gap-6">
                  <span className="text-xs text-red-400 font-semibold w-16 text-center">Pentest</span>
                  <span className="text-xs text-gray-500 font-semibold w-16 text-center">Vuln-Scan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Service Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Penetration Testing Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              From a single web application to full red-team engagements – we test your entire attack
              surface following OWASP, PTES and MITRE ATT&amp;CK standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-200 hover:bg-white/[0.05]"
              >
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-4 ${colorMap[svc.color]}`}
                >
                  <svc.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{svc.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-red-400 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          {/* CTA block */}
          <div className="mt-10 bg-gradient-to-r from-red-950/30 to-orange-950/20 border border-red-500/20 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold mb-1">Not sure which pentest you need?</h3>
                <p className="text-gray-400 text-sm">
                  Our Pentest Configurator walks you through scope, target type and company size –
                  and gives you an instant cost estimate in under 3 minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/request-pentest"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <Calculator className="w-4 h-4" />
                  Configure &amp; Price
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO NEEDS IT ──────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Evidence-Based Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Who Needs a Penetration Testing Service?
            <br />
            <span className="text-red-400">Every Organisation with a Digital Footprint</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
            &ldquo;We&apos;re too small to be attacked&rdquo; is the most dangerous assumption in
            cybersecurity. Attackers use automated tools to scan the entire internet continuously –
            company size is not a protection factor.
          </p>
        </div>

        <div className="space-y-8">
          {COMPANY_TYPES.map((ct) => {
            const colors = sizeColorMap[ct.color];
            return (
              <div
                key={ct.type}
                className={`bg-white/[0.03] border ${colors.border} rounded-2xl p-6 sm:p-8 transition-colors`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${colors.badge} flex-shrink-0`}
                  >
                    <ct.icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{ct.type}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{ct.threat}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/[0.03] rounded-xl p-4">
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-red-400" /> Risk Facts
                    </h4>
                    <ul className="space-y-2">
                      {ct.riskFacts.map((fact) => (
                        <li
                          key={fact}
                          className="text-sm text-gray-400 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-4">
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-green-400" /> Value of a Pentest
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{ct.pentestValue}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ct.sources.map((src) => (
                    <a
                      key={src.label}
                      href={src.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      <BookOpen className="w-3 h-3" />
                      {src.label}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/request-pentest"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105"
          >
            <Calculator className="w-5 h-5" />
            Calculate Your Pentest Cost
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Fixed-price quote within 24 hours – no commitment required
          </p>
        </div>
      </section>

      {/* ── COMPLIANCE ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Regulatory & Compliance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Penetration Testing &amp; Compliance Requirements
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Penetration tests are not just best practice – they are increasingly mandated by
              law, standards and insurance requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPLIANCE.map((c) => (
              <div
                key={c.name}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col"
              >
                <h3 className="font-semibold text-white mb-3 text-sm leading-snug">{c.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{c.desc}</p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-auto"
                >
                  <BookOpen className="w-3 h-3" />
                  {c.source}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-1">
                  NIS2 Scope Check
                </h4>
                <p className="text-sm text-gray-400">
                  NIS2 extends beyond critical infrastructure operators. Through the
                  &ldquo;important entities&rdquo; category it covers mid-sized companies in
                  manufacturing, food, chemicals, postal services and digital services. The{" "}
                  <a
                    href="https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    BSI provides a NIS2 scope check tool
                  </a>
                  . SODU Secure advises you on applicability and implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ───────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our Penetration Testing Methodology
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            No proprietary gut-feeling assessments – reproducible, audit-ready methodology aligned
            with international standards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              name: "OWASP Testing Guide v4.2",
              desc: "Foundation of all web and API pentests. Covers 90+ test areas from authentication flaws to injection vulnerabilities with a structured, reproducible approach.",
              href: "https://owasp.org/www-project-web-security-testing-guide/",
              color: "text-red-400",
            },
            {
              name: "PTES (Penetration Testing Execution Standard)",
              desc: "Structured engagement lifecycle: Pre-Engagement, Intelligence Gathering, Threat Modelling, Exploitation, Post-Exploitation, Reporting – every phase documented.",
              href: "http://www.pentest-standard.org/",
              color: "text-blue-400",
            },
            {
              name: "MITRE ATT&CK Framework",
              desc: "We map attack techniques to MITRE ATT&CK so you see exactly which real-world adversary tactics apply to your environment – and how to detect them.",
              href: "https://attack.mitre.org/",
              color: "text-purple-400",
            },
          ].map((m) => (
            <div
              key={m.name}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6"
            >
              <h3 className={`font-bold mb-3 text-sm ${m.color}`}>{m.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{m.desc}</p>
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Official Documentation
              </a>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-center mb-8">
          How Our Penetration Testing Service Works
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS.map((p) => (
            <div
              key={p.step}
              className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6"
            >
              <div className="text-5xl font-black text-red-500/20 mb-3 leading-none">
                {p.step}
              </div>
              <h3 className="font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SODU SECURE ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose SODU Secure as Your Penetration Testing Partner?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              You don&apos;t need an anonymous IT vendor – you need a partner that delivers results
              that actually reduce your risk.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                  <item.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Penetration Testing Service Costs – What to Expect
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Pentest costs depend heavily on scope, number of targets and test depth. SODU Secure
            offers fair, transparent fixed prices – no hidden day rates.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              name: "Baseline Pentest",
              price: "from €2,500",
              desc: "Focused web app or external surface test",
              items: [
                "External systems (1–3 targets)",
                "OWASP Top 10 testing",
                "Manual vulnerability validation",
                "Executive Summary report",
                "Remediation recommendations",
              ],
              color: "border-white/10",
              badge: "",
            },
            {
              name: "SME Pentest",
              price: "from €8,000",
              desc: "Recommended for most businesses",
              items: [
                "External + internal testing",
                "Active Directory analysis",
                "Phishing simulation (up to 100 users)",
                "CVSS technical report",
                "Close-out presentation",
                "Retest of critical findings",
              ],
              color: "border-red-500/30",
              badge: "Most Popular",
            },
            {
              name: "Enterprise Pentest",
              price: "On Request",
              desc: "Red team & full-scope engagements",
              items: [
                "Red team engagement",
                "Full attack surface analysis",
                "MITRE ATT&CK mapping",
                "Purple team option",
                "C-level executive report",
                "Ongoing retainer available",
              ],
              color: "border-white/10",
              badge: "",
            },
          ].map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-white/[0.03] border ${pkg.color} rounded-2xl p-6 flex flex-col`}
            >
              {pkg.badge && (
                <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 text-xs text-red-400 mb-3 self-start">
                  <Star className="w-3 h-3" />
                  {pkg.badge}
                </div>
              )}
              <h3 className="font-bold text-white text-lg mb-1">{pkg.name}</h3>
              <div className="text-2xl font-black text-red-400 mb-1">{pkg.price}</div>
              <p className="text-xs text-gray-500 mb-4">{pkg.desc}</p>
              <ul className="space-y-2 flex-1 mb-6">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-400 flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/request-pentest"
                className="inline-flex items-center justify-center gap-2 border border-red-500/30 hover:bg-red-600 hover:border-red-600 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 text-sm"
              >
                <Calculator className="w-4 h-4" />
                Calculate Price
              </Link>
            </div>
          ))}
        </div>

        {/* Big cost calculator CTA */}
        <div className="bg-gradient-to-r from-red-950/40 via-[#0a0a0f] to-orange-950/30 border border-red-500/25 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Pentest Cost Calculator &amp; Configurator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Get Your Fixed-Price Quote in 3 Minutes
          </h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
            Use our interactive Pentest Configurator to define your scope, select target types,
            company size and desired test depth – and receive an instant cost estimate plus a
            personalised proposal within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-pentest"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-5 rounded-xl transition-all duration-200 shadow-lg shadow-red-900/40 hover:scale-105 text-lg"
            >
              <Calculator className="w-6 h-6" />
              Calculate Pentest Cost Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/request-pentest"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-5 rounded-xl transition-all duration-200"
            >
              <GitBranch className="w-5 h-5" />
              Configure Your Pentest
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-600">
            No commitment required · Fixed price guaranteed · Quote within 24h
          </p>
        </div>
      </section>

      {/* ── PILOT PROGRAMME CTA ───────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-red-950/40 to-orange-950/40 border-y border-red-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 text-sm text-red-300 mb-4">
            <Star className="w-3.5 h-3.5" />
            <span>Only 2 spots remaining</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Berlin KMU Pilot Programme 2026 – Free Pentest
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
            Berlin-based SMEs with 20–150 employees, Microsoft infrastructure (M365 / Active Directory)
            and a Berlin/Brandenburg location can apply for a fully subsidised penetration test
            worth up to €15,000.
          </p>
          <Link
            href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105"
          >
            Apply for Free Pentest
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Penetration Testing Service – FAQ
            </h2>
            <p className="text-gray-400 text-sm">
              Common questions about penetration testing, cost, process and compliance.
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-red-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED CONTENT CLUSTER ───────────────────────────────────────────── */}
      <section className="py-16 bg-[#131927] border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-3">
            Explore Our Penetration Testing Resources
          </h2>
          <p className="text-gray-400 text-center text-sm mb-10 max-w-xl mx-auto">
            Guides on pentest types, costs, methodology, compliance and service-specific deep dives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                href: "/pentest-berlin",
                title: "Pentest Berlin",
                desc: "Local penetration testing service in Berlin – short response times, personal contact.",
                badge: "Local",
                badgeColor: "bg-red-600",
              },
              {
                href: "/pentest-berlin/kosten",
                title: "Pentest Costs",
                desc: "Baseline from €2,500, SME from €8,000 – all pricing factors transparently explained.",
                badge: "Pricing",
                badgeColor: "bg-green-600",
              },
              {
                href: "/services/web-application-testing",
                title: "Web App Pentest",
                desc: "OWASP Top 10, Business Logic, Auth Bypasses – manual web application testing.",
                badge: "Web",
                badgeColor: "bg-blue-600",
              },
              {
                href: "/pentest-berlin/iso-27001",
                title: "ISO 27001 Pentest",
                desc: "Which controls require a pentest and how we establish audit readiness.",
                badge: "Compliance",
                badgeColor: "bg-indigo-600",
              },
              {
                href: "/services/api-security-testing",
                title: "API Security Testing",
                desc: "OWASP API Top 10 – REST, GraphQL and SOAP security testing in depth.",
                badge: "API",
                badgeColor: "bg-purple-600",
              },
              {
                href: "/services/infrastructure-testing",
                title: "Infrastructure Pentest",
                desc: "Active Directory, internal networks and server infrastructure testing.",
                badge: "Infra",
                badgeColor: "bg-orange-600",
              },
              {
                href: "/services/cloud-devops-testing",
                title: "Cloud Pentest",
                desc: "AWS, Azure, GCP misconfiguration, IAM escalation and CI/CD pipeline security.",
                badge: "Cloud",
                badgeColor: "bg-teal-600",
              },
              {
                href: "/berlin-kmu-pilot",
                title: "Free KMU Pilot",
                desc: "Apply for a fully subsidised penetration test worth up to €15,000.",
                badge: "Free",
                badgeColor: "bg-amber-600",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-[#0d1117] border border-gray-800 rounded-xl p-5 hover:border-red-500/50 transition-colors group flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold ${item.badgeColor} text-white px-2 py-0.5 rounded`}
                  >
                    {item.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-red-400 transition-colors" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{item.desc}</p>
              </Link>
            ))}
          </div>

          {/* External sources */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              External Sources &amp; Further Reading
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                {
                  label: "OWASP Web Security Testing Guide v4.2",
                  href: "https://owasp.org/www-project-web-security-testing-guide/",
                },
                {
                  label: "MITRE ATT&CK Framework",
                  href: "https://attack.mitre.org/",
                },
                {
                  label: "BSI IT-Grundschutz Standard 200-3",
                  href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html",
                },
                {
                  label: "IBM Cost of a Data Breach Report 2023",
                  href: "https://www.ibm.com/de-de/reports/data-breach",
                },
                {
                  label: "Verizon Data Breach Investigations Report 2023",
                  href: "https://www.verizon.com/business/resources/reports/dbir/",
                },
                {
                  label: "ENISA Threat Landscape 2023",
                  href: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2023",
                },
                {
                  label: "Bitkom Wirtschaftsschutz 2023",
                  href: "https://www.bitkom.org/Presse/Presseinformation/Bitkom-Studie-Wirtschaftsschutz-2023",
                },
                {
                  label: "BSI NIS2 Implementation",
                  href: "https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html",
                },
              ].map((src) => (
                <a
                  key={src.label}
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                    {src.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to Start Your Penetration Test?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Describe your infrastructure and objectives – we respond within 24 hours with a
          transparent fixed-price proposal, no hidden costs.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/request-pentest"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105"
          >
            <Calculator className="w-5 h-5" />
            Calculate Pentest Cost
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            {PHONE}
          </a>
          <a
            href={EMAIL_HREF}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            {EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {[
            "Fixed price – no surprise invoices",
            "NDA on request",
            "GDPR-compliant",
            "Based in Berlin",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {t}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Or apply for our{" "}
          <Link
            href="/berlin-kmu-pilot"
            className="text-red-400 hover:text-red-300 underline underline-offset-2"
          >
            free KMU Pilot Programme
          </Link>{" "}
          – 2 spots remaining.
        </p>
      </section>
    </main>
  );
}
