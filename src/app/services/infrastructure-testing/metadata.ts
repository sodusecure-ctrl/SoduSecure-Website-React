import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Infrastruktur Pentest – Active Directory & Server | SODU Secure',
  description: 'Infrastruktur Pentest: Active Directory, Server & Datenbanken – Kerberoasting, Pass-the-Hash & mehr. Zertifizierte Pentester. Preis sofort berechnen – Festpreis.',
  keywords: [
    'infrastructure pentesting',
    'server security testing',
    'database security',
    'internal penetration testing',
    'IT infrastructure security',
  ],
  openGraph: {
    title: 'Infrastruktur Pentest – Active Directory & Server | SODU Secure',
    description: 'Kerberoasting, Pass-the-Hash & AD-Angriffe – zertifizierte Pentester. Festpreis, jetzt konfigurieren.',
    url: `${baseUrl}/services/infrastructure-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/infrastructure-testing`,
  },
};
