import { sql } from '@vercel/postgres';

/**
 * Central lead persistence layer (Vercel Postgres).
 *
 * The whole website used to only email leads via Resend – nothing was stored.
 * This module adds a durable `leads` table so the sales dashboard has real,
 * queryable history. Every capture route calls `insertLead()` (best-effort,
 * never blocking the email flow).
 *
 * Everything degrades gracefully when POSTGRES_URL is missing (e.g. before the
 * Vercel Postgres store is provisioned): writes become no-ops and reads return
 * empty results instead of throwing, so the public site keeps working.
 */

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

export const LEAD_STATUSES: LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'won',
  'lost',
];

/** Which form / funnel produced the lead. */
export type LeadSource =
  | 'contact'
  | 'pentest'
  | 'quick-check'
  | 'tr03161'
  | 'get-started'
  | 'checkout'
  | 'other';

export type LeadInput = {
  source: LeadSource;
  name?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  companySize?: string | null;
  service?: string | null;
  message?: string | null;
  checkType?: string | null;
  checkScore?: number | null;
  checkVerdict?: string | null;
  estValue?: number | null;
  tag?: string | null;
  sourcePage?: string | null;
  payload?: Record<string, unknown> | null;
};

export type Lead = {
  id: number;
  created_at: string;
  source: LeadSource;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  company_size: string | null;
  service: string | null;
  message: string | null;
  check_type: string | null;
  check_score: number | null;
  check_verdict: string | null;
  est_value: number | null;
  status: LeadStatus;
  notes: string | null;
  tag: string | null;
  source_page: string | null;
  payload: Record<string, unknown> | null;
};

export function isDbConfigured(): boolean {
  return Boolean(
    process.env.POSTGRES_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.DATABASE_URL,
  );
}

let schemaReady: Promise<void> | null = null;

/** Create the table + indexes once per server instance (idempotent). */
export async function ensureSchema(): Promise<void> {
  if (!isDbConfigured()) return;
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id            BIGSERIAL PRIMARY KEY,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
          source        TEXT NOT NULL DEFAULT 'other',
          name          TEXT,
          company       TEXT,
          email         TEXT,
          phone         TEXT,
          company_size  TEXT,
          service       TEXT,
          message       TEXT,
          check_type    TEXT,
          check_score   INTEGER,
          check_verdict TEXT,
          est_value     INTEGER,
          status        TEXT NOT NULL DEFAULT 'new',
          notes         TEXT,
          tag           TEXT,
          source_page   TEXT,
          payload       JSONB
        );
      `;
      await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);`;
      await sql`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);`;
      await sql`CREATE INDEX IF NOT EXISTS leads_source_idx ON leads (source);`;
      await sql`CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);`;
    })().catch((err) => {
      // Reset so a later request can retry schema creation.
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

function toNullableInt(v: number | null | undefined): number | null {
  if (v === null || v === undefined || Number.isNaN(v)) return null;
  return Math.round(v);
}

/**
 * Persist a lead. Best-effort: returns the new id or null and never throws,
 * so callers can `void insertLead(...)` without risking the email response.
 */
export async function insertLead(input: LeadInput): Promise<number | null> {
  if (!isDbConfigured()) {
    console.warn('[leads-db] POSTGRES_URL not set – lead not persisted:', input.source);
    return null;
  }
  try {
    await ensureSchema();
    const payloadJson = input.payload ? JSON.stringify(input.payload) : null;
    const result = await sql<{ id: number }>`
      INSERT INTO leads (
        source, name, company, email, phone, company_size, service, message,
        check_type, check_score, check_verdict, est_value, tag, source_page, payload
      ) VALUES (
        ${input.source},
        ${input.name ?? null},
        ${input.company ?? null},
        ${input.email ?? null},
        ${input.phone ?? null},
        ${input.companySize ?? null},
        ${input.service ?? null},
        ${input.message ?? null},
        ${input.checkType ?? null},
        ${toNullableInt(input.checkScore)},
        ${input.checkVerdict ?? null},
        ${toNullableInt(input.estValue)},
        ${input.tag ?? null},
        ${input.sourcePage ?? null},
        ${payloadJson}::jsonb
      )
      RETURNING id;
    `;
    return result.rows[0]?.id ?? null;
  } catch (err) {
    console.error('[leads-db] insertLead failed (non-blocking):', err);
    return null;
  }
}

/** Fetch leads (most recent first). Capped for safety. */
export async function listLeads(limit = 2000): Promise<Lead[]> {
  if (!isDbConfigured()) return [];
  await ensureSchema();
  const result = await sql<Lead>`
    SELECT * FROM leads
    ORDER BY created_at DESC
    LIMIT ${limit};
  `;
  return result.rows;
}

export async function updateLead(
  id: number,
  fields: { status?: LeadStatus; notes?: string; est_value?: number | null },
): Promise<Lead | null> {
  if (!isDbConfigured()) return null;
  await ensureSchema();

  // Build a small dynamic update. @vercel/postgres has no query builder, so we
  // update each provided column with COALESCE-style explicit statements.
  const status = fields.status ?? null;
  const notes = fields.notes ?? null;
  const estValue =
    fields.est_value === undefined ? null : toNullableInt(fields.est_value);
  const estProvided = fields.est_value !== undefined;

  const result = await sql<Lead>`
    UPDATE leads SET
      status    = COALESCE(${status}, status),
      notes     = CASE WHEN ${notes}::text IS NOT NULL THEN ${notes} ELSE notes END,
      est_value = CASE WHEN ${estProvided} THEN ${estValue} ELSE est_value END
    WHERE id = ${id}
    RETURNING *;
  `;
  return result.rows[0] ?? null;
}

export async function deleteLead(id: number): Promise<boolean> {
  if (!isDbConfigured()) return false;
  await ensureSchema();
  const result = await sql`DELETE FROM leads WHERE id = ${id};`;
  return (result.rowCount ?? 0) > 0;
}

/**
 * Rough deal-value estimate (EUR) so the dashboard can show a pipeline total.
 * Deliberately conservative; sales can override per lead via the UI.
 */
export function estimateValue(source: LeadSource, service?: string | null): number {
  const s = (service || '').toLowerCase();
  switch (source) {
    case 'checkout':
    case 'get-started':
      if (s.includes('pro')) return 449 * 12;
      if (s.includes('studio')) return 199 * 12;
      return 99 * 12;
    case 'pentest':
      return 4500;
    case 'tr03161':
      return 6000;
    case 'quick-check':
      return 2500;
    case 'contact':
      return 2000;
    default:
      return 1500;
  }
}
