import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cybersecurity Audit Unternehmen – Manuell & Compliant | SODU Secure',
  description: 'Cybersecurity Audit für NIS2, ISO 27001 & DORA. SODU Secure führt manuelle Cyber Security Audits durch – OSCP-zertifiziert, Festpreis, Bericht in 48 h. Jetzt Angebot einholen.',
  keywords: 'Cybersecurity Audit, Cyber Security Audit, IT Audit Unternehmen, Cyber Audit Firma, Cybersecurity Prüfung, Security Audit Deutschland',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://www.sodusecure.com/cybersecurity-audit' },
  openGraph: {
    title: 'Cybersecurity Audit Unternehmen – Manuell & Compliant | SODU Secure',
    description: 'Cybersecurity Audit für NIS2, ISO 27001 & DORA. SODU Secure führt manuelle Cyber Security Audits durch – OSCP-zertifiziert, Festpreis, Bericht in 48 h.',
    url: 'https://www.sodusecure.com/cybersecurity-audit',
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
            name: 'SODU Secure – Cybersecurity Audit',
            description: 'Manueller Cybersecurity Audit für Unternehmen. NIS2-, ISO 27001- und DORA-konforme Berichte. Festpreis ab 2.500 €.',
            url: 'https://www.sodusecure.com/cybersecurity-audit',
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
              { '@type': 'Question', name: 'Was ist ein Cybersecurity Audit?', acceptedAnswer: { '@type': 'Answer', text: 'Ein Cybersecurity Audit ist eine systematische Prüfung der IT-Sicherheitslage eines Unternehmens. Dabei werden Schwachstellen in Web-Apps, Netzwerken, Cloud und Prozessen identifiziert und nach Schweregrad bewertet.' } },
              { '@type': 'Question', name: 'Was kostet ein Cybersecurity Audit?', acceptedAnswer: { '@type': 'Answer', text: 'Ein Cybersecurity Audit kostet bei SODU Secure ab 2.500 € als Festpreis. Der genaue Preis hängt vom Prüfungsumfang ab und wird per Konfigurator sofort berechnet.' } },
              { '@type': 'Question', name: 'Erfüllt ein Cybersecurity Audit NIS2-Anforderungen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja – SODU Secure erstellt Cybersecurity Audit-Berichte die NIS2-Anforderungen (Art. 21 Risikomanagement), ISO 27001 Annex A und DSGVO Art. 32 erfüllen.' } },
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
              { '@type': 'ListItem', position: 2, name: 'Cybersecurity Audit', item: 'https://www.sodusecure.com/cybersecurity-audit' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
