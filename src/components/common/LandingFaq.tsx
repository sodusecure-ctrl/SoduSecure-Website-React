import { SectionLabel } from '@/components/landing/ui';

export type LandingFaqItem = {
  q: string;
  a: string;
};

type LandingFaqProps = {
  faqs: LandingFaqItem[];
  label?: string;
  headline?: string;
  /**
   * FAQPage-JSON-LD mit ausgeben. Auf false setzen, wenn die Seite bereits an
   * anderer Stelle ein FAQPage-Schema rendert (pro Seite nur EIN FAQPage!).
   */
  withSchema?: boolean;
};

/**
 * Einheitlicher FAQ-Block für Landingpages, direkt vor dem Footer platzieren.
 * Nutzt natives <details>/<summary>: Antworten stehen immer im DOM
 * (indexierbar, konsistent mit FAQPage-Schema) und klappen ohne JS auf.
 * Funktioniert in Server- und Client-Komponenten, Light- und Dark-Mode
 * (premium-section/premium-card werden über html.light-Overrides umgefärbt).
 */
export default function LandingFaq({
  faqs,
  label = 'FAQ',
  headline = 'Häufige Fragen',
  withSchema = true,
}: LandingFaqProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="premium-section">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        {withSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{headline}</h2>

        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="premium-card group rounded-2xl p-6 open:ring-1 open:ring-[#FF3B30]/25 transition"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                <span>{f.q}</span>
                <span className="text-[#FF3B30] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
