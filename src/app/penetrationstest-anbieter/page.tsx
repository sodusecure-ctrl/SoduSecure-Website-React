"use client";

import TrustedSources from '@/components/common/TrustedSources';
import { useState } from "react";
import Link from "next/link";
import LeadConversionSection from "@/components/landing/LeadConversionSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustCertMarquee from "@/components/landing/TrustCertMarquee";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  AlertTriangle,
  Zap,
  FileText,
  Users,
  Target,
  Award,
  XCircle,
  ExternalLink,
  BadgeCheck,
  ClipboardCheck,
  BookOpen,
  Building2,
  Landmark,
} from "lucide-react";
import { FAQS } from "./faq";

const PHONE_HREF = "tel:+491777750985";
const PHONE = "(+49) 01777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";
const EMAIL = "info@sodusecure.com";

const CERTIFICATIONS = [
  {
    name: "OSCP",
    org: "Offensive Security",
    desc: "Offensive Security Certified Professional – Gold Standard für Penetrationstests. Beweis echten praktischen Könnens.",
    level: "Essential",
    color: "red",
  },
  {
    name: "CEH",
    org: "EC-Council",
    desc: "Certified Ethical Hacker – Breit anerkannte Zertifizierung. Zeigt fundiertes Security-Wissen.",
    level: "Important",
    color: "orange",
  },
  {
    name: "CISSP",
    org: "ISC2",
    desc: "Certified Information Systems Security Professional – Senior-Level Zertifizierung mit 5+ Jahren Erfahrung.",
    level: "Important",
    color: "blue",
  },
  {
    name: "GPEN",
    org: "GIAC",
    desc: "GIAC Penetration Tester – Hochwertiger Standard, vergleichbar mit OSCP.",
    level: "Important",
    color: "green",
  },
  {
    name: "eJPT",
    org: "Offensive Security",
    desc: "eLearnSecurity Junior Penetration Tester – Entry-Level. Besser kein Zertifikat als nur eJPT.",
    level: "Junior",
    color: "gray",
  },
];

const RED_FLAGS = [
  {
    icon: XCircle,
    title: "Günstige Pauschalpreise",
    desc: "€500 für einen Pentest? Vorsicht! Seriöse Pentester arbeiten nach Scope & Aufwand.",
  },
  {
    icon: AlertTriangle,
    title: "Nur automatisierte Tools",
    desc: "Wenn nur Nessus/Qualys laufen: Das ist kein Pentest, das ist Vulnerability Scanning.",
  },
  {
    icon: XCircle,
    title: "Keine schriftliche Genehmigung verlangt",
    desc: "Legitime Pentester verlangen immer einen Pentest-Vertrag & schriftliche Scope-Freigabe.",
  },
  {
    icon: AlertTriangle,
    title: "Kein Retest angeboten",
    desc: "Nach Behebung sollte kostenlos retestet werden. Wenn nicht: Keine Qualitätskontrolle.",
  },
  {
    icon: XCircle,
    title: "Unzureichende Dokumentation",
    desc: "Wenn nur eine Tabelle ohne Context & PoC: Das ist nicht audit-ready.",
  },
  {
    icon: AlertTriangle,
    title: "Unzureichende NDA",
    desc: "Eure Sicherheit ist sensitiv. Gutes NDA ist Standard, nicht Ausnahme.",
  },
];

