import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'KI Code Review aus Deutschland | SODU AuditAI',
  description:
    'Automatisiertes KI-Code-Review aus Berlin: jede Woche ein priorisierter Sicherheitsbericht für Ihr Repo. DSGVO-konform, made in Germany.',
  alternates: { canonical: 'https://sodusecure.com/ai-code-review-deutschland' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Made in Germany',
        h1Top: 'KI Code Review.',
        h1Accent: 'Aus Berlin. Auf Deutsch.',
        heroSub:
          'Sicherheitsbewusstes Code Review für deutsche Entwicklerteams. State-of-the-Art KI, gehostet in Deutschland, AVV verfügbar, DSGVO-konform. Sie bekommen jede Woche einen Bericht, den Devs und Geschäftsleitung gleichermaßen lesen können.',
        heroPills: ['Made in Germany', 'DSGVO & NIS2', 'AVV verfügbar', 'DE & EN Bericht'],
        primaryCta: 'Demo anfragen',
        primaryHref: '/contact',
        secondaryCta: 'Beispielbericht',
        secondaryHref: '/sample-report',
        trustEyebrow: 'Made in Germany · DSGVO-konform · AVV · ISO 27001 · BSI TR-03161',
        featureLabel: 'Warum aus Deutschland',
        featureHeadline: 'KI ohne USA-Risiko.',
        featureSub:
          'KI ist großartig. KI auf US-Servern mit dem CLOUD Act im Hintergrund ist ein Compliance-Problem. Wir lösen das mit deutschem Hosting und klaren Verträgen.',
        features: [
          { icon: 'shield', title: 'Hosting in Deutschland', text: 'Verarbeitung und Worker-Infrastruktur in Frankfurt. Keine US-Datenübertragung außer den notwendigen API-Calls.' },
          { icon: 'lock', title: 'AVV vor Start', text: 'Standard-Auftragsverarbeitungs­vertrag bekommen Sie vor dem ersten Lauf. Keine Diskussion.' },
          { icon: 'file', title: 'DE & EN Lieferung', text: 'Bericht in beiden Sprachen - Geschäftsleitung liest deutsch, Dev-Team gemischt. Beides geliefert.' },
          { icon: 'sparkles', title: 'NIS2 & DSGVO Art. 32', text: 'Befunde werden auf NIS2-Anforderungen und DSGVO Art. 32 ("Stand der Technik") gemappt.' },
          { icon: 'workflow', title: 'Berliner Hacker', text: 'Trainiert von echten Pentestern aus Berlin. Keine Silicon-Valley-Dashboards, sondern Findings in handfester Sprache.' },
          { icon: 'zap', title: 'Lokaler Support', text: 'Anrufen statt Ticket-System. Berliner Telefonnummer, deutscher Vertragspartner.' },
        ],
        stepsLabel: 'Ablauf',
        stepsHeadline: 'Vier Schritte. DSGVO-konform.',
        steps: [
          { n: '01', t: 'Anbinden', d: 'GitHub-App oder Token. Read-only, kurzlebige Credentials.' },
          { n: '02', t: 'KI-Review', d: 'Multi-Pass Code-Review mit adversarialer Verifikation.' },
          { n: '03', t: 'DE-EN PDF', d: 'Sauberer Bericht, archivierbar, audit-tauglich.' },
          { n: '04', t: 'Trend', d: 'Diff gegen Vorwoche - Regressionen, Verbesserungen sichtbar.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'KI Code Review aus Deutschland.',
        faq: [
          { q: 'Wo werden meine Daten verarbeitet?', a: 'Worker, Storage und Reporting laufen in Deutschland. Für die KI-Inferenz nutzen wir API-Anbieter mit EU-Datacenter-Optionen wo verfügbar; Details stehen im AVV.' },
          { q: 'Wer ist Vertragspartner?', a: 'SODU Secure (Deutschland). Sie bekommen eine deutsche Rechnung, deutschen Vertrag, deutschen Support.' },
          { q: 'Ist das DSGVO-konform?', a: 'Ja. Read-only Klone, Hard-Delete nach Lauf, keine persistente Code-Speicherung. AVV mit Standard-EU-Klauseln vor Start.' },
          { q: 'Sprachen und Frameworks?', a: 'TS/JS, Python, Go, Java, Kotlin, C#, PHP, Ruby. Mono-Repos und Microservices kein Problem.' },
        ],
        ctaH2: 'KI-Sicherheit. Aus Berlin.',
        ctaSub: 'Demo ohne Karte. Anfrage schicken, wir machen den Rest.',
        ctaButton: 'Demo anfragen',
      }}
    />
  );
}
