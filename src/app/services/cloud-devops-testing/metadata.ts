import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Cloud Pentest – AWS, Azure & GCP | Zertifizierte Pentester',
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
    title: 'Cloud Pentest – AWS, Azure & GCP',
    description: 'IAM-Eskalation, S3-Fehlkonfigs & CI/CD-Secrets – zertifizierte Pentester. Festpreis, jetzt konfigurieren.',
    url: `${baseUrl}/services/cloud-devops-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/cloud-devops-testing`,
  },
};
