import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Pentest anfragen | Kostenlose Beratung',
  description: 'Pentest anfragen: kostenlose Erstberatung und Festpreis-Angebot in 24 Stunden. Oder direkt online konfigurieren und den Preis sofort berechnen.',
  keywords: [
    'contact cybersecurity',
    'penetration testing quote',
    'security consultation',
    'get pentest quote',
  ],
  openGraph: {
    title: 'Pentest anfragen | Kostenlose Beratung',
    description: 'Kostenlose Erstberatung & Festpreis-Angebot in 24h. Zertifizierte Pentester. Pentest direkt konfigurieren.',
    url: `${baseUrl}/contact`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};
