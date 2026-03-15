"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Calculator,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  Layers,
  BookOpen,
  ExternalLink,
  BarChart3,
  FileText,
  Target,
  Zap,
  Network,
  Globe,
  Server,
  Cloud,
  Phone,
  Mail,
  AlertTriangle,
  Star,
  Info,
} from "lucide-react";

const PHONE = "+49 179 239 6294";
const PHONE_HREF = "tel:+4917923962949";
const EMAIL = "sodusecure@gmail.com";
const EMAIL_HREF = "mailto:sodusecure@gmail.com";

const PENTEST_TYPES = [
  {
    icon: Globe,
    title: "Web Application Penetrationstest",
    desc: "OWASP Top 10, Business Logic, Auth Bypasses, IDOR – manuelles Testing Ihrer Web-Anwendungen mit echten Exploits.",
    href: "/services/web-application-testing",
    color: "red",
  },
  {
    icon: Network,
    title: "Netzwerk Penetrationstest",
    desc: "Internes und externes Netzwerk-Testing: Port Scanning, Service Exploitation, Lateral Movement und Privilege Escalation.",
    href: "/services/network-audit",
    color: "blue",
  },
  {
    icon: Target,
    title: "Active Directory Pentest",
    desc: "Kerberoasting, Pass-the-Hash, GPO Abuse, DCSync – vollständige AD-Analyse mit MITRE ATT&CK-Mapping.",
    href: "/services/infrastructure-testing",
    color: "purple",
  },
  {
    icon: Zap,
    title: "API Penetrationstest",
    desc: "OWASP API Top 10 – REST, GraphQL und SOAP Security Testing: Broken Auth, BOLA, Injection und mehr.",
    href: "/services/api-security-testing",
    color: "orange",
  },
  {
    icon: Cloud,
    title: "Cloud Penetrationstest",
    desc: "AWS, Azure, GCP – Fehlkonfigurationen, IAM Privilege Escalation, S3-Bucket-Exposures und CI/CD-Pipeline-Sicherheit.",
    href: "/services/cloud-devops-testing",
    color: "teal",
  },
  {
    icon: Server,
    title: "Infrastruktur-Penetrationstest",
    desc: "Server, Firewall, VPN und On-Premise-Systeme: vollständige Angriffsflächenanalyse inkl. Patch-Status-Review.",
    href: "/services/infrastructure-testing",
    color: "green",
  },
];

const colorMap: Record<string, string> = {
  red:    "bg-red-500/10 border-red-500/20 text-red-400",
  blue:   "bg-blue-500/10 border-blue-500/20 text-blue-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  teal:   "bg-teal-500/10 border-teal-500/20 text-teal-400",
  green:  "bg-green-500/10 border-green-500/20 text-green-400",
};

const PHASES = [
  {
    step: "01",
    title: "Vorgespräch & Scoping",
    desc: "Wir analysieren Ihre Infrastruktur, definieren Ziele und Testzeitraum. Sie erhalten ein Festpreis-Angebot in 24 Stunden.",
  },
  {
    step: "02",
    title: "Kick-off & Autorisierung",
    desc: "Unterzeichnung des Pentest-Vertrags, NDA und Scope-Freigabe. Der Testzeitraum wird mit Ihrem Team abgestimmt.",
  },
  {
    step: "03",
    title: "Aktives Testing",
    desc: "Manuelle Ausnutzung von Schwachstellen, Angriffsketten-Analyse und Exploitation mit vollständiger Dokumentation.",
  },
  {
    step: "04",
    title: "Bericht & Präsentation",
    desc: "Priorisierter Bericht mit CVSS-Scores, Proof-of-Concepts und konkreten Remediation-Empfehlungen. Abschlusspräsentation inklusive.",
  },
];

