import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { SectionLabel, SectionLabelDark } from '@/components/landing/ui';
import {
  RATING_AVERAGE,
  RATING_COUNT,
  STRENGTHS,
  TESTIMONIALS,
} from '@/lib/referenzenData';

const baseUrl = 'https://sodusecure.com';
const pageUrl = `${baseUrl}/referenzen`;

/**
 * BEWUSST KEIN Review- oder AggregateRating-Markup.
 *
 * Googles Richtlinien fuer Review-Snippets schliessen "self-serving reviews"
 * aus: Bewertungen ueber die Entitaet, die die Seite selbst betreibt, sind
 * nicht fuer Rich Results zugelassen. Ein AggregateRating waere hier also
 * nicht nur wirkungslos, sondern ein Verstoss - mit dem Risiko einer Manual
 * Action fuer Spam-Markup, die die gesamte Domain trifft.
 *
 * Die Note steht deshalb nur sichtbar auf der Seite, immer zusammen mit der
 * Anzahl der Stimmen. Strukturierte Bewertungen gehoeren auf Plattformen, die
 * nicht uns gehoeren - OMR Reviews, ProvenExpert, Google Unternehmensprofil.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': pageUrl,
  url: pageUrl,
  name: 'Referenzen – Was Kunden über Sodu Secure sagen',
  description:
    'Kundenstimmen zu Penetrationstests und AuditAI von Sodu Secure aus Berlin, im Original-Wortlaut.',
  isPartOf: { '@id': `${baseUrl}/#website` },
  about: { '@id': `${baseUrl}/#organization` },
  inLanguage: 'de-DE',
};

export default function ReferenzenPage() {
  return (
    <main className="bg-transparent text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionLabelDark>Kundenstimmen</SectionLabelDark>
              <h1 className="mt-6 text-[38px] font-semibold leading-[1.06] tracking-[-0.03em] md:text-5xl lg:text-6xl">
                <span className="premium-silver">Das sagen unsere Kunden</span>
                <br />
                <span className="premium-headline-accent">über Sodu Secure</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base text-white/75 md:text-lg">
                Penetrationstests und AuditAI – in Berlin gehärtet. Hier stehen die Erfahrungen unserer Kunden,
                unverändert und im Original-Wortlaut. Namen und Rollen erscheinen so, wie die Kunden der Nennung
                zugestimmt haben; wer anonym bleiben wollte, steht anonymisiert.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/request-pentest"
                  className="premium-cta inline-flex items-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
                >
                  Pentest anfragen <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/sample-report"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
                >
                  Beispielbericht ansehen <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Bewertung */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl shadow-black/20 lg:p-8">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF3B30]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
                Gesamtbewertung
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-5xl font-semibold tracking-[-0.03em] text-white">{RATING_AVERAGE}</span>
                <span className="text-lg text-white/50">/ 5</span>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Durchschnitt aus {RATING_COUNT} Kundenbewertungen, die unten vollständig nachzulesen sind.
              </p>
              <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/55">
                Diese Seite wird von Sodu Secure selbst betrieben. Unabhängig geprüfte Bewertungen finden Sie auf
                Plattformen, die nicht uns gehören – dort können Sie auch selbst bewerten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STIMMEN */}
      <section id="stimmen" className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>Im Original-Wortlaut</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
          {RATING_COUNT} Kundenstimmen
        </h2>
        <p className="mt-4 max-w-2xl text-base text-white/70">
          Unverändert übernommen. Keine Kürzungen, die die Aussage verändern, keine stilistische Glättung.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={`${item.name}-${item.role}`}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-white/25"
            >
              <Quote className="h-6 w-6 shrink-0 text-[#FF3B30]" aria-hidden />
              <blockquote className="flex-1 text-sm leading-relaxed text-white/85">{item.quote}</blockquote>
              <figcaption className="border-t border-white/10 pt-4">
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="mt-0.5 text-xs text-white/55">{item.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-7 text-center">
          <h3 className="text-base font-semibold text-white">Sie sind Kunde von Sodu Secure?</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/65">
            Teilen Sie Ihre Erfahrung – mit Ihrem Einverständnis erscheint Ihre Stimme auf dieser Seite.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
          >
            Bewertung einreichen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* STAERKEN */}
      <section id="staerken" className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <SectionLabel>Wiederkehrende Themen</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Das schätzen Kunden an Sodu Secure
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Die Punkte, die in Kundengesprächen und Bewertungen immer wieder genannt werden – und unser Anspruch
            bei jedem Projekt.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STRENGTHS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/25"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg"
                  aria-hidden
                >
                  {item.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABSCHLUSS */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            <span className="premium-silver">Überzeugen Sie sich selbst</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75">
            Penetrationstests mit persönlichem Retest, klaren Berichten und Handlungsempfehlungen – oder
            kontinuierliche Code-Sicherheit mit AuditAI.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/request-pentest"
              className="premium-cta inline-flex items-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              Pentest anfragen <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pentest-konfigurator"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
            >
              Umfang selbst festlegen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
