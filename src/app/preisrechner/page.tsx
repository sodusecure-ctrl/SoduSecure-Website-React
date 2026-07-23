import type { Metadata } from 'next';
import PreisrechnerClient from './PreisrechnerClient';

export const metadata: Metadata = {
  title: 'Pentest-Preisrechner | Sodu Secure',
  description:
    'Berechnen Sie in wenigen Schritten die Preisspanne für Ihren Penetrationstest – unverbindlich und sofort.',
  robots: { index: false, follow: false },
};

export default function PreisrechnerPage() {
  return <PreisrechnerClient />;
}
