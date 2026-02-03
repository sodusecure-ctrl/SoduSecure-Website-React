import CertificationsToolsSection from '../components/home/CertificationsToolsSection';
import ConsultationCTA from '../components/home/ConsultationCTA';
import Hero from '../components/home/Hero';
import HowItWorksSection from '../components/home/HowItWorksSection';
import SecurityServices from '../components/home/SecurityServices';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import WhyChooseSection from '../components/home/WhyChooseSection';

const baseUrl = 'https://sudosecure.com';

export default function Home() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SudoSecure',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'Professional penetration testing and cybersecurity services',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-XXX-XXXXXXX',
      contactType: 'Customer Service',
      email: 'contact@sudosecure.com',
      availableLanguage: ['English', 'German'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
    },
    sameAs: [
      // Add your social media profiles here
    ],
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Penetration Testing',
    provider: {
      '@type': 'Organization',
      name: 'SudoSecure',
    },
    areaServed: {
      '@type': 'Country',
      name: ['Germany', 'Europe'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Penetration Testing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Application Penetration Testing',
            description: 'Comprehensive security testing for web applications',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile Application Security Testing',
            description: 'Security assessment for iOS and Android applications',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'API Security Testing',
            description: 'Security testing for REST, GraphQL, and SOAP APIs',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero />
      <SecurityServices />
      <WhyChooseSection />
      <HowItWorksSection />
      <CertificationsToolsSection />
      <ConsultationCTA />
      <TestimonialsCarousel />

    </>
  );
}
