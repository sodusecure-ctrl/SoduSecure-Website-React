import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import RiskCheckLanding from '../pentest-risiko-check/RiskCheckLanding';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Welche Gesetze treffen auf mein Unternehmen zu? NIS2, DSGVO, DORA & MDR Check | Sodu Secure',
  description:
    'Compliance-Schnellcheck in 60 Sekunden: Beantworten Sie 5 Fragen zu Branche, Größe und Daten und erfahren Sie sofort, ob NIS2, DSGVO, DORA oder MDR auf Ihr Unternehmen zutrifft – mit Rechtsgrundlage. Kostenlos & ohne Anmeldung.',
  keywords: [
    'welche gesetze treffen auf mich zu', 'bin ich von NIS2 betroffen', 'NIS2 Betroffenheit prüfen',
    'NIS2 Betroffenheitscheck', 'DORA Betroffenheit', 'MDR Pflicht', 'DSGVO Pflicht',
    'Compliance Check', 'Cybersicherheit Gesetze', 'NIS2 DSGVO DORA MDR', 'Pentest Pflicht',
  ],
  openGraph: {
    title: 'Welche Gesetze treffen auf mein Unternehmen zu? NIS2, DSGVO, DORA & MDR',
    description: 'Compliance-Schnellcheck: In 5 Fragen erfahren Sie, ob NIS2, DSGVO, DORA oder MDR auf Sie zutrifft – mit Rechtsgrundlage.',
    url: `${baseUrl}/welche-gesetze-treffen-zu`,
    type: 'website',
    siteName: 'Sodu Secure',
    locale: 'de_DE',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Compliance-Check NIS2 DSGVO DORA MDR – Sodu Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welche Gesetze treffen auf mein Unternehmen zu? NIS2, DSGVO, DORA & MDR',
    description: 'Compliance-Schnellcheck: In 5 Fragen zur Betroffenheit von NIS2, DSGVO, DORA oder MDR.',
  },
  alternates: { canonical: `${baseUrl}/welche-gesetze-treffen-zu` },
  robots: { index: true, follow: true },
};

export default async function Page() {
  const locale = await getLocale();
  const isDe = locale !== 'en';

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – Compliance-Check (NIS2, DSGVO, DORA, MDR)',
    description: 'Kostenloser Compliance-Schnellcheck: Welche Cybersicherheits-Verordnung (NIS2, DSGVO, DORA, MDR) verpflichtet Ihr Unternehmen? Anschließend prüfsicherer Penetrationstest-Nachweis.',
    url: `${baseUrl}/welche-gesetze-treffen-zu`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['Compliance Assessment', 'NIS2', 'DORA', 'MDR', 'DSGVO', 'Penetrationstest'],
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Welche Cybersicherheits-Gesetze können auf mein Unternehmen zutreffen?',
        acceptedAnswer: { '@type': 'Answer', text: 'In Deutschland sind das vor allem vier: die NIS2-Richtlinie (für wichtige und wesentliche Einrichtungen ab einer bestimmten Größe), die DSGVO (für jedes Unternehmen, das personenbezogene Daten verarbeitet), DORA (für den Finanz- und Versicherungssektor) und die MDR (für Hersteller von Medizinprodukt-Software). Unser Schnellcheck zeigt anhand von Branche, Größe und Daten, welche davon auf Sie zutrifft.' },
      },
      {
        '@type': 'Question',
        name: 'Bin ich von NIS2 betroffen?',
        acceptedAnswer: { '@type': 'Answer', text: 'NIS2 betrifft Unternehmen in erfassten Sektoren (u. a. Energie, Transport, Gesundheit, digitale Dienste, Produktion) ab einer Größe von mindestens 50 Beschäftigten oder über 10 Mio. € Jahresumsatz. Ab 250 Beschäftigten bzw. über 50 Mio. € Umsatz gelten Sie in hochkritischen Sektoren als „wesentliche Einrichtung".' },
      },
      {
        '@type': 'Question',
        name: 'Verlangen diese Verordnungen einen Penetrationstest?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ja. NIS2 (Art. 21), DORA (Art. 24–27, inkl. TLPT), MDR (Anhang I, MDCG 2019-16) und DSGVO (Art. 32) verlangen regelmäßige Sicherheitstests bzw. den Nachweis wirksamer technischer Maßnahmen. Ein Penetrationstest ist hierfür das anerkannte Mittel.' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <RiskCheckLanding isDe={isDe} variant="compliance" />
    </>
  );
}
