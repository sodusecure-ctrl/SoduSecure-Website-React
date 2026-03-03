import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Über uns – Zertifizierte Pentester | SODU Secure',
  description: 'Lernen Sie unser Team zertifizierter Pentester kennen. OSCP-Methodik, OWASP & MITRE ATT&CK. Transparente Preise – Pentest sofort konfigurieren & Preis berechnen.',
  keywords: [
    'cybersecurity team',
    'penetration testing experts',
    'certified ethical hackers',
    'security consultants',
    'OSCP',
    'CEH',
  ],
  openGraph: {
    title: 'Über uns – Zertifizierte Pentester | SODU Secure',
    description: 'Zertifizierte Pentester, OSCP-Methodik & MITRE ATT&CK. Transparente Preise – Pentest sofort konfigurieren.',
    url: `${baseUrl}/about`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};
