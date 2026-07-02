import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/sales-auth';
import {
  LEAD_STATUSES,
  type LeadStatus,
  deleteLead,
  updateLead,
} from '@/lib/leads-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) {
    return NextResponse.json({ error: 'Ungültige ID' }, { status: 400 });
  }

  let body: { status?: unknown; notes?: unknown; est_value?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const fields: { status?: LeadStatus; notes?: string; est_value?: number | null } = {};

  if (body.status !== undefined) {
    if (!LEAD_STATUSES.includes(body.status as LeadStatus)) {
      return NextResponse.json({ error: 'Ungültiger Status' }, { status: 400 });
    }
    fields.status = body.status as LeadStatus;
  }
  if (body.notes !== undefined) {
    fields.notes = String(body.notes).slice(0, 5000);
  }
  if (body.est_value !== undefined) {
    fields.est_value =
      body.est_value === null ? null : Number(body.est_value) || 0;
  }

  try {
    const lead = await updateLead(id, fields);
    if (!lead) {
      return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });
    }
    return NextResponse.json({ lead });
  } catch (err) {
    console.error('[sales-dashboard] updateLead failed:', err);
    return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) {
    return NextResponse.json({ error: 'Ungültige ID' }, { status: 400 });
  }

  try {
    const ok = await deleteLead(id);
    if (!ok) {
      return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[sales-dashboard] deleteLead failed:', err);
    return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
  }
}
