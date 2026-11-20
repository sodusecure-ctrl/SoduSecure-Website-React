/**
 * Prueft, ob eine E-Mail-Adresse von einem Freemail- oder Wegwerf-Anbieter stammt.
 *
 * Hintergrund: Die Auswertung der Anfragen zeigte einen deutlichen Zusammenhang
 * zwischen Freemail-Adressen und Anfragen, aus denen nie ein Projekt wurde. Im
 * September kamen 45 % der Anfragen von Freemail-Adressen und keine davon fuehrte
 * zu einem Angebot; im Oktober kamen alle Anfragen von Firmendomains, drei davon
 * wurden zu Angeboten. Das Feld heisst auf /request-pentest ohnehin schon
 * "Unternehmens-E-Mail" - es wurde nur nie geprueft.
 *
 * Bewusst gegen eine Positivliste entschieden: Jede Firmendomain zuzulassen und
 * nur bekannte Freemail-Anbieter zu sperren, laesst neue und seltene
 * Firmendomains durch. Eine Positivliste wuerde genau die Kunden aussperren, die
 * man gewinnen will.
 *
 * Auch Wegwerfadressen stehen auf der Liste: Sie kommen fast ausschliesslich von
 * Besuchern, die das PDF-Angebot abgreifen wollen, ohne erreichbar zu sein.
 */

/**
 * Freemail- und Wegwerf-Domains. Kleingeschrieben, ohne fuehrenden Punkt.
 *
 * Bei Zweifelsfaellen bewusst mit aufgenommen: posteo.de, mailbox.org und
 * protonmail sind zwar kostenpflichtig und serioes, aber es sind persoenliche
 * Postfaecher, keine Firmendomains. Wer darueber geschaeftlich schreibt, nutzt
 * eine eigene Domain - dann greift die Sperre nicht.
 */
const GESPERRTE_DOMAINS = new Set([
  // Grosse internationale Anbieter
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.de', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.it', 'ymail.com', 'rocketmail.com',
  'hotmail.com', 'hotmail.de', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.it',
  'outlook.com', 'outlook.de', 'outlook.fr', 'outlook.it',
  'live.com', 'live.de', 'live.co.uk', 'msn.com',
  'aol.com', 'aol.de',
  'icloud.com', 'me.com', 'mac.com',
  'zoho.com', 'yandex.com', 'yandex.ru', 'mail.ru', 'inbox.ru', 'bk.ru', 'list.ru',

  // Deutschsprachiger Raum - hier kommt der Grossteil der Anfragen her
  'web.de',
  'gmx.de', 'gmx.net', 'gmx.at', 'gmx.ch', 'gmx.com', 'gmx.li', 'gmx.info', 'gmx.biz',
  't-online.de', 'telekom.de',
  'freenet.de', 'arcor.de', 'online.de', 'email.de', 'mail.de',
  'vodafone.de', 'kabelmail.de', 'unitybox.de', 'ewe.net', 'netcologne.de', 'versanet.de',
  '1und1.de', 'alice-dsl.de', 'o2online.de',
  'bluewin.ch', 'sunrise.ch', 'hispeed.ch', 'gmx.org',
  'aon.at', 'chello.at', 'a1.net',

  // Datenschutz-Anbieter: serioes, aber persoenliche Postfaecher
  'posteo.de', 'posteo.net', 'mailbox.org',
  'protonmail.com', 'protonmail.ch', 'proton.me', 'pm.me',
  'tutanota.com', 'tutanota.de', 'tuta.io', 'tutamail.com',
  'fastmail.com', 'fastmail.fm', 'hushmail.com', 'startmail.com',

  // Weitere europaeische Anbieter
  'laposte.net', 'orange.fr', 'free.fr', 'wanadoo.fr', 'sfr.fr',
  'libero.it', 'virgilio.it', 'alice.it', 'tiscali.it',
  'seznam.cz', 'centrum.cz',
  'wp.pl', 'o2.pl', 'interia.pl', 'onet.pl', 'gazeta.pl',
  'telenet.be', 'skynet.be', 'ziggo.nl', 'kpnmail.nl', 'home.nl',

  // Wegwerf- und Einmaladressen
  'mailinator.com', '10minutemail.com', '10minutemail.net', 'guerrillamail.com',
  'guerrillamail.net', 'sharklasers.com', 'temp-mail.org', 'tempmail.com',
  'tempmailo.com', 'yopmail.com', 'yopmail.fr', 'trashmail.com', 'trashmail.de',
  'wegwerfmail.de', 'wegwerfemail.de', 'throwawaymail.com', 'maildrop.cc',
  'getnada.com', 'dispostable.com', 'fakeinbox.com', 'moakt.com', 'mohmal.com',
  'emailondeck.com', 'mintemail.com', 'spamgourmet.com', 'byom.de',
  'einrot.com', 'mailnesia.com', 'tempr.email', 'discard.email', 'spam4.me',
]);

/** Holt die kleingeschriebene Domain aus einer Adresse, oder null. */
export function emailDomain(email: string): string | null {
  const at = email.lastIndexOf('@');
  if (at < 0 || at === email.length - 1) return null;
  const domain = email.slice(at + 1).trim().toLowerCase();
  return domain.includes('.') ? domain : null;
}

/**
 * true, wenn die Adresse von einem Freemail- oder Wegwerf-Anbieter stammt.
 *
 * Prueft auch Subdomains: "name@mail.gmx.de" wird ebenso erkannt wie
 * "name@gmx.de". Bei einer unleserlichen Adresse gibt die Funktion false
 * zurueck - ueber das Format entscheidet die normale Formatpruefung, nicht diese.
 */
export function istFreemail(email: string): boolean {
  const domain = emailDomain(email);
  if (!domain) return false;
  if (GESPERRTE_DOMAINS.has(domain)) return true;
  // Subdomain-Treffer, z. B. "mail.gmx.de" -> "gmx.de"
  return [...GESPERRTE_DOMAINS].some((d) => domain.endsWith('.' + d));
}

/**
 * Der Hinweistext, wenn jemand eine private Adresse eingibt.
 *
 * Bewusst erklaerend statt abweisend: Der Besucher hat gerade einen
 * Konfigurator bis zum Ende ausgefuellt. Er soll verstehen, was zu tun ist,
 * und nicht den Eindruck bekommen, abgelehnt zu werden.
 */
export function freemailHinweis(isEnglish: boolean): string {
  return isEnglish
    ? 'Please use your company email address, for example name@yourcompany.com. We only send quotes to business addresses.'
    : 'Bitte nutzen Sie Ihre geschäftliche E-Mail-Adresse, zum Beispiel name@ihrefirma.de. Angebote versenden wir ausschließlich an Firmenadressen.';
}
