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
  FileText,
  BarChart3,
  Building2,
  Layers,
  Zap,
  ClipboardList,
} from "lucide-react";

const PHONE = "(+49) 01777750985";
const PHONE_HREF = "tel:+491777750985";
const EMAIL = "info@sodusecure.com";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const AUDIT_UMFANG = [
  { icon: Layers, title: "Technisches Sicherheitsaudit", desc: "Manueller Penetrationstest aller relevanten Systeme – Web, Netzwerk, Active Directory, Cloud, APIs.", badge: "Kernleistung", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: ClipboardList, title: "Prozess & Policy Audit", desc: "Prüfung von Sicherheitsrichtlinien, Zugriffskonzepten, Incident Response Plans und Change Management.", badge: "", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: Building2, title: "Organisatorisches Audit", desc: "Bewertung der Sicherheitsorganisation, Rollen & Verantwortlichkeiten, Security Awareness-Maßnahmen.", badge: "", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { icon: FileText, title: "Compliance Audit (NIS2/ISO 27001)", desc: "Gap-Analyse gegen NIS2 Art. 21, ISO 27001 Annex A, DSGVO Art. 32 mit priorisierten Maßnahmen.", badge: "Pflicht für NIS2", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { icon: BarChart3, title: "Risikobewertung & Roadmap", desc: "CVSS 3.1-Scoring aller Findings, Risk-Matrix, priorisierte Maßnahmen-Roadmap mit Quick Wins.", badge: "", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { icon: Award, title: "Zertifizierungs-vorbereitung", desc: "Sicherheitsaudit als Vorbereitung für ISO 27001-Zertifizierung – konform mit den Anforderungen akkreditierter Zertifizierungsstellen.", badge: "ISO 27001", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
];

const PAKETE = [
  {
    name: "Sicherheitsaudit Basis",
    price: "ab 2.500 €",
    duration: "2–4 Tage",
    focus: "Technischer Fokus",
    items: ["Web-App oder Netzwerk Audit", "CVSS 3.1 Bewertung", "Management Summary", "Remediation Guide", "1x Retest inklusive"],
    highlight: false,
  },
  {
    name: "Sicherheitsaudit Professional",
    price: "ab 8.000 €",
    duration: "1–2 Wochen",
    focus: "Technisch + Compliance",
    items: ["Vollständiger IT Sicherheitsaudit", "NIS2 + ISO 27001 Gap-Analyse", "Policy & Prozess Review", "Executive + Tech-Bericht", "Abschluss­präsentation", "1x Retest inklusive"],
    highlight: true,
  },
  {
    name: "Sicherheitsaudit Enterprise",
    price: "auf Anfrage",
    duration: "2–4 Wochen",
    focus: "Vollständig + Red Team",
    items: ["Gesamte Infrastruktur", "Red Team Elemente", "Org. Sicherheitsaudit", "ISO 27001 Zertifizierungsvorbereitung", "Remediation Workshop", "Unbegrenzte Retests"],
    highlight: false,
  },
];

const FAQS = [
  { q: "Was ist ein IT Sicherheitsaudit?", a: "Ein IT Sicherheitsaudit (Sicherheitsaudit) ist eine umfassende Überprüfung der IT-Sicherheitslage eines Unternehmens – technisch und organisatorisch. Dabei werden Schwachstellen identifiziert, gegen Compliance-Anforderungen geprüft und mit priorisierten Maßnahmen versehen." },
  { q: "Was kostet ein Sicherheitsaudit?", a: "Ein Sicherheitsaudit kostet bei SODU Secure ab 2.500 € (technischer Basis-Audit) bis 8.000 € (vollständiger Audit inkl. Compliance-Prüfung). Nutzen Sie den Konfigurator für einen sofortigen Festpreis – kein Tages­satz, kein Überbudget." },
  { q: "Wie lange dauert ein Sicherheitsaudit?", a: "Ein fokussierter IT Sicherheitsaudit dauert 2–5 Tage. Ein vollständiger Unternehmens-Audit (technisch + Compliance + organisatorisch) 1–2 Wochen. Bericht-Lieferung 48 Stunden nach Testabschluss." },
  { q: "Für welche Compliance-Anforderungen brauche ich einen Sicherheitsaudit?", a: "NIS2 (Art. 21 – regelmäßige Risikomanagement-Maßnahmen), ISO 27001 (Annex A.12.6), DSGVO Art. 32 (technische Sicherheitsmaßnahmen) und DORA (Art. 26 – ICT risk management) fordern alle regelmäßige Sicherheitsüberprüfungen durch Experten." },
  { q: "Was unterscheidet einen Sicherheitsaudit von einem Penetrationstest?", a: "Ein Penetrationstest fokussiert auf technische Exploitation (manuell, PoC). Ein Sicherheitsaudit ist breiter: er umfasst technisches Testing + Policy-Prüfung + Compliance-Gap-Analyse + organisatorische Bewertung. SODU Secure kombiniert beides in einem Audit." },
  { q: "Kann ich den Sicherheitsaudit für die ISO 27001-Zertifizierung verwenden?", a: "Ja – ein SODU Secure Sicherheitsaudit-Bericht ist auf die Anforderungen akkreditierter ISO 27001-Zertifizierungsstellen ausgerichtet. Er adressiert direkt Annex A Controls und liefert den Nachweis für das Statement of Applicability (SoA)." },
];

export default function SicherheitsauditPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">SODU Secure</Link>
            <span>/</span>
            <span className="text-gray-300">Sicherheitsaudit</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 text-sm text-cyan-400 mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Sicherheitsaudit · NIS2 & ISO 27001 · Festpreis · Bericht in 48 h</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">IT Sicherheitsaudit –</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Technisch. Compliant. Festpreis.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            SODU Secure führt manuelle IT Sicherheitsaudits durch –
            technisches Pentesting plus Compliance-Prüfung (NIS2, ISO 27001, DSGVO).
            OSCP-zertifiziert, Festpreis, schnelle Abwicklung.
          </p>
          <p className="text-sm text-cyan-400 mb-10 font-medium">
            ⚡ Festpreisangebot per Konfigurator – Angebot in 24 h, Bericht in 48 h nach Test
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-900/40 hover:scale-105">
              <Calculator className="w-5 h-5" />Sicherheitsaudit konfigurieren
            </Link>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:text-cyan-300 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              <Phone className="w-4 h-4" />{PHONE}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["OSCP-zertifiziert", "NIS2 & ISO 27001 konform", "Festpreis – kein Tagessatz", "Bericht in 48 h"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIT-UMFANG ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Was umfasst ein Sicherheitsaudit?</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Ein vollständiger IT Sicherheitsaudit geht über technisches Testing hinaus –
              er prüft Ihre gesamte Sicherheitslage.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AUDIT_UMFANG.map((u) => (
              <div key={u.title} className={`bg-white/[0.03] border rounded-2xl p-6 ${u.bg}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-3 ${u.bg}`}>
                  <u.icon className={`w-5 h-5 ${u.color}`} />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">{u.title}</h3>
                  {u.badge && <span className={`text-xs px-2 py-0.5 rounded-full border ${u.bg} ${u.color}`}>{u.badge}</span>}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAKETE ────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Sicherheitsaudit Preise & Pakete</h2>
          <p className="text-gray-400 text-sm">Transparente Festpreise – kein Tagessatz, keine versteckten Kosten.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {PAKETE.map((pkg) => (
            <div key={pkg.name} className={`relative rounded-2xl p-8 border ${pkg.highlight ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-white/[0.03] border-white/10'}`}>
              {pkg.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">Beliebtestes Paket</div>}
              <h3 className="font-bold text-white text-lg mb-1">{pkg.name}</h3>
              <p className="text-xs text-gray-500 mb-1">{pkg.duration}</p>
              <p className="text-xs text-cyan-500/70 mb-3">{pkg.focus}</p>
              <div className={`text-2xl font-bold mb-6 ${pkg.highlight ? 'text-cyan-400' : 'text-white'}`}>{pkg.price}</div>
              <ul className="space-y-2 mb-6">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <Link href="/request-pentest"
                className={`w-full inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105 ${pkg.highlight ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'border border-white/20 hover:border-white/40 text-gray-300 hover:text-white'}`}>
                <Calculator className="w-4 h-4" />Preis berechnen
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── USPs ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Warum SODU Secure für Ihren Sicherheitsaudit?</h2>
              <div className="space-y-4">
                {[
                  { icon: Award, title: "OSCP & CEH-zertifiziert", desc: "Nachgewiesene technische Expertise – keine Scan-Reseller.", color: "text-red-400" },
                  { icon: Zap, title: "Schneller Abschluss", desc: "Angebot 24 h, Teststart innerhalb 1 Woche, Bericht 48 h nach Test.", color: "text-yellow-400" },
                  { icon: Calculator, title: "Sofortiger Festpreis", desc: "Online-Konfigurator – Preis in 2 Minuten, kein Vertriebsgespräch.", color: "text-green-400" },
                  { icon: FileText, title: "Compliance-ready Berichte", desc: "NIS2, ISO 27001, DSGVO Art. 32, DORA – direkt einsetzbar.", color: "text-blue-400" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-b from-cyan-950/30 to-teal-950/20 border border-cyan-500/20 rounded-2xl p-8 text-center">
              <p className="text-sm text-gray-400 mb-2">Kostenlos & unverbindlich</p>
              <h3 className="text-xl font-bold mb-4">Festpreisangebot in 24 h</h3>
              <p className="text-xs text-gray-400 mb-6">Kein Tagessatz. Kein Überbudget. Direkter Kontakt zum Pentester – kein Vertriebsumweg.</p>
              <Link href="/request-pentest"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105 w-full justify-center mb-3">
                <Calculator className="w-4 h-4" />Sicherheitsaudit konfigurieren
              </Link>
              <a href={PHONE_HREF}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 w-full justify-center">
                <Phone className="w-4 h-4" />{PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILOT ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-cyan-950/40 to-teal-950/40 border-y border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-4 py-1.5 text-sm text-cyan-300 mb-4">
            <Star className="w-3.5 h-3.5" /><span>Nur 2 Plätze – Berlin KMU Pilot 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Sicherheitsaudit gratis für Berliner KMUs</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm">
            Berliner KMUs erhalten einen vollständigen IT Sicherheitsaudit inkl. Penetrationstest
            und Compliance-Bericht – kostenlos, im Wert von bis zu 15.000 €.
          </p>
          <Link href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            Jetzt bewerben <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Sicherheitsaudit – FAQ</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                aria-expanded={openFaq === i}>
                <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
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
              { label: "BSI IT-Grundschutz – Sicherheitsaudits", href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html" },
              { label: "ISO 27001 – Information Security Audit", href: "https://www.iso.org/isoiec-27001-information-security.html" },
              { label: "BSI NIS2 – Sicherheitsanforderungen", href: "https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html" },
              { label: "DORA – ICT Risk Management Anforderungen", href: "https://www.eba.europa.eu/regulation-and-policy/operational-resilience/dora" },
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
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 text-sm text-cyan-400 mb-6">
          <Clock className="w-3.5 h-3.5" />Angebot in 24 h – Festpreis, kostenlos & unverbindlich
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Jetzt Sicherheitsaudit beauftragen</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          OSCP-zertifiziert, NIS2- & ISO 27001-konform, Festpreis per Konfigurator, Bericht in 48 h.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />Sicherheitsaudit konfigurieren <ArrowRight className="w-5 h-5" />
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Phone className="w-4 h-4" />{PHONE}
          </a>
          <a href={EMAIL_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Mail className="w-4 h-4" />{EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {["OSCP-zertifiziert", "NIS2 & ISO 27001", "Festpreis", "Bericht 48 h"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />{t}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