const WHAT_TO_LOOK_FOR = [
  {
    icon: Award,
    title: "Zertifizierungen prüfen",
    desc: "OSCP, CEH oder GPEN sind Minimum. CISSP zeigt seniore Expertise. Junior-Zertifizierungen (eJPT) sind Warnsignal.",
  },
  {
    icon: FileText,
    title: "Sample-Reports anfordern",
    desc: "Professionelle Reports haben: Executive Summary, PoC-Screenshots, Findings nach Severity, Remediation Guide.",
  },
  {
    icon: Users,
    title: "Referenzen & Kundenaussagen",
    desc: "Fragen Sie nach Referenzen oder Case Studies. Seriöse Pentester haben reale Kunden & Testimonials.",
  },
  {
    icon: Target,
    title: "Methodologie verstehen",
    desc: "OWASP Top 10? PTES? NIST? Der Pentester sollte einen klaren, dokumentierten Prozess haben.",
  },
  {
    icon: Zap,
    title: "Manuelle Expertise nachvollziehen",
    desc: "Fragen Sie: 'Was findet ein Mensch, was Tools nicht finden?' – Der beste Pentester erklärt das gerne.",
  },
  {
    icon: Shield,
    title: "Erfahrung in Ihrer Branche",
    desc: "Ein Pentester mit Finance/Healthcare/Healthcare Erfahrung versteht Ihre Regulierungen besser.",
  },
];

const OUR_STRENGTHS = [
  {
    icon: Award,
    title: "Zertifizierte Pentester",
    desc: "OSCP, OSWE und CEH: unsere Experten sind offiziell zertifiziert. Keine Junior-Tester.",
  },
  {
    icon: Target,
    title: "Manuelle Exploits",
    desc: "Wir benutzen Tools als Hilfe, aber finden Schwachstellen durch echtes Denken & Kreativität.",
  },
  {
    icon: FileText,
    title: "Audit-Ready Reports",
    desc: "Nicht nur Scan-Ergebnisse. Professionelle Reports mit PoCs, Geschäftskontexte, Remediation-Guides.",
  },
  {
    icon: Zap,
    title: "ISO 27001 & Compliance",
    desc: "Wir verstehen A.12.6, NIS2, BSI-Grundschutz, DSGVO – und mappen Findings automatisch.",
  },
  {
    icon: Users,
    title: "Partnerschaftlicher Ansatz",
    desc: "Wir arbeiten mit euch zusammen – nicht gegen euch. Klare Kommunikation, regelmäßige Updates.",
  },
  {
    icon: Shield,
    title: "Kostenloser Retest",
    desc: "Nach Behebung der Findings: Kostenlos retesten. Das ist Standard bei uns.",
  },
];

const PENTEST_TYPES_COMPARISON = [
  {
    type: "Automated Vulnerability Scan",
    automation: "90%",
    manual: "10%",
    cost: "€500–€1.500",
    timeframe: "1–2 Tage",
    best_for: "Schneller Security-Check, Compliance-Start",
  },
  {
    type: "Internal Penetration Test",
    automation: "30%",
    manual: "70%",
    cost: "€2.000–€6.000",
    timeframe: "3–10 Tage",
    best_for: "Interne Systeme, Netzwerk-Security",
  },
  {
    type: "External Penetration Test",
    automation: "20%",
    manual: "80%",
    cost: "€3.000–€12.000",
    timeframe: "5–14 Tage",
    best_for: "Web-Apps, APIs, Public-Facing Systems",
  },
  {
    type: "Red Team Assessment",
    automation: "10%",
    manual: "90%",
    cost: "€8.000–€25.000+",
    timeframe: "2–4 Wochen",
    best_for: "Enterprise, realistische Angriffssimulation",
  },
];

