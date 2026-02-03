import { Metadata } from 'next';

const baseUrl = 'https://sudosecure.com';

export const metadata: Metadata = {
  title: 'Cloud & DevOps Security Testing - AWS, Azure, GCP',
  description: 'Secure your cloud infrastructure and DevOps pipelines. AWS, Azure, GCP security testing, CI/CD pipeline security, and container security assessment.',
  keywords: [
    'cloud security testing',
    'DevOps security',
    'AWS pentesting',
    'Azure security testing',
    'GCP security',
    'container security',
    'CI/CD security',
  ],
  openGraph: {
    title: 'Cloud & DevOps Security Testing - SudoSecure',
    description: 'Professional cloud and DevOps security testing for AWS, Azure, and GCP.',
    url: `${baseUrl}/services/cloud-devops-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/cloud-devops-testing`,
    languages: {
      en: `${baseUrl}/en/services/cloud-devops-testing`,
      de: `${baseUrl}/de/services/cloud-devops-testing`,
    },
  },
};
