"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, CheckCircle, ArrowRight, ChevronDown, ChevronUp,
  Phone, Mail, AlertTriangle, Wifi, KeyRound, Usb,
  Mic, Users, MonitorPlay, Search, Sparkles, MailOpen,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const SHOW_MODULES = [
  {
    icon: MailOpen,
    title: "Phishing & CEO-Fraud live",
    desc: "Wir bauen vor den Augen des Publikums eine täuschend echte Phishing-Mail samt Fake-Login-Seite – und zeigen, wie schnell Zugangsdaten abfließen.",
    color: "text-[#FF3B30] bg-[#FF3B30]/10 border-[#FF3B30]/20",
  },
  {
    icon: KeyRound,
    title: "Passwort-Cracking live",
    desc: "Wie lange hält 'Sommer2024!' wirklich? Wir knacken typische Passwörter in Echtzeit und zeigen, warum Länge vor Komplexität geht.",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Wifi,
    title: "WLAN-Angriff (Evil Twin)",
    desc: "Ein gefälschter Hotspot mit dem Namen Ihres Firmen-WLANs – und plötzlich läuft der Datenverkehr über den Angreifer. Live demonstriert, sicher kontrolliert.",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: Usb,
    title: "USB-Angriff & Malware",
    desc: "Ein 'verlorener' USB-Stick auf dem Parkplatz: Wir zeigen, was passiert, wenn ihn jemand einsteckt – Tastatur-Injection in Sekunden.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Sparkles,
    title: "Deepfake & Voice Cloning",
    desc: "Der Chef ruft an und klingt exakt wie der Chef: Wir demonstrieren KI-gestützten Stimmen- und Videobetrug – der Angriffsvektor der Gegenwart.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Search,
    title: "OSINT: Was das Netz über Sie weiß",
    desc: "Live-Recherche über Ihr Unternehmen (abgestimmt und freigegeben): exponierte Daten, Leaks, Mitarbeiterprofile – die Munition echter Angreifer.",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

const PROCESS = [
  { step: "01", title: "Briefing", desc: "Anlass, Zielgruppe, Teilnehmerzahl, Dauer: Keynote, Awareness-Tag, Führungskräfte-Event oder Messe?" },
  { step: "02", title: "Maßgeschneidertes Programm", desc: "Wir stellen die Module zusammen, die zu Ihrem Publikum passen – von unterhaltsam bis technisch tief." },
  { step: "03", title: "Die Show (45–90 Min)", desc: "Echte Angriffe, live vorgeführt von aktiven Pentestern – verständlich erklärt, ohne Fachchinesisch, mit Wow-Effekt." },
  { step: "04", title: "Q&A & Diskussion", desc: "Das Publikum fragt, wir antworten ehrlich – auch zu den unbequemen Themen." },
  { step: "05", title: "Follow-up (optional)", desc: "Vertiefende Schulung oder Phishing-Simulation im Nachgang – damit aus dem Aha-Moment Verhalten wird." },
];

const STATS = [
  { stat: "45–90", label: "Minuten Show – angepasst an Ihren Anlass und Zeitplan" },
  { stat: "500+", label: "Teilnehmer möglich – vom Team-Workshop bis zur Großveranstaltung" },
  { stat: "100%", label: "kontrolliert und legal – keine echten Systeme oder Daten gefährdet" },
  { stat: "2", label: "Formate: vor Ort bei Ihnen oder komplett remote" },
];

const FAQS = [
  {
    q: "Für wen ist eine Live Hacking Show geeignet?",
    a: "Für alle, die Sicherheitsbewusstsein erlebbar machen wollen: Mitarbeiter-Awareness-Tage, Führungskräfte-Events, Kick-offs, Kundenveranstaltungen, Messen und Konferenzen. Die Inhalte werden auf das Publikum zugeschnitten – vom Azubi bis zum Vorstand.",
  },
  {
    q: "Ist das legal und sicher?",
    a: "Ja. Alle Demonstrationen laufen in einer kontrollierten Umgebung mit eigens dafür aufgebauten Systemen. Es werden keine echten Systeme angegriffen und keine echten Daten verwendet – außer bei der optionalen OSINT-Recherche, die vorab schriftlich freigegeben wird.",
  },
  {
    q: "Was kostet eine Live Hacking Show?",
    a: "Eine Remote-Show beginnt ab 1.900 €, vor Ort ab 2.500 € zzgl. Anfahrt. Der Preis hängt von Dauer, Modulen und Individualisierung ab – Festpreisangebot in 24h.",
  },
  {
    q: "Geht das auch remote?",
    a: "Ja, alle Module funktionieren auch als Remote-Format über Ihre Videokonferenz-Plattform – ideal für verteilte Teams. Der Live-Charakter bleibt: Alles passiert in Echtzeit, nichts ist vorproduziert.",
  },
  {
    q: "Kann die Show auf unser Unternehmen zugeschnitten werden?",
    a: "Ja – das ist der stärkste Effekt: Phishing-Mails im Look Ihres Unternehmens, OSINT-Ergebnisse über Ihre eigene Firma, Szenarien aus Ihrer Branche. Der Individualisierungsgrad wird im Briefing festgelegt.",
  },
  {
    q: "Zählt das als Awareness-Maßnahme für NIS2 oder ISO 27001?",
    a: "Ja. Eine dokumentierte Live-Hacking-Veranstaltung ist eine anerkannte Sensibilisierungsmaßnahme (NIS2 Art. 21, ISO 27001 A.6.3). In Kombination mit Phishing-Simulation und Schulungen entsteht ein vollständiges, nachweisbares Awareness-Programm.",
  },
];

export default function LiveHackingShowPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.07),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <MonitorPlay className="w-4 h-4 text-[#FF3B30]" />
            <span className="text-[#FF3B30] text-sm font-medium">Vor Ort oder remote · Von echten Pentestern</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Live Hacking Show –<br />
            <span className="text-[#FF3B30]">Angriffe live erleben</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Kein Vortrag mit Folien, sondern echte Angriffe in Echtzeit: Unsere Pentester zeigen live, wie Phishing, Passwort-Cracking und Deepfakes funktionieren – und Ihr Team versteht Sicherheit auf eine Art, die hängen bleibt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 premium-cta text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Show-Termin anfragen <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/security-awareness-schulung" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Zu den Schulungen <ArrowRight className="w-5 h-5" />
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
            <h3 className="font-bold text-orange-300 mb-1">Gesehen wirkt stärker als gehört</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Awareness-Folien werden vergessen – ein live geknacktes Passwort nicht. Wer einmal gesehen hat, wie schnell die eigene Firmen-Loginseite nachgebaut ist, klickt anders. Genau dieser Moment macht Live Hacking zur wirksamsten Awareness-Maßnahme.
            </p>
          </div>
        </div>
      </section>

      {/* Show modules */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Module der Live Hacking Show</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Sie wählen die Bausteine – wir bauen daraus eine Show, die zu Ihrem Publikum und Anlass passt.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOW_MODULES.map((sm) => {
              const Icon = sm.icon;
              return (
                <div key={sm.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 hover:border-white/15 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-2xl border mb-4 ${sm.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{sm.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{sm.desc}</p>
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
            <h2 className="text-3xl font-bold mb-4">Von der Anfrage zur Show</h2>
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

      {/* Audiences */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Passende Anlässe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Users, title: "Awareness-Tag für Mitarbeiter", desc: "Der Höhepunkt Ihres Security-Awareness-Programms – unterhaltsam und nachhaltig." },
              { icon: Shield, title: "Führungskräfte & Vorstand", desc: "Risiken erlebbar machen, Budgets begründen: die wirksamste halbe Stunde für Ihr Security-Budget." },
              { icon: Mic, title: "Konferenzen & Messen", desc: "Live Hacking als Keynote oder Bühnenprogramm – der Programmpunkt, über den gesprochen wird." },
              { icon: MonitorPlay, title: "Kunden- & Partner-Events", desc: "Zeigen Sie Ihren Kunden, dass Sie Sicherheit ernst nehmen – mit einem Erlebnis statt einer Broschüre." },
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

      {/* Pricing Teaser */}
      <section className="py-14 bg-[#0A0A0B] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Preise – Live Hacking Show</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Remote-Show", price: "ab 1.900 €", desc: "45–60 Min live über Ihre Videoplattform, 3–4 Module, Q&A inklusive" },
              { name: "Vor-Ort-Show", price: "ab 2.500 €", desc: "60–90 Min bei Ihnen oder auf Ihrem Event, individualisierte Module, Q&A und Technik inklusive", featured: true },
              { name: "Awareness-Paket", price: "individuell", desc: "Show + Phishing-Simulation + Schulung als Jahresprogramm mit Compliance-Nachweis" },
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-xl p-5 border ${pkg.featured ? "bg-[#1a0a0a]/20 border-[#FF3B30]/40" : "bg-[#0A0A0B] border-white/10"}`}>
                {pkg.featured && <div className="text-yellow-400 text-xs font-semibold mb-2">⭐ Beliebtestes Format</div>}
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
          <h2 className="text-3xl font-bold text-center mb-10">Häufige Fragen zur Live Hacking Show</h2>
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
          <MonitorPlay className="w-14 h-14 text-[#FF3B30] mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Jetzt Live Hacking Show buchen</h2>
          <p className="text-white/60 text-lg mb-8">Kostenlose Erstberatung · Festpreisangebot in 24h · Deutschlandweit & remote</p>
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
            <Link href="/security-awareness-schulung" className="text-[#FF3B30] hover:text-[#FF6B61]">Awareness-Schulungen</Link>{" · "}
            <Link href="/phishing-simulation" className="text-[#FF3B30] hover:text-[#FF6B61]">Phishing-Simulation</Link>{" · "}
            <Link href="/hacker-simulation" className="text-[#FF3B30] hover:text-[#FF6B61]">Hacker-Simulation</Link>{" · "}
            <Link href="/pentest" className="text-[#FF3B30] hover:text-[#FF6B61]">Penetrationstest</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
