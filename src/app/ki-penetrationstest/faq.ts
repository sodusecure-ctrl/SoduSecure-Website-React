export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist ein KI-Penetrationstest?",
    a: "Ein KI-Penetrationstest prüft LLM-basierte Anwendungen – Chatbots, RAG-Systeme, KI-Agenten – gezielt auf KI-spezifische Schwachstellen wie Prompt Injection, Datenabfluss und Tool-Missbrauch, zusätzlich zur klassischen Anwendungssicherheit. Getestet wird manuell, entlang der OWASP LLM Top 10 und MITRE ATLAS.",
  },
  {
    q: "Wir nutzen ein Modell von OpenAI, Anthropic oder Google – brauchen wir trotzdem einen Test?",
    a: "Ja. Die Sicherheit des Basismodells ist Sache des Anbieters – aber Ihre Integration ist das eigentliche Risiko: Ihre Systemprompts, Ihre Datenanbindung, Ihre Tool-Berechtigungen, Ihre Zugriffskontrolle. Genau dort entstehen die ausnutzbaren Lücken, und genau das testen wir.",
  },
  {
    q: "Welche Systeme testet ihr?",
    a: "Kundenchatbots, interne Copilots, RAG-Systeme auf Dokumentenbasis, KI-Agenten mit Tool-Zugriff, LLM-APIs und -Wrapper sowie die umgebende Web-/Cloud-Infrastruktur. Modellunabhängig: OpenAI, Anthropic, Google, Mistral, Open-Source-Modelle und eigene Fine-Tunes.",
  },
  {
    q: "Was kostet ein KI-Penetrationstest?",
    a: "Ein fokussierter Test einer Chatbot- oder RAG-Anwendung beginnt ab 2.500 €. Komplexe Agenten-Systeme mit mehreren Tools und Datenquellen liegen typischerweise zwischen 4.500 € und 12.000 €. Festpreisangebot nach kurzem Scoping-Gespräch.",
  },
  {
    q: "Was hat der EU AI Act damit zu tun?",
    a: "Der EU AI Act verlangt für viele KI-Systeme Risikomanagement, Robustheit und Cybersicherheit. Ein dokumentierter KI-Penetrationstest ist ein starker Nachweis für die Cybersicherheitsanforderungen – ergänzend zu DSGVO Art. 32 und ISO 27001.",
  },
  {
    q: "Wie lange dauert der Test?",
    a: "Je nach Umfang 3 bis 10 Testtage. Ergebnis ist ein Bericht mit nachgestellten Angriffsketten, Risikobewertung und konkreten Fix-Empfehlungen – plus kostenlosem Retest nach der Behebung.",
  },
];
