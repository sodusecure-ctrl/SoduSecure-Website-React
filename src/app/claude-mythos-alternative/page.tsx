import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Wie Claude Mythos · KI-Security-Review im Abo | SODU AuditAI',
  description:
    'Anthropic hält Claude Mythos unter Verschluss - zu gefährlich, sagt der Hersteller. Wir liefern dieselbe Klasse von KI-gestütztem Code-Audit als Abo. Ab 99 €.',
  alternates: { canonical: 'https://sodusecure.com/claude-mythos-alternative' },
  openGraph: {
    title: 'Wie Claude Mythos - aber im Abo',
    description: 'Was Anthropic zurückhält, liefern wir als Service: KI-Code-Audit, das echte Logic-Bugs findet.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Im Gespräch: Claude Mythos',
        h1Top: 'Was Claude Mythos kann.',
        h1Accent: 'Im Abo. Defensiv.',
        heroSub:
          'Anthropic hat im Mai 2026 angekündigt, dass ihr neues Modell "Claude Mythos" Tausende unbekannter Schwachstellen finden kann - und es deshalb der Öffentlichkeit nicht freigibt. Genau diese Klasse von Code-Reasoning bauen wir seit Monaten in Sodu AuditAI: KI, die Ihren Code wie ein Senior-Security-Engineer liest. Defensiv eingesetzt. Wöchentlicher Bericht. Made in Germany.',
        heroPills: ['KI-Code-Audit im Abo', 'Defensiv. Wöchentlich.', 'Berliner Hacker-Triage', 'DSGVO + AVV'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Defensiv eingesetzt · Hacker-kuratiert · Frankfurt-Hosting · DSGVO · AVV vor Start',
        featureLabel: 'Warum jetzt',
        featureHeadline: 'Die Bedrohung ist real. Die Verteidigung muss aufholen.',
        featureSub:
          'Modelle wie Claude Mythos zeigen: Angreifer werden in den nächsten Monaten Schwachstellen in Stunden finden, für die sie bisher Wochen brauchten. Wer wartet, bis das Tooling auf der Angreiferseite leakt, ist zu spät dran.',
        features: [
          { icon: 'sparkles', title: 'Dieselbe Klasse Reasoning', text: 'Wir nutzen Anthropics Claude-Modelle (Sonnet/Opus) über die offizielle API. Kein Mythos-Zugang, aber dieselbe Frontier-Reasoning-Klasse - defensiv eingesetzt.' },
          { icon: 'workflow', title: 'Multi-File Datenfluss', text: 'Claude liest Auth, Sessions, DB-Queries und externe APIs als Graph - genau die Bugs, die Mythos in den Anthropic-Tests gefunden hat.' },
          { icon: 'shield', title: 'Adversariale Verifikation', text: 'Jeder Befund wird durch einen zweiten Claude-Pass falsifiziert. Wir liefern verifizierte Findings, nicht Halluzinationen.' },
          { icon: 'lock', title: 'Defensiv, nicht offensiv', text: 'Wir finden Schwachstellen in Ihrem eigenen Code, mit Ihrer Erlaubnis, mit Read-only Zugriff. Keine Offensive-Tools, keine 0-Day-Vermarktung.' },
          { icon: 'file', title: 'Bericht für Menschen', text: 'PDF mit Executive Summary, fertigen Patches und Compliance-Mapping. Lesbar für Geschäftsleitung, nutzbar für Devs.' },
          { icon: 'zap', title: 'Berliner Hacker-Triage', text: 'OSCP-zertifizierte Pentester prüfen Critical/High Findings, bevor das PDF rausgeht. Maschine plus Mensch, nicht KI alleine.' },
        ],
        stepsLabel: 'So fangen Sie an',
        stepsHeadline: 'Bevor das Tooling auf der anderen Seite leakt.',
        steps: [
          { n: '01', t: 'Anfrage', d: 'Formular ausfüllen oder anrufen. Wir klären Scope und Repo-Zugang in einem 30-Min-Termin.' },
          { n: '02', t: 'Wir setzen auf', d: 'AVV, GitHub-App, erster Lauf. Sie machen nichts - wir machen alles für Sie.' },
          { n: '03', t: 'Erster Bericht', d: 'Innerhalb 7 Tagen das erste PDF. Mit echten Findings, fertigen Fixes, Compliance-Mapping.' },
          { n: '04', t: 'Jede Woche', d: 'Montag früh ein neuer Bericht. Diff gegen Vorwoche, Trend-Tracking, Re-Test inklusive.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Claude Mythos & Sodu AuditAI, beantwortet.',
        faq: [
          { q: 'Nutzt Sodu AuditAI Claude Mythos?', a: 'Nein. Claude Mythos hat Anthropic nach eigener Aussage nicht für externen Zugriff freigegeben. Wir nutzen die öffentlich verfügbaren Claude-Modelle (Sonnet/Opus) über die offizielle Anthropic-API - in derselben Reasoning-Klasse, defensiv eingesetzt, mit eigener Multi-Pass-Pipeline drumherum.' },
          { q: 'Sind Sie Anthropic-Partner?', a: 'Nein, wir sind API-Kunde von Anthropic. Wir nutzen "Powered by Claude" gemäß Anthropics Brand Guidelines. Claude ist unser Werkzeug, das wöchentliche Audit-PDF ist unser Produkt.' },
          { q: 'Warum ist das nicht selbst gefährlich?', a: 'Wir arbeiten ausschließlich auf Code, den unsere Kunden uns mit Auftrag und Read-only Zugriff übergeben. Wir veröffentlichen keine Schwachstellen, verkaufen keine 0-Days und betreiben keine offensiven Tools. Findings gehen ausschließlich an den jeweiligen Eigentümer der Codebase.' },
          { q: 'Wird unser Code zum Modelltraining genutzt?', a: 'Nein. Anthropic verwendet API-Eingaben standardmäßig nicht für Modelltraining. Wir speichern Code nicht persistent: ephemerer Worker, Hard-Delete nach dem Lauf, AVV vor Start.' },
          { q: 'Ist das schon einsatzreif oder Experiment?', a: 'Einsatzreif. Wir liefern wöchentliche Berichte für SaaS- und FinTech-Kunden. Wenn auf Angreiferseite Modelle wie Claude Mythos auftauchen, wollen Sie defensiv schon laufen haben - nicht erst evaluieren.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Hacker-Triage und Pentest-Module in höheren Tarifen. Konfiguration via Demo-Anfrage.' },
        ],
        ctaH2: 'Wenn die Angreifer aufrüsten, müssen Sie das auch.',
        ctaSub: 'Anfrage schicken - wir setzen Onboarding und ersten Lauf für Sie auf. Erstes PDF in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
