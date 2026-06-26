import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import CorporateLanding from './CorporateLanding';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Penetrationstests für Unternehmen – Zertifiziert & DSGVO-konform | SODU Secure',
  description:
    'Professionelle Penetrationstests von OSCP-zertifizierten Experten aus der DACH-Region. Manuell, prüfsicher für ISO 27001, NIS2, DORA & DSGVO. Festpreisangebot innerhalb von 24 Stunden.',
  keywords: [
    'Penetrationstest Unternehmen', 'Pentest Anbieter', 'IT-Sicherheit', 'OSCP', 'ISO 27001 Pentest',
    'NIS2', 'DORA', 'DSGVO Sicherheitstest', 'Pentest Deutschland', 'Penetration Testing Deutschland',
  ],
  openGraph: {
    title: 'Penetrationstests für Unternehmen – Zertifiziert & DSGVO-konform',
    description: 'Manuelle Penetrationstests von zertifizierten Experten. Prüfsicher für ISO 27001, NIS2, DORA & DSGVO. Angebot in 24 Stunden.',
    url: `${baseUrl}/corporate`,
    type: 'website',
    siteName: 'SODU Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'SODU Secure – Penetrationstests für Unternehmen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penetrationstests für Unternehmen – SODU Secure',
    description: 'Manuelle, zertifizierte Penetrationstests. Prüfsicher für ISO 27001, NIS2, DORA & DSGVO.',
  },
  alternates: { canonical: `${baseUrl}/corporate` },
  robots: { index: true, follow: true },
};

export default async function Page() {
  const locale = await getLocale();
  const isDe = locale !== 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SODU Secure',
    description: 'Professionelle Penetrationstests und IT-Sicherheit für Unternehmen in der DACH-Region.',
    url: `${baseUrl}/corporate`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['Pentest', 'Penetrationstest', 'IT-Sicherheit', 'Ethical Hacking'],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CorporateLanding isDe={isDe} />
    </>
  );
}
