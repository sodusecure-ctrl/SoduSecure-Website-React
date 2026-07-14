// Gemeinsame Typen & Anzeige-Metadaten für das Tracking-Dashboard.

export type LinkStats = {
  clicks: number;
  visitors: number;
  checkStarts: number;
  checkCompleted: number;
  gateViews: number;
  leads: number;
  calls: number;
};

export type TrackingLinkRow = {
  id: number;
  created_at: string;
  slug: string;
  name: string;
  campaign: string | null;
  channel: string;
  target: string;
  notes: string | null;
  archived: boolean;
  gate_mode: string;
  stats: LinkStats;
};

/** Gate-Modus: wie stark das Check-Ergebnis für Besucher dieses Links gesperrt ist. */
export const GATE_MODES: { id: 'full' | 'partial'; label: string; short: string; hint: string }[] = [
  {
    id: 'full',
    label: 'Voll gesperrt',
    short: 'Voll',
    hint: 'Ergebnis komplett verdeckt – erst nach Eingabe von Firma, E-Mail und Telefon sichtbar (bisheriges Verhalten).',
  },
  {
    id: 'partial',
    label: 'Teilweise gesperrt',
    short: 'Teil',
    hint: 'Ergebnistext sofort sichtbar, aber die roten Kennzahlen (Score, Schaden, Ausfall …) bleiben verpixelt bis zur Dateneingabe.',
  },
];

export function gateModeMeta(id: string) {
  return GATE_MODES.find((m) => m.id === id) ?? GATE_MODES[0];
}

export type FunnelData = {
  events: { event: string; count: number; visitors: number }[];
  questions: { check: string; step: number; visitors: number }[];
  fields: { field: string; visitors: number }[];
  days: { day: string; clicks: number; leads: number }[];
  recent: {
    created_at: string;
    visitor_id: string;
    session_id: string;
    event: string;
    path: string | null;
    meta: Record<string, unknown> | null;
  }[];
};

export const CHANNELS: { id: string; label: string; color: string }[] = [
  { id: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
  { id: 'youtube', label: 'YouTube', color: '#FF4444' },
  { id: 'instagram', label: 'Instagram', color: '#E1306C' },
  { id: 'tiktok', label: 'TikTok', color: '#69C9D0' },
  { id: 'x', label: 'X / Twitter', color: '#9CA3AF' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2' },
  { id: 'google-ads', label: 'Google Ads', color: '#F4B400' },
  { id: 'email', label: 'E-Mail', color: '#10B981' },
  { id: 'blog', label: 'Blog / SEO', color: '#8B5CF6' },
  { id: 'podcast', label: 'Podcast', color: '#F97316' },
  { id: 'qr', label: 'QR / Offline', color: '#64748B' },
  { id: 'other', label: 'Sonstiges', color: '#94A3B8' },
];

export function channelMeta(id: string) {
  return CHANNELS.find((c) => c.id === id) ?? CHANNELS[CHANNELS.length - 1];
}

/** Zielseiten-Vorschläge für neue Links (freier Pfad ist zusätzlich möglich). */
export const TARGETS: { path: string; label: string }[] = [
  { path: '/pentest-schnellcheck', label: 'Schnell-Check (60 Sek.)' },
  { path: '/pentest-risiko-check', label: 'Voller Risiko-Check' },
  { path: '/brauche-ich-pentest', label: '„Brauche ich einen Pentest?“' },
  { path: '/welche-gesetze-treffen-zu', label: 'Gesetzes-Check (NIS2/DSGVO/…)' },
  { path: '/request-pentest', label: 'Pentest-Konfigurator' },
  { path: '/contact', label: 'Kontaktseite' },
  { path: '/', label: 'Startseite' },
  // Standort-Landingpages
  { path: '/pentest-berlin', label: 'Standort: Pentest Berlin' },
  { path: '/penetration-testing-hamburg', label: 'Standort: Pentest Hamburg' },
  { path: '/penetration-testing-muenchen', label: 'Standort: Pentest München' },
  { path: '/penetration-testing-stuttgart', label: 'Standort: Pentest Stuttgart' },
  { path: '/penetration-testing-koeln', label: 'Standort: Pentest Köln' },
  { path: '/penetrationstest-deutschland', label: 'Standort: Penetrationstest Deutschland' },
];

export const EVENT_LABELS: Record<string, string> = {
  click: 'Link-Klick',
  page_view: 'Seitenaufruf',
  cta_click: 'CTA geklickt',
  check_tab_select: 'Check-Tab gewechselt',
  check_start: 'Check gestartet',
  question_answered: 'Frage beantwortet',
  question_back: 'Zurück geklickt',
  check_restart: 'Check neu gestartet',
  check_completed: 'Check abgeschlossen',
  gate_view: 'Ergebnis-Sperre gesehen',
  form_field_filled: 'Formularfeld ausgefüllt',
  form_error: 'Formular-Fehler',
  form_submit_failed: 'Senden fehlgeschlagen',
  lead_submitted: 'Lead abgesendet',
  result_unlocked: 'Ergebnis freigeschaltet',
  calendly_view: 'Calendly angezeigt',
  call_click: 'Telefonnummer geklickt',
};

export const CHECK_LABELS: Record<string, string> = {
  short: 'Schnell-Check',
  full: 'Risiko-Check',
  pentest: 'Pentest-Check',
  compliance: 'Gesetzes-Check',
};

export const FIELD_LABELS: Record<string, string> = {
  company: 'Firma',
  email: 'E-Mail',
  phone: 'Telefon',
};

export function eventLabel(e: string): string {
  return EVENT_LABELS[e] ?? e;
}

export function fmtPercent(part: number, total: number): string {
  if (!total) return '–';
  return `${Math.round((part / total) * 100)} %`;
}

export function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}
