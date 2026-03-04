"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, Mail as MailIcon, AlertTriangle, Users, BarChart3,
  FileText, Target, Zap, BookOpen, Eye, TrendingUp, Lock,
} from "lucide-react";

const PHONE_HREF = "tel:+4917923962949";
const EMAIL_HREF = "mailto:sodusecure@gmail.com";

const SIMULATION_TYPES = [
  {
    icon: MailIcon,
    title: "E-Mail Phishing",
    desc: "Täuschend echte Phishing-E-Mails – CEO-Fraud, gefälschte IT-Abteilung, Fake-Login-Pages. Der häufigste Angriffsvektor.",
    color: "text-red-400 bg-red-500/10 border-red-500/20",
  },
  {
    icon: Target,
    title: "Spear Phishing",
    desc: "Personalisierte Angriffe mit echten Namen, Positionen und Unternehmenskontext. Deutlich höhere Erfolgsquote als generische Phishing-Mails.",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Zap,
    title: "Smishing (SMS)",
    desc: "Phishing per SMS: gefälschte Paketzustellungen, Bank-Alerts, MFA-Bypass-Versuche über das Mobilgerät.",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Phone,
    title: "Vishing (Voice)",
    desc: "Telefonbasierte Social-Engineering-Angriffe: Fake-IT-Support, gefälschte Behördenanrufe, CEO-Fraud per Telefon.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Eye,
    title: "QR-Code Phishing",
    desc: "QRishing: manipulierte QR-Codes in E-Mails oder physisch im Büro führen zu Fake-Login-Seiten.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Lock,
    title: "MFA-Bypass Simulation",
    desc: "Echtzeit-Phishing-Proxy-Angriffe (AiTM), die auch Zwei-Faktor-Authentifizierung umgehen – für fortgeschrittene Teams.",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

const PROCESS = [
  { step: "01", title: "Scope-Definition", desc: "Absprache zu Zielgruppen, Abteilungen, Zeitraum und Schwierigkeitsgrad der Simulation." },
  { step: "02", title: "Phishing-Kampagne erstellen", desc: "Entwicklung maßgeschneiderter Phishing-Szenarien – angepasst an Ihre Branche und Unternehmenskultur." },
  { step: "03", title: "Durchführung", desc: "Kontrollierter Versand / Durchführung der Phishing-Simulation im vereinbarten Zeitfenster." },
  { step: "04", title: "Echtzeit-Tracking", desc: "Messung von: Öffnungsrate, Klickrate, Credential-Eingabe, Melderate an IT-Security." },
  { step: "05", title: "Awareness-Training", desc: "Direkt nach Klick: automatisierter Lernmoment oder optionales Schulungsmodul für betroffene Mitarbeiter." },
  { step: "06", title: "Bericht & Empfehlungen", desc: "Detaillierter Report mit Klickquoten, Risikogruppen-Analyse und konkreten Maßnahmen zur Verbesserung." },
];

const STATS = [
  { stat: "94%", label: "aller Cyberangriffe starten mit Phishing" },
  { stat: "3,2%", label: "kostet ein Phishing-Angriff im Durchschnitt (in Mio. €)" },
  { stat: "27 Tage", label: "dauert es im Schnitt, eine Phishing-Attacke zu entdecken" },
  { stat: "1 von 3", label: "Mitarbeitern klickt auf Phishing-Links ohne Training" },
];

const FAQS = [
  {
    q: "Was ist eine Phishing Simulation?",
    a: "Eine Phishing Simulation ist ein kontrollierter, genehmigter Test, bei dem Ihr Unternehmen realistische Phishing-Angriffe gegen die eigenen Mitarbeiter simuliert – um Sicherheitsbewusstsein zu messen und gezielt zu verbessern. Die Mitarbeiter werden dabei nicht bestraft, sondern im Moment des 'Reinfallens' sofort geschult.",
  },
  {
    q: "Ist eine Phishing Simulation legal?",
    a: "Ja – mit entsprechender Genehmigung durch Unternehmensführung und Betriebsrat (falls vorhanden). SODU Secure stellt alle notwendigen rechtlichen Dokumente bereit und führt Simulationen DSGVO-konform durch.",
  },
  {
    q: "Wie viel kostet eine Phishing Simulation?",
    a: "Eine einfache Phishing-Kampagne beginnt ab 800 €. Umfangreiche Multi-Vektor-Simulationen (E-Mail + Vishing + QRishing) für größere Unternehmen kosten zwischen 2.000 € und 8.000 €. Festpreisangebot auf Anfrage.",
  },
  {
    q: "Wie oft sollte eine Phishing Simulation durchgeführt werden?",
    a: "Experten empfehlen 3–4 Mal pro Jahr. So bleiben Mitarbeiter sensibilisiert und Fortschritte können gemessen werden. Für NIS2-Compliance wird eine regelmäßige Frequenz explizit empfohlen.",
  },
  {
    q: "Was passiert mit Mitarbeitern, die auf den Phishing-Link klicken?",
    a: "Betroffene Mitarbeiter sehen sofort eine Lernseite, die erklärt, was gerade passiert ist und warum dies gefährlich war. Es geht nicht um Bestrafung, sondern um Learning by Experience – der wirksamste Weg zur Sensibilisierung.",
  },
  {
    q: "Gilt Phishing Simulation auch für NIS2 und ISO 27001?",
    a: "Ja. Phishing Simulationen sind ein anerkannter Nachweis für Sicherheitsmaßnahmen unter NIS2 (Art. 21), ISO 27001 (A.6.3 – Information Security Awareness) und BSI IT-Grundschutz.",
  },
];

const COMPLIANCE_ITEMS = [
  { name: "NIS2", desc: "Art. 21 verpflichtet zu Awareness-Maßnahmen für alle Mitarbeiter." },
  { name: "ISO 27001", desc: "Kontrollziel A.6.3: Security Awareness, Education and Training." },
  { name: "DSGVO", desc: "Art. 32: Technische Maßnahmen – Schulung als Schutzmaßnahme dokumentierbar." },
  { name: "BSI IT-Grundschutz", desc: "ORP.3: Sensibilisierung und Schulung zur Informationssicherheit." },
];

export default function PhishingSimulationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#131927] via-[#0d1117] to-[#131927] py-20 lg:py-32 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.07),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-6">
            <MailIcon className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">NIS2 · ISO 27001 · DSGVO-konform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Phishing Simulation –<br />
            <span className="text-red-500">Mitarbeiter wirklich testen</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Realistische Phishing-Angriffe gegen Ihre eigenen Mitarbeiter – kontrolliert, legal und lehrreich. Messen Sie, wie viele Mitarbeiter auf Phishing hereinfallen. Verbessern Sie die Zahlen nachhaltig.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Phishing Simulation anfragen
            </a>
            <Link href="/pentest" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-base">
              Zum Pentest <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {STATS.map((s) => (
              <div key={s.stat} className="bg-[#131927] border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{s.stat}</div>
                <div className="text-gray-500 text-xs mt-1 leading-tight">{s.label}</div>
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
            <h3 className="font-bold text-orange-300 mb-1">Menschen sind das größte Sicherheitsrisiko</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Selbst die beste Firewall schützt nicht, wenn ein Mitarbeiter unbedacht auf einen Phishing-Link klickt. 94% aller erfolgreichen Cyberangriffe starten mit einer Phishing-E-Mail. Regelmäßige Simulationen sind der effektivste Schutz gegen diesen Angriffsvektor.
            </p>
          </div>
        </div>
      </section>

      {/* Simulation types */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Arten von Phishing Simulationen</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Von der klassischen Phishing-E-Mail bis zu fortgeschrittenen MFA-Bypass-Angriffen – wir simulieren alle relevanten Angriffsvektoren.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIMULATION_TYPES.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.title} className="bg-[#131927] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-lg border mb-4 ${st.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{st.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20 bg-[#0a0e17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ablauf der Phishing Simulation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p) => (
              <div key={p.step} className="bg-[#131927] border border-gray-800 rounded-xl p-5">
                <div className="text-red-500 text-2xl font-bold mb-2">{p.step}</div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
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
              { icon: BarChart3, title: "Detailliertes Klick-Rate-Dashboard", desc: "Öffnungsrate, Klickrate, Credential-Eingabe, Melderate – pro Abteilung aufgeschlüsselt." },
              { icon: Users, title: "Risikogruppen-Analyse", desc: "Identifikation welche Teams oder Rollen besonders anfällig sind." },
              { icon: TrendingUp, title: "Fortschritts-Tracking", desc: "Vergleich der Ergebnisse über mehrere Kampagnen hinweg – messbarer Fortschritt." },
              { icon: BookOpen, title: "Awareness-Schulungsmodul", desc: "Optionales Training direkt im Anschluss für Mitarbeiter, die auf den Link geklickt haben." },
              { icon: FileText, title: "Management-Bericht", desc: "Executive Summary für CISOs, IT-Leiter und Geschäftsführung – NIS2-Nachweisdokument inklusive." },
              { icon: Shield, title: "Compliance-Nachweis", desc: "Dokumentierter Nachweis für ISO 27001 Audit, NIS2-Compliance und BSI IT-Grundschutz." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 bg-[#131927] border border-gray-800 rounded-xl p-5">
                  <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-14 bg-[#0a0e17] border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Phishing Simulation für Compliance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMPLIANCE_ITEMS.map((c) => (
              <div key={c.name} className="bg-[#131927] border border-gray-800 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-sm">{c.name}</span>
                  <span className="text-gray-400 text-sm"> – {c.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Preise – Phishing Simulation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Single Campaign", price: "ab 800 €", desc: "1 Phishing-Vektor, 1 Kampagne, bis 50 Mitarbeiter, Ergebnisbericht" },
              { name: "Multi-Vector", price: "ab 2.000 €", desc: "E-Mail + SMS + QR, bis 200 Mitarbeiter, Abteilungs-Breakdown, Awareness-Modul", featured: true },
              { name: "Enterprise", price: "ab 4.500 €", desc: "Alle Vektoren inkl. Vishing, unbegrenzte MA, Jahresplanung, NIS2-Nachweis" },
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-xl p-5 border ${pkg.featured ? "bg-red-900/20 border-red-600/40" : "bg-[#131927] border-gray-800"}`}>
                {pkg.featured && <div className="text-yellow-400 text-xs font-semibold mb-2">⭐ Empfohlen für KMU</div>}
                <h3 className="font-bold mb-1">{pkg.name}</h3>
                <div className="text-xl font-bold text-red-400 mb-3">{pkg.price}</div>
                <p className="text-gray-400 text-sm">{pkg.desc}</p>
                <a href={PHONE_HREF} className="mt-4 w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Anfragen
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0a0e17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zur Phishing Simulation</h2>
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
      <section className="py-20 bg-gradient-to-br from-red-900/20 via-[#0d1117] to-[#0d1117] border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-14 h-14 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Jetzt Phishing Simulation beauftragen</h2>
          <p className="text-gray-400 text-lg mb-8">Kostenlose Erstberatung · Festpreisangebot in 24h · DSGVO-konform</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />+49 179 239 6294
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-10 py-4 rounded-lg font-semibold transition-colors">
              <Mail className="w-5 h-5" />sodusecure@gmail.com
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            Verwandte Seiten:{" "}
            <Link href="/pentest" className="text-red-400 hover:text-red-300">Pentest</Link>{" · "}
            <Link href="/cyber-security-check" className="text-red-400 hover:text-red-300">Cyber Security Check</Link>{" · "}
            <Link href="/vulnerability-assessment" className="text-red-400 hover:text-red-300">Vulnerability Assessment</Link>{" · "}
            <Link href="/red-team-assessment" className="text-red-400 hover:text-red-300">Red Team</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
