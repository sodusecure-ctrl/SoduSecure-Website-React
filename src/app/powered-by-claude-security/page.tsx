import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Powered by Claude · Security-Audit für SaaS-Codebases | SODU AuditAI',
  description:
    'Built on Claude. Wir nutzen Anthropics Frontier-Modelle, um Ihren Code zu reviewen wie ein Staff Security-Engineer. Wöchentlicher PDF-Bericht.',
  alternates: { canonical: 'https://sodusecure.com/powered-by-claude-security' },
  openGraph: {
    title: 'Powered by Claude · Security-Audit',
    description: 'Anthropics Claude im Backend. Senior-Engineering im Output. Jede Woche.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Built on Claude',
        h1Top: 'Powered by Claude.',
        h1Accent: 'Verifiziert von Berlinern.',
        heroSub:
          'Anthropics Claude ist heute das stärkste Modell für Code-Reasoning. Wir kombinieren es mit eigener Multi-Pass-Pipeline, adversarialer Verifikation und manueller Triage durch echte Pentester. Was Sie bekommen: ein wöchentliches Security-PDF, das Sie an Investoren, Auditoren und Geschäftsleitung weiterreichen können.',
        heroPills: ['Powered by Claude', 'Adversarial Verifiziert', 'Hacker-kuratiert', 'DSGVO'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Powered by Claude (Anthropic API) · Hacker-kuratiert · DSGVO · Frankfurt-Hosting',
        featureLabel: 'Warum Claude',
        featureHeadline: 'Das stärkste Code-Reasoning-Modell. Mit Pipeline drumherum.',
        featureSub:
          'Claude allein ist ein Tool. Mit unserer Pipeline wird daraus ein reproduzierbares Security-Audit, das Compliance-Auditoren akzeptieren und Devs lieben.',
        features: [
          { icon: 'sparkles', title: 'Frontier-Modell', text: 'Wir setzen jeweils das aktuellste Claude-Modell ein, das Anthropic für Production freigegeben hat. Updates ohne Aufpreis.' },
          { icon: 'workflow', title: 'Multi-Pass Pipeline', text: 'Erst Discovery, dann adversariale Falsifikation, dann Mensch. Halluzinationen werden auf drei Ebenen gefiltert.' },
          { icon: 'shield', title: 'Hacker-kuratiert', text: 'Berliner Pentester triagieren kritische Findings, bevor sie in Ihren Bericht gehen. Maschine + Mensch.' },
          { icon: 'file', title: 'Bericht für alle', text: 'Executive Summary für die Geschäftsleitung, Code-Patches für Devs, Compliance-Mapping für Auditoren - in einem PDF.' },
          { icon: 'lock', title: 'API-Privacy', text: 'Anthropic-API-Eingaben werden nicht für Modelltraining verwendet. Wir speichern Code nur ephemer im Worker.' },
          { icon: 'zap', title: 'Diff jede Woche', text: 'Claude vergleicht jeden Run gegen den letzten. Sie sehen Trends, nicht nur Snapshots.' },
        ],
        stepsLabel: 'Workflow',
        stepsHeadline: 'Vier Schritte. Dann powered by Claude.',
        steps: [
          { n: '01', t: 'Onboarding', d: 'Repo verbinden, AVV signieren, Scope klären. Wir machen alles für Sie.' },
          { n: '02', t: 'Claude reviewt', d: 'Multi-Pass-Analyse über Anthropic-API. Read-only. Hard-Delete nach dem Lauf.' },
          { n: '03', t: 'Mensch kuratiert', d: 'Berliner Hacker prüfen Critical/High Findings, bevor das PDF rausgeht.' },
          { n: '04', t: 'Sie öffnen das PDF', d: 'Jeden Montag früh. DE+EN. Eine Datei, drei Zielgruppen.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Powered by Claude, beantwortet.',
        faq: [
          { q: 'Sind Sie Anthropic-Partner?', a: 'Nein. Wir sind API-Kunde von Anthropic und nutzen "Powered by Claude" gemäß Anthropics Brand-Guidelines. Claude ist das Werkzeug, das Audit-Produkt ist unseres.' },
          { q: 'Was passiert, wenn Anthropic ein neues Modell released?', a: 'Wir testen es gegen unsere Referenz-Findings und rollen es aus, sobald es Regression-frei ist. Sie bekommen das stärkste verfügbare Modell ohne Aufpreis.' },
          { q: 'Wird unser Code zum Trainieren genutzt?', a: 'Nein. Anthropic verwendet API-Eingaben standardmäßig nicht für Modelltraining. Wir speichern Code nicht persistent.' },
          { q: 'Warum nicht selbst Claude über die API rufen?', a: 'Sie könnten - aber dann fehlt Multi-Pass-Pipeline, adversariale Verifikation, Diff-Awareness, Hacker-Triage und das PDF, das Auditoren akzeptieren. Das ist unser Produkt.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Hacker-Triage in höheren Tarifen inklusive.' },
        ],
        ctaH2: 'Powered by Claude. Verifiziert von Menschen.',
        ctaSub: 'Anfrage schicken, wir machen den Rest. Erstes PDF in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
