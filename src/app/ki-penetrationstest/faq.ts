export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist ein KI-Penetrationstest?",
    a: "Ein KI-Penetrationstest prüft LLM-basierte Anwendungen - Chatbots, RAG-Systeme, KI-Agenten - gezielt auf KI-spezifische Schwachstellen wie Prompt Injection, Datenabfluss und Tool-Missbrauch, zusätzlich zur klassischen Anwendungssicherheit. Getestet wird manuell, entlang der OWASP LLM Top 10 und MITRE ATLAS.",
  },
  {
    q: "Wir nutzen ein Modell von OpenAI, Anthropic oder Google - brauchen wir trotzdem einen Test?",
    a: "Ja. Die Sicherheit des Basismodells ist Sache des Anbieters - aber Ihre Integration ist das eigentliche Risiko: Ihre Systemprompts, Ihre Datenanbindung, Ihre Tool-Berechtigungen, Ihre Zugriffskontrolle. Genau dort entstehen die ausnutzbaren Lücken, und genau das testen wir.",
  },
  {
    q: "Welche Systeme testet ihr?",
    a: "Kundenchatbots, interne Copilots, RAG-Systeme auf Dokumentenbasis, KI-Agenten mit Tool-Zugriff, LLM-APIs und -Wrapper sowie die umgebende Web-/Cloud-Infrastruktur. Modellunabhängig: OpenAI, Anthropic, Google, Mistral, Open-Source-Modelle und eigene Fine-Tunes.",
  },
  {
    q: "Wie läuft ein KI-Penetrationstest ab?",
    a: "Ein KI-Penetrationstest läuft in vier Schritten ab: Scoping mit Durchsprache von Systemprompt, Datenquellen und Tool-Berechtigungen, systematische Angriffsversuche entlang der OWASP LLM Top 10, Verkettung erfolgreicher Einzelfunde zu vollständigen Angriffsketten und Bericht mit reproduzierbaren Beispielen. Führt ein Angriff zu Datenabfluss oder unerlaubten Tool-Aufrufen, melden wir das sofort während des Tests.",
  },
  {
    q: "Was ist Prompt Injection und warum reicht ein Filter nicht?",
    a: "Prompt Injection bedeutet, dass Anweisungen aus Nutzereingaben oder verarbeiteten Dokumenten das Modell dazu bringen, Ihre Vorgaben zu übergehen - etwa den Systemprompt preiszugeben oder Werkzeuge unerlaubt aufzurufen. Filter und Sperrlisten lassen sich durch Umschreibungen, Kodierungen und fremde Sprachen umgehen. Wirksam ist erst die Begrenzung von Rechten und Datenzugriffen, und genau das prüfen wir.",
  },
  {
    q: "Welche Schwachstellen findet ein KI-Penetrationstest typischerweise?",
    a: "Typisch sind Prompt Injection über Eingaben und eingebettete Dokumente, Abfluss von Systemprompts und Schlüsseln, fehlende Zugriffstrennung im RAG-Index (Nutzer sehen fremde Dokumente), überprivilegierte Tool-Aufrufe bis hin zu Schreibzugriffen sowie fehlende Begrenzung von Anfragen und Kosten. Dazu kommen die klassischen Web- und API-Schwachstellen der umgebenden Anwendung.",
  },
  {
    q: "Was kostet ein KI-Penetrationstest?",
    a: "Ein fokussierter Test einer Chatbot- oder RAG-Anwendung beginnt ab 2.500 €. Komplexe Agenten-Systeme mit mehreren Tools und Datenquellen liegen typischerweise zwischen 4.500 € und 12.000 €. Festpreisangebot nach kurzem Scoping-Gespräch.",
  },
  {
    q: "Was benötigen Sie von uns für einen KI-Penetrationstest?",
    a: "Zugang zur Anwendung mit Testkonten in unterschiedlichen Rollen, eine kurze Beschreibung von Architektur, Datenquellen und angebundenen Tools sowie die schriftliche Testfreigabe. Hilfreich sind Systemprompt und API-Dokumentation, sie sind aber keine Voraussetzung - auf Wunsch testen wir bewusst ohne Vorwissen, so wie ein Außenstehender die Anwendung vorfindet.",
  },
  {
    q: "Wird unsere Produktivumgebung angegriffen und wie sind unsere Daten geschützt?",
    a: "Auf Wunsch testen wir in einer Staging-Umgebung. Steht nur die Produktivumgebung zur Verfügung, arbeiten wir mit Testkonten und markierten Testdaten, verzichten ohne Freigabe auf schreibende Tool-Aufrufe und stimmen Zeitfenster ab. Ein NDA schließen wir vorab; Ihre Prompts, Daten und Modellantworten nutzen wir ausschließlich für diesen Test.",
  },
  {
    q: "Wie unterscheidet sich ein KI-Penetrationstest von einem klassischen Pentest?",
    a: "Ein klassischer Pentest prüft Code, Konfiguration und Infrastruktur - dort gelten feste Regeln. Beim KI-Penetrationstest ist die Eingabe selbst der Angriffsvektor: Dasselbe Ziel wird über Formulierung, Kontext und eingeschleuste Dokumente erreicht, und die Antworten sind nicht deterministisch. Deshalb testen wir mit vielen Varianten und bewerten, wie zuverlässig ein Angriff reproduzierbar ist.",
  },
  {
    q: "Was hat der EU AI Act damit zu tun?",
    a: "Der EU AI Act verlangt für viele KI-Systeme Risikomanagement, Robustheit und Cybersicherheit. Ein dokumentierter KI-Penetrationstest ist ein starker Nachweis für die Cybersicherheitsanforderungen - ergänzend zu DSGVO Art. 32 und ISO 27001.",
  },
  {
    q: "Wie lange dauert der Test?",
    a: "Je nach Umfang 3 bis 10 Testtage. Ergebnis ist ein Bericht mit nachgestellten Angriffsketten, Risikobewertung und konkreten Fix-Empfehlungen - plus kostenlosem Retest nach der Behebung.",
  },
];
