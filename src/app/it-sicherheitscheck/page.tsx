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
  Zap,
  Clock,
  Star,
  Globe,
  Server,
  Cloud,
  Network,
  Lock,
  FileText,
  Phone,
  Mail,
  BookOpen,
  ExternalLink,
  Timer,
} from "lucide-react";

const PHONE = "(+49) 01777750985";
const PHONE_HREF = "tel:+491777750985";
const EMAIL = "info@sodusecure.com";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const BEREICHE = [
  { icon: Globe, title: "Web-Applikationen", desc: "OWASP Top 10, Auth-Bypasses, SQL Injection, XSS, IDOR, Business Logic", badge: "ab 2 Tagen", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Network, title: "Netzwerkinfrastruktur", desc: "Firewall-Konfiguration, offene Ports, Segmentierung, Lateral Movement", badge: "ab 2 Tagen", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { icon: Server, title: "Active Directory", desc: "Kerberoasting, Pass-the-Hash, DCSync, GPO Abuse, Privilege Escalation", badge: "ab 3 Tagen", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: Cloud, title: "Cloud (AWS/Azure/GCP)", desc: "IAM-Eskalation, S3/Blob-Fehlkonfigurationen, Secrets Management", badge: "ab 3 Tagen", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: Lock, title: "API Security", desc: "OWASP API Top 10, REST/GraphQL-Angriffe, Auth-Tokens, Rate Limiting", badge: "ab 2 Tagen", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { icon: FileText, title: "Compliance-Check", desc: "NIS2 Art. 21, ISO 27001 Annex A, DSGVO Art. 32, DORA", badge: "ab 1 Tag", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
];

const ABLAUF = [
  { step: "01", title: "Scope & Angebot – 24h", desc: "Konfigurator ausfüllen oder anrufen → Festpreisangebot innerhalb von 24 Stunden. Kein Vertriebsgespräch, direkt zum Experten.", icon: Calculator },
  { step: "02", title: "Kick-off & Zugangs­einrichtung – 1 Tag", desc: "Kurzes Kick-off (30 Min.), VPN-Zugang oder Test-Account einrichten. Zeitplan für 2–5 Testtage festlegen.", icon: Timer },
  { step: "03", title: "Manueller Sicherheitscheck – 2–5 Tage", desc: "OSCP-zertifizierte Pentester führen den manuellen IT Sicherheitscheck durch. Tägliche Status-Updates.", icon: Shield },
  { step: "04", title: "Bericht & Präsentation – 48 h", desc: "Detaillierter Pentest-Bericht mit CVSS 3.1, Proof-of-Concepts, Sofortmaßnahmen und Road­map. Persönliche Abschlusspräsentation.", icon: FileText },
];

const FAQS = [
  { q: "Was ist ein IT Sicherheitscheck?", a: "Ein IT Sicherheitscheck (auch IT Security Check) ist eine systematische manuelle Prüfung Ihrer IT-Infrastruktur durch Sicherheitsexperten. Im Gegensatz zu automatisierten Scannern decken zertifizierte Pentester auch komplexe Logikfehler und Angriffsketten auf." },
  { q: "Wie schnell erhalte ich Ergebnisse?", a: "SODU Secure liefert den vollständigen IT Sicherheitscheck-Bericht innerhalb von 48 Stunden nach Testabschluss. Für kritische Findings kommunizieren wir sofort während des Tests. Das macht uns zu einem der schnellsten Pentest-Anbieter in Deutschland." },
  { q: "Was kostet ein IT Sicherheitscheck?", a: "Ein IT Sicherheitscheck kostet bei SODU Secure ab 2.500 € als Festpreis. Der genaue Preis hängt vom Umfang (Web-App, Netzwerk, AD, Cloud) ab. Nutzen Sie den Konfigurator für sofortige Preistransparenz – kein Verkaufsgespräch nötig." },
  { q: "Kann ein IT Sicherheitscheck remote durchgeführt werden?", a: "Ja – der IT Sicherheitscheck wird vollständig remote über VPN oder Test-Account durchgeführt. Für interne Infrastruktur-Checks kann optional auch ein Vor-Ort-Einsatz in Berlin und Umgebung vereinbart werden." },
  { q: "Welche Compliance-Anforderungen erfüllt ein IT Sicherheitscheck?", a: "Ein SODU Secure IT Sicherheitscheck liefert Nachweise für NIS2 (Art. 21 Risikomanagement), ISO 27001 (Annex A), DSGVO Art. 32 und DORA. Der Bericht ist für die Vorlage bei Behörden und Versicherungen geeignet." },
  { q: "Was ist der Unterschied zwischen IT Sicherheitscheck und Penetrationstest?", a: "Die Begriffe werden oft synonym verwendet. Ein IT Sicherheitscheck ist oft etwas breiter gefasst und kann neben technischem Testing auch Prozess- und Konfigurationsprüfungen umfassen. Ein Penetrationstest fokussiert tiefer auf die aktive Exploitation von Schwachstellen. SODU Secure kombiniert beides." },
];

export default function ITSicherheitscheckPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">SODU Secure</Link>
            <span>/</span>
            <span className="text-gray-300">IT Sicherheitscheck</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>IT Sicherheitscheck · Ergebnis in 2–5 Tagen · Festpreis ab 2.500 €</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">IT Sicherheitscheck</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Schnell. Manuell. Festpreis.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Lassen Sie Ihre IT-Sicherheit von OSCP-zertifizierten Experten prüfen.
            Web-Apps, Netzwerke, Active Directory und Cloud – manuell getestet,
            Bericht in 48 Stunden. Kein Tagessatz, kein Überraschungsbudget.
          </p>
          <p className="text-sm text-green-400 mb-10 font-medium">
            ⚡ Festpreisangebot per Konfigurator in unter 2 Minuten – sofort & unverbindlich
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/40 hover:scale-105">
              <Calculator className="w-5 h-5" />IT Sicherheitscheck konfigurieren
            </Link>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 border border-green-500/30 hover:border-green-500/60 text-green-400 hover:text-green-300 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              <Phone className="w-4 h-4" />{PHONE}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["Ergebnis in 2–5 Tagen", "Festpreis – keine Tagessätze", "OSCP-zertifiziert", "Bericht in 48 h"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEED USP ─────────────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "24 h", label: "Angebot nach Anfrage" },
              { value: "2–5 Tage", label: "Testdauer (fokussiert)" },
              { value: "48 h", label: "Bericht nach Testende" },
              { value: "ab 2.500 €", label: "Festpreis, kein Tagessatz" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAS WIRD GECHECKT ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Was prüft ein IT Sicherheitscheck?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Je nach Paket umfasst der IT Sicherheitscheck einzelne oder alle Bereiche –
              genau auf Ihre Infrastruktur zugeschnitten.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BEREICHE.map((b) => (
              <div key={b.title} className={`bg-white/[0.03] border rounded-2xl p-6 ${b.bg}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-3 ${b.bg}`}>
                  <b.icon className={`w-5 h-5 ${b.color}`} />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">{b.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${b.bg} ${b.color}`}>{b.badge}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-green-500/5 border border-green-500/20 rounded-2xl text-center">
            <p className="text-sm text-gray-300 mb-3">Nicht sicher, welche Bereiche geprüft werden sollten?</p>
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105">
              <Calculator className="w-4 h-4" />Scope im Konfigurator festlegen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABLAUF ────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            IT Sicherheitscheck – So läuft es ab
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Von der Anfrage bis zum Bericht in 4 einfachen Schritten.
            Schnell, klar und ohne unnötige Bürokratie.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABLAUF.map((step) => (
            <div key={step.step} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold text-green-400/30">{step.step}</span>
                <step.icon className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">{step.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PAKETE ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">IT Sicherheitscheck Preise</h2>
            <p className="text-gray-400 text-sm">Transparente Festpreise – kein Tagessatz, keine versteckten Kosten.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: "Basic Check", price: "ab 2.500 €", duration: "2–3 Tage", items: ["1 Web-App oder Netzwerk", "OWASP / CVE Prüfung", "CVSS 3.1 Bewertung", "Management Summary", "Remediation Guide", "1× Retest inklusive"], highlight: false },
              { name: "Professional Check", price: "ab 6.500 €", duration: "3–5 Tage", items: ["Web-App + Netzwerk + AD", "Manuelle Exploitation", "Proof-of-Concepts", "Compliance-Bericht (NIS2/ISO)", "Abschlusspräsentation", "1× Retest inklusive"], highlight: true },
              { name: "Enterprise Check", price: "ab 12.000 €", duration: "1–2 Wochen", items: ["Vollständige IT-Infrastruktur", "Cloud + AD + APIs + Web", "Red Team Elemente", "Executive + technischer Report", "Remediation Workshop", "Unbegrenzte Retests"], highlight: false },
            ].map((pkg) => (
              <div key={pkg.name} className={`relative rounded-2xl p-8 border ${pkg.highlight ? 'bg-green-950/20 border-green-500/30' : 'bg-white/[0.03] border-white/10'}`}>
                {pkg.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full">Beliebtestes Paket</div>}
                <h3 className="font-bold text-white text-lg mb-1">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{pkg.duration}</p>
                <div className={`text-2xl font-bold mb-6 ${pkg.highlight ? 'text-green-400' : 'text-white'}`}>{pkg.price}</div>
                <ul className="space-y-2 mb-6">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
                <Link href="/request-pentest"
                  className={`w-full inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105 ${pkg.highlight ? 'bg-green-600 hover:bg-green-500 text-white' : 'border border-white/20 hover:border-white/40 text-gray-300 hover:text-white'}`}>
                  <Calculator className="w-4 h-4" />Preis berechnen
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILOT ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-green-950/40 to-emerald-950/40 border-y border-green-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 text-sm text-green-300 mb-4">
            <Star className="w-3.5 h-3.5" /><span>Nur noch 2 Plätze verfügbar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">IT Sicherheitscheck gratis – Berliner KMU Pilot 2026</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm">
            Berliner KMUs mit 20–150 Mitarbeitern erhalten einen subventionierten
            IT Sicherheitscheck im Wert von bis zu 15.000 € – kostenlos.
          </p>
          <Link href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            Jetzt kostenlos bewerben <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">IT Sicherheitscheck – FAQ</h2>
          <p className="text-gray-400 text-sm">Häufige Fragen zum IT Sicherheitscheck, Ablauf und Kosten.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                aria-expanded={openFaq === i}>
                <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-green-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── EXTERNE QUELLEN ───────────────────────────────────────────────────── */}
      <section className="py-10 bg-[#131927] border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4" />Externe Quellen & Weiterführendes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: "OWASP Testing Guide v4.2 – Web Security Check", href: "https://owasp.org/www-project-web-security-testing-guide/" },
              { label: "BSI IT-Grundschutz – Sicherheitscheck Grundlagen", href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html" },
              { label: "BSI NIS2 – Anforderungen an Sicherheitsprüfungen", href: "https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html" },
              { label: "CVSS 3.1 Scoring – NIST", href: "https://nvd.nist.gov/vuln-metrics/cvss" },
            ].map((src) => (
              <a key={src.label} href={src.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{src.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 mb-6">
          <Clock className="w-3.5 h-3.5" />Angebot in 24 Stunden – kostenlos & unverbindlich
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Jetzt IT Sicherheitscheck starten
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Festpreisangebot per Konfigurator in unter 2 Minuten. OSCP-zertifizierte Pentester.
          Ergebnis in 2–5 Tagen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />IT Sicherheitscheck konfigurieren <ArrowRight className="w-5 h-5" />
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Phone className="w-4 h-4" />{PHONE}
          </a>
          <a href={EMAIL_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Mail className="w-4 h-4" />{EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {["OSCP-zertifiziert", "Festpreis", "Bericht in 48 h", "DSGVO-konform"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />{t}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
