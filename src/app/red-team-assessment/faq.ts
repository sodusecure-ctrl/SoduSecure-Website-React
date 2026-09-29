export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist ein Red Team Assessment?",
    a: "Ein Red Team Assessment ist eine vollständige, realistische Simulation eines gezielten Cyberangriffs gegen Ihre Organisation durch ein dediziertes Angreifer-Team (Red Team). Anders als ein Penetrationstest ist der Umfang nicht auf einzelne Systeme begrenzt – das Red Team nutzt alle verfügbaren Angriffsmethoden: technische, soziale und physische. Das Ziel ist nicht nur Schwachstellen zu finden, sondern zu zeigen, wie weit ein echter Angreifer in Ihrer Organisation kommt.",
  },
  {
    q: "Wer braucht ein Red Team Assessment?",
    a: "Red Team Assessments sind für Unternehmen mit höherem Sicherheitsreifegrad geeignet: wenn bereits Pentests durchgeführt wurden, ein SOC vorhanden ist, oder regulatorische Anforderungen (DORA, NIS2, TIBER-EU) advanced testing erfordern. Für kleinere Unternehmen ohne eigenes Security-Team empfehlen wir zuerst einen Pentest.",
  },
  {
    q: "Was ist der Unterschied zwischen Red Team und Pentest?",
    a: "Ein Pentest prüft spezifische Systeme auf Schwachstellen in einem definierten Zeitfenster. Ein Red Team Assessment simuliert einen langfristigen, zielgerichteten Angriff gegen die gesamte Organisation – inklusive Social Engineering, physische Versuche und Evasion vor Detection-Systemen. Der Blue Team weiß beim Red Team meist nicht, wann der Angriff stattfindet.",
  },
  {
    q: "Wie lange dauert ein Red Team Assessment?",
    a: "Typischerweise 4–12 Wochen, je nach Scope. Die Planungsphase dauert 1–2 Wochen, die aktive Angriffsphase 2–8 Wochen, danach Berichterstellung und Präsentation.",
  },
  {
    q: "Was kostet ein Red Team Assessment?",
    a: "Red Team Assessments beginnen bei 8.000 € für kleinere Scopes (SME) und reichen bis 50.000 € für vollständige Enterprise-Assessments mit mehreren Angriffsvektoren. Nach einem NDI-gesicherten Scoping-Gespräch erhalten Sie ein detailliertes Festpreisangebot.",
  },
  {
    q: "Was ist DORA TLPT und brauche ich das?",
    a: "TLPT (Threat-Led Penetration Testing) ist eine Anforderung des Digital Operational Resilience Act (DORA) für Finanzunternehmen ab 2025. Sodu Secure führt TLPT-konforme Red Team Assessments mit entsprechender Dokumentation durch.",
  },
];
