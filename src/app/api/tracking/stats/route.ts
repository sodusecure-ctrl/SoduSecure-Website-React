import { NextRequest, NextResponse } from 'next/server';
import { isTrackingAuthenticated } from '@/lib/tracking-auth';
import { funnelForLink, SLUG_RE } from '@/lib/tracking-db';

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
    const funnel = await funnelForLink(slug, sinceIso);
    return NextResponse.json({ funnel });
  } catch (err) {
    console.error('[tracking/stats] GET failed:', err);
    return NextResponse.json({ error: 'Laden fehlgeschlagen' }, { status: 500 });
  }
}
