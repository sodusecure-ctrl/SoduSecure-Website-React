import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Claude vs Snyk · Warum LLM-Reviews tiefer gehen | SODU AuditAI',
  description:
    'SAST findet Patterns, Claude versteht Logik. Wir zeigen, was Snyk übersieht und was Claude in Production-Code wirklich findet. Demo anfragen.',
  alternates: { canonical: 'https://sodusecure.com/claude-vs-snyk' },
  openGraph: {
    title: 'Claude vs Snyk',
    description: 'Pattern-Matching vs echtes Code-Reasoning. Der Unterschied im PDF.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Vergleich',
        h1Top: 'Claude vs Snyk.',
        h1Accent: 'Reasoning schlägt Regex.',
        heroSub:
          'Snyk, SonarQube und GitHub Advanced Security finden, was sich als Pattern beschreiben lässt. Logic-Bugs, IDOR-Ketten und Auth-Bypasses bleiben liegen. Claude versteht Datenfluss und Geschäftslogik - und findet die Bugs, die Auditoren wirklich interessieren.',
        heroPills: ['Logic-Bugs', 'IDOR-Detection', 'Auth-Bypass', 'Niedrige FP-Rate'],
        primaryCta: 'Demo anfragen',
        primaryHref: '/contact',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Powered by Claude · Pattern-frei · Hacker-kuratiert · DSGVO',
        featureLabel: 'Was SAST nicht findet',
        featureHeadline: 'Sechs Kategorien, in denen Claude SAST schlägt.',
        featureSub:
          'Wir haben Claude und Snyk auf identischen Repos laufen lassen. Hier die Bug-Klassen, in denen LLM-Reasoning nicht zu schlagen ist.',
        features: [
          { icon: 'workflow', title: 'IDOR & Authorization', text: 'Snyk: kennt nur SQL-Injection-Pattern. Claude: folgt User-ID durch Middleware bis Sink und sieht, wo Ownership-Checks fehlen.' },
          { icon: 'sparkles', title: 'Logic-Bugs', text: 'Snyk: erkennt CVEs in Dependencies. Claude: liest Ihre Geschäftsregeln und findet, wo Rabatt-Logik ausnutzbar ist.' },
          { icon: 'shield', title: 'Auth-Bypass-Ketten', text: 'Snyk: prüft auf bekannte Auth-Bibliotheken. Claude: liest Ihre Custom-Middleware und findet, wo Bypass-Pfade existieren.' },
          { icon: 'lock', title: 'Secret-Token-Handling', text: 'Snyk: regex-basierte Secret-Erkennung. Claude: prüft, ob Secrets im Log landen, ans Frontend gehen oder ungeschützt persistiert werden.' },
          { icon: 'file', title: 'Niedrige False-Positive-Rate', text: 'Snyk: oft 60-80% Noise. Claude+adversariale Verifikation: typischerweise unter 15%.' },
          { icon: 'zap', title: 'Fertige Patches', text: 'Snyk: zeigt Zeile mit "fix this". Claude: schreibt den Diff, der direkt in den PR geht.' },
        ],
        stepsLabel: 'Vergleich',
        stepsHeadline: 'So sieht der Unterschied im PDF aus.',
        steps: [
          { n: '01', t: 'Beide Tools laufen', d: 'Snyk und Claude auf demselben Repo. Identische Codebase, identischer Commit.' },
          { n: '02', t: 'Findings nebeneinander', d: 'Snyk: ~120 Befunde, davon ~80 Noise. Claude: ~25 verifizierte Critical/High.' },
          { n: '03', t: 'Bug-Klassen', d: 'Claude findet IDOR, Logic-Bugs, Auth-Bypass. Snyk findet outdated Dependencies.' },
          { n: '04', t: 'Sie sehen den PDF', d: 'Beispielbericht mit anonymisiertem Real-World-Vergleich. Auf Anfrage.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Claude vs SAST, beantwortet.',
        faq: [
          { q: 'Ersetzt Claude komplett SAST?', a: 'Für Custom-Logic-Bugs ja. Für CVE-Tracking in Dependencies ist klassisches SCA (Snyk, Dependabot) weiter sinnvoll. Wir empfehlen Claude für Code-Review, SCA für Lieferkette.' },
          { q: 'Wie ist die False-Positive-Rate wirklich?', a: 'Auf realen Production-Repos sehen wir typischerweise unter 15% FP nach adversarialer Verifikation. Snyk berichtet auf Custom-Code oft 60%+.' },
          { q: 'Habt ihr einen direkten Benchmark?', a: 'Ja, in unserem Beispielbericht zeigen wir einen anonymisierten Side-by-Side-Vergleich auf einer SaaS-Codebase. Anfrage genügt.' },
          { q: 'Was kostet das vs Snyk?', a: 'Snyk Team startet bei ~25 USD/Dev/Monat. Wir starten bei 99 €/Repo/Monat - ohne Per-Dev-Skalierung. Bei größeren Teams in der Regel günstiger.' },
        ],
        ctaH2: 'Reasoning statt Regex.',
        ctaSub: 'Demo anfragen - wir laufen Claude auf Ihrem Repo und vergleichen mit Ihrem aktuellen SAST.',
        ctaButton: 'Vergleich anfragen',
      }}
    />
  );
}
