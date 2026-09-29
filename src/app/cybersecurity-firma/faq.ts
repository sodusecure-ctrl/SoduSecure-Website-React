export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Wie viel kostet ein Cybersecurity Audit?",
    a: "Das hängt vom Scope ab: Schnell-Assessment: €2.000–€5.000. Vollständiger Pentest: €5.000–€15.000. ISO 27001 Implementierung: €10.000–€40.000. Wir bieten Kostenlose Initialberatung.",
  },
  {
    q: "Brauche ich eine Cybersecurity Firma für kleinere Unternehmen?",
    a: "Ja, auch KMU sind gehäckt. Sogar kleine Unternehmen müssen DSGVO erfüllen. Ein grundlegender Pentest (€3.000) ist sinnvoller als gar nichts.",
  },
  {
    q: "Wie lange dauert ein vollständiger Security Assessment?",
    a: "Scope-abhängig: Web-App: 3–5 Tage. Netzwerk: 5–10 Tage. Enterprise: 2–4 Wochen. Bericht: 72 Stunden nach Abschluss.",
  },
  {
    q: "Könnte meine interne IT das auch machen?",
    a: "Teilweise ja, aber: (1) Unabhängigkeit ist wichtig – interne IT kennt die Infrastruktur. (2) Externe Auditor*innen bevorzugen externe Pentester. (3) Externe haben oft mehr Erfahrung.",
  },
  {
    q: "Wie oft sollten Penetrationstests durchgeführt werden?",
    a: "Mindestens 1x pro Jahr. Nach größeren Systemänderungen, Deployments oder neuen Services: zeitnah retest. ISO 27001 & Compliance verlangt regelmäßige Tests.",
  },
  {
    q: "Was ist der Unterschied zwischen uns und anderen Cybersecurity Firmen?",
    a: "Manche sind Berater (wenig Hands-On), manche sind reine Tech-Dienstleister (wenig Strategie). Wir sind beides: Technische Expertise + Geschäftsverständnis + Langzeitpartnerschaft.",
  },
];
