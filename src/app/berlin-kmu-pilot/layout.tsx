import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Pentest Berlin KMU Pilotprogramm 2026 – Kostenloser Pentest | SODU Secure',
  description: 'Kostenloser Pentest für Berliner KMUs. Externer Pentest, Active Directory Analyse und Phishing-Simulation im Wert von bis zu 15.000 € – kostenfrei für 2 ausgewählte Unternehmen. Jetzt bewerben.',
  keywords: [
    'Pentest Berlin',
    'Pentest KMU',
    'Pentest Berlin KMU',
    'Penetrationstest Berlin',
    'KMU Cybersecurity Berlin',
    'kostenloser Pentest Berlin',
    'IT-Sicherheit KMU Berlin',
    'IT Security KMU',
    'Active Directory Analyse Berlin',
    'Phishing Simulation Berlin',
    'Penetration Testing Berlin',
    'KMU Security Berlin',
    'SODU Secure Pilotprogramm',
    'Cybersecurity Pilotprogramm 2026',
    'IT Security Check Firma',
    'IT Sicherheitscheck Unternehmen',
    'IS Sicherheitsaudit',
    'IT Security Audit',
    'IT Sicherheitsaudit KMU',
    'IT Security Check Berlin',
    'Gratis Pentest KMU',
    'Pentest Kosten Berlin',
    'Pentest Angebot Berlin',
    'Pentest Firma Berlin',
    'Cybersecurity KMU Berlin',
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
    serviceType: ['Pentest Berlin', 'Pentest KMU', 'Penetrationstest', 'Phishing Simulation', 'Active Directory Analyse'],
    telephone: '+49-179-239-6294',
    email: 'sodusecure@gmail.com',
    priceRange: '0€ (Pilotprogramm)',
    sameAs: [
      `${baseUrl}`,
      `${baseUrl}/pentest-berlin`,
      `${baseUrl}/services/sme-packages`,
    ],
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
      {
        '@type': 'Question',
        name: 'Was unterscheidet SODU Secure von anderen Pentest-Anbietern in Berlin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SODU Secure ist ein junges, spezialisiertes Berliner Unternehmen mit Fokus auf KMU-Sicherheit. Wir bieten manuelles Pentesting statt reiner Scan-Reports, transparente Festpreise, kurze Reaktionszeiten und persönlichen Kontakt – kein anonymer Dienstleister, sondern ein lokaler Partner.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Arten von Pentests bietet SODU Secure in Berlin an?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SODU Secure bietet in Berlin folgende Penetrationstests an: Externer Pentest (Web, Cloud, IPs), Active Directory Pentest, Web Application Pentest, Phishing-Simulation, Netzwerk- und Infrastruktur-Pentest sowie vollständige KMU-Pakete. Details unter sodusecure.com/pentest-berlin.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist ein IT Security Check für Unternehmen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein IT Security Check für Unternehmen ist eine systematische Überprüfung der IT-Infrastruktur auf Sicherheitslücken, Fehlkonfigurationen und Schwachstellen – extern (öffentliche Angriffsfläche), intern (Active Directory, Netzwerk), Webanwendungen und E-Mail-Sicherheit. Ein professioneller IT Security Check kombiniert manuelle Testmethoden mit automatisierten Tools und liefert ein realistisches Bild der Angriffsfläche.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist der Unterschied zwischen IT Security Check, IT Security Audit und IS Sicherheitsaudit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein IT Security Check prüft technische Sicherheitsmaßnahmen und ist oft mit einem Pentest identisch. Ein IT Security Audit ist breiter und umfasst Systeme, Netzwerke, Zugriffsrechte und Patch-Status. Ein IS Sicherheitsaudit (Informationssicherheitsaudit) ist am umfassendsten und prüft zusätzlich Prozesse, Richtlinien, Organisationsstrukturen und Compliance (z. B. ISO 27001, BSI IT-Grundschutz, NIS2, DSGVO Art. 32).',
        },
      },
    ],
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'SODU Secure',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pentest Berlin',
        item: `${baseUrl}/pentest-berlin`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Berlin KMU Pilotprogramm',
        item: `${baseUrl}/berlin-kmu-pilot`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {children}
    </>
  );
}
