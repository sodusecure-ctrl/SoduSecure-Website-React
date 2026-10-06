// Shared client-side types & display metadata for the sales dashboard.

/**
 * Die Vertriebs-Pipeline. Der Key ist der in Postgres gespeicherte Wert und
 * darf nachträglich NICHT umbenannt werden – bestehende Leads tragen ihn
 * bereits. Neue Stufen lassen sich jederzeit ergänzen (die Spalte ist TEXT ohne
 * CHECK-Constraint); allein STATUS_ORDER bestimmt die Reihenfolge im Board.
 *
 * probability ist die Abschlusswahrscheinlichkeit und speist den gewichteten
 * Forecast. group trennt laufende von abgeschlossenen Deals – nur 'open' zählt
 * in die offene Pipeline, und 'discarded' (Müll/Spam) fliegt aus allen Quoten
 * und Charts heraus, damit Spam-Einträge die Conversion-Rate nicht verwässern.
 */
export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'replied'
  | 'qualified'
  | 'scoping'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost'
  | 'trash';

export type StageGroup = 'open' | 'won' | 'lost' | 'discarded';

export type StageMeta = {
  /** Volle Bezeichnung – Filter, Drawer, Charts. */
  label: string;
  /** Kurzform für enge Kanban-Spaltenköpfe. */
  short: string;
  /** Was in dieser Stufe als Nächstes zu tun ist. */
  hint: string;
  group: StageGroup;
  /** Abschlusswahrscheinlichkeit 0–1 für den gewichteten Forecast. */
  probability: number;
  /** Nach so vielen Tagen ohne Bewegung gilt der Lead als liegengeblieben. */
  staleAfterDays: number;
  dot: string;
  badge: string;
  ring: string;
  /** Chartfarbe als Hex – Recharts kann keine Tailwind-Klassen. */
  chart: string;
};

export type Lead = {
  id: number;
  created_at: string;
  source: string;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  company_size: string | null;
  service: string | null;
  message: string | null;
  check_type: string | null;
  check_score: number | null;
  check_verdict: string | null;
  est_value: number | null;
  status: LeadStatus;
  /** Zeitpunkt des letzten Stufenwechsels (null bei Leads vor der Migration). */
  status_changed_at?: string | null;
  notes: string | null;
  tag: string | null;
  source_page: string | null;
  link_slug?: string | null;
  traffic_label?: string | null;
  payload: Record<string, unknown> | null;
};

export const STATUS_ORDER: LeadStatus[] = [
  'new',
  'contacted',
  'replied',
  'qualified',
  'scoping',
  'proposal',
  'negotiation',
  'won',
  'lost',
  'trash',
];

