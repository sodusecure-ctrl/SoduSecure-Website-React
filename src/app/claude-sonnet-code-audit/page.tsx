import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Claude Sonnet Code Audit für GitHub-Repos | SODU AuditAI',
  description:
    'Wöchentliches Code-Audit mit Claude Sonnet - schnell, genau, skalierbar. Wir liefern PDF mit Findings und Fixes. Ab 99 € pro Repo.',
  alternates: { canonical: 'https://sodusecure.com/claude-sonnet-code-audit' },
  openGraph: {
    title: 'Claude Sonnet Code Audit',
    description: 'Schnelles, genaues Security-Audit mit Claude Sonnet. Jede Woche ein PDF.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Built on Claude Sonnet',
        h1Top: 'Claude Sonnet Code Audit.',
        h1Accent: 'Schnell. Wöchentlich. Skaliert.',
        heroSub:
          'Anthropics Sonnet-Modell ist der Sweet-Spot zwischen Tiefe und Geschwindigkeit. Wir setzen es auf Ihr Repo, kombinieren mit Multi-Pass-Pipeline und liefern montags das PDF, das Snyk niemals schreiben würde.',
        heroPills: ['Claude Sonnet', 'Multi-Pass Audit', 'Diff-aware', 'Made in Germany'],
        primaryCta: 'Demo anfragen',
        primaryHref: '/contact',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Powered by Claude Sonnet · Anthropic API · Frankfurt · AVV vor Start',
        featureLabel: 'Warum Sonnet',
        featureHeadline: 'Tief genug für Logic-Bugs. Schnell genug für Mono-Repos.',
        featureSub:
          'Sonnet liest Multi-File-Kontext mit der Geschwindigkeit, die wöchentliche Reviews auf großen Codebases erst praktikabel macht. Wir bauen die Determinismus-Schicht obendrauf.',
        features: [
          { icon: 'zap', title: 'Sonnet-Speed', text: 'Mono-Repos mit hunderttausenden LOC laufen über Nacht durch. Kein Tagesbatch, kein Stau in der Pipeline.' },
          { icon: 'workflow', title: 'Datenfluss-Tracking', text: 'User-Input bis Sink, durch Middleware, Background-Worker und externe APIs. Cross-File Kontext.' },
          { icon: 'sparkles', title: 'Multi-Pass Verifikation', text: 'Erster Pass findet, zweiter Pass falsifiziert. Was im Bericht landet, ist verifiziert.' },
          { icon: 'file', title: 'Paste-ready Patches', text: 'Sonnet schreibt Fixes, die ein Mid-Level-Dev direkt committet - mit Erklärung der Root-Cause.' },
          { icon: 'shield', title: 'OWASP + CWE Mapping', text: 'Deterministisches Mapping pro Befund, damit Compliance-Audits ohne Nacharbeit funktionieren.' },
          { icon: 'lock', title: 'Read-only ephemer', text: 'Repo-Klon im Worker, Hard-Delete nach dem Lauf. Kein Code in unserer Datenbank.' },
        ],
        stepsLabel: 'Workflow',
        stepsHeadline: 'In vier Schritten zum Sonnet-Audit.',
        steps: [
          { n: '01', t: 'Repo verbinden', d: 'GitHub-App oder Deploy-Key. 5 Minuten Setup.' },
          { n: '02', t: 'Sonnet scannt', d: 'Multi-Pass-Review über Nacht. Auch bei Mono-Repos.' },
          { n: '03', t: 'Diff & Trend', d: 'Vergleich gegen Vorwoche. Regressionen werden rot markiert.' },
          { n: '04', t: 'PDF montags', d: 'DE+EN, Executive Summary, Fix-Patches inline.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Claude Sonnet, beantwortet.',
        faq: [
          { q: 'Warum Sonnet statt Opus?', a: 'Sonnet ist schnell genug, um wöchentliche Audits auch auf großen Mono-Repos kosteneffizient zu fahren - und liefert für >90% der Befunde dieselbe Tiefe wie Opus. Kritische Cases routen wir intern an Opus.' },
          { q: 'Welche Codebase-Größe geht?', a: 'Bis 1 Mio LOC out-of-the-box. Darüber Custom-Setup, gerne via Demo-Termin.' },
          { q: 'Trainiert Anthropic auf unserem Code?', a: 'Nein. Anthropic verwendet API-Eingaben standardmäßig nicht zum Modelltraining. Wir speichern den Code nicht über den Lauf hinaus.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Größere Codebases via Konfigurator.' },
        ],
        ctaH2: 'Sonnet-Speed. Senior-Tiefe.',
        ctaSub: 'Anfrage schicken - wir setzen das Audit auf, Sie sehen das erste PDF in einer Woche.',
        ctaButton: 'Demo anfragen',
      }}
    />
  );
}
