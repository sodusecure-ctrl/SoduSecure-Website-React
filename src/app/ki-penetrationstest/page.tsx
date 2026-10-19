"use client";

import TrustedSources from '@/components/common/TrustedSources';
import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, AlertTriangle, MessageSquare, Database, Bot,
  FileText, Zap, Eye, Lock, Cpu, Workflow,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const ATTACK_TYPES = [
  {
    icon: MessageSquare,
    title: "Prompt Injection & Jailbreaks",
    desc: "Direkte und indirekte Prompt Injection: Kann ein Angreifer Ihr LLM dazu bringen, Regeln zu brechen, Daten preiszugeben oder Aktionen auszuführen? Das Top-Risiko der OWASP LLM Top 10.",
    color: "text-[#FF3B30] bg-[#FF3B30]/10 border-[#FF3B30]/20",
  },
  {
    icon: Database,
    title: "RAG-Sicherheit & Datenabfluss",
    desc: "Zugriffskontrolle in RAG-Systemen: Sehen Nutzer nur die Dokumente, die sie sehen dürfen? Wir testen Datenabfluss über Retrieval, Embeddings und vergiftete Wissensbasen.",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Bot,
    title: "KI-Agenten & Tool-Missbrauch",
    desc: "Agenten mit Tool-Zugriff (E-Mail, Datenbanken, APIs, Browser): Wir prüfen, ob sich Tools zweckentfremden lassen – von SSRF über Datenexfiltration bis zu ungewollten Aktionen.",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Eye,
    title: "System-Prompt- & Datenextraktion",
    desc: "Lassen sich Systemprompts, interne Anweisungen, API-Keys oder Trainings-/Kontextdaten aus dem Modell herauskitzeln? Wir testen gezielt auf Leakage.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Zap,
    title: "Missbrauch & Kosten-DoS",
    desc: "Unbegrenzte Abfragen, fehlendes Rate-Limiting, teure Modell-Loops: Wir prüfen, ob Angreifer Ihre KI-Anwendung als Gratis-API missbrauchen oder Ihre Kosten explodieren lassen können.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Workflow,
    title: "Integration & klassische Schwachstellen",
    desc: "Die KI ist nur ein Teil: Wir testen auch die Anwendung drumherum – Authentifizierung, APIs, Berechtigungen. Viele KI-Apps scheitern an klassischen Web-Schwachstellen.",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

const PROCESS = [
  { step: "01", title: "Scoping & Architektur", desc: "Welches Modell, welche Datenquellen, welche Tools? Wir verstehen Use-Case und Architektur Ihrer KI-Anwendung." },
  { step: "02", title: "Threat Modeling", desc: "Angriffsflächen-Analyse entlang der OWASP LLM Top 10 und MITRE ATLAS – priorisiert nach Ihrem Risiko." },
  { step: "03", title: "Manuelles Testing", desc: "Zertifizierte Pentester greifen Ihre KI an: adversariale Prompts, Injection-Ketten, Tool-Missbrauch, Datenabfluss." },
  { step: "04", title: "Exploit-Verifikation", desc: "Jeder Fund wird als nachvollziehbare Angriffskette dokumentiert – kein theoretisches Risiko, sondern belegter Impact." },
  { step: "05", title: "Bericht & Fix-Empfehlungen", desc: "Konkrete Gegenmaßnahmen: Prompt-Härtung, Berechtigungsmodell, Guardrails, Monitoring – umsetzbar für Ihr Team." },
  { step: "06", title: "Retest", desc: "Nach Ihren Fixes prüfen wir kostenlos nach, ob die Lücken wirklich geschlossen sind." },
];

const STATS = [
  { stat: "10/10", label: "OWASP LLM Top 10 Risiken werden vollständig geprüft" },
  { stat: "#1", label: "Prompt Injection ist das Top-Risiko für LLM-Anwendungen (OWASP)" },
  { stat: "100%", label: "manuelles Testing durch zertifizierte Pentester – kein reines Tooling" },
  { stat: "48h", label: "bis zum Festpreisangebot nach dem Erstgespräch" },
];

const FAQS = [
  {
    q: "Was ist ein KI-Penetrationstest?",
    a: "Ein KI-Penetrationstest prüft LLM-basierte Anwendungen – Chatbots, RAG-Systeme, KI-Agenten – gezielt auf KI-spezifische Schwachstellen wie Prompt Injection, Datenabfluss und Tool-Missbrauch, zusätzlich zur klassischen Anwendungssicherheit. Getestet wird manuell, entlang der OWASP LLM Top 10 und MITRE ATLAS.",
  },
  {
    q: "Wir nutzen ein Modell von OpenAI, Anthropic oder Google – brauchen wir trotzdem einen Test?",
    a: "Ja. Die Sicherheit des Basismodells ist Sache des Anbieters – aber Ihre Integration ist das eigentliche Risiko: Ihre Systemprompts, Ihre Datenanbindung, Ihre Tool-Berechtigungen, Ihre Zugriffskontrolle. Genau dort entstehen die ausnutzbaren Lücken, und genau das testen wir.",
  },
  {
    q: "Welche Systeme testet ihr?",
    a: "Kundenchatbots, interne Copilots, RAG-Systeme auf Dokumentenbasis, KI-Agenten mit Tool-Zugriff, LLM-APIs und -Wrapper sowie die umgebende Web-/Cloud-Infrastruktur. Modellunabhängig: OpenAI, Anthropic, Google, Mistral, Open-Source-Modelle und eigene Fine-Tunes.",
  },
  {
    q: "Was kostet ein KI-Penetrationstest?",
    a: "Ein fokussierter Test einer Chatbot- oder RAG-Anwendung beginnt ab 2.500 €. Komplexe Agenten-Systeme mit mehreren Tools und Datenquellen liegen typischerweise zwischen 4.500 € und 12.000 €. Festpreisangebot nach kurzem Scoping-Gespräch.",
  },
  {
    q: "Was hat der EU AI Act damit zu tun?",
    a: "Der EU AI Act verlangt für viele KI-Systeme Risikomanagement, Robustheit und Cybersicherheit. Ein dokumentierter KI-Penetrationstest ist ein starker Nachweis für die Cybersicherheitsanforderungen – ergänzend zu DSGVO Art. 32 und ISO 27001.",
  },
  {
    q: "Wie lange dauert der Test?",
    a: "Je nach Umfang 3 bis 10 Testtage. Ergebnis ist ein Bericht mit nachgestellten Angriffsketten, Risikobewertung und konkreten Fix-Empfehlungen – plus kostenlosem Retest nach der Behebung.",
  },
];

const COMPLIANCE_ITEMS = [
  { name: "OWASP LLM Top 10", desc: "Der De-facto-Standard für LLM-Sicherheit – vollständig abgedeckt." },
  { name: "EU AI Act", desc: "Nachweis für Robustheit und Cybersicherheit von KI-Systemen." },
  { name: "DSGVO", desc: "Art. 32: Sicherheit der Verarbeitung – auch bei KI-gestützter Datenverarbeitung." },
  { name: "MITRE ATLAS", desc: "Adversariale Taktiken gegen KI-Systeme als Test-Referenzrahmen." },
];

export default function KiPenetrationstestPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.07),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <Cpu className="w-4 h-4 text-[#FF3B30]" />
            <span className="text-[#FF3B30] text-sm font-medium">OWASP LLM Top 10 · MITRE ATLAS · EU AI Act</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            KI-Penetrationstest –<br />
            <span className="text-[#FF3B30]">LLMs & KI-Agenten absichern</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Chatbots, RAG-Systeme und KI-Agenten öffnen neue Angriffsflächen: Prompt Injection, Datenabfluss, Tool-Missbrauch. Wir greifen Ihre KI-Anwendung an, bevor es jemand anderes tut.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 premium-cta text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              KI-Pentest anfragen <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pentest" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Klassischer Pentest <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {STATS.map((s) => (
              <div key={s.stat + s.label} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#FF3B30]">{s.stat}</div>
                <div className="text-white/50 text-xs mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="py-10 bg-orange-900/10 border-b border-orange-800/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-orange-300 mb-1">Jede KI-Anwendung mit Datenzugriff ist ein Angriffsziel</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Sobald ein LLM auf Ihre Dokumente, Datenbanken oder Tools zugreift, kann ein Angreifer versuchen, genau diesen Zugriff zu kapern – oft mit nichts weiter als geschickt formuliertem Text. Klassische Firewalls und Scanner erkennen diese Angriffe nicht.
            </p>
          </div>
        </div>
      </section>

      {/* Attack types */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Was wir testen</h2>
            <p className="text-white/60 max-w-2xl mx-auto">KI-spezifische Angriffsvektoren plus die klassische Anwendungssicherheit drumherum – ein Test, der beides abdeckt.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ATTACK_TYPES.map((at) => {
              const Icon = at.icon;
              return (
                <div key={at.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 hover:border-white/15 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-2xl border mb-4 ${at.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{at.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{at.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ablauf des KI-Penetrationstests</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p) => (
              <div key={p.step} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                <div className="text-[#FF3B30] text-2xl font-bold mb-2">{p.step}</div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-14 bg-[#0A0A0B] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Standards & Rahmenwerke</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMPLIANCE_ITEMS.map((c) => (
              <div key={c.name} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-sm">{c.name}</span>
                  <span className="text-white/60 text-sm"> – {c.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Preise – KI-Penetrationstest</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Chatbot / LLM-App", price: "ab 2.500 €", desc: "Fokussierter Test einer LLM-Anwendung: Prompt Injection, Leakage, Missbrauch, Integration" },
              { name: "RAG-System", price: "ab 4.500 €", desc: "Zugriffskontrolle, Datenabfluss, Poisoning, Retrieval-Manipulation + Anwendungstest", featured: true },
              { name: "KI-Agenten", price: "individuell", desc: "Agenten mit Tool-Zugriff, Multi-Agent-Systeme, komplexe Architekturen – Scoping-Gespräch" },
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-xl p-5 border ${pkg.featured ? "bg-[#1a0a0a]/20 border-[#FF3B30]/40" : "bg-[#0A0A0B] border-white/10"}`}>
                {pkg.featured && <div className="text-yellow-400 text-xs font-semibold mb-2">⭐ Häufigster Fall</div>}
                <h3 className="font-bold mb-1">{pkg.name}</h3>
                <div className="text-xl font-bold text-[#FF3B30] mb-3">{pkg.price}</div>
                <p className="text-white/60 text-sm">{pkg.desc}</p>
                <Link href="/contact" className="mt-4 w-full inline-flex items-center justify-center premium-cta text-white px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors">
                  Anfragen
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0A0A0B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zum KI-Penetrationstest</h2>
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

      <TrustedSources
        title="KI-Sicherheit: Standards & Quellen"
        paragraphs={[
          'Die OWASP GenAI Security-Initiative führt Prompt Injection als Top-Risiko für LLM-Anwendungen. MITRE ATLAS dokumentiert reale adversariale Taktiken gegen KI-Systeme, und das BSI veröffentlicht Sicherheitsempfehlungen für generative KI-Modelle – unsere Tests orientieren sich an genau diesen Rahmenwerken.',
        ]}
        sources={[
          { label: 'OWASP Top 10 für LLM-Anwendungen', url: 'https://genai.owasp.org/' },
          { label: 'MITRE ATLAS', url: 'https://atlas.mitre.org/' },
          { label: 'BSI: Generative KI-Modelle', url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Kuenstliche-Intelligenz/kuenstliche-intelligenz_node.html' },
        ]}
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-red-900/20 via-[#0A0A0B] to-[#0A0A0B] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Lock className="w-14 h-14 text-[#FF3B30] mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Jetzt KI-Anwendung testen lassen</h2>
          <p className="text-white/60 text-lg mb-8">Kostenlose Erstberatung · Festpreisangebot in 48h · Kostenloser Retest</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 premium-cta text-white px-10 py-4 rounded-2xl font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />(+49) 01777750985
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-10 py-4 rounded-2xl font-semibold transition-colors">
              <Mail className="w-5 h-5" />info@sodusecure.com
            </a>
          </div>
          <p className="text-white/50 text-sm">
            Verwandte Seiten:{" "}
            <Link href="/pentest" className="text-[#FF3B30] hover:text-[#FF6B61]">Penetrationstest</Link>{" · "}
            <Link href="/services/api-security-testing" className="text-[#FF3B30] hover:text-[#FF6B61]">API Security</Link>{" · "}
            <Link href="/services/web-application-testing" className="text-[#FF3B30] hover:text-[#FF6B61]">Web-Pentest</Link>{" · "}
            <Link href="/red-team-assessment" className="text-[#FF3B30] hover:text-[#FF6B61]">Red Team</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
