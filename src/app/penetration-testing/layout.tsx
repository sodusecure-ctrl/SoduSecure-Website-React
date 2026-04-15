import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Penetrationstest Berlin – Preis sofort berechnen | Zertifizierte Experten',
  description:
    'Ist Ihre Website hackbar? Jetzt testen lassen. Manueller Penetrationstest für Web, API, AD & Netzwerke – OSCP-zertifiziert. Preis sofort im Online-Konfigurator berechnen. Festpreis ab 2.500 €.',
  keywords: [
    'Penetrationstest',
    'Penetration Testing',
    'Pentesting',
    'Penetration Test',
    'Penetrationstest Deutschland',
    'Penetrationstest Berlin',
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
    title: 'Penetrationstest Berlin – Preis sofort berechnen | Zertifizierte Experten',
    description:
      'Ist Ihre Website hackbar? Jetzt testen lassen. Manueller Pentest für Web, API, AD & Netzwerke. Preis sofort im Online-Konfigurator berechnen. Festpreis ab 2.500 €.',
    url: `${baseUrl}/penetration-testing`,
    type: 'website',
    siteName: 'SODU Secure',
    images: [
      {
        url: `${baseUrl}/images/blogs/image9.png`,
        width: 1200,
        height: 630,
        alt: 'Penetrationstest & Pentesting – SODU Secure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penetrationstest & Pentesting – Zertifizierte Pentester | SODU Secure',
    description:
      'SODU Secure – professioneller Penetrationstest für Web, API, AD & Netzwerke. Zertifizierte Experten. Festpreis ab 2.500 €.',
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
    name: 'SODU Secure – Penetrationstest & Pentesting',
    description:
      'Professioneller Penetrationstest für Unternehmen: Web-Applikationen, Netzwerke, APIs, Active Directory und Cloud. SODU Secure liefert manuelle, OWASP-konforme Penetrationstests mit priorisierten Berichten.',
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist ein Penetrationstest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein Penetrationstest (Pentest) ist ein autorisierter, simulierter Angriff auf ein IT-System, um Sicherheitslücken zu identifizieren, bevor ein echter Angreifer sie ausnutzen kann. Dabei werden manuelle Techniken eingesetzt, um Schwachstellen zu verketten und reale Angriffspfade nachzuweisen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet ein Penetrationstest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein Penetrationstest kostet bei SODU Secure ab 2.500 € für fokussierte Web-App-Tests bis 15.000 €+ für umfassende KMU-Engagements inkl. Active Directory und Phishing-Simulation. Alle Preise sind Festpreise ohne versteckte Tagessätze.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie lange dauert ein Penetrationstest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein fokussierter Web-App-Pentest dauert 3–5 Werktage. Ein vollständiges KMU-Engagement inkl. Active Directory und Phishing dauert 7–15 Werktage. Die genaue Dauer hängt vom Scope und der Anzahl der Zielsysteme ab.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist der Unterschied zwischen Pentesting und Vulnerability Scanning?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein Vulnerability Scan ist automatisiert und liefert eine Liste potenzieller Schwachstellen ohne manuelle Validierung. Beim Pentesting werden diese Schwachstellen von menschlichen Experten aktiv ausgenutzt, zu Angriffspfaden verknüpft und auf echte Ausnutzbarkeit geprüft – mit null Falschmeldungen.',
        },
      },
    ],
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
