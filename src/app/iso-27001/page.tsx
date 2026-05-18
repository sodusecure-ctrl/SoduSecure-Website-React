"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Lock,
  BookOpen,
  FileText,
  Users,
  Target,
  AlertTriangle,
  Zap,
  Cloud,
  Server,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const PHONE = "(+49) 01777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";
const EMAIL = "info@sodusecure.com";

const ISO_SECTIONS = [
  {
    icon: Shield,
    title: "Internationale Information Security Norm",
    desc: "ISO 27001 ist die weltweit anerkannteste Norm für Informationssicherheitsmanagementsysteme (ISMS). Sie ist Grundlage für alle anderen ISO 27000er Standards.",
    color: "blue",
  },
  {
    icon: CheckCircle,
    title: "Zertifizierbar & Überprüfbar",
    desc: "ISO 27001 ist die einzige zertifizierbare Norm der ISO 27000er Serie. Unabhängige Auditor*innen prüfen die Einhaltung und stellen Zertifikate aus.",
    color: "green",
  },
  {
    icon: Lock,
    title: "Alle Sicherheitsaspekte abdeckend",
    desc: "Von Access-Control über Kryptographie bis hin zu Incident Management: ISO 27001 hat 114 Kontrollmaßnahmen in 14 Kategorien.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Risiko-Basiert",
    desc: "ISO 27001 folgt einem Risk-Management-Ansatz: Identifizieren → Bewerten → Behandeln → Überwachen. Kontinuierliche Verbesserung ist zentral.",
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  green: "bg-green-500/10 border-green-500/20 text-green-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  red: "bg-red-500/10 border-red-500/20 text-red-400",
  teal: "bg-teal-500/10 border-teal-500/20 text-teal-400",
};

const WHY_CERTIFIED = [
  {
    icon: Target,
    title: "Wettbewerbsvorteil",
    desc: "Kund*innen und Partner*innen vertrauen ISO 27001 Zertifizierung. Für B2B-Unternehmen ist es oft eine Voraussetzung bei Ausschreibungen.",
  },
  {
    icon: Lock,
    title: "Gesetzliche Anforderungen",
    desc: "DSGVO, NIS2, BSI-Grundschutz – viele Regulierungen erfordern ISO 27001 oder ISO 27001 äquivalente Maßnahmen.",
  },
  {
    icon: Zap,
    title: "Brechen von Cyberangriffen minimieren",
    desc: "Die 114 Kontrollen schließen systematisch Sicherheitslücken. Mit ISO 27001 ist man deutlich weniger anfällig für Hackerattacken.",
  },
  {
    icon: Users,
    title: "Vertrauen der Stakeholder",
    desc: "Investor*innen, Aufsichtsrat, Mitarbeitende – das Zertifikat zeigt: Ihre Daten sind hier sicher.",
  },
  {
    icon: BookOpen,
    title: "Dokumentierte Sicherheitskultur",
    desc: "ISO 27001 zwingt zur Dokumentation. Sie wissen genau, welche Sicherheitsrichtlinien gelten und wer sie befolgt.",
  },
  {
    icon: Cloud,
    title: "Skalierbar",
    desc: "Ob Start-up oder Großkonzern, ob On-Premise oder Cloud – ISO 27001 ist branchenübergreifend anwendbar.",
  },
];

const AUDIT_PHASES = [
  {
    step: "1",
    title: "Initialisierung",
    desc: "Befragung der Geschäftsführung, Risikoanalyse, Scope-Definition.",
  },
  {
    step: "2",
    title: "Hauptaudit",
    desc: "Vor-Ort Audit: Prüfung aller 114 Kontrollen, Interviews, Dokumentprüfung.",
  },
  {
    step: "3",
    title: "Abweichungsbericht",
    desc: "Auditoren berichten Abweichungen. Sie haben Zeit zur Behebung (abhängig von Schweregrad).",
  },
  {
    step: "4",
    title: "Zertifikat-Erteilung",
    desc: "Bei Erfüllung aller Anforderungen: Zertifikat mit 3-jähriger Gültigkeit.",
  },
  {
    step: "5",
    title: "Überwachungsaudits",
    desc: "Jährliche Folge-Audits (Surveillance Audits) zur Aufrechterhaltung der Zertifizierung.",
  },
];

const PENTEST_ROLE = [
  {
    title: "A.12.6 Penetration Testing",
    desc: "Diese ISO 27001 Anforderung besagt: 'Es sollten regelmäßig Penetrationstests durchgeführt werden, um die Wirksamkeit von technischen und nicht-technischen Kontrollen nachzuweisen.'",
    highlight: true,
  },
  {
    title: "Evidenznachweis",
    desc: "Der Pentest-Bericht dient als Beweis gegenüber dem Auditor: Ihre Sicherheitsmaßnahmen funktionieren in der Praxis.",
  },
  {
    title: "Nachweis von Remediation",
    desc: "Nach Behebung von Schwachstellen: Retest zeigt dem Auditor, dass Maßnahmen implementiert wurden.",
  },
  {
    title: "Compliance-Erfüllung",
    desc: "Auditor*innen und Zertifizierungsstellen akzeptieren unabhängige Pentest-Berichte als Nachweis für A.12.6.",
  },
];

const FAQS = [
  {
    q: "Kostet ISO 27001 zu viel? - Warum lohnt sich die Investition?",
    a: "Nein. Zwar kostet die Implementierung und Zertifizierung (meist 8.000–40.000 €), aber: (1) Sie vermeiden Sicherheitsverletzungen, die Millionen kosten. (2) Sie gewinnen Kund*innen durch Vertrauen. (3) Versicherungen gewähren Rabatte. (4) Sie erfüllen Compliance-Anforderungen automatisch.",
  },
  {
    q: "Muss mein Unternehmen ISO 27001 haben?",
    a: "Das hängt von Ihrer Branche ab: Im Finanzsektor, in der Medizin, der öffentlichen Verwaltung und für große Unternehmen ist es oft Anforderung. Kleine Unternehmen ohne kritische Daten können oft mit ISO 27002 oder BSI-Grundschutz starten.",
  },
  {
    q: "Wie lange dauert die ISO 27001 Zertifizierung?",
    a: "Typischerweise 6–12 Monate. Das hängt vom Reifegrad Ihrer bestehenden Sicherheit ab. Unternehmen mit bereits guter Infrastruktur brauchen 4–6 Monate, andere 12–18 Monate.",
  },
  {
    q: "Wer darf ISO 27001 Audits durchführen?",
    a: "Nur akkreditierte Zertifizierungsstellen (z.B. TÜV, DEKRA, DQS). Diese erhalten Akkreditierung durch DAkkS (Deutsche Akkreditierungsstelle). Berater sind NICHT zertifizierungsbefugt.",
  },
  {
    q: "Wie oft muss ich ein Pentest für ISO 27001 machen?",
    a: "Die Norm fordert 'regelmäßig' – das bedeutet normalerweise 1x pro Jahr. Kritischere Systeme können 2x pro Jahr geprüft werden. Bündung mit Audit-Zyklus ist sinnvoll.",
  },
  {
    q: "Gilt ISO 27001 auch für kleine Unternehmen?",
    a: "Ja, formell auch. Allerdings: ISO 27002 ist weniger rigide und für KMU oft besser geeignet. Und: ISO/IEC 27036 für Supplier-Risiko kann für größere Lieferanten ausreichend sein.",
  },
  {
    q: "Kann ich ISO 27001 auch ohne Zertifizierung implementieren?",
    a: "Ja, das ist möglich – wird aber von Partner*innen und Kund*innen nicht anerkennt. Das Zertifikat ist der Beweis, dass eine unabhängige dritte Partei die Einhaltung überprüft hat.",
  },
];

const COMPLIANCE_FRAMEWORKS = [
  {
    name: "DSGVO / GDPR",
    desc: "Art. 32 verlangt 'geeignete technische und organisatorische Maßnahmen'. ISO 27001 erfüllt diesen Standard.",
  },
  {
    name: "NIS2 Richtlinie",
    desc: "Gilt ab 2025 für kritische Infrastrukturen. ISO 27001 ist Nachweis für erforderliche Sicherheitsmaßnahmen.",
  },
  {
    name: "BSI IT-Grundschutz",
    desc: "Deutsches Äquivalent. ISO 27001 und BSI-GS sind in Anforderungen und Geist deckungsgleich.",
  },
  {
    name: "SOC 2 Type II",
    desc: "Verlangt Sicherheitstests u. Compliance-Überwachung. ISO 27001 ist Basis für SOC 2.",
  },
  {
    name: "PCI DSS",
    desc: "Für Payment Card Industry – Penetrationstests sind PCI DSS Req. 11.3. ISO 27001 erweitert PCI DSS.",
  },
  {
    name: "ISO 20000",
    desc: "IT Service Management Norm – ISO 27001 ist Ergänzung für Sicherheitsaspekte.",
  },
];

export default function ISO27001Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#131927] via-[#0d1117] to-[#131927] py-20 lg:py-32 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">ISO 27001 Compliance · ISMS · Zertifizierung</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            ISO 27001 –<br />
            <span className="text-blue-500">Der internationale Standard für Informationssicherheit</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Schützen Sie Ihr Unternehmen mit ISO 27001. Der weltweit anerkannteste Standard für Informationssicherheitsmanagementsysteme. Zertifizierung, Compliance, Penetrationstests – alles aus einer Hand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/request-pentest" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Kostenlose Beratung
            </Link>
            <Link href="/iso-27001-pentest-anforderungen" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-base">
              ISO 27001 & Pentest <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Trust bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[["200+", "Zertifizierungen unterstützt"], ["10+", "Jahre Erfahrung"], ["ISO/IEC 27001", "Akkreditiert"], ["24h", "Beratung-Response"]].map(([stat, label]) => (
              <div key={stat} className="bg-[#131927] border border-gray-800 rounded-xl py-3 px-2 text-center">
                <div className="text-xl font-bold text-blue-400">{stat}</div>
                <div className="text-gray-500 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was ist ISO 27001? */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Was ist ISO 27001?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Die Grundlagen der internationalen Informationssicherheitsnorm verstehen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISO_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-[#131927] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-lg border mb-4 ${colorMap[section.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{section.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warum ISO 27001? */}
      <section className="py-16 lg:py-20 bg-[#0a0e17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Warum ISO 27001?</h2>
            <p className="text-gray-400">6 Gründe, warum Ihre Organisation ISO 27001 braucht.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CERTIFIED.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 bg-[#131927] border border-gray-800 rounded-xl p-5">
                  <div className="w-10 h-10 bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pentest Role in ISO 27001 */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pentest für ISO 27001</h2>
            <p className="text-gray-400">Warum Penetrationstests zentral für ISO 27001 sind.</p>
          </div>
          <div className="space-y-4">
            {PENTEST_ROLE.map((item, i) => (
              <div key={i} className={`p-6 rounded-xl border ${item.highlight ? "bg-blue-600/10 border-blue-600/30" : "bg-[#131927] border-gray-800"}`}>
                <h3 className={`font-bold text-lg mb-2 ${item.highlight ? "text-blue-400" : ""}`}>{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ISO 27001 Audit Phases */}
      <section className="py-16 lg:py-20 bg-[#0a0e17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Audit & Zertifizierungsprozess</h2>
            <p className="text-gray-400">5 Schritte zum ISO 27001 Zertifikat.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AUDIT_PHASES.map((phase) => (
              <div key={phase.step} className="bg-[#131927] border border-gray-800 rounded-xl p-5">
                <div className="text-blue-500 text-3xl font-bold mb-2">{phase.step}</div>
                <h3 className="font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & andere Frameworks */}
      <section className="py-16 border-y border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">ISO 27001 & andere Compliance-Standards</h2>
            <p className="text-gray-400">ISO 27001 ist Basis für viele andere Regulierungen.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPLIANCE_FRAMEWORKS.map((c) => (
              <div key={c.name} className="bg-[#131927] border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <h3 className="font-semibold">{c.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NIS2 Banner */}
      <section className="py-10 bg-orange-900/10 border-b border-orange-800/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-7 h-7 text-orange-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">NIS2 & BSI-Grundschutz verpflichtend</h3>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Ab 2025 müssen Tausende deutsche Unternehmen NIS2 erfüllen. ISO 27001 ist der schnellste Weg zur Compliance. SODU Secure berät Sie zur Umsetzung.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zu ISO 27001</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#131927] border border-gray-800 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
                  <span className="font-medium">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zertifizierungskosten */}
      <section className="py-14 bg-[#0a0e17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">ISO 27001 Kosten – Überblick</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[["Consulting & Implementierung", "€ 8.000 – 40.000"], ["Erstzertifizierung", "€ 3.000 – 8.000"], ["Jährliche Audits", "€ 1.500 – 3.000"]].map(([type, cost]) => (
              <div key={type} className="bg-[#131927] border border-gray-800 rounded-xl p-6 text-center">
                <div className="text-sm text-gray-400 mb-2">{type}</div>
                <div className="font-bold text-blue-400 text-lg">{cost}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm text-gray-500">
            *Kosten variieren je nach Unternehmensgröße, Branche und aktuellem Reifegrad
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900/20 via-[#0d1117] to-[#0d1117] border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-14 h-14 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">ISO 27001 – Starten Sie jetzt!</h2>
          <p className="text-gray-400 text-lg mb-8">
            Kostenlose Erstberatung · Roadmap in 48 Stunden · Zertifizierte Berater
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />{PHONE}
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-10 py-4 rounded-lg font-semibold transition-colors">
              <Mail className="w-5 h-5" />{EMAIL}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <Link href="/iso-27001-pentest-anforderungen" className="text-blue-400 hover:text-blue-300">Pentest Anforderungen</Link>
            <Link href="/iso-27001-zertifizierung" className="text-blue-400 hover:text-blue-300">Zertifizierung</Link>
            <Link href="/penetration-testing" className="text-blue-400 hover:text-blue-300">Penetrationstest</Link>
            <Link href="/request-pentest" className="text-blue-400 hover:text-blue-300">Beratung buchen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
