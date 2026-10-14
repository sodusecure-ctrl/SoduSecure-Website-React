'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowUpRight, Clock, Database, Eye, Loader2, MousePointerClick,
  RefreshCw, Smartphone, Monitor, Tablet, X, ChevronRight, Send, Users,
} from 'lucide-react';

// ── Typen (Spiegel der API-Antwort) ──────────────────────────────────────
type Lead = {
  id: number;
  company: string | null;
  email: string | null;
  status: string;
  est_value: number | null;
};

type Session = {
  session_id: string;
  visitor_id: string;
  started_at: string;
  last_at: string;
  seconds: number;
  scroll_pct: number;
  max_step: number;
  clicks: number;
  events: number;
  fields: string[];
  clicked: string[];
  submitted: boolean;
  link_slug: string;
  source_label: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  device: string | null;
  viewport: string | null;
  lead: Lead | null;
};

type TimelineEvent = {
  created_at: string;
  event: string;
  meta: Record<string, unknown> | null;
};

const PFADE = [
  { value: '/request-pentest', label: 'Konfigurator (DE)' },
  { value: '/request-pentest/en', label: 'Konfigurator (EN)' },
  { value: '/preisrechner', label: 'Preisrechner' },
  { value: '/pentest-konfigurator', label: 'Pentest-Konfigurator' },
];

const ZEITRAEUME = [7, 30, 90];

/** Wie weit ist die Sitzung im Funnel gekommen? */
const STUFEN = ['Seite gesehen', 'Bereich gewählt', 'Umfang gewählt', 'Formular erreicht'];

function dauer(s: number): string {
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  return m < 60 ? `${m} min ${s % 60} s` : `${Math.floor(m / 60)} h ${m % 60} min`;
}

function zeit(iso: string): string {
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  });
}

function GeraeteIcon({ device }: { device: string | null }) {
  const cls = 'h-3.5 w-3.5';
  if (device === 'mobil') return <Smartphone className={cls} />;
  if (device === 'tablet') return <Tablet className={cls} />;
  return <Monitor className={cls} />;
}

