import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Penetration Testing Anbieter – Zertifiziert & Transparent | SODU Secure',
  description:
    'Penetration Testing Anbieter aus Berlin. SODU Secure – zertifizierte Pentester, transparente Festpreise, schnelle Umsetzung. Pentest Anbieter für KMU & Enterprise. Jetzt Pentest konfigurieren.',
  keywords: [
    'Penetration Testing Anbieter',
    'Pentest Anbieter',
    'Pentesting Anbieter',
    'Pentest Anbieter Deutschland',
    'Pentest Anbieter Berlin',
    'bester Pentest Anbieter',
    'Penetration Testing Anbieter vergleichen',
    'zertifizierter Pentest Anbieter',
    'seriöser Pentest Anbieter',
    'Pentest Anbieter KMU',
    'Pentest Anbieter Enterprise',
    'Penetration Testing Dienstleister',
    'IT-Sicherheitsdienstleister Pentest',
    'Security Testing Anbieter',
    'SODU Secure Anbieter',
    'Pentest Anbieter Festpreis',
    'Penetrationstest Dienstleister',
  ],
  openGraph: {
    title: 'Penetration Testing Anbieter – Zertifiziert & Transparent | SODU Secure',
    description:
      'Zertifizierter Pentest Anbieter aus Berlin. OSCP-, CEH-zertifizierte Pentester. Transparente Festpreise ab 2.500 €. Pentest Anbieter für KMU & Enterprise.',
    url: `${baseUrl}/penetration-testing-anbieter`,
    type: 'website',
    siteName: 'SODU Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Penetration Testing Anbieter – SODU Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penetration Testing Anbieter – SODU Secure Berlin',
    description: 'Zertifizierter Pentest Anbieter aus Berlin – OSCP, CEH, ISO 27001. Festpreis ab 2.500 €. Sofort konfigurieren.',
  },
  alternates: { canonical: `${baseUrl}/penetration-testing-anbieter` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function PenetrationTestingAnbieterLayout({ children }: { children: React.ReactNode }) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SODU Secure – Penetration Testing Anbieter',
    description: 'Zertifizierter Penetration Testing Anbieter aus Berlin. OSCP-, CEH-zertifizierte Pentester. Manuelle Penetrationstests für KMU und Enterprise. Festpreis ab 2.500 €.',
    url: `${baseUrl}/penetration-testing-anbieter`,
    logo: `${baseUrl}/icons/logo.png`,
    image: `${baseUrl}/images/blogs/image9.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressRegion: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland', 'Europe'],
    serviceType: ['Penetration Testing', 'Pentesting', 'Security Audit', 'Red Team Testing'],
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
    sameAs: ['https://www.sodusecure.com'],
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Wie wählt man den richtigen Pentest Anbieter?', acceptedAnswer: { '@type': 'Answer', text: 'Achten Sie auf: (1) Zertifizierungen der Pentester (OSCP, CEH), (2) Festpreis vs. Tagessatz, (3) Manuelles Testing vs. reiner Scan-Report, (4) Retest inklusive, (5) Compliance-Eignung der Berichte, (6) direkte Kommunikation mit dem Pentester.' } },
      { '@type': 'Question', name: 'Was unterscheidet SODU Secure von anderen Pentest Anbietern?', acceptedAnswer: { '@type': 'Answer', text: 'SODU Secure ist ein zertifizierter Pentest Anbieter (OSCP, CEH, ISO 27001) mit 100% manuellen Tests, transparenten Festpreisen ab 2.500 €, direktem Pentester-Kontakt und compliance-fähigen Berichten für NIS2, ISO 27001 und DSGVO.' } },
    ],
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Penetration Testing Anbieter', item: `${baseUrl}/penetration-testing-anbieter` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      {children}
    </>
  );
}
