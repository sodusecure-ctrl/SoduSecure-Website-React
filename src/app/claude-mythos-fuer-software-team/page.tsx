import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Claude Mythos für Ihr Software-Team | SODU AuditAI',
  description:
    'Ein virtueller Senior-Security-Engineer im Abo. Wir liefern wöchentlich KI-gestützte Code-Reviews mit fertigen Fixes - ohne Neueinstellung. Ab 99 €.',
  alternates: { canonical: 'https://sodusecure.com/claude-mythos-fuer-software-team' },
  openGraph: {
    title: 'Claude Mythos für Ihr Software-Team',
    description: 'Senior-Security-Engineering im Abo. Ohne Recruiting, ohne Tool-Stack.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Für Ihr Software-Team',
        h1Top: 'Claude Mythos für Ihr',
        h1Accent: 'Software-Team.',
        heroSub:
          'Ein Senior-Security-Engineer kostet 120-160 k € pro Jahr und ist sechs Monate lang nicht zu finden. Wir liefern KI-gestütztes Security-Reviewing der Claude-Klasse als Abo - mit Berliner Hacker-Triage. Ihr Team bekommt jeden Montag den Bericht, den ein interner Staff-Engineer schreiben würde - ohne Recruiting, ohne Stack, ohne Onboarding-Phase.',
        heroPills: ['Senior-Niveau Reviews', 'Kein Recruiting', 'Hacker-kuratiert', 'Made in Berlin'],
        primaryCta: 'Demo anfragen',
        primaryHref: '/contact',
        secondaryCta: 'Was kostet das',
        secondaryHref: '/pricing',
        trustEyebrow: 'Anthropic-API-Kunde · Berliner Hacker · DSGVO · Frankfurt-Hosting · AVV vor Start',
        featureLabel: 'Was Sie bekommen',
        featureHeadline: 'Senior-Engineering ohne Senior-Gehalt.',
        featureSub:
          'Wir ersetzen das Recruiting und den Tooling-Stack durch ein wöchentliches PDF, das Ihr bestehendes Team direkt umsetzen kann.',
        features: [
          { icon: 'sparkles', title: 'Wie ein Staff-Engineer', text: 'Claude folgt Multi-File-Datenflüssen, liest Auth-Logik und findet Logic-Bugs - genau das, was ein interner Staff-Security-Engineer würde.' },
          { icon: 'shield', title: 'Berliner Hacker-Triage', text: 'OSCP-zertifizierte Pentester prüfen Critical/High Findings, bevor das PDF rausgeht. Kein Halluzinations-Spam in Ihrem Team-Channel.' },
          { icon: 'file', title: 'Fixes für Junioren shippable', text: 'Patches sind paste-ready, mit Erklärung der Root-Cause. Ihr Team setzt die Findings selbst um - wir liefern das Wissen, das fehlte.' },
          { icon: 'workflow', title: 'Diff jede Woche', text: 'Was haben Sie diese Woche eingeführt, was wurde behoben, welche Regression ist zurück. Trend statt Snapshot.' },
          { icon: 'zap', title: 'Kein Recruiting nötig', text: 'Sie starten in einer Woche statt in sechs Monaten. Skaliert mit Ihren Repos, nicht mit Headcount.' },
          { icon: 'lock', title: 'Read-only ephemer', text: 'Repo-Klon im Worker, Hard-Delete nach dem Lauf. Keine Code-Speicherung, keine Modelltraining-Verwendung.' },
        ],
        stepsLabel: 'So integriert es sich',
        stepsHeadline: 'Vier Schritte zum Senior-Backup für Ihr Team.',
        steps: [
          { n: '01', t: 'Demo-Termin', d: '30 Minuten. Wir klären Scope, Repos, Tarif. Sie erklären uns Ihr Team-Setup.' },
          { n: '02', t: 'Wir setzen auf', d: 'GitHub-App, AVV, erster Lauf. Sie machen nichts - wir machen alles für Sie.' },
          { n: '03', t: 'Erstes PDF', d: 'In 7 Tagen Berichte mit echten Findings, priorisiert, mit Patches.' },
          { n: '04', t: 'Wöchentlich', d: 'Jeden Montag ein neuer Bericht. Ihr Team setzt um, wir reviewen die nächste Iteration.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Für Engineering-Leads, beantwortet.',
        faq: [
          { q: 'Ersetzt das einen internen Security-Engineer?', a: 'Für das wöchentliche Code-Review ja. Für Incident-Response, Architektur-Reviews und Security-Kultur braucht es weiter Menschen - aber Sie sparen sich den dedizierten Reviewer-Headcount.' },
          { q: 'Wer übernimmt die Umsetzung der Fixes?', a: 'Ihr bestehendes Dev-Team. Unsere Patches sind paste-ready und kommen mit Erklärung - auch Mid-Level-Devs können kritische Befunde direkt mergen.' },
          { q: 'Was, wenn ein Befund unklar ist?', a: 'Sie können jederzeit Rückfragen stellen. In höheren Tarifen ist eine wöchentliche Sprechstunde mit unseren Pentestern enthalten.' },
          { q: 'Nutzt ihr Claude Mythos?', a: 'Nein. Wir nutzen die öffentlich verfügbaren Modelle Claude Opus und Sonnet über die offizielle Anthropic-API. Mythos ist nicht freigegeben.' },
          { q: 'Was kostet das vs Recruiting?', a: 'Ab 99 €/Repo/Monat. Senior-Security-Engineer kostet ~140 k €/Jahr und ist sechs Monate lang nicht zu finden. Selbst mit Hacker-Triage-Tarif (ab ~399 €/Monat) sparen Sie ~95% pro Jahr.' },
        ],
        ctaH2: 'Senior-Backup für Ihr Team. Im Abo.',
        ctaSub: 'Anfrage schicken - wir setzen alles auf. Sie sehen das erste PDF in 7 Tagen.',
        ctaButton: 'Demo anfragen',
      }}
    />
  );
}
