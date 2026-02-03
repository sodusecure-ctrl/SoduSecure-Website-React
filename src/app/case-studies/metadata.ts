import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.de';

export const metadata: Metadata = {
  title: 'Case Studies & Security Blog - Real-World Pentesting Insights',
  description: 'Explore our cybersecurity case studies and blog posts. Learn from real penetration testing projects, security vulnerabilities, and expert insights on web security, API testing, and more.',
  keywords: [
    'security blog',
    'case studies',
    'penetration testing blog',
    'cybersecurity insights',
    'security vulnerabilities',
    'pentesting examples',
    'OWASP',
    'SQL injection',
    'API security',
  ],
  openGraph: {
    title: 'Case Studies & Security Blog - sodusecure',
    description: 'Real-world penetration testing case studies and expert cybersecurity blog posts.',
    url: `${baseUrl}/case-studies`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/case-studies`,
    languages: {
      en: `${baseUrl}/en/case-studies`,
      de: `${baseUrl}/de/case-studies`,
    },
  },
};