export default function BesucherDashboard({ dbConfigured }: { dbConfigured: boolean }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [path, setPath] = useState('/request-pentest');
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offen, setOffen] = useState<Session | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[] | null>(null);
  const [nurAbsender, setNurAbsender] = useState(false);

  const laden = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/besucher?path=${encodeURIComponent(path)}&days=${days}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Laden');
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }, [path, days]);

  useEffect(() => { laden(); }, [laden]);

  // Zeitleiste einer Sitzung nachladen
  useEffect(() => {
    if (!offen) { setTimeline(null); return; }
    let aktiv = true;
    (async () => {
      try {
        const res = await fetch(`/api/besucher?session=${encodeURIComponent(offen.session_id)}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (aktiv) setTimeline(Array.isArray(data.timeline) ? data.timeline : []);
      } catch { if (aktiv) setTimeline([]); }
    })();
    return () => { aktiv = false; };
  }, [offen]);

  const gefiltert = useMemo(
    () => (nurAbsender ? sessions.filter((s) => s.submitted) : sessions),
    [sessions, nurAbsender],
  );

  const kpi = useMemo(() => {
    const n = sessions.length;
    const abgesendet = sessions.filter((s) => s.submitted).length;
    const mitInteraktion = sessions.filter((s) => s.clicks > 0 || s.max_step > 0).length;
    const sekunden = sessions.map((s) => s.seconds).sort((a, b) => a - b);
    const median = sekunden.length ? sekunden[Math.floor(sekunden.length / 2)] : 0;
    const sofortWeg = sessions.filter((s) => s.seconds < 10 && s.clicks === 0).length;
    const mobil = sessions.filter((s) => s.device === 'mobil').length;
    return {
      n,
      abgesendet,
      quote: n ? ((abgesendet / n) * 100).toFixed(1) : '0',
      mitInteraktion,
      median,
      sofortWeg,
      sofortPct: n ? Math.round((sofortWeg / n) * 100) : 0,
      mobilPct: n ? Math.round((mobil / n) * 100) : 0,
    };
  }, [sessions]);

  /** Wie viele Sitzungen haben welche Funnel-Stufe erreicht? */
  const trichter = useMemo(() => {
    const n = sessions.length;
    return STUFEN.map((label, i) => {
      const erreicht = i === 0 ? n : sessions.filter((s) => s.max_step >= i).length;
      return { label, erreicht, pct: n ? Math.round((erreicht / n) * 100) : 0 };
    });
  }, [sessions]);

  /** Woher kommen die Besucher? */
  const herkunft = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of sessions) {
      const key = s.source_label || (s.referrer ? new URL(s.referrer, 'https://x').hostname : 'Direkt');
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [sessions]);

  /** Was wird am häufigsten geklickt? */
  const klicks = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of sessions) for (const c of s.clicked) map.set(c, (map.get(c) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [sessions]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-lg">
            <Eye className="h-5 w-5" />
          </div>
          <div className="mr-auto">
            <h1 className="text-sm font-semibold leading-tight sm:text-base">Besucher-Analyse</h1>
            <p className="text-[11px] text-muted-foreground">
              {loading ? 'lädt…' : `${sessions.length} Sitzungen · ${path}`}
            </p>
          </div>

          <select
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground"
          >
            {PFADE.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>

          <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
            {ZEITRAEUME.map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`rounded px-2.5 py-1.5 text-xs font-medium transition ${
                  days === d ? 'bg-sky-500 text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {d} T
              </button>
            ))}
          </div>

          <button
            onClick={laden}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Aktualisieren
          </button>
          <a
            href="/tracking"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            Kampagnen
          </a>
          <a
            href="/sales-dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            Leads
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        {!dbConfigured && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="font-medium text-amber-300">Datenbank nicht verbunden</p>
              <p className="mt-1 text-amber-200/80">
                Ohne <code>POSTGRES_URL</code> werden keine Besucherdaten gespeichert.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            {error}
          </div>
        )}

        {/* Kennzahlen */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-6">
          <Kpi icon={Users} label="Sitzungen" value={String(kpi.n)} tone="sky" />
          <Kpi icon={Send} label="Abgesendet" value={String(kpi.abgesendet)} sub={`${kpi.quote} %`} tone="emerald" />
          <Kpi icon={MousePointerClick} label="Mit Interaktion" value={String(kpi.mitInteraktion)} tone="violet" />
          <Kpi icon={Clock} label="Verweildauer" value={dauer(kpi.median)} sub="Median" tone="amber" />
          <Kpi icon={ArrowUpRight} label="Sofort weg" value={`${kpi.sofortPct} %`} sub="< 10 s, kein Klick" tone={kpi.sofortPct > 50 ? 'warn' : 'slate'} />
          <Kpi icon={Smartphone} label="Mobil" value={`${kpi.mobilPct} %`} tone="teal" />
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          {/* Funnel */}
          <Karte titel="Wie weit kommen die Besucher?">
            <div className="flex flex-col gap-2.5">
              {trichter.map((t) => (
                <div key={t.label}>
                  <div className="mb-1 flex items-baseline justify-between text-xs">
                    <span className="text-foreground">{t.label}</span>
                    <span className="font-mono text-muted-foreground">{t.erreicht} · {t.pct} %</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Karte>

          {/* Herkunft */}
          <Karte titel="Woher kommen sie?">
            {herkunft.length === 0 ? <Leer /> : (
              <div className="flex flex-col gap-1.5">
                {herkunft.map(([name, n]) => (
                  <div key={name} className="flex items-center justify-between gap-2 text-xs">
                    <span className="truncate text-foreground">{name}</span>
                    <span className="font-mono text-muted-foreground">{n}</span>
                  </div>
                ))}
              </div>
            )}
          </Karte>

          {/* Klicks */}
          <Karte titel="Worauf wird geklickt?">
            {klicks.length === 0 ? <Leer /> : (
              <div className="flex flex-col gap-1.5">
                {klicks.map(([label, n]) => (
                  <div key={label} className="flex items-center justify-between gap-2 text-xs">
                    <span className="truncate text-foreground">{label}</span>
                    <span className="font-mono text-muted-foreground">{n}</span>
                  </div>
                ))}
              </div>
            )}
          </Karte>
        </div>

        {/* Sitzungstabelle */}
        <div className="mb-3 flex items-center gap-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Einzelne Sitzungen</h2>
          <button
            onClick={() => setNurAbsender((v) => !v)}
            className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
              nurAbsender ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            nur Absender
          </button>
        </div>

        {loading && sessions.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-border bg-card">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : gefiltert.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Noch keine Sitzungen im gewählten Zeitraum.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Die Erfassung startet mit dem ersten Besuch nach dem Deploy.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[56rem] text-sm">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-3 py-2.5 text-left font-semibold">Zeit</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Herkunft</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Gerät</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Dauer</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Scroll</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Schritt</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Klicks</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Felder</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Ergebnis</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {gefiltert.map((s) => (
                  <tr
                    key={s.session_id}
                    onClick={() => setOffen(s)}
                    className="cursor-pointer border-b border-border/60 transition hover:bg-muted/40"
                  >
                    <td className="whitespace-nowrap px-3 py-2.5 text-xs">{zeit(s.started_at)}</td>
                    <td className="px-3 py-2.5">
                      <span className="block max-w-[11rem] truncate text-xs text-foreground">
                        {s.source_label || 'Direkt'}
                      </span>
                      {s.utm_campaign && (
                        <span className="block max-w-[11rem] truncate text-[10px] text-muted-foreground">
                          {s.utm_campaign}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <GeraeteIcon device={s.device} />
                        {s.device || '—'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs tabular-nums">
                      {dauer(s.seconds)}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-sky-500" style={{ width: `${s.scroll_pct}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground">{s.scroll_pct}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-xs tabular-nums">
                      {s.max_step || '—'}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-xs tabular-nums">{s.clicks}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs text-muted-foreground">
                        {s.fields.length ? s.fields.join(', ') : '—'}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      {s.submitted ? (
                        <span className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                          {s.lead ? (s.lead.company || s.lead.email || 'Lead') : 'abgesendet'}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">abgebrochen</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
          Erfasst werden Herkunft, Gerät, Verweildauer, Scrolltiefe, Klickziele und welche
          Formularfelder angefasst wurden — <strong>nicht</strong> deren Inhalte. Wer tippt und
          nicht absendet, hat in keine Verarbeitung eingewilligt. Die vollständigen Eingaben
          stehen weiterhin in der Abbruch-Mail.
        </p>
      </main>

      {offen && (
        <SessionDrawer session={offen} timeline={timeline} onClose={() => setOffen(null)} />
      )}
    </div>
  );
}

// ── Hilfskomponenten ─────────────────────────────────────────────────────

function Leer() {
  return <p className="text-xs text-muted-foreground">Keine Daten</p>;
}

function Karte({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {titel}
      </h3>
      {children}
    </div>
  );
}

const TONES: Record<string, string> = {
  sky: 'text-sky-400 bg-sky-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
  violet: 'text-violet-400 bg-violet-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
  teal: 'text-teal-400 bg-teal-500/10',
  slate: 'text-slate-400 bg-slate-500/10',
  warn: 'text-amber-400 bg-amber-500/20 ring-1 ring-amber-500/40',
};

function Kpi({
  icon: Icon, label, value, sub, tone,
}: {
  icon: React.ElementType; label: string; value: string; sub?: string; tone: string;
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

const EVENT_LABEL: Record<string, string> = {
  page_view: 'Seite aufgerufen',
  scroll_depth: 'gescrollt',
  element_click: 'geklickt',
  field_focus: 'Feld ausgefüllt',
  step_view: 'Schritt erreicht',
  form_error: 'Formularfehler',
  lead_submitted: 'abgesendet',
  page_exit: 'Seite verlassen',
  cta_click: 'CTA geklickt',
  call_click: 'Telefon geklickt',
};

function SessionDrawer({
  session, timeline, onClose,
}: {
  session: Session; timeline: TimelineEvent[] | null; onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-card">
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-border bg-card p-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">Sitzungsverlauf</h2>
            <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
              {session.session_id.slice(0, 18)}… · {zeit(session.started_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
          <Feld label="Herkunft" wert={session.source_label || 'Direkt'} />
          <Feld label="Kampagne" wert={session.utm_campaign || '—'} />
          <Feld label="Gerät" wert={`${session.device || '—'} · ${session.viewport || ''}`} />
          <Feld label="Verweildauer" wert={dauer(session.seconds)} />
          <Feld label="Scrolltiefe" wert={`${session.scroll_pct} %`} />
          <Feld label="Weitester Schritt" wert={session.max_step ? String(session.max_step) : '—'} />
        </div>

        {session.referrer && (
          <div className="px-5 pb-3">
            <Feld label="Verweisende Seite" wert={session.referrer} />
          </div>
        )}

        {session.lead && (
          <div className="mx-5 mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              Daraus entstandener Lead
            </div>
            <div className="text-sm text-foreground">
              {session.lead.company || session.lead.email || `Lead #${session.lead.id}`}
            </div>
            <a
              href="/sales-dashboard"
              className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-300 underline underline-offset-2"
            >
              im Sales-Dashboard öffnen <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        )}

        <div className="border-t border-border p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Verlauf
          </h3>
          {timeline === null ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> lädt…
            </div>
          ) : timeline.length === 0 ? (
            <Leer />
          ) : (
            <ol className="flex flex-col gap-0">
              {timeline.map((e, i) => {
                const m = e.meta || {};
                const detail = [
                  m.label, m.field, m.pct !== undefined ? `${m.pct} %` : null,
                  m.step !== undefined ? `Schritt ${m.step}` : null,
                  m.seconds !== undefined ? `${m.seconds} s` : null,
                  Array.isArray(m.fields) ? (m.fields as string[]).join(', ') : null,
                ].filter(Boolean).join(' · ');
                return (
                  <li key={i} className="flex gap-3 border-b border-border/50 py-2 last:border-0">
                    <span className="w-12 shrink-0 font-mono text-[10px] text-muted-foreground">
                      {new Date(e.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className="flex-1">
                      <span className="text-xs text-foreground">
                        {EVENT_LABEL[e.event] || e.event}
                      </span>
                      {detail && (
                        <span className="block text-[11px] text-muted-foreground">{detail}</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        <div className="mt-auto border-t border-border p-5">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            <Activity className="mr-1 inline h-3 w-3" />
            Eingabe-Inhalte werden bewusst nicht gespeichert — nur welches Feld angefasst wurde.
            Die vollständigen Angaben stehen in der Abbruch-Mail zu dieser Anfrage.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Feld({ label, wert }: { label: string; wert: string }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 break-words text-sm text-foreground">{wert}</div>
    </div>
  );
}
