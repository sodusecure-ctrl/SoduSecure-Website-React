import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Comprehensive Security Audit Services',
  description: 'Full-scale security audits covering all aspects of your digital infrastructure. Identify risks, get compliance reports, and actionable remediation plans.',
  keywords: [
    'security audit',
    'compliance audit',
    'security assessment',
    'risk assessment',
    'security review',
    'compliance testing',
  ],
  openGraph: {
    title: 'Comprehensive Security Audit - sodusecure',
    description: 'Professional security audits covering all aspects of your infrastructure.',
    url: `${baseUrl}/services/security-audit`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/security-audit`,
  },
};
