import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Inline-Auszeichnungen fuer die Artikeltexte aus messages/de.json und en.json.
 *
 *   [Linktext](/interne-seite)        -> next/link, bleibt im Client-Routing
 *   [Linktext](https://example.org)  -> <a target="_blank" rel="noopener noreferrer">
 *   **hervorgehoben**                -> <strong>
 *
 * Bewusst KEIN vollwertiges Markdown. Die Texte stammen aus den eigenen
 * Uebersetzungsdateien, nicht von Nutzern - ein Parser, der genau diese zwei
 * Muster kennt, bleibt lesbar und kann kein Markup einschleusen: Der Linktext
 * landet immer als React-Textknoten im Baum, nie als HTML.
 *
 * Alles, was nicht auf "/" oder ein erlaubtes Schema zeigt, wird als reiner
 * Text ausgegeben. Damit kann eine versehentlich eingetragene javascript:-URL
 * nicht zu einem klickbaren Link werden.
 */

const MUSTER = /\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*/g;

/** Erlaubte Linkziele: eigene Seiten, http(s) und mailto. */
function istErlaubt(ziel: string): 'intern' | 'extern' | null {
  if (ziel.startsWith('/')) return 'intern';
  if (/^https?:\/\//i.test(ziel) || /^mailto:/i.test(ziel)) return 'extern';
  return null;
}

export function renderInline(text: string, linkClass?: string): ReactNode {
  // Haeufigster Fall: kein Markup. Dann den String unveraendert zurueckgeben,
  // damit kein Array-Wrapper entsteht.
  if (!text.includes('[') && !text.includes('**')) return text;

  const teile: ReactNode[] = [];
  let zuletzt = 0;
  let schluessel = 0;
  const klasse = linkClass ?? 'text-[#FF3B30] underline underline-offset-2 hover:text-[#FF6B61]';

  for (const treffer of text.matchAll(MUSTER)) {
    const start = treffer.index ?? 0;
    if (start > zuletzt) teile.push(text.slice(zuletzt, start));
    zuletzt = start + treffer[0].length;

    const [, linkText, ziel, fett] = treffer;

    if (fett !== undefined) {
      teile.push(
        <strong key={`b${schluessel++}`} className="font-semibold text-gray-900">
          {fett}
        </strong>,
      );
      continue;
    }

    const art = istErlaubt(ziel);
    if (art === 'intern') {
      teile.push(
        <Link key={`l${schluessel++}`} href={ziel} className={klasse}>
          {linkText}
        </Link>,
      );
    } else if (art === 'extern') {
      teile.push(
        <a key={`l${schluessel++}`} href={ziel} target="_blank" rel="noopener noreferrer" className={klasse}>
          {linkText}
        </a>,
      );
    } else {
      // Unbekanntes Schema: nur den Text, kein Link.
      teile.push(linkText);
    }
  }

  if (zuletzt < text.length) teile.push(text.slice(zuletzt));
  return teile;
}
