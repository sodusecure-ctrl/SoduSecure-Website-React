import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hacker-Simulation – Angriff sofort simulieren lassen | SODU Secure',
  description: 'Testen Sie jetzt, ob Ihr Unternehmen einem echten Hackerangriff stannhält. Realistische Hacker-Simulation (Ethical Hacking) – OSCP-zertifiziert. Preis sofort online berechnen. Angebot in 24 h.',
  keywords: 'Hacker Simulation, Hacker Angriff simulieren, Ethical Hacking Firma, Hacking Test Unternehmen, simulierter Hackerangriff, Cyberangriff simulieren',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://www.sodusecure.com/hacker-simulation' },
  openGraph: {
    title: 'Hacker-Simulation – Angriff sofort simulieren lassen | SODU Secure',
    description: 'Jetzt testen, ob Ihr Unternehmen einem echten Hackerangriff stannhält. OSCP-zertifiziert. Preis sofort online berechnen. Festpreis ab 2.500 €.',
    url: 'https://www.sodusecure.com/hacker-simulation',
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
            name: 'SODU Secure – Hacker Simulation & Ethical Hacking',
            description: 'Realistische Hacker-Simulation (Ethical Hacking) für Unternehmen. OSCP-zertifizierte Experten simulieren echte Cyberangriffe. Festpreis ab 2.500 €.',
            url: 'https://www.sodusecure.com/hacker-simulation',
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
              { '@type': 'Question', name: 'Was ist eine Hacker Simulation?', acceptedAnswer: { '@type': 'Answer', text: 'Bei einer Hacker Simulation (Ethical Hacking / Penetrationstest) simulieren autorisierte Sicherheitsexperten einen echten Cyberangriff auf Ihr Unternehmen. Ziel ist es, Schwachstellen zu finden, bevor echte Hacker es tun.' } },
              { '@type': 'Question', name: 'Wie viel kostet eine Hacker Simulation?', acceptedAnswer: { '@type': 'Answer', text: 'Eine professionelle Hacker Simulation kostet ab 2.500 € als Festpreis. SODU Secure berechnet den genauen Preis per Online-Konfigurator – sofort und unverbindlich.' } },
              { '@type': 'Question', name: 'Ist Hacker Simulation legal?', acceptedAnswer: { '@type': 'Answer', text: 'Ja – autorisiertes Ethical Hacking (Penetrationstest) ist vollständig legal. SODU Secure führt alle Tests ausschließlich mit schriftlicher Genehmigung des Systemeigentümers durch.' } },
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
              { '@type': 'ListItem', position: 2, name: 'Hacker Simulation', item: 'https://www.sodusecure.com/hacker-simulation' },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
