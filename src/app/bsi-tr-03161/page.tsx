"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileSearch,
  Smartphone,
  Globe,
  Server,
  Users,
  ClipboardCheck,
  Award,
  Stethoscope,
  MessageSquare,
  Target,
  Lock,
  Search,
} from "lucide-react";
import { useTranslations } from "next-intl";
import TR03161Form from "@/components/common/TR03161Form";

const TR_PARTS = [
  {
    icon: Smartphone,
    title: "Teil 1: Mobile Anwendungen",
    desc: "Sicherheitsanforderungen für native und hybride Mobile Apps (iOS & Android) im Gesundheitswesen – basierend auf OWASP MASVS und dem OWASP Mobile Security Testing Guide.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Globe,
    title: "Teil 2: Web-Anwendungen",
    desc: "Prüfaspekte für Web-Frontends und browserbasierte Gesundheitsanwendungen – basierend auf OWASP ASVS und etablierten Web-Sicherheitsstandards.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Server,
    title: "Teil 3: Hintergrundsysteme",
    desc: "Sicherheitsanforderungen an Backend-Systeme, APIs und Datenbanken – Authentifizierung, Datenhaltung, Kryptographie und Kommunikationssicherheit.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
];

const SERVICES = [
  {
    icon: FileSearch,
    title: "Gap-Analyse",
    desc: "Systematische Überprüfung Ihrer Anwendung gegen alle Prüfaspekte der TR-03161. Wir identifizieren konkret, wo Handlungsbedarf besteht.",
  },
  {
    icon: Search,
    title: "Schwachstellenanalyse & Pentest",
    desc: "Technische Sicherheitsprüfung nach den Bedrohungsszenarien der TR-03161, orientiert an OWASP MASVS, ASVS und dem Mobile Security Testing Guide.",
  },
  {
    icon: ClipboardCheck,
    title: "Beratung zur Umsetzung",
    desc: "Konkrete Empfehlungen und Unterstützung bei der technischen Umsetzung der Sicherheitsanforderungen – priorisiert nach Kritikalität.",
  },
  {
    icon: Award,
    title: "Vorbereitung auf die Zertifizierung",
    desc: "Wir bereiten Sie optimal auf die offizielle Prüfung durch eine BSI-anerkannte Prüfstelle vor, damit Sie beim Zertifizierungsaudit bestmöglich aufgestellt sind.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Erstgespräch",
    desc: "Kostenlose Erstberatung: Wir verstehen Ihre Anwendung, den Entwicklungsstand und die regulatorischen Anforderungen.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Gap-Analyse",
    desc: "Systematische Überprüfung gegen die Prüfaspekte der TR-03161. Sie erhalten einen klaren Überblick über Ihren aktuellen Stand.",
    icon: FileSearch,
  },
  {
    step: "03",
    title: "Technische Prüfung",
    desc: "Durchführung der Sicherheitstests – Penetrationstest, Code-Analyse und Konfigurationsprüfung nach TR-03161-Maßstäben.",
    icon: Target,
  },
  {
    step: "04",
    title: "Bericht & Empfehlungen",
    desc: "Detaillierter Prüfbericht mit allen Findings, CVSS-Bewertungen und konkreten Handlungsempfehlungen – priorisiert nach Dringlichkeit.",
    icon: ClipboardCheck,
  },
  {
    step: "05",
    title: "Begleitung zur Zertifizierung",
    desc: "Unterstützung bei der Behebung der Findings und Vorbereitung der Dokumentation für die offizielle Zertifizierungsprüfung.",
    icon: Award,
  },
];

const TARGET_GROUPS = [
  {
    icon: Stethoscope,
    title: "DiGA-Hersteller",
    desc: "Hersteller digitaler Gesundheitsanwendungen, die ins DiGA-Verzeichnis aufgenommen werden wollen oder bereits gelistet sind.",
  },
  {
    icon: Users,
    title: "DiPA-Hersteller",
    desc: "Anbieter digitaler Pflegeanwendungen mit Sicherheitsnachweis-Pflicht gegenüber dem BfArM.",
  },
  {
    icon: Smartphone,
    title: "Healthtech-Startups",
    desc: "Junge Unternehmen im Gesundheitswesen, die von Anfang an auf sichere Entwicklung setzen wollen.",
  },
  {
    icon: Globe,
    title: "App-Entwickler im Gesundheitswesen",
    desc: "Entwicklungsdienstleister, die Gesundheitsanwendungen für Dritte entwickeln und Sicherheit nachweisen müssen.",
  },
];

const FAQS = [
  {
    q: "Was ist die BSI TR-03161?",
    a: "Die BSI TR-03161 ist eine Technische Richtlinie des Bundesamts für Sicherheit in der Informationstechnik (BSI). Sie definiert Sicherheitsanforderungen für digitale Gesundheitsanwendungen (DiGA) und ist in drei Teile unterteilt: Mobile Apps, Web-Anwendungen und Hintergrundsysteme (Backends/APIs).",
  },
  {
    q: "Ist die TR-03161 Pflicht für DiGA-Hersteller?",
    a: "Ja. Seit 2025 müssen DiGA-Hersteller die Sicherheitsanforderungen der TR-03161 nachweisen, um in das DiGA-Verzeichnis des BfArM aufgenommen zu werden. Die Grundlage dafür ist die Digitale-Gesundheitsanwendungen-Verordnung (DiGAV) sowie § 139e SGB V.",
  },
  {
    q: "Seid ihr eine BSI-anerkannte Prüfstelle?",
    a: "Nein, aktuell sind wir keine vom BSI anerkannte Prüfstelle. Das offizielle TR-03161-Zertifikat kann nur durch eine solche Stelle ausgestellt werden. Wir bieten jedoch die ideale Vorbereitung: Wir führen den gesamten technischen Prüfprozess vorab durch, identifizieren alle Schwachstellen und bereiten Sie so vor, dass Sie die offizielle Zertifizierung beim ersten Anlauf bestehen.",
  },
  {
    q: "Was passiert, wenn meine DiGA die TR-03161-Anforderungen nicht erfüllt?",
    a: "Ohne den Sicherheitsnachweis nach TR-03161 kann Ihre Anwendung nicht in das DiGA-Verzeichnis aufgenommen werden. Das bedeutet: keine Erstattungsfähigkeit durch die gesetzlichen Krankenkassen. Ein vorbereitender Test hilft Ihnen, Lücken frühzeitig zu erkennen und kostspielige Verzögerungen zu vermeiden.",
  },
  {
    q: "Wie lange dauert eine vorbereitende TR-03161-Prüfung?",
    a: "Je nach Umfang und Komplexität der Anwendung dauert eine vollständige vorbereitende Prüfung typischerweise 2–4 Wochen. Die Gap-Analyse allein kann innerhalb von 1–2 Wochen durchgeführt werden.",
  },
  {
    q: "Welche Standards bilden die Grundlage der TR-03161?",
    a: "Die TR-03161 baut maßgeblich auf etablierten OWASP-Standards auf: OWASP MASVS und dem OWASP Mobile Security Testing Guide (MASTG) für mobile Anwendungen, sowie dem OWASP ASVS für Web-Anwendungen. Unsere Prüfmethodik orientiert sich an genau diesen Frameworks.",
  },
];

export default function BSITR03161Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = useTranslations("bsiTr03161");

  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">
                BSI TR-03161 · DiGA · DiPA
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              BSI TR-03161{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Sicherheitsprüfung
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Wir bereiten Ihre digitale Gesundheitsanwendung optimal auf die
              offizielle TR-03161-Zertifizierung vor. Gap-Analyse,
              Schwachstellentests und technische Beratung – aus einer Hand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#anfrage"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                Kostenlose Erstberatung anfragen
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pentest-gesundheitsanwendungen"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-600 hover:border-gray-400 text-white font-medium rounded-lg transition-colors"
              >
                Pentest für Gesundheitsanwendungen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is TR-03161 */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Was ist die BSI TR-03161?
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Die Technische Richtlinie TR-03161 des Bundesamts für Sicherheit in
            der Informationstechnik (BSI) definiert verbindliche
            Sicherheitsanforderungen für digitale Gesundheitsanwendungen. Seit
            2025 ist der Nachweis der Konformität gesetzlich vorgeschrieben für
            die Aufnahme ins DiGA-Verzeichnis des BfArM (§ 139e SGB V).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TR_PARTS.map((part, i) => (
            <div
              key={i}
              className={`${part.bg} border rounded-xl p-6 hover:scale-[1.02] transition-transform`}
            >
              <part.icon className={`w-10 h-10 ${part.color} mb-4`} />
              <h3 className="text-lg font-bold text-white mb-2">
                {part.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {part.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why mandatory since 2025 */}
      <section className="bg-[#0a0e17] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                Warum ist das ab 2025{" "}
                <span className="text-red-400">gesetzliche Pflicht</span>?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Digitale Gesundheitsanwendungen (DiGA) können gemäß § 33a SGB V
                von Ärzten verschrieben und von gesetzlichen Krankenkassen
                erstattet werden – aber nur, wenn sie im DiGA-Verzeichnis des
                BfArM gelistet sind. Voraussetzung dafür ist seit 2025 der
                Nachweis der Datensicherheit nach BSI TR-03161.
              </p>
              <div className="space-y-4">
                {[
                  "Ohne TR-03161-Konformität keine Aufnahme ins DiGA-Verzeichnis",
                  "Keine Erstattungsfähigkeit durch gesetzliche Krankenkassen",
                  "Regulatorische Grundlage: DiGAV, § 139e SGB V",
                  "Nachweis durch Zertifikat einer BSI-anerkannten Prüfstelle",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#131927] border border-gray-700/50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <Lock className="w-6 h-6 text-blue-400" />
                  <span>Der Weg ins DiGA-Verzeichnis</span>
                </div>
                {[
                  { label: "Entwicklung", sub: "DiGA/DiPA nach Sicherheitsstandards entwickeln" },
                  { label: "Sicherheitsprüfung", sub: "Technische Prüfung nach TR-03161 (wir bereiten Sie vor)" },
                  { label: "Zertifizierung", sub: "Offizielle Prüfung durch BSI-anerkannte Stelle" },
                  { label: "BfArM-Antrag", sub: "Aufnahme ins DiGA-Verzeichnis beantragen" },
                  { label: "Erstattung", sub: "Verordnungs- und Erstattungsfähigkeit" },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-400">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{step.label}</p>
                      <p className="text-gray-400 text-sm">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Was wir konkret anbieten
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Vorbereitende Sicherheitsprüfungen nach den Prüfaspekten der BSI
            TR-03161 – von der Gap-Analyse bis zur Zertifizierungsbegleitung.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="bg-[#131927] border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-colors"
            >
              <service.icon className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Target Groups */}
      <section className="bg-[#0a0e17] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Für wen ist das?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Unsere TR-03161-Sicherheitsprüfung richtet sich an alle
              Unternehmen, die digitale Anwendungen im Gesundheitswesen
              entwickeln oder betreiben.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TARGET_GROUPS.map((group, i) => (
              <div
                key={i}
                className="bg-[#131927] border border-gray-700/50 rounded-xl p-6 text-center hover:border-green-500/30 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                    <group.icon className="w-7 h-7 text-green-400" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {group.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {group.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Unser Vorgehen
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ein klar strukturierter Prozess – von der ersten Beratung bis zur
            Begleitung in die offizielle Zertifizierung.
          </p>
        </div>
        <div className="space-y-6">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-6 bg-[#131927] border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/20 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">
                    {step.step}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to Pentest page */}
      <section className="bg-[#0a0e17] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Auch interessant: Penetrationstest für Gesundheitsanwendungen
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Sie suchen einen technisch tiefgehenden Pentest speziell für Ihre
            Gesundheitsanwendung? Unsere spezialisierte Pentest-Seite zeigt
            Ihnen, welche Bereiche wir prüfen.
          </p>
          <Link
            href="/pentest-gesundheitsanwendungen"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 border border-gray-600 hover:border-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            Mehr zum Pentest für Gesundheitsanwendungen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Häufige Fragen zur BSI TR-03161
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-[#131927] border border-gray-700/50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="anfrage" className="max-w-3xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Jetzt Erstberatung anfragen
          </h2>
          <p className="text-gray-400 text-lg">
            Kostenlos und unverbindlich – wir melden uns innerhalb von 1–2
            Werktagen bei Ihnen.
          </p>
        </div>
        <TR03161Form />
      </section>
    </main>
  );
}
