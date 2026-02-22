"use client";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  FileText,
  Globe,
  Lock,
  Mail,
  Monitor,
  Network,
  Phone,
  Server,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ─── Data ──────────────────────────────────── */

const PACKAGES = [
  {
    id: 1,
    name: "Basis",
    price: "8.000 €",
    duration: "3–4 Wochen",
    popular: false,
    tagline: "Externer Schutz & Awareness",
    components: [
      {
        icon: Globe,
        title: "Externer Pentest",
        details: [
          "Alle öffentlichen IP-Adressen & Server",
          "Cloud-Exposition & exponierte Dienste",
          "Vulnerability Scanning + manuelle Verifikation",
          "Firewall-/DMZ-Konfigurationsprüfung",
          "CVE-basierte Schwachstellenanalyse",
        ],
      },
      {
        icon: Mail,
        title: "Phishing-Kampagne (komplett)",
        details: [
          "Realistische Phishing-Mails nach Ihrem Branding",
          "Klickrate & Credential-Eingabe-Tracking",
          "Auswertung nach Abteilung / Rolle",
          "Awareness-Report mit Handlungsempfehlungen",
          "Vergleich gegen Branchen-Benchmarks",
        ],
      },
      {
        icon: Monitor,
        title: "Web-Präsenz Schnelltest",
        details: [
          "OWASP Top 10 Kurzcheck",
          "Exponierte Admin-Oberflächen & Login-Seiten",
          "SSL/TLS-Konfiguration & Header-Sicherheit",
          "Subdomain-Enumeration",
          "Zusammenfassung im Executive Report",
        ],
      },
    ],
    notIncluded: [
      "Interner Pentest / Active Directory",
      "Vollständiger Web Application Pentest",
    ],
    cta: "Basis-Paket anfragen",
  },
  {
    id: 2,
    name: "Basis + Intern",
    price: "10.500 €",
    duration: "4–5 Wochen",
    popular: true,
    tagline: "Extern + Interne Infrastruktur",
    components: [
      {
        icon: Globe,
        title: "Externer Pentest",
        details: [
          "Alle öffentlichen IP-Adressen & Server",
          "Cloud-Exposition & exponierte Dienste",
          "Vulnerability Scanning + manuelle Verifikation",
          "Firewall-/DMZ-Konfigurationsprüfung",
          "CVE-basierte Schwachstellenanalyse",
        ],
      },
      {
        icon: Mail,
        title: "Phishing-Kampagne (komplett)",
        details: [
          "Realistische Phishing-Mails nach Ihrem Branding",
          "Klickrate & Credential-Eingabe-Tracking",
          "Auswertung nach Abteilung / Rolle",
          "Awareness-Report mit Handlungsempfehlungen",
          "Vergleich gegen Branchen-Benchmarks",
        ],
      },
      {
        icon: Monitor,
        title: "Web-Präsenz Schnelltest",
        details: [
          "OWASP Top 10 Kurzcheck",
          "Exponierte Admin-Oberflächen & Login-Seiten",
          "SSL/TLS-Konfiguration & Header-Sicherheit",
          "Subdomain-Enumeration",
          "Zusammenfassung im Executive Report",
        ],
      },
      {
        icon: Network,
        title: "Interner Pentest / Active Directory",
        details: [
          "Active Directory Enumeration & Fehlkonfigurationen",
          "Privilegien-Eskalation (z. B. Kerberoasting, AS-REP Roasting)",
          "Laterale Bewegungen im internen Netzwerk",
          "Erreichbarkeit kritischer Systeme",
          "Pass-the-Hash / Pass-the-Ticket Szenarien",
          "Detaillierter technischer AD-Report",
        ],
      },
    ],
    notIncluded: ["Vollständiger Web Application Pentest"],
    cta: "Empfohlenes Paket anfragen",
  },
  {
    id: 3,
    name: "Komplett",
    price: "13.000 €",
    duration: "5–6 Wochen",
    popular: false,
    tagline: "Vollständiger 360°-Security-Check",
    components: [
      {
        icon: Globe,
        title: "Externer Pentest",
        details: [
          "Alle öffentlichen IP-Adressen & Server",
          "Cloud-Exposition & exponierte Dienste",
          "Vulnerability Scanning + manuelle Verifikation",
          "Firewall-/DMZ-Konfigurationsprüfung",
          "CVE-basierte Schwachstellenanalyse",
        ],
      },
      {
        icon: Mail,
        title: "Phishing-Kampagne (komplett)",
        details: [
          "Realistische Phishing-Mails nach Ihrem Branding",
          "Klickrate & Credential-Eingabe-Tracking",
          "Auswertung nach Abteilung / Rolle",
          "Awareness-Report mit Handlungsempfehlungen",
          "Vergleich gegen Branchen-Benchmarks",
        ],
      },
      {
        icon: Shield,
        title: "Web Application Pentest (komplett)",
        details: [
          "Manueller Pentest nach OWASP Top 10 & WSTG",
          "Authentifizierung, Session Management, Autorisation",
          "Business Logic Fehler",
          "Injection-Angriffe (SQL, XSS, SSRF etc.)",
          "API-Endpunkte & Datenexposition",
          "Vollständiger technischer WebApp-Report",
        ],
      },
      {
        icon: Network,
        title: "Interner Pentest / Active Directory",
        details: [
          "Active Directory Enumeration & Fehlkonfigurationen",
          "Privilegien-Eskalation (z. B. Kerberoasting, AS-REP Roasting)",
          "Laterale Bewegungen im internen Netzwerk",
          "Erreichbarkeit kritischer Systeme",
          "Pass-the-Hash / Pass-the-Ticket Szenarien",
          "Detaillierter technischer AD-Report",
        ],
      },
    ],
    notIncluded: [],
    cta: "Komplett-Paket anfragen",
  },
];

