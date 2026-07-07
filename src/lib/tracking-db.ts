import { sql } from '@vercel/postgres';
import { isDbConfigured } from './leads-db';

/**
 * Kampagnen-/Link-Tracking (Vercel Postgres).
 *
 * `tracking_links`  – ein Datensatz pro Tracking-Link (/t/<slug>): Name,
 *                     Kanal (linkedin/youtube/…), Kampagne, Zielseite.
 * `tracking_events` – jedes Funnel-Ereignis eines Besuchers, der über einen
 *                     Tracking-Link kam: Klick, Seitenaufruf, Check gestartet,
 *                     jede beantwortete Frage, ausgefüllte Formularfelder,
 *                     Lead abgesendet, … Nur anonyme IDs, keine Klartext-PII.
 *
 * Wie leads-db: alles best-effort und ohne DB konfigurationsfrei lauffähig.
 */

export type TrackingLink = {
  id: number;
  created_at: string;
  slug: string;
  name: string;
  campaign: string | null;
  channel: string;
  target: string;
  notes: string | null;
  archived: boolean;
};

export type TrackingEventInput = {
  linkSlug: string;
  visitorId: string;
  sessionId: string;
  event: string;
  path?: string | null;
  meta?: Record<string, unknown> | null;
};

/** Alle Events, die der Ingest-Endpunkt akzeptiert (Allowlist). */
export const ALLOWED_EVENTS = [
  'click',            // Server-seitig beim Redirect über /t/<slug>
  'page_view',
  'cta_click',
  'check_tab_select',
  'check_start',
  'question_answered',
  'question_back',
  'check_restart',
  'check_completed',
  'gate_view',        // Ergebnis-Sperre (Lead-Formular) gesehen
  'form_field_filled',
  'form_error',
  'form_submit_failed',
  'lead_submitted',
  'result_unlocked',
  'calendly_view',
  'call_click',
] as const;

export const SLUG_RE = /^[a-z0-9][a-z0-9_-]{1,63}$/;

let trackingSchemaReady: Promise<void> | null = null;