const STATS = [
  { value: "72 %", label: "aller Datenpannen durch Menschenfehler oder Kompromittierung", source: "IBM", href: "https://www.ibm.com/de-de/reports/data-breach" },
  { value: "4,29 Mio. €", label: "durchschnittliche Kosten einer Datenpanne (Deutschland)", source: "IBM 2023", href: "https://www.ibm.com/de-de/reports/data-breach" },
  { value: "287 Tage", label: "durchschnittliche Zeit zur Erkennung und Eindämmung", source: "IBM", href: "https://www.ibm.com/de-de/reports/data-breach" },
  { value: "43 %", label: "aller Cyberangriffe richten sich gegen KMUs", source: "Verizon DBIR", href: "https://www.verizon.com/business/resources/reports/dbir/" },
];

const FAQS = [
  {
    q: "Was ist ein Penetrationstest (Pentest)?",
    a: "Ein Penetrationstest ist ein autorisierter, simulierter Angriff auf Ihre IT-Systeme. Zertifizierte Sicherheitsexperten versuchen, Schwachstellen aktiv auszunutzen – genau wie ein echter Angreifer. Das Ergebnis ist ein validierter, priorisierter Bericht mit konkreten Maßnahmenempfehlungen.",
  },
  {
    q: "Was ist der Unterschied zwischen Penetrationstest und Vulnerability Scan?",
    a: "Ein Vulnerability Scan ist vollautomatisiert und listet theoretische Schwachstellen – mit vielen Falschmeldungen. Ein Penetrationstest ist manuell: Experten nutzen Schwachstellen aktiv aus, verknüpfen sie zu Angriffspfaden und demonstrieren den realen Geschäftsschaden.",
  },
  {
    q: "Was kostet ein Penetrationstest?",
    a: "Penetrationstests bei SODU Secure kosten ab 2.500 € (fokussierter Web-App-Test) bis 15.000 €+ (vollständiges KMU-Engagement). Alle Preise sind Festpreise – keine versteckten Tagessätze. Nutzen Sie unseren Pentest-Konfigurator für eine individuelle Schätzung.",
  },
  {
    q: "Wie lange dauert ein Penetrationstest?",
    a: "Ein fokussierter Web-App-Pentest dauert 3–5 Werktage, ein umfassendes KMU-Engagement mit Active Directory und Phishing 7–15 Werktage. Vom Erstkontakt bis zum finalen Bericht vergehen in der Regel 2–4 Wochen.",
  },
  {
    q: "Ist ein Penetrationstest für KMUs sinnvoll?",
    a: "Ja – KMUs sind besonders häufige Ziele, weil Angreifer automatisierte Tools nutzen, die unabhängig von der Unternehmensgröße scannen. Unsere KMU-Pentest-Pakete ab 2.500 € sind speziell für begrenzte IT-Budgets konzipiert.",
  },
  {
    q: "Welche Compliance-Anforderungen verlangen einen Penetrationstest?",
    a: "NIS2, ISO/IEC 27001:2022, DSGVO Art. 32, DORA und viele Cyberversicherungen verlangen regelmäßige Penetrationstests. SODU Secure berät Sie zur Anwendbarkeit und stellt compliance-konforme Berichte aus.",
  },
  {
    q: "Ist ein Penetrationstest DSGVO-konform?",
    a: "Alle Tests laufen auf Basis eines unterzeichneten Pentest-Vertrags mit klar definiertem Scope. Wir verarbeiten keine personenbezogenen Daten ohne Rechtsgrundlage und schließen auf Wunsch einen Auftragsverarbeitungsvertrag (AVV) ab.",
  },
  {
    q: "Wer führt bei SODU Secure die Penetrationstests durch?",
    a: "Alle Tests werden von zertifizierten Sicherheitsexperten (OSCP, CEH, ISO 27001 Lead Auditor) durchgeführt – keine Junior-Analysten, keine reinen Scan-Reports. Sie kommunizieren direkt mit dem Pentester.",
  },
];

