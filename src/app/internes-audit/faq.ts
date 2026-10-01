export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Ist ein internes Audit für ISO 27001 Pflicht?",
    a: "Ja. Kapitel 9.2 der ISO 27001 verlangt interne Audits in geplanten Abständen - ohne dokumentierte interne Audits gibt es keine Zertifizierung und keine erfolgreiche Überwachung. Üblich ist mindestens ein internes Audit pro Jahr.",
  },
  {
    q: "Darf ein externer Dienstleister das interne Audit durchführen?",
    a: "Ja, das ist ausdrücklich zulässig und weit verbreitet. Die Norm verlangt Objektivität und Unparteilichkeit der Auditoren - genau das ist intern oft schwierig, wenn dieselben Personen das ISMS aufgebaut haben. Ein externer Auditor erfüllt die Unabhängigkeitsanforderung automatisch.",
  },
  {
    q: "Was kostet ein internes Audit?",
    a: "Ein internes ISO-27001-Audit für ein KMU beginnt ab 1.900 € (inkl. Bericht und Maßnahmenplan). Umfangreichere ISMS mit mehreren Standorten liegen typischerweise zwischen 3.500 € und 8.000 €. Festpreisangebot nach kurzem Scoping.",
  },
  {
    q: "Wie läuft ein internes Audit ab?",
    a: "Ein internes Audit läuft in fünf Schritten ab: Auditplan mit Umfang und Terminen, Dokumentenprüfung von Richtlinien, Statement of Applicability und Nachweisen, Interviews mit den Prozessverantwortlichen, Stichproben vor Ort oder remote und abschließend der Auditbericht mit Abweichungen, Hinweisen und Maßnahmenplan. Die Ergebnisse bereiten wir für die Managementbewertung auf.",
  },
  {
    q: "Was wird beim internen Audit geprüft?",
    a: "Geprüft werden die Anforderungen der Kapitel 4 bis 10 der ISO 27001 sowie die im Statement of Applicability erklärten Controls aus Annex A - also Risikomanagement, Rollen und Zuständigkeiten, Zugriffsverwaltung, Lieferantensteuerung, technisches Schwachstellenmanagement nach A.8.8, Notfallvorsorge und Schulungsnachweise. Nachgewiesen wird nicht die Absicht, sondern die tatsächliche Umsetzung im Alltag.",
  },
  {
    q: "Was ist der Unterschied zwischen internem Audit und Zertifizierungsaudit?",
    a: "Das interne Audit führen Sie (oder Ihr Dienstleister) selbst durch - es ist Ihr Kontrollinstrument und Pflichtnachweis. Das Zertifizierungsaudit führt eine akkreditierte Zertifizierungsstelle durch und entscheidet über das Zertifikat. Ein gutes internes Audit findet die Abweichungen, bevor der Zertifizierer sie findet.",
  },
  {
    q: "Wie lange dauert ein internes Audit?",
    a: "Für ein KMU typischerweise 1 bis 3 Audittage plus Berichtserstellung. Die Terminplanung richtet sich nach Ihrem Zertifizierungszyklus - idealerweise liegt das interne Audit 2 bis 3 Monate vor dem externen Audit.",
  },
  {
    q: "Wie oft muss ein internes Audit durchgeführt werden?",
    a: "Mindestens einmal jährlich, geplant über ein mehrjähriges Auditprogramm, in dem alle Bereiche und Controls bis zum Ende des Zertifizierungszyklus abgedeckt sind. Kritische Prozesse prüfen Sie häufiger. Nach größeren Änderungen an Organisation, IT-Landschaft oder Dienstleistern ist ein zusätzliches Audit sinnvoll.",
  },
  {
    q: "Was benötigen Sie von uns für das interne Audit?",
    a: "Zugriff auf Ihre ISMS-Dokumentation, das Statement of Applicability, das Risikoregister und vorhandene Nachweise sowie Termine mit den Prozessverantwortlichen. Ein Ansprechpartner koordiniert die Interviews. Gibt es noch keine vollständige Dokumentation, starten wir mit einer Gap-Analyse und zeigen zuerst, was für die Zertifizierung fehlt.",
  },
  {
    q: "Was passiert, wenn das interne Audit Abweichungen findet?",
    a: "Abweichungen sind der Zweck des Audits, nicht sein Scheitern. Jede Feststellung wird nach Schwere eingeordnet, mit Ursache und empfohlener Korrekturmaßnahme dokumentiert und mit Verantwortlichem und Frist versehen. Sie beheben die Punkte vor dem Zertifizierungsaudit - genau diesen dokumentierten Verbesserungszyklus will die Zertifizierungsstelle sehen.",
  },
  {
    q: "Ersetzt das interne Audit einen Penetrationstest?",
    a: "Nein. Das interne Audit prüft, ob Ihr Managementsystem wirkt; ob technische Maßnahmen tatsächlich greifen, zeigt erst ein Penetrationstest. ISO 27001 verlangt mit A.8.8 ein funktionierendes technisches Schwachstellenmanagement, und dafür brauchen Sie Testergebnisse. Sinnvolle Reihenfolge: technische Prüfung, dann internes Audit, dann Zertifizierungsaudit.",
  },
  {
    q: "Hilft das auch für NIS2?",
    a: "Ja. NIS2 verlangt die Bewertung der Wirksamkeit Ihrer Risikomaßnahmen (Art. 21). Ein strukturiertes Audit- und Gap-Assessment liefert genau diesen Nachweis - und zeigt der Geschäftsleitung, wo sie haftungsrelevante Lücken hat.",
  },
];
