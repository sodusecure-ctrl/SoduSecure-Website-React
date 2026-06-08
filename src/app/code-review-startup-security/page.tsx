import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Code Review für Startups | SODU AuditAI',
  description:
    'Code Review für Startups: Security-Senior-Niveau in der Pre-Series-A-Phase, ohne Vollzeit-Hire. Powered by Claude. Made in Germany.',
  alternates: { canonical: 'https://sodusecure.com/code-review-startup-security' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · für Startups',
        h1Top: 'Code Review',
        h1Accent: 'für Startups.',
        heroSub:
          'Pre-Series-A heißt: drei Devs, ein CTO, kein Budget für einen Security-Hire. AuditAI gibt Ihnen Senior-Security-Niveau ab Tag eins - jede Woche, ab 99 €. Damit der nächste Pentest, das nächste Audit oder die nächste Due Diligence ohne Drama läuft.',
        heroPills: ['Pre-Series-A tauglich', 'Ab 99 € / Monat', 'Due-Diligence-ready', 'Made in Germany'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Startup-tauglich · Due-Diligence-ready · Powered by Claude',
        featureLabel: 'Für Startups',
        featureHeadline: 'Security-Hygiene ohne Hire.',
        featureSub:
          'Series-A-Investoren fragen nach Security-Posture. Enterprise-Kunden verlangen Audits. AuditAI liefert die Antwort - mit lesbarem Bericht und Trend-Verlauf.',
        features: [
          { icon: 'sparkles', title: 'Senior-Niveau ab Tag 1', text: 'Code-Review wie ein 8-Jahre-Senior. Ohne Recruiting, ohne Onboarding-Halbjahr.' },
          { icon: 'file', title: 'Due-Diligence-ready', text: 'Berichte sind investor-tauglich. Trend zeigt: "Security wird seit Monat 1 ernst genommen".' },
          { icon: 'workflow', title: 'Skaliert mit Funding', text: 'Pre-Seed: Starter. Seed: Studio. Series A: Pro+ mit Pentest. Klarer Pfad.' },
          { icon: 'zap', title: 'Schnell statt perfekt', text: 'Wir blockieren keine Releases. Wir geben Ihnen jede Woche eine klare Patch-Liste, sortiert nach Risiko.' },
          { icon: 'shield', title: 'Enterprise-Sales-tauglich', text: 'Wenn Ihr Enterprise-Kunde nach Security-Audit fragt: AuditAI-Bericht zeigen, fertig.' },
          { icon: 'lock', title: 'Kein Lock-in', text: 'Read-only Zugriff, monatlich kündbar. Sie können jederzeit raus, ohne Daten-Migration.' },
        ],
        stepsLabel: 'Startup-Pfad',
        stepsHeadline: 'Von MVP bis Series A.',
        steps: [
          { n: '01', t: 'Pre-Seed', d: 'Starter 99 €. 1 Scan pro Monat. Genug für die ersten Iterationen.' },
          { n: '02', t: 'Seed', d: 'Studio 199 €. Wöchentlich. Erste Enterprise-Kunden? Bericht zeigen, fertig.' },
          { n: '03', t: 'Series A', d: 'Pro+ 449 €. Multi-Repo plus quartalsweise Pentest. Due Diligence ohne Drama.' },
          { n: '04', t: 'Wachstum', d: 'Bei Bedarf: dedizierter Ansprechpartner und individuelle Compliance-Mappings.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Code Review für Startups.',
        faq: [
          { q: 'Wir sind 4 Leute. Lohnt sich das?', a: 'Ja - gerade weil Sie 4 Leute sind. Sie können sich keinen Security-Hire leisten und keine 2-Wochen-Audit-Sprints. AuditAI gibt Ihnen kontinuierliche Hygiene zu Pizza-Preisen.' },
          { q: 'Was, wenn unser Code noch in Bewegung ist?', a: 'Genau dafür ist Diff-Awareness gebaut. Wir vergleichen gegen die Vorwoche, melden nur Neues und Regressionen. Keine 200-Seiten-Wüste, sondern eine ehrliche Liste was sich geändert hat.' },
          { q: 'Investoren verlangen ein Pentest-Zertifikat?', a: 'Pro+ Plan enthält quartalsweise menschliche Pentests durch unsere OSCP-zertifizierten Pentester - mit Zertifikat, das Investoren akzeptieren.' },
          { q: 'Was kostet das insgesamt?', a: 'Ab 99 €/Monat. Pro+ mit Pentest 449 €. Vergleich: ein Junior-Security-Hire kostet 5.000 €+/Monat all-in.' },
        ],
        ctaH2: 'Security ab Tag eins. Ohne Hire.',
        ctaSub: 'Anfrage schicken, erster Bericht in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
