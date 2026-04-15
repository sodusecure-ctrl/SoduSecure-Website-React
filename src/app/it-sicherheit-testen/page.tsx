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
  Award,
  Globe,
  Server,
  Cloud,
  Network,
  Zap,
  RotateCcw,
} from "lucide-react";

const PHONE = "(+49) 01777750985";
const PHONE_HREF = "tel:+491777750985";
const EMAIL = "info@sodusecure.com";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const TESTBEREICHE = [
  { icon: Globe, title: "Web-App Sicherheitstest", desc: "OWASP Top 10: SQLi, XSS, IDOR, CSRF, SSRF, Auth Bypasses, File Upload – manuell + Proof-of-Concept.", link: "/services/web-application-testing", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Network, title: "Netzwerk Sicherheitstest", desc: "Externe & interne Netzwerkprüfung, offene Dienste, Fehlkonfigurationen, CVE-basierte Schwachstellen.", link: "/services/network-audit", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { icon: Server, title: "Active Directory Test", desc: "Privileged Access, Kerberoasting, Pass-the-Hash, BloodHound-Analyse, Tiering-Überprüfung.", link: "/services/infrastructure-testing", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: Cloud, title: "Cloud Sicherheitstest", desc: "AWS/Azure/GCP – IAM Policies, Storage-Buckets, Netzwerkkonfiguration, Secrets im Code.", link: "/services/cloud-devops-testing", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: Shield, title: "API Sicherheitstest", desc: "OWASP API Top 10 – REST, GraphQL, SOAP: Auth, Rate Limiting, BOLA, Mass Assignment.", link: "/services/api-security-testing", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { icon: Zap, title: "Mobile App Sicherheitstest", desc: "iOS & Android – OWASP Mobile Top 10, unsichere Datenspeicherung, Reverse Engineering.", link: "/services/mobile-app-testing", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
];

const ABLAUF = [
  { step: "01", title: "Konfigurator & Angebot (24 h)", desc: "Online-Konfigurator ausfüllen → sofortiger Festpreis → Angebot per E-Mail in 24 h. Direkt mit Pentester sprechen, kein Vertriebs-Ping-Pong." },
  { step: "02", title: "Kick-off & Setup (½ Tag)", desc: "30-minütiger Kick-off-Call, Scope-Bestätigung, VPN-Zugang oder Test-Account-Einrichtung. Teststart in derselben oder nächsten Woche." },
  { step: "03", title: "Manueller Sicherheitstest (2–10 Tage)", desc: "OSCP-zertifizierte Pentester testen manuell. Keine Scanner-Reports. Tägliche Status-Updates bei laufenden Findings." },
  { step: "04", title: "Bericht + Retest (48 h nach Test)", desc: "Vollständiger Pentest-Bericht: CVSS 3.1, PoC, Maßnahmen, Compliance-Mapping. Kostenloser Retest kritischer Findings." },
];

const FAQS = [
  { q: "Was bedeutet IT Sicherheit testen?", a: "IT Sicherheit testen bedeutet, die eigene IT-Infrastruktur – Web-Apps, Netzwerke, Cloud, Active Directory – gezielt auf Schwachstellen zu prüfen, bevor Angreifer sie finden. Ein professioneller IT Sicherheitstest wird von zertifizierten Experten manuell durchgeführt." },
  { q: "Wie oft sollte ich IT Sicherheit testen lassen?", a: "Mindestens einmal jährlich, und nach jeder größeren Systemänderung (Deployment, neue Infrastruktur). NIS2 und ISO 27001 fordern regelmäßige Sicherheitsprüfungen. Viele Unternehmen testen halbjährlich oder nach jedem Release-Zyklus." },
  { q: "Was kostet ein IT Sicherheitstest?", a: "Ein professioneller IT Sicherheitstest kostet bei SODU Secure ab 2.500 € als Festpreis. Nutzen Sie den Online-Konfigurator für sofortigen Preis – kein Tagessatz, kein Überraschungsbudget." },
  { q: "Kann ich IT Sicherheit remote testen lassen?", a: "Ja – alle IT Sicherheitstests können vollständig remote über VPN oder Test-Account durchgeführt werden. SODU Secure testet deutschlandweit und international." },
  { q: "Was sind die häufigsten Schwachstellen beim IT Sicherheitstest?", a: "Die häufigsten Findings: schwache Authentifizierung (72 %), veraltete Software/CVEs (68 %), unsichere API-Endpunkte (61 %), Active Directory-Fehlkonfigurationen (55 %), überprivilegierte Cloud-Rollen (49 %)." },
  { q: "Bekomme ich nach dem IT Sicherheitstest Unterstützung bei der Behebung?", a: "Ja – der SODU Secure Pentest-Bericht enthält konkrete Remediation-Empfehlungen für jedes Finding. Optional bieten wir einen kostenlosen Retest kritischer Lücken an, um die Behebung zu verifizieren." },
];

export default function ITSicherheitTestenPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">SODU Secure</Link>
            <span>/</span>
            <span className="text-gray-300">IT Sicherheit testen</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm text-purple-400 mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>IT Sicherheit testen · Manuell · Festpreis ab 2.500 € · Ergebnis in 48 h</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">IT Sicherheit testen –</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Manuell. Zertifiziert. Schnell.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            SODU Secure testet Ihre IT-Sicherheit manuell – Web-Apps, Netzwerke,
            Active Directory, Cloud und APIs. OSCP-zertifizierte Experten,
            Festpreis, Pentest-Bericht in 48 h.
          </p>
          <p className="text-sm text-purple-400 mb-10 font-medium">
            ⚡ IT Sicherheitstest Preis sofort berechnen – Konfigurator in 2 Minuten
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/40 hover:scale-105">
              <Calculator className="w-5 h-5" />IT Sicherheitstest konfigurieren
            </Link>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 border border-purple-500/30 hover:border-purple-500/60 text-purple-400 hover:text-purple-300 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              <Phone className="w-4 h-4" />{PHONE}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["Web · Netzwerk · AD · Cloud · API", "OSCP-zertifizierte Pentester", "Festpreis ab 2.500 €", "Bericht in 48 h nach Test"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEED STATS ───────────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "24 h", label: "Festpreisangebot nach Anfrage" },
              { value: "2–10 Tage", label: "Testdauer je nach Scope" },
              { value: "48 h", label: "Bericht nach Testabschluss" },
              { value: "ab 2.500 €", label: "Festpreis, transparent" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTBEREICHE ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Was können Sie testen lassen?</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Vom fokussierten Test eines einzelnen Systems bis zum vollständigen IT Sicherheitstest
              Ihrer gesamten Infrastruktur.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTBEREICHE.map((b) => (
              <Link key={b.title} href={b.link} className={`group bg-white/[0.03] border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200 ${b.bg}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-3 ${b.bg}`}>
                  <b.icon className={`w-5 h-5 ${b.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm group-hover:text-purple-300 transition-colors">{b.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{b.desc}</p>
                <span className={`text-xs ${b.color} flex items-center gap-1`}>Mehr erfahren <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABLAUF ────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">IT Sicherheitstest – Ablauf</h2>
          <p className="text-gray-400 text-sm">Von der Anfrage bis zum Bericht in 4 Schritten. Schnell und unkompliziert.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABLAUF.map((step) => (
            <div key={step.step} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold text-purple-400/30 mb-2">{step.step}</div>
              <h3 className="font-semibold text-white mb-2 text-sm">{step.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-5 bg-purple-500/5 border border-purple-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <p className="text-sm text-gray-300"><strong className="text-white">Retest inklusive:</strong> Kritische und hohe Findings werden nach Ihrer Patchphase kostenlos neu getestet.</p>
          </div>
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105 flex-shrink-0">
            <Calculator className="w-4 h-4" />Test starten <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── PILOT ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-purple-950/40 to-violet-950/40 border-y border-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-4">
            <Star className="w-3.5 h-3.5" /><span>Berlin KMU Pilot 2026 – 2 Plätze frei</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">IT Sicherheit kostenlos testen – Pilotprogramm</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm">
            Berliner KMUs testen ihre IT-Sicherheit kostenlos – vollständiger Pentest im Wert von bis zu 15.000 €.
          </p>
          <Link href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            Kostenlos bewerben <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">IT Sicherheit testen – FAQ</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                aria-expanded={openFaq === i}>
                <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
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
              { label: "BSI IT-Grundschutz – Sicherheitstests", href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html" },
              { label: "OWASP Testing Guide v4.2", href: "https://owasp.org/www-project-web-security-testing-guide/" },
              { label: "NIST Cybersecurity Framework", href: "https://www.nist.gov/cyberframework" },
              { label: "BSI NIS2 –  Technische Sicherheitsmaßnahmen", href: "https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html" },
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
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm text-purple-400 mb-6">
          <Clock className="w-3.5 h-3.5" />Angebot in 24 h – Festpreis, unverbindlich
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">IT Sicherheit jetzt testen lassen</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Manuell, zertifiziert, schnell. Festpreis per Konfigurator, Bericht in 48 h.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />IT Sicherheitstest konfigurieren <ArrowRight className="w-5 h-5" />
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Phone className="w-4 h-4" />{PHONE}
          </a>
          <a href={EMAIL_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Mail className="w-4 h-4" />{EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {["OSCP-zertifiziert", "Festpreis", "Bericht 48 h", "Retest inklusive"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />{t}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
