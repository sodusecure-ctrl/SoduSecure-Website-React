import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'ISO 27001 Beratung, ISMS & Pentest (A.12.6) | SODU Secure',
  description:
    'ISO 27001 Services fuer Unternehmen: ISMS-Aufbau, Gap-Analyse, Risikobehandlung, Pentest-Nachweise nach A.12.6 und Audit-Vorbereitung fuer die Zertifizierung.',
  keywords: [
    'iso 27001',
    'iso27001',
    'iso 27001 beratung',
    'iso 27001 pentest',
    'a.12.6 pentest',
    'isms aufbau',
    'iso 27001 audit vorbereitung',
    'iso 27001 zertifizierung',
    'nis2 iso 27001',
    'bsi grundschutz iso 27001',
  ],
  openGraph: {
    title: 'ISO 27001 Beratung, ISMS & Pentest (A.12.6) | SODU Secure',
    description:
      'Praxisnahe ISO 27001 Unterstuetzung: Scope, ISMS, Risikomanagement, Pentesting und Audit-ready Dokumentation aus einer Hand.',
    url: `${baseUrl}/services/iso-27001`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/iso-27001`,
  },
};
