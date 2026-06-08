'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import { SectionLabel } from '@/components/landing/ui';
import { useBrand } from '@/components/landing/BrandContext';

const ANNUAL_DISCOUNT = 0.10;

function discountPrice(price: string): string {
  // Match the first number (with optional thousand separators , or .)
  const match = price.match(/(\d+(?:[.,]\d{3})*(?:[.,]\d+)?)/);
  if (!match) return price;
  const raw = match[1];
  const numeric = parseFloat(raw.replace(/\./g, '').replace(',', '.'));
  if (Number.isNaN(numeric)) return price;
  const discounted = Math.round(numeric * (1 - ANNUAL_DISCOUNT));
  // Detect German formatting (uses '.' as thousand sep or ',' decimal, or starts with digits then ' €')
  const isGerman = /€\s*$/.test(price) || / €/.test(price);
  const formatted = isGerman
    ? discounted.toLocaleString('de-DE')
    : discounted.toLocaleString('en-US');
  return price.replace(raw, formatted);
}

type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  audience: string;
  features: string[];
  highlight?: boolean;
  cta: { label: string; href: string };
};

type Row = { label: string; values: [boolean | string, boolean | string, boolean | string] };

type Copy = {
  brandLabel: string;
  heroLabel: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  perMonth: string;
  vatNote: string;
  compareLabel: string;
  compareHeadline: string;
  featureCol: string;
  faqLabel: string;
  faqHeadline: string;
  ctaHeadline: string;
  ctaSub: string;
  ctaButton: string;
  ctaHref: string;
  popular: string;
  plans: Plan[];
  rows: Row[];
  faq: { q: string; a: string }[];
};

// AuditAI - DE
const auditaiDe: Copy = {
  brandLabel: 'Sodu /AuditAI · Wochenbericht',
  heroLabel: 'Preise',
  heroLine1: 'Klare Pläne.',
  heroLine2: 'Keine Überraschungen.',
  heroSub: 'Pro Repo, monatlich. Jederzeit kündbar. Keine Mindestlaufzeit.',
  perMonth: ' /Monat',
  vatNote: 'Alle Preise zzgl. MwSt. Jahreszahlung: 2 Monate gratis.',
  compareLabel: 'Pläne vergleichen',
  compareHeadline: 'Alles in jedem Plan, im direkten Vergleich.',
  featureCol: 'Funktion',
  faqLabel: 'FAQ',
  faqHeadline: 'Antworten zu den Preisen.',
  ctaHeadline: 'Anfrage schicken. Wir machen den Rest.',
  ctaSub: 'Setup in 5 Minuten. Wöchentlicher Bericht ab Tag 7.',
  ctaButton: 'Jetzt starten',
  ctaHref: '/sodu-audit-ai',
  popular: 'Am beliebtesten',
  plans: [
    {
      name: 'Startup-Paket',
      price: '99 €',
      audience: 'Solo-Gründer & kleine Startups',
      features: ['1 Repository', '1 Contributor', '1 Scan pro Monat', 'DE & EN Lieferung', 'Fertige Fix-Vorschläge'],
      cta: { label: 'Startup-Paket starten', href: '/sodu-audit-ai?plan=starter' },
    },
    {
      name: 'Studio',
      price: '199 €',
      audience: 'Produkt-Teams · 1 Repo, jede Woche',
      features: ['1 Repository', 'Unbegrenzte Contributoren', 'Wöchentlicher Bericht', 'Trend-Historie & Triage', 'Priority-Support per E-Mail + Chat'],
      highlight: true,
      cta: { label: 'Studio wählen', href: '/sodu-audit-ai?plan=studio' },
    },
    {
      name: 'Pro+',
      price: '449 €',
      audience: 'Scale-ups · mehrere Repos + Pentest',
      features: ['Mehrere Repositories', 'Unbegrenzte Contributoren', 'Wöchentlicher Bericht', 'Quartalsweise Voll-Pentest (1 Repo)', 'Dedizierter Ansprechpartner'],
      cta: { label: 'Pro+ anfragen', href: '/sodu-audit-ai?plan=pro' },
    },
  ],
  rows: [
    { label: 'Repositories', values: ['1', '1', 'Mehrere'] },
    { label: 'Contributoren', values: ['1', 'Unbegrenzt', 'Unbegrenzt'] },
    { label: 'Berichts-Takt', values: ['1 Scan / Monat', 'Wöchentlich', 'Wöchentlich'] },
    { label: 'DE & EN Lieferung', values: [true, true, true] },
    { label: 'Fertige Fix-Vorschläge', values: [true, true, true] },
    { label: 'Trend-Historie & Triage', values: [false, true, true] },
    { label: 'Quartalsweise Voll-Pentest', values: [false, false, '1 Repo'] },
    { label: 'Support', values: ['E-Mail', 'E-Mail + Chat', 'Dediziert'] },
  ],
  faq: [
    { q: 'Was bekomme ich konkret jede Woche?', a: 'Einen sauberen PDF-Bericht in DE und EN: Executive Summary für die Geschäftsleitung, technische Details für Ihre Devs, mit fertigem Code-Fix zum Einfügen für jeden Befund. Genau das, was ein Senior-Security-Engineer Ihnen liefern würde - nur jede Woche und ohne Gehalt.' },
    { q: 'Brauche ich eigene Security-Leute?', a: 'Nein. Sie schicken eine Anfrage, wir machen den Rest. AuditAI ersetzt einen Teilzeit-Security-Spezialisten - ohne Recruiting, ohne Onboarding, ohne 80.000 € Jahresgehalt.' },
    { q: 'Speichern Sie unseren Code?', a: 'Nein. Repositories werden Read-only in ephemere Worker geklont und unmittelbar nach der Analyse hart gelöscht. Keine langlebigen Tokens, keine Kopien, keine Drittparteien.' },
    { q: 'Welche Sprachen und Stacks?', a: 'TS/JS, Python, Go, Java, C#, PHP, Ruby. Andere auf Anfrage. Mono-Repos und Multi-Service-Architekturen kein Problem.' },
    { q: 'Wie schnell sehe ich Ergebnisse?', a: 'Erster vollständiger Bericht innerhalb von 7 Tagen nach Repo-Verbindung. Setup dauert 5 Minuten - Anfrage schicken, wir übernehmen Anbindung und ersten Lauf.' },
    { q: 'Kann ich jederzeit kündigen?', a: 'Ja. Monatliche Abrechnung, Kündigung vor der nächsten Verlängerung. Keine Mindestlaufzeit. Sie testen und bleiben - oder gehen ohne Diskussion.' },
  ],
};