export async function ensureTrackingSchema(): Promise<void> {
  if (!isDbConfigured()) return;
  if (!trackingSchemaReady) {
    trackingSchemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS tracking_links (
          id         BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          slug       TEXT NOT NULL UNIQUE,
          name       TEXT NOT NULL,
          campaign   TEXT,
          channel    TEXT NOT NULL DEFAULT 'other',
          target     TEXT NOT NULL DEFAULT '/',
          notes      TEXT,
          archived   BOOLEAN NOT NULL DEFAULT false
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS tracking_events (
          id         BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          link_slug  TEXT NOT NULL,
          visitor_id TEXT NOT NULL,
          session_id TEXT NOT NULL,
          event      TEXT NOT NULL,
          path       TEXT,
          meta       JSONB
        );
      `;
      await sql`CREATE INDEX IF NOT EXISTS tracking_events_slug_time_idx ON tracking_events (link_slug, created_at DESC);`;
      await sql`CREATE INDEX IF NOT EXISTS tracking_events_event_idx ON tracking_events (event);`;
    })().catch((err) => {
      trackingSchemaReady = null;
      throw err;
    });
  }
  return trackingSchemaReady;
}

// ── Links ────────────────────────────────────────────────────────────────

export async function listTrackingLinks(): Promise<TrackingLink[]> {
  if (!isDbConfigured()) return [];
  await ensureTrackingSchema();
  const result = await sql<TrackingLink>`
    SELECT * FROM tracking_links ORDER BY created_at DESC LIMIT 500;
  `;
  return result.rows;
}

export async function getTrackingLink(slug: string): Promise<TrackingLink | null> {
  if (!isDbConfigured()) return null;
  await ensureTrackingSchema();
  const result = await sql<TrackingLink>`
    SELECT * FROM tracking_links WHERE slug = ${slug} LIMIT 1;
  `;
  return result.rows[0] ?? null;
}

export async function createTrackingLink(input: {
  slug: string;
  name: string;
  campaign?: string | null;
  channel: string;
  target: string;
  notes?: string | null;
}): Promise<TrackingLink | 'duplicate'> {
  await ensureTrackingSchema();
  try {
    const result = await sql<TrackingLink>`
      INSERT INTO tracking_links (slug, name, campaign, channel, target, notes)
      VALUES (
        ${input.slug}, ${input.name}, ${input.campaign ?? null},
        ${input.channel}, ${input.target}, ${input.notes ?? null}
      )
      RETURNING *;
    `;
    return result.rows[0];
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('duplicate key')) return 'duplicate';
    throw err;
  }
}

export async function updateTrackingLink(
  id: number,
  fields: { name?: string; campaign?: string | null; channel?: string; target?: string; notes?: string | null; archived?: boolean },
): Promise<TrackingLink | null> {
  if (!isDbConfigured()) return null;
  await ensureTrackingSchema();
  const name = fields.name ?? null;
  const channel = fields.channel ?? null;
  const target = fields.target ?? null;
  const campaign = fields.campaign === undefined ? null : fields.campaign;
  const campaignProvided = fields.campaign !== undefined;
  const notes = fields.notes === undefined ? null : fields.notes;
  const notesProvided = fields.notes !== undefined;
  const archived = fields.archived === undefined ? null : fields.archived;

  const result = await sql<TrackingLink>`
    UPDATE tracking_links SET
      name     = COALESCE(${name}, name),
      channel  = COALESCE(${channel}, channel),
      target   = COALESCE(${target}, target),
      campaign = CASE WHEN ${campaignProvided} THEN ${campaign} ELSE campaign END,
      notes    = CASE WHEN ${notesProvided} THEN ${notes} ELSE notes END,
      archived = COALESCE(${archived}::boolean, archived)
    WHERE id = ${id}
    RETURNING *;
  `;
  return result.rows[0] ?? null;
}

/** Löscht den Link samt aller zugehörigen Events. */
export async function deleteTrackingLink(id: number): Promise<boolean> {
  if (!isDbConfigured()) return false;
  await ensureTrackingSchema();
  const link = await sql<{ slug: string }>`SELECT slug FROM tracking_links WHERE id = ${id};`;
  const slug = link.rows[0]?.slug;
  if (!slug) return false;
  await sql`DELETE FROM tracking_events WHERE link_slug = ${slug};`;
  await sql`DELETE FROM tracking_links WHERE id = ${id};`;
  return true;
}

// ── Events ───────────────────────────────────────────────────────────────

/** Best-effort Insert – wirft nie, damit die öffentliche Seite nie leidet. */
export async function insertTrackingEvent(input: TrackingEventInput): Promise<void> {
  if (!isDbConfigured()) return;
  try {
    await ensureTrackingSchema();
    const metaJson = input.meta ? JSON.stringify(input.meta).slice(0, 4000) : null;
    await sql`
      INSERT INTO tracking_events (link_slug, visitor_id, session_id, event, path, meta)
      VALUES (
        ${input.linkSlug}, ${input.visitorId}, ${input.sessionId},
        ${input.event}, ${input.path ?? null}, ${metaJson}::jsonb
      );
    `;
  } catch (err) {
    console.error('[tracking-db] insertTrackingEvent failed (non-blocking):', err);
  }
}

// ── Statistiken ──────────────────────────────────────────────────────────

export type LinkStats = {
  link_slug: string;
  event: string;
  count: number;
  visitors: number;
};

/** Event-Zähler (gesamt + eindeutige Besucher) je Link und Event-Typ. */
export async function statsByLink(sinceIso: string): Promise<LinkStats[]> {
  if (!isDbConfigured()) return [];
  await ensureTrackingSchema();
  const result = await sql<LinkStats>`
    SELECT link_slug, event,
           COUNT(*)::int AS count,
           COUNT(DISTINCT visitor_id)::int AS visitors
    FROM tracking_events
    WHERE created_at >= ${sinceIso}
    GROUP BY link_slug, event;
  `;
  return result.rows;
}

export type QuestionStep = { check: string; step: number; visitors: number };
export type FieldFill = { field: string; visitors: number };
export type DayPoint = { day: string; clicks: number; leads: number };
export type RecentEvent = {
  created_at: string;
  visitor_id: string;
  session_id: string;
  event: string;
  path: string | null;
  meta: Record<string, unknown> | null;
};

export type LinkFunnel = {
  events: { event: string; count: number; visitors: number }[];
  questions: QuestionStep[];
  fields: FieldFill[];
  days: DayPoint[];
  recent: RecentEvent[];
};

/** Detail-Funnel für einen einzelnen Link. */
export async function funnelForLink(slug: string, sinceIso: string): Promise<LinkFunnel> {
  if (!isDbConfigured()) return { events: [], questions: [], fields: [], days: [], recent: [] };
  await ensureTrackingSchema();

  const [events, questions, fields, days, recent] = await Promise.all([
    sql<{ event: string; count: number; visitors: number }>`
      SELECT event, COUNT(*)::int AS count, COUNT(DISTINCT visitor_id)::int AS visitors
      FROM tracking_events
      WHERE link_slug = ${slug} AND created_at >= ${sinceIso}
      GROUP BY event;
    `,
    sql<{ check: string; step: number; visitors: number }>`
      SELECT COALESCE(meta->>'check', '?') AS check,
             COALESCE((meta->>'step')::int, 0) AS step,
             COUNT(DISTINCT visitor_id)::int AS visitors
      FROM tracking_events
      WHERE link_slug = ${slug} AND created_at >= ${sinceIso} AND event = 'question_answered'
      GROUP BY 1, 2
      ORDER BY 1, 2;
    `,
    sql<{ field: string; visitors: number }>`
      SELECT COALESCE(meta->>'field', '?') AS field,
             COUNT(DISTINCT visitor_id)::int AS visitors
      FROM tracking_events
      WHERE link_slug = ${slug} AND created_at >= ${sinceIso} AND event = 'form_field_filled'
      GROUP BY 1;
    `,
    sql<{ day: string; clicks: number; leads: number }>`
      SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
             COUNT(*) FILTER (WHERE event = 'click')::int AS clicks,
             COUNT(DISTINCT visitor_id) FILTER (WHERE event = 'lead_submitted')::int AS leads
      FROM tracking_events
      WHERE link_slug = ${slug} AND created_at >= ${sinceIso}
      GROUP BY 1
      ORDER BY 1;
    `,
    sql<RecentEvent>`
      SELECT created_at, visitor_id, session_id, event, path, meta
      FROM tracking_events
      WHERE link_slug = ${slug} AND created_at >= ${sinceIso}
      ORDER BY created_at DESC
      LIMIT 200;
    `,
  ]);

  return {
    events: events.rows,
    questions: questions.rows,
    fields: fields.rows,
    days: days.rows,
    recent: recent.rows,
  };
}
