import { Metadata } from 'next';
const baseUrl = 'https://www.sodusecure.com';
export const metadata: Metadata = {
  title: 'Cyber Security Check – IT-Sicherheitscheck für Unternehmen | SODU Secure',
  description: 'Professioneller Cyber Security Check für KMU und Enterprises. Identifizieren Sie Sicherheitslücken bevor Angreifer es tun. BSI-orientierter IT-Sicherheitscheck. Jetzt anfragen.',
  keywords: ['Cyber Security Check','Cybersecurity Check','IT Sicherheitscheck','Cyber Security Assessment','IT Sicherheitsanalyse','Sicherheitscheck Unternehmen','Vulnerability Assessment','Sicherheitslücken finden','BSI Sicherheitscheck'],
  openGraph: { title: 'Cyber Security Check für Unternehmen | SODU Secure', description: 'Professioneller Cyber Security Check – Schwachstellen erkennen und beheben. Jetzt kostenlos anfragen.', url: `${baseUrl}/cyber-security-check`, type: 'website', siteName: 'SODU Secure', images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Cyber Security Check' }] },
  twitter: { card: 'summary_large_image', title: 'Cyber Security Check | SODU Secure', description: 'IT-Sicherheitscheck für Unternehmen – Schwachstellen finden & schließen.' },
  alternates: { canonical: `${baseUrl}/cyber-security-check` },
  robots: { index: true, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'SODU Secure – Cyber Security Check', url: `${baseUrl}/cyber-security-check`, logo: `${baseUrl}/icons/logo.png`, address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' }, telephone: '+49-177-7750985', email: 'info@sodusecure.com', priceRange: '€€', areaServed: ['Germany', 'Austria', 'Switzerland'] };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</>);
}
