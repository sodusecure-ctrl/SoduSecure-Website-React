export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Ist ein internes Audit für ISO 27001 Pflicht?",
    a: "Ja. Kapitel 9.2 der ISO 27001 verlangt interne Audits in geplanten Abständen – ohne dokumentierte interne Audits gibt es keine Zertifizierung und keine erfolgreiche Überwachung. Üblich ist mindestens ein internes Audit pro Jahr.",
  },
  {
    q: "Darf ein externer Dienstleister das interne Audit durchführen?",
    a: "Ja, das ist ausdrücklich zulässig und weit verbreitet. Die Norm verlangt Objektivität und Unparteilichkeit der Auditoren – genau das ist intern oft schwierig, wenn dieselben Personen das ISMS aufgebaut haben. Ein externer Auditor erfüllt die Unabhängigkeitsanforderung automatisch.",
  },
  {
    q: "Was kostet ein internes Audit?",
    a: "Ein internes ISO-27001-Audit für ein KMU beginnt ab 1.900 € (inkl. Bericht und Maßnahmenplan). Umfangreichere ISMS mit mehreren Standorten liegen typischerweise zwischen 3.500 € und 8.000 €. Festpreisangebot nach kurzem Scoping.",
  },
  {
    q: "Was ist der Unterschied zwischen internem Audit und Zertifizierungsaudit?",
    a: "Das interne Audit führen Sie (oder Ihr Dienstleister) selbst durch – es ist Ihr Kontrollinstrument und Pflichtnachweis. Das Zertifizierungsaudit führt eine akkreditierte Zertifizierungsstelle durch und entscheidet über das Zertifikat. Ein gutes internes Audit findet die Abweichungen, bevor der Zertifizierer sie findet.",
  },
  {
    q: "Wie lange dauert ein internes Audit?",
    a: "Für ein KMU typischerweise 1 bis 3 Audittage plus Berichtserstellung. Die Terminplanung richtet sich nach Ihrem Zertifizierungszyklus – idealerweise liegt das interne Audit 2 bis 3 Monate vor dem externen Audit.",
  },
  {
    q: "Hilft das auch für NIS2?",
    a: "Ja. NIS2 verlangt die Bewertung der Wirksamkeit Ihrer Risikomaßnahmen (Art. 21). Ein strukturiertes Audit- und Gap-Assessment liefert genau diesen Nachweis – und zeigt der Geschäftsleitung, wo sie haftungsrelevante Lücken hat.",
  },
];
