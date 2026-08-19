import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'KI-Penetrationstest | LLMs, RAG & KI-Agenten absichern',
  description:
    'KI-Penetrationstest für LLM-Anwendungen, RAG-Systeme und KI-Agenten - Prompt Injection, Datenabfluss und Tool-Missbrauch nach OWASP LLM Top 10. Von zertifizierten Pentestern. Jetzt anfragen.',
  keywords: [
    'KI Penetrationstest',
    'LLM Pentest',
    'KI Sicherheit',
    'LLM Security Test',
    'Prompt Injection Test',
    'RAG Sicherheit',
    'KI-Agenten Sicherheit',
    'OWASP LLM Top 10',
    'Chatbot Sicherheitstest',
    'AI Security Assessment',
    'KI Anwendung testen',
    'EU AI Act Sicherheit',
  ],
  openGraph: {
    title: 'KI-Penetrationstest | Sodu Secure',
    description:
      'LLMs, RAG-Systeme und KI-Agenten sicher machen: manueller Pentest nach OWASP LLM Top 10 - Prompt Injection, Datenabfluss, Tool-Missbrauch.',
    url: `${baseUrl}/ki-penetrationstest`,
    type: 'website',
    siteName: 'Sodu Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'KI-Penetrationstest – Sodu Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KI-Penetrationstest für LLM-Anwendungen',
    description: 'Prompt Injection, RAG-Datenabfluss, Agenten-Missbrauch: KI-Anwendungen professionell testen lassen.',
  },
  alternates: { canonical: `${baseUrl}/ki-penetrationstest` },
  robots: { index: true, follow: true },
};

export default function KiPenetrationstestLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – KI-Penetrationstest',
    description: 'Penetrationstests für LLM-Anwendungen, RAG-Systeme und KI-Agenten nach OWASP LLM Top 10.',
    url: `${baseUrl}/ki-penetrationstest`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['AI Penetration Testing', 'LLM Security Assessment', 'KI-Sicherheitstest'],
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
