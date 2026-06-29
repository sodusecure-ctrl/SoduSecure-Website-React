"use client";

import { useState } from "react";
import Link from "next/link";
import LeadConversionSection from "@/components/landing/LeadConversionSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
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
  TrendingUp,
} from "lucide-react";

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
    org: "ISCÂ²",
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
    desc: "OSCP, CEH, CISSP – unsere Experten sind offiziell zertifiziert. Keine Junior-Tester.",
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
    desc: "Nach Behebung critical & high Findings: Kostenlos retesten. Das ist Standard bei uns.",
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

const FAQS = [
  {
    q: "Wie viel kostet ein seriöser Penetrationstest?",
    a: "Es kommt auf den Scope an. Ein Web-App Pentest: ab €1.500. Netzwerk-Pentest: ab €2.500. Enterprise-Pentest: €6.000+. Billiger = meist unseriös oder unzureichend.",
  },
  {
    q: "Was ist der Unterschied zwischen interner und externer Penetrationtest?",
    a: "Extern: Angriff von außen (Internet). Intern: Angriff von innerhalb des Netzwerks. Intern findet oft mehr Probleme, weil der Attacker schon 'ins Netzwerk gekommen' ist.",
  },
  {
    q: "Wie prüfe ich, ob ein Pentester wirklich kompetent ist?",
    a: "Fragen: (1) Welche Zertifizierungen? (2) Sample-Reports? (3) Referenzen? (4) Beschreibt die Methodik – OWASP, PTES? (5) Findet manuell, nicht nur mit Tools?",
  },
  {
    q: "Brauche ich einen Pentester mit Branchenerfahrung?",
    a: "Nicht unbedingt, aber hilfreich. Fin-Tech Pentest ist anders als Healthcare Pentest. Mit Branchenerfahrung: bessere Findings, weniger Missverständnisse.",
  },
  {
    q: "Kann ich meinen eigenen IT-Admin einen Pentest machen lassen?",
    a: "Theoretisch ja, praktisch nein. IT-Admin kennt die Infrastruktur – kann nicht 'angreifen' wie ein Außenstehender. Zudem: externe Auditor*innen bevorzugen externe Pentester (unabhängiger).",
  },
  {
    q: "Wie lange sind Pentest-Ergebnisse 'gültig'?",
    a: "Nicht lange! Nach 3–6 Monaten sollte ein Retest durchgeführt werden, da neue Schwachstellen entstehen. Nach größeren Änderungen: sofort retest.",
  },
];

export default function PenetrationstestAnbieterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-[#FF6B61]" />
            <span className="text-[#FF6B61] text-sm font-medium">Penetrationstest Anbieter · Seriöse Pentester · OSCP Certified</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Der richtige Penetrationstest Anbieter –<br />
            <span className="text-[#FF3B30]">Wie man Qualität erkennt</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Wie unterscheidest du zwischen seriösen Pentestern und unzureichenden Anbietern? Dieser Guide zeigt dir, worauf du achten musst – und was Sodu Secure macht, um deine Sicherheit zu garantieren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/request-pentest" className="inline-flex items-center justify-center gap-2 bg-[#FF3B30] hover:bg-[#E5332A] text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Seriösen Pentester buchen
            </Link>
            <Link href="/penetration-testing" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Pentest Übersicht <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Trust bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[["500+", "Erfolgreiche Pentests"], ["OSCP · CEH · CISSP", "Zertifizierungen"], ["100%", "Kundenzufriedenheit"], ["24h", "Angebots-Response"]].map(([stat, label]) => (
              <div key={stat} className="bg-[#0A0A0B] border border-white/10 rounded-xl py-3 px-2 text-center">
                <div className="text-xl font-bold text-[#FF6B61]">{stat}</div>
                <div className="text-white/50 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <th className="px-4 py-3 text-left font-semibold text-[#FF6B61]">Kosten</th>
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

      {/* Quality Banner */}
      <section className="py-10 bg-[#FF3B30]/10 border-y border-[#FF3B30]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-7 h-7 text-[#FF6B61] mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Billig = Schlecht? Nicht immer, aber fast immer!</h3>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            €500 für einen &apos;Pentest&apos;? Das ist ein Scan. Ein echte manueller Pentest mit zertifizierten Experten kostet ab €1.500. Qualität hat ihren Preis – aber den lohnt sich.
          </p>
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
                {openFaq === i && <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <Link href="/penetration-testing-anbieter" className="text-[#FF6B61] hover:text-[#FF8077]">Pentest Anbieter (Festpreis)</Link>
            <Link href="/iso-27001-pentest-anforderungen" className="text-[#FF6B61] hover:text-[#FF8077]">Pentest ISO 27001</Link>
            <Link href="/pentest-kosten" className="text-[#FF6B61] hover:text-[#FF8077]">Pentest Kosten</Link>
            <Link href="/pentest-konfigurator" className="text-[#FF6B61] hover:text-[#FF8077]">Konfigurator</Link>
            <Link href="/request-pentest" className="text-[#FF6B61] hover:text-[#FF8077]">Beratung buchen</Link>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <LeadConversionSection context="Penetrationstest Anbieter" />
    </main>
  );
}
