import { metadata as smeMetadata } from './metadata';
export { smeMetadata as metadata };

export default function SMEPackagesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'KMU Sicherheits-Komplettpaket',
    description:
      'Professioneller Penetrationstest-Service für KMUs in Deutschland. Externer Pentest, Phishing-Kampagne und Active Directory Analyse.',
    provider: {
      '@type': 'Organization',
      name: 'SODU Secure GmbH',
      url: 'https://www.sodusecure.com',
      logo: 'https://www.sodusecure.com/icons/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+49-177-7750985',
        contactType: 'sales',
        availableLanguage: ['German', 'English'],
        areaServed: 'DE',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Berlin',
        addressCountry: 'DE',
      },
    },
    serviceType: 'Penetration Testing',
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'KMU Sicherheitspakete',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Basis',
          description:
            'Externer Pentest + Phishing-Kampagne + Web-Präsenz Schnelltest',
          price: '8000',
          priceCurrency: 'EUR',
          url: 'https://www.sodusecure.com/services/sme-packages',
        },
        {
          '@type': 'Offer',
          name: 'Basis + Intern',
          description:
            'Externer Pentest + Phishing-Kampagne + Web-Präsenz + Interner Pentest / Active Directory',
          price: '10500',
          priceCurrency: 'EUR',
          url: 'https://www.sodusecure.com/services/sme-packages',
        },
        {
          '@type': 'Offer',
          name: 'Komplett',
          description:
            'Externer Pentest + Phishing-Kampagne + Web Application Pentest + Interner Pentest / Active Directory',
          price: '13000',
          priceCurrency: 'EUR',
          url: 'https://www.sodusecure.com/services/sme-packages',
        },
      ],
    },
    audience: {
      '@type': 'BusinessAudience',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 20,
        maxValue: 150,
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist im KMU Pentest-Paket enthalten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das KMU Pentest-Paket von SODU Secure umfasst je nach Paket: Externer Penetrationstest, Phishing-Simulation, Web-Applikations-Pentest und/oder Active Directory Analyse. Transparenter Festpreis – kein Tageshonorar.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ab welchem Preis gibt es ein KMU Pentest-Paket?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das Basis-Paket für KMUs startet ab 8.000 € und beinhaltet Externer Pentest + Phishing-Kampagne + Web-Präsenz Schnelltest. Alle Preise können Sie sofort online mit dem Pentest-Konfigurator berechnen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie lange dauert ein KMU Pentest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein KMU Komplett-Pentest dauert typischerweise 5–10 Werktage. SODU Secure liefert den finalen Bericht inkl. Remediation-Empfehlungen innerhalb von 48 Stunden nach Testabschluss.',
        },
      },
      {
        '@type': 'Question',
        name: 'Für welche KMU-Größen ist das Paket geeignet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die KMU Pentest-Pakete von SODU Secure sind für Unternehmen mit 20–150 Mitarbeitern konzipiert. Sie decken alle relevanten Angriffsvektoren ab und sind NIS2- sowie ISO 27001-konform.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
