import type { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Preise - Sodu Secure · Pentest & AuditAI',
  description:
    'Automatisierter Schwachstellen-Scan ab 1.500 €, manuelle Penetrationstests individuell (Preis ermitteln) und AuditAI-Wochenbericht ab 99 €/Monat. Brand-Toggle wechselt die Pakete.',
};

export default function PricingPage() {
  return <PricingClient />;
}
