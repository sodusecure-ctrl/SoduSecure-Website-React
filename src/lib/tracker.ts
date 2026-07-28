/**
 * Client-seitiges Kampagnen-Tracking.
 *
 * Besucher, die über einen Tracking-Link (/t/<slug>) kommen, erhalten eine
 * Attribution (Cookie + localStorage, 90 Tage) sowie eine anonyme Besucher-ID.
 * `track()` schickt Funnel-Events fire-and-forget an /api/t/events – aber nur,
 * wenn eine Attribution existiert. Ohne Tracking-Link wird nichts gesendet.
 * Es werden keine Formularinhalte übertragen, nur anonyme IDs + Event-Namen.
 */

const ATTR_COOKIE = 'sodu_attr';
const VID_COOKIE = 'sodu_vid';
const GATE_COOKIE = 'sodu_gate';
const ATTR_LS = 'sodu_attr';
const VID_LS = 'sodu_vid';
const GATE_LS = 'sodu_gate';
const SID_SS = 'sodu_sid';
const ATTR_MAX_AGE = 60 * 60 * 24 * 90; // 90 Tage
const VID_MAX_AGE = 60 * 60 * 24 * 365;
const SLUG_RE = /^[a-z0-9][a-z0-9_-]{1,63}$/i;

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function writeCookie(name: string, value: string, maxAge: number) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function randomId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    }
  } catch { /* fall through */ }
  return Array.from({ length: 24 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('');
}

function lsGet(key: string): string | null {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function lsSet(key: string, value: string) {
  try { window.localStorage.setItem(key, value); } catch { /* private mode */ }
}

/** Aktive Attribution (Tracking-Link-Slug) oder null. */
export function getAttribution(): string | null {
  if (typeof window === 'undefined') return null;
  const slug = readCookie(ATTR_COOKIE) || lsGet(ATTR_LS);
  return slug && SLUG_RE.test(slug) ? slug : null;
}

export type GateMode = 'full' | 'partial';

/**
 * Gate-Modus des Tracking-Links, über den der Besucher kam:
 * 'full'    – Ergebnis komplett gesperrt bis zur Dateneingabe (Standard)
 * 'partial' – Ergebnistext sichtbar, nur die Kennzahlen bleiben verdeckt
 * Ohne Tracking-Link (Direktbesucher) gilt immer 'full'.
 */
export function getGateMode(): GateMode {
  if (typeof window === 'undefined') return 'full';
  const v = readCookie(GATE_COOKIE) || lsGet(GATE_LS);
  return v === 'partial' ? 'partial' : 'full';
}

/** Anonyme Besucher-ID (Cookie zuerst – wird ggf. schon vom /t/-Redirect gesetzt). */
export function getVisitorId(): string {
  const existing = readCookie(VID_COOKIE) || lsGet(VID_LS);
  if (existing) {
    lsSet(VID_LS, existing);
    return existing;
  }
  const vid = randomId();
  writeCookie(VID_COOKIE, vid, VID_MAX_AGE);
  lsSet(VID_LS, vid);
  return vid;
}

export function getSessionId(): string {
  try {
    const existing = window.sessionStorage.getItem(SID_SS);
    if (existing) return existing;
    const sid = randomId();
    window.sessionStorage.setItem(SID_SS, sid);
    return sid;
  } catch {
    return 'nosession';
  }
}

/**
 * Übernimmt eine Attribution aus der URL (?sl=<slug>), die der /t/-Redirect
 * anhängt – Fallback für den Fall, dass der Cookie vom Redirect nicht ankam.
 */
export function captureAttributionFromUrl(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const sl = params.get('sl');
    if (sl && SLUG_RE.test(sl)) {
      writeCookie(ATTR_COOKIE, sl.toLowerCase(), ATTR_MAX_AGE);
      lsSet(ATTR_LS, sl.toLowerCase());
      // Gate-Modus des Links übernehmen; fehlt der Parameter, auf 'full'
      // zurücksetzen, damit kein Modus einer alten Kampagne hängen bleibt.
      const gm = params.get('gm') === 'partial' ? 'partial' : 'full';
      writeCookie(GATE_COOKIE, gm, ATTR_MAX_AGE);
      lsSet(GATE_LS, gm);
    } else {
      // Cookie → localStorage spiegeln, damit die Attribution Cookie-Löschungen übersteht
      const cookieSlug = readCookie(ATTR_COOKIE);
      if (cookieSlug && SLUG_RE.test(cookieSlug)) lsSet(ATTR_LS, cookieSlug);
      const cookieGate = readCookie(GATE_COOKIE);
      if (cookieGate === 'partial' || cookieGate === 'full') lsSet(GATE_LS, cookieGate);
    }
  } catch { /* nie die Seite stören */ }
}

// ── Traffic-Quelle (First/Last-Touch) ────────────────────────────────────
// Unabhängig vom /t/-Linksystem: erfasst auf jeder Landung UTM-Parameter,
// Werbe-Click-IDs (gclid, li_fat_id, msclkid, fbclid) und den Referrer, damit
// Formular-Events später wissen, ob der Besucher über Google Ads, LinkedIn,
// organische Suche oder direkt kam. Bezahlte Klicks überschreiben eine ältere
// gespeicherte Quelle (Last-Paid-Touch), sonst bleibt der erste Eindruck stehen.

const SRC_LS = 'sodu_src';

export type TrafficSource = {
  label: string;
  referrer: string | null;
  landingPage: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  clickIds: Record<string, string>;
  capturedAt: string;
};

const CLICK_ID_PARAMS: Record<string, string> = {
  gclid: 'Google Ads',
  gbraid: 'Google Ads',
  wbraid: 'Google Ads',
  msclkid: 'Microsoft/Bing Ads',
  li_fat_id: 'LinkedIn Ads',
  fbclid: 'Facebook/Meta',
  ttclid: 'TikTok Ads',
};

function deriveSourceLabel(
  clickIds: Record<string, string>,
  utmSource: string | null,
  utmMedium: string | null,
  referrer: string | null,
): string {
  for (const [param, label] of Object.entries(CLICK_ID_PARAMS)) {
    if (clickIds[param]) return label;
  }
  if (utmSource) {
    const src = utmSource.toLowerCase();
    const paid = /(cpc|ppc|paid|ads)/i.test(utmMedium || '');
    if (src.includes('google')) return paid ? 'Google Ads' : 'Google (Kampagne)';
    if (src.includes('linkedin')) return paid ? 'LinkedIn Ads' : 'LinkedIn (Kampagne)';
    if (src.includes('facebook') || src.includes('meta') || src.includes('instagram')) return 'Facebook/Meta (Kampagne)';
    if (src.includes('bing') || src.includes('microsoft')) return 'Bing (Kampagne)';
    if (src.includes('newsletter') || src.includes('email') || src.includes('mail')) return 'E-Mail/Newsletter';
    return `Kampagne: ${utmSource}${utmMedium ? ` / ${utmMedium}` : ''}`;
  }
  if (referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      if (host.includes('google.')) return 'Google (organisch)';
      if (host.includes('bing.')) return 'Bing (organisch)';
      if (host.includes('duckduckgo.')) return 'DuckDuckGo (organisch)';
      if (host.includes('linkedin.')) return 'LinkedIn (organisch)';
      if (host.includes('facebook.') || host.includes('instagram.')) return 'Facebook/Instagram (organisch)';
      if (host.includes('chatgpt.') || host.includes('openai.') || host.includes('claude.') || host.includes('perplexity.')) return `KI-Assistent (${host})`;
      return `Verweis: ${host}`;
    } catch { /* ungültiger Referrer */ }
  }
  return 'Direkt / unbekannt';
}

