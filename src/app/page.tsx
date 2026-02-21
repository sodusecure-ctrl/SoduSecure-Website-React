import CertificationsToolsSection from '../components/home/CertificationsToolsSection';
import ConsultationCTA from '../components/home/ConsultationCTA';
import Hero from '../components/home/Hero';
import HowItWorksSection from '../components/home/HowItWorksSection';
import SecurityServices from '../components/home/SecurityServices';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import WhyChooseSection from '../components/home/WhyChooseSection';
import Link from 'next/link';

const baseUrl = 'https://sodusecure.com';

export default function Home() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'sodusecure',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'Professional penetration testing and cybersecurity services',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-179-2396294',
      contactType: 'Customer Service',
      email: 'sodusecure@gmail.com',
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
      name: 'sodusecure',
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
      {/* Pilot Program Announcement Banner */}
      <Link href="/berlin-kmu-pilot" className="block w-full bg-gray-900 hover:bg-gray-800 transition-colors duration-200 group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0">
            🔐 Neu
          </span>
          <span className="text-white text-sm font-medium text-center">
            Berlin KMU Cybersecurity Pilotprogramm 2026 &ndash; 6 kostenfreie Plätze verfügbar
          </span>
          <span className="text-red-400 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0">
            Jetzt bewerben →
          </span>
        </div>
      </Link>
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
