export type AuditAiFaq = { q: string; a: string };

// Single Source für die sichtbaren FAQs in SoduAuditAILanding (buildFaq)
// und das FAQPage-JSON-LD in page.tsx (DE-Variante).
export const FAQ_EN: AuditAiFaq[] = [
  {
    q: "How fast do we start?",
    a: "Within 24 hours of your request you'll get an onboarding slot. GitHub connection in 5 minutes, first report usually within 7 days.",
  },
  {
    q: "Are the prices with or without VAT?",
    a: "All listed prices are net. 19 % German VAT is added on every invoice – Stripe shows VAT correctly on the receipt.",
  },
  {
    q: "What does onboarding cost?",
    a: "Nothing extra. Setup & onboarding (repo connection, baseline audit, Slack/Teams integration) are included in every plan – no separate setup fee.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. On the monthly plan you cancel by the next billing cycle — no minimum term. On the annual plan you cancel by the end of the term and save ~10 %.",
  },
  {
    q: "What happens to my code?",
    a: "Read-only access via GitHub App. Clones run exclusively on our ISO-compliant infrastructure in Germany and are fully deleted after every audit run.",
  },
  {
    q: "Does this replace a pentest for ISO 27001?",
    a: "Studio replaces code audits. For ISO 27001 / BSI TR-03161, Pro+ additionally includes quarterly manual pentests with a certificate – accepted by auditors.",
  },
];

export const FAQ_DE: AuditAiFaq[] = [
  {
    q: "Wie schnell starten wir?",
    a: "Innerhalb von 24 Stunden nach Anfrage erhalten Sie einen Onboarding-Slot. GitHub-Anbindung in 5 Minuten, erster Bericht meist in 7 Tagen.",
  },
  {
    q: "Sind die Preise mit oder ohne MwSt.?",
    a: "Alle ausgewiesenen Preise sind Nettopreise. Auf jede Rechnung kommen 19 % deutsche Umsatzsteuer obendrauf - Stripe weist die MwSt. korrekt auf der Rechnung aus.",
  },
  {
    q: "Was kostet das Onboarding?",
    a: "Nichts extra. Das Setup & Onboarding (Repo-Anbindung, Baseline-Audit, Slack/Teams-Integration) ist im Plan inklusive – keine separate Setup-Gebühr.",
  },
  {
    q: "Kann ich jederzeit kündigen?",
    a: "Ja. Im Monats-Abo kündigen Sie zur nächsten Abrechnung — keine Mindestlaufzeit. Im Jahres-Abo kündigen Sie zum Laufzeitende und sparen ~10 %.",
  },
  {
    q: "Was passiert mit meinem Code?",
    a: "Read-only Zugriff über GitHub-App. Klone laufen ausschließlich in unserer ISO-konformen Infrastruktur in Deutschland und werden nach jedem Audit-Lauf vollständig gelöscht.",
  },
  {
    q: "Reicht das als Pentest-Ersatz für ISO 27001?",
    a: "Studio ersetzt Code-Audits. For ISO 27001 / BSI TR-03161 enthält Pro+ zusätzlich quartalsweise manuelle Pentests mit Zertifikat - akzeptiert von Auditoren.",
  },
];
