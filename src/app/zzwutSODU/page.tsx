import type { Metadata } from 'next';
import { Suspense } from 'react';
import DankeClient from './DankeClient';

export const metadata: Metadata = {
  title: 'Zahlung erfolgreich · Sodu /AuditAI',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0B]" />}>
      <DankeClient />
    </Suspense>
  );
}
