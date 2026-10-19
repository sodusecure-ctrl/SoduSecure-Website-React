import type { Metadata } from 'next';
import { FAQS } from './faq';

export const metadata: Metadata = {
  title: 'Cybersecurity Audit Unternehmen | Manuell & Compliant',
  description: 'Cybersecurity Audit für NIS2, ISO 27001 & DORA. Sodu Secure führt manuelle Cyber Security Audits durch - OSCP-zertifiziert, Festpreis, Bericht in 48 h. Jetzt Angebot einholen.',
  keywords: 'Cybersecurity Audit, Cyber Security Audit, IT Audit Unternehmen, Cyber Audit Firma, Cybersecurity Prüfung, Security Audit Deutschland',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://sodusecure.com/cybersecurity-audit' },
  openGraph: {
    title: 'Cybersecurity Audit Unternehmen | Manuell & Compliant',
    description: 'Cybersecurity Audit für NIS2, ISO 27001 & DORA. Sodu Secure führt manuelle Cyber Security Audits durch - OSCP-zertifiziert, Festpreis, Bericht in 48 h.',
    url: 'https://sodusecure.com/cybersecurity-audit',
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
            name: 'Sodu Secure – Cybersecurity Audit',
            description: 'Manueller Cybersecurity Audit für Unternehmen. NIS2-, ISO 27001- und DORA-konforme Berichte. Festpreis ab 1.499 €.',
            url: 'https://sodusecure.com/cybersecurity-audit',
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
              { '@type': 'ListItem', position: 2, name: 'Cybersecurity Audit', item: 'https://sodusecure.com/cybersecurity-audit' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
