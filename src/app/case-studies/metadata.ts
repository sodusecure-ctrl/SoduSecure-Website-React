import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  // Titel als Objekt, nicht als String: Ein String verbraucht das Template aus
  // dem Root-Layout und setzt es fuer alle Unterseiten auf null - die
  // Blogartikel standen dadurch ohne "| Sodu Secure" in der SERP, obwohl das
  // Root-Layout eines definiert. Mit eigenem template erbt jede Unterseite das
  // Suffix wieder; der Standardtitel dieser Route bleibt unveraendert.
  title: {
    // Ohne Suffix: Auf den Standardtitel wendet Next das Template des
    // Root-Layouts an, ein hier eingebautes Suffix stuende doppelt da.
    default: 'Pentest Case Studies & Security Blog',
    template: '%s | Sodu Secure',
  },
  description: 'Pentest Case Studies & Security Blog: Echte Befunde, OWASP Top 10, AD-Angriffe & Cloud-Risiken. Von zertifizierten Pentestern - Praxis statt Theorie.',
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
    title: 'Pentest Case Studies & Security Blog',
    description: 'Echte Pentest-Befunde, OWASP Top 10 & AD-Angriffe. Von zertifizierten Pentestern - Praxis statt Theorie.',
    url: `${baseUrl}/case-studies`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/case-studies`,
  },
};
