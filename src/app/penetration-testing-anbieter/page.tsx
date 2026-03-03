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
  Award,
  Star,
  Target,
  Users,
  Clock,
  BarChart3,
  FileText,
  Phone,
  Mail,
  AlertTriangle,
  MapPin,
  Zap,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const PHONE = "+49 179 239 6294";
const PHONE_HREF = "tel:+4917923962949";
const EMAIL = "sodusecure@gmail.com";
const EMAIL_HREF = "mailto:sodusecure@gmail.com";

const AUSWAHLKRITERIEN = [
  {
    icon: Award,
    title: "Zertifizierungen der Pentester",
    desc: "Ein seriöser Penetration Testing Anbieter nennt die Zertifizierungen seiner Experten. OSCP ist der Goldstandard – gefolgt von CEH, GPEN und ISO 27001 Lead Auditor.",
    warnsignal: "Keine Nennung von Einzelzertifizierungen → wahrscheinlich Scan-Reseller",
  },
  {
    icon: BarChart3,
    title: "Festpreis vs. Tagessatz",
    desc: "Tagessatz-Modelle können unkontrolliert skalieren. Ein transparenter Festpreis-Anbieter zeigt Vertrauens­würdigkeit und gibt Ihnen Budgetsicherheit.",
    warnsignal: "Nur Tagessätze, kein Fixpreis → Budget-Risiko",
  },
  {
    icon: Target,
    title: "Manuelles Testing nachgewiesen",
    desc: "Echter Penetrationstest = manuelle Exploitation durch Experten. Fragen Sie nach Proof-of-Concepts in Beispielberichten – ein Anbieter ohne PoC liefert Scan-Output.",
    warnsignal: "Keine PoC-Beispiele → wahrscheinlich automatisierter Scan",
  },
  {
    icon: FileText,
    title: "Compliance-Eignung der Berichte",
    desc: "Für NIS2, ISO 27001 oder DORA müssen Pentest-Berichte spezifische Anforderungen erfüllen. Fragen Sie, ob der Anbieter NIS2-konforme Berichte ausstellen kann.",
    warnsignal: "Kein Compliance-Mapping → Bericht ggf. nicht verwendbar",
  },
  {
    icon: Users,
    title: "Direkter Pentester-Kontakt",
    desc: "Sie sollten direkt mit dem Sicherheitsexperten sprechen können – nicht nur mit Vertrieb oder Account Management. Persönliche Abschlusspräsentation ist Standard.",
    warnsignal: "Nur Vertriebskontakt → mangelnde Expertise im Frontoffice",
  },
  {
    icon: Zap,
    title: "Retest inklusive",
    desc: "Ein seriöser Pentest Anbieter bietet kostenlosen Retest kritischer und hoher Findings nach der Patchphase an – als Qualitätssicherung und Nachweis für Compliance.",
    warnsignal: "Retest kostenpflichtig → echte Kosten höher als Angebot",
  },
];

const VERGLEICH = [
  { kriterium: "OSCP-zertifizierte Pentester", sodu: true, typisch: false },
  { kriterium: "100 % manuelles Testing", sodu: true, typisch: false },
  { kriterium: "Transparenter Festpreis", sodu: true, typisch: false },
  { kriterium: "Retest inklusive", sodu: true, typisch: false },
  { kriterium: "NIS2 & ISO 27001-konforme Berichte", sodu: true, typisch: false },
  { kriterium: "Direkter Pentester-Kontakt", sodu: true, typisch: false },
  { kriterium: "CVSS 3.1 Scoring + PoC", sodu: true, typisch: true },
  { kriterium: "Berliner Standort für Vor-Ort-Termine", sodu: true, typisch: false },
  { kriterium: "Angebot in 24 Stunden", sodu: true, typisch: false },
];

const LEISTUNGEN = [
  { title: "Web Application Penetrationstest", desc: "OWASP Top 10, Business Logic, Auth Bypasses, IDOR", href: "/services/web-application-testing" },
  { title: "Active Directory Pentest", desc: "Kerberoasting, Pass-the-Hash, DCSync, GPO Abuse", href: "/services/infrastructure-testing" },
  { title: "API Security Testing", desc: "OWASP API Top 10 – REST, GraphQL, SOAP", href: "/services/api-security-testing" },
  { title: "Cloud Penetrationstest", desc: "AWS, Azure, GCP – IAM-Eskalation, Fehlkonfigurationen", href: "/services/cloud-devops-testing" },
  { title: "Netzwerk Penetrationstest", desc: "Internes/externes Netzwerk, Lateral Movement", href: "/services/network-audit" },
  { title: "Phishing & Social Engineering", desc: "Realistische Kampagnen – bis 100 User", href: "/services/sme-packages" },
];

