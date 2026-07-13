import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Automatisiertes Code Audit für GitHub-Repos | SODU AuditAI',
  description:
    'Automatisiertes Security-Code-Audit für Ihr GitHub-Repository. Wöchentlicher Bericht mit OWASP-Mapping, CVSS-Scores und fertigen Fixes.',
  alternates: { canonical: 'https://sodusecure.com/automatisiertes-code-audit' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI',
        h1Top: 'Automatisiertes Code-Audit.',
        h1Accent: 'Ohne Setup-Schmerz.',
        heroSub:
          'Ein wöchentlich automatisiertes Code-Audit für Ihr GitHub-Repository. Sie verbinden das Repo, wir liefern jeden Montag ein PDF mit OWASP-Mapping, CVSS-Scores und fertigen Patches. Keine Pipeline, kein Tooling-Stack, kein neues Dashboard.',
        heroPills: ['GitHub Native', 'OWASP / CWE', 'Fertige Fixes', 'Read-only'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'OWASP · CWE · CVSS 3.1 · ISO 27001 · DSGVO',
        featureLabel: 'Was ist automatisiert',
        featureHeadline: 'Mehr als ein SAST-Tool.',
        featureSub:
          'Klassische SAST-Tools sind Pattern-Matcher mit hoher False-Positive-Rate. AuditAI macht echte Code-Analyse mit Multi-File-Kontext und Diff-Awareness.',
        features: [
          { icon: 'workflow', title: 'Diff-aware', text: 'Was hat sich seit letzter Woche geändert? Neue Risiken werden hervorgehoben, behobene als "Fixed" markiert.' },
          { icon: 'sparkles', title: 'Niedrige FP-Rate', text: 'Adversariale Verifikation entfernt False Positives - typischerweise unter 10% FP-Rate statt 40%+ bei klassischem SAST.' },
          { icon: 'file', title: 'PDF statt Dashboard', text: 'Kein neues Tool, kein Login, keine SSO-Integration. PDF im Postfach, Montag früh.' },
          { icon: 'shield', title: 'OWASP-Mapping', text: 'Jeder Befund mit OWASP-Top-10-Kategorie und CWE-Nummer. Direkt auditierbar.' },
          { icon: 'zap', title: 'CVSS Severity', text: 'CVSS-3.1-Vector-Strings für klares Risk-Ranking. Patch-Reihenfolge wird offensichtlich.' },
          { icon: 'lock', title: 'Read-only & ephemer', text: 'Wir können nie in Ihr Repo schreiben. Klone werden nach Analyse hard-deleted.' },
        ],
        stepsLabel: 'Ablauf',
        stepsHeadline: 'Einmal aufsetzen. Dann läuft es.',
        steps: [
          { n: '01', t: 'GitHub verbinden', d: 'Install via GitHub-App oder Read-only Token.' },
          { n: '02', t: 'Audit läuft', d: 'Multi-Pass Analyse, jeden Sonntagabend.' },
          { n: '03', t: 'Bericht erstellt', d: 'PDF mit OWASP-Mapping und CVSS, DE und EN.' },
          { n: '04', t: 'Im Postfach', d: 'Montag früh: ein PDF, fertige Fixes, klar priorisiert.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Automatisiertes Code-Audit.',
        faq: [
          { q: 'Wie unterscheidet sich das von Snyk, SonarQube oder GitHub Advanced Security?', a: 'Diese Tools sind Pattern-basiert oder Dependency-fokussiert. AuditAI macht echtes Code-Reading mit Datenfluss-Analyse, Multi-File-Kontext und einer adversarialen Verifikation - näher an einem Senior-Reviewer als an einem Linter.' },
          { q: 'Brauche ich GitHub Advanced Security?', a: 'Nein. Auch GitHub Free und Public Repos können verbunden werden. Für Enterprise-Repos arbeiten wir mit kurzlebigen App-Tokens und SSO-fähigem Onboarding.' },
          { q: 'Wie schnell sehe ich Ergebnisse?', a: 'Erster vollständiger Bericht innerhalb von 7 Tagen nach Repo-Verbindung. Setup dauert 5 Minuten - meist machen wir das für Sie.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Demo ohne Karte, kein Mindestvertrag.' },
        ],
        ctaH2: 'Audit. Automatisch. Jede Woche.',
        ctaSub: 'Anfrage schicken, erster Lauf in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
