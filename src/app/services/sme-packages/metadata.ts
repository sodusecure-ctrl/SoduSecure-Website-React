import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'KMU Sicherheitspaket | Pentest & Phishing ab 8.000 € | SODU Secure',
  description:
    'Professioneller Pentest für KMUs in Deutschland. Externer Pentest, Phishing-Kampagne & Active Directory Analyse ab 8.000 €. Maßgeschneidert für Unternehmen mit 20–150 Mitarbeitern. Jetzt anfragen.',
  keywords: [
    // Primary German KMU/Pentest terms
    'KMU Pentest',
    'Pentest KMU Deutschland',
    'KMU Cybersecurity Paket',
    'IT-Sicherheit KMU',
    'Pentest Mittelstand',
    'Pentest Berlin',
    'Penetrationstest KMU',
    'Penetrationstest Mittelstand',
    'Cybersecurity Paket KMU',
    'Sicherheitscheck KMU',
    // Service-specific
    'Externer Pentest Deutschland',
    'Phishing Simulation KMU',
    'Active Directory Pentest',
    'Interner Pentest KMU',
    'Web Application Pentest KMU',
    // Commercial intent
    'Pentest Kosten KMU',
    'Pentest Preis Mittelstand',
    'IT-Sicherheitsaudit KMU',
    'Schwachstellenanalyse KMU',
    // Brand
    'SODU Secure',
    'sodusecure.com',
  ],
  openGraph: {
    title: 'KMU Sicherheitspaket – Pentest & Phishing ab 8.000 € | SODU Secure',
    description:
      'Vollständiges IT-Sicherheitspaket für KMUs: Externer Pentest, Phishing-Kampagne & Active Directory Analyse. Ab 8.000 €, 3–6 Wochen Laufzeit.',
    url: `${baseUrl}/services/sme-packages`,
    type: 'website',
    siteName: 'SODU Secure',
    locale: 'de_DE',
    images: [
      {
        url: `${baseUrl}/images/og-sme-packages.jpg`,
        width: 1200,
        height: 630,
        alt: 'SODU Secure KMU Sicherheitspaket – Pentest ab 8.000 €',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KMU Sicherheitspaket – Pentest & Phishing ab 8.000 €',
    description:
      'Externer Pentest, Phishing-Kampagne & Active Directory Analyse für KMUs. 3–6 Wochen Laufzeit.',
    images: [`${baseUrl}/images/og-sme-packages.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/services/sme-packages`,
    languages: {
      de: `${baseUrl}/de/services/sme-packages`,
      en: `${baseUrl}/en/services/sme-packages`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};
