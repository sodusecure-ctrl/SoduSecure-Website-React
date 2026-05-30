import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { ArrowRight, Download, ExternalLink, FileText, GitBranch } from 'lucide-react';
import { SectionLabel, SectionLabelDark } from '@/components/landing/ui';

export const metadata: Metadata = {
  title: 'Beispielbericht - Sodu AuditAI',
  description:
    'Vorschau eines wöchentlichen Sodu-AuditAI-Berichts. Executive Summary, priorisierte Befunde, fertige Fixes - DE & EN.',
};

type Finding = {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  cwe: string;
  note: string;
};

type Copy = {
  heroLabel: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pdfLabel: string;
  pdfHeadline: string;
  pdfSub: string;
  pdfDownload: string;
  pdfOpen: string;
  pdfFallback: string;
  coverWeek: string;
  coverRepo: string;
  coverHeadline: string;
  coverMeta: string;
  statNew: string;
  statFixed: string;
  statOverdue: string;
  findingsLabel: string;
  findingsHeadline: string;
  fixLabel: string;
  ctaHeadline: string;
  ctaSub: string;
  ctaButton: string;
  findings: Finding[];
};

const de: Copy = {
  heroLabel: 'Beispielbericht',
  heroLine1: 'Montag früh.',
  heroLine2: 'Ein PDF. Fertig.',
  heroSub: 'So sieht ein echter Wochen-Bericht aus - Executive Summary, priorisierte Befunde, fertige Fixes.',
  ctaPrimary: 'Echtes Beispiel für Ihr Repo',
  ctaSecondary: 'Vorschau ansehen',
  pdfLabel: 'Original-PDF',
  pdfHeadline: 'Der echte Bericht. Direkt im Browser.',
  pdfSub: 'Genau das, was Sie Montag früh in Ihrem Postfach finden - Executive Summary, Befunde, Fixes.',
  pdfDownload: 'PDF herunterladen',
  pdfOpen: 'In neuem Tab öffnen',
  pdfFallback: 'Browser kann das PDF nicht inline anzeigen.',
  coverWeek: 'Woche 47 · 2026',
  coverRepo: 'Repository',
  coverHeadline: 'Wöchentliches Security-Review.',
  coverMeta: 'Erstellt 2026-11-23 · 38 Seiten · DE',
  statNew: 'Neu',
  statFixed: 'Behoben',
  statOverdue: 'Überfällig',
  findingsLabel: 'Befunde (Auszug)',
  findingsHeadline: 'Priorisiert. Umsetzbar.',
  fixLabel: 'Fertiger Fix',
  ctaHeadline: 'Wollen Sie das für Ihr Repo?',
  ctaSub: 'Anfrage schicken, wir übernehmen Setup und ersten Bericht.',
  ctaButton: 'Demo anfragen',
  findings: [
    { id: 'A-2026-014', title: 'Broken Access Control im Admin-Endpoint', severity: 'High', cwe: 'CWE-284', note: 'Neu diese Woche · betrifft /api/admin/*' },
    { id: 'A-2026-015', title: 'Token im Klartext im Local Storage', severity: 'Medium', cwe: 'CWE-922', note: 'Regression · wieder eingeführt in Commit 4f9e3b1' },
    { id: 'A-2026-016', title: 'Fehlendes Rate-Limit auf /api/login', severity: 'Medium', cwe: 'CWE-307', note: 'Wiederkehrend · offen seit Woche 41' },
    { id: 'A-2026-017', title: 'Veraltete Dependency: lodash 4.17.20', severity: 'Low', cwe: 'CWE-1104', note: 'Neu · Patch-Version verfügbar' },
  ],
};

const en: Copy = {
  heroLabel: 'Sample report',
  heroLine1: 'Monday morning.',
  heroLine2: 'One PDF. Done.',
  heroSub: 'Below is what a real weekly report looks like - exec summary, prioritised findings, paste-ready fixes.',
  ctaPrimary: 'Get a real one for your repo',
  ctaSecondary: 'Skim the preview',
  pdfLabel: 'Original PDF',
  pdfHeadline: 'The real report. Right in your browser.',
  pdfSub: 'Exactly what you find in your inbox Monday morning - exec summary, findings, fixes.',
  pdfDownload: 'Download PDF',
  pdfOpen: 'Open in new tab',
  pdfFallback: 'Your browser can\u2019t show the PDF inline.',
  coverWeek: 'Week 47 · 2026',
  coverRepo: 'Repository',
  coverHeadline: 'Weekly security review.',
  coverMeta: 'Generated 2026-11-23 · 38 pages · EN',
  statNew: 'New',
  statFixed: 'Fixed',
  statOverdue: 'Overdue',
  findingsLabel: 'Findings (excerpt)',
  findingsHeadline: 'Prioritised. Actionable.',
  fixLabel: 'Paste-ready fix',
  ctaHeadline: 'Want this for your repo?',
  ctaSub: 'Send a request, we handle setup and the first report.',
  ctaButton: 'Request demo',
  findings: [
    { id: 'A-2026-014', title: 'Broken access control in admin endpoint', severity: 'High', cwe: 'CWE-284', note: 'New this week · Affects /api/admin/*' },
    { id: 'A-2026-015', title: 'Plain-text token persisted to local storage', severity: 'Medium', cwe: 'CWE-922', note: 'Regression · Re-introduced in commit 4f9e3b1' },
    { id: 'A-2026-016', title: 'Missing rate limit on /api/login', severity: 'Medium', cwe: 'CWE-307', note: 'Recurring · Open since week 41' },
    { id: 'A-2026-017', title: 'Outdated dependency: lodash 4.17.20', severity: 'Low', cwe: 'CWE-1104', note: 'New · Patch version available' },
  ],
};

