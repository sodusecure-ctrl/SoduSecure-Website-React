import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Sicherheitscheck Unternehmen – Festpreis & Schnell | SODU Secure',
  description: 'IT Sicherheitscheck für Ihr Unternehmen. SODU Secure prüft Web, Netzwerk, Active Directory & Cloud in 2–5 Tagen. Sofortiger Festpreis per Konfigurator. OSCP-zertifiziert. Angebot in 24 h.',
  keywords: 'IT Sicherheitscheck, IT Security Check, IT Sicherheitsprüfung Unternehmen, IT Sicherheitscheck Firma, Sicherheitscheck IT, IT Check Unternehmen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://www.sodusecure.com/it-sicherheitscheck' },
  openGraph: {
    title: 'IT Sicherheitscheck Unternehmen – Festpreis & Schnell | SODU Secure',
    description: 'IT Sicherheitscheck für Ihr Unternehmen. SODU Secure prüft Web, Netzwerk, Active Directory & Cloud in 2–5 Tagen. Sofortiger Festpreis per Konfigurator. OSCP-zertifiziert.',
    url: 'https://www.sodusecure.com/it-sicherheitscheck',
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
            name: 'SODU Secure – IT Sicherheitscheck',
            description: 'IT Sicherheitscheck für Unternehmen. Manuelles Pentesting durch OSCP-zertifizierte Experten. Festpreis ab 2.500 €.',
            url: 'https://www.sodusecure.com/it-sicherheitscheck',
            telephone: '+4917923962949',
            email: 'sodusecure@gmail.com',
            address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
            areaServed: 'DE',
            priceRange: '€€',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'IT Sicherheitscheck Pakete',
              itemListElement: [
                { '@type': 'Offer', name: 'IT Sicherheitscheck Basic', price: '2500', priceCurrency: 'EUR', description: 'Web-App oder Netzwerk Check' },
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
            mainEntity: [
              { '@type': 'Question', name: 'Was kostet ein IT Sicherheitscheck?', acceptedAnswer: { '@type': 'Answer', text: 'Ein IT Sicherheitscheck kostet bei SODU Secure ab 2.500 € als Festpreis – je nach Umfang (Web-App, Netzwerk, Active Directory, Cloud). Der genaue Preis wird per Konfigurator sofort berechnet.' } },
              { '@type': 'Question', name: 'Wie lange dauert ein IT Sicherheitscheck?', acceptedAnswer: { '@type': 'Answer', text: 'Ein fokussierter IT Sicherheitscheck dauert 2–5 Werktage, ein umfassender Check 1–2 Wochen. SODU Secure stellt den Bericht innerhalb von 48 Stunden nach Testabschluss bereit.' } },
              { '@type': 'Question', name: 'Was wird beim IT Sicherheitscheck überprüft?', acceptedAnswer: { '@type': 'Answer', text: 'Beim IT Sicherheitscheck werden je nach Paket Web-Applikationen, Netzwerkinfrastruktur, Active Directory, Cloud-Konfigurationen und APIs auf Sicherheitslücken überprüft.' } },
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
              { '@type': 'ListItem', position: 2, name: 'IT Sicherheitscheck', item: 'https://www.sodusecure.com/it-sicherheitscheck' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
