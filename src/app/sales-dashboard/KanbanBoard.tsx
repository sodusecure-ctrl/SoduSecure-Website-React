'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import {
  type Lead,
  type LeadStatus,
  STATUS_META,
  STATUS_ORDER,
  daysInStage,
  displaySource,
  formatEuro,
  initials,
  isStale,
  nextStage,
  normalizeStatus,
  prevStage,
  sourceColor,
  weightedValue,
} from './types';

/** Spalten, die beim ersten Besuch zugeklappt sind – selten gebraucht. */
const DEFAULT_COLLAPSED: LeadStatus[] = ['lost', 'trash'];
const STORAGE_KEY = 'sodu-pipeline-collapsed';

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
  const [collapsed, setCollapsed] = useState<Set<LeadStatus>>(new Set(DEFAULT_COLLAPSED));
  const scrollRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<Partial<Record<LeadStatus, HTMLDivElement | null>>>({});

  // Zuklapp-Zustand überlebt den Reload – sonst nervt es bei jedem Besuch.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          setCollapsed(new Set(list.filter((s): s is LeadStatus => s in STATUS_META)));
        }
      }
    } catch {
      /* localStorage nicht verfügbar – Standard bleibt */
    }
  }, []);

  const toggleCollapsed = useCallback((status: LeadStatus) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* egal */
      }
      return next;
    });
  }, []);

  /** Leads pro Stufe + Summen, einmal berechnet statt 10× gefiltert. */
  const byStage = useMemo(() => {
    const map = new Map<
      LeadStatus,
      { leads: Lead[]; total: number; weighted: number; stale: number }
    >();
    for (const status of STATUS_ORDER) {
      map.set(status, { leads: [], total: 0, weighted: 0, stale: 0 });
    }
    for (const lead of leads) {
      const bucket = map.get(normalizeStatus(lead.status));
      if (!bucket) continue;
      bucket.leads.push(lead);
      bucket.total += lead.est_value ?? 0;
      bucket.weighted += weightedValue(lead);
      if (isStale(lead)) bucket.stale += 1;
    }
    return map;
  }, [leads]);

  const maxCount = useMemo(
    () => Math.max(1, ...STATUS_ORDER.map((s) => byStage.get(s)?.leads.length ?? 0)),
    [byStage],
  );

  /** Klick auf ein Funnel-Segment holt die Spalte ins Bild. */
  const scrollToStage = useCallback((status: LeadStatus) => {
    const col = colRefs.current[status];
    const wrap = scrollRef.current;
    if (!col || !wrap) return;
    wrap.scrollTo({
      left: col.offsetLeft - wrap.offsetLeft - 12,
      behavior: 'smooth',
    });
  }, []);

  function moveBy(lead: Lead, dir: 1 | -1) {
    const status = normalizeStatus(lead.status);
    const target = dir === 1 ? nextStage(status) : prevStage(status);
    if (target) onStatusChange(lead.id, target);
  }

  return (
    <div className="space-y-4">
      {/* Funnel-Leiste: alle Stufen auf einen Blick, ohne scrollen zu müssen */}
      <div className="rounded-2xl border border-border bg-card/60 p-3">
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Pipeline-Übersicht
          </span>
          <span className="text-[11px] text-muted-foreground">
            Klick springt zur Spalte · Prozent = Abschlusswahrscheinlichkeit
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5 lg:grid-cols-10">
          {STATUS_ORDER.map((status) => {
            const meta = STATUS_META[status];
            const bucket = byStage.get(status)!;
            const share = (bucket.leads.length / maxCount) * 100;
            return (
              <button
                key={status}
                onClick={() => scrollToStage(status)}
                title={meta.hint}
                className="group rounded-xl border border-border bg-card px-2 py-2 text-left transition hover:border-white/20"
              >
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
                  <span className="truncate text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {meta.short}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-semibold leading-none text-foreground">
                    {bucket.leads.length}
                  </span>
                  {meta.group === 'open' && (
                    <span className="text-[10px] text-muted-foreground">
                      {Math.round(meta.probability * 100)}%
                    </span>
                  )}
                </div>
                {/* Mini-Balken macht die Verteilung ohne Chart sichtbar */}
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${share}%`, background: meta.chart }}
                  />
                </div>
                <div className="mt-1 truncate text-[10px] text-muted-foreground">
                  {bucket.total ? formatEuro(bucket.total) : '—'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Board */}
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-4">
        {STATUS_ORDER.map((status) => {
          const meta = STATUS_META[status];
          const bucket = byStage.get(status)!;
          const isCollapsed = collapsed.has(status);
          const isOver = overCol === status;

          return (
            <div
              key={status}
              ref={(el) => {
                colRefs.current[status] = el;
              }}
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
              className={`flex shrink-0 flex-col rounded-2xl border bg-card/60 transition-all ${
                isCollapsed ? 'w-12' : 'w-[244px]'
              } ${isOver ? `border-transparent ring-2 ${meta.ring}` : 'border-border'}`}
            >
              {isCollapsed ? (
                /* Zugeklappt: schmale vertikale Leiste, bleibt Drop-Ziel */
                <button
                  onClick={() => toggleCollapsed(status)}
                  className="flex min-h-[220px] flex-1 flex-col items-center gap-2.5 py-3"
                  title={`${meta.label} aufklappen`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${meta.dot}`} />
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-foreground">
                    {bucket.leads.length}
                  </span>
                  <span
                    className="text-[11px] font-medium tracking-wide text-muted-foreground"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {meta.label}
                  </span>
                </button>
              ) : (
                <>
                  <div className="border-b border-border px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`} />
                      <span className="truncate text-sm font-semibold text-foreground">
                        {meta.label}
                      </span>
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {bucket.leads.length}
                      </span>
                      <button
                        onClick={() => toggleCollapsed(status)}
                        className="ml-auto shrink-0 rounded p-0.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        title="Spalte zuklappen"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{bucket.total ? formatEuro(bucket.total) : '—'}</span>
                      {meta.group === 'open' && bucket.weighted > 0 && (
                        <span title="Gewichtet mit der Abschlusswahrscheinlichkeit">
                          ⌀ {formatEuro(bucket.weighted)}
                        </span>
                      )}
                      {bucket.stale > 0 && (
                        <span
                          className="inline-flex items-center gap-0.5 text-amber-400"
                          title={`${bucket.stale} Lead(s) liegen zu lange in dieser Stufe`}
                        >
                          <AlertTriangle className="h-3 w-3" />
                          {bucket.stale}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex max-h-[58vh] flex-col gap-2 overflow-y-auto p-2.5">
                    {bucket.leads.map((lead) => {
                      const stale = isStale(lead);
                      const days = daysInStage(lead);
                      const canBack = prevStage(status) !== null;
                      const canFwd = nextStage(status) !== null;
                      return (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={() => setDragId(lead.id)}
                          onDragEnd={() => {
                            setDragId(null);
                            setOverCol(null);
                          }}
                          className={`group rounded-xl border bg-card p-2.5 transition ${
                            stale
                              ? 'border-amber-500/40 hover:border-amber-500/60'
                              : 'border-border hover:border-white/20'
                          } ${dragId === lead.id ? 'opacity-40' : ''}`}
                        >
                          <div
                            onClick={() => onSelect(lead)}
                            className="cursor-grab active:cursor-grabbing"
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
                                  {displaySource(lead)}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px]">
                              <span className="text-muted-foreground">
                                {lead.est_value ? formatEuro(lead.est_value) : '—'}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 ${
                                  stale ? 'font-medium text-amber-400' : 'text-muted-foreground'
                                }`}
                                title={
                                  stale
                                    ? `Liegt seit ${days} Tagen in "${meta.label}" – nachfassen`
                                    : `Seit ${days} Tag(en) in dieser Stufe`
                                }
                              >
                                <Clock className="h-3 w-3" />
                                {days}T
                              </span>
                            </div>
                          </div>

                          {/* Stufe weiterschieben – funktioniert auch auf Touch,
                              wo Drag & Drop nicht zuverlässig greift. */}
                          <div className="mt-2 flex gap-1 border-t border-border pt-2">
                            <button
                              disabled={!canBack}
                              onClick={() => moveBy(lead, -1)}
                              className="flex h-6 flex-1 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-30"
                              title={
                                canBack
                                  ? `Zurück zu "${STATUS_META[prevStage(status)!].label}"`
                                  : 'Erste Stufe'
                              }
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                            <button
                              disabled={!canFwd}
                              onClick={() => moveBy(lead, 1)}
                              className="flex h-6 flex-1 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-30"
                              title={
                                canFwd
                                  ? `Weiter zu "${STATUS_META[nextStage(status)!].label}"`
                                  : 'Letzte Stufe'
                              }
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {bucket.leads.length === 0 && (
                      <div className="rounded-xl border border-dashed border-border px-2 py-6 text-center">
                        <p className="text-[11px] text-muted-foreground">{meta.hint}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
