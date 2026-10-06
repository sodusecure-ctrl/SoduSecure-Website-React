import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/sales-auth';
import { type Lead, listLeads } from '@/lib/leads-db';
import { STATUS_META, normalizeStatus } from '@/app/sales-dashboard/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Tage seit dem letzten Stufenwechsel - macht Liegenbleiber in Excel filterbar. */
function daysInStage(lead: Lead): number {
  const basis = lead.status_changed_at || lead.created_at;
  const ms = Date.now() - new Date(basis).getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

const COLUMNS: {
  key: keyof Lead | 'days_in_stage';
  label: string;
  format?: (lead: Lead) => unknown;
}[] = [
  { key: 'id', label: 'ID' },
  { key: 'created_at', label: 'Erstellt' },
  { key: 'source', label: 'Quelle' },
  {
    key: 'status',
    label: 'Pipeline-Stufe',
    // Deutsches Label statt des rohen DB-Keys - der Export geht an Menschen.
    format: (lead) => STATUS_META[normalizeStatus(lead.status)].label,
  },
  { key: 'status_changed_at', label: 'Stufe geändert' },
  { key: 'days_in_stage', label: 'Tage in Stufe', format: daysInStage },
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
  { key: 'traffic_label', label: 'Traffic-Quelle' },
  { key: 'link_slug', label: 'Kampagnen-Link' },
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
    COLUMNS.map((c) =>
      csvCell(c.format ? c.format(lead) : lead[c.key as keyof Lead]),
    ).join(','),
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
