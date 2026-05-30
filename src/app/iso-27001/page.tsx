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
    desc: "ISO 27001 ist die weltweit anerkannteste Norm fÃ¼r Informationssicherheitsmanagementsysteme (ISMS). Sie ist Grundlage fÃ¼r alle anderen ISO 27000er Standards.",
    color: "blue",
  },
  {
    icon: CheckCircle,
    title: "Zertifizierbar & ÃœberprÃ¼fbar",
    desc: "ISO 27001 ist die einzige zertifizierbare Norm der ISO 27000er Serie. UnabhÃ¤ngige Auditor*innen prÃ¼fen die Einhaltung und stellen Zertifikate aus.",
    color: "green",
  },
  {
    icon: Lock,
    title: "Alle Sicherheitsaspekte abdeckend",
    desc: "Von Access-Control Ã¼ber Kryptographie bis hin zu Incident Management: ISO 27001 hat 114 KontrollmaÃŸnahmen in 14 Kategorien.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Risiko-Basiert",
    desc: "ISO 27001 folgt einem Risk-Management-Ansatz: Identifizieren â†’ Bewerten â†’ Behandeln â†’ Ãœberwachen. Kontinuierliche Verbesserung ist zentral.",
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  green: "bg-green-500/10 border-green-500/20 text-green-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  red: "bg-[#FF3B30]/10 border-[#FF3B30]/20 text-[#FF3B30]",
  teal: "bg-teal-500/10 border-teal-500/20 text-teal-400",
};

const WHY_CERTIFIED = [
  {
    icon: Target,
    title: "Wettbewerbsvorteil",
    desc: "Kund*innen und Partner*innen vertrauen ISO 27001 Zertifizierung. FÃ¼r B2B-Unternehmen ist es oft eine Voraussetzung bei Ausschreibungen.",
  },
  {
    icon: Lock,
    title: "Gesetzliche Anforderungen",
    desc: "DSGVO, NIS2, BSI-Grundschutz â€“ viele Regulierungen erfordern ISO 27001 oder ISO 27001 Ã¤quivalente MaÃŸnahmen.",
  },
  {
    icon: Zap,
    title: "Brechen von Cyberangriffen minimieren",
    desc: "Die 114 Kontrollen schlieÃŸen systematisch SicherheitslÃ¼cken. Mit ISO 27001 ist man deutlich weniger anfÃ¤llig fÃ¼r Hackerattacken.",
  },
  {
    icon: Users,
    title: "Vertrauen der Stakeholder",
    desc: "Investor*innen, Aufsichtsrat, Mitarbeitende â€“ das Zertifikat zeigt: Ihre Daten sind hier sicher.",
  },
  {
    icon: BookOpen,
    title: "Dokumentierte Sicherheitskultur",
    desc: "ISO 27001 zwingt zur Dokumentation. Sie wissen genau, welche Sicherheitsrichtlinien gelten und wer sie befolgt.",
  },
  {
    icon: Cloud,
    title: "Skalierbar",
    desc: "Ob Start-up oder GroÃŸkonzern, ob On-Premise oder Cloud â€“ ISO 27001 ist branchenÃ¼bergreifend anwendbar.",
  },
];

const AUDIT_PHASES = [
  {
    step: "1",
    title: "Initialisierung",
    desc: "Befragung der GeschÃ¤ftsfÃ¼hrung, Risikoanalyse, Scope-Definition.",
  },
  {
    step: "2",
    title: "Hauptaudit",
    desc: "Vor-Ort Audit: PrÃ¼fung aller 114 Kontrollen, Interviews, DokumentprÃ¼fung.",
  },
  {
    step: "3",
    title: "Abweichungsbericht",
    desc: "Auditoren berichten Abweichungen. Sie haben Zeit zur Behebung (abhÃ¤ngig von Schweregrad).",
  },
  {
    step: "4",
    title: "Zertifikat-Erteilung",
    desc: "Bei ErfÃ¼llung aller Anforderungen: Zertifikat mit 3-jÃ¤hriger GÃ¼ltigkeit.",
  },
  {
    step: "5",
    title: "Ãœberwachungsaudits",
    desc: "JÃ¤hrliche Folge-Audits (Surveillance Audits) zur Aufrechterhaltung der Zertifizierung.",
  },
];

const PENTEST_ROLE = [
  {
    title: "A.12.6 Penetration Testing",
    desc: "Diese ISO 27001 Anforderung besagt: 'Es sollten regelmÃ¤ÃŸig Penetrationstests durchgefÃ¼hrt werden, um die Wirksamkeit von technischen und nicht-technischen Kontrollen nachzuweisen.'",
    highlight: true,
  },
  {
    title: "Evidenznachweis",
    desc: "Der Pentest-Bericht dient als Beweis gegenÃ¼ber dem Auditor: Ihre SicherheitsmaÃŸnahmen funktionieren in der Praxis.",
  },
  {
    title: "Nachweis von Remediation",
    desc: "Nach Behebung von Schwachstellen: Retest zeigt dem Auditor, dass MaÃŸnahmen implementiert wurden.",
  },
  {
    title: "Compliance-ErfÃ¼llung",
    desc: "Auditor*innen und Zertifizierungsstellen akzeptieren unabhÃ¤ngige Pentest-Berichte als Nachweis fÃ¼r A.12.6.",
  },
];

const FAQS = [
  {
    q: "Kostet ISO 27001 zu viel? - Warum lohnt sich die Investition?",
    a: "Nein. Zwar kostet die Implementierung und Zertifizierung (meist 8.000â€“40.000 â‚¬), aber: (1) Sie vermeiden Sicherheitsverletzungen, die Millionen kosten. (2) Sie gewinnen Kund*innen durch Vertrauen. (3) Versicherungen gewÃ¤hren Rabatte. (4) Sie erfÃ¼llen Compliance-Anforderungen automatisch.",
  },
  {
    q: "Muss mein Unternehmen ISO 27001 haben?",
    a: "Das hÃ¤ngt von Ihrer Branche ab: Im Finanzsektor, in der Medizin, der Ã¶ffentlichen Verwaltung und fÃ¼r groÃŸe Unternehmen ist es oft Anforderung. Kleine Unternehmen ohne kritische Daten kÃ¶nnen oft mit ISO 27002 oder BSI-Grundschutz starten.",
  },
  {
    q: "Wie lange dauert die ISO 27001 Zertifizierung?",
    a: "Typischerweise 6â€“12 Monate. Das hÃ¤ngt vom Reifegrad Ihrer bestehenden Sicherheit ab. Unternehmen mit bereits guter Infrastruktur brauchen 4â€“6 Monate, andere 12â€“18 Monate.",
  },
  {
    q: "Wer darf ISO 27001 Audits durchfÃ¼hren?",
    a: "Nur akkreditierte Zertifizierungsstellen (z.B. TÃœV, DEKRA, DQS). Diese erhalten Akkreditierung durch DAkkS (Deutsche Akkreditierungsstelle). Berater sind NICHT zertifizierungsbefugt.",
  },
  {
    q: "Wie oft muss ich ein Pentest fÃ¼r ISO 27001 machen?",
    a: "Die Norm fordert 'regelmÃ¤ÃŸig' â€“ das bedeutet normalerweise 1x pro Jahr. Kritischere Systeme kÃ¶nnen 2x pro Jahr geprÃ¼ft werden. BÃ¼ndung mit Audit-Zyklus ist sinnvoll.",
  },
  {
    q: "Gilt ISO 27001 auch fÃ¼r kleine Unternehmen?",
    a: "Ja, formell auch. Allerdings: ISO 27002 ist weniger rigide und fÃ¼r KMU oft besser geeignet. Und: ISO/IEC 27036 fÃ¼r Supplier-Risiko kann fÃ¼r grÃ¶ÃŸere Lieferanten ausreichend sein.",
  },
  {
    q: "Kann ich ISO 27001 auch ohne Zertifizierung implementieren?",
    a: "Ja, das ist mÃ¶glich â€“ wird aber von Partner*innen und Kund*innen nicht anerkennt. Das Zertifikat ist der Beweis, dass eine unabhÃ¤ngige dritte Partei die Einhaltung Ã¼berprÃ¼ft hat.",
  },
];

const COMPLIANCE_FRAMEWORKS = [
  {
    name: "DSGVO / GDPR",
    desc: "Art. 32 verlangt 'geeignete technische und organisatorische MaÃŸnahmen'. ISO 27001 erfÃ¼llt diesen Standard.",
  },
  {
    name: "NIS2 Richtlinie",
    desc: "Gilt ab 2025 fÃ¼r kritische Infrastrukturen. ISO 27001 ist Nachweis fÃ¼r erforderliche SicherheitsmaÃŸnahmen.",
  },
  {
    name: "BSI IT-Grundschutz",
    desc: "Deutsches Ã„quivalent. ISO 27001 und BSI-GS sind in Anforderungen und Geist deckungsgleich.",
  },
  {
    name: "SOC 2 Type II",
    desc: "Verlangt Sicherheitstests u. Compliance-Ãœberwachung. ISO 27001 ist Basis fÃ¼r SOC 2.",
  },
  {
    name: "PCI DSS",
    desc: "FÃ¼r Payment Card Industry â€“ Penetrationstests sind PCI DSS Req. 11.3. ISO 27001 erweitert PCI DSS.",
  },
  {
    name: "ISO 20000",
    desc: "IT Service Management Norm â€“ ISO 27001 ist ErgÃ¤nzung fÃ¼r Sicherheitsaspekte.",
  },
];

export default function ISO27001Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">ISO 27001 Compliance Â· ISMS Â· Zertifizierung</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            ISO 27001 â€“<br />
            <span className="text-blue-500">Der internationale Standard fÃ¼r Informationssicherheit</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            SchÃ¼tzen Sie Ihr Unternehmen mit ISO 27001. Der weltweit anerkannteste Standard fÃ¼r Informationssicherheitsmanagementsysteme. Zertifizierung, Compliance, Penetrationstests â€“ alles aus einer Hand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/request-pentest" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Kostenlose Beratung
            </Link>
            <Link href="/iso-27001-pentest-anforderungen" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              ISO 27001 & Pentest <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Trust bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[["200+", "Zertifizierungen unterstÃ¼tzt"], ["10+", "Jahre Erfahrung"], ["ISO/IEC 27001", "Akkreditiert"], ["24h", "Beratung-Response"]].map(([stat, label]) => (
              <div key={stat} className="bg-[#0A0A0B] border border-white/10 rounded-xl py-3 px-2 text-center">
                <div className="text-xl font-bold text-blue-400">{stat}</div>
                <div className="text-white/50 text-xs mt-0.5">{label}</div>
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
            <p className="text-white/60 max-w-2xl mx-auto">Die Grundlagen der internationalen Informationssicherheitsnorm verstehen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISO_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 hover:border-white/15 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-2xl border mb-4 ${colorMap[section.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{section.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warum ISO 27001? */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Warum ISO 27001?</h2>
            <p className="text-white/60">6 GrÃ¼nde, warum Ihre Organisation ISO 27001 braucht.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CERTIFIED.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                  <div className="w-10 h-10 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
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
            <h2 className="text-3xl font-bold mb-4">Pentest fÃ¼r ISO 27001</h2>
            <p className="text-white/60">Warum Penetrationstests zentral fÃ¼r ISO 27001 sind.</p>
          </div>
          <div className="space-y-4">
            {PENTEST_ROLE.map((item, i) => (
              <div key={i} className={`p-6 rounded-xl border ${item.highlight ? "bg-blue-600/10 border-blue-600/30" : "bg-[#0A0A0B] border-white/10"}`}>
                <h3 className={`font-bold text-lg mb-2 ${item.highlight ? "text-blue-400" : ""}`}>{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ISO 27001 Audit Phases */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Audit & Zertifizierungsprozess</h2>
            <p className="text-white/60">5 Schritte zum ISO 27001 Zertifikat.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AUDIT_PHASES.map((phase) => (
              <div key={phase.step} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                <div className="text-blue-500 text-3xl font-bold mb-2">{phase.step}</div>
                <h3 className="font-semibold mb-2">{phase.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & andere Frameworks */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">ISO 27001 & andere Compliance-Standards</h2>
            <p className="text-white/60">ISO 27001 ist Basis fÃ¼r viele andere Regulierungen.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPLIANCE_FRAMEWORKS.map((c) => (
              <div key={c.name} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <h3 className="font-semibold">{c.name}</h3>
                </div>
                <p className="text-white/60 text-sm">{c.desc}</p>
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
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Ab 2025 mÃ¼ssen Tausende deutsche Unternehmen NIS2 erfÃ¼llen. ISO 27001 ist der schnellste Weg zur Compliance. SODU Secure berÃ¤t Sie zur Umsetzung.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">HÃ¤ufige Fragen zu ISO 27001</h2>
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

      {/* Zertifizierungskosten */}
      <section className="py-14 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">ISO 27001 Kosten â€“ Ãœberblick</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[["Consulting & Implementierung", "â‚¬ 8.000 â€“ 40.000"], ["Erstzertifizierung", "â‚¬ 3.000 â€“ 8.000"], ["JÃ¤hrliche Audits", "â‚¬ 1.500 â€“ 3.000"]].map(([type, cost]) => (
              <div key={type} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-sm text-white/60 mb-2">{type}</div>
                <div className="font-bold text-blue-400 text-lg">{cost}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm text-white/50">
            *Kosten variieren je nach UnternehmensgrÃ¶ÃŸe, Branche und aktuellem Reifegrad
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900/20 via-[#0A0A0B] to-[#0A0A0B] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-14 h-14 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">ISO 27001 â€“ Starten Sie jetzt!</h2>
          <p className="text-white/60 text-lg mb-8">
            Kostenlose Erstberatung Â· Roadmap in 48 Stunden Â· Zertifizierte Berater
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />{PHONE}
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-10 py-4 rounded-2xl font-semibold transition-colors">
              <Mail className="w-5 h-5" />{EMAIL}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
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