// AuditAI - EN
const auditaiEn: Copy = {
  brandLabel: 'Sodu /AuditAI · Weekly review',
  heroLabel: 'Pricing',
  heroLine1: 'Simple plans.',
  heroLine2: 'No surprises.',
  heroSub: 'Per-repository monthly pricing. Cancel any time. No minimum term.',
  perMonth: ' /mo',
  vatNote: 'All plans VAT excluded. Annual prepay: 2 months free on all plans.',
  compareLabel: 'Compare plans',
  compareHeadline: 'Everything in every plan, side by side.',
  featureCol: 'Feature',
  faqLabel: 'FAQ',
  faqHeadline: 'Pricing questions, answered.',
  ctaHeadline: 'Send a request. We handle the rest.',
  ctaSub: 'Setup in five minutes. Weekly report from day seven.',
  ctaButton: 'Request demo',
  ctaHref: '/contact',
  popular: 'Most popular',
  plans: [
    {
      name: 'Startup pack',
      price: '€99',
      audience: 'Solo founders & early startups',
      features: ['1 repository', '1 contributor', '1 scan per month', 'EN + DE deliverable', 'Paste-ready fix proposals'],
      cta: { label: 'Start Startup pack', href: '/sodu-audit-ai?plan=starter' },
    },
    {
      name: 'Studio',
      price: '€199',
      audience: 'Product teams · 1 repo, weekly',
      features: ['1 repository', 'Unlimited contributors', 'Weekly report', 'Trend history & triage view', 'Priority email + chat support'],
      highlight: true,
      cta: { label: 'Choose Studio', href: '/sodu-audit-ai?plan=studio' },
    },
    {
      name: 'Pro+',
      price: '€449',
      audience: 'Scale-ups · multi-repo + pentest',
      features: ['Multiple repositories', 'Unlimited contributors', 'Weekly report', 'Quarterly full pentest (1 repo)', 'Dedicated point of contact'],
      cta: { label: 'Request Pro+', href: '/sodu-audit-ai?plan=pro' },
    },
  ],
  rows: [
    { label: 'Repositories', values: ['1', '1', 'Multiple'] },
    { label: 'Contributors', values: ['1', 'Unlimited', 'Unlimited'] },
    { label: 'Report cadence', values: ['1 scan / month', 'Weekly', 'Weekly'] },
    { label: 'EN + DE deliverable', values: [true, true, true] },
    { label: 'Paste-ready fixes', values: [true, true, true] },
    { label: 'Trend history & triage', values: [false, true, true] },
    { label: 'Quarterly full pentest', values: [false, false, '1 repo'] },
    { label: 'Support', values: ['Email', 'Email + chat', 'Dedicated'] },
  ],
  faq: [
    { q: 'What exactly do I get every week?', a: 'A clean PDF report in EN and DE: executive summary for leadership, technical details for your devs, and a paste-ready code fix for every finding. Exactly what a senior security engineer would deliver - only every week and without the salary.' },
    { q: 'Do I need my own security people?', a: 'No. Send a request, we handle the rest. AuditAI replaces a part-time security specialist - no recruiting, no onboarding, no €80,000 annual salary.' },
    { q: 'Do you store our code?', a: 'No. Repositories are cloned read-only into ephemeral workers and hard-deleted right after the analysis. No long-lived tokens, no copies, no third parties.' },
    { q: 'Which languages and stacks?', a: 'TS/JS, Python, Go, Java, C#, PHP, Ruby. Anything else on request. Mono-repos and multi-service architectures are fine.' },
    { q: 'How fast do I see results?', a: 'First full report within 7 days of connecting the repo. Setup takes five minutes - send a request, we handle the connect and first run for you.' },
    { q: 'Can I cancel any time?', a: 'Yes. Monthly billing, cancel before next renewal. No minimum term. Try it and stay - or leave with no questions asked.' },
  ],
};

