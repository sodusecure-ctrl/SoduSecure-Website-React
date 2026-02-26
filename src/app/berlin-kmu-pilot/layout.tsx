import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Pentest Berlin – Kostenloser Penetrationstest für KMUs | SODU Secure',
  description: 'Pentest Berlin: Professioneller Penetrationstest für Berliner KMUs – kostenlos im Pilotprogramm 2026. Externer Pentest, Active Directory Analyse, Phishing-Simulation & Management-Report. Nur noch 2 Plätze frei. Jetzt bewerben.',
  keywords: [
    'Pentest Berlin',
    'Penetrationstest Berlin',
    'Pentest KMU Berlin',
    'Pentest Kosten Berlin',
    'kostenloser Pentest Berlin',
    'IT-Sicherheit Berlin',
    'Cybersecurity Berlin',
    'Penetration Testing Berlin',
    'Pentest Anbieter Berlin',
    'Pentest Firma Berlin',
    'Pentest KMU',
    'KMU Cybersecurity Berlin',
    'Active Directory Pentest',
    'Active Directory Analyse Berlin',
    'Phishing Simulation Berlin',
    'Phishing Test Berlin',
    'IT Security Audit Berlin',
    'IT-Sicherheitscheck Berlin',
    'Sicherheitstest Berlin',
    'Vulnerability Assessment Berlin',
    'Schwachstellenanalyse Berlin',
    'Red Team Berlin',
    'Ethical Hacking Berlin',
    'DSGVO Pentest',
    'Pentest Deutschland',
    'Pentest Brandenburg',
    'Netzwerk Pentest Berlin',
    'Web Application Pentest Berlin',
    'Cloud Security Berlin',
    'IT Sicherheitsberatung Berlin',
  ],
  openGraph: {
    title: 'Pentest Berlin – Kostenloser Penetrationstest für Berliner KMUs | SODU Secure',
    description: 'Professioneller Pentest in Berlin: Externer Pentest, Active Directory Analyse & Phishing-Simulation – kostenfrei für 2 ausgewählte KMUs. Wert bis 15.000 €.',
    url: `${baseUrl}/berlin-kmu-pilot`,
    type: 'website',
    siteName: 'SODU Secure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pentest Berlin – Kostenloser Penetrationstest für KMUs | SODU Secure',
    description: 'Pentest Berlin: Professioneller Penetrationstest für Berliner KMUs. Nur noch 2 von 7 Plätzen frei – jetzt bewerben.',
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
    name: 'SODU Secure GmbH – Pentest Berlin für KMUs',
    description: 'Pentest Berlin: Professioneller Penetrationstest für Berliner KMUs. Externer Pentest, Active Directory Analyse, Phishing-Simulation und Management-Report – kostenfrei im Pilotprogramm.',
    url: `${baseUrl}/berlin-kmu-pilot`,
    logo: `${baseUrl}/icons/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin',
      addressCountry: 'DE',
    },
    areaServed: ['Berlin', 'Brandenburg', 'Deutschland'],
    serviceType: ['Pentest Berlin', 'Penetrationstest Berlin', 'Pentest KMU', 'Phishing Simulation Berlin', 'Active Directory Analyse', 'IT-Sicherheit Berlin'],
    telephone: '+49-179-239-6294',
    email: 'sodusecure@gmail.com',
    priceRange: '0€ (Pilotprogramm)',
    offers: {
      '@type': 'Offer',
      name: 'Pentest Berlin – KMU Pilotprogramm 2026',
      description: 'Pentest Berlin: Vollständiger Penetrationstest inkl. Active Directory Analyse und Phishing-Simulation – kostenfrei für ausgewählte Berliner KMUs.',
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
        name: 'Ist der Pentest in Berlin wirklich vollständig kostenfrei?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Es entstehen für Sie keine Kosten. Im Gegenzug bitten wir Sie um ehrliches Feedback, ein Testimonial bei Zufriedenheit sowie die Erlaubnis, Ihr Logo als Referenz zu nutzen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet ein Pentest in Berlin normalerweise?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein professioneller Pentest in Berlin inkl. Active Directory Analyse und Phishing-Simulation kostet marktüblich zwischen 8.000 und 15.000 €. Im Pilotprogramm erhalten ausgewählte Berliner KMUs diesen Penetrationstest kostenfrei.',
        },
      },
      {
        '@type': 'Question',
        name: 'Für wen ist der kostenlose Pentest in Berlin geeignet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unser Pentest Berlin richtet sich an KMUs in Berlin und Brandenburg mit 20–150 Mitarbeitern, Microsoft-basierter Infrastruktur (M365/Active Directory) und einem Ansprechpartner für IT-Sicherheit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie lange dauert ein Pentest in Berlin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unser Pentest in Berlin dauert von Kick-off bis Abschlusspräsentation 2–4 Wochen, abhängig von der Größe Ihrer IT-Infrastruktur. Sie erhalten einen vollständigen Pentest-Report mit priorisierten Handlungsempfehlungen.',
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
