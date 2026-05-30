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
  AlertTriangle,
  Users,
  Zap,
  Lock,
  BookOpen,
  TrendingUp,
  Command,
  Briefcase,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const PHONE = "(+49) 01777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";
const EMAIL = "info@sodusecure.com";

const RTA_PHASES = [
  {
    step: "Phase 1",
    title: "Reconnaissance & OSINT",
    desc: "Passive AufklÃ¤rung: Public Information sammeln, OSINT-Datenbanken durchsuchen, Mitarbeiter profilen.",
  },
  {
    step: "Phase 2",
    title: "Initial Access",
    desc: "Realistische Entry-Points: Phishing-Kampagne, Watering Hole, VPN-Zugang kompromittieren.",
  },
  {
    step: "Phase 3",
    title: "Persistence & Lateral Movement",
    desc: "Nach erfolgreicher Access: Im System bleiben, Seitenwechsel zu anderen Systemen, Privilege Escalation.",
  },
  {
    step: "Phase 4",
    title: "Data Exfiltration & Damage",
    desc: "Ziel-System erreicht: Kritische Daten exfiltrieren, Business Impact simulieren.",
  },
  {
    step: "Phase 5",
    title: "Clean Up & Reporting",
    desc: "Tracks verwischen, Backdoors entfernen. Umfassendes Report: Was hÃ¤tte ein echter Hacker getan?",
  },
];

const SCENARIOS = [
  {
    name: "Phishing + Malware Deployment",
    desc: "Realistische Phishing-E-Mails an Mitarbeiter. Wer klickt? Malware wird deployt.",
  },
  {
    name: "Supply Chain Attack",
    desc: "Angriff Ã¼ber Third-Party: Vendor-Software kompromittieren, um ins Unternehmen zu kommen.",
  },
  {
    name: "VPN / Remote Access",
    desc: "Gestohlene Credentials (Darkweb-Kauf simuliert) zur VPN-Penetration.",
  },
  {
    name: "Physical Access Simulation",
    desc: "Physischer Zutritt: USB-Stick im Parkplatz, Office-Zugang, Badge-Cloning.",
  },
  {
    name: "Social Engineering",
    desc: "Mit Pretexting Mitarbeiter dazu bringen, PasswÃ¶rter oder ZugÃ¤nge zu verraten.",
  },
  {
    name: "Multi-Stage Attack",
    desc: "Kombinierte Angriffsvektoren: Initial Access â†’ Privilege Escalation â†’ Data Theft.",
  },
];

const RTA_VS_PENTEST = [
  {
    aspect: "Scope",
    rta: "Ganz-Organisation: Technisch + Social + Physisch",
    pentest: "Meist nur technisch (Web, Netzwerk, API)",
  },
  {
    aspect: "Zeitraum",
    rta: "Wochen bis Monate â€“ kontinuierliche Kampagne",
    pentest: "Tage bis 2 Wochen konzentriert",
  },
  {
    aspect: "Social Engineering",
    rta: "Zentral â€“ Phishing, Pretexting, Manipulation",
    pentest: "Optional â€“ meist nur technisch",
  },
  {
    aspect: "Ziel",
    rta: "Mission erfÃ¼llen (Daten stehlen, System lahmlegen)",
    pentest: "Schwachstellen finden & demonstrieren",
  },
  {
    aspect: "Realismus",
    rta: "Sehr realistisch â€“ wie echte Cyberkriminelle",
    pentest: "Auch realistisch, aber begrenzte Scope",
  },
  {
    aspect: "Kosten",
    rta: "â‚¬15.000â€“â‚¬50.000+ (zeitaufwendig)",
    pentest: "â‚¬3.000â€“â‚¬15.000 (schneller)",
  },
];

const BENEFITS = [
  {
    icon: Target,
    title: "Realistisches Szenario",
    desc: "Nicht: 'Was kann ein Hacker machen?' Sondern: 'Was wÃ¼rde ein echter Hacker machen â€“ und kommen wir dagegen an?'",
  },
  {
    icon: AlertTriangle,
    title: "Ganzheitliche Sicherheit",
    desc: "Nicht nur Technologie, sondern auch Prozesse, Menschen, physische Sicherheit â€“ alles wird geprÃ¼ft.",
  },
  {
    icon: Users,
    title: "Awareness-Verbesserung",
    desc: "Mitarbeiter lernen durch echte (aber sichere) Phishing-Kampagnen. Security-Kultur steigt.",
  },
  {
    icon: Lock,
    title: "Detection & Response testen",
    desc: "Wie lange brauchen Ihre SOC/Security-Teams, um den Angriff zu erkennen und zu stoppen?",
  },
  {
    icon: TrendingUp,
    title: "Board-Level Evidence",
    desc: "Red Team Report ist Beweis fÃ¼r GeschÃ¤ftsfÃ¼hrung: 'Das ist, was wir beheben mÃ¼ssen.'",
  },
  {
    icon: Zap,
    title: "True Business Impact",
    desc: "Nicht abstraktes Risiko, sondern: 'Hacker hÃ¤tte Kundendaten fÃ¼r 48h stehlen kÃ¶nnen.'",
  },
];

