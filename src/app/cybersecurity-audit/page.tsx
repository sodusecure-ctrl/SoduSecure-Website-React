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
  FileText,
  Phone,
  Mail,
  BookOpen,
  ExternalLink,
  Clock,
  Award,
  BarChart3,
  AlertTriangle,
  Building2,
  Zap,
} from "lucide-react";

const PHONE = "(+49) 01777750985";
const PHONE_HREF = "tel:+491777750985";
const EMAIL = "info@sodusecure.com";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const AUDIT_TYPEN = [
  { title: "Web Application Audit", desc: "OWASP Top 10, Auth, Business Logic, API Security – vollständiger Web-Check inklusive Proof-of-Concepts.", badge: "Sehr gefragt", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { title: "Netzwerk & Infrastruktur Audit", desc: "Firewall-Regeln, Segmentierung, Erreichbarkeit, CVE-Check auf alle Netzwerkkomponenten.", badge: "", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { title: "Active Directory Audit", desc: "Privileged Access, GPO-Überprüfung, Kerberoasting-Prüfung, Tiering-Konzept-Analyse.", badge: "NIS2-relevant", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { title: "Cloud Security Audit", desc: "AWS/Azure/GCP – IAM, Storage-Policies, Netzwerkkonfiguration, Secrets Management.", badge: "", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { title: "Compliance Audit (NIS2/ISO 27001)", desc: "Lückenanalyse gegen NIS2 Art. 21, ISO 27001 Annex A, DSGVO Art. 32 und DORA.", badge: "Pflicht-Audit", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { title: "Vollständiger Cybersecurity Audit", desc: "Kombination aller Bereiche – Web, Netzwerk, AD, Cloud und Compliance in einem Projekt.", badge: "Enterprise", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
];

const COMPLIANCE = [
  { name: "NIS2", detail: "Art. 21 – Risikomanagement, regelmäßige Sicherheitsprüfungen", color: "text-blue-400" },
  { name: "ISO 27001", detail: "Annex A – A.12.6 Management technischer Schwachstellen", color: "text-purple-400" },
  { name: "DSGVO", detail: "Art. 32 – Sicherheit der Verarbeitung", color: "text-green-400" },
  { name: "DORA", detail: "Art. 26 – Testen der digitalen Betriebsstabilität", color: "text-orange-400" },
  { name: "ISO 27018", detail: "Cloud-Datenschutz – Security Controls", color: "text-cyan-400" },
  { name: "SOC 2", detail: "Security Trust Service Criteria – Availability & Confidentiality", color: "text-red-400" },
];

const FAQS = [
  { q: "Was ist ein Cybersecurity Audit?", a: "Ein Cybersecurity Audit ist eine systematische Prüfung der gesamten IT-Sicherheitslage eines Unternehmens – technisch und prozessual. Dabei werden Schwachstellen in Web-Apps, Netzwerken, Cloud-Umgebungen und intern erkannt, nach CVSS 3.1 bewertet und mit Maßnahmenempfehlungen versehen." },
  { q: "Was kostet ein Cybersecurity Audit?", a: "Ein Cybersecurity Audit kostet bei SODU Secure ab 2.500 € als Festpreis. Umfangreiche Audits (Full-Stack inkl. Compliance-Prüfung) starten ab 8.000 €. Nutzen Sie den Konfigurator für sofortige Preistransparenz – kein Tagessatz, kein Überbudget." },
  { q: "Wie lange dauert ein Cybersecurity Audit?", a: "Ein fokussierter Cyber Security Audit (z.B. nur Web oder Netzwerk) dauert 2–5 Tage. Vollständige Unternehmens-Audits inkl. Active Directory und Cloud 1–3 Wochen. Der Bericht wird 48 Stunden nach Testabschluss geliefert." },
  { q: "Erfüllt ein Cybersecurity Audit NIS2-Pflichten?", a: "Ja – ein SODU Secure Cybersecurity Audit erfüllt die NIS2-Anforderungen für regelmäßige technische Sicherheitsprüfungen (Art. 21 Abs. 2 lit. g). Der Bericht ist für die Vorlage bei Behörden und für ISO 27001 Zertifizierungen geeignet." },
  { q: "Was ist der Unterschied zwischen Cybersecurity Audit und Penetrationstest?", a: "Der Begriff Cybersecurity Audit umfasst oft sowohl technisches Pentesting als auch prozessuale und Compliance-Prüfungen. Ein klassischer Penetrationstest fokussiert tiefer auf technische Exploitation. SODU Secure kombiniert beides – technisches Pentesting + Compliance-Mapping in einem Bericht." },
  { q: "Wer braucht einen Cybersecurity Audit?", a: "Unternehmen ab 50 Mitarbeitern oder Unternehmen in regulierten Sektoren (Energie, Finance, Gesundheit) sind unter NIS2 zur regelmäßigen Prüfung verpflichtet. Aber auch KMUs sollten mindestens jährlich einen Cybersecurity Audit beauftragen." },
];

export default function CybersecurityAuditPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">SODU Secure</Link>
            <span>/</span>
            <span className="text-gray-300">Cybersecurity Audit</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Cybersecurity Audit · NIS2 & ISO 27001 konform · Festpreis ab 2.500 €</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Cybersecurity Audit –</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Manuell. Compliant. Festpreis.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            SODU Secure führt manuelle Cybersecurity Audits für Unternehmen durch –
            OSCP-zertifiziert, NIS2- und ISO 27001-konforme Berichte, Festpreis.
            Kein Tagessatz, kein Überraschungsbudget.
          </p>
          <p className="text-sm text-blue-400 mb-10 font-medium">
            ⚡ Festpreisangebot per Konfigurator – Angebot in 24 Stunden, unverbindlich
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 hover:scale-105">
              <Calculator className="w-5 h-5" />Cybersecurity Audit konfigurieren
            </Link>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 border border-blue-500/30 hover:border-blue-500/60 text-blue-400 hover:text-blue-300 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              <Phone className="w-4 h-4" />{PHONE}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["NIS2-konformer Bericht", "OSCP-zertifizierte Experten", "Festpreis – keine Tagessätze", "Bericht in 48 h"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" /><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIT-TYPEN ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Arten des Cybersecurity Audits</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Je nach Infrastruktur und Compliance-Anforderung führen wir fokussierte
              oder vollständige Cybersecurity Audits durch.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AUDIT_TYPEN.map((t) => (
              <div key={t.title} className={`bg-white/[0.03] border rounded-2xl p-6 ${t.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">{t.title}</h3>
                  {t.badge && <span className={`text-xs px-2 py-0.5 rounded-full border ${t.bg} ${t.color}`}>{t.badge}</span>}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Cybersecurity Audit als{" "}
              <span className="text-blue-400">Compliance-Nachweis</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Immer mehr Compliance-Frameworks fordern regelmäßige technische Sicherheitsprüfungen.
              Ein SODU Secure Cybersecurity Audit-Bericht ist so aufgebaut, dass er die
              Anforderungen der wichtigsten Rahmenwerke direkt adressiert.
            </p>
            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-200/70">
                  <strong>NIS2 Pflicht ab Oktober 2024:</strong> Unternehmen in kritischen
                  Sektoren müssen regelmäßige Cybersecurity Audits nachweisen können
                  (Art. 21 Abs. 2 lit. g). Bußgelder bis zu 10 Mio. € oder 2 % des Jahresumsatzes.
                </p>
              </div>
            </div>
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105">
              <Calculator className="w-4 h-4" />Compliance Audit konfigurieren <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {COMPLIANCE.map((c) => (
              <div key={c.name} className="flex items-start gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <span className={`font-bold text-sm w-20 flex-shrink-0 ${c.color}`}>{c.name}</span>
                <p className="text-xs text-gray-400 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WARUM SODU ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Warum SODU Secure für Ihren Cybersecurity Audit?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "OSCP & CEH-zertifiziert", desc: "Höchste anerkannte Pentest-Zertifizierungen – kein Scan-Reselling, echte Expertise.", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
              { icon: Zap, title: "Schnellste Abwicklung", desc: "Angebot in 24 h, Test in 2–5 Tagen, Bericht in 48 h nach Testende.", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
              { icon: Calculator, title: "Festpreis-Konfigurator", desc: "Preis sofort online berechnen – kein Anruf, kein Vertrieb, volle Transparenz.", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
              { icon: FileText, title: "Compliance-Berichte", desc: "NIS2, ISO 27001, DSGVO Art. 32 und DORA-Anforderungen direkt adressiert.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { icon: BarChart3, title: "CVSS 3.1 + Proof-of-Concepts", desc: "Jede Schwachstelle mit Schweregrad, Angriffspfad und konkretem PoC dokumentiert.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
              { icon: Building2, title: "Berlin + Remote deutschlandweit", desc: "Vor-Ort in Berlin oder vollständig remote über VPN – beliebiger Standort.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
            ].map((item) => (
              <div key={item.title} className={`bg-white/[0.03] border rounded-2xl p-6 ${item.bg}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-3 ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILOT ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border-y border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-4">
            <Star className="w-3.5 h-3.5" /><span>2 Plätze verfügbar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Cybersecurity Audit gratis – Berliner KMU Pilot 2026</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm">
            Berliner KMUs erhalten einen vollständig subventionierten Cybersecurity Audit
            inkl. Active Directory Pentest im Wert von bis zu 15.000 €.
          </p>
          <Link href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            Jetzt bewerben <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Cybersecurity Audit – FAQ</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                aria-expanded={openFaq === i}>
                <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
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
              { label: "BSI NIS2 – Sicherheitsanforderungen", href: "https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html" },
              { label: "ISO 27001 – Annex A Controls", href: "https://www.iso.org/isoiec-27001-information-security.html" },
              { label: "ENISA – Cloud Security Audit Guidelines", href: "https://www.enisa.europa.eu/topics/cloud-and-big-data/cloud-security" },
              { label: "DORA – Digital Operational Resilience Act", href: "https://www.eba.europa.eu/regulation-and-policy/operational-resilience/dora" },
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
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-6">
          <Clock className="w-3.5 h-3.5" />Angebot in 24 h – kostenlos & unverbindlich
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Jetzt Cybersecurity Audit starten</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Festpreis per Konfigurator, NIS2-konformer Bericht, OSCP-zertifizierte Experten.
          Ergebnis in 2–5 Tagen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />Cybersecurity Audit konfigurieren <ArrowRight className="w-5 h-5" />
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Phone className="w-4 h-4" />{PHONE}
          </a>
          <a href={EMAIL_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Mail className="w-4 h-4" />{EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {["OSCP-zertifiziert", "Festpreis", "NIS2 & ISO 27001", "DSGVO-konform"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-400" />{t}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
