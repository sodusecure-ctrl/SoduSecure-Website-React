"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, AlertTriangle, Users, Code2, ServerCog,
  GraduationCap, FileText, BadgeCheck, Briefcase, Repeat, BookOpen,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const TRAINING_TYPES = [
  {
    icon: Users,
    title: "Grundlagen für alle Mitarbeiter",
    desc: "Phishing erkennen, Passwörter & MFA, sicherer Umgang mit Daten und mobilen Geräten – die Basis, die jede und jeder im Unternehmen braucht.",
    color: "text-[#FF3B30] bg-[#FF3B30]/10 border-[#FF3B30]/20",
  },
  {
    icon: Code2,
    title: "Secure Coding für Entwickler",
    desc: "OWASP Top 10 hands-on: Ihre Entwickler exploiten selbst typische Schwachstellen und lernen, wie man sie von Anfang an vermeidet.",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: ServerCog,
    title: "Schulung für IT & Admins",
    desc: "Härtung, Active-Directory-Sicherheit, Erkennung von Angriffsspuren: das Wissen aus unseren Pentests, weitergegeben an Ihr IT-Team.",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Briefcase,
    title: "Briefing für Führungskräfte",
    desc: "Haftung unter NIS2, CEO-Fraud, Umgang mit Vorfällen: kompakt und auf Entscheiderebene – auch als Vorstands-Session.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: GraduationCap,
    title: "Onboarding-Modul",
    desc: "Jeder neue Mitarbeiter startet sicher: standardisiertes Security-Onboarding als fester Bestandteil Ihres Einarbeitungsprozesses.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Repeat,
    title: "Refresher & Jahresprogramm",
    desc: "Awareness ist kein Einmal-Event: jährliche Auffrischung, kurze Lernimpulse und messbarer Fortschritt über die Zeit.",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

const PROCESS = [
  { step: "01", title: "Bedarfsanalyse", desc: "Zielgruppen, Vorwissen, Branche, Vorfälle der Vergangenheit: Wir ermitteln, welche Inhalte Ihr Team wirklich braucht." },
  { step: "02", title: "Maßgeschneidertes Curriculum", desc: "Keine Schulung von der Stange – Beispiele aus Ihrem Arbeitsalltag, Szenarien aus Ihrer Branche." },
  { step: "03", title: "Durchführung", desc: "Vor Ort oder remote, interaktiv statt Frontalbeschallung – mit Live-Demos von echten Angriffen." },
  { step: "04", title: "Wissenstest & Zertifikat", desc: "Lernerfolgskontrolle pro Teilnehmer mit Teilnahmezertifikat – Ihr dokumentierter Schulungsnachweis." },
  { step: "05", title: "Wirksamkeitsmessung", desc: "Optional: Phishing-Simulation vor und nach der Schulung – der messbare Beweis, dass das Training wirkt." },
  { step: "06", title: "Jahresplan", desc: "Refresher, neue Themen (z. B. Deepfakes, KI-Betrug) und Fortschritts-Reporting für Ihr Awareness-Programm." },
];

const STATS = [
  { stat: "1 von 3", label: "Mitarbeitern klickt ohne Training auf Phishing-Links" },
  { stat: "100%", label: "maßgeschneidert – Beispiele aus Ihrem Unternehmen, nicht aus dem Lehrbuch" },
  { stat: "2", label: "Formate: vor Ort bei Ihnen oder remote für verteilte Teams" },
  { stat: "A.6.3", label: "ISO 27001 verlangt dokumentierte Awareness-Maßnahmen" },
];

const FAQS = [
  {
    q: "Sind Security-Awareness-Schulungen Pflicht?",
    a: "Für viele Unternehmen ja: NIS2 (Art. 21) verlangt Schulungen für Mitarbeiter und ausdrücklich auch für die Leitungsebene, ISO 27001 fordert Awareness-Maßnahmen (A.6.3), und die DSGVO setzt geschulte Beschäftigte für die Sicherheit der Verarbeitung voraus. Ohne dokumentierte Schulungen fehlt im Audit ein Pflichtnachweis.",
  },
  {
    q: "Was unterscheidet eure Schulungen von E-Learning-Plattformen?",
    a: "Unsere Trainer sind aktive Pentester – sie zeigen live, wie Angriffe wirklich funktionieren, und beantworten jede Frage aus der Praxis. Inhalte und Beispiele werden auf Ihr Unternehmen zugeschnitten. Standardisierte Klick-Kurse können das ergänzen, aber nicht ersetzen.",
  },
  {
    q: "Was kostet eine Security Awareness Schulung?",
    a: "Eine halbtägige Remote-Schulung beginnt ab 1.200 €, ein Ganztages-Workshop vor Ort ab 1.900 € zzgl. Anfahrt. Jahresprogramme mit mehreren Zielgruppen und Refreshern kalkulieren wir individuell – Festpreisangebot in 24h.",
  },
  {
    q: "Wie lange dauert eine Schulung?",
    a: "Je nach Zielgruppe 90 Minuten (Führungskräfte-Briefing) bis zu einem vollen Tag (Secure-Coding-Workshop). Für die Breite empfehlen wir 2 bis 4 Stunden mit hohem Interaktionsanteil – länger sinkt die Aufmerksamkeit.",
  },
  {
    q: "Bekommen die Teilnehmer einen Nachweis?",
    a: "Ja: Jeder Teilnehmer erhält ein Zertifikat, und Sie erhalten eine Teilnahme- und Ergebnisdokumentation – auditfähig für ISO 27001, NIS2 und Kundenanforderungen.",
  },
  {
    q: "Kann man Schulung und Phishing-Simulation kombinieren?",
    a: "Das ist sogar die wirksamste Kombination: Simulation vor der Schulung liefert den Weckruf und die Baseline, die Schulung das Wissen, die Folgesimulation den messbaren Fortschritt. Als Paket günstiger als einzeln.",
  },
];

const COMPLIANCE_ITEMS = [
  { name: "NIS2", desc: "Art. 21: Schulungspflicht für Mitarbeiter und Leitungsorgane." },
  { name: "ISO 27001", desc: "A.6.3: Awareness, Ausbildung und Schulung als Pflichtkontrolle." },
  { name: "DSGVO", desc: "Art. 32/39: Sensibilisierung der an der Verarbeitung beteiligten Personen." },
  { name: "BSI IT-Grundschutz", desc: "ORP.3: Sensibilisierung und Schulung zur Informationssicherheit." },
];

export default function SecurityAwarenessSchulungPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.07),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <GraduationCap className="w-4 h-4 text-[#FF3B30]" />
            <span className="text-[#FF3B30] text-sm font-medium">NIS2 · ISO 27001 · Von echten Pentestern</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Individuelle Schulungen –<br />
            <span className="text-[#FF3B30]">Awareness, die wirkt</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Maßgeschneidertes Security-Awareness-Training für Ihr Team: von Pentestern, die täglich echte Angriffe fahren – praxisnah, interaktiv und mit dem Nachweis, den Ihr Audit verlangt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 premium-cta text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Schulung anfragen <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/live-hacking-show" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Zur Live Hacking Show <ArrowRight className="w-5 h-5" />
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
            <h3 className="font-bold text-orange-300 mb-1">Technik allein reicht nicht</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Die meisten erfolgreichen Angriffe beginnen beim Menschen – mit einer E-Mail, einem Anruf, einem Klick. Jeder Euro in Awareness senkt genau das Risiko, das Firewalls nicht abdecken können. NIS2 macht Schulungen deshalb zur Pflicht – bis hinauf zur Geschäftsleitung.
            </p>
          </div>
        </div>
      </section>

      {/* Training types */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Unsere Schulungsformate</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Jede Zielgruppe braucht andere Inhalte – vom Grundlagen-Training bis zum Secure-Coding-Workshop.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAINING_TYPES.map((tt) => {
              const Icon = tt.icon;
              return (
                <div key={tt.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 hover:border-white/15 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-2xl border mb-4 ${tt.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{tt.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{tt.desc}</p>
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
            <h2 className="text-3xl font-bold mb-4">So entsteht Ihre Schulung</h2>
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
              { icon: BookOpen, title: "Maßgeschneidertes Curriculum", desc: "Inhalte, Beispiele und Szenarien aus Ihrem Unternehmen und Ihrer Branche." },
              { icon: Users, title: "Interaktive Durchführung", desc: "Live-Demos echter Angriffe, Diskussion, Übungen – keine Folienschlacht." },
              { icon: BadgeCheck, title: "Teilnehmer-Zertifikate", desc: "Individueller Nachweis für jeden Teilnehmer nach bestandenem Wissenstest." },
              { icon: FileText, title: "Auditfähige Dokumentation", desc: "Schulungsnachweis für ISO 27001, NIS2 und Kunden-Audits – revisionssicher." },
              { icon: Repeat, title: "Wirksamkeitsmessung", desc: "Optionale Phishing-Simulation davor und danach – Fortschritt in Zahlen." },
              { icon: Shield, title: "Pentester-Praxiswissen", desc: "Trainer, die täglich Unternehmen hacken – und wissen, was wirklich passiert." },
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
          <h2 className="text-2xl font-bold text-center mb-8">Schulungen für Compliance</h2>
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
          <h2 className="text-2xl font-bold text-center mb-8">Preise – Awareness-Schulungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Remote-Schulung", price: "ab 1.200 €", desc: "Halbtägig, eine Zielgruppe, Wissenstest & Zertifikate inklusive" },
              { name: "Workshop vor Ort", price: "ab 1.900 €", desc: "Ganztägig bei Ihnen, individualisierte Inhalte, Live-Demos, Dokumentation", featured: true },
              { name: "Jahresprogramm", price: "individuell", desc: "Mehrere Zielgruppen, Refresher, Phishing-Simulation & Live Hacking kombinierbar" },
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
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zu Awareness-Schulungen</h2>
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
          <GraduationCap className="w-14 h-14 text-[#FF3B30] mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Jetzt Schulung planen</h2>
          <p className="text-white/60 text-lg mb-8">Kostenlose Bedarfsanalyse · Festpreisangebot in 24h · Deutschlandweit & remote</p>
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
            <Link href="/live-hacking-show" className="text-[#FF3B30] hover:text-[#FF6B61]">Live Hacking Show</Link>{" · "}
            <Link href="/phishing-simulation" className="text-[#FF3B30] hover:text-[#FF6B61]">Phishing-Simulation</Link>{" · "}
            <Link href="/nis2" className="text-[#FF3B30] hover:text-[#FF6B61]">NIS2</Link>{" · "}
            <Link href="/services/iso-27001" className="text-[#FF3B30] hover:text-[#FF6B61]">ISO 27001</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
