'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  type Lead,
  STATUS_META,
  displaySource,
  formatEuro,
  initials,
  relativeTime,
  sourceColor,
} from './types';

type SortKey = 'created_at' | 'company' | 'source' | 'status' | 'est_value' | 'check_score';

const PAGE_SIZE = 25;

export default function LeadsTable({
  leads,
  onSelect,
  selectedId,
}: {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
  selectedId?: number | null;
}) {
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    const copy = [...leads];
    copy.sort((a, b) => {
      let av: string | number = '';
      let bv: string | number = '';
      switch (sortKey) {
        case 'created_at':
          av = new Date(a.created_at).getTime();
          bv = new Date(b.created_at).getTime();
          break;
        case 'est_value':
          av = a.est_value ?? 0;
          bv = b.est_value ?? 0;
          break;
        case 'check_score':
          av = a.check_score ?? -1;
          bv = b.check_score ?? -1;
          break;
        case 'company':
          av = (a.company || a.name || '').toLowerCase();
          bv = (b.company || b.name || '').toLowerCase();
          break;
        default:
          av = a[sortKey] || '';
          bv = b[sortKey] || '';
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [leads, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const rows = sorted.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
    setPage(0);
  }

  const Th = ({ label, k, className = '' }: { label: string; k: SortKey; className?: string }) => (
    <th className={`px-3 py-2.5 text-left font-medium ${className}`}>
      <button
        onClick={() => toggleSort(k)}
        className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground"
      >
        {label}
        {sortKey === k &&
          (sortDir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
      </button>
    </th>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs">
            <tr>
              <Th label="Lead" k="company" />
              <Th label="Quelle" k="source" className="hidden md:table-cell" />
              <Th label="Status" k="status" />
              <Th label="Score" k="check_score" className="hidden lg:table-cell" />
              <Th label="Wert" k="est_value" className="hidden sm:table-cell" />
              <Th label="Datum" k="created_at" />
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onSelect(lead)}
                className={`cursor-pointer border-b border-border/60 transition hover:bg-muted/40 ${
                  selectedId === lead.id ? 'bg-muted/60' : ''
                }`}
              >
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold text-white"
                      style={{ background: sourceColor(lead.source) }}
                    >
                      {initials(lead)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium text-foreground">
                        {lead.company || lead.name || '—'}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {lead.email || lead.name || 'keine E-Mail'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-3 py-2.5 md:table-cell">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: sourceColor(lead.source) }}
                    />
                    {displaySource(lead)}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${STATUS_META[lead.status].badge}`}
                  >
                    {STATUS_META[lead.status].label}
                  </span>
                </td>
                <td className="hidden px-3 py-2.5 lg:table-cell">
                  {lead.check_score !== null ? (
                    <span className="text-xs font-medium text-foreground">
                      {lead.check_score}
                      <span className="text-muted-foreground">/100</span>
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="hidden px-3 py-2.5 text-sm sm:table-cell">
                  {lead.est_value ? formatEuro(lead.est_value) : '—'}
                </td>
                <td className="px-3 py-2.5">
                  <span className="text-xs text-muted-foreground" title={new Date(lead.created_at).toLocaleString('de-DE')}>
                    {relativeTime(lead.created_at)}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-12 text-center text-sm text-muted-foreground">
                  Keine Leads gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sorted.length > PAGE_SIZE && (
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>
            {safePage * PAGE_SIZE + 1}–{Math.min(sorted.length, (safePage + 1) * PAGE_SIZE)} von {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="rounded-lg border border-border p-1.5 transition hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2">
              {safePage + 1} / {pageCount}
            </span>
            <button
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              className="rounded-lg border border-border p-1.5 transition hover:bg-muted disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
