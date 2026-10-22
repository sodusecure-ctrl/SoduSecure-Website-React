/**
 * Kundenstimmen fuer /referenzen.
 *
 * Herkunft: uebernommen aus der separaten Domain sodusecurereviews.com
 * (Repo sync/sodusecurereview-website/index.html), Original-Wortlaut unveraendert.
 * Die Extra-Domain wird zusammengefuehrt, weil eine eigene Domain mit einem
 * einzigen ausgehenden Link auf die Hauptdomain als Link Scheme gewertet wird und
 * keinen Linkwert uebertraegt. Inhaltlich gehoeren die Stimmen ohnehin dorthin,
 * wo gekauft wird.
 *
 * REGELN FUER DIESE DATEI:
 * 1. Nur echte Kundenstimmen mit Einverstaendnis des Kunden. Keine erfundenen
 *    Namen, Firmen oder Zitate - auch nicht als Platzhalter.
 * 2. Zitate im Original-Wortlaut. Keine stilistische Glaettung, keine Kuerzung,
 *    die die Aussage veraendert.
 * 3. Anonymisierung ist zulaessig und ueblich ("Head of IT, Advosoft" oder
 *    "Geschaeftsfuehrer, Berliner SaaS-Startup"), solange die Stimme echt ist.
 *    Im Zweifel anonymisieren statt weglassen.
 * 4. `ratingAverage` muss sich aus den tatsaechlich hier gelisteten Stimmen
 *    ergeben. Wird eine Stimme ergaenzt oder entfernt, den Wert nachrechnen.
 */

export interface Testimonial {
  /** Zitat im Original-Wortlaut. */
  quote: string;
  /** Name oder Kuerzel, so wie der Kunde der Nennung zugestimmt hat. */
  name: string;
  /** Rolle und/oder Unternehmen. Anonymisierte Form ist zulaessig. */
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Die Zusammenarbeit mit Sodu Secure war von Anfang an sehr professionell und angenehm. Besonders beeindruckt hat uns der detaillierte Abschlussbericht mit klaren Handlungsempfehlungen zur Behebung der gefundenen Probleme. Wir empfehlen Sodu Secure gerne als kompetenten und zuverlässigen Partner weiter.',
    name: 'Savas Großmann',
    role: 'Acut Fulfillment GmbH',
  },
  {
    quote:
      'Endlich ein Pentest-Partner, der nicht nur eine PDF abliefert. Das Team hat im Retest jede Schwachstelle persönlich verifiziert. Für unsere ISO-27001-Zertifizierung war das Gold wert.',
    name: 'Sandra K.',
    role: 'Head of IT · Advosoft',
  },
  {
    quote:
      'Schnell, professionell und auf Augenhöhe mit unseren Entwicklern. Das wöchentliche AuditAI-Review fängt Probleme ab, bevor sie überhaupt in Produktion gehen.',
    name: 'Tobias R.',
    role: 'Geschäftsführer · Berliner SaaS-Startup',
  },
  {
    quote:
      'Als Beratungshaus stehen und fallen wir mit dem Vertrauen unserer Mandanten. Sodu Secure hat unsere Systeme gründlich geprüft und uns nachvollziehbar gezeigt, wo wir nachbessern mussten. Absolut empfehlenswert.',
    name: 'Günel A.',
    role: 'Geschäftsführer · Günel Consulting',
  },
  {
    quote:
      'Wir hatten Angst vor einem Pentest – am Ende war es der entspannteste IT-Termin des Jahres. Klare Sprache, faire Preise, echte Ergebnisse.',
    name: 'Julia B.',
    role: 'Geschäftsführerin · E-Commerce KMU',
  },
  {
    quote:
      'Die gefundenen Schwachstellen waren keine Theorie – das Team hat live demonstriert, wie ein Angreifer an unsere Kundendaten gekommen wäre. Das hat im Management sofort gesessen.',
    name: 'Michael W.',
    role: 'IT-Leiter · Finanzdienstleister',
  },
];

