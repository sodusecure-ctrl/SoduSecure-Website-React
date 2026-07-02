import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/sales-auth';
import { type Lead, listLeads } from '@/lib/leads-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COLUMNS: { key: keyof Lead; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'created_at', label: 'Erstellt' },
  { key: 'source', label: 'Quelle' },
  { key: 'status', label: 'Status' },
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Firma' },
  { key: 'email', label: 'E-Mail' },
  { key: 'phone', label: 'Telefon' },
  { key: 'company_size', label: 'Firmengröße' },
  { key: 'service', label: 'Service' },
  { key: 'check_type', label: 'Check-Typ' },
  { key: 'check_score', label: 'Check-Score' },
  { key: 'check_verdict', label: 'Check-Ergebnis' },
  { key: 'est_value', label: 'Geschätzter Wert (€)' },
  { key: 'tag', label: 'Tag' },
  { key: 'source_page', label: 'Seite' },
  { key: 'message', label: 'Nachricht' },
  { key: 'notes', label: 'Notizen' },
];

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = String(value).replace(/"/g, '""');
  return `"${s}"`;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = await listLeads();
  const header = COLUMNS.map((c) => csvCell(c.label)).join(',');
  const rows = leads.map((lead) =>
    COLUMNS.map((c) => csvCell(lead[c.key])).join(','),
  );
  // BOM so Excel opens UTF-8 correctly.
  const csv = '﻿' + [header, ...rows].join('\r\n');

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="sodu-leads-${stamp}.csv"`,
    },
  });
}