/**
 * Auf jeder Seitenlandung aufrufen (macht der TrackingBeacon im Root-Layout).
 * Speichert die Quelle in localStorage; eine neue bezahlte Quelle (Click-ID
 * oder UTM-Parameter) überschreibt die gespeicherte.
 */
export function captureTrafficSource(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const clickIds: Record<string, string> = {};
    for (const param of Object.keys(CLICK_ID_PARAMS)) {
      const v = params.get(param);
      if (v) clickIds[param] = v.slice(0, 200);
    }
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const hasCampaign = Object.keys(clickIds).length > 0 || !!utmSource;

    const existingRaw = lsGet(SRC_LS);
    if (existingRaw && !hasCampaign) return; // erste Quelle behalten

    const rawReferrer = document.referrer || null;
    // Interne Referrer (eigene Domain) sind keine Quelle
    const referrer = rawReferrer && !rawReferrer.includes(window.location.hostname) ? rawReferrer : null;
    if (!existingRaw || hasCampaign) {
      const source: TrafficSource = {
        label: deriveSourceLabel(clickIds, utmSource, utmMedium, referrer),
        referrer,
        landingPage: window.location.pathname + window.location.search,
        utmSource,
        utmMedium,
        utmCampaign: params.get('utm_campaign'),
        utmTerm: params.get('utm_term'),
        utmContent: params.get('utm_content'),
        clickIds,
        capturedAt: new Date().toISOString(),
      };
      lsSet(SRC_LS, JSON.stringify(source));
    }
  } catch { /* nie die Seite stören */ }
}

/** Gespeicherte Traffic-Quelle oder null (z. B. bei deaktiviertem Storage). */
export function getTrafficSource(): TrafficSource | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = lsGet(SRC_LS);
    return raw ? (JSON.parse(raw) as TrafficSource) : null;
  } catch {
    return null;
  }
}

/**
 * Funnel-Event senden (fire-and-forget). No-op ohne Attribution.
 * `meta` darf nur unkritische Daten enthalten (Event-Kontext, nie Eingaben).
 */
export function track(event: string, meta?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  try {
    const slug = getAttribution();
    if (!slug) return;
    const payload = JSON.stringify({
      slug,
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      event,
      path: window.location.pathname,
      meta: meta ?? null,
    });
    const url = '/api/t/events';
    if (navigator.sendBeacon) {
      const ok = navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }));
      if (ok) return;
    }
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => { /* ignore */ });
  } catch { /* Tracking darf nie die Seite brechen */ }
}
