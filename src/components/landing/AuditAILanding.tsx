import Link from 'next/link';
import { ArrowRight, Check, FileText, GitBranch, Lock, Shield, Sparkles, Workflow, Zap } from 'lucide-react';
import { SectionLabel } from './ui';

export type AuditAILandingCopy = {
  eyebrow: string;
  h1Top: string;
  h1Accent: string;
  heroSub: string;
  heroPills: string[];
  primaryCta: string;
  primaryHref?: string;
  secondaryCta: string;
  secondaryHref?: string;
  trustEyebrow: string;
  featureLabel: string;
  featureHeadline: string;
  featureSub: string;
  features: { icon: 'sparkles' | 'zap' | 'file' | 'shield' | 'lock' | 'workflow' | 'git'; title: string; text: string }[];
  stepsLabel: string;
  stepsHeadline: string;
  steps: { n: string; t: string; d: string }[];
  faqLabel: string;
  faqHeadline: string;
  faq: { q: string; a: string }[];
  ctaH2: string;
  ctaSub: string;
  ctaButton: string;
};

const ICONS = {
  sparkles: <Sparkles className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  file: <FileText className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  lock: <Lock className="h-5 w-5" />,
  workflow: <Workflow className="h-5 w-5" />,
  git: <GitBranch className="h-5 w-5" />,
};

export default function AuditAILanding({ c }: { c: AuditAILandingCopy }) {
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
            {c.eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] md:text-6xl lg:text-7xl">
            <span className="premium-silver">{c.h1Top}</span>
            <br />
            <span className="premium-headline-accent">{c.h1Accent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/75">{c.heroSub}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={c.primaryHref ?? '/contact'}
              className="premium-cta inline-flex items-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              {c.primaryCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={c.secondaryHref ?? '/sample-report'}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              {c.secondaryCta}
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {c.heroPills.map((p) => (
              <span key={p} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">{c.trustEyebrow}</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <SectionLabel>{c.featureLabel}</SectionLabel>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">{c.featureHeadline}</h2>
          <p className="mt-4 text-white/70">{c.featureSub}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {c.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 premium-card p-6 transition hover:border-white/20">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
                {ICONS[f.icon]}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <SectionLabel>{c.stepsLabel}</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">{c.stepsHeadline}</h2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-white/10 premium-card p-6">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B61]">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.faqLabel}</SectionLabel>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">{c.faqHeadline}</h2>
        <div className="mt-10 space-y-3">
          {c.faq.map((f) => (
            <details key={f.q} className="premium-card group rounded-2xl p-6 open:ring-1 open:ring-[#FF3B30]/25 transition">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-white font-semibold">
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
            <span className="premium-silver">{c.ctaH2}</span>
          </h2>
          <p className="mt-6 text-white/65">{c.ctaSub}</p>
          <Link
            href={c.primaryHref ?? '/contact'}
            className="mt-10 inline-flex items-center gap-1.5 premium-cta rounded-full px-6 py-3.5 text-sm font-semibold text-white"
          >
            {c.ctaButton} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* JSON-LD FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: c.faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-white/85">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
            <Check className="h-3 w-3" />
          </span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}
