import { NextRequest, NextResponse } from 'next/server';
import { isTrackingAuthenticated } from '@/lib/tracking-auth';
import { deleteTrackingLink, updateTrackingLink, type GateMode } from '@/lib/tracking-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isTrackingAuthenticated())) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }
  const { id: idRaw } = await params;
  const id = Number(idRaw);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'Ungültige ID' }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const fields: { name?: string; campaign?: string | null; notes?: string | null; archived?: boolean; gateMode?: GateMode } = {};
  if (typeof body.name === 'string' && body.name.trim()) fields.name = body.name.trim().slice(0, 120);
  if (typeof body.campaign === 'string') fields.campaign = body.campaign.trim().slice(0, 120) || null;
  if (typeof body.notes === 'string') fields.notes = body.notes.trim().slice(0, 500) || null;
  if (typeof body.archived === 'boolean') fields.archived = body.archived;
  if (body.gateMode === 'full' || body.gateMode === 'partial') fields.gateMode = body.gateMode;

  try {
    const link = await updateTrackingLink(id, fields);
    if (!link) return NextResponse.json({ error: 'Link nicht gefunden' }, { status: 404 });
    return NextResponse.json({ link });
  } catch (err) {
    console.error('[tracking/links/:id] PATCH failed:', err);
    return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isTrackingAuthenticated())) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }
  const { id: idRaw } = await params;
  const id = Number(idRaw);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'Ungültige ID' }, { status: 400 });
  }
  try {
    const ok = await deleteTrackingLink(id);
    if (!ok) return NextResponse.json({ error: 'Link nicht gefunden' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[tracking/links/:id] DELETE failed:', err);
    return NextResponse.json({ error: 'Löschen fehlgeschlagen' }, { status: 500 });
  }
}
