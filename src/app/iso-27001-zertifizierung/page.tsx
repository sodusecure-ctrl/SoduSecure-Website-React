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
  Target,
  Zap,
  BookOpen,
  FileText,
  Users,
  AlertTriangle,
  Lock,
  Network,
  TrendingUp,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const PHONE = "(+49) 01777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";
const EMAIL = "info@sodusecure.com";

const TIMELINE = [
  {
    step: "Woche 1-4",
    title: "Assessment & Gap Analysis",
    desc: "SODU-Berater prÃ¼ft Ihre aktuelle Sicherheit gegen ISO 27001 (114 Kontrollen). Identifikation von LÃ¼cken und PrioritÃ¤ten.",
    icon: Target,
  },
  {
    step: "Woche 5-12",
    title: "Implementierung",
    desc: "Aufbau des ISMS (Information Security Management System). Richtlinien, Prozesse, Schulungen, Dokumentation.",
    icon: BookOpen,
  },
  {
    step: "Woche 13-16",
    title: "Penetrationstests",
    desc: "ISO-konformer Pentest als Nachweis fÃ¼r A.12.6. Findings werden in Audit-Reports gemappt.",
    icon: Shield,
  },
  {
    step: "Woche 17-20",
    title: "Audit-Vorbereitung",
    desc: "Finale Gap-Checks. Alle Dokumentationen bereit. Mock-Audits durchfÃ¼hren. Risiken minimieren.",
    icon: CheckCircle,
  },
  {
    step: "Woche 21",
    title: "Hauptaudit",
    desc: "Akkreditierte Zertifizierungsstelle prÃ¼ft vor Ort. Alle 114 Kontrollen werden durchgeprÃ¼ft.",
    icon: Users,
  },
  {
    step: "Woche 22-24",
    title: "Zertifikat-Erteilung",
    desc: "Bei ErfÃ¼llung: ISO 27001 Zertifikat mit 3-jÃ¤hriger GÃ¼ltigkeit. Ã–ffentliche Anerkennung.",
    icon: Trophy,
  },
];

const AUDIT_CHECKLIST = [
  {
    category: "Governance & Management",
    items: [
      "Information Security Policy schriftlich dokumentiert",
      "ISMS-Scope klar definiert",
      "Risk Assessment durchgefÃ¼hrt & dokumentiert",
      "Risk Treatment Plan mit KontrollmaÃŸnahmen",
    ],
  },
  {
    category: "Technische Kontrollen",
    items: [
      "Access Control implementiert",
      "Kryptographie fÃ¼r kritische Daten",
      "Firewall & IDS/IPS konfiguriert",
      "Penetrationstest durchgefÃ¼hrt (A.12.6)",
    ],
  },
  {
    category: "Organisatorische MaÃŸnahmen",
    items: [
      "Security Awareness Training fÃ¼r alle Mitarbeiter",
      "Incident Response Plan",
      "Supplier/Third-Party Risk Management",
      "Kontinuierliches Monitoring",
    ],
  },
  {
    category: "Dokumentation & Auditing",
    items: [
      "Alle Prozesse dokumentiert",
      "Audit Logs und Monitoring",
      "Interne Audits durchgefÃ¼hrt",
      "Management Review durchgefÃ¼hrt",
    ],
  },
];

const BENEFITS_CERTIFIED = [
  {
    icon: TrendingUp,
    title: "Wettbewerbsvorteil",
    desc: "Das Zertifikat macht Sie zum bevorzugten Partner in Ausschreibungen und B2B-Deals.",
  },
  {
    icon: Lock,
    title: "Reduktion von Cyberrisiken",
    desc: "Die 114 Kontrollen schlieÃŸen SicherheitslÃ¼cken systematisch. Hacking-Risiko sinkt messbar.",
  },
  {
    icon: FileText,
    title: "Compliance & Regulierung",
    desc: "DSGVO, NIS2, BSI-Grundschutz, SOC 2 â€“ ISO 27001 erfÃ¼llt alle. RÃ¼ckgrat des Compliance-Portfolios.",
  },
  {
    icon: Users,
    title: "Mitarbeiter-Vertrauen",
    desc: "Ihre Mitarbeiter sehen: Die Daten hier sind sicher. HÃ¶here Zufriedenheit, niedrigere Fehlerquote.",
  },
  {
    icon: AlertTriangle,
    title: "Versicherung & Haftung",
    desc: "Manche Cyber-Versicherungen geben Rabatte fÃ¼r ISO 27001. Im Schadensfall: Besserer Haftungsschutz.",
  },
  {
    icon: Shield,
    title: "Kontinuierliche Verbesserung",
    desc: "ISO 27001 zwingt zu jÃ¤hrlichen ÃœberprÃ¼fungen. Security wird zur Daueraufgabe, nicht zu Ad-hoc-AktivitÃ¤t.",
  },
];

