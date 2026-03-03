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
  Star,
  Phone,
  Mail,
  BookOpen,
  ExternalLink,
  Clock,
  Search,
  BarChart3,
  AlertTriangle,
  FileText,
  Layers,
  Zap,
} from "lucide-react";

const PHONE = "+49 179 239 6294";
const PHONE_HREF = "tel:+4917923962949";
const EMAIL = "sodusecure@gmail.com";
const EMAIL_HREF = "mailto:sodusecure@gmail.com";

const ANALYSEBEREICHE = [
  { icon: BarChart3, title: "CVE & Patch-Status Analyse", desc: "Systematische Prüfung aller Systeme auf bekannte CVEs, veraltete Software-Versionen und fehlende Sicherheitsupdates.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { icon: Layers, title: "Konfigurationsanalyse", desc: "Fehlkonfigurationen in Firewalls, Web-Servern, Datenbanken, Cloud-Diensten und Active Directory aufdecken.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Search, title: "Code & Dependency Analyse", desc: "SAST-gestützte Code-Prüfung und SCA für veraltete/verwundbare Abhängigkeiten (npm, pip, Maven, etc.).", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { icon: Shield, title: "Web App Schwachstellenanalyse", desc: "OWASP Top 10 – automatisierte Basis-Analyse + manuelle Vertiefung der kritischen Findings.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: AlertTriangle, title: "Netzwerk Schwachstellenanalyse", desc: "Port-Scanning, Service-Fingerprinting, Banner-Grabbing, bekannte Exploits auf alle exponierten Dienste.", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { icon: FileText, title: "Compliance Gap Analyse", desc: "Schwachstellen im Kontext von NIS2, ISO 27001 und DSGVO Art. 32 – Lückenanalyse mit Prioritäts-Roadmap.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
];

const VERGLEICH_ROWS = [
  { kriterium: "Schwachstellen identifizieren", analyse: true, pentest: true },
  { kriterium: "CVSS 3.1 Bewertung", analyse: true, pentest: true },
  { kriterium: "Manuelle Exploitation (Proof-of-Concept)", analyse: false, pentest: true },
  { kriterium: "Vollständige Angriffsketten beweisen", analyse: false, pentest: true },
  { kriterium: "NIS2 Art. 21 Nachweis", analyse: "teilweise", pentest: true },
  { kriterium: "Testdauer", analyse: "1–3 Tage", pentest: "2–10 Tage" },
  { kriterium: "Preis bei SODU Secure", analyse: "ab 1.500 €", pentest: "ab 2.500 €" },
];

const FAQS = [
  { q: "Was ist eine Schwachstellenanalyse?", a: "Eine Schwachstellenanalyse (Vulnerability Assessment) ist eine systematische Prüfung Ihrer IT-Systeme auf bekannte Sicherheitslücken. Im Gegensatz zum Penetrationstest werden Schwachstellen identifiziert und nach CVSS bewertet, aber nicht aktiv ausgenutzt." },
  { q: "Was ist der Unterschied zwischen Schwachstellenanalyse und Penetrationstest?", a: "Schwachstellenanalyse = Identifikation und Bewertung von Sicherheitslücken (CVSS 3.1). Penetrationstest = Zusätzlich manuelle Exploitation mit Proof-of-Concepts. Für NIS2 Art. 21 empfiehlt sich ein vollständiger Penetrationstest. Bei eingeschränktem Budget ist die Schwachstellenanalyse ein guter Einstieg." },
  { q: "Was kostet eine Schwachstellenanalyse?", a: "Eine professionelle Schwachstellenanalyse kostet bei SODU Secure ab 1.500 € (reine Analyse) bzw. ab 2.500 € für Schwachstellenanalyse mit manuellem Vertiefungs-Pentest. Nutzen Sie den Konfigurator für den genauen Festpreis." },
  { q: "Wie lange dauert eine Schwachstellenanalyse?", a: "Eine fokussierte Schwachstellenanalyse (1–2 Systeme) dauert 1–3 Tage. Eine umfassende Analyse der gesamten Infrastruktur 3–7 Tage. Der Bericht wird innerhalb von 48 Stunden nach Abschluss geliefert." },
  { q: "Welche Tools werden bei der Schwachstellenanalyse eingesetzt?", a: "SODU Secure kombiniert automatisierte Basis-Tools (Nessus, OpenVAS, Nikto) mit manueller Vertiefung durch OSCP-zertifizierte Experten. Das Ergebnis: keine False Positives, echte Proof-of-Concepts für kritische Findings." },
  { q: "Reicht eine Schwachstellenanalyse für ISO 27001?", a: "Eine Schwachstellenanalyse erfüllt die Grundanforderungen von ISO 27001 Annex A.12.6. Für eine vollständige ISO 27001-Zertifizierung und NIS2 Art. 21-Nachweis empfiehlt sich ergänzend ein vollständiger Penetrationstest." },
];

export default function SchwachstellenanalysePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">SODU Secure</Link>
            <span>/</span>
            <span className="text-gray-300">Schwachstellenanalyse</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-sm text-orange-400 mb-6">
            <Search className="w-3.5 h-3.5" />
            <span>Schwachstellenanalyse · Vulnerability Assessment · CVSS 3.1 · Festpreis</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Schwachstellenanalyse –</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Sicherheitslücken finden. Schnell.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            SODU Secure führt professionelle Schwachstellenanalysen (Vulnerability Assessments)
            durch – CVSS 3.1-Bewertung, manuell verifiziert, Bericht in 48 h.
            Festpreis, kein Tagessatz.
          </p>
          <p className="text-sm text-orange-400 mb-10 font-medium">
            ⚡ Preis sofort per Konfigurator berechnen – Angebot in 24 h
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-900/40 hover:scale-105">
              <Calculator className="w-5 h-5" />Schwachstellenanalyse konfigurieren
            </Link>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 border border-orange-500/30 hover:border-orange-500/60 text-orange-400 hover:text-orange-300 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              <Phone className="w-4 h-4" />{PHONE}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["CVSS 3.1 Bewertung", "Manuell verifiziert – keine False Positives", "Festpreis ab 1.500 €", "Bericht in 48 h"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANALYSEBEREICHE ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Was analysiert SODU Secure?</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Unsere Schwachstellenanalyse umfasst alle relevanten Bereiche Ihrer IT-Infrastruktur –
              technisch und compliance-orientiert.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ANALYSEBEREICHE.map((b) => (
              <div key={b.title} className={`bg-white/[0.03] border rounded-2xl p-6 ${b.bg}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-3 ${b.bg}`}>
                  <b.icon className={`w-5 h-5 ${b.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{b.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERGLEICH ─────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Schwachstellenanalyse vs.{" "}
            <span className="text-orange-400">Penetrationstest</span>
          </h2>
          <p className="text-gray-400 text-sm">Was ist der Unterschied – und wann brauchen Sie was?</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3 bg-white/[0.03] border-b border-white/10">
            <span>Kriterium</span>
            <span className="text-orange-400">Schwachstellen­analyse</span>
            <span className="text-green-400">Penetrationstest</span>
          </div>
          {VERGLEICH_ROWS.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 px-6 py-4 text-sm border-b border-white/5 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
              <span className="text-gray-400 text-xs pr-2">{row.kriterium}</span>
              <span className="text-xs">
                {row.analyse === true ? <CheckCircle className="w-4 h-4 text-green-400" /> : row.analyse === false ? <span className="text-gray-600">✕</span> : <span className="text-orange-400">{row.analyse}</span>}
              </span>
              <span className="text-xs">
                {row.pentest === true ? <CheckCircle className="w-4 h-4 text-green-400" /> : row.pentest === false ? <span className="text-gray-600">✕</span> : <span className="text-green-400">{row.pentest}</span>}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl flex items-start gap-3">
          <Zap className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-300">
            <strong className="text-white">Empfehlung:</strong> Für NIS2-Nachweis und ISO 27001-Zertifizierung empfehlen wir einen vollständigen
            Penetrationstest. Eine Schwachstellenanalyse ist ein guter Einstieg oder ergänzend zu Pentests empfehlenswert.
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />Jetzt konfigurieren <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── PILOT ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-orange-950/40 to-amber-950/40 border-y border-orange-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1.5 text-sm text-orange-300 mb-4">
            <Star className="w-3.5 h-3.5" /><span>Berlin KMU Pilot 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Schwachstellenanalyse + Pentest gratis für Berliner KMUs</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm">
            Berliner Unternehmen erhalten eine vollständige Schwachstellenanalyse
            inkl. Penetrationstest – kostenlos, im Wert von bis zu 15.000 €.
          </p>
          <Link href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            Jetzt bewerben <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Schwachstellenanalyse – FAQ</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                aria-expanded={openFaq === i}>
                <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-orange-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
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
          <h2 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4" />Externe Quellen</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: "NIST NVD – CVE Datenbank", href: "https://nvd.nist.gov/" },
              { label: "CVSS 3.1 Spezifikation – NIST", href: "https://nvd.nist.gov/vuln-metrics/cvss" },
              { label: "OWASP Top 10 – Web Vulnerabilities", href: "https://owasp.org/www-project-top-ten/" },
              { label: "ISO 27001 Annex A.12.6 – Schwachstellenmanagement", href: "https://www.iso.org/isoiec-27001-information-security.html" },
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
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-sm text-orange-400 mb-6">
          <Clock className="w-3.5 h-3.5" />Festpreisangebot in 24 h – kostenlos & unverbindlich
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Schwachstellenanalyse beauftragen</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Festpreis per Konfigurator, CVSS 3.1-Bericht, manuell verifiziert – kein False-Positive-Spam.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />Jetzt konfigurieren <ArrowRight className="w-5 h-5" />
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Phone className="w-4 h-4" />{PHONE}
          </a>
          <a href={EMAIL_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Mail className="w-4 h-4" />{EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {["CVSS 3.1", "Manuell verifiziert", "Festpreis", "Bericht 48 h"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />{t}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
