import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Netzwerk Pentest & Security Audit | Zertifizierte Pentester | SODU Secure',
  description: 'Netzwerk Pentest: Firewall, Segmentierung & exponierte Dienste – systematisch geprüft von zertifizierten Pentestern. Transparente Preise. Jetzt Pentest konfigurieren.',
  keywords: [
    'network security audit',
    'network pentesting',
    'network vulnerability assessment',
    'infrastructure security',
    'network penetration testing',
  ],
  openGraph: {
    title: 'Netzwerk Pentest & Security Audit | SODU Secure',
    description: 'Firewall, Segmentierung & exponierte Dienste – zertifizierte Pentester. Transparente Preise, jetzt konfigurieren.',,
    url: `${baseUrl}/services/network-audit`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/network-audit`,
  },
};
