import type { Metadata } from 'next';
import { FAQS } from './faq';

export const metadata: Metadata = {
  title: 'Schwachstellenanalyse | Sofort alle Sicherheitslücken finden',
  description: 'Wissen Sie, wo Ihre IT-Infrastruktur angreifbar ist? Jetzt Schwachstellenanalyse beauftragen - Web, Netzwerk & Cloud. CVSS 3.1-Bericht inkl. Preis sofort berechnen - Festpreis ab 800 €.',
  keywords: 'Schwachstellenanalyse, Vulnerability Assessment, Sicherheitslücken finden, Schwachstellen Analyse, Sicherheitslücken Analyse, Schwachstellen Check Unternehmen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://sodusecure.com/schwachstellenanalyse' },
  openGraph: {
    title: 'Schwachstellenanalyse | Sofort alle Sicherheitslücken finden',
    description: 'Systematische Schwachstellenanalyse für Web, Netzwerk & Cloud. CVSS 3.1-Bericht & Proof-of-Concepts inklusive. Preis sofort berechnen - Festpreis ab 800 €.',
    url: 'https://sodusecure.com/schwachstellenanalyse',
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
            name: 'Sodu Secure – Schwachstellenanalyse',
            description: 'Professionelle Schwachstellenanalyse (Vulnerability Assessment) für Unternehmen. CVSS 3.1 Scoring, Proof-of-Concepts, Festpreis ab 800 €.',
            url: 'https://sodusecure.com/schwachstellenanalyse',
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
              { '@type': 'ListItem', position: 2, name: 'Schwachstellenanalyse', item: 'https://sodusecure.com/schwachstellenanalyse' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
