// Shared client-side types & display metadata for the sales dashboard.

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

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
  notes: string | null;
  tag: string | null;
  source_page: string | null;
  payload: Record<string, unknown> | null;
};

export const STATUS_ORDER: LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'won',
  'lost',
];

export const STATUS_META: Record<
  LeadStatus,
  { label: string; dot: string; badge: string; ring: string }
> = {
  new: {
    label: 'Neu',
    dot: 'bg-sky-500',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    ring: 'ring-sky-500/40',
  },
  contacted: {
    label: 'Kontaktiert',
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    ring: 'ring-amber-500/40',
  },
  qualified: {
    label: 'Qualifiziert',
    dot: 'bg-violet-500',
    badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    ring: 'ring-violet-500/40',
  },
  won: {
    label: 'Gewonnen',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    ring: 'ring-emerald-500/40',
  },
  lost: {
    label: 'Verloren',
    dot: 'bg-rose-500',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    ring: 'ring-rose-500/40',
  },
};

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
