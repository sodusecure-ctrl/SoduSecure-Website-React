import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Pentest anfragen – Kostenlose Beratung | SODU Secure',
  description: 'Pentest anfragen: Kostenlose Erstberatung & Festpreis-Angebot in 24h. Zertifizierte Pentester, transparente Kosten. Oder direkt Pentest konfigurieren & Preis berechnen.',
  keywords: [
    'contact cybersecurity',
    'penetration testing quote',
    'security consultation',
    'get pentest quote',
  ],
  openGraph: {
    title: 'Pentest anfragen – Kostenlose Beratung | SODU Secure',
    description: 'Kostenlose Erstberatung & Festpreis-Angebot in 24h. Zertifizierte Pentester. Pentest direkt konfigurieren.',,
    url: `${baseUrl}/contact`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};
