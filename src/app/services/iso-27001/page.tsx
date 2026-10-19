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
    title: "Pentest-Nachweise nach A.12.6",
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
    q: "Ist ein Pentest für ISO 27001 verpflichtend?",
    a: "Die Norm verlangt den Umgang mit technischen Schwachstellen und Wirksamkeitsprüfungen von Kontrollen. In der Praxis sind regelmäßige Pentests ein sehr starker und oft erwarteter Nachweis gegenüber Auditoren.",
  },
  {
    q: "Wie oft sollten Pentests im ISO 27001 Kontext stattfinden?",
    a: "Mindestens jährlich und zusätzlich nach wesentlichen Änderungen (z. B. neue Systeme, Architekturwechsel, kritische Releases).",
  },
  {
    q: "Wie lange dauert eine ISO 27001 Vorbereitung?",
    a: "Je nach Ausgangslage meist 4 bis 12 Monate. Unternehmen mit bereits etablierten Prozessen sind deutlich schneller audit-ready.",
  },
  {
    q: "Welche Quellen akzeptieren Auditoren?",
    a: "Auditoren akzeptieren normnahe Nachweise wie Richtlinien, Risikoakten, interne Auditprotokolle, Management-Reviews und technische Testberichte mit nachvollziehbarer Methodik.",
  },
  {
    q: "Was kostet ein Pentest für ISO 27001?",
    a: "Ein automatisierter Schwachstellenscan startet bei Sodu Secure ab 1.499 €; ein manueller Pentest für ISO 27001 wird individuell auf Ihren Scope zugeschnitten und nach Aufwand kalkuliert - meist zwischen 4.000 und 20.000 €. Sie erhalten innerhalb von 24 Stunden ein Angebot, einen Bericht in Deutsch und Englisch als Audit-Nachweis sowie einen kostenlosen Retest nach Behebung der Findings.",
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
          </div>
        </div>
      </section>
    </main>
  );
}
