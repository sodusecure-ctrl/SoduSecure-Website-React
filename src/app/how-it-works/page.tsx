import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { ArrowRight, FileText, GitBranch, Layers, Workflow } from 'lucide-react';
import { SectionLabel, SectionLabelDark, FeatureCard } from '@/components/landing/ui';

export const metadata: Metadata = {
  title: 'So funktioniert es - Sodu AuditAI',
  description:
    'Anbinden, prüfen, vergleichen, berichten. Vier Schritte für ein kontinuierliches KI-gestütztes Security-Review Ihres Codes. Jeden Montag.',
};

type Copy = {
  heroLabel: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  steps: { n: string; t: string; d: string; bullets: string[]; icon: React.ReactNode }[];
  whatLabel: string;
  whatHeadline: string;
  features: { title: string; text: string; icon: React.ReactNode }[];
  ctaLine1: string;
  ctaAccent: string;
  ctaButton: string;
};

const de: Copy = {
  heroLabel: 'So funktioniert es',
  heroLine1: 'Vier Schritte.',
  heroLine2: 'Jeden Montag.',
  heroSub: 'Vom Anbinden bis zum Bericht in unter 30 Minuten Aufwand - einmalig. Danach läuft es einfach.',
  steps: [
    {
      n: '01',
      t: 'Anbinden',
      d: 'GitHub-App installieren oder Read-only-Token einsetzen. Wir klonen das Repo in einen isolierten Worker und fassen Production nie an.',
      icon: <GitBranch className="h-6 w-6" />,
      bullets: ['GitHub-App oder Token', 'Read-only Zugriff', 'Self-hosted möglich'],
    },
    {
      n: '02',
      t: 'Prüfen',
      d: 'Multi-Pass KI-Review mit adversarialer Verifikation. Wir folgen Datenflüssen, Auth-Pfaden, Secret-Handling und Business-Logik.',
      icon: <Workflow className="h-6 w-6" />,
      bullets: ['Datenfluss-Analyse', 'Auth- & Access-Checks', 'Secret-Leak-Erkennung'],
    },
    {
      n: '03',
      t: 'Vergleichen',
      d: 'Diff-bewusst gegenüber dem letzten Lauf. Quick-Wins, Regressionen und wieder eingeführte Befunde sind separat markiert.',
      icon: <Layers className="h-6 w-6" />,
      bullets: ['Trend-Tracking', 'Regressions-Alerts', 'False-Positive-Gedächtnis'],
    },
    {
      n: '04',
      t: 'Berichten',
      d: 'Ein sauberes PDF jeden Montag im Postfach. Executive Summary oben, technischer Anhang unten, fertige Fixes überall.',
      icon: <FileText className="h-6 w-6" />,
      bullets: ['DE & EN Lieferung', 'Fertige Fix-Vorschläge', 'Severity pro Befund'],
    },
  ],
  whatLabel: 'Was Sie bekommen',
  whatHeadline: 'Weniger Lärm. Mehr behobene Bugs.',
  features: [
    { title: 'Ein wöchentlicher Bericht', text: 'Ein PDF, Executive oben, technischer Anhang unten.', icon: <FileText className="h-5 w-5" /> },
    { title: 'Trend über Zeit', text: 'Regressionen und Verbesserungen Woche für Woche auf einen Blick.', icon: <Layers className="h-5 w-5" /> },
    { title: 'Fixes statt Tickets', text: 'Jeder Befund kommt mit fertigem Code-Fix zum Einfügen.', icon: <Workflow className="h-5 w-5" /> },
  ],
  ctaLine1: 'Holen Sie sich Ihren ersten Bericht ',
  ctaAccent: 'in 7 Tagen',
  ctaButton: 'Repo verbinden',
};

