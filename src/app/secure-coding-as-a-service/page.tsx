import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Secure Coding as a Service | SODU AuditAI',
  description:
    'Secure Coding as a Service: ein Senior-Security-Engineer für Ihr Team, jede Woche, ohne Recruiting. Powered by Claude. Ab 99 €.',
  alternates: { canonical: 'https://sodusecure.com/secure-coding-as-a-service' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI',
        h1Top: 'Secure Coding',
        h1Accent: 'as a Service.',
        heroSub:
          'Sie bekommen einen vollwertigen Security-Engineer für Ihr Entwicklerteam - ohne Recruiting, ohne Onboarding-Halbjahr, ohne 80.000 € Jahresgehalt. AuditAI prüft jede Woche Ihren Code und liefert genau das, was ein Senior-Reviewer liefern würde.',
        heroPills: ['Wie ein Senior-Engineer', 'Ohne Recruiting', 'Ab 99 € / Monat', 'Kündbar'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Preise',
        secondaryHref: '/pricing',
        trustEyebrow: 'Senior-Niveau · Powered by Claude · Made in Germany',
        featureLabel: 'Was Sie bekommen',
        featureHeadline: 'Senior-Engineering. Ohne Senior-Gehalt.',
        featureSub:
          'Ein guter Security-Engineer kostet 80.000 €+ pro Jahr und ist auf dem deutschen Markt schwer zu finden. AuditAI ersetzt einen Großteil dieser Arbeit zu einem Bruchteil der Kosten.',
        features: [
          { icon: 'sparkles', title: 'Reviews wie ein Senior', text: 'Code-Reading mit Datenfluss-Analyse, Auth-Pfad-Mapping, Logik-Verständnis - nicht nur Lint-Regeln.' },
          { icon: 'file', title: 'Fix-Vorschläge', text: 'Jeder Befund kommt mit fertigem Patch. Junior-Devs können shippen, Senior-Devs reviewen nur noch.' },
          { icon: 'workflow', title: 'Onboarding inklusive', text: 'Anfrage schicken, wir verbinden das Repo, kalibrieren den ersten Bericht, übergeben es an Sie.' },
          { icon: 'shield', title: 'Compliance-Aware', text: 'OWASP, ISO 27001 A.14, NIS2, DSGVO Art. 32. Alles, was ein Security-Engineer im Kopf haben muss.' },
          { icon: 'zap', title: 'Skaliert mit Ihnen', text: 'Mehr Repos? Pro+ Plan. Mehr Tempo? Studio-Plan mit wöchentlichem Bericht. Klare Eskalation.' },
          { icon: 'lock', title: 'Vertraulich', text: 'Read-only Zugriff, ephemere Worker, AVV vor Start. Ihr Code bleibt Ihr Code.' },
        ],
        stepsLabel: 'Ablauf',
        stepsHeadline: 'Wie der Service funktioniert.',
        steps: [
          { n: '01', t: 'Anfrage', d: 'Sie schicken eine E-Mail oder ein Formular. Wir melden uns in 24h.' },
          { n: '02', t: 'Onboarding', d: 'Wir verbinden Ihr Repo, kalibrieren den Reviewer auf Ihren Stack.' },
          { n: '03', t: 'Lieferung', d: 'Wöchentlicher Bericht im Postfach. DE und EN, mit Fixes.' },
          { n: '04', t: 'Skalieren', d: 'Mehr Repos, schnellerer Takt, Pentest-Add-On - alles flexibel.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'Secure Coding as a Service, erklärt.',
        faq: [
          { q: 'Ersetzt das einen festangestellten Security-Engineer?', a: 'Für die Code-Review-Arbeit eines Teilzeit-Engineers: ja. Für Strategie, Architektur-Reviews und Incident-Response brauchen Sie weiterhin einen Menschen - nur nicht mehr eine ganze Stelle.' },
          { q: 'Wie schnell ist der erste Bericht da?', a: 'Innerhalb von 7 Tagen nach Anfrage. Setup ist 5 Minuten Arbeit, meist machen wir das für Sie.' },
          { q: 'Mindestlaufzeit?', a: 'Keine. Monatlich abrechenbar, kündbar bis Ende des Monats.' },
          { q: 'Was kostet das?', a: 'Ab 99 €/Repo/Monat (Starter). Studio 199 € mit wöchentlichem Bericht. Pro+ 449 € mit Multi-Repo plus quartalsweise Pentest.' },
        ],
        ctaH2: 'Senior-Reviews. Junior-Preis.',
        ctaSub: 'Anfrage schicken, erster Bericht in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
