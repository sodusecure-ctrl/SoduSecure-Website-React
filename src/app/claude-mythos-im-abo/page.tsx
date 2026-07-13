import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Claude Mythos Alternative · Defensive KI für Code-Audit | SODU AuditAI',
  description:
    'Anthropic gibt Claude Mythos nicht frei. Wir bieten KI-Code-Audit mit vergleichbarem Reasoning - defensiv, im Abo, mit Berliner Hacker-Triage. Ab 99 €.',
  alternates: { canonical: 'https://sodusecure.com/claude-mythos-im-abo' },
  openGraph: {
    title: 'Claude Mythos im Abo - so geht es defensiv',
    description: 'Was Anthropic zurückhält, liefern wir als wöchentliches PDF: KI-Code-Audit für SaaS und FinTech.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Im Gespräch: Claude Mythos',
        h1Top: 'Claude Mythos im Abo.',
        h1Accent: 'Nur defensiv. Nur für Sie.',
        heroSub:
          'Mai 2026: Anthropic kündigt Claude Mythos an - eine KI, die Tausende unbekannter Schwachstellen findet. Zu gefährlich, sagt der Hersteller, deshalb nicht öffentlich. Sie können nicht warten, bis ein vergleichbares Tool auf der Angreiferseite leakt. Wir bieten KI-Code-Audit mit Frontier-Reasoning der Claude-Klasse, defensiv eingesetzt, als wöchentliches Abo.',
        heroPills: ['Frontier-Reasoning defensiv', 'Wöchentliches PDF', 'Hacker-kuratiert', 'DSGVO + AVV'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Anthropic-API-Kunde · Defensiv eingesetzt · Berliner Hacker · DSGVO · Frankfurt',
        featureLabel: 'Warum es jetzt zählt',
        featureHeadline: 'Die Angriffs-Defensiv-Asymmetrie kippt 2026.',
        featureSub:
          'Modelle wie Claude Mythos zeigen, was technisch möglich ist. Wer heute defensiv KI einsetzt, hat einen Sechs-Monats-Vorsprung an Daten, Findings und Fixes - bevor das offensive Tooling breit verfügbar ist.',
        features: [
          { icon: 'sparkles', title: 'Frontier-Reasoning', text: 'Wir nutzen Claude Opus / Sonnet über die offizielle Anthropic-API. Dieselbe Reasoning-Klasse wie in den Mythos-Tests, defensiv und vertraglich abgesichert.' },
          { icon: 'workflow', title: 'Multi-Pass + Diff', text: 'Discovery-Pass, adversariale Falsifikation, Diff gegen Vorwoche. Halluzinationen werden gefiltert, Trends sichtbar gemacht.' },
          { icon: 'shield', title: 'Berliner Hacker-Triage', text: 'OSCP-zertifizierte Pentester verifizieren Critical/High Findings, bevor das PDF in Ihr Postfach geht.' },
          { icon: 'lock', title: 'Defensiv-Charta', text: 'Keine 0-Day-Vermarktung, keine offensiven Tools, kein Code-Training. Findings gehen ausschließlich an den jeweiligen Code-Eigentümer.' },
          { icon: 'file', title: 'PDF, das Auditoren akzeptieren', text: 'Executive Summary, fertige Code-Fixes, OWASP/CWE/CVSS-Mapping, NIS2 / ISO 27001 / BSI TR-03161-aware.' },
          { icon: 'zap', title: 'Anthropic-API-Privacy', text: 'API-Eingaben werden laut Anthropic-Policy nicht für Modelltraining verwendet. Wir speichern Code ephemer, Hard-Delete nach dem Lauf.' },
        ],
        stepsLabel: 'Wie das läuft',
        stepsHeadline: 'Vier Schritte. Dann defensiv aufgerüstet.',
        steps: [
          { n: '01', t: 'Anfrage', d: '30-Min-Termin. Scope, Repo-Zugang, AVV. Wir machen alles für Sie.' },
          { n: '02', t: 'Erster Lauf', d: 'Multi-Pass-Review mit Claude. Read-only Klon im Worker, Hard-Delete danach.' },
          { n: '03', t: 'Hacker-Triage', d: 'Berliner Pentester verifizieren kritische Findings.' },
          { n: '04', t: 'PDF montags', d: 'DE+EN, fertige Fixes, Compliance-Mapping. Jede Woche.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Mythos & Alternative, beantwortet.',
        faq: [
          { q: 'Was genau ist Claude Mythos?', a: 'Claude Mythos ist nach Anthropics Ankündigung im Mai 2026 ein KI-Modell, das in Testläufen Tausende unbekannter Sicherheitslücken in Software gefunden hat. Anthropic stuft es als zu gefährlich für freie Verfügbarkeit ein und gibt es nicht öffentlich heraus.' },
          { q: 'Nutzen Sie Claude Mythos?', a: 'Nein. Claude Mythos ist von Anthropic nicht für externen Zugriff freigegeben. Wir nutzen die öffentlich verfügbaren Claude-Modelle Opus und Sonnet über die offizielle Anthropic-API - in vergleichbarer Reasoning-Klasse, defensiv eingesetzt, mit eigener Multi-Pass-Pipeline.' },
          { q: 'Wo ist der Unterschied zu einfach Claude selbst aufrufen?', a: 'Multi-Pass-Pipeline, adversariale Verifikation, Diff-Awareness, Hacker-Triage und ein PDF, das Auditoren akzeptieren. Plus AVV, DSGVO-konformes Hosting in Frankfurt und ein Defensiv-nur-Vertrag.' },
          { q: 'Ist das ethisch sauber?', a: 'Wir arbeiten ausschließlich auf Code, dessen Eigentümer uns mit Auftrag und Read-only Zugriff beauftragt hat. Findings gehen nur an den Eigentümer. Keine Veröffentlichung, kein Verkauf, keine offensiven Tools.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat für Standard-Audit. Tarife mit Berliner Hacker-Triage starten ab ~399 €. Pentest-Module separat buchbar. Konfiguration via Demo-Anfrage.' },
        ],
        ctaH2: 'Frontier-Reasoning. Defensiv. Im Abo.',
        ctaSub: 'Anfrage schicken - wir setzen Onboarding und ersten Lauf für Sie auf. Erstes PDF in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