const SUCCESS_RATES = [
  { area: "Initial Access (Phishing/VPN)", rate: 70 },
  { area: "Persistence (Backdoors etablieren)", rate: 60 },
  { area: "Privilege Escalation", rate: 55 },
  { area: "Lateral Movement", rate: 50 },
  { area: "Data Exfiltration", rate: 40 },
];

const FAQS = [
  {
    q: "Ist Red Team Assessment dasselbe wie Pentest?",
    a: "Nein. Pentest: Technische Tests, kurzer Zeitraum. Red Team: Ganzheitlich, Wochen/Monate, realistisches Szenario. RTA ist die erweiterte, realistischere Version.",
  },
  {
    q: "KÃ¶nnen Sie auch Phishing durchfÃ¼hren?",
    a: "Ja â€“ aber nur mit schriftlicher Genehmigung von der GeschÃ¤ftsfÃ¼hrung. Realistische Phishing-E-Mails sind Teil von RTA. Mitarbeiter werden aufgeklÃ¤rt, dass es ein Test war.",
  },
  {
    q: "Wie wird sichergestellt, dass niemand Schaden nimmt?",
    a: "StÃ¤ndige Kommunikation mit Incident Response Team. Wenn kritische Systeme erreicht: sofort stoppen & dokumentieren. RTA ist kontrolliert â€“ nicht unkontrolliert.",
  },
  {
    q: "Was kostet ein Red Team Assessment?",
    a: "â‚¬15.000â€“â‚¬50.000+, abhÃ¤ngig von Dauer (1 Woche bis 3 Monate) und KomplexitÃ¤t. Je realistischer & umfassender, desto teurer.",
  },
  {
    q: "Wann brauche ich Red Team Assessment statt Pentest?",
    a: "Wenn: (1) Sie eine kritische Infrastruktur sind, (2) Sie hohe Sicherheit brauchen (Finanzen, Defense), (3) Sie echte Attacken simulieren wollen.",
  },
  {
    q: "Kann ein Red Team Assessment die physische Sicherheit testen?",
    a: "Ja â€“ z.B. USB-Sticks im Parkplatz, tailgating ins BÃ¼ro, MÃ¼ll-Analyse (Dumpster Diving). Alles mit vorheriger Genehmigung.",
  },
];

