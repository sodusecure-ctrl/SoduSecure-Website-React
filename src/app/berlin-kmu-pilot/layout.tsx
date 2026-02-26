import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Berlin KMU Pilotprogramm 2026 – Kostenloser Pentest | SODU Secure',
  description: 'Kostenloser Pentest für Berliner KMUs. Externer Pentest, Active Directory Analyse und Phishing-Simulation im Wert von bis zu 15.000 € – kostenfrei für 2 ausgewählte Unternehmen. Jetzt bewerben.',
  keywords: [
    'Pentest Berlin',
    'Pentest KMU',
    'KMU Cybersecurity Berlin',
    'kostenloser Pentest',
    'IT-Sicherheit KMU',
    'IT Security KMU',
    'Active Directory Analyse',
    'Phishing Simulation',
    'Phishing Kampagne',
    'Penetration Testing Berlin',
    'KMU Security',
    'SODU Secure Pilotprogramm',
    'Cybersecurity Pilotprogramm 2026',
    'IT-Sicherheitscheck Berlin',
    'Gratis Pentest KMU',
    'Pentest Kosten',
    'Pentest Angebot',
    'Cybersecurity Schulung',
    'IT Security Schulung',
    'Hacker Angriff Simulation',
    'Cyberangriff simulieren',
    'Pentest Firma',
    'Pentest Web',
    'Cybersecurity KMU',
  ],
  openGraph: {
    title: 'Berlin KMU Pilotprogramm 2026 – Kostenloser Pentest – Nur 2 Plätze frei',
    description: 'Vollständiger Pentest, Active Directory Analyse & Phishing-Simulation für Berliner KMUs. Wert bis 15.000 € – kostenfrei für 2 ausgewählte Unternehmen.',
    url: `${baseUrl}/berlin-kmu-pilot`,
    type: 'website',
    siteName: 'SODU Secure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berlin KMU Pilotprogramm 2026 – Kostenloser Pentest | SODU Secure',
    description: 'Kostenloser Pentest für Berliner KMUs. Jetzt einen der 2 verbleibenden Plätze sichern.',
  },
  alternates: {
    canonical: `${baseUrl}/berlin-kmu-pilot`,
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

export default function BerlinKMUPilotLayout({ children }: { children: React.ReactNode }) {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SODU Secure GmbH – KMU Cybersecurity Pilotprogramm Berlin',
    description: 'Kostenloser Penetrationstest für Berliner KMUs. Externer Pentest, Active Directory Analyse und Phishing-Simulation.',
    url: `${baseUrl}/berlin-kmu-pilot`,
    logo: `${baseUrl}/icons/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
    areaServed: ['Berlin', 'Brandenburg', 'Deutschland'],
    serviceType: ['Pentest KMU', 'Penetrationstest', 'Phishing Simulation', 'Active Directory Analyse'],
    telephone: '+49-179-239-6294',
    email: 'sodusecure@gmail.com',
    priceRange: '0€ (Pilotprogramm)',
    offers: {
      '@type': 'Offer',
      name: 'KMU Cybersecurity Pilotprogramm 2026',
      description: 'Vollständiger Pentest inkl. Active Directory Analyse und Phishing-Simulation – kostenfrei für ausgewählte Berliner KMUs.',
      price: '0',
      priceCurrency: 'EUR',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ist das KMU Pilotprogramm wirklich vollständig kostenfrei?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Es entstehen für Sie keine Kosten. Im Gegenzug bitten wir Sie um ehrliches Feedback, ein Testimonial bei Zufriedenheit sowie die Erlaubnis, Ihr Logo als Referenz zu nutzen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet ein Pentest für KMUs normalerweise?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein vollständiger KMU Pentest inkl. Active Directory Analyse und Phishing-Simulation kostet marktüblich zwischen 8.000 und 15.000 €. Im Pilotprogramm erhalten ausgewählte Berliner KMUs diesen Service kostenfrei.',
        },
      },
      {
        '@type': 'Question',
        name: 'Für wen ist das Berliner Pentest Pilotprogramm geeignet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das Programm richtet sich an KMUs in Berlin und Brandenburg mit 20–150 Mitarbeitern, Microsoft-basierter Infrastruktur (M365/Active Directory) und einem Ansprechpartner für IT-Sicherheit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie lange dauert der Pentest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Von Kick-off bis Abschlusspräsentation rechnen Sie mit 2–4 Wochen, abhängig von der Größe Ihrer Infrastruktur.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      {children}
    </>
  );
}
