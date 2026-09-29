import type { Metadata } from 'next';
import PricingClient from './PricingClient';
import { PENTEST_FAQ_DE } from './faq';

export const metadata: Metadata = {
  title: 'Preise - Sodu Secure · Pentest & AuditAI',
  description:
    'Automatisierter Schwachstellen-Scan ab 1.500 €, manuelle Penetrationstests individuell (Preis ermitteln) und AuditAI-Wochenbericht ab 99 €/Monat. Brand-Toggle wechselt die Pakete.',
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