export const STATUS_META: Record<LeadStatus, StageMeta> = {
  new: {
    label: 'Neu',
    short: 'Neu',
    hint: 'Noch nicht angefasst – anrufen oder mailen.',
    group: 'open',
    probability: 0.1,
    staleAfterDays: 1,
    dot: 'bg-sky-500',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    ring: 'ring-sky-500/40',
    chart: '#0ea5e9',
  },
  contacted: {
    label: 'Kontaktiert',
    short: 'Kontaktiert',
    hint: 'Erstkontakt raus, wartet auf Reaktion.',
    group: 'open',
    probability: 0.2,
    staleAfterDays: 4,
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    ring: 'ring-amber-500/40',
    chart: '#f59e0b',
  },
  replied: {
    label: 'Geantwortet',
    short: 'Geantwortet',
    hint: 'Lead hat reagiert – Scoping-Termin vereinbaren.',
    group: 'open',
    probability: 0.3,
    staleAfterDays: 4,
    dot: 'bg-orange-500',
    badge: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    ring: 'ring-orange-500/40',
    chart: '#f97316',
  },
  qualified: {
    label: 'Qualifiziert',
    short: 'Qualifiziert',
    hint: 'Bedarf, Budget und Entscheider geklärt.',
    group: 'open',
    probability: 0.4,
    staleAfterDays: 7,
    dot: 'bg-violet-500',
    badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    ring: 'ring-violet-500/40',
    chart: '#8b5cf6',
  },
  scoping: {
    label: 'Scoping gemacht',
    short: 'Scoping',
    hint: 'Umfang steht – Aufwand schätzen, Angebot schreiben.',
    group: 'open',
    probability: 0.55,
    staleAfterDays: 5,
    dot: 'bg-indigo-500',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    ring: 'ring-indigo-500/40',
    chart: '#6366f1',
  },
  proposal: {
    label: 'Angebot raus',
    short: 'Angebot',
    hint: 'Angebot liegt beim Kunden – nachhaken.',
    group: 'open',
    probability: 0.7,
    staleAfterDays: 7,
    dot: 'bg-cyan-500',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    ring: 'ring-cyan-500/40',
    chart: '#06b6d4',
  },
  negotiation: {
    label: 'In Verhandlung',
    short: 'Verhandlung',
    hint: 'Preis, Termin oder Vertragsdetails offen.',
    group: 'open',
    probability: 0.85,
    staleAfterDays: 7,
    dot: 'bg-teal-500',
    badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    ring: 'ring-teal-500/40',
    chart: '#14b8a6',
  },
  won: {
    label: 'Unterschrieben',
    short: 'Gewonnen',
    hint: 'Auftrag gewonnen – Projekt einplanen.',
    group: 'won',
    probability: 1,
    staleAfterDays: 365,
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    ring: 'ring-emerald-500/40',
    chart: '#10b981',
  },
  lost: {
    label: 'Verloren',
    short: 'Verloren',
    hint: 'Echter Lead, nicht gewonnen – Grund in die Notizen.',
    group: 'lost',
    probability: 0,
    staleAfterDays: 365,
    dot: 'bg-rose-500',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    ring: 'ring-rose-500/40',
    chart: '#f43f5e',
  },
  trash: {
    label: 'Müll',
    short: 'Müll',
    hint: 'Spam, Bewerbung, Testeintrag – zählt in keine Quote.',
    group: 'discarded',
    probability: 0,
    staleAfterDays: 365,
    dot: 'bg-slate-500',
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    ring: 'ring-slate-500/40',
    chart: '#64748b',
  },
};

/** Laufende Deals – alles, was noch gewonnen werden kann. */
export const OPEN_STATUSES: LeadStatus[] = STATUS_ORDER.filter(
  (s) => STATUS_META[s].group === 'open',
);

/** Abgeschlossen: gewonnen, verloren oder verworfen. */
export const CLOSED_STATUSES: LeadStatus[] = STATUS_ORDER.filter(
  (s) => STATUS_META[s].group !== 'open',
);

/**
 * Status aus der DB absichern: unbekannte oder alte Werte landen auf 'new',
 * statt die UI über STATUS_META[undefined] zum Absturz zu bringen.
 */
export function normalizeStatus(raw: unknown): LeadStatus {
  return typeof raw === 'string' && raw in STATUS_META ? (raw as LeadStatus) : 'new';
}

export function stageMetaOf(lead: Lead): StageMeta {
  return STATUS_META[normalizeStatus(lead.status)];
}

export function stageIndex(status: LeadStatus): number {
  const i = STATUS_ORDER.indexOf(status);
  return i === -1 ? 0 : i;
}

/** Nächste bzw. vorherige Stufe für die Pfeil-Buttons auf der Karte. */
export function nextStage(status: LeadStatus): LeadStatus | null {
  return STATUS_ORDER[stageIndex(status) + 1] ?? null;
}

export function prevStage(status: LeadStatus): LeadStatus | null {
  const i = stageIndex(status);
  return i > 0 ? STATUS_ORDER[i - 1] : null;
}

/** Müll fliegt aus Quoten und Charts – sonst verzerrt Spam jede Kennzahl. */
export function countsTowardsStats(lead: Lead): boolean {
  return stageMetaOf(lead).group !== 'discarded';
}

/** Mit der Stufenwahrscheinlichkeit gewichteter Deal-Wert (Forecast). */
export function weightedValue(lead: Lead): number {
  const meta = stageMetaOf(lead);
  if (meta.group !== 'open') return 0;
  return (lead.est_value ?? 0) * meta.probability;
}

/**
 * Tage seit dem letzten Stufenwechsel. Ohne status_changed_at (Leads von vor
 * der Migration) zählt es ab dem Eingangsdatum.
 */
