'use client';

import { useState } from 'react';
import {
  type Lead,
  type LeadStatus,
  STATUS_META,
  STATUS_ORDER,
  formatEuro,
  initials,
  relativeTime,
  sourceColor,
  sourceLabel,
} from './types';

export default function KanbanBoard({
  leads,
  onSelect,
  onStatusChange,
}: {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
  onStatusChange: (id: number, status: LeadStatus) => void;
}) {
  const [dragId, setDragId] = useState<number | null>(null);
  const [overCol, setOverCol] = useState<LeadStatus | null>(null);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STATUS_ORDER.map((status) => {
        const colLeads = leads.filter((l) => l.status === status);
        const total = colLeads.reduce((s, l) => s + (l.est_value ?? 0), 0);
        const meta = STATUS_META[status];
        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              setOverCol(status);
            }}
            onDragLeave={() => setOverCol((c) => (c === status ? null : c))}
            onDrop={() => {
              if (dragId !== null) onStatusChange(dragId, status);
              setDragId(null);
              setOverCol(null);
            }}
            className={`flex w-72 shrink-0 flex-col rounded-2xl border bg-card/60 transition ${
              overCol === status ? `border-transparent ring-2 ${meta.ring}` : 'border-border'
            }`}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                <span className="text-sm font-semibold text-foreground">{meta.label}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  {colLeads.length}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">{formatEuro(total)}</span>
            </div>

            <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto p-3">
              {colLeads.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={() => setDragId(lead.id)}
                  onDragEnd={() => {
                    setDragId(null);
                    setOverCol(null);
                  }}
                  onClick={() => onSelect(lead)}
                  className={`cursor-grab rounded-xl border border-border bg-card p-3 transition hover:border-white/20 active:cursor-grabbing ${
                    dragId === lead.id ? 'opacity-40' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold text-white"
                      style={{ background: sourceColor(lead.source) }}
                    >
                      {initials(lead)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground">
                        {lead.company || lead.name || lead.email || '—'}
                      </div>
                      <div className="truncate text-[11px] text-muted-foreground">
                        {sourceLabel(lead.source)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{lead.est_value ? formatEuro(lead.est_value) : '—'}</span>
                    <span>{relativeTime(lead.created_at)}</span>
                  </div>
                </div>
              ))}
              {colLeads.length === 0 && (
                <div className="rounded-xl border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
                  Hierher ziehen
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