export default function RedTeamAssessmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 rounded-full px-4 py-1.5 mb-6">
            <Command className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Red Team Assessment Â· Realistisches Szenario Â· Enterprise Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Red Team Assessment â€“<br />
            <span className="text-purple-500">Wie weit kommt ein echter Hacker?</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Multi-phasige, realistische Angriffssimulation. Von OSINT Ã¼ber Initial Access bis Datenraub. Wie lange braucht Ihre Security-Team, um den Angriff zu stoppen? Enterprise Red Team Testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/request-pentest" className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Red Team Consulting
            </Link>
            <Link href="/penetration-testing" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Pentest Ãœbersicht <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Trust bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[["50+", "Red Team Ops durchgefÃ¼hrt"], ["MITRE ATT&CK", "Based Methodology"], ["100%", "Realistisch"], ["Executive Ready", "Reports & Brief"]].map(([stat, label]) => (
              <div key={stat} className="bg-[#0A0A0B] border border-white/10 rounded-xl py-3 px-2 text-center">
                <div className="text-xl font-bold text-purple-400">{stat}</div>
                <div className="text-white/50 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was ist RTA? */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Was ist Red Team Assessment?</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Die realistischste Form von Sicherheitstesting.</p>
          </div>
          <div className="bg-purple-600/10 border border-purple-600/20 rounded-xl p-8">
            <p className="text-lg text-white/70 leading-relaxed">
              Ein Red Team Assessment simuliert einen realistischen, mehrstufigen Cyber-Angriff Ã¼ber Wochen oder Monate. Das Red Team (externe Sicherheitsexperten) handelt wie echte Cyberkriminelle â€“ mit dem Ziel, tief in Ihre Organisation einzudringen und kritische Daten zu exfiltrieren. Anders als Pentests: Ziel ist nicht nur Schwachstellen zu finden, sondern einen <strong>kompletten Angriffsablauf</strong> zu demonstrieren.
            </p>
          </div>
        </div>
      </section>

      {/* RTA Phasen */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">5 Phasen eines Red Team Assessment</h2>
            <p className="text-white/60">Von OSINT bis Exfiltration.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {RTA_PHASES.map((phase) => (
              <div key={phase.step} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                <div className="text-purple-500 text-sm font-bold mb-2">{phase.step}</div>
                <h3 className="font-semibold mb-2">{phase.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RTA vs Pentest */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Red Team vs Pentest</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Die Unterschiede auf einen Blick.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left font-semibold text-purple-400">Aspekt</th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-400">Red Team Assessment</th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-400">Penetrationstest</th>
                </tr>
              </thead>
              <tbody>
                {RTA_VS_PENTEST.map((row, i) => (
                  <tr key={i} className="border-b border-white/10 bg-[#0A0A0B] hover:bg-white/5">
                    <td className="px-4 py-3 font-semibold text-purple-400">{row.aspect}</td>
                    <td className="px-4 py-3 text-white/70">{row.rta}</td>
                    <td className="px-4 py-3 text-white/70">{row.pentest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Szenarien */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Typische Red Team Szenarien</h2>
            <p className="text-white/60">Realistisch Angriffsvektoren, die wir simulieren.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCENARIOS.map((scenario, i) => (
              <div key={i} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-2 mb-2">
                  <Target className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold">{scenario.name}</h3>
                </div>
                <p className="text-white/60 text-sm">{scenario.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vorteile eines Red Team Assessment</h2>
            <p className="text-white/60">Warum Unternehmen RTA durchfÃ¼hren sollten.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex gap-4 bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                  <div className="w-10 h-10 bg-purple-600/10 border border-purple-600/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-purple-400" />
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

      {/* Success Rates */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Typische Success Rates</h2>
            <p className="text-white/60">Durchschnitt Ã¼ber 50+ Red Team Assessments.</p>
          </div>
          <div className="space-y-4">
            {SUCCESS_RATES.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{item.area}</span>
                  <span className="text-purple-400 font-bold">{item.rate}%</span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Banner */}
      <section className="py-10 bg-purple-900/10 border-y border-purple-800/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-7 h-7 text-purple-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Red Team fÃ¼r Enterprise-Sicherheit</h3>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Wenn Sie kritische Infrastruktur schÃ¼tzen, hochsensible Daten haben oder reguliert sind: Red Team Assessment ist die umfassendste Simulation echter Angriffe.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">HÃ¤ufige Fragen zu Red Team Assessment</h2>
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
          <h2 className="text-2xl font-bold text-center mb-8">Red Team Assessment â€“ Kosten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[["2-Wochen Engagement", "â‚¬15.000â€“â‚¬25.000"], ["1-Monat Engagement", "â‚¬25.000â€“â‚¬40.000"], ["3-Monate Engagement", "â‚¬40.000â€“â‚¬75.000+"]].map(([type, price]) => (
              <div key={type} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-sm text-white/60 mb-2">{type}</div>
                <div className="font-bold text-purple-400 text-lg">{price}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm text-white/50">
            *Custom-Preise fÃ¼r lÃ¤ngere oder spezialisierte Engagements
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-900/20 via-[#0A0A0B] to-[#0A0A0B] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Command className="w-14 h-14 text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Red Team Assessment â€“ Buchen Sie ein Konsult</h2>
          <p className="text-white/60 text-lg mb-8">
            Realistische Angriffssimulation Â· MITRE ATT&CK-basiert Â· Executive Reporting Â· Multi-Phasen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />{PHONE}
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-10 py-4 rounded-2xl font-semibold transition-colors">
              <Mail className="w-5 h-5" />{EMAIL}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            <Link href="/penetration-testing" className="text-purple-400 hover:text-purple-300">Pentest Info</Link>
            <Link href="/cybersecurity-firma" className="text-purple-400 hover:text-purple-300">Services</Link>
            <Link href="/iso-27001" className="text-purple-400 hover:text-purple-300">ISO 27001</Link>
            <Link href="/request-pentest" className="text-purple-400 hover:text-purple-300">Beratung buchen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
