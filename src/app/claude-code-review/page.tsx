import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Claude Code Review für Produktionscode | SODU AuditAI',
  description:
    'Claude-gestütztes Code Review für Ihr GitHub-Repo: jede Woche ein priorisierter Sicherheitsbericht mit fertigen Fixes. Powered by Claude. Made in Germany.',
  alternates: { canonical: 'https://sodusecure.com/claude-code-review' },
  openGraph: {
    title: 'Claude Code Review für Produktionscode',
    description: 'Wöchentliches Security-Code-Review powered by Claude. Ab 99 € pro Repo.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Powered by Claude',
        h1Top: 'Claude Code Review.',
        h1Accent: 'Jede Woche ein Bericht.',
        heroSub:
          'Sodu AuditAI nutzt Claude im Hintergrund, um Ihr Repository wie ein Senior-Security-Engineer zu lesen: Datenfluss, Auth-Pfade, Secret-Handling und Business-Logik. Sie bekommen jeden Montag ein PDF mit priorisierten Befunden und fertigen Code-Fixes.',
        heroPills: ['Powered by Claude', 'Wöchentlicher Bericht', 'Read-only Zugriff', 'Made in Germany'],
        primaryCta: 'Demo anfragen',
        primaryHref: '/contact',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Powered by Claude · Von Hackern trainiert · DSGVO-konform · Made in Germany',
        featureLabel: 'Was Claude liefert',
        featureHeadline: 'Tiefes Code-Verständnis. Klare Fixes.',
        featureSub:
          'Statt Pattern-Matching folgt Claude dem realen Datenfluss durch Ihre Anwendung - genauso wie ein erfahrener Reviewer, nur jede Woche und in DE und EN.',
        features: [
          { icon: 'sparkles', title: 'Adversariale Verifikation', text: 'Jeder Befund wird durch einen zweiten Claude-Pass geprüft. Halluzinationen fliegen raus, bevor Sie sie sehen.' },
          { icon: 'workflow', title: 'Datenfluss-Analyse', text: 'Taint-Tracking durch Auth, Sessions, DB-Queries, externe APIs - inklusive Multi-File-Kontext.' },
          { icon: 'file', title: 'Fertige Fixes', text: 'Jeder Befund kommt mit einem paste-ready Code-Patch. Kein "Sie sollten das beheben" - sondern wie genau.' },
          { icon: 'lock', title: 'Read-only & ephemer', text: 'Repository wird in einen ephemeren Worker geklont. Nach der Analyse hart gelöscht. Keine Code-Speicherung.' },
          { icon: 'zap', title: 'Trend-Tracking', text: 'Regressionen, Verbesserungen, wiederkehrende Befunde - Claude vergleicht diff-bewusst gegen letzte Woche.' },
          { icon: 'shield', title: 'Made in Germany', text: 'Hosting in Deutschland. AVV verfügbar bevor Sie starten. DSGVO und NIS2-aware by default.' },
        ],
        stepsLabel: 'Workflow',
        stepsHeadline: 'Vier Schritte. Dann läuft es jeden Montag.',
        steps: [
          { n: '01', t: 'Repo verbinden', d: 'GitHub-App oder Read-only Token. 5 Minuten, einmalig.' },
          { n: '02', t: 'Claude analysiert', d: 'Multi-Pass Review: Datenfluss, Auth, Secrets, Logik. Adversariale Verifikation reduziert False Positives.' },
          { n: '03', t: 'Diff gegen Vorwoche', d: 'Was ist neu, was ist behoben, welche Regressionen sind wieder da.' },
          { n: '04', t: 'PDF im Postfach', d: 'Jeden Montag früh: DE und EN, Executive Summary, fertige Fixes pro Befund.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Claude Code Review, beantwortet.',
        faq: [
          { q: 'Nutzt SODU wirklich Claude im Hintergrund?', a: 'Ja. AuditAI verwendet Anthropics Claude-Modelle als Kern-Reviewer, ergänzt um eigene Pipelines für Datenfluss, Diff-Awareness und adversariale Verifikation. Wir sind keine offiziellen Anthropic-Partner, sondern ein API-Kunde - Claude ist das Werkzeug, das Review ist unser Produkt.' },
          { q: 'Sehen Anthropic oder Dritte unseren Code?', a: 'Code wird via Anthropic-API verarbeitet, Anthropic verwendet API-Eingaben standardmäßig nicht zum Modelltraining. Wir speichern Code nicht persistent: ephemerer Worker, Hard-Delete nach dem Lauf. AVV stellen wir vor Start bereit.' },
          { q: 'Wie ist das besser als ein Standard-LLM-Plugin?', a: 'Wir geben Claude Multi-File-Kontext, Diff gegen Vorwoche und einen zweiten adversarialen Pass. Plus: deterministische CWE-Mapping-Pipeline und ein PDF-Output, den Geschäftsleitung und Devs gleichzeitig lesen können.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Demo ohne Karte - Anfrage schicken, wir setzen Onboarding und ersten Lauf für Sie auf.' },
          { q: 'Welche Sprachen versteht Claude bei Ihnen?', a: 'TS/JS, Python, Go, Java, Kotlin, C#, PHP, Ruby, Rust. Mono-Repos und Microservice-Architekturen kein Problem.' },
        ],
        ctaH2: 'Claude liest Ihren Code. Jede Woche.',
        ctaSub: 'Demo ohne Karte. Anfrage schicken, wir machen den Rest.',
        ctaButton: 'Demo anfragen',
      }}
    />
  );
}