const COMMON_FINDINGS = [
  {
    name: "Unzureichendes Access Control",
    severity: "Critical",
    solution: "Implementierung von Least Privilege, Multi-Factor Authentication, Role-Based Access Control.",
  },
  {
    name: "Fehlende oder schwache VerschlÃ¼sselung",
    severity: "High",
    solution: "TLS 1.2+, AES-256 fÃ¼r Ruhendaten, Key Management System.",
  },
  {
    name: "Ungepatcht Systeme",
    severity: "High",
    solution: "Patch Management Policy, regelmÃ¤ÃŸige Updates, Security Scanning.",
  },
  {
    name: "Unzureichende Incident Response",
    severity: "Medium",
    solution: "Incident Response Plan, Rollen & Verantwortlichkeiten, KrisenÃ¼bungen.",
  },
  {
    name: "Schwaches Passwort-Management",
    severity: "High",
    solution: "Password Policy mit KomplexitÃ¤tsanforderungen, Password Manager, Schulungen.",
  },
  {
    name: "Fehlende Disaster Recovery",
    severity: "High",
    solution: "Backup-Strategie, Recovery Point Objective (RPO), Recovery Time Objective (RTO), Tests.",
  },
];

const FAQS = [
  {
    q: "Wie lange dauert ISO 27001 Zertifizierung?",
    a: "Typischerweise 6â€“12 Monate, je nach Reifegrad Ihrer vorhandenen Sicherheit. Unternehmen mit bereits etablierter Sicherheit: 4â€“6 Monate. Komplexe, regulierte Organisationen: 12â€“18 Monate.",
  },
  {
    q: "Was kostet ISO 27001 Zertifizierung?",
    a: "Gesamtbudget: â‚¬8.000â€“â‚¬40.000. Consulting & Implementierung: â‚¬5.000â€“â‚¬30.000. Erstzertifizierung (Audithonorar): â‚¬3.000â€“â‚¬8.000. JÃ¤hrliche Folgeaudits: â‚¬1.500â€“â‚¬3.000.",
  },
  {
    q: "Brauchen wir einen externen Berater oder kÃ¶nnen wir es intern machen?",
    a: "Beides ist mÃ¶glich. Intern ist gÃ¼nstiger, aber zeitaufwendig (ca. 500â€“1.000 Stunden). Extern ist teurer, aber schneller und garantiert Audit-Ready. Idealerweise: Mischansatz â€“ wir coachen Ihr Team.",
  },
  {
    q: "Ist ISO 27001 in unserer Branche verpflichtend?",
    a: "Das hÃ¤ngt von Ihrer Branche ab: Finanzsektor â€“ meist ja. Medizin/Gesundheit â€“ oft ja. Ã–ffentliche Verwaltung â€“ ja. Tech-Unternehmen â€“ eher nicht, aber ein Wettbewerbsvorteil. KMU â€“ optional, aber empfohlen.",
  },
  {
    q: "Wie oft mÃ¼ssen wir rezertifizieren?",
    a: "Das Zertifikat ist 3 Jahre gÃ¼ltig. In dieser Zeit: 2 jÃ¤hrliche Surveillance Audits. Nach 3 Jahren: Rezertifizierung (Ã¤hnlich wie Erstzertifizierung).",
  },
  {
    q: "Was passiert, wenn Auditor*innen Abweichungen finden?",
    a: "Non-Conformities (Abweichungen) werden klassifiziert: Major (kritisch) oder Minor (leicht zu beheben). Majors mÃ¼ssen in 2 Wochen behoben werden, Minor in 3 Monaten. Nach Behebung: BestÃ¤tigungsaudit.",
  },
  {
    q: "Kann ich ISO 27001 + andere Standards (SOC 2, BSI-GS) kombinieren?",
    a: "Ja! ISO 27001 ist modular und kombinierbar. Viele Kontrollen Ã¼berlappen. Mit guter Planung: ISO 27001 + BSI-Grundschutz + SOC 2 in einer Implementierung mÃ¶glich â€“ spart Zeit und Kosten.",
  },
];

function Trophy(props: React.ComponentProps<"svg">) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a9 9 0 110 18m0-18a9 9 0 100 18m0-18v18" />
    </svg>
  );
}

