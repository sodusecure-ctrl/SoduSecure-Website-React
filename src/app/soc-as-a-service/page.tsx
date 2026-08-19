"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, AlertTriangle, Activity, Bell, Clock,
  FileText, Radar, Siren, Server, BarChart3, Eye,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const SOC_SERVICES = [
  {
    icon: Radar,
    title: "SIEM & Log-Monitoring",
    desc: "Zentrale Sammlung und Korrelation Ihrer Logs: Server, Firewalls, Cloud, Microsoft 365. Verdächtige Muster werden erkannt, bevor daraus Vorfälle werden.",
    color: "text-[#FF3B30] bg-[#FF3B30]/10 border-[#FF3B30]/20",
  },
  {
    icon: Eye,
    title: "Endpoint Detection (EDR/XDR)",
    desc: "Moderne Endpoint-Sensorik auf Clients und Servern: Ransomware-Verhalten, Persistenz und laterale Bewegung werden in Echtzeit erkannt und gestoppt.",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Bell,
    title: "Alert-Triage durch Analysten",
    desc: "Kein Alarm-Rauschen: Unsere Analysten bewerten jeden Alert, filtern False Positives und eskalieren nur, was wirklich zählt – mit klarer Handlungsempfehlung.",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Siren,
    title: "Incident Response",
    desc: "Im Ernstfall zählt jede Minute: Eindämmung, Analyse und Wiederherstellung nach Plan – inklusive Unterstützung bei NIS2-Meldungen an das BSI.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Activity,
    title: "Threat Intelligence",
    desc: "Aktuelle Bedrohungslage, neue Angriffskampagnen und Indikatoren fließen laufend in Ihre Erkennungsregeln ein – abgestimmt auf Ihre Branche.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Server,
    title: "Schwachstellen-Monitoring",
    desc: "Ihre Angriffsfläche im Blick: Neue kritische Schwachstellen in Ihren Systemen werden erkannt und priorisiert gemeldet – integriert mit unserem Schwachstellenscan.",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

const PROCESS = [
  { step: "01", title: "Onboarding", desc: "Anbindung Ihrer Log-Quellen und Ausrollen der Endpoint-Sensorik – typischerweise in 2 bis 4 Wochen, ohne Betriebsunterbrechung." },
  { step: "02", title: "Baselining & Use-Cases", desc: "Was ist bei Ihnen normal? Wir kalibrieren Erkennungsregeln auf Ihre Umgebung und definieren Eskalationswege." },
  { step: "03", title: "24/7 Monitoring", desc: "Rund-um-die-Uhr-Überwachung Ihrer Systeme – auch nachts, am Wochenende und an Feiertagen, wenn Angreifer am liebsten zuschlagen." },
  { step: "04", title: "Triage & Eskalation", desc: "Analysten bewerten jeden Alert. Kritische Vorfälle werden sofort eskaliert – mit konkreter Empfehlung, nicht nur einer Alarmmeldung." },
  { step: "05", title: "Incident Response", desc: "Bei bestätigten Vorfällen: Eindämmung, forensische Analyse, Wiederanlauf – und Fristenwahrung bei Meldepflichten." },
  { step: "06", title: "Reporting & Verbesserung", desc: "Monatliche Reports mit Lagebild, Kennzahlen und Empfehlungen – Ihr Sicherheitsniveau steigt messbar über die Zeit." },
];

const STATS = [
  { stat: "24/7", label: "Überwachung – Angriffe passieren nachts und am Wochenende" },
  { stat: "24h", label: "NIS2-Frist für die Erstmeldung erheblicher Vorfälle an das BSI" },
  { stat: "<15 Min", label: "Reaktionszeit bei kritischen Alerts im vereinbarten SLA" },
  { stat: "0", label: "eigenes SOC-Team nötig – wir sind Ihr Security-Operations-Team" },
];

const FAQS = [
  {
    q: "Was ist SOC as a Service?",
    a: "Ein Security Operations Center (SOC) überwacht Ihre IT rund um die Uhr auf Angriffe und reagiert auf Vorfälle. Als Service heißt das: Sie bekommen Technologie (SIEM, EDR), Prozesse und erfahrene Analysten aus einer Hand – ohne ein eigenes Team aufbauen zu müssen, das im 24/7-Schichtbetrieb arbeitet.",
  },
  {
    q: "Brauchen KMU wirklich ein SOC?",
    a: "Angriffe treffen längst nicht mehr nur Konzerne – Ransomware-Gruppen zielen gezielt auf den Mittelstand, weil dort seltener jemand hinschaut. Ein eigenes SOC ist für KMU unwirtschaftlich (mindestens 5 Vollzeitstellen für 24/7); als Service ist derselbe Schutz zu einem Bruchteil der Kosten machbar.",
  },
  {
    q: "Was kostet SOC as a Service?",
    a: "Der Einstieg für KMU beginnt ab 990 € pro Monat, abhängig von Anzahl der Endpoints und Log-Quellen. Größere Umgebungen mit erweiterten SLAs liegen typischerweise zwischen 2.500 € und 8.000 € monatlich. Festpreisangebot nach kurzer Bestandsaufnahme.",
  },
  {
    q: "Hilft das SOC bei NIS2?",
    a: "Ja, zentral: NIS2 verlangt Detektions- und Bewältigungsfähigkeiten (Art. 21) und die Meldung erheblicher Vorfälle binnen 24 Stunden (Art. 23). Genau das leistet ein SOC – inklusive Unterstützung bei der fristgerechten Meldung und der Dokumentation für die Aufsicht.",
  },
  {
    q: "Was ist der Unterschied zwischen SOC und MDR?",
    a: "MDR (Managed Detection and Response) ist im Kern ein SOC-Service mit Fokus auf Endpoint-Erkennung und Reaktion. Unser SOC as a Service umfasst MDR und geht darüber hinaus: Log-Korrelation über die gesamte Infrastruktur, Schwachstellen-Monitoring und Compliance-Reporting.",
  },
  {
    q: "Wie lange dauert das Onboarding?",
    a: "Typischerweise 2 bis 4 Wochen: Log-Quellen anbinden, Endpoint-Agenten ausrollen, Baselining und Eskalationswege abstimmen. Danach läuft die Überwachung im Regelbetrieb.",
  },
];

const COMPLIANCE_ITEMS = [
  { name: "NIS2", desc: "Art. 21/23: Detektion, Bewältigung und 24h-Meldung erheblicher Vorfälle." },
  { name: "ISO 27001", desc: "A.8.16: Überwachung von Netzwerken und Systemen als Kernkontrolle." },
  { name: "DORA", desc: "IKT-Vorfallmanagement und Meldewesen für den Finanzsektor." },
  { name: "BSIG / KRITIS", desc: "Systeme zur Angriffserkennung (§ 8a Abs. 1a) für kritische Infrastrukturen." },
];

export default function SocAsAServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.07),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <Radar className="w-4 h-4 text-[#FF3B30]" />
            <span className="text-[#FF3B30] text-sm font-medium">24/7 Monitoring · NIS2-tauglich · Aus Deutschland</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            SOC as a Service –<br />
            <span className="text-[#FF3B30]">Ihr Security-Team, 24/7</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Security Operations Center ohne eigenes Team: Wir überwachen Ihre IT rund um die Uhr, bewerten jeden Alarm mit echten Analysten und reagieren, bevor aus einem Alert ein Ransomware-Vorfall wird.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 premium-cta text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              SOC-Beratung anfragen <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/schwachstellenscan" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Zum Schwachstellenscan <ArrowRight className="w-5 h-5" />
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
            <h3 className="font-bold text-orange-300 mb-1">Der Angriff beginnt, wenn niemand hinschaut</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Ransomware wird bevorzugt nachts und am Wochenende ausgelöst – dann, wenn kein Admin reagiert. Zwischen Erstzugriff und Verschlüsselung liegen oft nur Stunden. Wer erst am Montag merkt, was Freitagnacht passiert ist, verhandelt bereits mit Erpressern.
            </p>
          </div>
        </div>
      </section>

      {/* SOC services */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Was unser SOC leistet</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Technologie, Prozesse und Analysten aus einer Hand – abgestimmt auf Ihre Umgebung, ohne dass Sie ein eigenes Team aufbauen müssen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOC_SERVICES.map((sv) => {
              const Icon = sv.icon;
              return (
                <div key={sv.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 hover:border-white/15 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-2xl border mb-4 ${sv.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{sv.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{sv.desc}</p>
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
            <h2 className="text-3xl font-bold mb-4">So kommt Ihr Unternehmen ins SOC</h2>
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

      {/* What you get */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Was Sie erhalten</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Clock, title: "24/7-Überwachung mit SLA", desc: "Garantierte Reaktionszeiten bei kritischen Alerts – vertraglich zugesichert." },
              { icon: Bell, title: "Nur relevante Eskalationen", desc: "Analysten filtern das Alarm-Rauschen – Sie werden nur gestört, wenn es zählt." },
              { icon: Siren, title: "Incident-Response-Plan", desc: "Vorbereitete Playbooks für den Ernstfall – jeder weiß, was zu tun ist." },
              { icon: FileText, title: "NIS2-Meldeunterstützung", desc: "Fristgerechte Meldungen an das BSI mit vollständiger Vorfalldokumentation." },
              { icon: BarChart3, title: "Monatliches Lagebild", desc: "Kennzahlen, Vorfälle, Trends – aufbereitet für IT-Leitung und Geschäftsführung." },
              { icon: Shield, title: "Integration mit Pentest & Scan", desc: "Erkenntnisse aus Pentests und Schwachstellenscans fließen direkt in die Überwachung ein." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                  <div className="w-10 h-10 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#FF3B30]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-14 bg-[#0A0A0B] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">SOC für Compliance</h2>
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
          <h2 className="text-2xl font-bold text-center mb-8">Preise – SOC as a Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "KMU-Paket", price: "ab 990 € / Monat", desc: "EDR + Log-Monitoring für bis zu 50 Endpoints, Triage durch Analysten, monatliches Reporting" },
              { name: "Business", price: "ab 2.500 € / Monat", desc: "Erweiterte Log-Quellen (Cloud, M365), 24/7-SLA, Incident-Response-Playbooks, NIS2-Meldeunterstützung", featured: true },
              { name: "Enterprise", price: "individuell", desc: "Mehrere Standorte, KRITIS-Anforderungen, dedizierter Analyst, individuelle SLAs – Scoping-Gespräch" },
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-xl p-5 border ${pkg.featured ? "bg-[#1a0a0a]/20 border-[#FF3B30]/40" : "bg-[#0A0A0B] border-white/10"}`}>
                {pkg.featured && <div className="text-yellow-400 text-xs font-semibold mb-2">⭐ Empfohlen ab 50 Mitarbeitern</div>}
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
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zu SOC as a Service</h2>
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
      <section className="py-20 bg-gradient-to-br from-red-900/20 via-[#0A0A0B] to-[#0A0A0B] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Radar className="w-14 h-14 text-[#FF3B30] mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Jetzt SOC-Erstberatung vereinbaren</h2>
          <p className="text-white/60 text-lg mb-8">Kostenlose Bestandsaufnahme · Festpreisangebot in 48h · Onboarding in 2–4 Wochen</p>
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
            <Link href="/schwachstellenscan" className="text-[#FF3B30] hover:text-[#FF6B61]">Schwachstellenscan</Link>{" · "}
            <Link href="/pentest" className="text-[#FF3B30] hover:text-[#FF6B61]">Penetrationstest</Link>{" · "}
            <Link href="/nis2" className="text-[#FF3B30] hover:text-[#FF6B61]">NIS2</Link>{" · "}
            <Link href="/bsig" className="text-[#FF3B30] hover:text-[#FF6B61]">BSIG / KRITIS</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
