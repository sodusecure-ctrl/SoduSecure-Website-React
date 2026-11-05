import type { Metadata } from 'next';
import PricingClient from './PricingClient';
import { PENTEST_FAQ_DE } from './faq';

export const metadata: Metadata = {
  title: 'Preise - Sodu Secure · Pentest & AuditAI',
  description:
    'Schwachstellen-Scan ab 1.499 €, manuelle Penetrationstests individuell kalkuliert und AuditAI ab 99 € im Monat. Alle Pakete im Überblick.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PENTEST_FAQ_DE.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PricingClient />
    </>
  );
}
