import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Schwachstellenscan als Service | Regelmäßig & validiert',
  description:
    'Regelmäßiger Schwachstellenscan für Unternehmen - automatisiert gescannt, von Pentestern validiert. Priorisierte Ergebnisse statt Rohberichte. Monatlich oder quartalsweise. Jetzt anfragen.',
  keywords: [
    'Schwachstellenscan',
    'Vulnerability Scan',
    'Schwachstellenscan Unternehmen',
    'Schwachstellen Scan Service',
    'regelmäßiger Schwachstellenscan',
    'externer Schwachstellenscan',
    'Schwachstellenmanagement',
    'Vulnerability Management Service',
    'Schwachstellenscan Kosten',
    'NIS2 Schwachstellenmanagement',
  ],
  openGraph: {
    title: 'Schwachstellenscan als Service | Sodu Secure',
    description:
      'Automatisierte Schwachstellenscans mit manueller Validierung durch Pentester - regelmäßig, priorisiert, NIS2-tauglich.',
    url: `${baseUrl}/schwachstellenscan`,
    type: 'website',
    siteName: 'Sodu Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Schwachstellenscan – Sodu Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schwachstellenscan als Service',
    description: 'Regelmäßige Schwachstellenscans, von Pentestern validiert und priorisiert.',
  },
  alternates: { canonical: `${baseUrl}/schwachstellenscan` },
  robots: { index: true, follow: true },
};

export default function SchwachstellenscanLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – Schwachstellenscan als Service',
    description: 'Regelmäßige automatisierte Schwachstellenscans mit manueller Validierung durch zertifizierte Pentester.',
    url: `${baseUrl}/schwachstellenscan`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['Vulnerability Scanning', 'Vulnerability Management', 'Schwachstellenscan'],
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
