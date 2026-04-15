import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Red Team Assessment – Realistische Angriffssimulation | SODU Secure',
  description:
    'Red Team Assessment für Unternehmen: Vollständige Angriffssimulation durch ein dediziertes Red Team. MITRE ATT&CK-Framework, NIS2/DORA-konform. Testen Sie Ihre echte Verteidigungsfähigkeit.',
  keywords: [
    'Red Team Assessment',
    'Red Teaming Deutschland',
    'Red Team Pentest',
    'Red Team vs Blue Team',
    'Red Team Exercise',
    'Red Team Kosten',
    'TLPT',
    'DORA Red Team',
    'Red Team Simulation',
    'Angriffssimulation',
    'Red Team Deutschland',
    'Advanced Persistent Threat Simulation',
    'APT Simulation',
    'Red Team Berlin',
    'MITRE ATT&CK Red Team',
    'Threat-Led Penetration Testing',
  ],
  openGraph: {
    title: 'Red Team Assessment – Realistische APT-Simulation | SODU Secure',
    description:
      'Dediziertes Red Team simuliert realistische Angriffe gegen Ihre Organisation. MITRE ATT&CK, NIS2 & DORA-konform. Jetzt anfragen.',
    url: `${baseUrl}/red-team-assessment`,
    type: 'website',
    siteName: 'SODU Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Red Team Assessment – SODU Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Team Assessment | SODU Secure',
    description: 'Vollständige Angriffssimulation durch ein dediziertes Red Team. NIS2 & DORA-konform.',
  },
  alternates: { canonical: `${baseUrl}/red-team-assessment` },
  robots: { index: true, follow: true },
};

export default function RedTeamAssessmentLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SODU Secure – Red Team Assessment',
    description: 'Red Team Assessment und APT-Simulation für Unternehmen in Deutschland.',
    url: `${baseUrl}/red-team-assessment`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland', 'Europe'],
    serviceType: ['Red Team Assessment', 'Red Teaming', 'APT Simulation', 'TLPT'],
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€€',
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
