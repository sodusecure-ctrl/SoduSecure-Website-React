import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Mobile App Pentest – iOS & Android | Zertifizierte Pentester | SODU Secure',
  description: 'Mobile App Pentest für iOS & Android: OWASP MASVS, Reverse Engineering & Datenschutz-Checks. Zertifizierte Pentester, transparenter Festpreis. Preis jetzt berechnen.',
  keywords: [
    'mobile app pentesting',
    'iOS security testing',
    'Android security testing',
    'mobile application security',
    'OWASP MASVS',
    'mobile penetration testing',
  ],
  openGraph: {
    title: 'Mobile App Pentest – iOS & Android | SODU Secure',
    description: 'OWASP MASVS, Reverse Engineering & Datenschutz-Checks. Zertifizierte Pentester. Festpreis, Preis jetzt berechnen.',,
    url: `${baseUrl}/services/mobile-app-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/mobile-app-testing`,
  },
};
