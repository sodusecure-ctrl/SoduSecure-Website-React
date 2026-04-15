import { Metadata } from 'next';
const baseUrl = 'https://www.sodusecure.com';
export const metadata: Metadata = {
  title: 'Cyber Security Check Preis – Preisliste & Angebote | SODU Secure',
  description: 'Cyber Security Check Preis: Aktuelle Preisliste für IT-Sicherheitschecks. Vergleichen Sie Angebote und erhalten Sie Ihr persönliches Festpreisangebot vom zertifizierten Experten.',
  keywords: ['Cyber Security Check Preis','IT Sicherheitscheck Preis','Cybersecurity Check Kosten','Security Assessment Preis','Sicherheitscheck Preis','IT Sicherheit Preis Vergleich'],
  openGraph: { title: 'Cyber Security Check Preis – Preisliste 2025 | SODU Secure', description: 'Aktuelle Preise für Cyber Security Checks. Festpreisangebote vom zertifizierten Experten.', url: `${baseUrl}/cyber-security-check-preis`, type: 'website', siteName: 'SODU Secure', images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Cyber Security Check Preis' }] },
  twitter: { card: 'summary_large_image', title: 'Cyber Security Check Preis', description: 'Aktuelle Preisliste für IT-Sicherheitschecks.' },
  alternates: { canonical: `${baseUrl}/cyber-security-check-preis` },
  robots: { index: true, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'SODU Secure – Cyber Security Check Preis', url: `${baseUrl}/cyber-security-check-preis`, logo: `${baseUrl}/icons/logo.png`, address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' }, telephone: '+49-177-7750985', email: 'info@sodusecure.com', priceRange: '€€' };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</>);
}
