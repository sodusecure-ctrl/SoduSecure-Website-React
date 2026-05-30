import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  title: 'KI Code Audit ab 99 € pro Monat | SODU AuditAI',
  description:
    'KI-gestütztes Code-Audit ab 99 € pro Repository und Monat. Wöchentlicher Bericht, fertige Fixes, jederzeit kündbar. Made in Germany.',
  alternates: { canonical: 'https://sodusecure.com/ki-code-audit-99-euro' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · ab 99 €',
        h1Top: 'KI Code Audit.',
        h1Accent: 'Ab 99 € pro Monat.',
        heroSub:
          'Ein vollwertiges KI-Code-Audit für 99 € pro Repository und Monat. Sie bekommen genau das, was ein Senior-Security-Engineer liefern würde - nur jede Woche und ohne Gehalt. Jederzeit kündbar, keine Mindestlaufzeit.',
        heroPills: ['Ab 99 € / Monat', 'Pro Repository', 'Jederzeit kündbar', 'Made in Germany'],
        primaryCta: 'Demo anfragen',
        primaryHref: '/contact',
        secondaryCta: 'Preise',
        secondaryHref: '/pricing',
        trustEyebrow: 'Transparenter Preis · Keine Mindestlaufzeit · Made in Germany',
        featureLabel: 'Was 99 € enthält',
        featureHeadline: 'Senior-Output. Junior-Preis.',
        featureSub:
          'Für 99 € im Monat bekommen Sie ein Stück Senior-Engineering-Arbeit - jede Woche reproduzierbar geliefert.',
        features: [
          { icon: 'file', title: 'Wöchentlicher Bericht', text: 'PDF in DE und EN. Executive Summary plus technischer Anhang. 30+ Seiten typischerweise.' },
          { icon: 'sparkles', title: 'Multi-Pass Code-Review', text: 'Adversariale Verifikation, Datenfluss-Analyse, Multi-File-Kontext. Echtes Code-Reading.' },
          { icon: 'workflow', title: 'Fertige Fixes', text: 'Jeder Befund mit paste-ready Code-Patch. Direkt mergen.' },
          { icon: 'shield', title: 'OWASP & CWE Mapping', text: 'Jeder Befund kategorisiert nach OWASP-Top-10 und CWE - audit-tauglich.' },
          { icon: 'lock', title: 'Read-only Zugriff', text: 'Wir können nie in Ihr Repo schreiben. Klone werden nach jedem Lauf gelöscht.' },
          { icon: 'zap', title: 'Setup in 5 Minuten', text: 'GitHub-App oder Read-only Token. Onboarding meist von uns.' },
        ],
        stepsLabel: 'So funktioniert die Abrechnung',
        stepsHeadline: 'Klare Preise. Keine Überraschungen.',
        steps: [
          { n: '01', t: '99 €', d: 'Starter: 1 Repo, Bericht alle 2 Wochen, bis 2 Contributoren.' },
          { n: '02', t: '199 €', d: 'Studio: 1 Repo, wöchentlicher Bericht, unbegrenzte Contributoren.' },
          { n: '03', t: '449 €', d: 'Pro+: Multi-Repo, wöchentlich, plus quartalsweise Voll-Pentest.' },
          { n: '04', t: 'Kündbar', d: 'Monatliche Abrechnung. Vor nächster Verlängerung kündigen, fertig.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: '99 €. Was bedeutet das genau.',
        faq: [
          { q: 'Was kostet die Einrichtung?', a: 'Nichts. Setup machen wir für Sie. 5 Minuten Onboarding-Call, Repo-Anbindung, erster Lauf - ohne Extra-Kosten.' },
          { q: 'Gibt es versteckte Gebühren?', a: 'Nein. 99 € pro Repo pro Monat, alles inklusive: Bericht, Trend-Tracking, Support per E-Mail. Größere Repos (500k+ LoC) zählen als zwei Einheiten - wird vorher transparent kommuniziert.' },
          { q: 'Mehrere Repos?', a: 'Pro+ Plan ab 449 € deckt mehrere Repos ab. Alternativ können Sie mehrere Starter/Studio-Pläne kombinieren.' },
          { q: 'Kann ich jederzeit kündigen?', a: 'Ja. Monatliche Abrechnung, Kündigung vor nächster Verlängerung. Keine Mindestlaufzeit, keine Diskussion.' },
          { q: 'Jahreszahlung?', a: 'Optional: zwei Monate gratis bei Jahresvorauszahlung. Auf Anfrage.' },
        ],
        ctaH2: 'Senior-Reviews. 99 €. Klar.',
        ctaSub: 'Anfrage schicken, erster Bericht in 7 Tagen.',
        ctaButton: 'Demo anfragen',
      }}
    />
  );
}
