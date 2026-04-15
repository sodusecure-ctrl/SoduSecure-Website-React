"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, Target, Eye, Zap, Network, Globe, Lock,
  AlertTriangle, FileText, Users, Swords, Radio, Layers,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const ATTACK_PHASES = [
  { icon: Eye, title: "Reconnaissance", desc: "OSINT, passive & aktive Aufklärung. Wir sammeln alle öffentlich verfügbaren Informationen über Ihre Organisation – genau wie ein echter Angreifer.", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { icon: Globe, title: "Initial Access", desc: "Phishing-Kampagnen, öffentliche Schwachstellen, Supply-Chain-Angriffe – wir testen alle relevanten Zugangswege.", color: "text-red-400 bg-red-500/10 border-red-500/20" },
  { icon: Network, title: "Lateral Movement", desc: "Nach dem ersten Zugang: Wie weit kommt ein Angreifer im Netzwerk? Pass-the-Hash, Kerberoasting, Pivoting durch Segmente.", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { icon: Target, title: "Privilege Escalation", desc: "Root auf Linux, Domain Admin auf Windows, IAM Privilege Escalation in der Cloud – wir testen, ob kritische Ressourcen erreichbar sind.", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { icon: Lock, title: "Persistence & Evasion", desc: "Backdoors, geplante Tasks, Registry-Manipulation und AV/EDR-Evasion – wie lange bleibt ein Angreifer unentdeckt?", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { icon: Layers, title: "Impact Assessment", desc: "Simulation des maximal möglichen Schadens: Datenzugriff, Ransomware-Simulation, Exfiltrations-Test.", color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
];

const DIFFERENTIATORS = [
  { icon: Swords, title: "MITRE ATT&CK Framework", desc: "Alle Angriffstechniken werden gegen das MITRE ATT&CK Framework gemappt – klare Sichtbarkeit welche Taktiken Ihre Verteidigung erkennt und welche nicht." },
  { icon: Radio, title: "Purple Team Option", desc: "Optionales Purple-Team-Format: Red Team und Blue Team arbeiten gemeinsam – maximales Lernpotenzial für Ihr Security-Team." },
  { icon: Users, title: "Dediziertes Red Team", desc: "Festes 3-köpfiges Red Team – keine wechselnden Freelancer. Tiefes Verständnis Ihrer Umgebung über die gesamte Angriffsdauer." },
  { icon: FileText, title: "TLPT-konformer Bericht", desc: "Threat-Led Penetration Testing konformer Bericht für DORA-regulierte Unternehmen (Finanzsektor) und NIS2-Highscore-Assessment." },
];

const RED_VS_PENTEST = [
  { aspect: "Ziel", pentest: "Schwachstellen finden", red: "Reale Angriffsfähigkeit messen" },
  { aspect: "Zeitraum", pentest: "Tage bis 2 Wochen", red: "2 Wochen bis 3 Monate" },
  { aspect: "Wissen vom Blue Team", pentest: "Oft bekannt", red: "Unbekannt (full adversarial)" },
  { aspect: "MITRE ATT&CK", pentest: "Teilweise", red: "Vollständig gemappt" },
  { aspect: "Preis", pentest: "ab 1.500 €", red: "ab 8.000 €" },
  { aspect: "Ideal für", pentest: "Compliance, konkrete Systeme", red: "Enterprise, kritische Infrastruktur, DORA/NIS2" },
];

const COMPLIANCE_ITEMS = [
  { name: "DORA (Digital Operational Resilience Act)", desc: "TLPT (Threat-Led Penetration Testing) ist für betroffene Finanzunternehmen ab 2025 Pflicht. SODU Secure liefert TLPT-konforme Berichte." },
  { name: "NIS2 Richtlinie", desc: "Art. 21 NIS2: Hochsicherheits-Einrichtungen benötigen fortgeschrittene Sicherheitstests. Red Team Assessments sind der anerkannte Nachweis." },
  { name: "ISO 27001", desc: "Red Team Assessments decken A.8.8 (Vulnerability Management) und A.5.7 (Threat Intelligence) vollständig ab." },
  { name: "TIBER-EU Framework", desc: "Das europäische TIBER-EU Framework für kritische Finanzinfrastrukturen basiert auf Red Team Methodology." },
];

const FAQS = [
  {
    q: "Was ist ein Red Team Assessment?",
    a: "Ein Red Team Assessment ist eine vollständige, realistische Simulation eines gezielten Cyberangriffs gegen Ihre Organisation durch ein dediziertes Angreifer-Team (Red Team). Anders als ein Penetrationstest ist der Umfang nicht auf einzelne Systeme begrenzt – das Red Team nutzt alle verfügbaren Angriffsmethoden: technische, soziale und physische. Das Ziel ist nicht nur Schwachstellen zu finden, sondern zu zeigen, wie weit ein echter Angreifer in Ihrer Organisation kommt.",
  },
  {
    q: "Wer braucht ein Red Team Assessment?",
    a: "Red Team Assessments sind für Unternehmen mit höherem Sicherheitsreifegrad geeignet: wenn bereits Pentests durchgeführt wurden, ein SOC vorhanden ist, oder regulatorische Anforderungen (DORA, NIS2, TIBER-EU) advanced testing erfordern. Für kleinere Unternehmen ohne eigenes Security-Team empfehlen wir zuerst einen Pentest.",
  },
  {
    q: "Was ist der Unterschied zwischen Red Team und Pentest?",
    a: "Ein Pentest prüft spezifische Systeme auf Schwachstellen in einem definierten Zeitfenster. Ein Red Team Assessment simuliert einen langfristigen, zielgerichteten Angriff gegen die gesamte Organisation – inklusive Social Engineering, physische Versuche und Evasion vor Detection-Systemen. Der Blue Team weiß beim Red Team meist nicht, wann der Angriff stattfindet.",
  },
  {
    q: "Wie lange dauert ein Red Team Assessment?",
    a: "Typischerweise 4–12 Wochen, je nach Scope. Die Planungsphase dauert 1–2 Wochen, die aktive Angriffsphase 2–8 Wochen, danach Berichterstellung und Präsentation.",
  },
  {
    q: "Was kostet ein Red Team Assessment?",
    a: "Red Team Assessments beginnen bei 8.000 € für kleinere Scopes (SME) und reichen bis 50.000 € für vollständige Enterprise-Assessments mit mehreren Angriffsvektoren. Nach einem NDI-gesicherten Scoping-Gespräch erhalten Sie ein detailliertes Festpreisangebot.",
  },
  {
    q: "Was ist DORA TLPT und brauche ich das?",
    a: "TLPT (Threat-Led Penetration Testing) ist eine Anforderung des Digital Operational Resilience Act (DORA) für Finanzunternehmen ab 2025. SODU Secure führt TLPT-konforme Red Team Assessments mit entsprechender Dokumentation durch.",
  },
];

export default function RedTeamAssessmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a0d0d] via-[#0d1117] to-[#131927] py-20 lg:py-32 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.1),transparent_45%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-6">
            <Target className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">MITRE ATT&CK · DORA · NIS2 · TIBER-EU</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Red Team Assessment –<br />
            <span className="text-red-500">Realistische Angriffssimulation</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Dediziertes Red Team simuliert realistische, langfristige Angriffe gegen Ihre gesamte Organisation. MITRE ATT&CK-Framework, Full-Adversarial-Simulation – wissen Sie wirklich, wie weit ein Angreifer kommt?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Red Team anfragen
            </a>
            <Link href="/pentest" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-base">
              Zum Pentest <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[["MITRE", "ATT&CK Coverage"], ["DORA", "TLPT-konform"], ["4–12 Wo.", "Assessment-Dauer"], ["ab 8.000 €", "Festpreis"]].map(([stat, label]) => (
              <div key={stat} className="bg-[#131927] border border-gray-800 rounded-xl py-3 px-2 text-center">
                <div className="text-lg font-bold text-red-400">{stat}</div>
                <div className="text-gray-500 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DORA Banner */}
      <section className="py-8 bg-orange-900/10 border-b border-orange-800/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-orange-300">DORA tritt in Kraft:</strong>{" "}
            Ab 2025 sind Finanzunternehmen unter DORA verpflichtet, regelmäßige TLPT-konforme Red Team Assessments durchzuführen. Auch NIS2-KRITIS-Betreiber benötigen für Hochsicherheits-Zertifizierungen Red Team-Nachweise.
          </p>
        </div>
      </section>

      {/* Attack Phases */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Angriffsphasen – wie ein echtes Red Team vorgeht</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Angelehnt an MITRE ATT&CK Tactics und realistische APT-Gruppen-Methodik.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ATTACK_PHASES.map((phase) => {
              const Icon = phase.icon;
              return (
                <div key={phase.title} className="bg-[#131927] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-lg border mb-4 ${phase.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{phase.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{phase.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 bg-[#0a0e17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Was unser Red Team ausmacht</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DIFFERENTIATORS.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="flex gap-4 bg-[#131927] border border-gray-800 rounded-xl p-5">
                  <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{d.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Red Team vs Pentest */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Red Team vs. Penetrationstest</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 text-sm font-semibold">Merkmal</th>
                  <th className="text-left py-3 px-4 text-blue-400 text-sm font-semibold">Penetrationstest</th>
                  <th className="text-left py-3 px-4 text-red-400 text-sm font-semibold">Red Team Assessment</th>
                </tr>
              </thead>
              <tbody>
                {RED_VS_PENTEST.map((row, i) => (
                  <tr key={row.aspect} className={`border-b border-gray-800 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                    <td className="py-3 px-4 text-gray-400 text-sm font-medium">{row.aspect}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{row.pentest}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{row.red}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-14 bg-[#0a0e17] border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Red Team für Compliance & Regulatorik</h2>
          <div className="space-y-3">
            {COMPLIANCE_ITEMS.map((c) => (
              <div key={c.name} className="bg-[#131927] border border-gray-800 rounded-xl p-5 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm mb-1">{c.name}</div>
                  <div className="text-gray-400 text-sm">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zum Red Team</h2>
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-red-900/25 via-[#0d1117] to-[#0d1117] border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Target className="w-14 h-14 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Red Team Assessment anfragen</h2>
          <p className="text-gray-400 text-lg mb-8">
            Vertrauliches Erstgespräch unter NDA · Festpreisangebot · MITRE ATT&CK & DORA-konform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />(+49) 01777750985
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-10 py-4 rounded-lg font-semibold transition-colors">
              <Mail className="w-5 h-5" />info@sodusecure.com
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            <Link href="/pentest" className="text-red-400 hover:text-red-300">Pentest</Link>{" · "}
            <Link href="/vulnerability-assessment" className="text-red-400 hover:text-red-300">Vulnerability Assessment</Link>{" · "}
            <Link href="/phishing-simulation" className="text-red-400 hover:text-red-300">Phishing Simulation</Link>{" · "}
            <Link href="/cyber-security-check" className="text-red-400 hover:text-red-300">Cyber Security Check</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
