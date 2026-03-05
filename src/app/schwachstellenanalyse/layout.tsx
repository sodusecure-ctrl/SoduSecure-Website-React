import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schwachstellenanalyse – Sofort alle Sicherheitslücken finden | SODU Secure',
  description: 'Wissen Sie, wo Ihre IT-Infrastruktur angreifbar ist? Jetzt Schwachstellenanalyse beauftragen – Web, Netzwerk & Cloud. CVSS 3.1-Bericht inkl. Preis sofort berechnen – Festpreis ab 800 €.',
  keywords: 'Schwachstellenanalyse, Vulnerability Assessment, Sicherheitslücken finden, Schwachstellen Analyse, Sicherheitslücken Analyse, Schwachstellen Check Unternehmen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://www.sodusecure.com/schwachstellenanalyse' },
  openGraph: {
    title: 'Schwachstellenanalyse – Sofort alle Sicherheitslücken finden | SODU Secure',
    description: 'Systematische Schwachstellenanalyse für Web, Netzwerk & Cloud. CVSS 3.1-Bericht & Proof-of-Concepts inklusive. Preis sofort berechnen – Festpreis ab 800 €.',
    url: 'https://www.sodusecure.com/schwachstellenanalyse',
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
            name: 'SODU Secure – Schwachstellenanalyse',
            description: 'Professionelle Schwachstellenanalyse (Vulnerability Assessment) für Unternehmen. CVSS 3.1 Scoring, Proof-of-Concepts, Festpreis ab 2.500 €.',
            url: 'https://www.sodusecure.com/schwachstellenanalyse',
            telephone: '+4917923962949',
            email: 'sodusecure@gmail.com',
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
              { '@type': 'Question', name: 'Was ist eine Schwachstellenanalyse?', acceptedAnswer: { '@type': 'Answer', text: 'Eine Schwachstellenanalyse (Vulnerability Assessment) ist eine systematische Prüfung Ihrer IT-Systeme auf bekannte Sicherheitslücken. Anders als beim Penetrationstest werden Schwachstellen identifiziert und bewertet, aber nicht aktiv ausgenutzt.' } },
              { '@type': 'Question', name: 'Was ist der Unterschied zwischen Schwachstellenanalyse und Penetrationstest?', acceptedAnswer: { '@type': 'Answer', text: 'Bei der Schwachstellenanalyse werden Sicherheitslücken identifiziert und bewertet (CVSS). Beim Penetrationstest werden sie zusätzlich manuell ausgenutzt, um echte Angriffswege zu beweisen. SODU Secure bietet beide Varianten als Festpreis.' } },
              { '@type': 'Question', name: 'Was kostet eine Schwachstellenanalyse?', acceptedAnswer: { '@type': 'Answer', text: 'Eine professionelle Schwachstellenanalyse kostet bei SODU Secure ab 2.500 € als Festpreis. Der genaue Preis wird per Online-Konfigurator sofort berechnet.' } },
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
              { '@type': 'ListItem', position: 2, name: 'Schwachstellenanalyse', item: 'https://www.sodusecure.com/schwachstellenanalyse' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
