import type { Metadata } from 'next';
import { isAuthenticated } from '@/lib/sales-auth';
import { isDbConfigured } from '@/lib/leads-db';
import PinGate from './PinGate';
import SalesDashboard from './SalesDashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sales Dashboard',
  robots: { index: false, follow: false, nocache: true },
};

export default async function SalesDashboardPage() {
  const authed = await isAuthenticated();

  return (
    <div className="dark">
      {authed ? (
        <SalesDashboard dbConfigured={isDbConfigured()} />
      ) : (
        <PinGate />
      )}
    </div>
  );
}
