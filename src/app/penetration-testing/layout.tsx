import { Metadata } from 'next';
import { FAQS } from './faq';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  // Diese Seite rankte fuer "pentest kosten" anstelle von /pentest-kosten und
  // nahm ihr damit das Ranking weg. Der Titel gibt das Kosten-Keyword daher ab
  // und besetzt stattdessen die Transaktionsabsicht. Description von 212 auf
  // unter 160 Zeichen gekuerzt - alles darueber schneidet Google ab.
  title: { absolute: 'Pentest Preis berechnen | Angebot in 24 Stunden' },
  description:
    'Pentest-Umfang online zusammenstellen und Preisspanne sofort sehen. Web, API, Netzwerk und Active Directory. Verbindliches Angebot innerhalb von 24 Stunden.',
  keywords: [
    'Pentest',
    'Pentest Kosten',
    'Pentest Angebot',
    'Pentest Konfigurator',
    'Pentest Anbieter',
    'Penetrationstest',
    'Penetration Testing',
    'Pentesting',
    'Penetration Test',
    'Penetrationstest Deutschland',
    'Pentest durchführen',
    'manueller Penetrationstest',
    'professioneller Pentest',
    'Web Application Penetrationstest',
    'Netzwerk Penetrationstest',
    'API Penetrationstest',
    'Active Directory Penetrationstest',
    'Cloud Penetrationstest',
    'Ethical Hacking',
    'NIS2 Penetrationstest',
    'ISO 27001 Penetrationstest',
    'Penetrationstest Kosten',
    'Pentest Zertifizierung',
    'was ist ein Penetrationstest',
    'Penetrationstest Ablauf',
    'OWASP Penetrationstest',
    'Red Team Test',
  ],
  openGraph: {
    title: 'Pentest Preis berechnen | Angebot in 24 Stunden',
    description:
      'Pentest vom zertifizierten Anbieter - Kosten sofort im Konfigurator berechnen. Schwachstellenscan ab 1.499 €, manueller Pentest individuell kalkuliert. Bericht mit Fix-Empfehlungen und kostenlosem Retest.',
    url: `${baseUrl}/penetration-testing`,
    type: 'website',
    siteName: 'Sodu Secure',
    images: [
      {
        url: `${baseUrl}/images/blogs/image9.png`,
        width: 1200,
        height: 630,
        alt: 'Penetrationstest & Pentesting – Sodu Secure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pentest Kosten & Angebot | Sodu Secure',
    description:
      'Pentest vom zertifizierten Anbieter - Kosten sofort im Konfigurator berechnen. Schwachstellenscan ab 1.499 €, manueller Pentest individuell kalkuliert.',
  },
  alternates: {
    canonical: `${baseUrl}/penetration-testing`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PenetrationTestingLayout({ children }: { children: React.ReactNode }) {
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – Penetrationstest & Pentesting',
    description:
      'Professioneller Penetrationstest für Unternehmen: Web-Applikationen, Netzwerke, APIs, Active Directory und Cloud. Sodu Secure liefert manuelle, OWASP-konforme Penetrationstests mit priorisierten Berichten.',
    url: `${baseUrl}/penetration-testing`,
    logo: `${baseUrl}/icons/logo.png`,
    image: `${baseUrl}/images/blogs/image9.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin',
      addressCountry: 'DE',
    },
    areaServed: ['Germany', 'Austria', 'Switzerland', 'Europe'],
    serviceType: [
      'Penetrationstest',
      'Pentesting',
      'Web Application Pentest',
      'Netzwerk Penetrationstest',
      'Active Directory Pentest',
      'Cloud Penetrationstest',
    ],
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Penetrationstest', item: `${baseUrl}/penetration-testing` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      {children}
    </>
  );
}
