import { NextRequest, NextResponse } from 'next/server';
import { isTrackingAuthenticated } from '@/lib/tracking-auth';
import { sessionTimeline, visitorSessions } from '@/lib/tracking-db';
import { listLeads } from '@/lib/leads-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Seiten, die hier ausgewertet werden duerfen. */
const ERLAUBTE_PFADE = ['/request-pentest', '/request-pentest/en', '/preisrechner', '/pentest-konfigurator'];

/**
 * GET /api/besucher?path=/request-pentest&days=30
 *   -> Sitzungen der Seite, angereichert um den passenden Lead (falls abgesendet)
 *
 * GET /api/besucher?session=<id>
 *   -> vollstaendiger Ereignisverlauf einer einzelnen Sitzung
 *
 * Zugang ueber denselben PIN wie /tracking - die Daten gehoeren fachlich
 * zusammen und ein zweiter Zugangsweg waere eine zusaetzliche Angriffsflaeche.
 */
export async function GET(request: NextRequest) {
  if (!(await isTrackingAuthenticated())) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }

  const sessionId = request.nextUrl.searchParams.get('session');
  if (sessionId) {
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(sessionId)) {
      return NextResponse.json({ error: 'Ungültige Sitzung' }, { status: 400 });
    }
    try {
      return NextResponse.json({ timeline: await sessionTimeline(sessionId) });
    } catch (err) {
      console.error('[besucher] Zeitleiste fehlgeschlagen:', err);
      return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
    }
  }

  const path = request.nextUrl.searchParams.get('path') || '/request-pentest';
  if (!ERLAUBTE_PFADE.includes(path)) {
    return NextResponse.json({ error: 'Pfad nicht freigegeben' }, { status: 400 });
  }
  const days = Math.min(365, Math.max(1, Number(request.nextUrl.searchParams.get('days')) || 30));
  const sinceIso = new Date(Date.now() - days * 86400000).toISOString();

  try {
    const [sessions, leads] = await Promise.all([
      visitorSessions(path, sinceIso),
      listLeads(500),
    ]);

    // Sitzung und Lead zusammenbringen: Es gibt keine gemeinsame Kennung, aber
    // eine abgesendete Sitzung und der daraus entstandene Lead liegen zeitlich
    // dicht beieinander. Zehn Minuten Toleranz um das letzte Ereignis - enger
    // waere bei langsamer Mailzustellung zu streng, weiter wuerde fremde Leads
    // einsammeln.
    const kandidaten = leads
      .filter((l) => l.source === 'pentest')
      .map((l) => ({ lead: l, t: new Date(l.created_at).getTime() }));

    const angereichert = sessions.map((s) => {
      if (!s.submitted) return { ...s, lead: null };
      const ende = new Date(s.last_at).getTime();
      let treffer: (typeof kandidaten)[number] | null = null;
      let beste = Infinity;
      for (const k of kandidaten) {
        const abstand = Math.abs(k.t - ende);
        if (abstand < beste && abstand <= 10 * 60 * 1000) {
          beste = abstand;
          treffer = k;
        }
      }
      return {
        ...s,
        lead: treffer
          ? {
              id: treffer.lead.id,
              company: treffer.lead.company,
              email: treffer.lead.email,
              status: treffer.lead.status,
              est_value: treffer.lead.est_value,
            }
          : null,
      };
    });

    return NextResponse.json({ sessions: angereichert, path, days });
  } catch (err) {
    console.error('[besucher] Abfrage fehlgeschlagen:', err);
    return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
  }
}
