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
      <Hero />
      <SecurityServices />

      {/* ── PHISHING CAMPAIGN PROMOTION ── */}
      <Link href="/phishing" className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 group overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="text-4xl sm:text-5xl">🚨</div>
              <div>
                <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  ⚡ Jetzt aktuell
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Gratis Phishing-Kampagne
                </h2>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Testen Sie, wie anfällig Ihre Mitarbeiter für Phishing-Angriffe sind. Professionelle Awareness-Kampagne mit vollständigem Bericht – kostenlos verfügbar für begrenzte Zeit.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 group-hover:translate-x-2 transition-transform duration-300">
              <span className="hidden sm:inline text-white font-semibold">Jetzt starten</span>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-white font-bold text-lg">→</span>
              </div>
            </div>
          </div>
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
