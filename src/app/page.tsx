import type { Metadata } from 'next';
import HomeClient from '@/components/landing/HomeClient';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Sodu Secure - Pentest & AuditAI',
  description:
    'Manueller Penetrationstest von OSCP-Experten und wöchentliches AI-Code-Review. Wechseln Sie zwischen Sodu /Pentest und Sodu /AuditAI.',
};

export default function Home() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sodu Secure',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'Manual penetration testing and continuous AI-driven code security review.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-177-7750985',
      contactType: 'Sales',
      email: 'info@sodusecure.com',
      availableLanguage: ['German', 'English'],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between Pentest and AuditAI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pentest is a manual, deep, point-in-time assessment by certified testers. AuditAI is a continuous AI-driven code review delivered as a weekly report.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is access to my repository read-only?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Repositories are cloned read-only via GitHub App or token. We never write to your code.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeClient />
    </>
  );
}
