import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { ArrowRight, Cpu, Eye, Key, Lock, Shield, Trash2 } from 'lucide-react';
import { SectionLabel, SectionLabelDark, FeatureCard } from '@/components/landing/ui';

export const metadata: Metadata = {
  title: 'Sicherheit & Vertrauen - Sodu AuditAI',
  description:
    'So gehen wir mit Ihrem Code um: Read-only-Zugriff, kurzlebige Tokens, isolierte Worker, hart gelöschte Artefakte, DSGVO-konforme Verarbeitung.',
};

type Pillar = { icon: React.ReactNode; t: string; d: string };

type Copy = {
  heroLabel: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  pillarsLabel: string;
  pillarsHeadline: string;
  flowLabel: string;
  flowHeadline: string;
  faqLabel: string;
  faqHeadline: string;
  ctaHeadline: string;
  ctaSub: string;
  ctaButton: string;
  pillars: Pillar[];
  flow: [string, string, string][];
  faq: { q: string; a: string }[];
};

const de: Copy = {
  heroLabel: 'Sicherheit & Vertrauen',
  heroLine1: 'Ihr Code.',
  heroLine2: 'Ihre Kontrolle.',
  heroSub: 'Wir behandeln Ihr Repository, wie wir unseres behandeln möchten. Minimale Zugriffe. Minimale Aufbewahrung. Maximale Transparenz.',
  pillarsLabel: 'Wie wir mit Code umgehen',
  pillarsHeadline: 'Sechs Garantien, von denen wir nicht abweichen.',
  flowLabel: 'Datenfluss',
  flowHeadline: 'Vom Repo zum Bericht - und wieder zu nichts.',
  faqLabel: 'FAQ',
  faqHeadline: 'Vertrauensfragen, beantwortet.',
  ctaHeadline: 'Brauchen Sie eine AVV vor dem Start?',
  ctaSub: 'Standard-AVV auf Anfrage, Unterzeichnung innerhalb eines Werktags.',
  ctaButton: 'AVV anfragen',
  pillars: [
    { icon: <Eye className="h-5 w-5" />, t: 'Read-only Zugriff', d: 'Wir können nie in Ihr Repository schreiben. Keine PRs, keine Branch-Pushes.' },
    { icon: <Key className="h-5 w-5" />, t: 'Kurzlebige Tokens', d: 'OAuth über Ihr Versionssystem. Tokens sind eingegrenzt, zeitlich begrenzt und werden rotiert.' },
    { icon: <Cpu className="h-5 w-5" />, t: 'Isolierte Worker', d: 'Jede Analyse läuft in einem ephemeren, single-tenant Container.' },
    { icon: <Trash2 className="h-5 w-5" />, t: 'Hart gelöscht', d: 'Artefakte und Clones werden zerstört, sobald der Bericht erzeugt ist.' },
    { icon: <Lock className="h-5 w-5" />, t: 'Keine Langzeit-Speicherung', d: 'Wir bauen kein Korpus aus Ihrem Code. Punkt.' },
    { icon: <Shield className="h-5 w-5" />, t: 'DSGVO-konform', d: 'Verarbeitung in der EU. Standard-AVV verfügbar bevor Sie starten.' },
  ],
  flow: [
    ['01', 'Auth', 'Kurzlebiger OAuth-Token über Ihr Versionssystem.'],
    ['02', 'Klonen', 'Read-only Clone in einen ephemeren Worker.'],
    ['03', 'Analysieren', 'Multi-Pass-Review in isoliertem Container.'],
    ['04', 'Zerstören', 'Worker, Clone und Zwischenartefakte werden gelöscht.'],
  ],
  faq: [
    { q: 'Trainieren Sie KI-Modelle auf unserem Code?', a: 'Nein. Ihr Repository wird nie zum Training irgendeines Modells verwendet - weder unseres noch eines Drittanbieters.' },
    { q: 'Wo findet die Verarbeitung statt?', a: 'Innerhalb der EU. Auf Anfrage können wir auf eine bestimmte Region eingrenzen.' },
    { q: 'Können wir den Analyser selbst hosten?', a: 'Ja, in Pro+-Plänen bieten wir einen Self-hosted Runner, der den Quellcode in Ihrem Perimeter behält.' },
    { q: 'Was passiert, wenn ein Token leakt?', a: 'Tokens sind kurzlebig und eingegrenzt. Im Versionssystem widerrufen - der nächste Lauf schlägt sicher fehl.' },
  ],
};

