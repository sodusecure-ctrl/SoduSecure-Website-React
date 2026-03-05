import CertificationsToolsSection from '../components/home/CertificationsToolsSection';
import ConsultationCTA from '../components/home/ConsultationCTA';
import Hero from '../components/home/Hero';
import HowItWorksSection from '../components/home/HowItWorksSection';
import SecurityServices from '../components/home/SecurityServices';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import WhyChooseSection from '../components/home/WhyChooseSection';
import Link from 'next/link';

const baseUrl = 'https://www.sodusecure.com';

export default function Home() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SODU Secure GmbH',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'Professioneller Pentest in Berlin und Deutschland. Penetrationstest, Active Directory Analyse, Phishing-Simulation und IT-Sicherheitsberatung für KMUs.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-179-2396294',
      contactType: 'Customer Service',
      email: 'sodusecure@gmail.com',
      availableLanguage: ['English', 'German'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin',
      addressCountry: 'DE',
    },
    sameAs: [],
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Penetration Testing',
    name: 'Pentest Berlin – Penetrationstest für Unternehmen',
    description: 'Professioneller Pentest in Berlin: Externer Penetrationstest, Active Directory Analyse, Phishing-Simulation und umfassende IT-Sicherheitsaudits für KMUs und Unternehmen.',
    provider: {
      '@type': 'Organization',
      name: 'SODU Secure GmbH',
      url: baseUrl,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Berlin',
      },
      {
        '@type': 'State',
        name: 'Brandenburg',
      },
      {
        '@type': 'Country',
        name: 'Germany',
      },
    ],
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

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was kostet ein Pentest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein Penetrationstest bei SODU Secure beginnt ab 1.200 € für API-Tests bzw. ab 2.500 € für Web-Applikationen und Netzwerke. Den genauen Preis können Sie sofort online mit unserem Pentest-Konfigurator berechnen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie lange dauert ein Penetrationstest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein Penetrationstest dauert typischerweise 2–5 Werktage, abhängig vom Umfang. SODU Secure liefert den fertigen Bericht innerhalb von 48 Stunden nach Abschluss der Tests.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ist ein Pentest Pflicht?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unter NIS2, ISO 27001 und DORA ist ein regelmäßiger Penetrationstest für viele Unternehmen de facto Pflicht. SODU Secure erstellt compliance-konforme Berichte, die Sie bei Prüfungen vorlegen können.',
        },
      },
      {
        '@type': 'Question',
        name: 'Gibt es einen kostenlosen Pentest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Für Berliner KMUs bietet SODU Secure im Rahmen des KMU Pilotprogramms 2026 einen kostenlosen Pentest im Wert von bis zu 15.000 € an. Nur 2 Plätze verfügbar – jetzt unter sodusecure.com/berlin-kmu-pilot bewerben.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            Pentest Berlin – KMU Cybersecurity Pilotprogramm 2026 &ndash; Nur noch 2 von 7 Plätzen frei
          </span>
          <span className="text-red-400 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0">
            Jetzt bewerben →
          </span>
        </div>
      </Link>
      <Hero />
      <SecurityServices />

      {/* ── Pentest Berlin Geo-Banner ── */}
      <Link
        href="/pentest-berlin"
        className="block w-full bg-gray-900 hover:bg-gray-800 transition-colors duration-200 group border-y border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span className="text-white text-sm sm:text-base font-medium">
              🏙️ <span className="font-bold">Berliner Unternehmen?</span>
              {' '}Erfahren Sie, warum Pentests für KMUs, Startups und den Mittelstand unverzichtbar sind.
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-red-400 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 whitespace-nowrap">
            Pentest Berlin entdecken →
          </span>
        </div>
      </Link>

      <WhyChooseSection />
      <HowItWorksSection />
      <CertificationsToolsSection />
      <ConsultationCTA />
      <TestimonialsCarousel />

    </>
  );
}
