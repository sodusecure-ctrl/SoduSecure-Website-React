import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Live Hacking Show | Cyberangriffe live erleben',
  description:
    'Live Hacking Show für Events, Teams und Management - echte Angriffe live vorgeführt: Phishing, Passwort-Cracking, WLAN-Angriffe, Deepfakes. Vor Ort oder remote. Jetzt Termin anfragen.',
  keywords: [
    'Live Hacking Show',
    'Live Hacking Event',
    'Live Hacking Vortrag',
    'Hacker Show buchen',
    'Live Hacking Demonstration',
    'Security Awareness Event',
    'IT-Sicherheit Vortrag',
    'Live Hacking Keynote',
    'Awareness Veranstaltung',
    'Hacking Vorführung Unternehmen',
  ],
  openGraph: {
    title: 'Live Hacking Show | Sodu Secure',
    description:
      'Angriffe live erleben und verstehen: Phishing, Passwort-Cracking, WLAN-Angriffe und Deepfakes - vorgeführt von echten Pentestern.',
    url: `${baseUrl}/live-hacking-show`,
    type: 'website',
    siteName: 'Sodu Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Live Hacking Show – Sodu Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Hacking Show buchen',
    description: 'Echte Angriffe live vorgeführt von Pentestern - das Awareness-Erlebnis für Ihr Team.',
  },
  alternates: { canonical: `${baseUrl}/live-hacking-show` },
  robots: { index: true, follow: true },
};

export default function LiveHackingShowLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – Live Hacking Show',
    description: 'Live-Hacking-Vorführungen für Unternehmen: reale Angriffe live demonstriert von zertifizierten Pentestern – vor Ort oder remote.',
    url: `${baseUrl}/live-hacking-show`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['Live Hacking Show', 'Security Awareness Event', 'Keynote'],
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
