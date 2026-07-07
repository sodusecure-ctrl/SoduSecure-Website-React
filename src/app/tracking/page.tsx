import type { Metadata } from 'next';
import { isTrackingAuthenticated } from '@/lib/tracking-auth';
import { isDbConfigured } from '@/lib/leads-db';
import PinGate from './PinGate';
import TrackingDashboard from './TrackingDashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tracking Dashboard',
  robots: { index: false, follow: false, nocache: true },
};

export default async function TrackingPage() {
  const authed = await isTrackingAuthenticated();

  return (
    <div className="dark">
      {authed ? (
        <TrackingDashboard dbConfigured={isDbConfigured()} />
      ) : (
        <PinGate />
      )}
    </div>
  );
}
