import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Sicherheit testen – IT Sicherheitstest für Unternehmen | SODU Secure',
  description: 'IT Sicherheit testen lassen – Web, Netzwerk, Active Directory, Cloud. SODU Secure führt manuelle IT Sicherheitstests durch. Festpreis ab 2.500 €, Ergebnis in 48 h. Jetzt konfigurieren.',
  keywords: 'IT Sicherheit testen, IT Sicherheitstest, Netzwerk Sicherheitstest, IT Sicherheitsprüfung, Sicherheitstest Unternehmen, IT Sicherheit überprüfen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://www.sodusecure.com/it-sicherheit-testen' },
  openGraph: {
    title: 'IT Sicherheit testen – IT Sicherheitstest für Unternehmen | SODU Secure',
    description: 'IT Sicherheit testen lassen – Web, Netzwerk, Active Directory, Cloud. SODU Secure: Festpreis ab 2.500 €, Ergebnis in 48 h.',
    url: 'https://www.sodusecure.com/it-sicherheit-testen',
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
            name: 'SODU Secure – IT Sicherheit testen',
            description: 'Manueller IT Sicherheitstest für Unternehmen. Web-Apps, Netzwerke, Active Directory, Cloud. OSCP-zertifiziert, Festpreis ab 2.500 €.',
            url: 'https://www.sodusecure.com/it-sicherheit-testen',
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
              { '@type': 'Question', name: 'Wie kann ich meine IT Sicherheit testen lassen?', acceptedAnswer: { '@type': 'Answer', text: 'IT Sicherheit testen lassen geht mit einem professionellen Penetrationstest. SODU Secure prüft Web-Apps, Netzwerke, Active Directory und Cloud – manuell, OSCP-zertifiziert, Festpreis ab 2.500 €.' } },
              { '@type': 'Question', name: 'Was kostet ein IT Sicherheitstest?', acceptedAnswer: { '@type': 'Answer', text: 'Ein professioneller IT Sicherheitstest kostet bei SODU Secure ab 2.500 € als Festpreis. Der genaue Preis hängt vom Testumfang ab und wird per Online-Konfigurator sofort berechnet.' } },
              { '@type': 'Question', name: 'Wie oft sollte man IT Sicherheit testen?', acceptedAnswer: { '@type': 'Answer', text: 'Empfohlen wird mindestens einmal jährlich sowie nach größeren Systemänderungen. NIS2 und ISO 27001 fordern regelmäßige Sicherheitsprüfungen als Pflicht.' } },
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
              { '@type': 'ListItem', position: 2, name: 'IT Sicherheit testen', item: 'https://www.sodusecure.com/it-sicherheit-testen' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
