import { ExternalLink } from 'lucide-react';

export type TrustedSource = { label: string; url: string };

/**
 * Belegter Info-Block für Landingpages: 1–3 informative Sätze plus Links zu
 * offiziellen Quellen (BSI, OWASP, NIST, MITRE, EUR-Lex, ISO …). Stärkt
 * E-E-A-T-Signale, ohne auf Wettbewerber zu verlinken.
 */
export default function TrustedSources({
  title = 'Fundiert nach anerkannten Standards',
  paragraphs,
  sources,
}: {
  title?: string;
  paragraphs: string[];
  sources: TrustedSource[];
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">{title}</h2>
        <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-white/70">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-5 mb-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
          Offizielle Quellen
        </p>
        <div className="flex flex-wrap gap-2">
          {sources.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              {s.label}
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
