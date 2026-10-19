import type { Metadata } from 'next';
import { Suspense } from 'react';
import SoduAuditAILanding from './SoduAuditAILanding';

export const metadata: Metadata = {
  title: 'Sodu /AuditAI · KI-Code-Audit ab 99 € pro Monat',
  description:
    'Sodu /AuditAI · KI-gestütztes Code-Audit für Production-Repos. Wöchentlicher Bericht in DE & EN, fertige Fix-Vorschläge, jederzeit kündbar. Made in Germany.',
  alternates: { canonical: 'https://sodusecure.com/sodu-audit-ai' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Sodu /AuditAI · KI-Code-Audit ab 99 €',
    description:
      'Senior-Security-Reviews als wöchentliches Abo. Starter, Studio oder Pro+ wählen, in 24 Stunden Antwort.',
    url: 'https://sodusecure.com/sodu-audit-ai',
    type: 'website',
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0B]" />}>
      <SoduAuditAILanding />
    </Suspense>
  );
}
