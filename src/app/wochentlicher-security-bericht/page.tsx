import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Wöchentlicher Security-Bericht für Ihr Repo | SODU AuditAI',
  description:
    'Jeden Montag ein sauberes PDF: Schwachstellen, Trend, fertige Fixes. Der Security-Wochenbericht für moderne Entwicklungsteams.',
  alternates: { canonical: 'https://sodusecure.com/wochentlicher-security-bericht' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI',
        h1Top: 'Ein PDF.',
        h1Accent: 'Jeden Montag.',
        heroSub:
          'Der Sodu-AuditAI-Wochenbericht ist das, was ein Senior-Security-Engineer Ihnen jede Woche geben würde - nur ohne 80.000 € Gehalt. Executive Summary oben, technische Details unten, fertige Fixes überall.',
        heroPills: ['Ein PDF pro Woche', 'DE & EN', 'Trend-Tracking', 'Read-only'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht ansehen',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Sicherheits-Wochenbericht · Made in Germany · DSGVO-konform',
        featureLabel: 'Im Bericht',
        featureHeadline: 'Was im Wochenbericht steht.',
        featureSub:
          'Kein Lärm. Keine 200-Seiten-Audit-Wüste. Eine kompakte Lieferung, die Devs und Geschäftsleitung beide lesen können.',
        features: [
          { icon: 'file', title: 'Executive Summary', text: 'Eine Seite. Was ist neu, was ist behoben, wie steht es um den Trend. Für die Geschäftsleitung.' },
          { icon: 'workflow', title: 'Priorisierte Findings', text: 'Nach CVSS sortiert. Jeder Befund mit OWASP/CWE-Kategorie, betroffenen Dateien, klarer Beschreibung.' },
          { icon: 'sparkles', title: 'Paste-ready Fixes', text: 'Code-Patches als Snippet, direkt zum Einfügen. Kein "Sie sollten X tun".' },
          { icon: 'zap', title: 'Trend-Grafik', text: 'Wie hat sich die Anzahl Befunde über die letzten 12 Wochen entwickelt. Regressionen sofort sichtbar.' },
          { icon: 'shield', title: 'Compliance-Anhang', text: 'Optional: Mapping auf ISO 27001 A.14, NIS2, DSGVO Art. 32 - perfekt für Auditoren.' },
          { icon: 'lock', title: 'Audit-Trail', text: 'Jedes PDF wird signiert archiviert. Sie haben jederzeit den vollständigen Verlauf.' },
        ],
        stepsLabel: 'Ablauf',
        stepsHeadline: 'Vom Repo zum PDF.',
        steps: [
          { n: '01', t: 'Repo verbinden', d: 'GitHub-App oder Token. 5 Minuten, einmalig.' },
          { n: '02', t: 'Lauf am Sonntag', d: 'Multi-Pass-Analyse mit Diff-Awareness.' },
          { n: '03', t: 'PDF generiert', d: 'DE und EN, Executive Summary plus technischer Anhang.' },
          { n: '04', t: 'Montag früh', d: 'Im Postfach, archiviert, lesbar.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Der Wochenbericht, erklärt.',
        faq: [
          { q: 'Warum ein PDF und kein Dashboard?', a: 'Weil PDFs lesbar, archivierbar und teilbar sind. Geschäftsleitung loggt sich nie in ein neues Tool ein. PDF kommt im Postfach an, wird vom CTO an den CEO weitergeleitet, fertig.' },
          { q: 'Kann ich auch in ein Dashboard sehen?', a: 'Ab Studio-Plan: ja, optional. Das PDF bleibt aber die primäre Lieferung.' },
          { q: 'Was wenn nichts Neues passiert ist?', a: 'Dann steht das im Bericht: "Keine neuen Befunde, 3 alte noch offen, 1 Regression." Auch das ist eine wertvolle Information.' },
          { q: 'Was kostet ein wöchentlicher Bericht?', a: 'Ab 99 €/Repo/Monat. Demo ohne Karte. Anfrage schicken - wir setzen Onboarding und ersten Lauf für Sie auf.' },
        ],
        ctaH2: 'Jeden Montag. Ein PDF. Fertig.',
        ctaSub: 'Anfrage schicken, erster Bericht in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
