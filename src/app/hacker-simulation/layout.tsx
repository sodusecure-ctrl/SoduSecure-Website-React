import type { Metadata } from 'next';
import { FAQS } from './faq';

export const metadata: Metadata = {
  title: 'Hacker-Simulation | Angriff sofort simulieren lassen',
  description: 'Testen Sie jetzt, ob Ihr Unternehmen einem echten Hackerangriff stannhält. Realistische Hacker-Simulation (Ethical Hacking) - OSCP-zertifiziert. Preis sofort online berechnen. Angebot in 24 h.',
  keywords: 'Hacker Simulation, Hacker Angriff simulieren, Ethical Hacking Firma, Hacking Test Unternehmen, simulierter Hackerangriff, Cyberangriff simulieren',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://sodusecure.com/hacker-simulation' },
  openGraph: {
    title: 'Hacker-Simulation | Angriff sofort simulieren lassen',
    description: 'Jetzt testen, ob Ihr Unternehmen einem echten Hackerangriff stannhält. OSCP-zertifiziert. Preis sofort online berechnen. Angebot in 24 h.',
    url: 'https://sodusecure.com/hacker-simulation',
    siteName: 'Sodu Secure',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Sodu Secure – Hacker Simulation & Ethical Hacking',
            description: 'Realistische Hacker-Simulation (Ethical Hacking) für Unternehmen. OSCP-zertifizierte Experten simulieren echte Cyberangriffe. Individuell kalkuliert, Schwachstellenscan ab 1.499 €.',
            url: 'https://sodusecure.com/hacker-simulation',
            telephone: '+491777750985',
            email: 'info@sodusecure.com',
            address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
            areaServed: 'DE',
            priceRange: '€€',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sodusecure.com' },
              { '@type': 'ListItem', position: 2, name: 'Hacker Simulation', item: 'https://sodusecure.com/hacker-simulation' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