// Pentest - DE
const pentestDe: Copy = {
  brandLabel: 'Sodu /Pentest · Manuelles Testing',
  heroLabel: 'Preise',
  heroLine1: 'Festpreise.',
  heroLine2: 'Klarer Scope.',
  heroSub: 'Manuelle Penetrationstests von zertifizierten Testern. Alle Pakete inklusive Bericht (DE & EN), Fix-Empfehlungen und kostenlosem Retest.',
  perMonth: ' netto',
  vatNote: 'Alle Preise zzgl. MwSt. Endgültiger Preis nach Scoping-Call. Kostenloser Retest binnen 30 Tagen.',
  compareLabel: 'Pakete vergleichen',
  compareHeadline: 'Was ist in jedem Paket enthalten?',
  featureCol: 'Leistung',
  faqLabel: 'FAQ',
  faqHeadline: 'Häufige Fragen zum Pentest.',
  ctaHeadline: 'Pentest anfragen - Antwort innerhalb 24 Stunden.',
  ctaSub: 'Kostenloses Erstgespräch. Verbindliches Angebot binnen 48 h.',
  ctaButton: 'Pentest anfragen',
  ctaHref: '/request-pentest',
  popular: 'Am häufigsten',
  plans: [
    {
      name: 'Web-App',
      price: 'ab 2.500 €',
      audience: 'Web- oder API-Anwendung · OWASP Top 10 + Business Logic',
      features: [
        'Manueller Test einer Web-/API-Anwendung',
        'Authenticated + Unauthenticated',
        'Bericht (DE & EN, Management + Technik)',
        'Konkrete Fix-Empfehlungen',
        'Kostenloser Retest binnen 30 Tagen',
      ],
      cta: { label: 'Web-Pentest anfragen', href: '/request-pentest' },
    },
    {
      name: 'Internes Pentest',
      price: 'ab 4.900 €',
      audience: 'Internes Netzwerk + Active Directory',
      features: [
        'Netzwerk-Penetrationstest (intern)',
        'Active Directory · Privilege Escalation',
        'Lateral Movement & Domain Compromise',
        'Bericht inkl. Angriffspfad-Diagramm',
        'Kostenloser Retest binnen 30 Tagen',
      ],
      highlight: true,
      cta: { label: 'Internes Pentest anfragen', href: '/request-pentest' },
    },
    {
      name: 'Enterprise',
      price: 'individuell',
      audience: 'Multi-Scope · Red Team · Cloud / OT',
      features: [
        'Mehrere Web-/API/Netzwerk-Targets',
        'Red Team / Phishing optional',
        'Cloud (AWS / Azure / GCP) Konfig-Review',
        'Wiederholte Engagements (jährlich, quartalsweise)',
        'Dedizierter Ansprechpartner & NDA',
      ],
      cta: { label: 'Scoping-Call vereinbaren', href: '/request-pentest' },
    },
  ],
  rows: [
    { label: 'Scope', values: ['1 Web-/API-App', 'Netzwerk + AD', 'Multi-Scope'] },
    { label: 'Dauer', values: ['5–8 Tage', '8–12 Tage', 'individuell'] },
    { label: 'Methodik', values: ['OWASP / OSSTMM', 'PTES / NIST', 'Custom + Red Team'] },
    { label: 'Bericht (DE + EN)', values: [true, true, true] },
    { label: 'Manuelles Testing', values: [true, true, true] },
    { label: 'Active-Directory-Test', values: [false, true, true] },
    { label: 'Cloud-Konfigurations-Review', values: [false, false, true] },
    { label: 'Phishing / Social Engineering', values: [false, false, 'optional'] },
    { label: 'Kostenloser Retest', values: ['30 Tage', '30 Tage', '30 Tage'] },
    { label: 'Compliance-Mapping', values: ['ISO 27001 / DSGVO', 'ISO 27001 / NIS2 / BSI', 'Alle relevanten Frameworks'] },
  ],
  faq: [
    { q: 'Wie schnell startet das Pentest?', a: 'Nach Vertragsabschluss starten wir typischerweise binnen 1–2 Wochen, in dringenden Fällen auch innerhalb von 72 Stunden.' },
    { q: 'Wer testet?', a: 'Zertifizierte Tester mit OSCP+, OSWE, CEH, GPEN. Kein Outsourcing - alle Mitarbeiter sind in Deutschland angestellt.' },
    { q: 'Ist der Retest wirklich kostenlos?', a: 'Ja. Innerhalb 30 Tagen nach Bericht-Abgabe testen wir die behobenen Findings ohne Mehrkosten erneut.' },
    { q: 'Erhalten wir einen ISO-27001-konformen Bericht?', a: 'Ja. Unsere Berichte sind ISO 27001, BSI Grundschutz, NIS2 und DSGVO mappable.' },
    { q: 'Kann das Pentest unsere Systeme stören?', a: 'Wir arbeiten nicht-destruktiv und stimmen jeden potenziell impactvollen Test mit Ihnen ab. Auf Wunsch nur in der Staging-Umgebung.' },
    { q: 'Festpreis oder Tagessatz?', a: 'Festpreis nach Scoping-Call. Sie zahlen genau das, was vorab vereinbart wurde - keine versteckten Kosten.' },
  ],
};

