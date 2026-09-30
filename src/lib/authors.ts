/**
 * Zentrale Autoren-Definition (Single Source of Truth fuer Schema.org + sichtbare Autorenbox).
 *
 * WICHTIG - Regeln fuer diese Datei:
 * 1. Hier stehen ausschliesslich real belegte Angaben. Keine erfundenen Namen, Rollen,
 *    Zertifikate oder Profil-URLs.
 * 2. `sameAs` wird nur gefuellt, wenn ein echtes, oeffentliches Profil existiert und im
 *    Repo belegt ist (z. B. LinkedIn-Unternehmensseite aus dem Footer). Ein persoenliches
 *    LinkedIn-Profil ist im Repo nicht hinterlegt - deshalb steht dort nichts.
 * 3. Zertifikate nur, wenn sie fuer die konkrete Person belegt sind. Der site-etablierte
 *    Claim "OSCP/OSWE/CEH-zertifizierte Tester" gilt fuer das Team, nicht automatisch
 *    fuer eine einzelne Person - deshalb wird er hier nicht auf Personen verteilt.
 * 4. Autoren, die hier NICHT registriert sind, werden bewusst nur mit ihrem Namen als
 *    Person ausgegeben (siehe `authorJsonLd`) - ohne Rolle, ohne URL, ohne sameAs.
 */

export const SITE_URL = 'https://sodusecure.com';

/** Stabile @id der Organisation aus src/app/layout.tsx (orgJsonLd). */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Stabile @id der WebSite-Entitaet aus src/app/layout.tsx (websiteJsonLd). */
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Belegte, oeffentliche Profile der Organisation. Muss mit `sameAs` in
 * src/app/layout.tsx (orgJsonLd) uebereinstimmen - dort liegt die Hauptausgabe.
 */
export const ORGANIZATION_SAME_AS = [
  'https://www.linkedin.com/company/sodu-secure-gmbh',
  'https://x.com/SoduSecure',
];

export interface Author {
  /** Name exakt so, wie er sichtbar im Artikel steht (Byline + Autorenbox). */
  name: string;
  /** 'Person' = benannter Mensch, 'Organization' = Redaktion/Team (verweist auf die Org-Entitaet). */
  type: 'Person' | 'Organization';
  /** Rolle wie in der sichtbaren Autorenbox (messages/*.json -> authorBio.role). */
  jobTitle?: string;
  /** Kurzbio fuer die sichtbare Autorenbox, falls kein artikelspezifischer Text vorliegt. */
  bio?: string;
  /**
   * Belegte Zertifizierungen dieser Person. Leer lassen, solange nicht individuell belegt.
   * Erlaubt sind ausschliesslich OSCP, OSWE, CEH (site-etablierte Claims).
   */
  certifications?: Array<'OSCP' | 'OSWE' | 'CEH'>;
  /** Nur echte, oeffentlich erreichbare Profile. Niemals konstruieren. */
  sameAs?: string[];
}

/**
 * Registry, gekeyed auf den Autorennamen, wie er in src/lib/blogData.ts und in den
 * Uebersetzungen (messages/*.json -> <artikel>.author) steht.
 */
export const authors: Record<string, Author> = {
  'Kerim K.': {
    name: 'Kerim K.',
    type: 'Person',
    jobTitle: 'Geschäftsführer & Offensive Security, Sodu Secure GmbH',
    bio: 'Verantwortet die Durchführung von Penetrationstests bei Sodu Secure und die technische Qualitätssicherung der Berichte.',
  },
  'Sodu Secure Team': {
    name: 'Sodu Secure Team',
    type: 'Organization',
    jobTitle: 'Offensive Security, Sodu Secure GmbH',
    bio: 'Das Pentest-Team von Sodu Secure aus Berlin - OSCP-, OSWE- und CEH-zertifizierte Tester mit über 500 durchgeführten Pentests.',
    sameAs: ORGANIZATION_SAME_AS,
  },
};

/** Liefert den registrierten Autor oder undefined, wenn der Name nicht belegt ist. */
export function getAuthor(name: string | undefined | null): Author | undefined {
  if (!name) return undefined;
  return authors[name];
}

type PersonNode = {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  description?: string;
  worksFor?: { '@id': string };
  sameAs?: string[];
  hasCredential?: Array<{
    '@type': 'EducationalOccupationalCredential';
    credentialCategory: string;
    name: string;
  }>;
};

type OrganizationRef = { '@id': string; '@type': 'Organization'; name: string };

/**
 * Schema.org-Knoten fuer das `author`-Feld eines Article/TechArticle.
 *
 * - Registrierter Team-Eintrag  -> Referenz auf die Organisation (@id), kein Person-Fake.
 * - Registrierte Person         -> Person-Knoten mit belegten Feldern.
 * - Unbekannter Name            -> Person-Knoten NUR mit Namen. Bewusst ohne Rolle, URL
 *                                 oder sameAs, damit keine unbelegten Angaben maschinenlesbar
 *                                 behauptet werden.
 */
export function authorJsonLd(name: string | undefined | null): PersonNode | OrganizationRef {
  const author = getAuthor(name);

  if (!author) {
    return { '@type': 'Person', name: name ?? 'Sodu Secure Team' };
  }

  if (author.type === 'Organization') {
    return { '@id': ORGANIZATION_ID, '@type': 'Organization', name: author.name };
  }

  const node: PersonNode = {
    '@type': 'Person',
    name: author.name,
    worksFor: { '@id': ORGANIZATION_ID },
  };
  if (author.jobTitle) node.jobTitle = author.jobTitle;
  if (author.bio) node.description = author.bio;
  if (author.sameAs?.length) node.sameAs = author.sameAs;
  if (author.certifications?.length) {
    node.hasCredential = author.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential' as const,
      credentialCategory: 'certification',
      name: cert,
    }));
  }
  return node;
}