export function daysInStage(lead: Lead): number {
  const basis = lead.status_changed_at || lead.created_at;
  const ms = Date.now() - new Date(basis).getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

/** Liegengeblieben: zu lange in einer offenen Stufe ohne Bewegung. */
export function isStale(lead: Lead): boolean {
  const meta = stageMetaOf(lead);
  if (meta.group !== 'open') return false;
  return daysInStage(lead) > meta.staleAfterDays;
}

export const SOURCE_META: Record<string, { label: string; color: string }> = {
  contact: { label: 'Kontaktformular', color: '#38bdf8' },
  pentest: { label: 'Pentest-Konfigurator', color: '#f43f5e' },
  'quick-check': { label: 'Schnellcheck', color: '#a855f7' },
  tr03161: { label: 'BSI TR-03161', color: '#22c55e' },
  'get-started': { label: 'AuditAI-Plan', color: '#f59e0b' },
  checkout: { label: 'Stripe-Checkout', color: '#14b8a6' },
  other: { label: 'Sonstige', color: '#94a3b8' },
};

export function sourceLabel(source: string): string {
  return SOURCE_META[source]?.label ?? source;
}

/** Friendly name for a quick-check's raw parsed title (e.g. "RISIKO-CHECK"). */
export function checkTypeLabel(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const t = raw.toUpperCase();
  if (t.includes('RISIKO')) return 'Risiko-Check';
  if (t.includes('SCHNELL')) return 'Schnell-Check';
  if (t.includes('BRAUCHE') || t.includes('PENTEST')) return 'Pentest-Check';
  if (t.includes('GESETZ')) return 'Gesetzes-Check';
  // Fallback: Title-case the raw value.
  return raw
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\?$/, '');
}

/**
 * What to show as the "source" in lists. For quick-checks we surface the
 * specific test (Schnell-Check / Risiko-Check / …) instead of the generic
 * "Schnellcheck" label.
 */
export function displaySource(lead: Lead): string {
  if (lead.source === 'quick-check') {
    return checkTypeLabel(lead.check_type) ?? sourceLabel(lead.source);
  }
  return sourceLabel(lead.source);
}

const CHECK_COLORS: Record<string, string> = {
  'Risiko-Check': '#a855f7',
  'Schnell-Check': '#c084fc',
  'Pentest-Check': '#7c3aed',
  'Gesetzes-Check': '#d8b4fe',
};

/** Color matching displaySource() – quick-check subtypes get violet shades. */
export function displaySourceColor(lead: Lead): string {
  if (lead.source === 'quick-check') {
    const label = checkTypeLabel(lead.check_type);
    return (label && CHECK_COLORS[label]) || sourceColor('quick-check');
  }
  return sourceColor(lead.source);
}

export function sourceColor(source: string): string {
  return SOURCE_META[source]?.color ?? '#94a3b8';
}

/**
 * Traffic-Quelle des Leads (woher der Besucher kam): erst die neue Spalte,
 * dann das ältere payload.source-Feld, dann der Kampagnen-Link als Fallback.
 */
export function trafficLabelOf(lead: Lead): string {
  if (lead.traffic_label) return lead.traffic_label;
  const payloadSource = lead.payload?.source as { label?: unknown } | null | undefined;
  if (payloadSource && typeof payloadSource.label === 'string' && payloadSource.label) {
    return payloadSource.label;
  }
  if (lead.link_slug) return `Kampagnen-Link /t/${lead.link_slug}`;
  return 'Unbekannt';
}

const TRAFFIC_COLORS: [RegExp, string][] = [
  [/kampagnen-link/i, '#8b5cf6'],
  [/chatgpt|openai|ki-assistent/i, '#10a37f'],
  [/google ads/i, '#f4b400'],
  [/google/i, '#34a853'],
  [/linkedin/i, '#0a66c2'],
  [/bing|microsoft/i, '#00a4ef'],
  [/facebook|meta|instagram/i, '#e1306c'],
  [/e-mail|newsletter/i, '#10b981'],
  [/verweis/i, '#f97316'],
  [/direkt|unbekannt/i, '#64748b'],
];

export function trafficColor(label: string): string {
  for (const [re, color] of TRAFFIC_COLORS) {
    if (re.test(label)) return color;
  }
  return '#94a3b8';
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'gerade eben';
  if (mins < 60) return `vor ${mins} Min.`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `vor ${hours} Std.`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `vor ${days} Tg.`;
  const months = Math.floor(days / 30);
  if (months < 12) return `vor ${months} Mon.`;
  return `vor ${Math.floor(months / 12)} J.`;
}

export function initials(lead: Lead): string {
  const base = lead.company || lead.name || lead.email || '?';
  const parts = base.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '?';
}
