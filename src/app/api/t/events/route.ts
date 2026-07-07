import { NextRequest, NextResponse } from 'next/server';
import { ALLOWED_EVENTS, insertTrackingEvent, SLUG_RE } from '@/lib/tracking-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Öffentlicher Event-Ingest für das Kampagnen-Tracking (sendBeacon-Ziel).
 * Nimmt nur allowlistete Events mit gültigem Slug an; antwortet immer 200,
 * damit der Client nie retried oder Fehler zeigt.
 */

const ID_RE = /^[a-z0-9_-]{4,64}$/i;

export async function POST(request: NextRequest) {
  try {
    // sendBeacon liefert je nach Browser text/plain – deshalb tolerant parsen
    const raw = await request.text();
    if (!raw || raw.length > 6000) return NextResponse.json({ ok: true });
    const body = JSON.parse(raw) as Record<string, unknown>;

    const slug = typeof body.slug === 'string' ? body.slug.toLowerCase() : '';
    const visitorId = typeof body.visitorId === 'string' ? body.visitorId : '';
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
    const event = typeof body.event === 'string' ? body.event : '';
    const path = typeof body.path === 'string' ? body.path.slice(0, 300) : null;
    const meta =
      body.meta && typeof body.meta === 'object' && !Array.isArray(body.meta)
        ? (body.meta as Record<string, unknown>)
        : null;

    if (!SLUG_RE.test(slug)) return NextResponse.json({ ok: true });
    if (!ID_RE.test(visitorId) || !ID_RE.test(sessionId)) return NextResponse.json({ ok: true });
    if (!(ALLOWED_EVENTS as readonly string[]).includes(event) || event === 'click') {
      // 'click' wird ausschließlich serverseitig beim Redirect geloggt
      return NextResponse.json({ ok: true });
    }

    await insertTrackingEvent({ linkSlug: slug, visitorId, sessionId, event, path, meta });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
