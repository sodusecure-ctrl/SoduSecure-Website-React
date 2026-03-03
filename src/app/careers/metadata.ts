import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Jobs bei SODU Secure – Zertifizierte Pentester gesucht',
  description: 'Werde Teil unseres Teams zertifizierter Pentester. Spannende Pentest-Projekte (Web, AD, Cloud), faire Vergütung & Remote-Option. Jetzt Karriere starten.',
  keywords: [
    'cybersecurity jobs',
    'penetration tester jobs',
    'security analyst careers',
    'ethical hacker jobs',
  ],
  openGraph: {
    title: 'Jobs bei SODU Secure – Pentester & Security-Experten gesucht',
    description: 'Zertifizierte Pentester gesucht: Web, AD & Cloud-Projekte. Remote & faire Vergütung. Jetzt bewerben.',
    url: `${baseUrl}/careers`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/careers`,
  },
};
