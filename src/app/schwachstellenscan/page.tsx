"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, AlertTriangle, Globe, Server, Cloud,
  FileText, Lock, Repeat, Search, BarChart3, ListChecks,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const SCAN_TYPES = [
  {
    icon: Globe,
    title: "Externer Schwachstellenscan",
    desc: "Ihre öffentlich erreichbaren Systeme aus Angreifersicht: exponierte Dienste, veraltete Software, Fehlkonfigurationen am Perimeter.",
    color: "text-[#FF3B30] bg-[#FF3B30]/10 border-[#FF3B30]/20",
  },
  {
    icon: Server,
    title: "Interner Schwachstellenscan",
    desc: "Scan des internen Netzwerks: ungepatchte Server, offene Freigaben, Legacy-Systeme – das, was ein Angreifer nach dem ersten Zugriff findet.",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Search,
    title: "Webanwendungs-Scan",
    desc: "Automatisierte Prüfung Ihrer Webanwendungen auf bekannte Schwachstellen, veraltete Komponenten und typische Konfigurationsfehler.",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud-Konfigurations-Scan",
    desc: "AWS, Azure & GCP: öffentliche Buckets, zu weite IAM-Rechte, unverschlüsselte Ressourcen und andere Cloud-Fehlkonfigurationen.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Lock,
    title: "Authentifizierter Scan",
    desc: "Scans mit Zugangsdaten erkennen deutlich mehr: fehlende Patches auf Betriebssystem- und Anwendungsebene, lokale Fehlkonfigurationen.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Repeat,
    title: "Wiederkehrender Scan-Rhythmus",
    desc: "Monatlich oder quartalsweise – mit Trendvergleich: Welche Lücken sind neu, welche wurden geschlossen, wo bleibt Risiko liegen?",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

const PROCESS = [
  { step: "01", title: "Setup & Scoping", desc: "Festlegung der Scan-Ziele (IP-Bereiche, Domains, Cloud-Accounts), Rhythmus und Zeitfenster – ohne Betriebsstörung." },
  { step: "02", title: "Baseline-Scan", desc: "Erster vollständiger Scan als Ausgangsbasis. Alle Systeme werden inventarisiert und geprüft." },
  { step: "03", title: "Manuelle Validierung", desc: "Zertifizierte Pentester prüfen jedes Ergebnis: False Positives fliegen raus, echte Risiken werden verifiziert." },
  { step: "04", title: "Priorisierter Bericht", desc: "Kein Rohbericht-Dump: priorisierte Maßnahmenliste nach tatsächlichem Risiko, verständlich für IT und Management." },
  { step: "05", title: "Re-Scan & Nachweis", desc: "Nach Ihren Fixes prüfen wir nach – dokumentierter Nachweis der Behebung für Audits und Compliance." },
  { step: "06", title: "Laufender Rhythmus", desc: "Monatliche oder quartalsweise Wiederholung mit Trend-Reporting – Schwachstellenmanagement als Prozess statt Einmalaktion." },
];

const STATS = [
  { stat: "60%", label: "der erfolgreichen Angriffe nutzen bekannte, ungepatchte Schwachstellen" },
  { stat: "25+", label: "neue Schwachstellen (CVEs) werden im Schnitt pro Tag veröffentlicht" },
  { stat: "0", label: "False-Positive-Rohberichte – jedes Ergebnis wird manuell validiert" },
  { stat: "48h", label: "bis zum priorisierten Ergebnisbericht nach Scan-Abschluss" },
];

const FAQS = [
  {
    q: "Was ist der Unterschied zwischen Schwachstellenscan und Pentest?",
    a: "Ein Schwachstellenscan prüft automatisiert und regelmäßig auf bekannte Schwachstellen – breit und wiederholbar. Ein Penetrationstest geht deutlich tiefer: Zertifizierte Pentester verketten Schwachstellen manuell zu echten Angriffspfaden und finden Logikfehler, die kein Scanner erkennt. Ideal ist die Kombination: regelmäßige Scans plus ein jährlicher Pentest.",
  },
  {
    q: "Wie oft sollte ein Schwachstellenscan durchgeführt werden?",
    a: "Empfohlen sind mindestens quartalsweise Scans, für exponierte Systeme monatlich. Standards wie ISO 27001 und NIS2 verlangen ein kontinuierliches Schwachstellenmanagement – ein einmaliger Scan reicht dafür nicht aus.",
  },
  {
    q: "Was kostet ein Schwachstellenscan?",
    a: "Ein einzelner externer Scan mit validiertem Bericht beginnt ab 490 €. Wiederkehrende Scans im Abo (quartalsweise, inkl. Re-Scans und Trend-Reporting) ab 990 € pro Quartal. Der genaue Preis hängt von der Anzahl der Systeme ab – Festpreisangebot in 24h.",
  },
  {
    q: "Erzeugt der Scan Ausfälle oder Störungen?",
    a: "Nein. Wir verwenden produktionssichere Scan-Profile und stimmen Zeitfenster mit Ihnen ab. Aggressive Tests, die Systeme stören könnten, gehören in einen Pentest mit explizitem Scope – nicht in einen regelmäßigen Scan.",
  },
  {
    q: "Bekomme ich nur einen Rohbericht aus dem Scanner?",
    a: "Nein – das ist der zentrale Unterschied zu reinen Scan-Tools: Unsere Pentester validieren jedes Ergebnis, entfernen False Positives und priorisieren nach echtem Risiko für Ihr Unternehmen. Sie erhalten eine umsetzbare Maßnahmenliste, keinen 300-Seiten-Export.",
  },
  {
    q: "Zählt der Schwachstellenscan als Nachweis für ISO 27001 oder NIS2?",
    a: "Ja. Regelmäßige, dokumentierte Schwachstellenscans mit nachverfolgter Behebung sind ein anerkannter Baustein des technischen Schwachstellenmanagements nach ISO 27001 (A.8.8) und der Risikomaßnahmen nach NIS2 Art. 21.",
  },
];

const COMPLIANCE_ITEMS = [
  { name: "ISO 27001", desc: "A.8.8: Management technischer Schwachstellen – regelmäßige Scans als Kernnachweis." },
  { name: "NIS2", desc: "Art. 21: Risikomanagement inkl. Schwachstellenmanagement und Behebungsprozess." },
  { name: "DSGVO", desc: "Art. 32: Verfahren zur regelmäßigen Überprüfung der technischen Maßnahmen." },
  { name: "BSI IT-Grundschutz", desc: "OPS.1.1.3: Patch- und Änderungsmanagement auf Basis erkannter Schwachstellen." },
];

export default function SchwachstellenscanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.07),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <Repeat className="w-4 h-4 text-[#FF3B30]" />
            <span className="text-[#FF3B30] text-sm font-medium">Regelmäßig · Validiert · NIS2-tauglich</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Schwachstellenscan<br />
            <span className="text-[#FF3B30]">als Service</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Regelmäßige automatisierte Schwachstellen-Prüfung Ihrer Systeme – jedes Ergebnis von zertifizierten Pentestern validiert und nach echtem Risiko priorisiert. Kein Rohbericht-Dump.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 premium-cta text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Schwachstellenscan anfragen <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pentest" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Zum Penetrationstest <ArrowRight className="w-5 h-5" />
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

      {/* Abgrenzung Scan vs. Pentest */}
      <section className="py-10 bg-orange-900/10 border-b border-orange-800/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-orange-300 mb-1">Ein Scan ersetzt keinen Pentest – und umgekehrt</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Der Schwachstellenscan findet bekannte Lücken – breit, regelmäßig und günstig. Logikfehler, verkettete Angriffspfade und Berechtigungsprobleme findet nur ein manueller{" "}
              <Link href="/pentest" className="text-[#FF3B30] hover:text-[#FF6B61]">Penetrationstest</Link>. Die wirksamste Strategie kombiniert beides.
            </p>
          </div>
        </div>
      </section>

      {/* Scan types */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Was wir scannen</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Vom Internet-Perimeter bis zur Cloud-Konfiguration – ein Scan-Programm, das zu Ihrer Umgebung passt.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCAN_TYPES.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 hover:border-white/15 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-2xl border mb-4 ${st.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{st.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{st.desc}</p>
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
            <h2 className="text-3xl font-bold mb-4">So läuft der Schwachstellenscan ab</h2>
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
              { icon: ListChecks, title: "Priorisierte Maßnahmenliste", desc: "Sortiert nach echtem Risiko für Ihr Unternehmen – nicht nach CVSS-Rohwert." },
              { icon: CheckCircle, title: "Validierte Ergebnisse", desc: "Jedes Finding wird von Pentestern geprüft – keine False-Positive-Flut." },
              { icon: BarChart3, title: "Trend-Reporting", desc: "Vergleich über die Scan-Zyklen: neue Lücken, geschlossene Lücken, offene Risiken." },
              { icon: FileText, title: "Management-Summary", desc: "Verständliche Zusammenfassung für Geschäftsführung und IT-Leitung." },
              { icon: Repeat, title: "Re-Scan nach Behebung", desc: "Dokumentierter Nachweis, dass gemeldete Schwachstellen wirklich geschlossen sind." },
              { icon: Shield, title: "Compliance-Nachweis", desc: "Auditfähige Dokumentation für ISO 27001 (A.8.8), NIS2 und BSI IT-Grundschutz." },
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
          <h2 className="text-2xl font-bold text-center mb-8">Schwachstellenscan für Compliance</h2>
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
          <h2 className="text-2xl font-bold text-center mb-8">Preise – Schwachstellenscan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Einzelscan", price: "ab 490 €", desc: "1 externer Scan, bis 16 IPs/Domains, validierter Bericht mit Priorisierung" },
              { name: "Quartals-Abo", price: "ab 990 € / Quartal", desc: "Wiederkehrende Scans, Re-Scans nach Behebung, Trend-Reporting, Compliance-Nachweis", featured: true },
              { name: "Enterprise", price: "individuell", desc: "Interne + externe Scans, Cloud-Konfiguration, monatlicher Rhythmus, eigener Ansprechpartner" },
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-xl p-5 border ${pkg.featured ? "bg-[#1a0a0a]/20 border-[#FF3B30]/40" : "bg-[#0A0A0B] border-white/10"}`}>
                {pkg.featured && <div className="text-yellow-400 text-xs font-semibold mb-2">⭐ Empfohlen für KMU</div>}
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
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zum Schwachstellenscan</h2>
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
          <Shield className="w-14 h-14 text-[#FF3B30] mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Jetzt Schwachstellenscan starten</h2>
          <p className="text-white/60 text-lg mb-8">Kostenlose Erstberatung · Festpreisangebot in 24h · Ohne Betriebsstörung</p>
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
            <Link href="/schwachstellenanalyse" className="text-[#FF3B30] hover:text-[#FF6B61]">Schwachstellenanalyse</Link>{" · "}
            <Link href="/services/vulnerability-assessment" className="text-[#FF3B30] hover:text-[#FF6B61]">Vulnerability Assessment</Link>{" · "}
            <Link href="/soc-as-a-service" className="text-[#FF3B30] hover:text-[#FF6B61]">SOC as a Service</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
