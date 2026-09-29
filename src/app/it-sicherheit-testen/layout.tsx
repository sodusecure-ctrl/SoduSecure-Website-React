import type { Metadata } from 'next';
import { FAQS } from './faq';

export const metadata: Metadata = {
  title: 'IT Sicherheit testen | IT Sicherheitstest für Unternehmen',
  description: 'IT Sicherheit testen lassen - Web, Netzwerk, Active Directory, Cloud. Sodu Secure führt manuelle IT Sicherheitstests durch. Schwachstellenscan ab 1.499 €, Pentest individuell kalkuliert. Jetzt konfigurieren.',
  keywords: 'IT Sicherheit testen, IT Sicherheitstest, Netzwerk Sicherheitstest, IT Sicherheitsprüfung, Sicherheitstest Unternehmen, IT Sicherheit überprüfen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://sodusecure.com/it-sicherheit-testen' },
  openGraph: {
    title: 'IT Sicherheit testen | IT Sicherheitstest für Unternehmen',
    description: 'IT Sicherheit testen lassen - Web, Netzwerk, Active Directory, Cloud. Sodu Secure: Schwachstellenscan ab 1.499 €, Pentest individuell kalkuliert, Ergebnis in 48 h.',
    url: 'https://sodusecure.com/it-sicherheit-testen',
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
            name: 'Sodu Secure – IT Sicherheit testen',
            description: 'Manueller IT Sicherheitstest für Unternehmen. Web-Apps, Netzwerke, Active Directory, Cloud. OSCP-zertifiziert, individuell kalkuliert - Schwachstellenscan ab 1.499 €.',
            url: 'https://sodusecure.com/it-sicherheit-testen',
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
              { '@type': 'ListItem', position: 2, name: 'IT Sicherheit testen', item: 'https://sodusecure.com/it-sicherheit-testen' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
