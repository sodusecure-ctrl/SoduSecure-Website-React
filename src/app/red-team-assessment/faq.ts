export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist ein Red Team Assessment?",
    a: "Ein Red Team Assessment ist eine vollständige, realistische Simulation eines gezielten Cyberangriffs gegen Ihre Organisation durch ein dediziertes Angreifer-Team (Red Team). Anders als ein Penetrationstest ist der Umfang nicht auf einzelne Systeme begrenzt - das Red Team nutzt alle verfügbaren Angriffsmethoden: technische, soziale und physische. Das Ziel ist nicht nur Schwachstellen zu finden, sondern zu zeigen, wie weit ein echter Angreifer in Ihrer Organisation kommt.",
  },
  {
    q: "Wer braucht ein Red Team Assessment?",
    a: "Red Team Assessments sind für Unternehmen mit höherem Sicherheitsreifegrad geeignet: wenn bereits Pentests durchgeführt wurden, ein SOC vorhanden ist, oder regulatorische Anforderungen (DORA, NIS2, TIBER-EU) advanced testing erfordern. Für kleinere Unternehmen ohne eigenes Security-Team empfehlen wir zuerst einen Pentest.",
  },
  {
    q: "Was ist der Unterschied zwischen Red Team und Pentest?",
    a: "Ein Pentest prüft spezifische Systeme auf Schwachstellen in einem definierten Zeitfenster. Ein Red Team Assessment simuliert einen langfristigen, zielgerichteten Angriff gegen die gesamte Organisation - inklusive Social Engineering, physische Versuche und Evasion vor Detection-Systemen. Das Blue Team weiß beim Red Team meist nicht, wann der Angriff stattfindet.",
  },
  {
    q: "Wie läuft ein Red Team Assessment ab?",
    a: "Ein Red Team Assessment läuft in vier Phasen ab: Zieldefinition mit einem kleinen eingeweihten Kreis, Aufklärung über öffentlich verfügbare Informationen, Erstzugang über Phishing, exponierte Dienste oder physischen Zutritt und anschließend Ausbreitung im Netz bis zum vereinbarten Ziel. Am Ende stehen Bericht, gemeinsame Nachbesprechung mit dem Blue Team und eine Zeitleiste aller Aktionen.",
  },
  {
    q: "Wie lange dauert ein Red Team Assessment?",
    a: "Typischerweise 4 bis 12 Wochen, je nach Scope. Die Planungsphase dauert 1 bis 2 Wochen, die aktive Angriffsphase 2 bis 8 Wochen, danach folgen Berichterstellung und Präsentation.",
  },
  {
    q: "Was kostet ein Red Team Assessment?",
    a: "Red Team Assessments beginnen bei 8.000 € für kleinere Scopes (SME) und reichen bis 50.000 € für vollständige Enterprise-Assessments mit mehreren Angriffsvektoren. Nach einem NDA-gesicherten Scoping-Gespräch erhalten Sie ein detailliertes Festpreisangebot.",
  },
  {
    q: "Muss unser Blue Team eingeweiht werden?",
    a: "Nein, und genau das ist der Punkt: Nur ein kleiner Kreis, das White Team, kennt den Test. So lässt sich messen, ob Angriffe tatsächlich erkannt, eskaliert und gestoppt werden. Das White Team kann den Test jederzeit abbrechen und dient als Nachweis der Autorisierung, falls Ihre Sicherheitsorganisation den Vorfall meldet.",
  },
  {
    q: "Ist ein Red Team Assessment legal und betrieblich sicher?",
    a: "Ja. Grundlage sind ein schriftlicher Auftrag, Rules of Engagement und eine Autorisierungserklärung, die unsere Tester bei physischen Zugangsversuchen mitführen. Destruktive Aktionen und Datenabfluss sind ausgeschlossen, Nachweise erbringen wir nur exemplarisch. Ein Notfallkontakt im White Team ist jederzeit erreichbar und kann den Test sofort stoppen.",
  },
  {
    q: "Was ist DORA TLPT und brauche ich das?",
    a: "TLPT (Threat-Led Penetration Testing) ist eine Anforderung des Digital Operational Resilience Act (DORA) für Finanzunternehmen. Sodu Secure führt TLPT-konforme Red Team Assessments mit entsprechender Dokumentation durch.",
  },
  {
    q: "Kann ein Red Team Assessment als TLPT eingereicht werden?",
    a: "Nur dann, wenn es von Anfang an als TLPT aufgesetzt wurde. Ein TLPT verlangt die Einbindung der Aufsicht, einen vorgeschalteten Threat-Intelligence-Bericht, den Bezug auf die kritischen oder wichtigen Funktionen und eine Dokumentation entlang des TIBER-EU-Rahmens. Ein regulär beauftragtes Red Team Assessment erfüllt diese Formalien nicht rückwirkend. Es ist aber die beste Vorbereitung darauf, weil dieselben Angriffstechniken und dieselbe Detection geprüft werden. Wie ein TLPT abläuft und wer dazu verpflichtet ist, steht auf unserer TLPT-Seite.",
  },
  {
    q: "Worin unterscheidet sich ein Red Team Assessment von einem TLPT?",
    a: "Im Auftraggeber und im Rahmen, nicht in der Technik. Das Red Team Assessment beauftragen Sie selbst, Ziel und Umfang legen Sie fest, das Ergebnis gehört Ihnen. Beim TLPT gibt die Aufsicht den Rahmen vor: Sie bestimmt die einbezogenen kritischen Funktionen, begleitet die Phasen, verlangt einen separaten Threat-Intelligence-Anbieter und erhält den Abschlussbericht. Entsprechend länger dauert ein TLPT und entsprechend höher liegt der Aufwand. Details dazu auf unserer TLPT-Seite.",
  },
  {
    q: "Was bekommen wir am Ende eines Red Team Assessments?",
    a: "Sie erhalten eine Zeitleiste aller Angriffsschritte mit Zeitstempeln, gegenübergestellt dem, was Ihre Überwachung davon erkannt hat, den technischen Bericht mit Schwachstellen und Angriffspfaden, eine Management-Zusammenfassung sowie einen Maßnahmenplan für die Detection-Lücken. Dazu kommen die gemeinsame Nachbesprechung mit dem Blue Team und der kostenlose Retest nach der Behebung.",
  },
];
