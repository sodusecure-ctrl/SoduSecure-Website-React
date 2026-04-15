"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle, ChevronDown, ChevronUp, Phone, Mail, Euro, Info } from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const PRICE_TABLE = [
  { name: "Security Quick Check", price: "ab 800 €", duration: "1–2 Tage", scope: "Kleine Umgebungen", features: ["Automatisierter Scan", "Manuelle Validierung", "Kurzbericht", "Top-10 Findings"] },
  { name: "Security Standard Check", price: "ab 1.500 €", duration: "2–4 Tage", scope: "KMU, mittlere Infrastrukturen", features: ["Manuelles Assessment", "Compliance Review", "Detaillierter Bericht", "1 Retest"], featured: true },
  { name: "Security Premium Check", price: "ab 3.500 €", duration: "5–10 Tage", scope: "Enterprise, kritische Infrastruktur", features: ["Full-Scope Assessment", "ISO 27001 / NIS2 Mapping", "CISO-Ready Bericht", "Remediation Workshop"] },
];

const FACTORS = [
  { title: "Anzahl der Systeme", desc: "Mehr Systeme, Server oder Applikationen bedeuten mehr Prüfaufwand." },
  { title: "Prüfumfang", desc: "Ein Quick Check ist günstiger als ein umfassendes Assessment mit Compliance-Mapping." },
  { title: "Zertifizierungsrelevanz", desc: "Bestimmte Zertifizierungen (ISO 27001, NIS2) erfordern spezifische Dokumentation." },
  { title: "Branchenzugehörigkeit", desc: "Regulated Industries (Healthcare, Finance) benötigen spezielle Prüfrahmen." },
];

const FAQS = [
  { q: "Was kostet ein Cyber Security Check?", a: "Ein Cyber Security Check kostet zwischen 800 € und 5.000 €, je nach Umfang. Ein einfacher Quick Check beginnt bei 800 €, ein umfassendes Enterprise-Assessment kann 5.000 € überschreiten." },
  { q: "Gibt es Fördermöglichkeiten?", a: "Ja, für KMU gibt es in vielen Bundesländern Förderungen für Cybersecurity-Maßnahmen. Wir beraten Sie gerne dazu." },
  { q: "Was ist teurer – Security Check oder Pentest?", a: "Ein Pentest ist in der Regel teurer als ein Security Check, da er tiefergehende manuelle Exploitierung umfasst. Als Einstieg empfehlen wir oft den Security Check." },
  { q: "Sind Folge-Checks günstiger?", a: "Ja, für Bestandskunden bieten wir reduzierte Preise für regelmäßige Follow-up-Checks an." },
];

export default function CyberSecurityCheckKostenPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#131927] via-[#0d1117] to-[#131927] py-20 lg:py-28 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-6">
            <Euro className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">Transparente Preise 2025</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Cyber Security Check Kosten –<br />
            <span className="text-red-500">Was kostet ein Check?</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
            Transparente Preisübersicht für professionelle Cyber Security Checks. Festpreisangebote ohne versteckte Kosten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              <Phone className="w-5 h-5" />Kostenlos anfragen
            </a>
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Cyber Security Check Pakete</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICE_TABLE.map((pkg) => (
              <div key={pkg.name} className={`rounded-xl p-6 border ${pkg.featured ? "bg-red-900/20 border-red-600/40" : "bg-[#131927] border-gray-800"}`}>
                {pkg.featured && <div className="text-yellow-400 text-sm font-semibold mb-3">⭐ Empfohlen für KMU</div>}
                <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                <div className="text-2xl font-bold text-red-400 mb-1">{pkg.price}</div>
                <p className="text-gray-500 text-sm mb-1">{pkg.duration} · {pkg.scope}</p>
                <ul className="space-y-1.5 mt-4">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <a href={PHONE_HREF} className="mt-6 w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors">
                  Angebot anfragen
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factors */}
      <section className="py-16 bg-[#0a0e17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">Was beeinflusst die Kosten?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FACTORS.map((f) => (
              <div key={f.title} className="bg-[#131927] border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-red-400" />
                  <h3 className="font-semibold text-sm">{f.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">Häufige Fragen zu den Kosten</h2>
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
      <section className="py-14 border-t border-gray-800 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Shield className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Kosten anfragen</h2>
          <p className="text-gray-400 mb-6">Kostenlose Erstberatung · Festpreisangebot in 24h</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              <Phone className="w-5 h-5" />Jetzt anrufen
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              <Mail className="w-5 h-5" />E-Mail schreiben
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            <Link href="/cyber-security-check" className="text-red-400 hover:text-red-300">Cyber Security Check</Link>{" · "}
            <Link href="/cyber-security-check-preis" className="text-red-400 hover:text-red-300">Preisliste</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