const SELECTION_CRITERIA = [
  {
    criterion: "Tester-Zertifikate",
    check: "OSCP, OSWE, OSEP oder CREST – namentlich pro eingesetztem Tester, nicht nur als Logo auf der Website",
    why: "Praktische Prüfungen wie die 24-Stunden-Prüfung des OSCP belegen echtes Können. Die CEH-Basisprüfung ist dagegen eine reine Wissensprüfung.",
  },
  {
    criterion: "Methodik",
    check: "OWASP Testing Guide, PTES, NIST SP 800-115 oder BSI-Praxis-Leitfaden – schriftlich dokumentiert",
    why: "Das BSI empfiehlt Whitebox-Tests: Bei reinen Blackbox-Tests werden Schwachstellen übersehen und Innentäter-Szenarien fehlen.",
  },
  {
    criterion: "Unabhängigkeit",
    check: "Externe Prüfer, die das Prüfobjekt weder konzipiert noch betrieben haben; Testteam aus mindestens zwei Personen",
    why: "BSI-Empfehlung: Vier-Augen-Prinzip und Unabhängigkeit machen Ergebnisse belastbar – auch gegenüber Auditoren.",
  },
  {
    criterion: "Vertrag & Haftung",
    check: "Schriftlicher Scope, Prüfzeitraum, NDA, Datenlöschung nach Projektende, Berufs- bzw. Cyberhaftpflicht",
    why: "Das BSI ist eindeutig: nie ohne schriftlichen Auftrag testen. Der Vertrag schützt beide Seiten rechtlich.",
  },
  {
    criterion: "Referenzen",
    check: "Branchen und Unternehmensgrößen bisheriger Projekte bestätigen lassen – Kundennamen stehen oft unter NDA",
    why: "Zeigt, ob der Anbieter Ihre Systemlandschaft und Ihre Regulierung (DSGVO, NIS2, ISO 27001) wirklich kennt.",
  },
  {
    criterion: "Berichtqualität",
    check: "Geschwärzten Musterbericht anfordern: Management Summary, technische Findings mit CVSS, konkrete Empfehlungen",
    why: "Der Bericht ist das eigentliche Produkt. Ohne klare Struktur bleibt die Behebung im Alltag liegen.",
  },
  {
    criterion: "Retest",
    check: "Nachtest nach der Behebung ist im Angebot ausgewiesen – idealerweise ohne Aufpreis",
    why: "Ohne Retest fehlt der Nachweis, dass die Schwachstellen tatsächlich geschlossen wurden.",
  },
  {
    criterion: "Preistransparenz",
    check: "Angebot erst nach Scoping-Gespräch; marktübliche Tagessätze liegen bei ca. 1.000–1.800 €",
    why: "Pauschalangebote weit darunter sind in der Regel automatisierte Scans – keine echten Penetrationstests.",
  },
];

const BSI_PILLARS = [
  {
    icon: BadgeCheck,
    title: "Die offizielle BSI-Liste",
    desc: "Das BSI führt eine Liste zertifizierter IT-Sicherheitsdienstleister im Geltungsbereich IS-Penetrationstests – aktuell rund zwei Dutzend Unternehmen, darunter Telekom Security, TÜV Informationstechnik, SySS, HiSolutions, PwC und EY. Die Zertifikate sind in der Regel drei Jahre gültig.",
    linkLabel: "Zur offiziellen BSI-Liste",
    url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Zertifizierung-und-Anerkennung/Listen/Liste-IT-Sicherheitsdienstleister-Pentester/liste-it-sicherheitsdienstleister-pentester.html",
  },
  {
    icon: ClipboardCheck,
    title: "BSI-Kompetenzfeststellung für Tester",
    desc: "Das BSI prüft Zuverlässigkeit, Unabhängigkeit, Fachkompetenz und Qualität der Prüfer. Als Praxisnachweis erkennt es 11 externe Zertifikate an – darunter OSCP, CREST CRT und GIAC GPEN. Voraussetzung: mindestens 60 % Praxisanteil, Zertifikat maximal drei Jahre alt.",
    linkLabel: "Kompetenzfeststellung beim BSI",
    url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Zertifizierung-und-Anerkennung/Zertifizierung-von-Personen/Penetrationstester/penetrationstester.html",
  },
  {
    icon: BookOpen,
    title: "Der BSI-Praxis-Leitfaden",
    desc: "Der kostenlose Praxis-Leitfaden für IS-Penetrationstests ist die beste neutrale Checkliste für Ihre Anbieterwahl: Whitebox als Standard, Vier-Augen-Prinzip, klare Vertragsinhalte, Berichtsstruktur mit CVSS-Bewertung und Wiederholungsprüfungen alle zwei bis drei Jahre.",
    linkLabel: "Praxis-Leitfaden lesen (PDF)",
    url: "https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Sicherheitsberatung/Pentest_Webcheck/Leitfaden_Penetrationstest.pdf",
  },
];

