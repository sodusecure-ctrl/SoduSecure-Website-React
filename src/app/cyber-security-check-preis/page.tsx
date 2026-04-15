"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle, ChevronDown, ChevronUp, Phone, Mail, Euro } from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const PRICE_LIST = [
  { service: "Security Quick Check", priceFrom: "800 €", priceTo: "1.500 €", time: "1–2 Tage" },
  { service: "Web Application Security Check", priceFrom: "1.200 €", priceTo: "3.000 €", time: "2–5 Tage" },
  { service: "Netzwerk Security Check", priceFrom: "1.500 €", priceTo: "4.000 €", time: "3–7 Tage" },
  { service: "API Security Check", priceFrom: "1.000 €", priceTo: "2.500 €", time: "2–4 Tage" },
  { service: "Cloud Security Check", priceFrom: "2.000 €", priceTo: "5.000 €", time: "3–8 Tage" },
  { service: "Compliance Security Check", priceFrom: "2.500 €", priceTo: "6.000 €", time: "4–10 Tage" },
  { service: "Full Enterprise Security Check", priceFrom: "4.000 €", priceTo: "12.000 €", time: "1–3 Wochen" },
];

const FAQS = [
  { q: "Was ist im Preis enthalten?", a: "Im Standardpreis enthalten: Scoping-Gespräch, manuelles Assessment, priorisierter Bericht (DE/EN), Executive Summary und 1 kostenloser Retest." },
  { q: "Wie unterscheiden sich Preis und Kosten?", a: "Der Preis ist das Festpreisangebot; Kosten umfassen auch interne Aufwände für Koordination und Maßnahmenumsetzung." },
  { q: "Kann ich Preise vergleichen?", a: "Ja, achten Sie beim Vergleich auf: manuelle vs. automatisierte Checks, Zertifizierungen der Tester, Berichtsqualität und enthaltene Retests." },
];

export default function CyberSecurityCheckPreisPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#131927] via-[#0d1117] to-[#131927] py-20 lg:py-28 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-6">
            <Euro className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">Preisliste 2025</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Cyber Security Check Preis –<br />
            <span className="text-red-500">Aktuelle Preisliste</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
            Transparente Preisliste für alle Cyber Security Check Services. Vergleichen Sie Angebote und fordern Sie Ihr persönliches Festpreisangebot an.
          </p>
          <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            <Phone className="w-5 h-5" />Angebot anfordern
          </a>
        </div>
      </section>

      {/* Price List Table */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Preisliste Cyber Security Checks</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-semibold">Service</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-semibold">Preis von</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-semibold">Preis bis</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-semibold">Dauer</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_LIST.map((row, i) => (
                  <tr key={row.service} className={`border-b border-gray-800 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                    <td className="py-4 px-4 font-medium text-sm">{row.service}</td>
                    <td className="py-4 px-4 text-green-400 font-semibold text-sm">{row.priceFrom}</td>
                    <td className="py-4 px-4 text-gray-300 text-sm">{row.priceTo}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-500 text-xs mt-3">* Alle Preise netto zzgl. MwSt. · Richtwerte – individuelles Angebot nach Scoping</p>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="py-14 bg-[#0a0e17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">In jedem Preis enthalten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Kostenloses Scoping-Gespräch", "Manuelles Assessment durch zertifizierte Experten", "Priorisierter Sicherheitsbericht (DE/EN)", "Executive Summary für Management", "Technischer Bericht mit PoC", "1 kostenloser Retest", "Remediation Guidance", "Persönliches Abschlussgespräch"].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[#131927] border border-gray-800 rounded-lg p-4">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Häufige Fragen zum Preis</h2>
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
          <h2 className="text-2xl font-bold mb-4">Preis anfragen</h2>
          <p className="text-gray-400 mb-6">Festpreisangebot in 24 Stunden · keine versteckten Kosten</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              <Phone className="w-5 h-5" />Jetzt anrufen
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              <Mail className="w-5 h-5" />E-Mail schreiben
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-5">
            <Link href="/cyber-security-check" className="text-red-400 hover:text-red-300">Cyber Security Check</Link>{" · "}
            <Link href="/cyber-security-check-kosten" className="text-red-400 hover:text-red-300">Kosten</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
