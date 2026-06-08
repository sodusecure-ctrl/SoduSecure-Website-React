import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'Claude Mythos für KMU · Defensiv-KI gegen Hacker | SODU AuditAI',
  description:
    'Claude Mythos zeigt: Angreifer werden bald in Stunden finden, wofür sie Wochen brauchten. Wir liefern KMU-tauglichen KI-Code-Audit als Abo. Made in Berlin.',
  alternates: { canonical: 'https://sodusecure.com/claude-mythos-fuer-kmu' },
  openGraph: {
    title: 'Claude Mythos für KMU - im Abo',
    description: 'Defensiv-KI im Mittelstand-Tarif. Bevor das Tooling der Angreifer leakt.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Defensiv-KI für KMU',
        h1Top: 'Claude Mythos für KMU.',
        h1Accent: 'Defensiv. Im Abo.',
        heroSub:
          'Anthropic hält Claude Mythos zurück - zu gefährlich, sagt der Hersteller. Aber Modelle dieser Klasse werden auf der Angreiferseite kommen. Mittelständler ohne Security-Team haben dann ein Problem. Wir liefern KI-Code-Audit als Abo, ohne Tooling-Stack, ohne Recruiting, ohne Setup-Schmerz.',
        heroPills: ['Kein Security-Team nötig', 'Wöchentlicher Bericht', 'NIS2-tauglich', 'Ab 99 €'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Was kostet das',
        secondaryHref: '/pricing',
        trustEyebrow: 'Defensiv eingesetzt · NIS2-aware · DSGVO · Frankfurt-Hosting · Made in Berlin',
        featureLabel: 'Warum gerade jetzt',
        featureHeadline: 'Die Asymmetrie wird kippen.',
        featureSub:
          'Heute brauchen Angreifer Wochen, um eine Schwachstelle in Custom-Code zu finden. Mit Modellen wie Claude Mythos sind es Stunden. Mittelständler, die heute defensiv KI nutzen, gewinnen die Lücke zurück.',
        features: [
          { icon: 'shield', title: 'KI im Abo, nicht im Stack', text: 'Sie brauchen keinen DevSecOps-Engineer einstellen. Wir liefern den Bericht. Sie konzentrieren sich auf Ihr Produkt.' },
          { icon: 'sparkles', title: 'Frontier-Reasoning defensiv', text: 'Wir nutzen Anthropics Claude (Opus/Sonnet) über die offizielle API - dieselbe Reasoning-Klasse, defensiv auf Ihren Code angewendet.' },
          { icon: 'file', title: 'PDF, kein Dashboard', text: 'Mittelstand braucht Berichte, die Geschäftsleitung lesen kann. Wir liefern PDF mit Executive Summary, nicht noch ein Tool.' },
          { icon: 'workflow', title: 'NIS2 + DSGVO Art. 32', text: 'Bericht enthält Mapping auf NIS2-Pflichten und DSGVO Art. 32 (technische Maßnahmen). Auditor-akzeptiert.' },
          { icon: 'lock', title: 'Defensiv, kein Mythos', text: 'Wir finden Schwachstellen in Ihrem Code, mit Ihrem Auftrag, mit Read-only Zugriff. Findings gehen nur an Sie.' },
          { icon: 'zap', title: 'Berliner Hacker-Triage', text: 'OSCP-Pentester prüfen Critical/High Befunde manuell, bevor das PDF raus geht. Halluzinationen sterben vor dem Bericht.' },
        ],
        stepsLabel: 'So fangen KMU an',
        stepsHeadline: 'Vier Schritte. Dann läuft die Verteidigung.',
        steps: [
          { n: '01', t: 'Anfrage', d: '30-Min-Termin. Wir klären Repo-Zugang, AVV, Scope.' },
          { n: '02', t: 'Wir setzen auf', d: 'GitHub-App in 5 Minuten. Sie machen nichts mehr.' },
          { n: '03', t: 'Erstes PDF', d: 'In 7 Tagen Berichte mit echten Findings und fertigen Fixes.' },
          { n: '04', t: 'Jeden Montag', d: 'Neues PDF, Diff gegen Vorwoche. Auditor-akzeptiertes Format.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'KI-Defensive für den Mittelstand, beantwortet.',
        faq: [
          { q: 'Brauchen wir das wirklich schon jetzt?', a: 'Wenn Sie warten, bis Modelle der Mythos-Klasse auf Angreiferseite frei verfügbar sind, müssen Sie aus dem Stand defensiv aufrüsten. Wer heute startet, hat dann schon 6-12 Monate Daten und Trend-Tracking.' },
          { q: 'Nutzt ihr Claude Mythos selbst?', a: 'Nein. Claude Mythos ist von Anthropic nicht freigegeben. Wir nutzen die öffentlich verfügbaren Claude-Modelle (Sonnet/Opus) über die offizielle API. Reasoning-Klasse vergleichbar, defensiv eingesetzt.' },
          { q: 'Was, wenn wir kein eigenes Security-Team haben?', a: 'Genau dafür ist das Produkt gemacht. Wir liefern den Bericht. Ihre Devs setzen die Fixes um. Bei kritischen Befunden sprechen wir Sie direkt an.' },
          { q: 'Reicht das für NIS2 / DSGVO?', a: 'Der Bericht enthält Mapping auf NIS2-Pflichten und DSGVO Art. 32. Auditoren akzeptieren das Format. Ein Pentest-Modul für ISO 27001 / BSI TR-03161 ist optional buchbar.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat. Mittelständler-Tarife mit Hacker-Triage starten bei ~399 €. Konfiguration via Demo.' },
        ],
        ctaH2: 'Bevor die Angreifer aufrüsten.',
        ctaSub: 'Anfrage schicken, wir setzen alles auf. Sie sehen das erste PDF in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
