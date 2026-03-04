"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, Search, AlertTriangle, FileText, Target, Zap, Network, Globe, Lock,
} from "lucide-react";

const PHONE_HREF = "tel:+4917923962949";
const EMAIL_HREF = "mailto:sodusecure@gmail.com";

const CHECK_TYPES = [
  { icon: Globe, title: "Web & App Security Check", desc: "Überprüfung Ihrer Web-Anwendungen auf OWASP Top 10, Auth-Schwachstellen und Business-Logic-Fehler.", color: "text-red-400" },
  { icon: Network, title: "Netzwerk Security Check", desc: "Analyse Ihrer Netzwerkinfrastruktur, offener Ports, fehlerhafter Firewall-Regeln und unsicherer Protokolle.", color: "text-blue-400" },
  { icon: Lock, title: "Zugriffskontroll-Check", desc: "Überprüfung von Active Directory, IAM-Konfigurationen, Berechtigungskonzepten und Privilege Escalation Risiken.", color: "text-purple-400" },
  { icon: Zap, title: "API Security Check", desc: "Assessment Ihrer APIs auf OWASP API Top 10: BOLA, fehlende Authentifizierung, Injection und mehr.", color: "text-orange-400" },
  { icon: FileText, title: "Compliance Check", desc: "Bewertung Ihrer Sicherheitslage gegen GDPR, ISO 27001, NIS2 und BSI IT-Grundschutz.", color: "text-teal-400" },
  { icon: Target, title: "Red Team Assessment", desc: "Simulierter gezielter Angriff auf Ihre Organisation – für maximale Realitätsnähe.", color: "text-green-400" },
];

const PROCESS_STEPS = [
  { step: "01", title: "Kostenloses Erstgespräch", desc: "Wir analysieren Ihre IT-Umgebung und definieren gemeinsam den Prüfumfang." },
  { step: "02", title: "Technisches Assessment", desc: "Systematische Überprüfung Ihrer Systeme durch zertifizierte Security Experten." },
  { step: "03", title: "Risikoanalyse & Priorisierung", desc: "Alle Findings werden nach CVSS bewertet und nach Kritikalität priorisiert." },
  { step: "04", title: "Detaillierter Sicherheitsbericht", desc: "Technischer Bericht + Executive Summary + umsetzbare Handlungsempfehlungen." },
  { step: "05", title: "Remediation Support", desc: "Unterstützung bei der Behebung der gefundenen Schwachstellen." },
  { step: "06", title: "Validierungs-Retest", desc: "Kostenloser Retest zur Bestätigung der erfolgreichen Behebung." },
];

const FAQS = [
  { q: "Was ist ein Cyber Security Check?", a: "Ein Cyber Security Check ist eine systematische Überprüfung Ihrer IT-Infrastruktur auf Sicherheitslücken. Im Unterschied zum vollständigen Penetrationstest liegt der Fokus auf der Identifikation und Bewertung von Schwachstellen ohne vollständige Ausnutzung." },
  { q: "Wie lange dauert ein Cyber Security Check?", a: "Je nach Scope dauert ein Check 1–5 Werktage. Nach dem Scoping-Gespräch nennen wir Ihnen einen verbindlichen Zeitplan." },
  { q: "Für welche Unternehmen ist ein Cyber Security Check geeignet?", a: "Für alle Unternehmensgrößen: KMU die erstmals ihren Sicherheitsstatus ermitteln wollen, bis hin zu Enterprises die ihre bestehenden Maßnahmen validieren möchten." },
  { q: "Was ist der Unterschied zum Pentest?", a: "Ein Security Check ist breiter und schneller – er identifiziert Schwachstellen. Ein Penetrationstest ist tiefer – er nutzt Schwachstellen aktiv aus. Oft beginnen Unternehmen mit einem Check und gehen dann zum Pentest über." },
  { q: "Erhalte ich ein Zertifikat?", a: "Sie erhalten einen detaillierten Bericht. Auf Wunsch stellen wir ein Prüfzertifikat für interne oder externe Nachweispflichten aus." },
];

export default function CyberSecurityCheckPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#131927] via-[#0d1117] to-[#131927] py-20 lg:py-28 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-6">
            <Search className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">Professionelles Security Assessment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Cyber Security Check –<br />
            <span className="text-red-500">Sicherheitslücken finden</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Professioneller Cyber Security Check für Unternehmen jeder Größe. Identifizieren Sie Schwachstellen bevor Angreifer es tun – BSI-orientiert, zertifizierte Experten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Kostenlos anfragen
            </a>
            <Link href="/cyber-security-check-kosten" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-base">
              Kosten ansehen<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 max-w-2xl mx-auto">
            {[["72h", "Bericht in <72h"], ["100%", "Manuelles Testing"], ["2.500+", "gefundene CVEs"]].map(([stat, label]) => (
              <div key={stat} className="text-center">
                <div className="text-2xl font-bold text-red-400">{stat}</div>
                <div className="text-gray-500 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Check Types */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Unsere Cyber Security Checks</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Von der Web-Anwendung bis zur gesamten IT-Infrastruktur – wir prüfen, was Sie schützen müssen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHECK_TYPES.map((ct) => {
              const Icon = ct.icon;
              return (
                <div key={ct.title} className="bg-[#131927] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors">
                  <Icon className={`w-8 h-8 mb-4 ${ct.color}`} />
                  <h3 className="font-bold text-lg mb-2">{ct.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{ct.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="py-10 bg-red-900/10 border-y border-red-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Warum jetzt handeln?</h3>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            Laut BSI-Lagebericht 2024 waren 78% der deutschen Unternehmen von Cyberangriffen betroffen. NIS2 verpflichtet tausende Unternehmen zu regelmäßigen Sicherheitsprüfungen. Ein rechtzeitiger Cyber Security Check schützt vor Schäden, Bußgeldern und Reputationsverlust.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ablauf des Cyber Security Checks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((s) => (
              <div key={s.step} className="bg-[#131927] border border-gray-800 rounded-xl p-5">
                <div className="text-red-500 font-bold text-2xl mb-2">{s.step}</div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0a0e17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen</h2>
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
      <section className="py-16 border-t border-gray-800 bg-gradient-to-br from-red-900/20 via-[#0d1117] to-[#0d1117]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Jetzt Cyber Security Check anfragen</h2>
          <p className="text-gray-400 mb-8">Kostenlose Erstberatung · Festpreisangebot in 24 Stunden · Zertifizierte Experten</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              <Phone className="w-5 h-5" />Jetzt anrufen
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              <Mail className="w-5 h-5" />E-Mail schreiben
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            <Link href="/cyber-security-check-kosten" className="text-red-400 hover:text-red-300">Kosten ansehen</Link>{" · "}
            <Link href="/cyber-security-check-preis" className="text-red-400 hover:text-red-300">Preisliste</Link>{" · "}
            <Link href="/pentest" className="text-red-400 hover:text-red-300">Zum Pentest</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