// Pentest - EN
const pentestEn: Copy = {
  brandLabel: 'Sodu /Pentest · Manual testing',
  heroLabel: 'Pricing',
  heroLine1: 'Fixed prices.',
  heroLine2: 'Clear scope.',
  heroSub: 'Manual penetration testing by certified testers. Every package includes a bilingual report (EN + DE), fix guidance and a free retest.',
  perMonth: ' net',
  vatNote: 'All prices VAT excluded. Final price after scoping call. Free retest within 30 days.',
  compareLabel: 'Compare packages',
  compareHeadline: 'What\u2019s in every package?',
  featureCol: 'Service',
  faqLabel: 'FAQ',
  faqHeadline: 'Pentest questions, answered.',
  ctaHeadline: 'Request a pentest - reply within 24 hours.',
  ctaSub: 'Free intro call. Binding quote within 48 h.',
  ctaButton: 'Request pentest',
  ctaHref: '/request-pentest',
  popular: 'Most requested',
  plans: [
    {
      name: 'Web App',
      price: 'from €2,500',
      audience: 'Web or API · OWASP Top 10 + business logic',
      features: [
        'Manual test of a web / API application',
        'Authenticated + unauthenticated',
        'Report (EN + DE, exec + technical)',
        'Concrete remediation guidance',
        'Free retest within 30 days',
      ],
      cta: { label: 'Request web pentest', href: '/request-pentest' },
    },
    {
      name: 'Internal',
      price: 'from €4,900',
      audience: 'Internal network + Active Directory',
      features: [
        'Internal network penetration test',
        'Active Directory · privilege escalation',
        'Lateral movement & domain compromise',
        'Report incl. attack-path diagram',
        'Free retest within 30 days',
      ],
      highlight: true,
      cta: { label: 'Request internal pentest', href: '/request-pentest' },
    },
    {
      name: 'Enterprise',
      price: 'custom',
      audience: 'Multi-scope · red team · cloud / OT',
      features: [
        'Multiple web / API / network targets',
        'Red team / phishing optional',
        'Cloud (AWS / Azure / GCP) config review',
        'Recurring engagements (annual, quarterly)',
        'Dedicated contact & NDA',
      ],
      cta: { label: 'Book scoping call', href: '/request-pentest' },
    },
  ],
  rows: [
    { label: 'Scope', values: ['1 web / API app', 'Network + AD', 'Multi-scope'] },
    { label: 'Duration', values: ['5–8 days', '8–12 days', 'custom'] },
    { label: 'Methodology', values: ['OWASP / OSSTMM', 'PTES / NIST', 'Custom + red team'] },
    { label: 'Report (EN + DE)', values: [true, true, true] },
    { label: 'Manual testing', values: [true, true, true] },
    { label: 'Active Directory test', values: [false, true, true] },
    { label: 'Cloud configuration review', values: [false, false, true] },
    { label: 'Phishing / social engineering', values: [false, false, 'optional'] },
    { label: 'Free retest', values: ['30 days', '30 days', '30 days'] },
    { label: 'Compliance mapping', values: ['ISO 27001 / GDPR', 'ISO 27001 / NIS2 / BSI', 'All relevant frameworks'] },
  ],
  faq: [
    { q: 'How fast can the pentest start?', a: 'Typically within 1–2 weeks of signing; for urgent cases we can start within 72 hours.' },
    { q: 'Who performs the test?', a: 'Certified testers (OSCP+, OSWE, CEH, GPEN). No outsourcing - all staff are employed in Germany.' },
    { q: 'Is the retest really free?', a: 'Yes. Within 30 days of report delivery we retest fixed findings at no extra cost.' },
    { q: 'Will the report support ISO 27001?', a: 'Yes. Reports are mappable to ISO 27001, BSI Grundschutz, NIS2 and GDPR.' },
    { q: 'Can the pentest disrupt our systems?', a: 'We test non-destructively and align any potentially impactful test with you. Staging-only on request.' },
    { q: 'Fixed price or day rate?', a: 'Fixed price after scoping. You pay exactly what we agreed up-front - no hidden costs.' },
  ],
};