const MARKET_CATEGORIES = [
  {
    icon: Building2,
    title: "Big4 & große Beratungshäuser",
    desc: "PwC und EY stehen auch auf der BSI-Liste. Stärken: Konzernprojekte, internationale Teams, formale Prozesse. Dafür längere Vorlaufzeiten und Budgets im oberen Segment.",
    fit: "Passt zu: Konzernen mit Ausschreibungspflicht",
  },
  {
    icon: Landmark,
    title: "TÜV- & Prüfkonzerne",
    desc: "TÜV Informationstechnik und TÜV TRUST IT sind BSI-zertifiziert. Stärken: Nähe zu Zertifizierungsverfahren und Behördenumfeld, etablierte Prüfprozesse.",
    fit: "Passt zu: regulierten Branchen und KRITIS",
  },
  {
    icon: Target,
    title: "Spezialisierte Boutiquen",
    desc: "Senior-Tester statt Junior-Rotation, direkter Draht zum Tester, schnelle Termine, faire Preise. Die Kategorie von Sodu Secure – und von BSI-gelisteten Mittelständlern wie SySS oder secuvera.",
    fit: "Passt zu: KMU und Mittelstand mit konkretem Prüfobjekt",
  },
  {
    icon: Zap,
    title: "Scan- & PTaaS-Plattformen",
    desc: "Günstig und schnell, aber weitgehend automatisiert. Als kontinuierliche Ergänzung sinnvoll – ersetzt jedoch keinen manuellen Penetrationstest durch zertifizierte Prüfer.",
    fit: "Passt zu: laufendem Basis-Monitoring",
  },
];

