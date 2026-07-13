import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { ArrowRight, Briefcase, FileText, Layers, Sparkles, Users } from 'lucide-react';
import { SectionLabel, SectionLabelDark, FeatureCard, StatRow } from '@/components/landing/ui';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Für Agenturen - Sodu AuditAI',
  description:
    'Wöchentliches KI-Security-Review für jedes Kunden-Repo. Multi-Tenant, DE & EN, White-Label-fähig. Security als wiederkehrende Umsatzlinie.',
};

type Feature = { icon: React.ReactNode; title: string; text: string };

type Copy = {
  heroLabel: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  whyLabel: string;
  whyHeadline: string;
  features: Feature[];
  stats: { value: string; label: string }[];
  partnerLabel: string;
  partnerHeadline: string;
  partnerSteps: [string, string, string][];
  ctaHeadline: string;
  ctaSub: string;
  ctaButton: string;
};

const de: Copy = {
  heroLabel: 'Für Agenturen',
  heroLine1: 'Security as a Service.',
  heroLine2: 'Ohne eigenes Team.',
  heroSub: 'Eine wiederkehrende Security-Linie für jedes Kunden-Mandat. Ein Abo, jedes Repo, jeden Montag.',
  ctaPrimary: 'Partnerschaft besprechen',
  ctaSecondary: 'Studio-Plan ansehen',
  whyLabel: 'Warum Agenturen Studio wählen',
  whyHeadline: 'Ein Vertrag. Jeder Kunde. Jede Woche.',
  features: [
    { icon: <Layers className="h-5 w-5" />, title: 'Multi-Repo Standard', text: 'Kunden-Repos im Volumen-Tier hinzufügen. Keine Sitz-Mathematik.' },
    { icon: <FileText className="h-5 w-5" />, title: 'Co-Branded Bericht', text: 'Übergeben Sie Ihrem Kunden Montag ein sauberes PDF. Optional White-Label in Pro+.' },
    { icon: <Briefcase className="h-5 w-5" />, title: 'Wiederkehrender Umsatz', text: 'Stellen Sie Kunden ein Security-Retainer in Rechnung - ohne Lieferaufwand.' },
    { icon: <Users className="h-5 w-5" />, title: 'Triage-Ansicht über alle Kunden', text: 'Repo-übergreifendes Dashboard, das Ihr Lead-Dev in 5 Minuten überfliegt.' },
    { icon: <Sparkles className="h-5 w-5" />, title: 'Quick-Wins markiert', text: 'Junior-Devs können einfache Fixes am selben Tag liefern. Seniors machen den Rest.' },
    { icon: <FileText className="h-5 w-5" />, title: 'DE & EN inklusive', text: 'Übergeben Sie Kunden eine Sprache - ohne Zusatzschritt.' },
  ],
  stats: [
    { value: '199 €', label: 'Studio-Plan / Monat' },
    { value: 'Multi-Repo', label: 'Inklusive' },
    { value: 'DE + EN', label: 'Bericht' },
    { value: 'White-Label', label: 'In Pro+' },
  ],
  partnerLabel: 'So arbeiten wir zusammen',
  partnerHeadline: 'Drei Schritte. Dann läuft es jeden Montag.',
  partnerSteps: [
    ['01', 'Onboarding', 'Sie verbinden das erste Kunden-Repo. Wir helfen bei den Token-Scopes.'],
    ['02', 'Bündeln', 'Security-Retainer auf die Kundenrechnung. Wir bleiben im Hintergrund.'],
    ['03', 'Liefern', 'Jeden Montag landet ein co-branded PDF. Sie reviewen, Sie liefern Fixes.'],
  ],
  ctaHeadline: 'Security in jedes Retainer.',
  ctaSub: 'Anfrage schicken, wir liefern den ersten Bericht. Sehen Sie ihn, bevor Sie ihn verkaufen.',
  ctaButton: 'Partner werden',
};

const en: Copy = {
  heroLabel: 'For agencies',
  heroLine1: 'Security as a service.',
  heroLine2: 'Without the team.',
  heroSub: 'Add a recurring security line to every client engagement. One subscription, every repo, every Monday.',
  ctaPrimary: 'Talk partnerships',
  ctaSecondary: 'See Studio plan',
  whyLabel: 'Why agencies pick Studio',
  whyHeadline: 'One contract. Every client. Every week.',
  features: [
    { icon: <Layers className="h-5 w-5" />, title: 'Multi-repo by default', text: 'Add client repositories at a per-repo volume tier. No seat math.' },
    { icon: <FileText className="h-5 w-5" />, title: 'Co-branded report', text: 'Hand the client a clean PDF on Monday. Optional white-label on Pro+.' },
    { icon: <Briefcase className="h-5 w-5" />, title: 'Recurring revenue line', text: 'Bill clients a security retainer with zero delivery overhead.' },
    { icon: <Users className="h-5 w-5" />, title: 'Triage view across clients', text: 'Cross-repo dashboard so your lead dev can scan everything in 5 minutes.' },
    { icon: <Sparkles className="h-5 w-5" />, title: 'Quick-Wins highlighted', text: 'Junior devs can ship the easy fixes the same day. Seniors handle the rest.' },
    { icon: <FileText className="h-5 w-5" />, title: 'EN + DE included', text: 'Hand the same client either deliverable, no extra step.' },
  ],
  stats: [
    { value: '€199', label: 'Studio plan / mo' },
    { value: 'Multi-repo', label: 'Included' },
    { value: 'EN+DE', label: 'Output' },
    { value: 'White-label', label: 'On Pro+' },
  ],
  partnerLabel: 'How we partner',
  partnerHeadline: 'Three steps. Then it ships every Monday.',
  partnerSteps: [
    ['01', 'Onboard', 'You connect the first client repo. We help with token scopes.'],
    ['02', 'Bundle', 'Add the security retainer to the client invoice. We stay in the back.'],
    ['03', 'Deliver', 'Every Monday a co-branded PDF arrives. You review, you ship fixes.'],
  ],
  ctaHeadline: 'Add security to every retainer.',
  ctaSub: 'Send a request, we deliver the first report. See it before you sell it.',
  ctaButton: 'Become a partner',
};

export default async function ForAgenciesPage() {
  const locale = await getLocale();
  const c = locale === 'en' ? en : de;

  return (
    <main className="bg-transparent text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <SectionLabelDark>{c.heroLabel}</SectionLabelDark>
          <h1 className="mt-6 max-w-4xl text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-7xl lg:text-[80px]">
            <span className="premium-silver">{c.heroLine1}</span>
            <br />
            <span className="premium-headline-accent">{c.heroLine2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/75">{c.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 premium-cta rounded-full px-5 py-3 text-sm font-semibold text-white"
            >
              {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.whyLabel}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.whyHeadline}</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {c.features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} text={f.text} />
          ))}
        </div>

        <div className="mt-12">
          <StatRow items={c.stats} />
        </div>
      </section>

      {/* HOW WE PARTNER */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <SectionLabel>{c.partnerLabel}</SectionLabel>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{c.partnerHeadline}</h2>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] md:grid-cols-3">
            {c.partnerSteps.map(([n, t, d]) => (
              <li key={n} className="bg-[#16141A] p-8">
                <span className="font-mono text-xs text-[#6B7280]">{n}</span>
                <h3 className="mt-3 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-[#525866]">{d}</p>
              </li>
            ))}
          </ol>
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
            href="/contact"
            className="mt-8 inline-flex items-center gap-1.5 premium-cta rounded-full px-6 py-3.5 text-sm font-semibold text-white"
          >
            {c.ctaButton} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
