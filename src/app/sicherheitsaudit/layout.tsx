import type { Metadata } from 'next';
import { FAQS } from './faq';

export const metadata: Metadata = {
  title: 'Sicherheitsaudit Unternehmen | IT Sicherheitsaudit',
  description: 'IT Sicherheitsaudit für Ihr Unternehmen. Sodu Secure führt manuelle Sicherheitsaudits durch - NIS2-, ISO 27001- & DSGVO-konform. Festpreis, schnelle Abwicklung. Angebot in 24 h.',
  keywords: 'Sicherheitsaudit, IT Sicherheitsaudit, Security Audit Unternehmen, Sicherheitsprüfung IT, IT Audit Firma, Sicherheitsüberprüfung Unternehmen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://sodusecure.com/sicherheitsaudit' },
  openGraph: {
    title: 'Sicherheitsaudit Unternehmen | IT Sicherheitsaudit',
    description: 'IT Sicherheitsaudit für Ihr Unternehmen. Manuell, NIS2- & ISO 27001-konform, Festpreis. Sodu Secure - OSCP-zertifiziert, Angebot in 24 h.',
    url: 'https://sodusecure.com/sicherheitsaudit',
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
            name: 'Sodu Secure – Sicherheitsaudit',
            description: 'Manueller IT Sicherheitsaudit für Unternehmen. NIS2-, ISO 27001- und DSGVO-konforme Berichte. Festpreis ab 1.499 €.',
            url: 'https://sodusecure.com/sicherheitsaudit',
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
              { '@type': 'ListItem', position: 2, name: 'Sicherheitsaudit', item: 'https://sodusecure.com/sicherheitsaudit' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