export default function PenetrationstestAnbieterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24">
          <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.04em] text-white/65">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.8)]" />
            <Shield className="h-3.5 w-3.5 text-[#FF3B30]" />
            <span>Penetrationstest Anbieter · Seriöse Pentester · OSCP Certified</span>
          </div>
          <h1 className="mt-8 max-w-5xl text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance] sm:text-[44px] sm:leading-[1.04] md:text-6xl lg:text-7xl">
            <span className="premium-silver">Der richtige Penetrationstest Anbieter –</span>
            <br />
            <span className="premium-headline-accent">Wie man Qualität erkennt</span>
          </h1>
          <p className="mt-6 flex max-w-2xl items-start gap-3 text-base leading-relaxed text-white/70 sm:mt-7 md:text-lg">
            <span aria-hidden className="mt-[0.75em] h-[2px] w-8 shrink-0 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#FF3B30]/0 sm:w-12" />
            <span>Wie unterscheidest du zwischen seriösen Pentestern und unzureichenden Anbietern? Dieser Guide zeigt dir, worauf du achten musst – und was Sodu Secure macht, um deine Sicherheit zu garantieren.</span>
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link href="/request-pentest" className="premium-cta inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white">
              Jetzt Pentest Angebot anfordern
            </Link>
            <Link href="/penetration-testing" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]">
              Pentest Übersicht <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/70">
            {[["500+", "Durchgeführte Pentests"], ["OSCP · OSWE · CEH", "Zertifizierungen"], ["0 €", "Retest nach Behebung"], ["24h", "Angebots-Response"]].map(([stat, label], i) => (
              <div key={stat} className="flex items-center gap-x-6">
                {i > 0 && <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden />}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{stat}</span>
                  <span className="text-white/50">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO/AEO Direktantwort */}
      <section className="py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#FF3B30]/20 bg-[#FF3B30]/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Woran erkennt man einen guten Penetrationstest-Anbieter?</h2>
            <p className="text-white/70 leading-relaxed">
              Einen guten Penetrationstest-Anbieter erkennen Sie an zertifizierten Testern (z. B. OSCP, OSWE, CREST),
              dokumentierter Methodik nach OWASP, PTES oder BSI-Praxis-Leitfaden, einem aussagekräftigen Musterbericht mit
              CVSS-Bewertung, schriftlichem Vertrag inklusive NDA und Haftpflicht, nachweisbaren Referenzen sowie einem
              Retest nach der Behebung. Reine Schwachstellenscans, die als Pentest verkauft werden, sind das häufigste Warnsignal.
            </p>
            <p className="mt-4 text-sm text-white/50">
              Grundlagen zuerst?{" "}
              <Link href="/penetrationstest" className="text-[#FF6B61] hover:text-[#FF8077]">Was ist ein Penetrationstest?</Link>
            </p>
          </div>
        </div>
      </section>

      <TrustCertMarquee />

      <TestimonialsSection />

      {/* Wichtige Zertifizierungen */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Wichtige Pentester-Zertifizierungen</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Welche Zertifizierungen zeigen echte Kompetenz?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((cert) => {
              const colorClasses =
                cert.color === "red"
                  ? "bg-[#FF3B30]/10 border-[#FF3B30]/20"
                  : cert.color === "orange"
                    ? "bg-orange-500/10 border-orange-500/20"
                    : cert.color === "blue"
                      ? "bg-blue-500/10 border-blue-500/20"
                      : cert.color === "green"
                        ? "bg-green-500/10 border-green-500/20"
                        : "bg-white/5 border-white/15";

              const textColorClasses =
                cert.color === "red"
                  ? "text-[#FF3B30]"
                  : cert.color === "orange"
                    ? "text-orange-400"
                    : cert.color === "blue"
                      ? "text-blue-400"
                      : cert.color === "green"
                        ? "text-green-400"
                        : "text-white/60";

              return (
                <div key={cert.name} className={`border rounded-xl p-5 ${colorClasses}`}>
                  <div className={`font-bold text-lg mb-1 ${textColorClasses}`}>{cert.name}</div>
                  <div className="text-xs text-white/60 mb-3">{cert.org}</div>
                  <p className="text-white/60 text-xs leading-relaxed mb-3">{cert.desc}</p>
                  <div className="text-xs font-semibold">{cert.level}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Auswahlkriterien im Vergleich */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Auswahlkriterien im Vergleich: 8 Punkte für Ihre Shortlist</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Mit diesen Kriterien vergleichen Sie Penetrationstest-Anbieter strukturiert – aufgebaut auf den Empfehlungen des BSI-Praxis-Leitfadens für IS-Penetrationstests.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Kriterium</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Woran Sie es erkennen</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Warum es zählt</th>
                </tr>
              </thead>
              <tbody>
                {SELECTION_CRITERIA.map((row) => (
                  <tr key={row.criterion} className="border-b border-white/10 bg-[#0A0A0B] hover:bg-white/5 align-top">
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">{row.criterion}</td>
                    <td className="px-4 py-3 text-white/70">{row.check}</td>
                    <td className="px-4 py-3 text-white/60">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-white/40 text-center">
            Quellen: Methodik- und Vertragskriterien nach dem{" "}
            <a href="https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Sicherheitsberatung/Pentest_Webcheck/Leitfaden_Penetrationstest.pdf" target="_blank" rel="noopener noreferrer" className="text-[#FF6B61] hover:text-[#FF8077]">BSI-Praxis-Leitfaden für IS-Penetrationstests (PDF)</a>
            {" "}· Tagessatz-Spannen laut{" "}
            <a href="https://www.channelpartner.de/article/3889591/was-kostet-ein-professioneller-penetrationstest.html" target="_blank" rel="noopener noreferrer" className="text-[#FF6B61] hover:text-[#FF8077]">ChannelPartner</a>
            {" "}und{" "}
            <a href="https://code-lein.de/blog/was-kostet-ein-penetrationstest" target="_blank" rel="noopener noreferrer" className="text-[#FF6B61] hover:text-[#FF8077]">CODE-LEIN</a>.
          </p>
        </div>
      </section>

      {/* Worauf achten */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">6 Punkte: Das solltest du prüfen</h2>
            <p className="text-white/60">Wie man einen seriösen Pentester von einem unseriösen unterscheidet.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_TO_LOOK_FOR.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4 bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                  <div className="w-10 h-10 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#FF6B61]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">6 Rote Flaggen</h2>
            <p className="text-white/60">Warnsignale für unseriöse Pentester.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RED_FLAGS.map((flag, i) => {
              const Icon = flag.icon;
              return (
                <div key={i} className="flex gap-3 bg-[#FF3B30]/5 border border-[#FF3B30]/20 rounded-xl p-5">
                  <Icon className="w-6 h-6 text-[#FF3B30] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#FF3B30] mb-1">{flag.title}</h3>
                    <p className="text-white/60 text-sm">{flag.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BSI-zertifizierte Anbieter */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">BSI-zertifizierte Penetrationstest-Anbieter: Was steckt dahinter?</h2>
            <p className="text-white/60 max-w-3xl mx-auto">
              Das Bundesamt für Sicherheit in der Informationstechnik (BSI) zertifiziert sowohl Unternehmen als auch einzelne Penetrationstester. Drei Bausteine sollten Sie kennen, bevor Sie einen Anbieter auswählen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BSI_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="flex flex-col bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                  <div className="w-10 h-10 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#FF6B61]" />
                  </div>
                  <h3 className="font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed flex-1">{pillar.desc}</p>
                  <a
                    href={pillar.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#FF6B61] hover:text-[#FF8077]"
                  >
                    {pillar.linkLabel} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              );
            })}
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h3 className="font-semibold text-lg mb-2">Brauchen Sie zwingend einen BSI-zertifizierten Dienstleister?</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              In den meisten Fällen: nein. Die BSI-Zertifizierung ist vor allem dann relevant, wenn Behörden oder KRITIS-Betreiber
              sie in Ausschreibungen fordern. Für KMU und Mittelstand sind die Qualifikation der eingesetzten Tester und eine
              saubere Methodik entscheidender als das Firmen-Zertifikat. Transparenz unsererseits: Sodu Secure steht nicht auf der
              BSI-Liste. Unsere Tester sind OSCP-zertifiziert – eines der Zertifikate, die das BSI selbst als Praxis-Kompetenznachweis
              anerkennt – und wir orientieren uns am BSI-Praxis-Leitfaden: schriftliche Scope-Freigabe, manuelles Testing und ein
              Bericht mit Management Summary, CVSS-Bewertung und konkreten Empfehlungen.
            </p>
          </div>
        </div>
      </section>

      {/* Unsere Stärken */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Das macht Sodu Secure unterschiedlich</h2>
            <p className="text-white/60">Warum wir der Partner für seriöse Sicherheit sind.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUR_STRENGTHS.map((strength) => {
              const Icon = strength.icon;
              return (
                <div key={strength.title} className="flex gap-4 bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                  <div className="w-10 h-10 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#FF6B61]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{strength.title}</h3>
                    <p className="text-white/60 text-sm">{strength.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pentest-Typen Vergleich */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pentest-Typen im Vergleich</h2>
            <p className="text-white/60">Welche Pentest ist für wen geeignet?</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Pentest-Typ</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Automation</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Manuell</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Kosten (marktüblich)</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Dauer</th>
                </tr>
              </thead>
              <tbody>
                {PENTEST_TYPES_COMPARISON.map((type, i) => (
                  <tr key={i} className="border-b border-white/10 bg-[#0A0A0B] hover:bg-white/5">
                    <td className="px-4 py-3 font-semibold">{type.type}</td>
                    <td className="px-4 py-3">{type.automation}</td>
                    <td className="px-4 py-3">{type.manual}</td>
                    <td className="px-4 py-3 text-[#FF6B61]">{type.cost}</td>
                    <td className="px-4 py-3">{type.timeframe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anbieter-Typen am Markt */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Der Markt im Überblick: Vier Typen von Pentest-Anbietern</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Vom Big4-Beratungshaus bis zur Scan-Plattform – welcher Anbieter-Typ passt zu welchem Unternehmen?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MARKET_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#FF6B61]" />
                    </div>
                    <h3 className="font-semibold">{cat.title}</h3>
                  </div>
                  <p className="text-white/60 text-sm mb-3 leading-relaxed">{cat.desc}</p>
                  <p className="text-xs font-medium text-[#FF6B61]">{cat.fit}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-white/60 max-w-3xl mx-auto text-center leading-relaxed">
            Preis-Orientierung: Marktübliche Tagessätze für qualifizierte Pentester liegen bei ca. 1.000–1.800 € (laut{" "}
            <a href="https://www.channelpartner.de/article/3889591/was-kostet-ein-professioneller-penetrationstest.html" target="_blank" rel="noopener noreferrer" className="text-[#FF6B61] hover:text-[#FF8077]">ChannelPartner</a>
            {" "}bzw.{" "}
            <a href="https://code-lein.de/blog/was-kostet-ein-penetrationstest" target="_blank" rel="noopener noreferrer" className="text-[#FF6B61] hover:text-[#FF8077]">CODE-LEIN</a>
            ), typische Projekte dauern 2–10 Tage. Was das für Ihr Projekt bedeutet, zeigen unsere Seite{" "}
            <Link href="/pentest-kosten" className="text-[#FF6B61] hover:text-[#FF8077]">Pentest Kosten</Link>
            {" "}und der{" "}
            <Link href="/preisrechner" className="text-[#FF6B61] hover:text-[#FF8077]">Preisrechner</Link>.
          </p>
        </div>
      </section>

      {/* Quality Banner */}
      <section className="py-10 bg-[#FF3B30]/10 border-y border-[#FF3B30]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-7 h-7 text-[#FF6B61] mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Billig = Schlecht? Nicht immer, aber fast immer!</h3>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            €500 für einen &apos;Pentest&apos;? Das ist ein Scan. Ein echter manueller Pentest mit zertifizierten Experten wird individuell kalkuliert und kostet meist 4.000 bis 20.000 €. Qualität hat ihren Preis – und der lohnt sich.
          </p>
        </div>
      </section>

      {/* Pentest Dienstleister: Synonyme & Auswahl */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Pentest Dienstleister, Pentest-Firma oder Penetrationstest Anbieter: Worauf es wirklich ankommt</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Ob Sie nach einem <strong>Pentest Dienstleister</strong>, einem <strong>Penetrationstest Dienstleister</strong>,
              einer Pentest-Firma, einem Pentest-Unternehmen oder englisch nach einem Penetration Test Anbieter suchen: Gemeint
              ist immer dasselbe – ein externer IT-Sicherheitsdienstleister, der autorisierte Angriffe auf Ihre Systeme durchführt
              und die Ergebnisse so dokumentiert, dass Ihr Team sie beheben kann. Wichtig zu wissen: Weder Pentest noch
              Penetrationstest ist ein geschützter Begriff. Jede Firma darf sich so nennen – die Qualitätsspanne reicht vom
              umformatierten Schwachstellenscan bis zum mehrwöchigen Red-Team-Einsatz.
            </p>
            <p>
              Bei der Dienstleister-Auswahl zählt deshalb nicht das Etikett, sondern die Substanz: nachweisbare
              Tester-Qualifikation, dokumentierte Methodik, belastbarer Vertrag und ein Bericht, mit dem Sie arbeiten können.
              Bewährtes Vorgehen für die Auswahl:
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {[
              "Zwei bis drei Anbieter shortlisten und jeweils einen geschwärzten Musterbericht anfordern",
              "Die Zertifikate der konkret eingesetzten Tester nennen lassen (OSCP, OSWE, OSEP, CREST)",
              "Ein Scoping-Gespräch führen: Seriöse Dienstleister nennen Preise erst nach Klärung des Prüfumfangs",
              "Vertrag prüfen: schriftlicher Scope, NDA, Haftung, Datenlöschung und Retest nach der Behebung",
            ].map((step) => (
              <li key={step} className="flex gap-3 text-sm text-white/70">
                <CheckCircle className="w-5 h-5 text-[#FF6B61] flex-shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center gap-5">
            <Link href="/request-pentest" className="premium-cta inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white">
              Unverbindliches Angebot anfordern
            </Link>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/case-studies/blogs/pentest-anbieter-auswaehlen" className="text-[#FF6B61] hover:text-[#FF8077]">Checkliste: Pentest Anbieter auswählen</Link>
              <Link href="/pentest-kosten" className="text-[#FF6B61] hover:text-[#FF8077]">Pentest Kosten</Link>
              <Link href="/penetrationstest" className="text-[#FF6B61] hover:text-[#FF8077]">Was ist ein Penetrationstest?</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zu Penetrationstest Anbietern</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#0A0A0B] border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
                  <span className="font-medium">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-white/60 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-white/60 flex-shrink-0" />}
                </button>
                {/* Antwort bleibt immer im DOM (Indexierbarkeit + FAQPage-Schema), nur visuell ein-/ausgeblendet */}
                <div className={`px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4 ${openFaq === i ? '' : 'hidden'}`}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustedSources
        title="Woran Sie professionelle Methodik erkennen"
        paragraphs={[
          'Seriöse Penetrationstest Anbieter arbeiten nach dokumentierten Methodiken statt nur mit automatisierten Scans: Der OWASP Web Security Testing Guide und NIST SP 800-115 definieren, wie professionelle Sicherheitstests ablaufen, und MITRE ATT&CK katalogisiert die realen Angreifer-Taktiken, gegen die getestet wird.',
          'Fragen Sie Anbieter deshalb konkret nach Methodik, Zertifizierungen der Tester (z. B. OSCP) und einem geschwärzten Beispielbericht – das trennt Qualität zuverlässig von Scan-Resellern.',
        ]}
        sources={[
          { label: 'OWASP Web Security Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
          { label: 'NIST SP 800-115 (Security Testing Guide)', url: 'https://csrc.nist.gov/pubs/sp/800/115/final' },
          { label: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
        ]}
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#FF3B30]/15 via-[#0A0A0B] to-[#0A0A0B] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-14 h-14 text-[#FF3B30] mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Seriöse Pentester beauftragen</h2>
          <p className="text-white/60 text-lg mb-8">
            OSCP Certified · Zertifizierte Experten · Audit-Ready Reports · Kostenlos Retest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-[#FF3B30] hover:bg-[#E5332A] text-white px-10 py-4 rounded-2xl font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />{PHONE}
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-10 py-4 rounded-2xl font-semibold transition-colors">
              <Mail className="w-5 h-5" />{EMAIL}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            <Link href="/penetration-testing" className="text-[#FF6B61] hover:text-[#FF8077]">Pentest Übersicht</Link>
            <Link href="/iso-27001-pentest-anforderungen" className="text-[#FF6B61] hover:text-[#FF8077]">Pentest ISO 27001</Link>
            <Link href="/pentest-kosten" className="text-[#FF6B61] hover:text-[#FF8077]">Pentest Kosten</Link>
            <Link href="/pentest-konfigurator" className="text-[#FF6B61] hover:text-[#FF8077]">Konfigurator</Link>
            <Link href="/request-pentest" className="text-[#FF6B61] hover:text-[#FF8077]">Beratung buchen</Link>
          </div>
        </div>
      </section>
      <LeadConversionSection context="Penetrationstest Anbieter" />
    </main>
  );
}
