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
        telephone: '+49-179-239-6294',
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
