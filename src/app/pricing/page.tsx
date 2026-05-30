import type { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Preise - Sodu Secure · Pentest & AuditAI',
  description:
    'Pentest-Festpreise (Web ab 2.500 €, intern ab 4.900 €, Enterprise individuell) und AuditAI-Wochenbericht ab 99 €/Monat. Brand-Toggle wechselt die Pakete.',
};

export default function PricingPage() {
  return <PricingClient />;
}
