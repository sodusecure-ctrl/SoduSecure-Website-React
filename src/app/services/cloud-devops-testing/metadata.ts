import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Cloud Pentest – AWS, Azure & GCP | Zertifizierte Pentester | SODU Secure',
  description: 'Cloud Pentest: AWS, Azure & GCP – IAM-Eskalation, Fehlkonfigs & CI/CD-Secrets. Zertifizierte Pentester, Festpreis. Jetzt Cloud Pentest konfigurieren & Preis berechnen.',
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
    title: 'Cloud Pentest – AWS, Azure & GCP | SODU Secure',
    description: 'IAM-Eskalation, S3-Fehlkonfigs & CI/CD-Secrets – zertifizierte Pentester. Festpreis, jetzt konfigurieren.',
    url: `${baseUrl}/services/cloud-devops-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/cloud-devops-testing`,
  },
};
