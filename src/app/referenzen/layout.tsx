import type { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  // Mit dem Template-Suffix " | Sodu Secure" aus dem Root-Layout ergibt der
  // Titel 54 Zeichen und bleibt in der SERP vollstaendig sichtbar.
  title: 'Referenzen | Was Kunden über Sodu Secure sagen',
  description:
    'Kundenstimmen zu Penetrationstests und AuditAI von Sodu Secure aus Berlin - im Original-Wortlaut, mit Rolle und Branche der Kunden.',
  keywords: [
    'Sodu Secure Referenzen',
    'Sodu Secure Erfahrungen',
    'Pentest Anbieter Erfahrungen',
    'Penetrationstest Referenzen',
    'Pentest Kundenstimmen',
  ],
  alternates: { canonical: `${baseUrl}/referenzen` },
  openGraph: {
    title: 'Referenzen | Was Kunden über Sodu Secure sagen',
    description:
      'Kundenstimmen zu Penetrationstests und AuditAI von Sodu Secure aus Berlin - im Original-Wortlaut.',
    url: `${baseUrl}/referenzen`,
    type: 'website',
    siteName: 'Sodu Secure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Referenzen | Was Kunden über Sodu Secure sagen | Sodu Secure',
    description:
      'Kundenstimmen zu Penetrationstests und AuditAI von Sodu Secure aus Berlin - im Original-Wortlaut.',
  },
  robots: { index: true, follow: true },
};

export default function ReferenzenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
