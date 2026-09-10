import { NextRequest, NextResponse } from 'next/server';
import { isTrackingAuthenticated } from '@/lib/tracking-auth';
import { funnelForLink, SLUG_RE } from '@/lib/tracking-db';
import { leadDaysForLink, leadsForLink } from '@/lib/leads-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/tracking/stats?slug=<slug>&days=30 – Detail-Funnel eines Links. */
export async function GET(request: NextRequest) {
  if (!(await isTrackingAuthenticated())) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }
  const slug = (request.nextUrl.searchParams.get('slug') || '').toLowerCase();
  const days = Math.max(0, Number(request.nextUrl.searchParams.get('days')) || 0);
  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: 'Ungültiger Slug' }, { status: 400 });
  }
  const sinceIso = days
    ? new Date(Date.now() - days * 86400000).toISOString()
    : '1970-01-01T00:00:00.000Z';

  try {
    const [funnel, leadRows, leadDays] = await Promise.all([
      funnelForLink(slug, sinceIso),
      leadsForLink(slug, sinceIso),
      leadDaysForLink(slug, sinceIso),
    ]);

    // Leads aus der Leads-Tabelle in den Tages-Verlauf mergen: die Event-Zahlen
    // erfassen nur die Check-Seiten, die Tabelle jedes Formular.
    const dayMap = new Map(funnel.days.map((d) => [d.day, { ...d }]));
    for (const ld of leadDays) {
      const existing = dayMap.get(ld.day);
      if (existing) existing.leads = Math.max(existing.leads, ld.leads);
      else dayMap.set(ld.day, { day: ld.day, clicks: 0, leads: ld.leads });
    }
    const days = [...dayMap.values()].sort((a, b) => a.day.localeCompare(b.day));
    const leadsCount = leadDays.reduce((s, d) => s + d.leads, 0);

    return NextResponse.json({ funnel: { ...funnel, days, leadsList: leadRows, leadsCount } });
  } catch (err) {
    console.error('[tracking/stats] GET failed:', err);
    return NextResponse.json({ error: 'Laden fehlgeschlagen' }, { status: 500 });
  }
}
