import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Claude Mythos für Ihre Software-Sicherheit | SODU AuditAI',
  description:
    'KI-gestützte Software-Sicherheit als wöchentliches Abo. Frontier-Reasoning der Claude-Klasse, defensiv eingesetzt. NIS2-, DSGVO- und ISO-tauglich.',
  alternates: { canonical: 'https://sodusecure.com/claude-mythos-fuer-software-sicherheit' },
  openGraph: {
    title: 'Claude Mythos für Ihre Software-Sicherheit',
    description: 'KI-Security-Audit defensiv eingesetzt. Auditor-akzeptiertes PDF jede Woche.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Für Ihre Software-Sicherheit',
        h1Top: 'Claude Mythos für Ihre',
        h1Accent: 'Software-Sicherheit.',
        heroSub:
          'Software-Sicherheit war bisher ein Projekt: jährlicher Pentest, ad-hoc Code-Audit, Compliance-Sprint vor dem Auditor-Termin. Mit Modellen der Claude-Klasse wird daraus ein kontinuierlicher Prozess. Wir liefern jeden Montag ein PDF, das OWASP, CWE, CVSS, NIS2 und ISO 27001 abdeckt - defensiv, mit Berliner Hacker-Triage, AVV vor Start.',
        heroPills: ['OWASP + CWE + CVSS', 'NIS2 + DSGVO Art. 32', 'ISO 27001 A.14', 'BSI TR-03161-aware'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Anthropic-API-Kunde · Hacker-kuratiert · DSGVO · ISO 27001-aware · BSI TR-03161-aware',
        featureLabel: 'Was abgedeckt ist',
        featureHeadline: 'Software-Sicherheit, die Auditoren akzeptieren.',
        featureSub:
          'Jeder Befund kommt mit Standard-Mapping, jeder Bericht enthält Compliance-Anhang. Sie reichen das PDF weiter, statt es nachzubauen.',
        features: [
          { icon: 'shield', title: 'OWASP + CWE Mapping', text: 'Jedes Finding ist auf OWASP Top 10 und passende CWE-IDs gemappt. Deterministische Pipeline, nicht KI-geraten.' },
          { icon: 'file', title: 'CVSS-3.1 pro Befund', text: 'Severity-Bewertung nach CVSS-3.1 mit Vektor. Auditor-akzeptiertes Format.' },
          { icon: 'workflow', title: 'NIS2 + DSGVO Art. 32', text: 'Bericht enthält Mapping auf NIS2-Pflichten und DSGVO Art. 32 (technische Maßnahmen).' },
          { icon: 'sparkles', title: 'ISO 27001 A.14', text: 'Annex A.14 (Beschaffung, Entwicklung, Wartung) wird im Compliance-Anhang adressiert.' },
          { icon: 'lock', title: 'BSI TR-03161-aware', text: 'Für Health-Apps relevante BSI TR-03161-Anforderungen sind im Bericht erfasst.' },
          { icon: 'zap', title: 'Audit-Trail', text: 'Jeder Lauf protokolliert: Modell-Version, Findings, Triage-Entscheidung, Re-Test. Auditoren akzeptieren das als Nachweis.' },
        ],
        stepsLabel: 'So läuft Compliance',
        stepsHeadline: 'Vier Schritte zum auditor-fähigen Sicherheits-Prozess.',
        steps: [
          { n: '01', t: 'Anfrage', d: 'Demo-Termin. Wir klären Repo-Zugang, Compliance-Scope, AVV.' },
          { n: '02', t: 'Claude reviewt', d: 'Multi-Pass über Anthropic-API. Read-only, ephemerer Worker, Hard-Delete.' },
          { n: '03', t: 'Hacker-Triage', d: 'Berliner Pentester verifizieren kritische Findings.' },
          { n: '04', t: 'PDF mit Compliance', d: 'Wöchentliches PDF inklusive Audit-Trail und Standard-Mapping.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Für CISOs und Compliance, beantwortet.',
        faq: [
          { q: 'Reicht das als Pentest-Ersatz für ISO 27001?', a: 'Der Standard-Tarif ersetzt Code-Audit, nicht Pentest. Im Pro+-Tarif ist ein quartalsweiser Pentest mit manuellem PoC enthalten - das ist für ISO 27001 / BSI TR-03161 ausreichend.' },
          { q: 'Akzeptieren Auditoren KI-Berichte?', a: 'Ja, wenn Methodik, Modell-Version, Triage und Re-Test dokumentiert sind. Genau das ist im Audit-Trail enthalten. Wir haben bisher von keinem Auditor Push-Back erlebt.' },
          { q: 'Wie wird NIS2 abgedeckt?', a: 'Der Bericht enthält explizites Mapping auf NIS2 Art. 21 (Risikomanagement-Maßnahmen) und dokumentiert die kontinuierliche Schwachstellen-Bewertung als wesentliche Maßnahme.' },
          { q: 'Was ist mit DSGVO Art. 32?', a: 'Mapping ist im Compliance-Anhang. Wöchentliche Bewertung ist als "regelmäßige Überprüfung" im Sinne Art. 32 dokumentiert.' },
          { q: 'Nutzt ihr Claude Mythos?', a: 'Nein. Wir nutzen Claude Opus und Sonnet über die offizielle Anthropic-API. Mythos ist von Anthropic nicht freigegeben.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat für Audit. Mit Hacker-Triage ab ~399 €, mit quartalsweisem Pentest ab ~899 €. Genaue Konfiguration via Demo.' },
        ],
        ctaH2: 'Software-Sicherheit als Prozess. Nicht als Projekt.',
        ctaSub: 'Anfrage schicken - wir setzen alles auf. Erstes auditor-fähiges PDF in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
