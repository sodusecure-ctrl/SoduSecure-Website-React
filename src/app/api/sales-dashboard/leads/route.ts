import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/sales-auth';
import { isDbConfigured, listLeads } from '@/lib/leads-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ leads: [], dbConfigured: false });
  }

  try {
    const leads = await listLeads();
    return NextResponse.json({ leads, dbConfigured: true });
  } catch (err) {
    console.error('[sales-dashboard] listLeads failed:', err);
    return NextResponse.json(
      { error: 'Datenbankfehler', dbConfigured: true },
      { status: 500 },
    );
  }
}
