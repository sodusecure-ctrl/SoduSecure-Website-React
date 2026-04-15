import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sicherheitsaudit Unternehmen – IT Sicherheitsaudit | SODU Secure',
  description: 'IT Sicherheitsaudit für Ihr Unternehmen. SODU Secure führt manuelle Sicherheitsaudits durch – NIS2-, ISO 27001- & DSGVO-konform. Festpreis, schnelle Abwicklung. Angebot in 24 h.',
  keywords: 'Sicherheitsaudit, IT Sicherheitsaudit, Security Audit Unternehmen, Sicherheitsprüfung IT, IT Audit Firma, Sicherheitsüberprüfung Unternehmen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://www.sodusecure.com/sicherheitsaudit' },
  openGraph: {
    title: 'Sicherheitsaudit Unternehmen – IT Sicherheitsaudit | SODU Secure',
    description: 'IT Sicherheitsaudit für Ihr Unternehmen. Manuell, NIS2- & ISO 27001-konform, Festpreis. SODU Secure – OSCP-zertifiziert, Angebot in 24 h.',
    url: 'https://www.sodusecure.com/sicherheitsaudit',
    siteName: 'SODU Secure',
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
            name: 'SODU Secure – Sicherheitsaudit',
            description: 'Manueller IT Sicherheitsaudit für Unternehmen. NIS2-, ISO 27001- und DSGVO-konforme Berichte. Festpreis ab 2.500 €.',
            url: 'https://www.sodusecure.com/sicherheitsaudit',
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
            mainEntity: [
              { '@type': 'Question', name: 'Was ist ein Sicherheitsaudit?', acceptedAnswer: { '@type': 'Answer', text: 'Ein Sicherheitsaudit (IT Sicherheitsaudit) ist eine umfassende Prüfung der IT-Infrastruktur, Prozesse und Sicherheitsmaßnahmen eines Unternehmens. Ziel ist die Identifikation von Schwachstellen und die Bewertung des Sicherheitsniveaus.' } },
              { '@type': 'Question', name: 'Was kostet ein IT Sicherheitsaudit?', acceptedAnswer: { '@type': 'Answer', text: 'Ein Sicherheitsaudit kostet bei SODU Secure ab 2.500 € als Festpreis. Umfangreiche Audits (inkl. Penetrationstest, Compliance-Prüfung, On-Site) starten ab 8.000 €.' } },
              { '@type': 'Question', name: 'Welche Compliance-Anforderungen erfüllt ein Sicherheitsaudit?', acceptedAnswer: { '@type': 'Answer', text: 'Ein SODU Secure Sicherheitsaudit liefert Nachweise für NIS2 (Art. 21), ISO 27001 (Annex A), DSGVO Art. 32 und DORA-Anforderungen.' } },
            ],
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
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sodusecure.com' },
              { '@type': 'ListItem', position: 2, name: 'Sicherheitsaudit', item: 'https://www.sodusecure.com/sicherheitsaudit' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