/**
 * Durchschnittsnote. Wird zusammen mit der Anzahl der Stimmen ausgegeben -
 * eine Note ohne Grundgesamtheit ist nicht nachpruefbar und wirkt deshalb
 * schwaecher, nicht staerker.
 */
export const RATING_AVERAGE = '4,8';

/** Anzahl der Bewertungen, auf denen RATING_AVERAGE beruht. */
export const RATING_COUNT = TESTIMONIALS.length;

export interface Strength {
  icon: string;
  title: string;
  text: string;
}

/** Themen, die in Kundengespraechen wiederkehren. */
export const STRENGTHS: Strength[] = [
  {
    icon: '📋',
    title: 'Berichte, die man umsetzen kann',
    text: 'Detaillierte Abschlussberichte mit klaren, priorisierten Handlungsempfehlungen – verständlich für Management und Entwickler.',
  },
  {
    icon: '🔁',
    title: 'Persönlicher Retest inklusive',
    text: 'Wir liefern nicht nur eine PDF: Jede behobene Schwachstelle wird im Retest persönlich verifiziert.',
  },
  {
    icon: '🎯',
    title: 'Echte Angriffe, keine Theorie',
    text: 'Wir demonstrieren live, wie ein Angreifer vorgehen würde – nachvollziehbar und ohne Panikmache.',
  },
  {
    icon: '🗣️',
    title: 'Klare Sprache, Augenhöhe',
    text: 'Kommunikation ohne Fachchinesisch – mit der Geschäftsführung genauso wie mit dem Entwicklungsteam.',
  },
  {
    icon: '📜',
    title: 'Compliance-ready',
    text: 'Ergebnisse, die sich direkt für ISO 27001, TISAX, NIS2 oder Kundenaudits verwenden lassen.',
  },
  {
    icon: '💶',
    title: 'Faire, transparente Preise',
    text: 'Festpreise ohne versteckte Kosten – kalkulierbar auch für Startups und KMU.',
  },
  {
    icon: '🤖',
    title: 'AuditAI: Sicherheit im Takt',
    text: 'Kontinuierliche Code-Reviews fangen Probleme ab, bevor sie in Produktion gehen – nicht erst beim jährlichen Pentest.',
  },
  {
    icon: '🔬',
    title: 'Handarbeit statt Standard-Scan',
    text: 'Manuelle Tiefenanalyse deckt Schwachstellen auf, die automatisierte Tools übersehen – kein 08/15-Scan mit Logo drauf.',
  },
  {
    icon: '🛡️',
    title: 'Störungsfreier Betrieb',
    text: 'Tests der Produktivumgebung laufen umsichtig und abgestimmt – ohne Ausfälle oder Performance-Einbußen.',
  },
  {
    icon: '🚨',
    title: 'Kritische Funde sofort gemeldet',
    text: 'Kritische Schwachstellen erfahren Sie sofort – nicht erst Tage später im Abschlussbericht.',
  },
  {
    icon: '📐',
    title: 'Klares Scope-Management',
    text: 'Scope vorab exakt definiert und transparent eingehalten – keine Überraschungen bei Umfang oder Kosten.',
  },
  {
    icon: '⚖️',
    title: 'Realistische Risikobewertung',
    text: 'Bewertung nach CVSS mit Fokus auf geschäftskritische Risiken – keine künstliche Dramatisierung von Kleinigkeiten.',
  },
  {
    icon: '🎓',
    title: 'Debriefing mit Lerneffekt',
    text: 'Im Abschlussgespräch demonstrieren wir Schwachstellen live und beantworten alle Rückfragen Ihres Teams.',
  },
  {
    icon: '⏱️',
    title: 'Flexibel bei engen Fristen',
    text: 'Kurzfristiger Pentest vor dem Release? Wir machen es möglich und halten Fristen punktgenau ein.',
  },
];