const DELIVERABLES = [
  {
    icon: FileText,
    title: "Management Summary",
    desc: "Nicht-technische Zusammenfassung für Geschäftsführung und Board – verständlich ohne Cybersecurity-Vorkenntnisse.",
  },
  {
    icon: Server,
    title: "Technischer Report",
    desc: "CVSS-bewertete Schwachstellen mit PoC-Screenshots, Angriffsszenarien und konkreten Remediation-Schritten.",
  },
  {
    icon: Users,
    title: "Phishing Awareness Report",
    desc: "Klickraten nach Abteilung, Risikoeinschätzung und priorisierte Awareness-Maßnahmen für Ihr Team.",
  },
  {
    icon: Star,
    title: "Abschlusspräsentation",
    desc: "Live-Präsentation der Ergebnisse – remote oder vor Ort – für IT-Team und Geschäftsführung gemeinsam.",
  },
];

const QUALIFICATION = [
  "20–150 Mitarbeiter",
  "Microsoft-basierte Infrastruktur (M365 / Active Directory)",
  "Standort Deutschland",
  "Eigene IT oder externer IT-Dienstleister",
  "Mindestens eine öffentliche IP-Adresse oder Server vorhanden",
];

/* ─── Component ─────────────────────────────── */

export default function SMESecurityPackagesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── HERO ──────────────────────────────── */}
      <div className="bg-black text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-6">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              <Lock className="w-3.5 h-3.5" />
              KMU Sicherheits-Komplettpaket
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
              Vollständige IT-Sicherheit<br />
              <span className="text-red-500">für Ihr Unternehmen.</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Unser KMU Sicherheits-Komplettpaket deckt alle relevanten Angriffsvektoren ab –
              extern, organisatorisch und intern. Speziell konzipiert für Unternehmen mit
              20–150 Mitarbeitern, die professionelle Sicherheit ohne Enterprise-Budget benötigen.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/request-pentest")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 flex items-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Jetzt Paket anfragen
              </button>
              <button
                onClick={() => router.push("/contact")}
                className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                Beratungsgespräch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── KMU QUALIFICATION ─────────────────── */}
      <div className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Qualifikation:
            </span>
            {QUALIFICATION.map((q, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {q}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRICING PACKAGES ──────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Pakete & Preise</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Wählen Sie Ihr Sicherheitspaket
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Alle Pakete enthalten Management Summary, technischen Report und Abschlusspräsentation.
            Preise gelten für KMUs mit bis zu 150 Mitarbeitern.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border-2 flex flex-col ${
                pkg.popular
                  ? "border-red-600 shadow-xl shadow-red-600/10"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                    Empfohlen
                  </span>
                </div>
              )}

              <div className={`p-6 sm:p-8 rounded-t-2xl ${pkg.popular ? "bg-gray-900 text-white" : "bg-white"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${pkg.popular ? "text-red-400" : "text-red-600"}`}>
                  {pkg.tagline}
                </p>
                <h3 className={`text-xl font-bold mb-1 ${pkg.popular ? "text-white" : "text-gray-900"}`}>
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className={`text-4xl font-black ${pkg.popular ? "text-white" : "text-gray-900"}`}>
                    {pkg.price}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${pkg.popular ? "text-gray-400" : "text-gray-500"}`}>
                  Projektlaufzeit: {pkg.duration}
                </p>
                <button
                  onClick={() => router.push("/request-pentest")}
                  className={`mt-5 w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {pkg.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-b-2xl flex-1 flex flex-col gap-6">
                {pkg.components.map((comp, ci) => {
                  const Icon = comp.icon;
                  return (
                    <div key={ci}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-red-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm">{comp.title}</h4>
                      </div>
                      <ul className="space-y-1.5 pl-10">
                        {comp.details.map((d, di) => (
                          <li key={di} className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}

                {pkg.notIncluded.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nicht enthalten:</p>
                    {pkg.notIncluded.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <span className="w-3.5 h-3.5 flex-shrink-0 text-gray-300">✕</span>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Alle Preise zzgl. MwSt. · individuelle Angebote möglich ·{" "}
          <button onClick={() => router.push("/contact")} className="text-red-600 underline">
            Kontakt für Sonderpreise
          </button>
        </p>
      </div>

      {/* ── COMPONENT DEEP-DIVE ───────────────── */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Was wir konkret testen</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Jede Komponente erklärt
            </h2>
          </div>

          <div className="space-y-6">
            {/* Externer Pentest */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">In allen Paketen</p>
                      <h3 className="font-bold text-xl text-gray-900">Externer Pentest</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    Wir testen Ihre gesamte externe Angriffsfläche wie ein realer Angreifer – ohne vorherige
                    Informationen über Ihre Infrastruktur (Black-Box). Ziel ist es, alle exponierten Dienste,
                    Schwachstellen und Fehlkonfigurationen zu identifizieren, bevor es ein Angreifer tut.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-800 text-xs leading-relaxed">
                        <strong>Typischer Befund:</strong> Exponierte Admin-Interfaces, veraltete Software-Versionen
                        mit bekannten CVEs, unsichere Cloud-Storage-Konfigurationen.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    "Port-Scanning & Dienst-Enumeration (Nmap, Masscan)",
                    "Vulnerability Assessment (Nessus, OpenVAS)",
                    "Manuelle Verifikation & Exploit-Versuche",
                    "SSL/TLS-Schwachstellen (Heartbleed, POODLE etc.)",
                    "Exponierte Verwaltungsoberflächen (RDP, SSH, VPN)",
                    "E-Mail-Server (SMTP-Relay, SPF/DKIM/DMARC)",
                    "Cloud-Exposure (S3, Azure Blobs, öffentliche APIs)",
                    "DNS-Konfiguration & Zone Transfer",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phishing */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">In allen Paketen</p>
                      <h3 className="font-bold text-xl text-gray-900">Phishing-Kampagne (komplett)</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    Wir simulieren realistische Phishing-Angriffe auf Ihre Mitarbeitenden – angepasst an Ihre
                    Branche und Ihr Unternehmensbranding. Dabei messen wir Klickraten, Credential-Eingaben
                    und liefern eine detaillierte Auswertung nach Abteilung.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-800 text-xs leading-relaxed">
                        <strong>Typischer Befund:</strong> 35–55 % der Mitarbeitenden klicken auf die Phishing-Mail.
                        15–30 % geben ihre Zugangsdaten ein.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    "Individuelle Phishing-Templates nach Ihrem Branding",
                    "Credential-Harvesting-Seite (gefälschtes Login)",
                    "Tracking: Öffnungen, Klicks, Eingaben",
                    "Auswertung nach Abteilungen / Standorten",
                    "Vergleich mit Branchen-Benchmarks",
                    "Zeitlicher Verlauf der Klickraten",
                    "Awareness-Report mit Maßnahmenplan",
                    "Empfehlungen für Security-Awareness-Training",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Web Präsenz */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                      <Monitor className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">Basis & Basis+Intern</p>
                      <h3 className="font-bold text-xl text-gray-900">Web-Präsenz Schnelltest</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    Ein gezielter OWASP Top 10 Check Ihrer wichtigsten Webanwendung (z. B. Firmenwebsite,
                    Kundenportal). Keine vollständige manuelle Analyse, aber ein effizienter Überblick über
                    die kritischsten Schwachstellen.
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    "OWASP Top 10 Überprüfung",
                    "Authentifizierung & Session Management",
                    "SSL/TLS & Security Header Check",
                    "Subdomain-Enumeration",
                    "Exponierte Dateien & Verzeichnisse",
                    "Grundlegende Injection-Tests (XSS, SQLi)",
                    "Admin-Bereiche & Backup-Dateien",
                    "Zusammenfassung im Executive Report",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Web App Komplett (only in Komplett package) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider">Nur im Komplett-Paket</p>
                      <h3 className="font-bold text-xl text-gray-900">Web Application Pentest (komplett)</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    Vollständiger manueller Pentest Ihrer Webanwendung nach OWASP WSTG-Methodik.
                    Wir testen systematisch alle Funktionen, Rollen und Schnittstellen – nicht nur
                    automatisiert, sondern mit echter Exploit-Entwicklung.
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    "Vollständige OWASP Top 10 & WSTG-Abdeckung",
                    "Authentifizierung, Session & Autorisation",
                    "Business Logic Schwachstellen",
                    "Alle Injection-Typen (SQL, XSS, SSRF, XXE, ...)",
                    "API-Endpunkte & REST/GraphQL",
                    "Dateiupload & Datenpunkte",
                    "Multi-Rollen-Testing (User / Admin / API)",
                    "Vollständiger technischer WebApp-Report mit PoC",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interner Pentest / AD */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Network className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider">Basis+Intern & Komplett</p>
                      <h3 className="font-bold text-xl text-gray-900">Interner Pentest / Active Directory</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    Der kritischste Bestandteil für Unternehmen mit Windows-Infrastruktur. Wir analysieren
                    Active Directory auf Fehlkonfigurationen, die Angreifern nach einem initialen Zugriff
                    ermöglichen, die vollständige Kontrolle über Ihre IT zu übernehmen.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-red-800 text-xs leading-relaxed">
                        <strong>Kritisch:</strong> In über 80 % der Microsoft-Umgebungen finden wir
                        mindestens eine Schwachstelle, die zur vollständigen AD-Übernahme führt.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    "AD Enumeration (BloodHound, ldapdomaindump)",
                    "Kerberoasting & AS-REP Roasting",
                    "ACL/ACE Fehlkonfigurationen",
                    "Unconstrained / Constrained Delegation",
                    "Pass-the-Hash & Pass-the-Ticket",
                    "Laterale Bewegungen & Pivot",
                    "Domain Admin Privilege Escalation",
                    "GPO-Missbrauch & DCShadow / DCSync Simulation",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DELIVERABLES ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Ergebnisse</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Was Sie erhalten</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">In jedem Paket – unabhängig von der Variante.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERABLES.map((d, i) => {
            const Icon = d.icon;
            return (
              <div key={i} className="bg-white border-2 border-gray-200 hover:border-red-600 rounded-2xl p-6 transition-colors hover:shadow-lg">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{d.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PILOT PROGRAM BANNER ──────────────── */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Berliner KMU? 6 kostenfreie Plätze verfügbar
          </span>
          <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">
            Testen Sie uns zuerst – kostenlos.
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Als Berliner KMU können Sie sich für unser kostenloses Pilotprogramm bewerben
            und das Komplettpaket zum Nulltarif erhalten.
          </p>
          <Link
            href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
          >
            Zum Pilotprogramm
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── FINAL CTA ─────────────────────────── */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Bereit für Ihren Security-Check?
          </h3>
          <p className="text-gray-500 mb-8">
            Paket aussuchen, Formular ausfüllen – wir melden uns innerhalb von 24 Stunden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/request-pentest")}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Paket anfragen
            </button>
            <a
              href="tel:+4917923962949"
              className="border-2 border-gray-200 text-gray-700 hover:border-gray-900 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              +49 179 239 6294
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