const sevColor: Record<string, string> = {
  High: 'bg-[#FEEAE6] text-[#B42318]',
  Medium: 'bg-[#FFFAEB] text-[#B54708]',
  Low: 'bg-[#EEF4FF] text-[#3538CD]',
};

export default async function SampleReportPage() {
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
              href="/get-started/starter"
              className="inline-flex items-center gap-1.5 premium-cta rounded-full px-5 py-3 text-sm font-semibold text-white"
            >
              {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#preview"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              {c.ctaSecondary} <Download className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section id="preview" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Cover */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-3 shadow-[0_30px_80px_-30px_rgba(255,59,48,0.25)]">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
              style={{ backgroundImage: 'radial-gradient(60% 50% at 100% 0%, rgba(255,59,48,0.12), transparent 60%)' }}
              aria-hidden
            />
            <div className="relative flex aspect-[3/4] flex-col rounded-2xl border border-white/10 premium-card p-8">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
                  Sodu <span className="text-[#FF3B30]">/AuditAI</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{c.coverWeek}</span>
              </div>
              <div className="mt-auto">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">{c.coverRepo}</div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-sm text-white/90">
                  <GitBranch className="h-3.5 w-3.5 text-[#FF3B30]" />
                  acme-org/checkout-service
                </div>
                <h3 className="mt-8 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  <span className="premium-silver">{c.coverHeadline}</span>
                </h3>
                <p className="mt-3 text-sm text-white/55">{c.coverMeta}</p>

                <div className="mt-8 grid grid-cols-3 gap-2.5 text-center">
                  <div className="rounded-xl border border-[#FF3B30]/25 bg-[#FF3B30]/10 p-3">
                    <div className="premium-tabular text-2xl font-bold text-[#FF6B61]">4</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/55">{c.statNew}</div>
                  </div>
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                    <div className="premium-tabular text-2xl font-bold text-emerald-300">7</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/55">{c.statFixed}</div>
                  </div>
                  <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-3">
                    <div className="premium-tabular text-2xl font-bold text-amber-300">2</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/55">{c.statOverdue}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Findings */}
          <div>
            <SectionLabel>{c.findingsLabel}</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{c.findingsHeadline}</h2>
            <div className="mt-8 space-y-3">
              {c.findings.map((f) => (
                <article key={f.id} className="rounded-2xl border border-white/10 premium-card p-5 transition hover:border-white/20">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B7280]">#{f.id}</span>
                    <span className={'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ' + sevColor[f.severity]}>
                      {f.severity}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-[#525866]">{f.cwe} · {f.note}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A0A0B] p-5 text-sm text-white">
              <div className="flex items-center gap-2 text-[#FF3B30]">
                <FileText className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.18em]">{c.fixLabel}</span>
              </div>
              <pre className="mt-3 overflow-x-auto text-[12px] leading-relaxed">
{`if (!user || !user.roles.includes('admin')) {
  return NextResponse.json(
    { error: 'forbidden' },
    { status: 403 },
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* PDF EMBED */}
      <section id="pdf" className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionLabel>{c.pdfLabel}</SectionLabel>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{c.pdfHeadline}</h2>
              <p className="mt-3 text-[#525866]">{c.pdfSub}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/pdf/weekly-security-report.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                <Download className="h-4 w-4" /> {c.pdfDownload}
              </a>
              <a
                href="/pdf/weekly-security-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#16141A] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
              >
                <ExternalLink className="h-4 w-4" /> {c.pdfOpen}
              </a>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#16141A] shadow-[0_30px_80px_-30px_rgba(11,13,16,0.25)]">
            <object
              data="/pdf/weekly-security-report.pdf#view=FitH"
              type="application/pdf"
              className="h-[80vh] w-full"
              aria-label="Sodu AuditAI weekly security report sample"
            >
              <div className="flex h-[60vh] flex-col items-center justify-center gap-4 bg-[#FAFAFA] p-8 text-center">
                <FileText className="h-10 w-10 text-[#9AA0A6]" />
                <p className="text-sm text-[#525866]">{c.pdfFallback}</p>
                <a
                  href="/pdf/weekly-security-report.pdf"
                  download
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-5 py-3 text-sm font-semibold text-white"
                >
                  <Download className="h-4 w-4" /> {c.pdfDownload}
                </a>
              </div>
            </object>
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
            <span className="premium-silver">{c.ctaHeadline}</span>
          </h2>
          <p className="mt-4 text-white/60">{c.ctaSub}</p>
          <Link
            href="/get-started/starter"
            className="mt-8 inline-flex items-center gap-1.5 premium-cta rounded-full px-6 py-3.5 text-sm font-semibold text-white"
          >
            {c.ctaButton} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