const en: Copy = {
  heroLabel: 'How it works',
  heroLine1: 'Four steps.',
  heroLine2: 'Every Monday.',
  heroSub: 'From connect to report in less than 30 minutes of human work - once. Then it just runs.',
  steps: [
    {
      n: '01',
      t: 'Connect',
      d: 'Install our GitHub App or paste a read-only token. We clone the repo into an isolated worker and never touch production.',
      icon: <GitBranch className="h-6 w-6" />,
      bullets: ['GitHub App or token', 'Read-only access', 'Self-host option'],
    },
    {
      n: '02',
      t: 'Review',
      d: 'Multi-pass AI review with adversarial verification. We follow data flow, authentication paths, secret handling and business logic.',
      icon: <Workflow className="h-6 w-6" />,
      bullets: ['Data-flow reasoning', 'Auth & access checks', 'Secret-leak detection'],
    },
    {
      n: '03',
      t: 'Compare',
      d: 'Diff-aware against the last run. Quick-wins, regressions and re-introduced findings are flagged separately.',
      icon: <Layers className="h-6 w-6" />,
      bullets: ['Trend tracking', 'Regression alerts', 'False-positive memory'],
    },
    {
      n: '04',
      t: 'Report',
      d: 'A clean PDF lands in your inbox every Monday. Executive summary on top, technical appendix below, paste-ready fixes everywhere.',
      icon: <FileText className="h-6 w-6" />,
      bullets: ['EN + DE deliverable', 'Paste-ready fixes', 'Per-finding severity'],
    },
  ],
  whatLabel: 'What you get',
  whatHeadline: 'Less noise. More fixed bugs.',
  features: [
    { title: 'One weekly report', text: 'Single PDF, exec on top, technical appendix below.', icon: <FileText className="h-5 w-5" /> },
    { title: 'Trend over time', text: 'Week-over-week regressions and improvements at a glance.', icon: <Layers className="h-5 w-5" /> },
    { title: 'Fixes, not tickets', text: 'Each finding ships with a paste-ready code fix.', icon: <Workflow className="h-5 w-5" /> },
  ],
  ctaLine1: 'Get your first report ',
  ctaAccent: 'in 7 days',
  ctaButton: 'Connect a repo',
};

export default async function HowItWorksPage() {
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
        </div>
      </section>

      {/* STEPS */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        {/* dezente vertikale Pfadlinie auf Desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 hidden h-[calc(100%-12rem)] w-px -translate-x-1/2 lg:block"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(255,59,48,0.35) 12%, rgba(255,59,48,0.35) 88%, transparent 100%)',
          }}
        />
        <ol className="relative grid gap-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
          {c.steps.map((s, i) => (
            <li
              key={s.n}
              className="group relative overflow-hidden rounded-3xl border border-white/10 premium-card p-8"
            >
              {/* Akzent-Glow oben */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,59,48,0.6) 50%, transparent 100%)',
                }}
              />
              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF3B30] transition group-hover:border-[#FF3B30]/40 group-hover:bg-[#FF3B30]/10">
                  {s.icon}
                </div>
                <span className="font-mono text-sm font-semibold tracking-wider text-[#FF3B30]/80">
                  {s.n}
                </span>
              </div>
              <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                {s.t}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">{s.d}</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/80"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              {/* Pfeil-Verbindung zum nächsten Schritt (nur Desktop) */}
              {i < c.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -bottom-9 left-1/2 hidden h-9 -translate-x-1/2 items-end justify-center lg:flex"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#FF3B30]/40 bg-[#0A0A0B] text-[#FF3B30] shadow-[0_0_24px_rgba(255,59,48,0.35)]">
                    <ArrowRight className="h-3.5 w-3.5 rotate-90" />
                  </span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* WHAT YOU GET */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <SectionLabel>{c.whatLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">
            {c.whatHeadline}
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {c.features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} text={f.text} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
            <span className="premium-silver">{c.ctaLine1}</span>
            <span className="premium-headline-accent">{c.ctaAccent}</span>
            <span className="premium-silver">.</span>
          </h2>
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
