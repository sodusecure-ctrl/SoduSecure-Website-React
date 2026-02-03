import { Metadata } from 'next';

const baseUrl = 'https://sudosecure.com';

interface JsonLdProps {
  type: 'Organization' | 'WebPage' | 'Service' | 'FAQPage' | 'BreadcrumbList';
  data: any;
}

export function generateJsonLd({ type, data }: JsonLdProps) {
  const schemas: Record<string, any> = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SudoSecure',
      url: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
      description: 'Professional penetration testing and cybersecurity services',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'DE',
        ...data.address,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: data.phone || '+49-XXX-XXXXXXX',
        contactType: 'Customer Service',
        email: data.email || 'contact@sudosecure.com',
        availableLanguage: ['en', 'de'],
      },
      sameAs: data.socialMedia || [
        // Add your social media links
      ],
    },
    Service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: data.serviceType || 'Penetration Testing',
      provider: {
        '@type': 'Organization',
        name: 'SudoSecure',
        url: baseUrl,
      },
      areaServed: {
        '@type': 'Country',
        name: data.areaServed || ['Germany', 'Europe', 'Worldwide'],
      },
      description: data.description,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        price: data.price || 'Contact for pricing',
        priceCurrency: 'EUR',
      },
    },
    WebPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.name,
      description: data.description,
      url: data.url,
      inLanguage: data.locale || 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'SudoSecure',
        url: baseUrl,
      },
    },
    FAQPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.questions.map((q: any) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    },
    BreadcrumbList: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.items.map((item: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  };

  return schemas[type];
}

export function JsonLdScript({ type, data }: JsonLdProps) {
  const jsonLd = generateJsonLd({ type, data });
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
