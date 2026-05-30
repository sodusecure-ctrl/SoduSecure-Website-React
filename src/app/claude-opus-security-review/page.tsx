import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Claude Opus Security Review für Production-Code | SODU AuditAI',
  description:
    'Security-Code-Review mit Claude Opus - dem stärksten Reasoning-Modell von Anthropic. Wöchentlicher Bericht, fertige Fixes, DSGVO. Ab 99 €.',
  alternates: { canonical: 'https://sodusecure.com/claude-opus-security-review' },
  openGraph: {
    title: 'Claude Opus Security Review',
    description: 'Das stärkste Claude-Modell liest Ihren Code wie ein Senior-Engineer. Jede Woche.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Built on Claude Opus',
        h1Top: 'Claude Opus liest Ihren Code.',
        h1Accent: 'So wie ein Staff-Engineer.',
        heroSub:
          'Wir geben Anthropics Top-Reasoning-Modell vollen Multi-File-Kontext, Datenfluss-Tracking und adversariale Verifikation. Was rauskommt: ein wöchentlicher PDF-Bericht, der Schwachstellen findet, die Snyk und SonarQube grundsätzlich übersehen.',
        heroPills: ['Claude Opus im Kern', 'Multi-Pass Reasoning', 'Read-only ephemer', 'Made in Germany'],
        primaryCta: 'Demo anfragen',
        primaryHref: '/contact',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Powered by Claude Opus · Anthropic API · DSGVO · Frankfurt-Hosting · AVV vor Start',
        featureLabel: 'Warum Opus',
        featureHeadline: 'Frontier-Reasoning für Code, der wirklich läuft.',
        featureSub:
          'Claude Opus löst Logic-Bugs, IDOR-Ketten und Auth-Bypasses, an denen statische Tools kapitulieren. Wir bauen die Pipeline drumherum, die das skalierbar und reproduzierbar macht.',
        features: [
          { icon: 'sparkles', title: 'Frontier-Reasoning', text: 'Opus folgt mehrstufigen Auth-Flows und versteht Geschäftslogik. Kein Pattern-Match, sondern echtes Verstehen.' },
          { icon: 'workflow', title: 'Cross-File Datenfluss', text: 'User-Input bis DB-Query, durch Middleware, Hooks und Background-Jobs. Opus hält den ganzen Graph im Kopf.' },
          { icon: 'shield', title: 'Adversariale Zweitprüfung', text: 'Jeder Befund wird durch einen separaten Opus-Pass falsifiziert. Halluzinationen sterben vor dem Bericht.' },
          { icon: 'file', title: 'Senior-Niveau Fixes', text: 'Patches, die ein Junior direkt mergen kann - mit Begründung, die ein Architekt akzeptiert.' },
          { icon: 'lock', title: 'Anthropic-API, kein Training', text: 'API-Eingaben werden laut Anthropic-Policy nicht für Modelltraining verwendet. Wir speichern Code nicht persistent.' },
          { icon: 'zap', title: 'Diff gegen Vorwoche', text: 'Opus vergleicht jeden Run mit dem letzten - was ist neu, was ist behoben, welche Regression ist zurück.' },
        ],
        stepsLabel: 'Workflow',
        stepsHeadline: 'Vier Schritte zum Opus-Review.',
        steps: [
          { n: '01', t: 'Repo verbinden', d: 'GitHub-App oder Read-only Deploy-Key. Einmal in 5 Minuten.' },
          { n: '02', t: 'Opus liest', d: 'Multi-Pass: Auth, Datenfluss, Secrets, Logik. Adversariale Verifikation entfernt Halluzinationen.' },
          { n: '03', t: 'Wir kuratieren', d: 'Berliner Hacker prüfen kritische Findings, bevor das PDF rausgeht.' },
          { n: '04', t: 'PDF montags', d: 'DE+EN, Executive Summary für die Geschäftsleitung, Fix-Patches für Devs.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Claude Opus, beantwortet.',
        faq: [
          { q: 'Warum Claude Opus und nicht GPT?', a: 'Opus liefert in unseren internen Benchmarks die niedrigste False-Positive-Rate auf realen Codebases und das beste Multi-File-Reasoning. Für Security-Reviews zählt das mehr als Geschwindigkeit.' },
          { q: 'Sind Sie offizieller Anthropic-Partner?', a: 'Nein, wir sind API-Kunde von Anthropic. Claude ist unser Werkzeug, der Review-Prozess und das PDF sind unser Produkt. Wir nutzen "Powered by Claude" gemäß Anthropics Brand Guidelines.' },
          { q: 'Welche Modell-Version läuft im Hintergrund?', a: 'Wir nutzen das jeweils aktuellste Opus-Modell, das Anthropic für Production freigegeben hat. Bei Modell-Wechsel laufen Regression-Tests gegen unsere Referenz-Findings.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Höhere Tarife für Mono-Repos und Multi-Service-Setups - genaue Konfiguration via Demo-Anfrage.' },
        ],
        ctaH2: 'Frontier-Reasoning für Ihren Code.',
        ctaSub: 'Anfrage schicken, wir setzen Opus auf Ihr Repo. Erster Bericht in 7 Tagen.',
        ctaButton: 'Demo anfragen',
      }}
    />
  );
}
