import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Claude Security Audit für SaaS-Codebases | SODU AuditAI',
  description:
    'Wöchentliches Security Audit Ihrer Codebase, powered by Claude. Schwachstellen, Secrets, Auth-Lücken - mit fertigen Fixes. Ab 99 €.',
  alternates: { canonical: 'https://sodusecure.com/claude-security-audit' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Powered by Claude',
        h1Top: 'Security Audit',
        h1Accent: 'mit Claude. Jede Woche.',
        heroSub:
          'Ein vollwertiges Code-Security-Audit, durchgeführt von Claude unter der Haube und versendet als sauberes PDF jeden Montag. Schneller als ein klassisches Audit, günstiger als ein Senior-Engineer und konsistent statt einmal im Jahr.',
        heroPills: ['Claude unter der Haube', 'Wöchentliches Audit', 'OWASP / CWE Mapping', 'DSGVO-konform'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Powered by Claude · OWASP · CWE · ISO 27001 · BSI TR-03161 · NIS2',
        featureLabel: 'Audit-Tiefe',
        featureHeadline: 'Was ein Senior-Auditor findet. Nur jede Woche.',
        featureSub:
          'Klassische Audits sind ein Foto. Sodu AuditAI ist ein laufender Film. Claude prüft 52 Wochen im Jahr statt einmal alle zwölf Monate.',
        features: [
          { icon: 'shield', title: 'OWASP & CWE Mapping', text: 'Jeder Befund mit OWASP-Top-10-Kategorie, CWE-Nummer und CVSS-3.1-Schweregrad.' },
          { icon: 'workflow', title: 'Auth- & Session-Audit', text: 'Authorization-Flaws, IDOR, Session-Fixation, Privilege-Escalation - genau das, wo Scanner versagen.' },
          { icon: 'lock', title: 'Secret & Token Audit', text: 'Hardcoded Credentials, leakable Tokens, unsichere Speicherung. In Code, Configs, History.' },
          { icon: 'sparkles', title: 'Logic-Bugs', text: 'Business-Logik-Lücken die nur ein Reviewer mit Domänen-Kontext findet - Claude liest Tests und Comments mit.' },
          { icon: 'file', title: 'Audit-Trail', text: 'Jede Woche ein PDF, archivierbar und nachweisbar - perfekt für ISO-27001-Auditoren.' },
          { icon: 'zap', title: 'Compliance-Mapping', text: 'Optionales Mapping auf ISO 27001 A.14, BSI TR-03161, NIS2 und DSGVO Art. 32.' },
        ],
        stepsLabel: 'Ablauf',
        stepsHeadline: 'Vom Read-only-Token bis zum Audit-PDF.',
        steps: [
          { n: '01', t: 'Anbinden', d: 'GitHub-App oder Token. Read-only, kurzlebig.' },
          { n: '02', t: 'Auditieren', d: 'Claude führt Multi-Pass Audit durch, vergleicht gegen Vorwoche.' },
          { n: '03', t: 'Verifizieren', d: 'Adversariale Pass entfernt False Positives, ergänzt fehlende Findings.' },
          { n: '04', t: 'Liefern', d: 'PDF in DE und EN, ausgelegt für Geschäftsleitung und Devs zugleich.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Claude Security Audit, erklärt.',
        faq: [
          { q: 'Ersetzt das ein klassisches ISO-27001-Audit?', a: 'Nein, aber es füllt die 51 Wochen dazwischen. Auditoren akzeptieren wöchentliche AuditAI-Berichte als kontinuierliche Beweisführung für A.14 (sichere Entwicklung).' },
          { q: 'Wie verlässlich sind Claude-Findings?', a: 'Wir betreiben eine adversariale Verifikation: ein zweiter Pass mit anderem Prompt-Profil prüft jedes Finding gegen Code und Repo-Kontext. Befunde mit niedriger Konfidenz werden als "Hinweis" markiert, nicht als "Befund".' },
          { q: 'Wer haftet bei einem übersehenen Bug?', a: 'AuditAI ergänzt menschliches Engineering - wie jedes Audit-Tool. Bei kritischen Releases empfehlen wir zusätzlich einen manuellen Pentest (Sodu /Pentest), der direkt auf AuditAI-Findings aufsetzt.' },
          { q: 'Was kostet ein wöchentliches Audit?', a: 'Ab 99 €/Repo/Monat. Demo ohne Karte. Anfrage schicken - wir bauen Setup und ersten Audit-Lauf für Sie.' },
        ],
        ctaH2: 'Audit jede Woche. Nicht jedes Jahr.',
        ctaSub: 'Anfrage schicken, wir liefern den ersten Audit-Bericht in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