export default function PricingClient() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const { brand } = useBrand();
  const [cycle, setCycle] = useState<'monthly' | 'annually'>('monthly');

  const c: Copy =
    brand === 'pentest' ? (isEn ? pentestEn : pentestDe) : isEn ? auditaiEn : auditaiDe;

  const showCycleToggle = brand === 'auditai';
  const isAnnual = showCycleToggle && cycle === 'annually';

  const tCycle = {
    monthly: isEn ? 'Monthly' : 'Monatlich',
    annually: isEn ? 'Annually' : 'Jährlich',
    save: isEn ? 'Save 10%' : '10% sparen',
    annualNote: isEn
      ? '10% discount applied. Billed annually, equivalent monthly price shown.'
      : '10% Rabatt enthalten. Jährliche Abrechnung, angezeigt ist der äquivalente Monatspreis.',
  };

  return (
    <main className="bg-transparent text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-semibold tracking-[0.02em] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
            {c.brandLabel} · {c.heroLabel}
          </span>
          <h1 className="mt-6 max-w-4xl text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-7xl lg:text-[80px]">
            <span className="premium-silver">{c.heroLine1}</span>
            <br />
            <span className="premium-headline-accent">{c.heroLine2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/75">{c.heroSub}</p>
        </div>
      </section>

      {/* PLAN CARDS */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {showCycleToggle && (
          <div className="mb-10 flex flex-col items-center gap-3">
            <div
              role="tablist"
              aria-label={isEn ? 'Billing cycle' : 'Abrechnungszyklus'}
              className="relative inline-grid grid-cols-2 items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-[13px] font-semibold backdrop-blur-md"
            >
              <span
                aria-hidden
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#FF3B30] shadow-[0_4px_14px_rgba(255,59,48,0.45)] transition-transform duration-300 ease-out will-change-transform"
                style={{ transform: cycle === 'monthly' ? 'translateX(0%)' : 'translateX(calc(100% + 8px))' }}
              />
              <button
                type="button"
                role="tab"
                aria-selected={cycle === 'monthly'}
                onClick={() => setCycle('monthly')}
                className={
                  'relative z-10 inline-flex items-center justify-center rounded-full px-6 py-2 transition-colors duration-200 ' +
                  (cycle === 'monthly' ? 'text-white' : 'text-white/65 hover:text-white')
                }
              >
                {tCycle.monthly}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={cycle === 'annually'}
                onClick={() => setCycle('annually')}
                className={
                  'relative z-10 inline-flex items-center justify-center rounded-full px-6 py-2 transition-colors duration-200 ' +
                  (cycle === 'annually' ? 'text-white' : 'text-white/65 hover:text-white')
                }
              >
                {tCycle.annually}
              </button>
            </div>
          </div>
        )}
        <div className="grid gap-5 lg:grid-cols-3">
          {c.plans.map((p) => {
            const displayPrice = isAnnual ? discountPrice(p.price) : p.price;
            return (
            <article
              key={p.name}
              className={
                'relative flex flex-col rounded-3xl border p-8 transition ' +
                (p.highlight ? 'border-[#0A0A0B] bg-[#0A0A0B] text-white' : 'border-white/10 bg-[#16141A] hover:border-white/20')
              }
            >
              {p.highlight && (
                <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-[#FF3B30] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  {c.popular}
                </span>
              )}
              <div className={'text-xs font-semibold uppercase tracking-[0.18em] ' + (p.highlight ? 'text-white/60' : 'text-[#6B7280]')}>
                {p.name}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                {isAnnual && p.price !== displayPrice && (
                  <span className={'premium-tabular text-2xl font-semibold line-through ' + (p.highlight ? 'text-white/35' : 'text-[#9AA0A6]')}>
                    {p.price}
                  </span>
                )}
                <span className="premium-tabular text-5xl font-extrabold tracking-tight">{displayPrice}</span>
                <span className={'text-sm ' + (p.highlight ? 'text-white/60' : 'text-[#6B7280]')}>{c.perMonth}</span>
              </div>
              <p className={'mt-2 text-sm ' + (p.highlight ? 'text-white/70' : 'text-[#525866]')}>{p.audience}</p>

              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={'mt-0.5 h-4 w-4 ' + (p.highlight ? 'text-[#FF3B30]' : 'text-white')} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.cta.href + (isAnnual ? '?cycle=annually' : '')}
                className={
                  'mt-10 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition ' +
                  (p.highlight ? 'premium-cta text-white' : 'bg-[#0A0A0B] text-white hover:bg-black')
                }
              >
                {p.cta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-[#6B7280]">
          {isAnnual ? tCycle.annualNote : c.vatNote}
        </p>
      </section>

      {/* COMPARE */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <SectionLabel>{c.compareLabel}</SectionLabel>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{c.compareHeadline}</h2>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#16141A]">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#16141A]">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">{c.featureCol}</th>
                  {c.plans.map((p) => (
                    <th key={p.name} className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.label} className="border-b border-white/8 last:border-b-0">
                    <td className="px-6 py-4 text-white">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-6 py-4 text-white">
                        {v === true ? (
                          <Check className="h-4 w-4 text-[#067647]" />
                        ) : v === false ? (
                          <X className="h-4 w-4 text-[#9AA0A6]" />
                        ) : (
                          <span className="text-sm text-[#525866]">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-24">
        <SectionLabel>{c.faqLabel}</SectionLabel>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{c.faqHeadline}</h2>
        <div className="mt-10 space-y-3">
          {c.faq.map((f) => (
            <details key={f.q} className="premium-card group rounded-2xl p-6 open:ring-1 open:ring-[#FF3B30]/25 transition">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                <span>{f.q}</span>
                <span className="text-[#FF3B30] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
            <span className="premium-silver">{c.ctaHeadline}</span>
          </h2>
          <p className="mt-4 text-white/60">{c.ctaSub}</p>
          <Link
            href={c.ctaHref}
            className="mt-8 inline-flex items-center gap-1.5 premium-cta rounded-full px-6 py-3.5 text-sm font-semibold text-white"
          >
            {c.ctaButton} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
