import { NextRequest, NextResponse } from 'next/server';
import { isTrackingAuthenticated } from '@/lib/tracking-auth';
import { isDbConfigured } from '@/lib/leads-db';
import {
  createTrackingLink,
  listTrackingLinks,
  statsByLink,
  SLUG_RE,
  type GateMode,
} from '@/lib/tracking-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CHANNELS = [
  'linkedin', 'youtube', 'instagram', 'tiktok', 'x', 'facebook',
  'google-ads', 'email', 'blog', 'podcast', 'qr', 'other',
];

function sinceIso(days: number): string {
  if (!days) return '1970-01-01T00:00:00.000Z';
  return new Date(Date.now() - days * 86400000).toISOString();
}

/** GET /api/tracking/links?days=30 – Links inkl. aggregierter Kennzahlen. */
export async function GET(request: NextRequest) {
  if (!(await isTrackingAuthenticated())) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }
  try {
    const days = Math.max(0, Number(request.nextUrl.searchParams.get('days')) || 0);
    const [links, stats] = await Promise.all([
      listTrackingLinks(),
      statsByLink(sinceIso(days)),
    ]);

    // Kennzahlen je Link zusammenfassen
    const bySlug = new Map<string, Record<string, { count: number; visitors: number }>>();
    for (const s of stats) {
      const rec = bySlug.get(s.link_slug) ?? {};
      rec[s.event] = { count: s.count, visitors: s.visitors };
      bySlug.set(s.link_slug, rec);
    }
    const enriched = links.map((l) => {
      const ev = bySlug.get(l.slug) ?? {};
      return {
        ...l,
        stats: {
          clicks: ev.click?.count ?? 0,
          visitors: ev.page_view?.visitors ?? 0,
          checkStarts: ev.check_start?.visitors ?? 0,
          checkCompleted: ev.check_completed?.visitors ?? 0,
          gateViews: ev.gate_view?.visitors ?? 0,
          leads: ev.lead_submitted?.visitors ?? 0,
          calls: ev.call_click?.visitors ?? 0,
        },
      };
    });

    return NextResponse.json({ links: enriched, dbConfigured: isDbConfigured() });
  } catch (err) {
    console.error('[tracking/links] GET failed:', err);
    return NextResponse.json({ error: 'Laden fehlgeschlagen' }, { status: 500 });
  }
}

function randomSlugPart(len: number): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789'; // ohne i/l/o/0/1 (Verwechslungsgefahr)
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const CHANNEL_PREFIX: Record<string, string> = {
  linkedin: 'li', youtube: 'yt', instagram: 'ig', tiktok: 'tt', x: 'x',
  facebook: 'fb', 'google-ads': 'ads', email: 'mail', blog: 'blog',
  podcast: 'pod', qr: 'qr', other: 'go',
};

/** POST /api/tracking/links – neuen Tracking-Link anlegen. */
export async function POST(request: NextRequest) {
  if (!(await isTrackingAuthenticated())) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'Datenbank nicht verbunden. Bitte zuerst Vercel Postgres verbinden.' },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '';
  const channel = typeof body.channel === 'string' && CHANNELS.includes(body.channel) ? body.channel : 'other';
  const campaign = typeof body.campaign === 'string' ? body.campaign.trim().slice(0, 120) || null : null;
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 500) || null : null;
  const gateMode: GateMode = body.gateMode === 'partial' ? 'partial' : 'full';
  let target = typeof body.target === 'string' ? body.target.trim() : '/';
  const slug = typeof body.slug === 'string' ? body.slug.trim().toLowerCase() : '';

  if (!name) {
    return NextResponse.json({ error: 'Bitte einen Namen angeben' }, { status: 400 });
  }
  // Ziel: nur interne Pfade zulassen
  if (!target.startsWith('/') || target.startsWith('//') || target.includes('://')) {
    return NextResponse.json({ error: 'Ziel muss ein interner Pfad sein (z. B. /pentest-schnellcheck)' }, { status: 400 });
  }
  target = target.slice(0, 300);

  if (slug && !SLUG_RE.test(slug)) {
    return NextResponse.json(
      { error: 'Slug darf nur Kleinbuchstaben, Zahlen, - und _ enthalten (2–64 Zeichen)' },
      { status: 400 },
    );
  }

  try {
    // Bis zu 5 Versuche bei Slug-Kollision (nur bei automatisch vergebenen Slugs)
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = slug || `${CHANNEL_PREFIX[channel] ?? 'go'}-${randomSlugPart(5)}`;
      const created = await createTrackingLink({ slug: candidate, name, campaign, channel, target, notes, gateMode });
      if (created !== 'duplicate') {
        return NextResponse.json({ link: created });
      }
      if (slug) {
        return NextResponse.json({ error: `Slug „${slug}“ ist bereits vergeben` }, { status: 409 });
      }
    }
    return NextResponse.json({ error: 'Kein freier Slug gefunden – bitte erneut versuchen' }, { status: 500 });
  } catch (err) {
    console.error('[tracking/links] POST failed:', err);
    return NextResponse.json({ error: 'Anlegen fehlgeschlagen' }, { status: 500 });
  }
}
