'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Database,
  Gauge,
  Download,
  Euro,
  KanbanSquare,
  LayoutGrid,
  ListFilter,
  LogOut,
  RefreshCw,
  Search,
  Table2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import {
  type Lead,
  type LeadStatus,
  CLOSED_STATUSES,
  OPEN_STATUSES,
  STATUS_META,
  STATUS_ORDER,
  countsTowardsStats,
  formatEuro,
  isStale,
  normalizeStatus,
  sourceColor,
  sourceLabel,
  weightedValue,
} from './types';
import {
  LeadsTrendChart,
  SourceDonut,
  StatusFunnel,
  TopCompanies,
  TrafficDonut,
  ValueByStatus,
} from './LeadCharts';
import LeadsTable from './LeadsTable';
import KanbanBoard from './KanbanBoard';
import LeadDrawer from './LeadDrawer';

type Tab = 'overview' | 'leads' | 'pipeline' | 'analytics';
type Range = 7 | 30 | 90 | 0; // 0 = all

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'overview', label: 'Übersicht', icon: LayoutGrid },
  { key: 'leads', label: 'Leads', icon: Table2 },
  { key: 'pipeline', label: 'Pipeline', icon: KanbanSquare },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const RANGES: { value: Range; label: string }[] = [
  { value: 7, label: '7 Tage' },
  { value: 30, label: '30 Tage' },
  { value: 90, label: '90 Tage' },
  { value: 0, label: 'Alle' },
];

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export default function SalesDashboard({ dbConfigured }: { dbConfigured: boolean }) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);

  const [tab, setTab] = useState<Tab>('overview');
  const [search, setSearch] = useState('');
  const [range, setRange] = useState<Range>(30);
  const [sourceFilter, setSourceFilter] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<Set<LeadStatus>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/sales-dashboard/leads', { cache: 'no-store' });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Laden');
      setLeads(Array.isArray(data.leads) ? data.leads : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const availableSources = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => set.add(l.source));
    return [...set];
  }, [leads]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cutoff = range === 0 ? 0 : Date.now() - range * 86400000;
    return leads.filter((l) => {
      if (cutoff && new Date(l.created_at).getTime() < cutoff) return false;
      if (sourceFilter.size && !sourceFilter.has(l.source)) return false;
      if (statusFilter.size && !statusFilter.has(l.status)) return false;
      if (q) {
        const hay = [
          l.name,
          l.company,
          l.email,
          l.phone,
          l.service,
          l.message,
          l.check_type,
          l.notes,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, search, range, sourceFilter, statusFilter]);

  const kpis = useMemo(() => {
    const todayStart = startOfToday();
    const weekStart = todayStart - 6 * 86400000;
    // Muell (Spam, Bewerbungen, Tests) fliegt aus allen Quoten - sonst
    // druecken Spam-Eintraege die Conversion-Rate kuenstlich nach unten.
    const real = filtered.filter(countsTowardsStats);
    const openGroup = new Set<LeadStatus>(OPEN_STATUSES);
    const open = real.filter((l) => openGroup.has(normalizeStatus(l.status)));
    const won = real.filter((l) => normalizeStatus(l.status) === 'won');
    const decided = real.filter((l) => {
      const g = STATUS_META[normalizeStatus(l.status)].group;
      return g === 'won' || g === 'lost';
    });
    return {
      total: real.length,
      trashCount: filtered.length - real.length,
      newCount: real.filter((l) => normalizeStatus(l.status) === 'new').length,
      today: real.filter((l) => new Date(l.created_at).getTime() >= todayStart).length,
      week: real.filter((l) => new Date(l.created_at).getTime() >= weekStart).length,
      openValue: open.reduce((s, l) => s + (l.est_value ?? 0), 0),
      openCount: open.length,
      // Gewichteter Forecast: jede Stufe mit ihrer Abschlusswahrscheinlichkeit.
      forecast: Math.round(open.reduce((s, l) => s + weightedValue(l), 0)),
      wonValue: won.reduce((s, l) => s + (l.est_value ?? 0), 0),
      wonCount: won.length,
      // Quote auf entschiedene Deals (gewonnen + verloren), nicht auf alle
      // Leads - offene Deals sind noch kein Misserfolg.
      conversion: decided.length ? Math.round((won.length / decided.length) * 100) : 0,
      stale: open.filter(isStale).length,
    };
  }, [filtered]);

  const trendDays = range === 0 ? 90 : range;

  const updateLead = useCallback(
    async (id: number, fields: { status?: LeadStatus; notes?: string; est_value?: number }) => {
      setSavingId(id);
      // optimistic
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...fields } : l)));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, ...fields } : prev));
      try {
        const res = await fetch(`/api/sales-dashboard/leads/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.lead) {
          setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
          setSelected((prev) => (prev && prev.id === id ? data.lead : prev));
        }
      } catch {
        load(); // rollback via reload
      } finally {
        setSavingId(null);
      }
    },
    [load],
  );

  const deleteLead = useCallback(async (id: number) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/sales-dashboard/leads/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setSelected(null);
    } catch {
      /* keep */
    } finally {
      setSavingId(null);
    }
  }, []);

  async function logout() {
    await fetch('/api/sales-dashboard/auth', { method: 'DELETE' });
    router.refresh();
  }

  const hasFilters =
    search.trim() !== '' || sourceFilter.size > 0 || statusFilter.size > 0;

  function resetFilters() {
    setSearch('');
    setSourceFilter(new Set());
    setStatusFilter(new Set());
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-lg shadow-rose-900/30">
            <Activity className="h-5 w-5" />
          </div>
          <div className="mr-auto">
            <h1 className="text-sm font-semibold leading-tight sm:text-base">Sales Dashboard</h1>
            <p className="text-[11px] text-muted-foreground">
              {loading ? 'lädt…' : `${leads.length} Leads gesamt`}
            </p>
          </div>

          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            title="Aktualisieren"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Aktualisieren</span>
          </button>
          <a
            href="/api/sales-dashboard/export"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">CSV</span>
          </a>
          <a
            href="/tracking"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            title="Tracking-Links & Kampagnen"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Tracking</span>
          </a>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Abmelden</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 sm:px-6">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition ${
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                {active && (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-rose-500" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        {/* DB not configured banner */}
        {!dbConfigured && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="font-medium text-amber-300">Datenbank noch nicht verbunden</p>
              <p className="mt-1 text-amber-200/80">
                Lege in Vercel unter <strong>Storage → Create Database → Postgres</strong> eine
                Datenbank an und verbinde sie mit diesem Projekt. Danach werden alle neuen Leads
                automatisch hier angezeigt.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            {error}
          </div>
        )}

        {/* Filter bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suche nach Name, Firma, E-Mail, Nachricht…"
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-rose-500/60"
            />
          </div>

          <div className="flex items-center rounded-xl border border-border bg-card p-0.5">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`rounded-lg px-2.5 py-2 text-xs font-medium transition ${
                  range === r.value
                    ? 'bg-rose-500 text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
              showFilters || hasFilters
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <ListFilter className="h-4 w-4" />
            Filter
            {hasFilters && (
              <span className="rounded-full bg-rose-500 px-1.5 text-[10px] text-white">
                {sourceFilter.size + statusFilter.size + (search ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mb-6 space-y-4 rounded-2xl border border-border bg-card p-4">
            <div>
              <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Quelle
              </div>
              <div className="flex flex-wrap gap-1.5">
                {availableSources.map((s) => {
                  const on = sourceFilter.has(s);
                  return (
                    <button
                      key={s}
                      onClick={() =>
                        setSourceFilter((prev) => {
                          const n = new Set(prev);
                          if (n.has(s)) n.delete(s);
                          else n.add(s);
                          return n;
                        })
                      }
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                        on
                          ? 'border-transparent text-white'
                          : 'border-border text-muted-foreground hover:bg-muted'
                      }`}
                      style={on ? { background: sourceColor(s) } : undefined}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: on ? '#fff' : sourceColor(s) }}
                      />
                      {sourceLabel(s)}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Pipeline-Stufe
                </span>
                {/* Bei zehn Stufen sind Sammel-Shortcuts schneller als zehn Klicks */}
                <button
                  onClick={() => setStatusFilter(new Set(OPEN_STATUSES))}
                  className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  nur offene
                </button>
                <button
                  onClick={() => setStatusFilter(new Set(CLOSED_STATUSES))}
                  className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  nur abgeschlossene
                </button>
                {statusFilter.size > 0 && (
                  <button
                    onClick={() => setStatusFilter(new Set())}
                    className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    alle
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STATUS_ORDER.map((s, i) => {
                  const on = statusFilter.has(s);
                  // Trennstrich zwischen laufenden und abgeschlossenen Stufen
                  const divider =
                    i > 0 &&
                    STATUS_META[s].group !== 'open' &&
                    STATUS_META[STATUS_ORDER[i - 1]].group === 'open';
                  return (
                    <span key={s} className="flex items-center gap-1.5">
                      {divider && <span className="mx-1 h-4 w-px bg-border" />}
                      <button
                        onClick={() =>
                          setStatusFilter((prev) => {
                            const n = new Set(prev);
                            if (n.has(s)) n.delete(s);
                            else n.add(s);
                            return n;
                          })
                        }
                        title={STATUS_META[s].hint}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                          on ? STATUS_META[s].badge : 'border-border text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {STATUS_META[s].label}
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" /> Filter zurücksetzen
              </button>
            )}
          </div>
        )}

        {/* KPI cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          <Kpi
            icon={Users}
            label="Leads"
            value={String(kpis.total)}
            sub={kpis.trashCount ? `+ ${kpis.trashCount} Müll` : undefined}
            tone="rose"
          />
          <Kpi icon={Activity} label="Neu" value={String(kpis.newCount)} tone="sky" />
          <Kpi
            icon={CalendarDays}
            label="Heute"
            value={String(kpis.today)}
            sub={`${kpis.week} in 7 Tg.`}
            tone="violet"
          />
          <Kpi
            icon={Euro}
            label="Pipeline"
            value={formatEuro(kpis.openValue)}
            sub={`${kpis.openCount} offen`}
            tone="teal"
          />
          <Kpi
            icon={Gauge}
            label="Forecast"
            value={formatEuro(kpis.forecast)}
            sub="gewichtet"
            tone="amber"
          />
          <Kpi
            icon={CheckCircle2}
            label="Unterschrieben"
            value={formatEuro(kpis.wonValue)}
            sub={`${kpis.wonCount} Deals · ${kpis.conversion}% Quote`}
            tone="emerald"
          />
          <Kpi
            icon={AlertTriangle}
            label="Stockt"
            value={String(kpis.stale)}
            sub="zu lange liegen"
            tone={kpis.stale > 0 ? 'warn' : 'slate'}
          />
        </div>

        {/* Content */}
        {loading && leads.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-border bg-card">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {tab === 'overview' && (
              <div className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <LeadsTrendChart leads={filtered} days={trendDays} />
                  </div>
                  <TrafficDonut leads={filtered} />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <SourceDonut leads={filtered} />
                  <StatusFunnel leads={filtered} />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <ValueByStatus leads={filtered} />
                  <TopCompanies leads={filtered} />
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                    Neueste Leads
                  </h3>
                  <LeadsTable leads={filtered} onSelect={setSelected} selectedId={selected?.id} />
                </div>
              </div>
            )}

            {tab === 'leads' && (
              <LeadsTable leads={filtered} onSelect={setSelected} selectedId={selected?.id} />
            )}

            {tab === 'pipeline' && (
              <KanbanBoard
                leads={filtered}
                onSelect={setSelected}
                onStatusChange={(id, status) => updateLead(id, { status })}
              />
            )}

            {tab === 'analytics' && (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <LeadsTrendChart leads={filtered} days={trendDays} />
                </div>
                <TrafficDonut leads={filtered} />
                <SourceDonut leads={filtered} />
                <StatusFunnel leads={filtered} />
                <ValueByStatus leads={filtered} />
                <TopCompanies leads={filtered} />
              </div>
            )}
          </>
        )}
      </main>

      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateLead}
          onDelete={deleteLead}
          saving={savingId === selected.id}
        />
      )}
    </div>
  );
}

const TONES: Record<string, string> = {
  rose: 'text-rose-400 bg-rose-500/10',
  sky: 'text-sky-400 bg-sky-500/10',
  violet: 'text-violet-400 bg-violet-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
  teal: 'text-teal-400 bg-teal-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
  warn: 'text-amber-400 bg-amber-500/20 ring-1 ring-amber-500/40',
  slate: 'text-slate-400 bg-slate-500/10',
};

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${TONES[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-2 text-xl font-semibold tracking-tight text-foreground">{value}</div>
      {sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}