const FAQS = [
  { q: "Wie wähle ich den richtigen Penetration Testing Anbieter?", a: "Achten Sie auf: Pentester-Zertifizierungen (OSCP, CEH), transparente Festpreise, nachgewiesenes manuelles Testing (Proof-of-Concepts), Retest inklusive, Compliance-Eignung der Berichte (NIS2, ISO 27001) und direkte Kommunikation mit dem Experten – nicht nur Vertrieb." },
  { q: "Was unterscheidet seriöse Pentest Anbieter von Scan-Resellern?", a: "Seriöse Pentest Anbieter führen manuelle Tests durch und liefern Proof-of-Concepts für Findings. Scan-Reseller lassen automatisierte Tools laufen und ergänzen minimal. Erkennungszeichen: fehlende Pentester-Zertifizierungen, keine PoC-Beispiele, sehr niedrige Preise unter 1.000 €." },
  { q: "Wie viel kostet ein seriöser Penetration Testing Anbieter?", a: "Seriöse manuelle Pentest Anbieter starten ab 2.500 € für fokussierte Tests. Verdächtig günstige Angebote unter 1.000 € sind oft automatisierte Scans. SODU Secure bietet transparente Festpreise ab 2.500 € mit vollständigem manuellem Testing." },
  { q: "Welche Zertifizierungen sollte ein Pentest Anbieter haben?", a: "Minimum: OSCP (Offensive Security Certified Professional) für manuelle Exploitation. Ergänzend: CEH (EC-Council), GPEN (GIAC), ISO 27001 Lead Auditor für Compliance-Tests. Ein Anbieter ohne diese Zertifizierungen hat oft keine nachgewiesene Exploitation-Erfahrung." },
  { q: "Kann ein Pentest Anbieter aus Berlin auch remote testen?", a: "Ja – die meisten Penetrationstests laufen remote über VPN-Zugänge. SODU Secure testet deutschlandweit und international remote. Für lokale Engagements oder Vor-Ort-Workshops in Berlin sind persönliche Treffen möglich." },
  { q: "Was ist bei einem Penetration Testing Anbietervertrag zu beachten?", a: "Wichtig sind: klarer Scope (was wird getestet), autorisierte Testzeiträume, NDA-Vereinbarung, Schadensausschluss für autorisierte Tests, DSGVO-konforme Datenverarbeitung und ein klarer Festpreis. SODU Secure stellt alle Vertragsunterlagen vor Testbeginn bereit." },
];

export default function PenetrationTestingAnbieterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">SODU Secure</Link>
            <span>/</span>
            <span className="text-gray-300">Penetration Testing Anbieter</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-6">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pentest Anbieter Berlin · OSCP · CEH · ISO 27001</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Penetration Testing Anbieter –</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Zertifiziert. Transparent.
            </span>
            <br />
            <span className="text-white">Aus Berlin.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            SODU Secure ist ein zertifizierter Penetration Testing Anbieter mit Sitz in Berlin.
            OSCP- und CEH-zertifizierte Pentester. Festpreise ab 2.500 €. Manuelles Testing –
            keine Scan-Reports. Angebot in 24 Stunden.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-red-900/40 hover:scale-105">
              <Calculator className="w-5 h-5" />Pentest Angebot einholen
            </Link>
            <Link href="/pentest-certification"
              className="inline-flex items-center gap-2 border border-blue-500/30 hover:border-blue-500/60 text-blue-400 hover:text-blue-300 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              <Award className="w-4 h-4" />Unsere Zertifizierungen
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["OSCP- & CEH-zertifiziert", "100 % manuelles Testing", "Festpreis – keine Tagessätze"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUSWAHLKRITERIEN ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-4">
              <Target className="w-3.5 h-3.5" />
              <span>Entscheidungshilfe</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Wie wählt man den richtigen Pentest Anbieter?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Der Markt ist unübersichtlich. Diese 6 Kriterien helfen Ihnen, seriöse
              Penetration Testing Anbieter von Scan-Resellern zu unterscheiden.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUSWAHLKRITERIEN.map((item) => (
              <div key={item.title} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-4">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{item.desc}</p>
                <div className="flex items-start gap-2 bg-red-500/5 border border-red-500/15 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-300/70">{item.warnsignal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERGLEICH ─────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              SODU Secure vs.{" "}
              <span className="text-blue-400">typischer Pentest Anbieter</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Viele Anbieter versprechen „Penetrationstest", liefern aber automatisierte
              Scan-Reports. Was SODU Secure als Pentest Anbieter konkret unterscheidet:
            </p>
            <div className="space-y-3">
              {[
                "Direkte OSCP-zertifizierte Pentester – keine Subunternehmer",
                "Vollständig manuelles Testing – kein Scan-Output-Reselling",
                "Festpreis vor Beginn – keine unkontrollierten Tagessätze",
                "Berliner Standort – persönliche Vor-Ort-Termine möglich",
                "Compliance-Berichte: NIS2, ISO 27001, DSGVO Art. 32",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-5 text-center text-sm uppercase tracking-wider">
              Anbietervergleich
            </h3>
            <div className="space-y-3">
              {VERGLEICH.map((row) => (
                <div key={row.kriterium}
                  className="flex items-center gap-3 text-sm py-1.5 border-b border-white/5 last:border-0">
                  <span className="flex-1 text-gray-300 text-xs">{row.kriterium}</span>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-1 w-16 justify-center">
                      {row.sodu ? <CheckCircle className="w-4 h-4 text-green-400" /> : <span className="w-4 h-4 flex items-center justify-center text-gray-600">✕</span>}
                    </div>
                    <div className="flex items-center gap-1 w-16 justify-center">
                      {row.typisch ? <CheckCircle className="w-4 h-4 text-green-400" /> : <span className="w-4 h-4 flex items-center justify-center text-gray-600">✕</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <div className="flex gap-6">
                  <span className="text-xs text-green-400 font-semibold w-16 text-center">SODU</span>
                  <span className="text-xs text-gray-500 font-semibold w-16 text-center">Typisch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEISTUNGEN ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Leistungen von SODU Secure als Pentest Anbieter
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Als vollständiger Penetration Testing Anbieter decken wir alle relevanten
              Testbereiche ab – von der Web-App bis zum Red Team Engagement.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEISTUNGEN.map((svc) => (
              <Link key={svc.title} href={svc.href}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-200">
                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{svc.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{svc.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-blue-400 group-hover:gap-2 transition-all">
                  Mehr erfahren <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
              <Calculator className="w-5 h-5" />Pentest Angebot von diesem Anbieter einholen<ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ÜBER SODU SECURE ──────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            SODU Secure – Ihr Penetration Testing Anbieter aus Berlin
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Berliner Unternehmen vertrauen uns als ihren lokalen Pentest Anbieter –
            mit persönlichem Service, schnellen Reaktionszeiten und zertifizierten Experten.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Award, title: "OSCP-zertifiziert", desc: "Höchste praktische Pentest-Zertifizierung – weltweit anerkannt.", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
            { icon: BarChart3, title: "Festpreis ab 2.500 €", desc: "Keine Tagessatz-Überraschungen. Kalkulierbarkeit vor Beginn.", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
            { icon: Clock, title: "Angebot in 24h", desc: "Transparentes Festpreis-Angebot innerhalb von 24 Stunden.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
            { icon: MapPin, title: "Standort Berlin", desc: "Vor Ort oder remote – schnelle Reaktionszeiten in der Region.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
          ].map((item) => (
            <div key={item.title} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-3 ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-950/30 to-cyan-950/20 border border-blue-500/20 rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Kostenlos beraten lassen</h3>
              <p className="text-gray-400 text-sm">
                Unsicher, welchen Pentest Anbieter Sie wählen sollen? Sprechen Sie mit uns –
                wir beraten Sie kostenlos und unverbindlich zu Scope, Kosten und dem richtigen
                Testansatz für Ihre Infrastruktur.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/request-pentest"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                <Calculator className="w-4 h-4" />Pentest konfigurieren
              </Link>
              <a href={PHONE_HREF}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm justify-center">
                <Phone className="w-4 h-4" />{PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILOT ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-red-950/40 to-orange-950/40 border-y border-red-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 text-sm text-red-300 mb-4">
            <Star className="w-3.5 h-3.5" /><span>Nur noch 2 Plätze</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Als Pentest Anbieter für Berliner KMUs – Pilotprogramm 2026
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
            Berliner KMUs mit 20–150 Mitarbeitern und Microsoft-Infrastruktur erhalten
            einen vollständig subventionierten Pentest im Wert von bis zu 15.000 €.
          </p>
          <Link href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            Jetzt bewerben<ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Penetration Testing Anbieter – FAQ
            </h2>
            <p className="text-gray-400 text-sm">Häufige Fragen zur Anbieterwahl, Zertifizierungen und zum Angebotsprozess.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                  aria-expanded={openFaq === i}>
                  <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-red-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXTERNE QUELLEN ───────────────────────────────────────────────────── */}
      <section className="py-10 bg-[#131927] border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />Externe Quellen
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: "OWASP Testing Guide v4.2", href: "https://owasp.org/www-project-web-security-testing-guide/" },
              { label: "BSI NIS2 Umsetzungshilfe", href: "https://www.bsi.bund.de/DE/Themen/Regulierter-Bereich/NIS-2/nis-2_node.html" },
              { label: "Offensive Security OSCP", href: "https://www.offensive-security.com/pwk-oscp/" },
              { label: "MITRE ATT&CK Framework", href: "https://attack.mitre.org/" },
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
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          SODU Secure als Ihren Pentest Anbieter wählen
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Zertifiziert. Transparent. Aus Berlin. Festpreis-Angebot innerhalb von 24 Stunden –
          kostenlos und unverbindlich.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />Pentest Angebot einholen<ArrowRight className="w-5 h-5" />
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
          {["OSCP-zertifiziert", "Festpreis", "DSGVO-konform", "Berliner Standort"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-400" />{t}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
