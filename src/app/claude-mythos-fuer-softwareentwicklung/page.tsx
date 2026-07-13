import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Claude Mythos für Ihre Softwareentwicklung | SODU AuditAI',
  description:
    'KI-gestütztes Security-Code-Review für Ihre Softwareentwicklung. Frontier-Reasoning der Claude-Klasse, defensiv eingesetzt. Wöchentliches PDF ab 99 €.',
  alternates: { canonical: 'https://sodusecure.com/claude-mythos-fuer-softwareentwicklung' },
  openGraph: {
    title: 'Claude Mythos für Ihre Softwareentwicklung',
    description: 'Defensive KI im Dev-Workflow. Jede Woche ein priorisierter Bericht mit fertigen Fixes.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Für Ihre Softwareentwicklung',
        h1Top: 'Claude Mythos für Ihre',
        h1Accent: 'Softwareentwicklung.',
        heroSub:
          'Anthropic hat im Mai 2026 mit Claude Mythos gezeigt, was KI in Sachen Schwachstellen-Discovery leisten kann - und das Modell wegen der Gefahr unter Verschluss gestellt. Wir bringen dieselbe Reasoning-Klasse defensiv in Ihren Entwicklungs-Workflow: Pull-Request-aware, Diff-bewusst, mit fertigen Code-Patches. Ihre Devs commiten weiter, wir liefern jeden Montag den Sicherheits-Befund.',
        heroPills: ['Diff-aware', 'PR-tauglich', 'Fertige Code-Patches', 'Wöchentliches PDF'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Anthropic-API-Kunde · Defensiv eingesetzt · DSGVO · Frankfurt-Hosting · AVV vor Start',
        featureLabel: 'Für Devs gebaut',
        featureHeadline: 'KI-Security, die sich in den Dev-Workflow einfügt.',
        featureSub:
          'Wir liefern Security-Findings dort, wo Ihre Devs ohnehin arbeiten: priorisiert, paste-ready und ohne Tooling-Lärm.',
        features: [
          { icon: 'git', title: 'Pull-Request-aware', text: 'Claude liest jeden neuen Branch im Kontext des Main-Repos. Was Sie diese Woche commiten, ist nächsten Montag im Bericht.' },
          { icon: 'file', title: 'Paste-ready Patches', text: 'Jedes Finding kommt mit fertigem Code-Patch. Junior-Devs können direkt mergen, Seniors review-en in Sekunden.' },
          { icon: 'workflow', title: 'Diff gegen Vorwoche', text: 'Sie sehen, welche neuen Risiken in den letzten 7 Tagen reingekommen sind - nicht den ganzen Backlog jedes Mal.' },
          { icon: 'sparkles', title: 'Frontier-Reasoning', text: 'Multi-File Datenfluss, Auth-Ketten, Logic-Bugs. Dieselbe Klasse Code-Verständnis wie in den Anthropic-Mythos-Tests, defensiv eingesetzt.' },
          { icon: 'lock', title: 'Read-only ephemer', text: 'Repository-Klon im Worker, Hard-Delete nach dem Lauf. Kein Code in unserer Datenbank, kein Training auf Ihrem Code.' },
          { icon: 'zap', title: 'Niedrige False-Positive-Rate', text: 'Adversariale Verifikation und Berliner Hacker-Triage filtern Halluzinationen. Typischerweise unter 15% FP statt 60%+ bei klassischem SAST.' },
        ],
        stepsLabel: 'So läuft es',
        stepsHeadline: 'Vier Schritte in den Dev-Workflow.',
        steps: [
          { n: '01', t: 'Repo verbinden', d: 'GitHub-App oder Deploy-Key. 5 Minuten, einmalig.' },
          { n: '02', t: 'Claude liest', d: 'Multi-Pass Review über das gesamte Repo, plus Diff gegen Main.' },
          { n: '03', t: 'Berliner Triage', d: 'OSCP-Pentester verifizieren kritische Findings, bevor das PDF geht.' },
          { n: '04', t: 'PDF montags', d: 'Executive Summary, Patches inline, Compliance-Mapping. Jede Woche.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Für Software-Teams, beantwortet.',
        faq: [
          { q: 'Stört das den Dev-Workflow?', a: 'Nein. Claude läuft read-only im Hintergrund, kein PR-Bot der spamt, kein Tool das Devs lernen müssen. Output ist ein PDF pro Woche - lesen Sie es im Stand-up.' },
          { q: 'Funktioniert das mit Monorepos und Microservices?', a: 'Ja. Multi-File-Reasoning ist der Kern. Sowohl Monorepo als auch verteilte Microservice-Setups laufen out-of-the-box.' },
          { q: 'Welche Sprachen werden unterstützt?', a: 'TypeScript/JavaScript, Python, Go, Java/Kotlin, C#, PHP, Ruby, Rust.' },
          { q: 'Nutzt ihr Claude Mythos?', a: 'Nein. Claude Mythos hat Anthropic nicht freigegeben. Wir nutzen die öffentlich verfügbaren Modelle Claude Opus und Sonnet über die offizielle Anthropic-API.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Größere Setups via Konfigurator.' },
        ],
        ctaH2: 'KI-Security im Dev-Workflow.',
        ctaSub: 'Anfrage schicken - wir setzen Onboarding und ersten Lauf auf. Erstes PDF in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