export default function PenetrationTestingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">SODU Secure</Link>
            <span>/</span>
            <span className="text-gray-300">Penetrationstest</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Professioneller Pentest – OWASP · PTES · MITRE ATT&amp;CK</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Penetrationstest &amp; Pentesting –</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Manuell. Methodisch.
            </span>
            <br />
            <span className="text-white">Wirkungsvoll.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            SODU Secure führt professionelle Penetrationstests für Web-Apps, Netzwerke, APIs,
            Active Directory und Cloud-Infrastrukturen durch. Zertifizierte Pentester –
            Festpreise ab 2.500 € – Angebot in 24 Stunden. Erfahren Sie mehr über Penetration Testing und Pentest Services.
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
              "Festpreis – keine Überraschungen",
              "Manuelles Testing – nicht nur Scanner",
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
                <a href={s.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors">
                  <BookOpen className="w-3 h-3" />{s.source}<ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAS IST EIN PENETRATIONSTEST ─────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
              <Search className="w-3.5 h-3.5" />
              <span>Was ist ein Penetrationstest?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Penetrationstest, Pentesting &amp;{" "}
              <span className="text-red-400">Penetration Testing – erklärt</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Ein Penetrationstest (kurz: Pentest) ist ein autorisierter, simulierter Angriff auf
              Ihre IT-Systeme. Zertifizierte Sicherheitsexperten nutzen dieselben Methoden wie echte
              Angreifer – aktive Exploitation, Angriffsketten-Analyse und Privilege Escalation –
              um reale Schwachstellen nachzuweisen, bevor es ein Angreifer tut.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Das Ergebnis ist kein automatisierter Scan-Report, sondern ein manuell validierter,
              priorisierter Befundbericht mit CVSS-Scores, Proof-of-Concept-Nachweisen und konkreten
              Remediation-Empfehlungen – zugeschnitten auf Ihre Umgebung.
            </p>
            <div className="space-y-3">
              {[
                "Manuell validierte Befunde – null Falschmeldungen",
                "CVSS-bewertet und nach Geschäftsrisiko priorisiert",
                "Angriffsketten dokumentiert – nicht nur Einzelfunde",
                "Compliance-konforme Berichte (NIS2, ISO 27001, DSGVO)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-5 text-center text-sm uppercase tracking-wider">
              Penetrationstest vs. Schwachstellen-Scan
            </h3>
            <div className="space-y-3">
              {[
                { label: "Manuelle Ausnutzung", pentest: true, scan: false },
                { label: "Angriffsketten-Analyse", pentest: true, scan: false },
                { label: "Geschäftsrisiko dokumentiert", pentest: true, scan: false },
                { label: "Null Falschmeldungen", pentest: true, scan: false },
                { label: "Proof-of-Concept-Nachweise", pentest: true, scan: false },
                { label: "Erkennt Fehlkonfigurationen", pentest: true, scan: true },
                { label: "Erkennt bekannte CVEs", pentest: true, scan: true },
                { label: "Compliance-Audit-Nachweis", pentest: true, scan: false },
                { label: "Vollständig automatisiert", pentest: false, scan: true },
                { label: "Schnell (Stunden)", pentest: false, scan: true },
              ].map((row) => (
                <div key={row.label}
                  className="flex items-center gap-3 text-sm py-1.5 border-b border-white/5 last:border-0">
                  <span className="flex-1 text-gray-300">{row.label}</span>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-1 w-16 justify-center">
                      {row.pentest ? <CheckCircle className="w-4 h-4 text-green-400" /> : <span className="w-4 h-4 flex items-center justify-center text-gray-600">✕</span>}
                    </div>
                    <div className="flex items-center gap-1 w-16 justify-center">
                      {row.scan ? <CheckCircle className="w-4 h-4 text-green-400" /> : <span className="w-4 h-4 flex items-center justify-center text-gray-600">✕</span>}
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

      {/* ── ARTEN VON PENETRATIONSTESTS ───────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Arten von Penetrationstests</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Welche Penetrationstests bieten wir an?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Von der Web-Applikation bis zur vollständigen Red-Team-Übung – wir testen
              Ihre gesamte Angriffsfläche nach OWASP, PTES und MITRE ATT&amp;CK.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PENTEST_TYPES.map((svc) => (
              <Link key={svc.title} href={svc.href}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-200 hover:bg-white/[0.05]">
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-4 ${colorMap[svc.color]}`}>
                  <svc.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">{svc.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{svc.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-red-400 group-hover:gap-2 transition-all">
                  Mehr erfahren <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-red-950/30 to-orange-950/20 border border-red-500/20 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold mb-1">Nicht sicher, welcher Penetrationstest passt?</h3>
                <p className="text-gray-400 text-sm">
                  Unser Pentest-Konfigurator führt Sie in unter 3 Minuten durch Scope, Zieltyp
                  und Unternehmensgröße – mit sofortiger Kostenindikation.
                </p>
              </div>
              <Link href="/request-pentest"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 flex-shrink-0">
                <Calculator className="w-4 h-4" />
                Konfigurieren &amp; Preis berechnen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABLAUF ────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ablauf eines Penetrationstests bei SODU Secure
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Transparenter Prozess von der Anfrage bis zum finalen Bericht –
            keine Überraschungen, keine versteckten Kosten.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHASES.map((p) => (
            <div key={p.step} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <div className="text-5xl font-black text-red-500/20 mb-3 leading-none">{p.step}</div>
              <h3 className="font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPLIANCE ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Regulatorik &amp; Compliance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Penetrationstest &amp; gesetzliche Anforderungen
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Penetrationstests sind keine Kür mehr – sie sind zunehmend gesetzlich
              vorgeschrieben oder von Versicherungen und Geschäftspartnern gefordert.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "NIS2-Richtlinie", desc: "Art. 21 NIS2 verlangt technische Sicherheitsmaßnahmen inkl. regelmäßiger Penetrationstests für wesentliche und wichtige Einrichtungen.", href: "https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html", source: "BSI NIS2" },
              { name: "ISO/IEC 27001:2022", desc: "Anhang A.8.8 erfordert das Management technischer Schwachstellen. Pentests sind der anerkannte Nachweis zur Erfüllung dieser Kontrolle.", href: "https://www.iso.org/standard/27001", source: "ISO 27001" },
              { name: "DSGVO Art. 32", desc: "DSGVO verlangt regelmäßige Tests der Wirksamkeit technischer Schutzmaßnahmen. Penetrationstests sind die anerkannte Umsetzungsmethode.", href: "https://dsgvo-gesetz.de/art-32-dsgvo/", source: "DSGVO" },
              { name: "DORA (Finanzsektor)", desc: "Digital Operational Resilience Act verlangt Advanced Threat-Led Penetration Testing (TLPT) für Finanzinstitute ab 2025.", href: "https://www.eba.europa.eu/regulation-and-policy/operational-resilience/dora", source: "EBA DORA" },
              { name: "BSI IT-Grundschutz", desc: "DER.3.1 Penetrationstest definiert den Standard für regelmäßige Sicherheitstests im BSI-Framework.", href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html", source: "BSI Grundschutz" },
              { name: "Cyberversicherungen", desc: "Immer mehr Cyberversicherer verlangen Nachweise über regelmäßige Pentests als Bedingung für Deckung oder günstigere Prämien.", href: "https://www.gdv.de/de/themen/news/cyberversicherung", source: "GDV" },
            ].map((c) => (
              <div key={c.name} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col">
                <h3 className="font-semibold text-white mb-2 text-sm">{c.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-3">{c.desc}</p>
                <a href={c.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 mt-auto">
                  <BookOpen className="w-3 h-3" />{c.source}<ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-1">NIS2-Betroffenheitsprüfung</h4>
                <p className="text-sm text-gray-400">
                  NIS2 betrifft nicht nur kritische Infrastrukturen, sondern über die Kategorie
                  {'\u201ewichtige Einrichtungen"'} auch mittelgroße Unternehmen in Produktion, Lebensmittel,
                  Chemie, Post und digitale Dienste. Das{" "}
                  <a href="https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html"
                    target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                    BSI bietet ein NIS2-Prüftool
                  </a>
                  . SODU Secure berät Sie zur Anwendbarkeit und Umsetzung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREISE ────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Transparente Preise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Penetrationstest Kosten – Was Sie erwarten können
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Pentest-Kosten hängen von Scope, Anzahl der Ziele und Testtiefe ab.
            SODU Secure bietet faire, transparente Festpreise – keine versteckten Tagessätze.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              name: "Basis-Penetrationstest",
              price: "ab 2.500 €",
              desc: "Fokussierter Web-App- oder Netzwerk-Test",
              items: ["Externe Systeme (1–3 Ziele)", "OWASP Top 10 Testing", "Manuelle Validierung", "Executive Summary", "Maßnahmenempfehlungen"],
              color: "border-white/10",
              badge: "",
            },
            {
              name: "KMU-Penetrationstest",
              price: "ab 8.000 €",
              desc: "Empfohlen für die meisten Unternehmen",
              items: ["Extern + intern Testing", "Active Directory Analyse", "Phishing-Simulation (bis 100 User)", "CVSS-Technischer Bericht", "Abschlusspräsentation", "Retest kritischer Befunde"],
              color: "border-red-500/30",
              badge: "Beliebteste Option",
            },
            {
              name: "Enterprise-Penetrationstest",
              price: "Auf Anfrage",
              desc: "Red Team & vollständige Engagements",
              items: ["Red Team Engagement", "Vollständige Angriffsflächenanalyse", "MITRE ATT&CK Mapping", "Purple Team Option", "C-Level-Bericht", "Retainer verfügbar"],
              color: "border-white/10",
              badge: "",
            },
          ].map((pkg) => (
            <div key={pkg.name} className={`bg-white/[0.03] border ${pkg.color} rounded-2xl p-6 flex flex-col`}>
              {pkg.badge && (
                <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 text-xs text-red-400 mb-3 self-start">
                  <Star className="w-3 h-3" />{pkg.badge}
                </div>
              )}
              <h3 className="font-bold text-white text-lg mb-1">{pkg.name}</h3>
              <div className="text-2xl font-black text-red-400 mb-1">{pkg.price}</div>
              <p className="text-xs text-gray-500 mb-4">{pkg.desc}</p>
              <ul className="space-y-2 flex-1 mb-6">
                {pkg.items.map((item) => (
                  <li key={item} className="text-sm text-gray-400 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <Link href="/request-pentest"
                className="inline-flex items-center justify-center gap-2 border border-red-500/30 hover:bg-red-600 hover:border-red-600 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 text-sm">
                <Calculator className="w-4 h-4" />Preis Berechnen
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-950/40 via-[#0a0a0f] to-orange-950/30 border border-red-500/25 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Pentest-Kostenrechner &amp; Konfigurator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Ihr Festpreis-Angebot in 3 Minuten
          </h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
            Definieren Sie Ihren Scope, wählen Sie Zieltypen, Unternehmensgröße und gewünschte
            Testtiefe – und erhalten Sie sofort eine Kostenschätzung und ein persönliches
            Angebot innerhalb von 24 Stunden.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-5 rounded-xl transition-all duration-200 shadow-lg shadow-red-900/40 hover:scale-105 text-lg">
              <Calculator className="w-6 h-6" />Pentest Kosten Berechnen<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-600">Keine Verpflichtung · Festpreis garantiert · Angebot in 24h</p>
        </div>
      </section>

      {/* ── PILOT ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-red-950/40 to-orange-950/40 border-y border-red-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 text-sm text-red-300 mb-4">
            <Star className="w-3.5 h-3.5" /><span>Nur noch 2 Plätze verfügbar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Berlin KMU Pilotprogramm 2026 – Kostenloser Penetrationstest
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
            Berliner KMUs mit 20–150 Mitarbeitern, Microsoft-Infrastruktur (M365 / Active Directory)
            und Standort Berlin/Brandenburg können sich für einen vollständig subventionierten
            Penetrationstest im Wert von bis zu 15.000 € bewerben.
          </p>
          <Link href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            Für kostenlosen Pentest bewerben<ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Penetrationstest – Häufige Fragen
            </h2>
            <p className="text-gray-400 text-sm">
              Alles Wichtige zu Penetrationstest, Pentesting, Kosten, Ablauf und Compliance.
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                  aria-expanded={openFaq === i}>
                  <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-red-400 flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
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

      {/* ── RELATED CONTENT ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#131927] border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-3">
            Weitere Pentest-Ressourcen
          </h2>
          <p className="text-gray-400 text-center text-sm mb-10 max-w-xl mx-auto">
            Kosten, Arten, Compliance und branchenspezifische Penetrationstests auf einen Blick.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/penetration-testing-service", title: "Pentest Service", desc: "Professioneller Penetration Testing Service – Festpreis, OWASP-konform.", badge: "Service", badgeColor: "bg-red-600" },
              { href: "/pentest-angebot", title: "Pentest Angebot", desc: "Festpreis-Angebot für Ihren Penetrationstest in 24 Stunden.", badge: "Angebot", badgeColor: "bg-green-600" },
              { href: "/pentest-berlin/kosten", title: "Pentest Kosten", desc: "Alle Preisfaktoren transparent erklärt – ab 2.500 €.", badge: "Preise", badgeColor: "bg-blue-600" },
              { href: "/pentest-certification", title: "Pentest Zertifizierung", desc: "Warum zertifizierte Pentester wichtig sind – OSCP, CEH & mehr.", badge: "Zertifizierung", badgeColor: "bg-purple-600" },
              { href: "/services/web-application-testing", title: "Web App Pentest", desc: "OWASP Top 10, Business Logic, Auth Bypasses – manuelle Web-Tests.", badge: "Web", badgeColor: "bg-orange-600" },
              { href: "/services/infrastructure-testing", title: "Infrastruktur-Pentest", desc: "Active Directory, Server- und Netzwerk-Penetrationstest.", badge: "Infra", badgeColor: "bg-teal-600" },
              { href: "/pentest-berlin/iso-27001", title: "ISO 27001 Pentest", desc: "Welche Kontrollen einen Pentest erfordern und wie wir Auditreife herstellen.", badge: "ISO 27001", badgeColor: "bg-indigo-600" },
              { href: "/berlin-kmu-pilot", title: "Kostenloser KMU-Pentest", desc: "Bewerben Sie sich für einen vollständig subventionierten Pentest bis 15.000 €.", badge: "Kostenlos", badgeColor: "bg-amber-600" },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="bg-[#0d1117] border border-gray-800 rounded-xl p-5 hover:border-red-500/50 transition-colors group flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold ${item.badgeColor} text-white px-2 py-0.5 rounded`}>{item.badge}</span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-red-400 transition-colors" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-red-400 transition-colors">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Penetrationstest beauftragen – jetzt starten
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Beschreiben Sie Ihre Infrastruktur und Ziele – wir antworten innerhalb von 24 Stunden
          mit einem transparenten Festpreis-Angebot, ohne versteckte Kosten.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />Pentest Kosten Berechnen<ArrowRight className="w-5 h-5" />
          </Link>
          <a href={PHONE_HREF}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Phone className="w-4 h-4" />{PHONE}
          </a>
          <a href={EMAIL_HREF}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Mail className="w-4 h-4" />{EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {["Festpreis – keine Überraschungen", "NDA auf Anfrage", "DSGVO-konform", "Standort Berlin"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-400" />{t}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Oder bewerben Sie sich für unser{" "}
          <Link href="/berlin-kmu-pilot" className="text-red-400 hover:text-red-300 underline underline-offset-2">
            kostenloses KMU-Pilotprogramm
          </Link>{" "}
          – noch 2 Plätze verfügbar.
        </p>
      </section>
    </main>
  );
}
