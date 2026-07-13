import type { Metadata } from 'next';
import AuditAILanding from '@/components/landing/AuditAILanding';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'DevSecOps für KMU | SODU AuditAI',
  description:
    'DevSecOps für kleine und mittlere Unternehmen: KI-gestütztes Code-Review, wöchentlicher Bericht, ohne Security-Team aufbauen zu müssen.',
  alternates: { canonical: 'https://sodusecure.com/devsecops-fuer-kmu' },
};

export default function Page() {
  return (
    <AuditAILanding
      c={{
        eyebrow: 'Sodu /AuditAI · Für KMU',
        h1Top: 'DevSecOps für KMU.',
        h1Accent: 'Ohne Security-Team.',
        heroSub:
          'Enterprise-DevSecOps ist teuer, kompliziert und für KMU oft unbezahlbar. AuditAI bringt das gleiche Sicherheitsniveau in Ihre Pipeline - als wöchentlicher Bericht, ohne dass Sie ein eigenes Security-Team aufbauen müssen.',
        heroPills: ['Für KMU optimiert', 'Ohne eigenes Team', 'Ab 99 € / Monat', 'NIS2-aware'],
        primaryCta: 'Jetzt starten',
        primaryHref: '/sodu-audit-ai',
        secondaryCta: 'Preise',
        secondaryHref: '/pricing',
        trustEyebrow: 'KMU-tauglich · NIS2-aware · DSGVO-konform · Made in Germany',
        featureLabel: 'KMU-tauglich',
        featureHeadline: 'Sicherheit ohne Vollzeit-CISO.',
        featureSub:
          'KMU haben weder das Budget für ein Security-Team noch die Zeit für komplexe DevSecOps-Toolchains. AuditAI löst das mit einer einzigen, klaren Lieferung.',
        features: [
          { icon: 'sparkles', title: 'Kein Tooling-Stack', text: 'Kein SAST, DAST, IAST, SCA. Eine Anbindung, ein Bericht. Alles drin.' },
          { icon: 'file', title: 'Lesbar für Non-Devs', text: 'Geschäftsleitung versteht den Bericht. Auditoren akzeptieren ihn. CTO patcht damit.' },
          { icon: 'shield', title: 'NIS2-Pflichten', text: 'Mit NIS2 ab 2026 gelten neue Sicherheitspflichten - auch für KMU. AuditAI mappt Befunde direkt drauf.' },
          { icon: 'workflow', title: 'Skaliert mit Ihnen', text: 'Heute 1 Repo, in 12 Monaten 5 Repos plus Pentest. Klare Plan-Stufen.' },
          { icon: 'zap', title: 'Schneller als Recruiting', text: 'Sie liefern in 7 Tagen, statt 6 Monate auf einen Security-Engineer zu warten - der dann auch noch wieder geht.' },
          { icon: 'lock', title: 'DSGVO ohne Beratung', text: 'AVV vor Start, deutscher Vertragspartner, AVV-Standard - kein Datenschutzbeauftragter notwendig.' },
        ],
        stepsLabel: 'Ablauf',
        stepsHeadline: 'KMU-tauglich. In 7 Tagen produktiv.',
        steps: [
          { n: '01', t: 'Anfrage', d: 'Telefon oder Formular. Wir melden uns in 24h.' },
          { n: '02', t: 'Anbinden', d: 'GitHub-App oder Token. 5 Minuten.' },
          { n: '03', t: 'Erste Lieferung', d: 'Bericht innerhalb von 7 Tagen. Kalibriert auf Ihr Repo.' },
          { n: '04', t: 'Routine', d: 'Jeden Montag ein PDF, ein Trend, ein klarer Patch-Plan.' },
        ],
        faqLabel: 'FAQ',
        faqHeadline: 'DevSecOps für KMU.',
        faq: [
          { q: 'Wir haben keinen Security-Engineer. Funktioniert das trotzdem?', a: 'Ja - genau dafür ist es gebaut. Der Bericht ist verständlich für Devs ohne Security-Hintergrund. Fixes sind paste-ready, kein vorhandenes Wissen nötig.' },
          { q: 'Reicht das für NIS2?', a: 'Für die Code-Sicherheits-Pflichten von NIS2: ja, in Kombination mit einem jährlichen menschlichen Pentest. Wir empfehlen Pro+ Plan, der beides bündelt.' },
          { q: 'Was kostet ein KMU-Setup?', a: 'Ab 99 €/Monat, Starter-Plan für ein Repo. Studio 199 € für wöchentliche Lieferung. Pro+ 449 € für Multi-Repo plus quartalsweise Pentest.' },
          { q: 'Was wenn wir kein GitHub nutzen?', a: 'GitLab und Bitbucket auf Anfrage, Self-Hosted via Read-only Token möglich.' },
        ],
        ctaH2: 'KMU-Sicherheit. Ohne CISO.',
        ctaSub: 'Anfrage schicken, erster Bericht in 7 Tagen.',
        ctaButton: 'Jetzt starten',
      }}
    />
  );
}
