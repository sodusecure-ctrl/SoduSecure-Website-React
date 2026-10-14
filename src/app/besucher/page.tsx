import type { Metadata } from 'next';
import { isTrackingAuthenticated } from '@/lib/tracking-auth';
import { isDbConfigured } from '@/lib/leads-db';
import PinGate from '../tracking/PinGate';
import BesucherDashboard from './BesucherDashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Besucher-Analyse',
  // Interne Auswertung - darf unter keinen Umstaenden in den Index.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Besucheranalyse fuer /request-pentest und die Schwesterseiten.
 *
 * Zugang ueber denselben PIN wie /tracking (TRACKING_DASHBOARD_PIN): Die Daten
 * stammen aus derselben Tabelle und gehoeren fachlich zusammen; ein zweiter
 * Zugangsweg waere zusaetzliche Angriffsflaeche ohne Nutzen.
 */
export default async function BesucherPage() {
  const authed = await isTrackingAuthenticated();

  return (
    <div className="dark">
      {authed ? <BesucherDashboard dbConfigured={isDbConfigured()} /> : <PinGate />}
    </div>
  );
}