export default function ISO27001CertificationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-green-600/10 border border-green-600/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">ISO 27001 Zertifizierung Â· ISMS Â· Compliance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            ISO 27001<br />
            <span className="text-green-500">Zertifizierung â€“ Sicher zur Zertifizierung</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Von der Analyse Ã¼ber Implementierung bis zum Zertifikat. Wir begleiten Sie Schritt fÃ¼r Schritt â€“ inklusive Penetrationstests, Audit-Vorbereitung und Expert-Coaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/request-pentest" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Zertifizierungs-Beratung
            </Link>
            <Link href="/iso-27001-pentest-anforderungen" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Pentest-Anforderungen <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Trust bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[["200+", "Zertifizierungen begleitet"], ["95%", "Erfolgs-Rate"], ["6-12 Monate", "Durchschnitt"], ["audit-ready", "Garantiert"]].map(([stat, label]) => (
              <div key={stat} className="bg-[#0A0A0B] border border-white/10 rounded-xl py-3 px-2 text-center">
                <div className="text-xl font-bold text-green-400">{stat}</div>
                <div className="text-white/50 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">6-Phase Zertifizierungs-Roadmap</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Von der Analyse zum Zertifikat â€“ unser bewÃ¤hrter Prozess.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 hover:border-green-600/30 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-600/10 border border-green-600/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs text-green-400 font-semibold">{phase.step}</div>
                      <h3 className="font-bold text-lg">{phase.title}</h3>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{phase.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audit Checklist */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Audit Checklist â€“ Das erwartet Sie</h2>
            <p className="text-white/60">4 Bereiche, die Auditor*innen genau prÃ¼fen werden.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AUDIT_CHECKLIST.map((category, i) => (
              <div key={i} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-green-400 mb-4 text-lg">{category.category}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nach der Zertifizierung</h2>
            <p className="text-white/60">6 Vorteile Ihrer ISO 27001 Zertifizierung.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS_CERTIFIED.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex gap-4 bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                  <div className="w-10 h-10 bg-green-600/10 border border-green-600/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-white/60 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Findings */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Typische Audit-Findings & LÃ¶sungen</h2>
            <p className="text-white/60">Was Auditor*innen hÃ¤ufig finden â€“ und wie man es behebt.</p>
          </div>
          <div className="space-y-4">
            {COMMON_FINDINGS.map((finding, i) => (
              <div key={i} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{finding.name}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${finding.severity === "Critical" ? "bg-[#FF3B30]/20 text-[#FF3B30]" : "bg-orange-600/20 text-orange-400"}`}>
                    {finding.severity}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-2">
                  <span className="font-semibold text-white/70">LÃ¶sung:</span> {finding.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Banner */}
      <section className="py-10 bg-green-900/10 border-y border-green-800/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-7 h-7 text-green-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">ISO 27001 + NIS2 = VollstÃ¤ndige Compliance</h3>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Viele deutsche Unternehmen mÃ¼ssen 2025 NIS2 erfÃ¼llen. ISO 27001 ist der schnellste Weg â€“ 80% der NIS2 Anforderungen sind damit automatisch erfÃ¼llt.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">HÃ¤ufige Fragen zur ISO 27001 Zertifizierung</h2>
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

      {/* Pricing */}
      <section className="py-14 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">ISO 27001 Zertifizierungs-Kosten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Consulting & Impl.",
                price: "â‚¬5.000â€“â‚¬30.000",
                desc: "Gap Analysis, Richtlinien, Prozesse, Schulungen",
              },
              {
                title: "Erstzertifizierung",
                price: "â‚¬3.000â€“â‚¬8.000",
                desc: "Haupt-Audit der akkreditierten Zertifizierungsstelle",
              },
              {
                title: "JÃ¤hrliche Audits (3 Jahre)",
                price: "â‚¬1.500â€“â‚¬3.000",
                desc: "2 Surveillance Audits pro Jahr zur Aufrechterhaltung",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <div className="text-2xl font-bold text-green-400 mb-2">{item.price}</div>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm text-white/50">
            *Kosten variieren je nach UnternehmensgrÃ¶ÃŸe (Mitarbeiter, KomplexitÃ¤t, Infrastruktur)
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-green-900/20 via-[#0A0A0B] to-[#0A0A0B] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Starten Sie jetzt Ihre Zertifizierung!</h2>
          <p className="text-white/60 text-lg mb-8">
            Kostenlose Initialberatung Â· Roadmap in 48h Â· Zertifizierte Experten begleiten Sie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />{PHONE}
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-10 py-4 rounded-2xl font-semibold transition-colors">
              <Mail className="w-5 h-5" />{EMAIL}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            <Link href="/iso-27001" className="text-green-400 hover:text-green-300">ISO 27001 Info</Link>
            <Link href="/iso-27001-pentest-anforderungen" className="text-green-400 hover:text-green-300">Pentest & A.12.6</Link>
            <Link href="/penetration-testing" className="text-green-400 hover:text-green-300">Penetrationstest</Link>
            <Link href="/request-pentest" className="text-green-400 hover:text-green-300">Beratung buchen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
