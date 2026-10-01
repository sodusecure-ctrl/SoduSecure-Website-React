"use client";

import Link from "next/link";
import {
  Shield,
  CheckCircle,
  FileText,
  Target,
  Lock,
  AlertTriangle,
  ArrowRight,
  Phone,
  Mail,
  ClipboardCheck,
  Radar,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

const PHONE = "(+49) 01777750985";
const PHONE_HREF = "tel:+491777750985";
const EMAIL = "info@sodusecure.com";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const serviceSteps = [
  {
    title: "ISO 27001 Scope & Gap-Analyse",
    desc: "Wir analysieren den aktuellen Reifegrad Ihres ISMS, definieren den Scope und priorisieren kritische Abweichungen gegen ISO/IEC 27001.",
  },
  {
    title: "ISMS-Design & Richtlinien",
    desc: "Aufbau der notwendigen Richtlinien, Prozesse und Rollen inklusive Asset Management, Access Control, Incident Management und Supplier Controls.",
  },
  {
    title: "Risikobewertung und Behandlungsplan",
    desc: "Durchführung einer strukturierten Risikoanalyse, Bewertung nach Eintrittswahrscheinlichkeit und Impact, anschließend Risk Treatment Plan mit Maßnahmen.",
  },
  {
    title: "Pentest-Nachweise nach A.8.8",
    desc: "Durchführung und Dokumentation technischer Tests als Nachweis für die Wirksamkeit Ihrer Sicherheitsmaßnahmen, inkl. Findings, Priorisierung und Retest.",
  },
  {
    title: "Audit-Vorbereitung",
    desc: "Mock-Audits, Dokumentencheck und Management-Briefing, damit Sie Stage-1 und Stage-2 Audit sicher bestehen.",
  },
  {
    title: "Kontinuierliche Verbesserung",
    desc: "Roadmap für Überwachungsaudits, KPI-basierte Steuerung und nachhaltige Weiterentwicklung Ihres ISMS.",
  },
];

const requirements = [
  "Kontext der Organisation und Scope sauber definieren",
  "Informationssicherheitsziele mit klaren Verantwortlichkeiten etablieren",
  "Risiken systematisch identifizieren, bewerten und behandeln",
  "Technische und organisatorische Maßnahmen dokumentiert umsetzen",
  "Wirksamkeit von Kontrollen regelmäßig prüfen (inkl. Pentests)",
  "Interne Audits und Management-Reviews nachweisbar durchführen",
];

const pentestFocus = [
  {
    icon: Radar,
    title: "Technische Schwachstellen nachweisen",
    desc: "Ein Pentest validiert, ob Sicherheitsmaßnahmen in realen Angriffsszenarien wirksam sind.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit-Evidence bereitstellen",
    desc: "Berichte mit Scope, Methodik, Findings und Retest dienen als belastbarer Nachweis für Auditoren.",
  },
  {
    icon: BadgeCheck,
    title: "Risikobehandlung priorisieren",
    desc: "Kritische Findings werden in den Risk Treatment Plan überführt und nachvollziehbar geschlossen.",
  },
];

const faq = [
  {
    q: "Wie bereiten Sie uns auf das Zertifizierungsaudit vor?",
    a: "In vier Schritten. Zuerst schneiden wir den Geltungsbereich zu und gleichen ihn in einer Gap-Analyse gegen die Normanforderungen und die Maßnahmen aus Anhang A ab. Dann priorisieren wir die offenen Punkte nach Risiko und Aufwand. Anschließend prüfen wir die technischen Maßnahmen im Penetrationstest und liefern den Bericht in Deutsch und Englisch. Zuletzt stellen wir das Nachweispaket für den Auditor zusammen, in dem jedes Finding einer Maßnahme aus Anhang A zugeordnet ist.",
  },
  {
    q: "Welche Leistungen übernehmen Sie, welche die Zertifizierungsstelle?",
    a: "Wir übernehmen die Vorbereitung: Gap-Analyse, Beratung zu den technischen Maßnahmen, Penetrationstests, Prüfberichte und Retest. Die Zertifizierungsstelle führt das zweistufige Audit durch und entscheidet über das Zertifikat. Beides in einer Hand ist nicht zulässig, denn wer aufbaut und testet, darf nicht zertifizieren. Wer das Zertifikat ausstellt und wie das Audit abläuft, lesen Sie auf unserer Seite ISO 27001 Zertifizierung.",
  },
  {
    q: "Welche ISO-27001-Controls deckt ein Penetrationstest ab?",
    a: "Vor allem Control A.8.8 zum Umgang mit technischen Schwachstellen und A.8.29 zum Sicherheitstest in Entwicklung und Abnahme. Dazu kommt Kapitel 9.1 der Norm, das die Überwachung und Bewertung der Informationssicherheitsleistung fordert. Der Testbericht liefert für alle drei Punkte belastbare Evidenz.",
  },
  {
    q: "Wie oft sollten Pentests im ISO-27001-Kontext stattfinden?",
    a: "Mindestens jährlich und zusätzlich nach wesentlichen Änderungen wie neuen Systemen, Architekturwechseln, Cloud-Migrationen oder kritischen Releases. Wichtig für das Audit ist, dass die Frequenz in Ihrem ISMS begründet festgelegt und dann auch eingehalten wird - ein einmaliger Test ohne Wiederholung fällt im Überwachungsaudit auf.",
  },
  {
    q: "Was gehört in den Scope eines ISO-27001-Pentests?",
    a: "In den Scope gehören die Systeme, die im Anwendungsbereich Ihres ISMS liegen und ein relevantes Risiko tragen: extern erreichbare Anwendungen und Dienste, zentrale interne Infrastruktur inklusive Verzeichnisdienst, Cloud-Umgebungen sowie Schnittstellen zu Dienstleistern. Der Pentest-Scope sollte sich nachvollziehbar aus Ihrer Risikoanalyse ableiten.",
  },
  {
    q: "Welche Nachweise akzeptieren ISO-27001-Auditoren?",
    a: "Auditoren akzeptieren normnahe Nachweise wie Richtlinien, Risikoakten, den Risk Treatment Plan, interne Auditprotokolle, Management-Reviews und technische Testberichte mit nachvollziehbarer Methodik. Ein Pentest-Bericht überzeugt, wenn er Scope, Vorgehen, Zeitraum, Findings mit Risikobewertung und die dokumentierte Behebung inklusive Retest enthält.",
  },
  {
    q: "Wie lange dauert die Vorbereitung auf ISO 27001?",
    a: "Je nach Ausgangslage meist 4 bis 12 Monate bis zur Audit-Reife. Unternehmen mit bereits etablierten Prozessen, gepflegter Dokumentation und laufendem Risikomanagement sind deutlich schneller. Den Engpass bilden erfahrungsgemäß nicht die technischen Maßnahmen, sondern die vollständige und konsistente Nachweisführung.",
  },
  {
    q: "Was passiert, wenn der Pentest kurz vor dem Audit kritische Lücken zeigt?",
    a: "Kritische Findings sind kein Ausschlussgrund für das Zertifikat, solange Sie sie erkannt, bewertet und in den Risk Treatment Plan überführt haben. Entscheidend ist der dokumentierte Umgang damit. Wir melden kritische Funde sofort während des Tests, damit Sie sie vor dem Audittermin behandeln und die Wirksamkeit der Korrektur ohne Zusatzkosten nachweisen können.",
  },
];

// FAQPage-JSON-LD aus GENAU dem sichtbaren faq-Array (Single Source).
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const sources = [
  {
    title: "ISO/IEC 27001:2022 Overview (ISO)",
    href: "https://www.iso.org/standard/27001",
  },
  {
    title: "ISO/IEC 27002:2022 Guidelines (ISO)",
    href: "https://www.iso.org/standard/75652.html",
  },
  {
    title: "NIST SP 800-115 Technical Guide to Information Security Testing",
    href: "https://csrc.nist.gov/publications/detail/sp/800-115/final",
  },
  {
    title: "BSI IT-Grundschutz Kompendium",
    href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html",
  },
  {
    title: "ENISA NIS2 Directive Resources",
    href: "https://www.enisa.europa.eu/topics/cybersecurity-policy/nis-directive-new",
  },
  {
    title: "OWASP Testing Guide",
    href: "https://owasp.org/www-project-web-security-testing-guide/",
  },
];

export default function ISO27001ServicePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-gray-800 bg-[#0A0A0B] py-16 lg:py-24">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-300">
            <Shield className="h-4 w-4" />
            ISO 27001 Dienstleistung für Unternehmen
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            ISO 27001 Beratung, ISMS-Aufbau und Pentest-Nachweise
          </h1>
          <p className="mt-6 max-w-3xl text-base text-gray-300 sm:text-lg">
            Wir begleiten Ihr Unternehmen von der Gap-Analyse bis zur Audit-Reife: strukturiert, evidenzbasiert und mit technischen Nachweisen. So erfüllen Sie ISO 27001 Anforderungen nicht nur auf Papier, sondern in der Praxis.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/request-pentest"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-7 py-3.5 font-semibold text-white hover:premium-cta"
            >
              <Phone className="h-5 w-5" />
              Kostenlose Beratung anfordern
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-white/5 px-7 py-3.5 font-semibold hover:bg-white/10"
            >
              <Mail className="h-5 w-5" />
              Direkt Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Was unsere ISO 27001 Dienstleistung abdeckt</h2>
          <p className="mt-3 max-w-3xl text-gray-400">
            Vollständige Begleitung für Strategie, Umsetzung und Nachweisfähigkeit.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceSteps.map((item) => (
              <article key={item.title} className="rounded-xl border border-gray-800 bg-[#131927] p-6">
                <h3 className="text-lg font-semibold text-red-400">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-800 bg-[#0b0f18] py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">ISO 27001 Anforderungen (kompakt)</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {requirements.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-800 bg-[#131927] p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <p className="text-sm text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Warum Pentests für ISO 27001 zentral sind</h2>
          <p className="mt-3 max-w-3xl text-gray-400">
            Technische Wirksamkeitsprüfung ist ein Schlüssel, um Sicherheitskontrollen glaubwürdig nachzuweisen.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {pentestFocus.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-gray-800 bg-[#131927] p-6">
                  <div className="inline-flex rounded-lg border border-red-500/30 bg-red-500/10 p-2.5">
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-800 bg-[#0b0f18] py-14 lg:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Häufige Fragen</h2>
          <div className="mt-8 space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="group rounded-xl border border-gray-800 bg-[#131927] p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-red-400">
                  <span>{item.q}</span>
                  <span aria-hidden className="text-xl leading-none text-red-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-red-400" />
            <h2 className="text-2xl font-bold sm:text-3xl">Quellen und Standards</h2>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Alle Inhalte auf dieser Seite orientieren sich an offiziellen Normen, Leitfäden und Fachstandards.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {sources.map((source) => (
              <li key={source.href} className="rounded-lg border border-gray-800 bg-[#131927] p-4">
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-sm font-medium text-red-300 hover:text-red-200"
                >
                  <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-gray-800 bg-gradient-to-br from-red-950/20 via-black to-black py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">ISO 27001 jetzt strukturiert angehen</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Lassen Sie Ihr ISMS, Ihre technischen Kontrollen und Ihre Audit-Nachweise professionell aufsetzen. Wir unterstützen Sie pragmatisch und messbar.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/request-pentest" className="rounded-lg bg-red-600 px-8 py-3.5 font-semibold hover:premium-cta">
              Beratung starten
            </Link>
            <Link href="/iso-27001" className="rounded-lg border border-gray-700 bg-white/5 px-8 py-3.5 font-semibold hover:bg-white/10">
              Zur ISO 27001 Landingpage
            </Link>
            <Link href="/iso-27001-zertifizierung" className="rounded-lg border border-gray-700 bg-white/5 px-8 py-3.5 font-semibold hover:bg-white/10">
              Ablauf der Zertifizierung
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
