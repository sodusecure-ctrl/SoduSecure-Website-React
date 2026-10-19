import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'GitHub Security Scanner für Produktionscode | SODU AuditAI',
  description:
    'GitHub Security Scanner mit echter Code-Analyse statt Pattern-Matching. Wöchentlicher Bericht, fertige Fixes, DSGVO-konform.',
  alternates: { canonical: 'https://sodusecure.com/github-security-scanner' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · GitHub Native',
        h1Top: 'GitHub Security Scanner.',
        h1Accent: 'Tiefer als SAST.',
        heroSub:
          'Verbinden Sie Ihr GitHub-Repository in 5 Minuten. Sodu AuditAI scannt jede Woche mit Multi-File-Datenfluss-Analyse, mappt auf OWASP und CWE und liefert fertige Patches - ohne neues Tool, ohne Pipeline-Änderung.',
        heroPills: ['GitHub-App', 'Read-only Token', 'OWASP/CWE Mapping', 'Multi-Repo'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'GitHub-App · OAuth · OWASP · CWE · CVSS 3.1',
        featureLabel: 'Scanner-Tiefe',
        featureHeadline: 'Was klassische Scanner verpassen.',
        featureSub:
          'Pattern-Matcher finden Strings. AuditAI versteht Code. Der Unterschied ist gewaltig - und sichtbar im ersten Bericht.',
        features: [
          { icon: 'workflow', title: 'Cross-File Datenfluss', text: 'Taint-Tracking durch Imports, Service-Layer, DB-Adapter. Findings die nur durch echtes Code-Reading sichtbar sind.' },
          { icon: 'sparkles', title: 'Logic-Bug-Detection', text: 'Race Conditions, IDOR, Auth-Bypass-Pfade - das was Scanner nie melden, weil es kein Pattern dafür gibt.' },
          { icon: 'lock', title: 'Secret-Audit', text: 'Hardcoded Credentials in Code und History. Nicht nur ".env" - auch test/, scripts/, configs/.' },
          { icon: 'shield', title: 'Niedrige FP-Rate', text: 'Adversariale Pass entfernt False Positives. Typischerweise <10% FP-Rate statt 40%+ bei klassischem SAST.' },
          { icon: 'file', title: 'Patch statt Ticket', text: 'Jedes Finding mit konkretem Code-Diff zum Mergen. Kein "Bitte fixen Sie X".' },
          { icon: 'zap', title: 'Diff-aware', text: 'Wir vergleichen gegen die Vorwoche. Was ist neu, was ist behoben, welche Regressionen sind wieder da.' },
        ],
        stepsLabel: 'Setup',
        stepsHeadline: 'In 5 Minuten verbunden.',
        steps: [
          { n: '01', t: 'GitHub-App installieren', d: 'Auf gewünschtes Repo beschränkt. Read-only Permissions.' },
          { n: '02', t: 'Lauf einplanen', d: 'Wir konfigurieren den Sonntagabend-Scan, kalibrieren auf Ihren Stack.' },
          { n: '03', t: 'Bericht erhalten', d: 'PDF in DE und EN, plus optional Webhook in Slack/MS Teams.' },
          { n: '04', t: 'Patchen', d: 'Findings mit fertigen Diffs - direkt als PR vorgeschlagen.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'GitHub Security Scanner.',
        faq: [
          { q: 'Funktioniert das mit Private Repos?', a: 'Ja. Die GitHub-App bekommt nur Zugriff auf die Repos, die Sie ausdrücklich auswählen. Read-only, kurzlebige Tokens.' },
          { q: 'Was unterscheidet euch von GitHub Advanced Security?', a: 'GHAS ist Pattern-basiert (CodeQL) plus Dependency-Scan. AuditAI macht semantisches Code-Review mit Multi-File-Kontext und adversarialer Verifikation - näher an einem Senior-Engineer.' },
          { q: 'Mehrere Repos?', a: 'Ab Pro+ Plan: ja. Multi-Repo-Übersicht, ein Sammel-PDF, eine Rechnung.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Demo ohne Karte. Anfrage schicken, Setup machen wir.' },
        ],
        ctaH2: 'Echtes Code-Review. Aus GitHub.',
        ctaSub: 'Anfrage schicken, erster Bericht in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
