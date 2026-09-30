import type { Metadata } from 'next';
import { FAQS } from './faq';

export const metadata: Metadata = {
  // Vorher 79 Zeichen inkl. Suffix und damit sicher abgeschnitten. Die Description
  // grenzt gegen den Fragebogen-Ansatz des BSI-CyberRisikoChecks ab (organisch #1).
  title: 'IT Sicherheitscheck | Ergebnis in 2-5 Tagen',
  description: 'Kein Fragebogen: OSCP-zertifizierte Tester prüfen Web, Netzwerk, Active Directory und Cloud technisch. Ergebnis in 2-5 Tagen, Preis sofort online.',
  keywords: 'IT Sicherheitscheck, IT Security Check, Sicherheitscheck, IT Sicherheitsprüfung Unternehmen, IT Sicherheitscheck Firma, IT Sicherheitscheck KMU, Sicherheitscheck IT, IT Check Unternehmen, IT Sicherheit prüfen lassen, IT Sicherheitsanalyse',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://sodusecure.com/it-sicherheitscheck' },
  openGraph: {
    title: 'IT Sicherheitscheck | Ergebnis in 2-5 Tagen | Sodu Secure',
    description: 'Kein Fragebogen: OSCP-zertifizierte Tester prüfen Web, Netzwerk, Active Directory und Cloud technisch. Ergebnis in 2-5 Tagen, Preis sofort online.',
    url: 'https://sodusecure.com/it-sicherheitscheck',
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
            name: 'Sodu Secure – IT Sicherheitscheck',
            description: 'IT Sicherheitscheck für Unternehmen. Manuelles Pentesting durch OSCP-zertifizierte Experten. Individuell kalkuliert, Schwachstellenscan ab 1.499 €.',
            url: 'https://sodusecure.com/it-sicherheitscheck',
            telephone: '+491777750985',
            email: 'info@sodusecure.com',
            address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
            areaServed: 'DE',
            priceRange: '€€',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'IT Sicherheitscheck Pakete',
              itemListElement: [
                { '@type': 'Offer', name: 'IT Sicherheitscheck Basic', price: '1499', priceCurrency: 'EUR', description: 'Automatisierter Schwachstellenscan - Web-App oder Netzwerk' },
                { '@type': 'Offer', name: 'IT Sicherheitscheck Professional', price: '6500', priceCurrency: 'EUR', description: 'Web + Netzwerk + Active Directory' },
                { '@type': 'Offer', name: 'IT Sicherheitscheck Enterprise', price: '12000', priceCurrency: 'EUR', description: 'Vollständiger Sicherheitscheck inkl. Cloud' },
              ],
            },
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
              { '@type': 'ListItem', position: 2, name: 'IT Sicherheitscheck', item: 'https://sodusecure.com/it-sicherheitscheck' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
