'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Archive, ArchiveRestore, BarChart3, Check, ChevronRight, Copy, Database,
  ExternalLink, Link2, Loader2, LogOut, MousePointerClick, Plus, RefreshCw,
  Target, Trash2, TrendingUp, Users, X, Zap,
} from 'lucide-react';
import {
  CHANNELS, CHECK_LABELS, FIELD_LABELS, GATE_MODES, TARGETS,
  channelMeta, eventLabel, fmtDate, fmtDateTime, fmtPercent, gateModeMeta,
  type FunnelData, type TrackingLinkRow,
} from './types';

type Range = 7 | 30 | 90 | 0;
type View = 'links' | 'compare';

const RANGES: { value: Range; label: string }[] = [
  { value: 7, label: '7 Tage' },
  { value: 30, label: '30 Tage' },
  { value: 90, label: '90 Tage' },
  { value: 0, label: 'Alle' },
];

function origin(): string {
  return typeof window !== 'undefined' ? window.location.origin : 'https://sodusecure.com';
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function TrackingDashboard({ dbConfigured }: { dbConfigured: boolean }) {
  const router = useRouter();
  const [links, setLinks] = useState<TrackingLinkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [days, setDays] = useState<Range>(30);
  const [view, setView] = useState<View>('links');
  const [groupBy, setGroupBy] = useState<'channel' | 'campaign'>('channel');
  const [showArchived, setShowArchived] = useState(false);
  const [selected, setSelected] = useState<TrackingLinkRow | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/tracking/links?days=${days}`, { cache: 'no-store' });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Laden');
      setLinks(Array.isArray(data.links) ? data.links : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }, [days, router]);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    await fetch('/api/tracking/auth', { method: 'DELETE' });
    router.refresh();
  }

  const visible = useMemo(
    () => links.filter((l) => (showArchived ? true : !l.archived)),
    [links, showArchived],
  );

  const totals = useMemo(() => {
    const t = { clicks: 0, visitors: 0, checkStarts: 0, leads: 0 };
    for (const l of visible) {
      t.clicks += l.stats.clicks;
      t.visitors += l.stats.visitors;
      t.checkStarts += l.stats.checkStarts;
      t.leads += l.stats.leads;
    }
    return t;
  }, [visible]);

  const campaigns = useMemo(() => {
    const set = new Set<string>();
    links.forEach((l) => l.campaign && set.add(l.campaign));
    return [...set];
  }, [links]);

  async function copyLink(slug: string) {
    const ok = await copyText(`${origin()}/t/${slug}`);
    if (ok) {
      setCopiedSlug(slug);
      window.setTimeout(() => setCopiedSlug((s) => (s === slug ? null : s)), 1600);
    }
  }

  async function toggleArchive(link: TrackingLinkRow) {
    const res = await fetch(`/api/tracking/links/${link.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ archived: !link.archived }),
    });
    if (res.ok) {
      setLinks((prev) => prev.map((l) => (l.id === link.id ? { ...l, archived: !l.archived } : l)));
    }
  }

  async function removeLink(link: TrackingLinkRow) {
    if (!window.confirm(`Link „${link.name}“ inklusive aller erfassten Events endgültig löschen?`)) return;
    const res = await fetch(`/api/tracking/links/${link.id}`, { method: 'DELETE' });
    if (res.ok) {
      setLinks((prev) => prev.filter((l) => l.id !== link.id));
      setSelected((prev) => (prev?.id === link.id ? null : prev));
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-900/30">
            <Link2 className="h-5 w-5" />
          </div>
          <div className="mr-auto">
            <h1 className="text-sm font-semibold leading-tight sm:text-base">Tracking Dashboard</h1>
            <p className="text-[11px] text-muted-foreground">
              {loading ? 'lädt…' : `${visible.length} Tracking-Links`}
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
            href="/sales-dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sales</span>
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
          {([
            { key: 'links' as View, label: 'Links & Kampagnen', icon: Link2 },
            { key: 'compare' as View, label: 'Vergleich', icon: BarChart3 },
          ]).map((t) => {
            const Icon = t.icon;
            const active = view === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setView(t.key)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition ${
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                {active && (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-violet-500" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        {!dbConfigured && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="font-medium text-amber-300">Datenbank noch nicht verbunden</p>
              <p className="mt-1 text-amber-200/80">
                Lege in Vercel unter <strong>Storage → Create Database → Postgres</strong> eine
                Datenbank an und verbinde sie mit diesem Projekt. Danach werden Links und alle
                Klick-/Funnel-Daten hier gespeichert.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            {error}
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCreate((s) => !s)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
          >
            {showCreate ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showCreate ? 'Schließen' : 'Neuer Tracking-Link'}
          </button>

          <div className="ml-auto flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
                className="h-3.5 w-3.5 accent-violet-500"
              />
              Archivierte zeigen
            </label>
            <div className="flex items-center rounded-xl border border-border bg-card p-0.5">
              {RANGES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setDays(r.value)}
                  className={`rounded-lg px-2.5 py-2 text-xs font-medium transition ${
                    days === r.value
                      ? 'bg-violet-500 text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Create panel */}
        {showCreate && (
          <CreateLinkPanel
            campaigns={campaigns}
            onCreated={() => load()}
            onCopy={copyLink}
          />
        )}

        {/* KPI cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Kpi icon={MousePointerClick} label="Klicks" value={String(totals.clicks)} tone="violet" />
          <Kpi icon={Users} label="Besucher auf Seite" value={String(totals.visitors)} tone="sky" />
          <Kpi icon={Zap} label="Check-Starts" value={String(totals.checkStarts)} tone="amber" />
          <Kpi icon={Target} label="Leads" value={String(totals.leads)} tone="emerald" />
          <Kpi
            icon={TrendingUp}
            label="Klick → Lead"
            value={totals.clicks ? `${Math.round((totals.leads / totals.clicks) * 100)} %` : '–'}
            tone="rose"
          />
        </div>

        {loading && links.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-border bg-card">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : view === 'links' ? (
          <LinksTable
            links={visible}
            copiedSlug={copiedSlug}
            onCopy={copyLink}
            onSelect={setSelected}
            onArchive={toggleArchive}
            onDelete={removeLink}
          />
        ) : (
          <CompareView links={visible} groupBy={groupBy} onGroupBy={setGroupBy} />
        )}

        <p className="mt-8 text-center text-[11px] text-muted-foreground/60">
          Erfasst werden ausschließlich anonyme Besucher-IDs und Ereignisse von Besuchern, die über
          einen Tracking-Link kamen – keine Formularinhalte, keine Klardaten.
        </p>
      </main>

      {selected && (
        <LinkDetailDrawer
          link={selected}
          days={days}
          copiedSlug={copiedSlug}
          onCopy={copyLink}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

/* ── KPI card ─────────────────────────────────────────────────────────── */

const TONES: Record<string, string> = {
  rose: 'text-rose-400 bg-rose-500/10',
  sky: 'text-sky-400 bg-sky-500/10',
  violet: 'text-violet-400 bg-violet-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
};

function Kpi({
  icon: Icon, label, value, tone,
}: {
  icon: React.ElementType; label: string; value: string; tone: string;
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
    </div>
  );
}

/* ── Create panel ─────────────────────────────────────────────────────── */

function CreateLinkPanel({
  campaigns, onCreated, onCopy,
}: {
  campaigns: string[];
  onCreated: () => void;
  onCopy: (slug: string) => void;
}) {
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('linkedin');
  const [campaign, setCampaign] = useState('');
  const [target, setTarget] = useState(TARGETS[0].path);
  const [customTarget, setCustomTarget] = useState('');
  const [slug, setSlug] = useState('');
  const [notes, setNotes] = useState('');
  const [gateMode, setGateMode] = useState<'full' | 'partial'>('full');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [created, setCreated] = useState<{ slug: string; url: string } | null>(null);

  const isCustom = target === '__custom__';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setErr('');
    setCreated(null);
    const finalTarget = isCustom ? customTarget.trim() : target;
    if (!name.trim()) { setErr('Bitte einen Namen angeben (z. B. „LinkedIn Post 07.07.“)'); return; }
    if (!finalTarget.startsWith('/')) { setErr('Das Ziel muss ein interner Pfad sein und mit / beginnen'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/tracking/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          channel,
          campaign: campaign.trim() || null,
          target: finalTarget,
          slug: slug.trim() || undefined,
          notes: notes.trim() || undefined,
          gateMode,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Anlegen fehlgeschlagen');
      const newSlug: string = data.link.slug;
      setCreated({ slug: newSlug, url: `${origin()}/t/${newSlug}` });
      setName('');
      setSlug('');
      setNotes('');
      onCreated();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : 'Anlegen fehlgeschlagen');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="mb-6 space-y-4 rounded-2xl border border-violet-500/30 bg-card p-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Name des Links *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z. B. LinkedIn Post 07.07. – Pentest-Pflicht"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-violet-500/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Kampagne (optional – gruppiert Links im Vergleich)
          </label>
          <input
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            list="tracking-campaigns"
            placeholder="z. B. NIS2-Offensive Juli"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-violet-500/60"
          />
          <datalist id="tracking-campaigns">
            {campaigns.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Kanal-Tag
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CHANNELS.map((c) => {
            const on = channel === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannel(c.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                  on ? 'border-transparent text-white' : 'border-border text-muted-foreground hover:bg-muted'
                }`}
                style={on ? { background: c.color } : undefined}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: on ? '#fff' : c.color }} />
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Zielseite
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-violet-500/60"
            >
              {TARGETS.map((t) => (
                <option key={t.path} value={t.path}>{t.label} · {t.path}</option>
              ))}
              <option value="__custom__">Eigener Pfad…</option>
            </select>
            {isCustom && (
              <input
                value={customTarget}
                onChange={(e) => setCustomTarget(e.target.value)}
                placeholder="/mein-pfad"
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-violet-500/60"
              />
            )}
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Wunsch-Slug (optional)
          </label>
          <div className="flex items-center gap-1.5">
            <span className="shrink-0 text-xs text-muted-foreground">/t/</span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              placeholder="automatisch"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-violet-500/60"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Ergebnis-Sperre (Gate-Modus)
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {GATE_MODES.map((m) => {
            const on = gateMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setGateMode(m.id)}
                className={`rounded-xl border p-3 text-left transition ${
                  on
                    ? 'border-violet-500/70 bg-violet-500/10'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <span className={`text-sm font-semibold ${on ? 'text-violet-300' : 'text-foreground'}`}>
                  {m.label}
                  {m.id === 'full' && <span className="ml-1.5 text-[11px] font-normal text-muted-foreground">(Standard)</span>}
                </span>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{m.hint}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Notiz (optional)
        </label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="z. B. Video-Titel, Zielgruppe, Post-Text…"
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-violet-500/60"
        />
      </div>

      {err && <p className="text-sm text-rose-400">{err}</p>}

      {created && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5">
          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
          <code className="text-sm font-semibold text-emerald-300">{created.url}</code>
          <button
            type="button"
            onClick={() => onCopy(created.slug)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 px-2.5 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/10"
          >
            <Copy className="h-3.5 w-3.5" /> Kopieren
          </button>
          <span className="text-xs text-emerald-200/70">
            Diesen Link im Post/Video/Anzeigentext verwenden – alles Weitere läuft automatisch.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Link erstellen
      </button>
    </form>
  );
}

/* ── Links table ──────────────────────────────────────────────────────── */

function LinksTable({
  links, copiedSlug, onCopy, onSelect, onArchive, onDelete,
}: {
  links: TrackingLinkRow[];
  copiedSlug: string | null;
  onCopy: (slug: string) => void;
  onSelect: (l: TrackingLinkRow) => void;
  onArchive: (l: TrackingLinkRow) => void;
  onDelete: (l: TrackingLinkRow) => void;
}) {
  if (links.length === 0) {
    return (
      <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card text-center">
        <Link2 className="h-7 w-7 text-muted-foreground/60" />
        <p className="text-sm font-medium text-muted-foreground">Noch keine Tracking-Links</p>
        <p className="max-w-sm text-xs text-muted-foreground/70">
          Erstelle oben deinen ersten Link – z. B. für einen LinkedIn-Post – und verwende
          ihn statt der normalen URL. Jeder Klick und der komplette Funnel landen hier.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[980px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-3 font-medium">Link</th>
            <th className="px-3 py-3 font-medium">Kanal</th>
            <th className="px-3 py-3 font-medium">Kampagne</th>
            <th className="px-3 py-3 text-right font-medium">Klicks</th>
            <th className="px-3 py-3 text-right font-medium">Besucher</th>
            <th className="px-3 py-3 text-right font-medium">Starts</th>
            <th className="px-3 py-3 text-right font-medium">Fertig</th>
            <th className="px-3 py-3 text-right font-medium">Leads</th>
            <th className="px-3 py-3 text-right font-medium">CR</th>
            <th className="px-3 py-3 text-right font-medium">Erstellt</th>
            <th className="px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {links.map((l) => {
            const ch = channelMeta(l.channel);
            const cr = l.stats.clicks ? Math.round((l.stats.leads / l.stats.clicks) * 100) : null;
            return (
              <tr
                key={l.id}
                className={`border-b border-border/60 transition last:border-0 hover:bg-muted/40 ${l.archived ? 'opacity-50' : ''}`}
              >
                <td className="px-4 py-3">
                  <button onClick={() => onSelect(l)} className="group flex flex-col items-start text-left">
                    <span className="font-medium text-foreground group-hover:text-violet-300">{l.name}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <code>/t/{l.slug}</code>
                      <ChevronRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                      <span className="text-muted-foreground/60">{l.target}</span>
                      {l.gate_mode === 'partial' && (
                        <span className="rounded border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-300">
                          Teil-Sperre
                        </span>
                      )}
                    </span>
                  </button>
                </td>
                <td className="px-3 py-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-white"
                    style={{ background: ch.color }}
                  >
                    {ch.label}
                  </span>
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground">{l.campaign || '–'}</td>
                <td className="px-3 py-3 text-right font-semibold">{l.stats.clicks}</td>
                <td className="px-3 py-3 text-right">{l.stats.visitors}</td>
                <td className="px-3 py-3 text-right">{l.stats.checkStarts}</td>
                <td className="px-3 py-3 text-right">{l.stats.checkCompleted}</td>
                <td className="px-3 py-3 text-right font-semibold text-emerald-400">{l.stats.leads}</td>
                <td className="px-3 py-3 text-right text-xs text-muted-foreground">
                  {cr === null ? '–' : `${cr} %`}
                </td>
                <td className="px-3 py-3 text-right text-xs text-muted-foreground">{fmtDate(l.created_at)}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onCopy(l.slug)}
                      title="Link kopieren"
                      className="rounded-lg border border-border p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      {copiedSlug === l.slug ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => onSelect(l)}
                      title="Funnel & Details"
                      className="rounded-lg border border-border p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <BarChart3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onArchive(l)}
                      title={l.archived ? 'Wiederherstellen' : 'Archivieren'}
                      className="rounded-lg border border-border p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      {l.archived ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => onDelete(l)}
                      title="Löschen"
                      className="rounded-lg border border-border p-1.5 text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Compare view (Kanal / Kampagne) ─────────────────────────────────── */

function CompareView({
  links, groupBy, onGroupBy,
}: {
  links: TrackingLinkRow[];
  groupBy: 'channel' | 'campaign';
  onGroupBy: (g: 'channel' | 'campaign') => void;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, { label: string; color: string; linkCount: number; clicks: number; visitors: number; starts: number; completed: number; leads: number }>();
    for (const l of links) {
      const key = groupBy === 'channel' ? l.channel : (l.campaign || '__none__');
      const label = groupBy === 'channel'
        ? channelMeta(l.channel).label
        : (l.campaign || 'Ohne Kampagne');
      const color = groupBy === 'channel' ? channelMeta(l.channel).color : '#8B5CF6';
      const g = map.get(key) ?? { label, color, linkCount: 0, clicks: 0, visitors: 0, starts: 0, completed: 0, leads: 0 };
      g.linkCount += 1;
      g.clicks += l.stats.clicks;
      g.visitors += l.stats.visitors;
      g.starts += l.stats.checkStarts;
      g.completed += l.stats.checkCompleted;
      g.leads += l.stats.leads;
      map.set(key, g);
    }
    return [...map.values()].sort((a, b) => b.leads - a.leads || b.clicks - a.clicks);
  }, [links, groupBy]);

  const maxLeads = Math.max(1, ...groups.map((g) => g.leads));

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-foreground">Was funktioniert am besten?</h3>
        <div className="flex items-center rounded-xl border border-border bg-background p-0.5">
          {([
            { key: 'channel' as const, label: 'Nach Kanal' },
            { key: 'campaign' as const, label: 'Nach Kampagne' },
          ]).map((g) => (
            <button
              key={g.key}
              onClick={() => onGroupBy(g.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                groupBy === g.key ? 'bg-violet-500 text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Noch keine Daten.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2.5 pr-3 font-medium">{groupBy === 'channel' ? 'Kanal' : 'Kampagne'}</th>
                <th className="px-3 py-2.5 text-right font-medium">Links</th>
                <th className="px-3 py-2.5 text-right font-medium">Klicks</th>
                <th className="px-3 py-2.5 text-right font-medium">Besucher</th>
                <th className="px-3 py-2.5 text-right font-medium">Starts</th>
                <th className="px-3 py-2.5 text-right font-medium">Fertig</th>
                <th className="px-3 py-2.5 text-right font-medium">Leads</th>
                <th className="px-3 py-2.5 text-right font-medium">Klick → Lead</th>
                <th className="w-[22%] px-3 py-2.5 font-medium">Leads (relativ)</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.label} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-3">
                    <span className="inline-flex items-center gap-2 font-medium text-foreground">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
                      {g.label}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-muted-foreground">{g.linkCount}</td>
                  <td className="px-3 py-3 text-right font-semibold">{g.clicks}</td>
                  <td className="px-3 py-3 text-right">{g.visitors}</td>
                  <td className="px-3 py-3 text-right">{g.starts}</td>
                  <td className="px-3 py-3 text-right">{g.completed}</td>
                  <td className="px-3 py-3 text-right font-semibold text-emerald-400">{g.leads}</td>
                  <td className="px-3 py-3 text-right text-xs text-muted-foreground">
                    {g.clicks ? `${Math.round((g.leads / g.clicks) * 100)} %` : '–'}
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(g.leads / maxLeads) * 100}%`, background: g.color }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── Detail drawer: Funnel eines Links ────────────────────────────────── */

function LinkDetailDrawer({
  link, days, copiedSlug, onCopy, onClose,
}: {
  link: TrackingLinkRow;
  days: Range;
  copiedSlug: string | null;
  onCopy: (slug: string) => void;
  onClose: () => void;
}) {
  const [funnel, setFunnel] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    fetch(`/api/tracking/stats?slug=${encodeURIComponent(link.slug)}&days=${days}`, { cache: 'no-store' })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Fehler beim Laden');
        if (!cancelled) setFunnel(data.funnel);
      })
      .catch((e) => { if (!cancelled) setError(e instanceof Error ? e.message : 'Fehler'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [link.slug, days]);

  const ch = channelMeta(link.channel);
  const ev = useCallback(
    (name: string) => funnel?.events.find((e) => e.event === name),
    [funnel],
  );

  const clicks = ev('click')?.count ?? link.stats.clicks;
  const steps = useMemo(() => ([
    { label: 'Link geklickt', value: clicks },
    { label: 'Seite geöffnet', value: ev('page_view')?.visitors ?? 0 },
    { label: 'Check gestartet', value: ev('check_start')?.visitors ?? 0 },
    { label: 'Check abgeschlossen', value: ev('check_completed')?.visitors ?? 0 },
    { label: 'Ergebnis-Sperre gesehen', value: ev('gate_view')?.visitors ?? 0 },
    { label: 'Formular begonnen', value: ev('form_field_filled')?.visitors ?? 0 },
    { label: 'Lead abgesendet', value: ev('lead_submitted')?.visitors ?? 0 },
    { label: 'Ergebnis freigeschaltet', value: ev('result_unlocked')?.visitors ?? 0 },
    { label: 'Calendly gesehen', value: ev('calendly_view')?.visitors ?? 0 },
  ]), [clicks, ev]);
  const maxStep = Math.max(1, ...steps.map((s) => s.value));

  const fieldOf = (f: string) => funnel?.fields.find((x) => x.field === f)?.visitors ?? 0;
  const emailNoPhone = Math.max(0, fieldOf('email') - fieldOf('phone'));
  const gateNoForm = Math.max(0, (ev('gate_view')?.visitors ?? 0) - (ev('form_field_filled')?.visitors ?? 0));

  const questionGroups = useMemo(() => {
    const map = new Map<string, { step: number; visitors: number }[]>();
    for (const q of funnel?.questions ?? []) {
      const arr = map.get(q.check) ?? [];
      arr.push({ step: q.step, visitors: q.visitors });
      map.set(q.check, arr);
    }
    return [...map.entries()].map(([check, rows]) => ({
      check,
      rows: rows.sort((a, b) => a.step - b.step),
    }));
  }, [funnel]);

  const maxDay = Math.max(1, ...(funnel?.days ?? []).map((d) => Math.max(d.clicks, d.leads)));

  function metaSummary(e: FunnelData['recent'][number]): string {
    const m = e.meta ?? {};
    const check = typeof m.check === 'string' ? (CHECK_LABELS[m.check] ?? m.check) : null;
    switch (e.event) {
      case 'question_answered':
        return `${check ?? ''} · Frage ${m.step ?? '?'}/${m.total ?? '?'} (${m.q ?? ''})`;
      case 'form_field_filled':
        return `${FIELD_LABELS[String(m.field)] ?? m.field}${check ? ` · ${check}` : ''}`;
      case 'check_start':
      case 'check_completed':
      case 'check_restart':
      case 'question_back':
      case 'gate_view':
      case 'result_unlocked':
      case 'lead_submitted':
      case 'check_tab_select': {
        const extra = m.score !== undefined ? ` · Score ${m.score}` : m.verdict ? ` · ${String(m.verdict).toUpperCase()}` : '';
        return `${check ?? ''}${extra}`;
      }
      case 'cta_click':
        return String(m.cta ?? '');
      case 'call_click':
        return String(m.pos ?? '');
      case 'form_error':
        return `Fehlende Felder: ${m.fields ?? ''}`;
      case 'click': {
        const parts = [m.country, m.referer ? String(m.referer).replace(/^https?:\/\//, '').split('/')[0] : null].filter(Boolean);
        return parts.join(' · ');
      }
      case 'page_view':
        return e.path ?? '';
      default:
        return '';
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-border bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border p-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-white"
                style={{ background: ch.color }}
              >
                {ch.label}
              </span>
              {link.campaign && (
                <span className="rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground">
                  {link.campaign}
                </span>
              )}
              <span
                className={`rounded-lg border px-2 py-1 text-xs ${
                  link.gate_mode === 'partial'
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                    : 'border-border text-muted-foreground'
                }`}
                title={gateModeMeta(link.gate_mode).hint}
              >
                Gate: {gateModeMeta(link.gate_mode).label}
              </span>
              {link.archived && (
                <span className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-xs text-amber-300">
                  Archiviert
                </span>
              )}
            </div>
            <h2 className="mt-2 truncate text-lg font-semibold text-foreground">{link.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5">{origin()}/t/{link.slug}</code>
              <button
                onClick={() => onCopy(link.slug)}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 transition hover:bg-muted hover:text-foreground"
              >
                {copiedSlug === link.slug ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                Kopieren
              </button>
              <a
                href={link.target}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 transition hover:bg-muted hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" /> Ziel: {link.target}
              </a>
              <span>seit {fmtDate(link.created_at)}</span>
            </div>
            {link.notes && <p className="mt-2 text-xs text-muted-foreground/80">{link.notes}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto p-5">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</div>
          ) : (
            <>
              {/* Funnel */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                  Funnel {days === 0 ? '(gesamt)' : `(letzte ${days} Tage)`}
                </h3>
                <div className="space-y-2">
                  {steps.map((s, i) => {
                    const prev = i === 0 ? null : steps[i - 1].value;
                    const drop = prev && prev > 0 ? Math.round(((prev - s.value) / prev) * 100) : null;
                    return (
                      <div key={s.label} className="rounded-xl border border-border bg-card px-3.5 py-2.5">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="font-medium text-foreground">{s.label}</span>
                          <span className="flex items-baseline gap-2">
                            {drop !== null && drop > 0 && s.value < (prev ?? 0) && (
                              <span className="text-[11px] text-rose-400/80">−{drop} %</span>
                            )}
                            <span className="font-semibold text-foreground">{s.value}</span>
                            <span className="w-12 text-right text-[11px] text-muted-foreground">
                              {fmtPercent(s.value, clicks)}
                            </span>
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            style={{ width: `${(s.value / maxStep) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Formularfelder */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Lead-Formular im Detail</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(['company', 'email', 'phone'] as const).map((f) => (
                    <div key={f} className="rounded-xl border border-border bg-card p-3 text-center">
                      <div className="text-lg font-semibold text-foreground">{fieldOf(f)}</div>
                      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {FIELD_LABELS[f]} ausgefüllt
                      </div>
                    </div>
                  ))}
                </div>
                {(emailNoPhone > 0 || gateNoForm > 0) && (
                  <div className="mt-2 space-y-1.5">
                    {emailNoPhone > 0 && (
                      <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                        ⚠ {emailNoPhone} Besucher {emailNoPhone === 1 ? 'hat' : 'haben'} die E-Mail eingegeben,
                        aber keine Telefonnummer – hier bricht der Funnel ab.
                      </p>
                    )}
                    {gateNoForm > 0 && (
                      <p className="rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                        {gateNoForm} Besucher {gateNoForm === 1 ? 'hat' : 'haben'} die Ergebnis-Sperre gesehen,
                        aber kein Feld angefasst.
                      </p>
                    )}
                  </div>
                )}
              </section>

              {/* Fragen-Drop-off */}
              {questionGroups.length > 0 && (
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                    Fragen-Drop-off (eindeutige Besucher pro Frage)
                  </h3>
                  <div className="space-y-4">
                    {questionGroups.map((g) => {
                      const maxQ = Math.max(1, ...g.rows.map((r) => r.visitors));
                      return (
                        <div key={g.check} className="rounded-xl border border-border bg-card p-3.5">
                          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-300">
                            {CHECK_LABELS[g.check] ?? g.check}
                          </div>
                          <div className="space-y-1.5">
                            {g.rows.map((r) => (
                              <div key={r.step} className="flex items-center gap-2 text-xs">
                                <span className="w-14 shrink-0 text-muted-foreground">Frage {r.step}</span>
                                <div className="h-4 flex-1 overflow-hidden rounded bg-muted">
                                  <div
                                    className="h-full rounded bg-sky-500/80"
                                    style={{ width: `${(r.visitors / maxQ) * 100}%` }}
                                  />
                                </div>
                                <span className="w-8 shrink-0 text-right font-medium text-foreground">{r.visitors}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Verlauf pro Tag */}
              {(funnel?.days.length ?? 0) > 1 && (
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Verlauf (Klicks vs. Leads)</h3>
                  <div className="flex h-28 items-end gap-1 rounded-xl border border-border bg-card p-3">
                    {funnel!.days.map((d) => (
                      <div key={d.day} className="group relative flex flex-1 items-end justify-center gap-0.5" title={`${d.day}: ${d.clicks} Klicks · ${d.leads} Leads`}>
                        <div className="w-1/2 rounded-t bg-violet-500/70" style={{ height: `${(d.clicks / maxDay) * 100}%`, minHeight: d.clicks ? 3 : 0 }} />
                        <div className="w-1/2 rounded-t bg-emerald-500/80" style={{ height: `${(d.leads / maxDay) * 100}%`, minHeight: d.leads ? 3 : 0 }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-1.5 flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-violet-500/70" /> Klicks</span>
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-emerald-500/80" /> Leads</span>
                  </div>
                </section>
              )}

              {/* Letzte Ereignisse */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                  Letzte Ereignisse ({funnel?.recent.length ?? 0})
                </h3>
                {(funnel?.recent.length ?? 0) === 0 ? (
                  <p className="rounded-xl border border-border bg-card px-3 py-6 text-center text-sm text-muted-foreground">
                    Noch keine Ereignisse – teile den Link, um Daten zu sammeln.
                  </p>
                ) : (
                  <div className="max-h-80 overflow-y-auto rounded-xl border border-border">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0 bg-card">
                        <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                          <th className="px-3 py-2 font-medium">Zeit</th>
                          <th className="px-3 py-2 font-medium">Ereignis</th>
                          <th className="px-3 py-2 font-medium">Details</th>
                          <th className="px-3 py-2 font-medium">Besucher</th>
                        </tr>
                      </thead>
                      <tbody>
                        {funnel!.recent.map((e, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{fmtDateTime(e.created_at)}</td>
                            <td className="px-3 py-2">
                              <span className={`font-medium ${e.event === 'lead_submitted' ? 'text-emerald-400' : e.event === 'click' ? 'text-violet-300' : 'text-foreground'}`}>
                                {eventLabel(e.event)}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-muted-foreground">{metaSummary(e)}</td>
                            <td className="px-3 py-2 font-mono text-muted-foreground/70">{e.visitor_id.slice(0, 6)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