const en: Copy = {
  heroLabel: 'Security & trust',
  heroLine1: 'Your code.',
  heroLine2: 'Your control.',
  heroSub: "We treat your repository the way we'd expect ours to be treated. Minimum access. Minimum retention. Maximum transparency.",
  pillarsLabel: 'How we handle code',
  pillarsHeadline: "Six guarantees we don't bend.",
  flowLabel: 'Data flow',
  flowHeadline: 'From repo to report - and back to nothing.',
  faqLabel: 'FAQ',
  faqHeadline: 'Trust questions, answered.',
  ctaHeadline: 'Need a DPA before you start?',
  ctaSub: 'Standard DPA available on request, signed within one business day.',
  ctaButton: 'Request DPA',
  pillars: [
    { icon: <Eye className="h-5 w-5" />, t: 'Read-only access', d: 'We can never write to your repository. No PR creation, no branch pushes.' },
    { icon: <Key className="h-5 w-5" />, t: 'Short-lived tokens', d: 'OAuth via your VCS. Tokens are scoped, time-limited and rotated.' },
    { icon: <Cpu className="h-5 w-5" />, t: 'Isolated workers', d: 'Every analysis runs in an ephemeral, single-tenant container.' },
    { icon: <Trash2 className="h-5 w-5" />, t: 'Hard-deleted', d: 'Artefacts and clones are destroyed once the report is generated.' },
    { icon: <Lock className="h-5 w-5" />, t: 'No long-term code retention', d: 'We do not build a corpus from your code. Period.' },
    { icon: <Shield className="h-5 w-5" />, t: 'GDPR-aware', d: 'EU processing. Standard DPA available before you start.' },
  ],
  flow: [
    ['01', 'Auth', 'Short-lived OAuth token via your VCS.'],
    ['02', 'Clone', 'Read-only clone into an ephemeral worker.'],
    ['03', 'Analyse', 'Multi-pass review in an isolated container.'],
    ['04', 'Destroy', 'Worker, clone and intermediate artefacts deleted.'],
  ],
  faq: [
    { q: 'Do you train AI models on our code?', a: 'No. Your repository is never used to train any model - ours or third-party.' },
    { q: 'Where does processing happen?', a: 'Within the EU. We can scope to a specific region on request.' },
    { q: 'Can we self-host the analyser?', a: 'Yes, on Pro+ plans we offer a self-hosted runner that keeps source inside your perimeter.' },
    { q: 'What happens if a token leaks?', a: 'Tokens are short-lived and scoped. Revoke in your VCS and the next run will fail closed.' },
  ],
};

export default async function SecurityPage() {
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

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.pillarsLabel}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.pillarsHeadline}</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.pillars.map((p) => (
            <FeatureCard key={p.t} icon={p.icon} title={p.t} text={p.d} />
          ))}
        </div>
      </section>

      {/* DATA FLOW */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <SectionLabel>{c.flowLabel}</SectionLabel>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{c.flowHeadline}</h2>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] md:grid-cols-2 xl:grid-cols-4">
            {c.flow.map(([n, t, d]) => (
              <li key={n} className="bg-[#16141A] p-7">
                <span className="font-mono text-xs text-[#6B7280]">{n}</span>
                <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-[#525866]">{d}</p>
              </li>
            ))}
          </ol>
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
