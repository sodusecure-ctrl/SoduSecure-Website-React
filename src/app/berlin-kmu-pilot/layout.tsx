import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Berlin KMU Cybersecurity Pilotprogramm 2026 – SODU Secure',
  description: 'Kostenloser Pentest für 7 Berliner KMUs. Externer Pentest, Active Directory Analyse und Phishing-Simulation im Wert von bis zu 15.000 € – kostenfrei für ausgewählte Unternehmen. Jetzt bewerben.',
  keywords: [
    'Pentest Berlin',
    'KMU Cybersecurity Berlin',
    'kostenloser Pentest',
    'IT-Sicherheit Berlin',
    'Active Directory Analyse',
    'Phishing Simulation',
    'Penetration Testing Berlin',
    'KMU Security',
    'SODU Secure Pilotprogramm',
    'Cybersecurity Pilotprogramm 2026',
    'IT-Sicherheitscheck Berlin',
    'Gratis Pentest KMU',
  ],
  openGraph: {
    title: 'Berlin KMU Cybersecurity Pilotprogramm 2026 – 6 Plätze frei',
    description: 'Vollständiger Pentest, Active Directory Analyse & Phishing-Simulation für Berliner KMUs. Wert bis 15.000 € – kostenfrei für 7 ausgewählte Unternehmen.',
    url: `${baseUrl}/berlin-kmu-pilot`,
    type: 'website',
    siteName: 'SODU Secure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berlin KMU Cybersecurity Pilotprogramm 2026 – SODU Secure',
    description: 'Kostenloser Pentest für 7 Berliner KMUs. Jetzt einen der 6 verbleibenden Plätze sichern.',
  },
  alternates: {
    canonical: `${baseUrl}/berlin-kmu-pilot`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BerlinKMUPilotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
