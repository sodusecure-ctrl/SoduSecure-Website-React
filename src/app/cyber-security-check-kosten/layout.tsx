import { Metadata } from 'next';
const baseUrl = 'https://www.sodusecure.com';
export const metadata: Metadata = {
  title: 'Cyber Security Check Kosten – Was kostet ein Sicherheitscheck? | SODU Secure',
  description: 'Cyber Security Check Kosten im Überblick: Wie viel kostet ein IT-Sicherheitscheck für Ihr Unternehmen? Transparente Preise ab 800 €. Jetzt Angebot einholen.',
  keywords: ['Cyber Security Check Kosten','IT Sicherheitscheck Kosten','Cybersecurity Check Preis','Security Audit Kosten','Sicherheitscheck Kosten','Vulnerability Assessment Kosten','IT Sicherheit Kosten'],
  openGraph: { title: 'Cyber Security Check Kosten 2025 | SODU Secure', description: 'Transparente Preise für IT-Sicherheitschecks. Festpreisangebot in 24 Stunden.', url: `${baseUrl}/cyber-security-check-kosten`, type: 'website', siteName: 'SODU Secure', images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Cyber Security Check Kosten' }] },
  twitter: { card: 'summary_large_image', title: 'Cyber Security Check Kosten', description: 'Was kostet ein Cyber Security Check? Transparente Preise.' },
  alternates: { canonical: `${baseUrl}/cyber-security-check-kosten` },
  robots: { index: true, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'SODU Secure – Cyber Security Check Kosten', url: `${baseUrl}/cyber-security-check-kosten`, logo: `${baseUrl}/icons/logo.png`, address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' }, telephone: '+49-177-7750985', email: 'info@sodusecure.com', priceRange: '€€' };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</>);
}
