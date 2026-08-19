"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, AlertTriangle, ClipboardCheck, FileText, Search,
  Users, Scale, ListChecks, BadgeCheck, Building2, Repeat,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const AUDIT_TYPES = [
  {
    icon: ClipboardCheck,
    title: "Internes Audit nach ISO 27001",
    desc: "Das Pflicht-Audit nach Kapitel 9.2: Wir prüfen Ihr ISMS auf Konformität mit der Norm und Ihren eigenen Vorgaben – unabhängig und auditsicher dokumentiert.",
    color: "text-[#FF3B30] bg-[#FF3B30]/10 border-[#FF3B30]/20",
  },
  {
    icon: Search,
    title: "Gap-Analyse / Readiness-Audit",
    desc: "Vor der Erst-Zertifizierung: Wo steht Ihr ISMS wirklich? Wir identifizieren Lücken zur ISO 27001 und liefern einen priorisierten Fahrplan bis zur Zertifizierungsreife.",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Scale,
    title: "NIS2-Gap-Assessment",
    desc: "Abgleich Ihrer Maßnahmen mit den Anforderungen der NIS2-Richtlinie (Art. 21): Risikomanagement, Meldeprozesse, Lieferkette, Leitungsverantwortung.",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Building2,
    title: "Lieferanten-Audit",
    desc: "Prüfung kritischer Dienstleister und Zulieferer auf Informationssicherheit – als Teil Ihres Lieferkettenmanagements nach ISO 27001 und NIS2.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: BadgeCheck,
    title: "TISAX-Vorbereitung",
    desc: "Readiness-Check für das TISAX-Assessment der Automobilindustrie: Selbsteinschätzung validieren, Lücken schließen, Assessment sicher bestehen.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Repeat,
    title: "Auditprogramm im Jahresrhythmus",
    desc: "Wir übernehmen Ihr komplettes internes Auditprogramm: Planung, Durchführung, Nachverfolgung – Jahr für Jahr, ohne internen Aufwand.",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

const PROCESS = [
  { step: "01", title: "Auditplanung", desc: "Festlegung von Scope, Kriterien und Zeitplan – abgestimmt auf Ihr Auditprogramm und Ihre Zertifizierungstermine." },
  { step: "02", title: "Dokumentenprüfung", desc: "Review von ISMS-Dokumentation, Richtlinien, Risikobehandlungsplan und Statement of Applicability." },
  { step: "03", title: "Interviews & Stichproben", desc: "Gespräche mit Prozessverantwortlichen und Stichproben in der Praxis: Wird gelebt, was dokumentiert ist?" },
  { step: "04", title: "Feststellungen", desc: "Klare Einstufung: Hauptabweichung, Nebenabweichung, Verbesserungspotenzial – nachvollziehbar begründet." },
  { step: "05", title: "Bericht & Maßnahmenplan", desc: "Auditbericht in zertifizierungstauglicher Form plus priorisierter Maßnahmenplan mit realistischen Fristen." },
  { step: "06", title: "Follow-up", desc: "Nachverfolgung der Korrekturmaßnahmen und Wirksamkeitsprüfung – damit im Zertifizierungsaudit nichts offen ist." },
];

const STATS = [
  { stat: "9.2", label: "ISO 27001 Kapitel 9.2 verlangt interne Audits in geplanten Abständen" },
  { stat: "100%", label: "Unabhängigkeit – Auditoren dürfen nicht ihre eigene Arbeit prüfen" },
  { stat: "1×", label: "pro Jahr mindestens: der übliche Zyklus für interne ISMS-Audits" },
  { stat: "0", label: "Überraschungen im Zertifizierungsaudit, wenn das interne Audit sauber war" },
];

const FAQS = [
  {
    q: "Ist ein internes Audit für ISO 27001 Pflicht?",
    a: "Ja. Kapitel 9.2 der ISO 27001 verlangt interne Audits in geplanten Abständen – ohne dokumentierte interne Audits gibt es keine Zertifizierung und keine erfolgreiche Überwachung. Üblich ist mindestens ein internes Audit pro Jahr.",
  },
  {
    q: "Darf ein externer Dienstleister das interne Audit durchführen?",
    a: "Ja, das ist ausdrücklich zulässig und weit verbreitet. Die Norm verlangt Objektivität und Unparteilichkeit der Auditoren – genau das ist intern oft schwierig, wenn dieselben Personen das ISMS aufgebaut haben. Ein externer Auditor erfüllt die Unabhängigkeitsanforderung automatisch.",
  },
  {
    q: "Was kostet ein internes Audit?",
    a: "Ein internes ISO-27001-Audit für ein KMU beginnt ab 1.900 € (inkl. Bericht und Maßnahmenplan). Umfangreichere ISMS mit mehreren Standorten liegen typischerweise zwischen 3.500 € und 8.000 €. Festpreisangebot nach kurzem Scoping.",
  },
  {
    q: "Was ist der Unterschied zwischen internem Audit und Zertifizierungsaudit?",
    a: "Das interne Audit führen Sie (oder Ihr Dienstleister) selbst durch – es ist Ihr Kontrollinstrument und Pflichtnachweis. Das Zertifizierungsaudit führt eine akkreditierte Zertifizierungsstelle durch und entscheidet über das Zertifikat. Ein gutes internes Audit findet die Abweichungen, bevor der Zertifizierer sie findet.",
  },
  {
    q: "Wie lange dauert ein internes Audit?",
    a: "Für ein KMU typischerweise 1 bis 3 Audittage plus Berichtserstellung. Die Terminplanung richtet sich nach Ihrem Zertifizierungszyklus – idealerweise liegt das interne Audit 2 bis 3 Monate vor dem externen Audit.",
  },
  {
    q: "Hilft das auch für NIS2?",
    a: "Ja. NIS2 verlangt die Bewertung der Wirksamkeit Ihrer Risikomaßnahmen (Art. 21). Ein strukturiertes Audit- und Gap-Assessment liefert genau diesen Nachweis – und zeigt der Geschäftsleitung, wo sie haftungsrelevante Lücken hat.",
  },
];

const COMPLIANCE_ITEMS = [
  { name: "ISO 27001", desc: "Kap. 9.2: Internes Audit als Pflichtbestandteil jedes ISMS." },
  { name: "NIS2", desc: "Art. 21: Bewertung der Wirksamkeit der Risikomanagementmaßnahmen." },
  { name: "TISAX", desc: "Readiness-Check vor dem Assessment nach VDA ISA." },
  { name: "DORA", desc: "Überprüfung des IKT-Risikomanagements im Finanzsektor." },
];

export default function InternesAuditPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.07),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <ClipboardCheck className="w-4 h-4 text-[#FF3B30]" />
            <span className="text-[#FF3B30] text-sm font-medium">ISO 27001 Kap. 9.2 · NIS2 · TISAX</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Internes Audit –<br />
            <span className="text-[#FF3B30]">unabhängig & auditsicher</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Konformität prüfen und Risiken identifizieren, bevor es der Zertifizierer tut: Wir führen Ihr internes Audit nach ISO 27001 durch – unabhängig, erfahren und mit einem Maßnahmenplan, der Sie wirklich weiterbringt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 premium-cta text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Internes Audit anfragen
            </a>
            <Link href="/services/iso-27001" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              ISMS / ISO 27001 <ArrowRight className="w-5 h-5" />
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
            <h3 className="font-bold text-orange-300 mb-1">Wer sein eigenes ISMS auditiert, prüft sich selbst</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              ISO 27001 verlangt objektive und unparteiische Auditoren. In kleinen Teams ist das kaum lösbar: Wer das ISMS aufgebaut hat, darf es nicht selbst prüfen. Ein externes internes Audit löst das Problem – und bringt zusätzlich den Blick eines Auditors mit, der weiß, worauf Zertifizierer achten.
            </p>
          </div>
        </div>
      </section>

      {/* Audit types */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Unsere Audit-Leistungen</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Vom Pflicht-Audit nach Kapitel 9.2 bis zur TISAX-Vorbereitung – Audits, die Sie wirklich auf das externe Assessment vorbereiten.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUDIT_TYPES.map((at) => {
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
            <h2 className="text-3xl font-bold mb-4">So läuft das interne Audit ab</h2>
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
              { icon: FileText, title: "Zertifizierungstauglicher Auditbericht", desc: "Dokumentation in der Form, die Zertifizierungsstellen als Nachweis nach Kap. 9.2 akzeptieren." },
              { icon: ListChecks, title: "Priorisierter Maßnahmenplan", desc: "Jede Abweichung mit konkreter Korrekturmaßnahme, Verantwortlichkeit und realistischer Frist." },
              { icon: Users, title: "Erfahrene, unabhängige Auditoren", desc: "Auditoren mit ISMS- und Pentest-Hintergrund – wir prüfen nicht nur Papier, sondern gelebte Praxis." },
              { icon: Shield, title: "Technische Tiefe", desc: "Auf Wunsch kombiniert mit Pentest oder Schwachstellenscan – ein Audit, das auch die Technik ernst nimmt." },
              { icon: Scale, title: "Management-Briefing", desc: "Ergebnisse für die Geschäftsleitung aufbereitet – inklusive Haftungsrelevanz unter NIS2." },
              { icon: Repeat, title: "Follow-up inklusive", desc: "Nachverfolgung der Maßnahmen bis zum externen Audit – Sie gehen ohne offene Punkte hinein." },
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
          <h2 className="text-2xl font-bold text-center mb-8">Internes Audit für Compliance</h2>
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
          <h2 className="text-2xl font-bold text-center mb-8">Preise – Internes Audit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "KMU-Audit", price: "ab 1.900 €", desc: "Internes ISO-27001-Audit für einen Standort, inkl. Bericht und Maßnahmenplan" },
              { name: "Audit + Gap-Analyse", price: "ab 3.500 €", desc: "Internes Audit plus Readiness-Bewertung vor der (Re-)Zertifizierung, Follow-up inklusive", featured: true },
              { name: "Auditprogramm", price: "individuell", desc: "Mehrjähriges Auditprogramm, mehrere Standorte, NIS2/TISAX-Kombination – Scoping-Gespräch" },
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-xl p-5 border ${pkg.featured ? "bg-[#1a0a0a]/20 border-[#FF3B30]/40" : "bg-[#0A0A0B] border-white/10"}`}>
                {pkg.featured && <div className="text-yellow-400 text-xs font-semibold mb-2">⭐ Empfohlen vor Zertifizierung</div>}
                <h3 className="font-bold mb-1">{pkg.name}</h3>
                <div className="text-xl font-bold text-[#FF3B30] mb-3">{pkg.price}</div>
                <p className="text-white/60 text-sm">{pkg.desc}</p>
                <a href={PHONE_HREF} className="mt-4 w-full inline-flex items-center justify-center premium-cta text-white px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors">
                  Anfragen
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0A0A0B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zum internen Audit</h2>
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
          <ClipboardCheck className="w-14 h-14 text-[#FF3B30] mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Jetzt internes Audit planen</h2>
          <p className="text-white/60 text-lg mb-8">Kostenlose Erstberatung · Festpreisangebot in 24h · Terminierung nach Ihrem Zertifizierungszyklus</p>
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
            <Link href="/services/iso-27001" className="text-[#FF3B30] hover:text-[#FF6B61]">ISMS / ISO 27001</Link>{" · "}
            <Link href="/iso-27001-zertifizierung" className="text-[#FF3B30] hover:text-[#FF6B61]">ISO 27001 Zertifizierung</Link>{" · "}
            <Link href="/nis2" className="text-[#FF3B30] hover:text-[#FF6B61]">NIS2</Link>{" · "}
            <Link href="/tisax" className="text-[#FF3B30] hover:text-[#FF6B61]">TISAX</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
