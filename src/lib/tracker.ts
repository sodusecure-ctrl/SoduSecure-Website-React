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
const ATTR_LS = 'sodu_attr';
const VID_LS = 'sodu_vid';
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
    const sl = new URLSearchParams(window.location.search).get('sl');
    if (sl && SLUG_RE.test(sl)) {
      writeCookie(ATTR_COOKIE, sl.toLowerCase(), ATTR_MAX_AGE);
      lsSet(ATTR_LS, sl.toLowerCase());
    } else {
      // Cookie → localStorage spiegeln, damit die Attribution Cookie-Löschungen übersteht
      const cookieSlug = readCookie(ATTR_COOKIE);
      if (cookieSlug && SLUG_RE.test(cookieSlug)) lsSet(ATTR_LS, cookieSlug);
    }
  } catch { /* nie die Seite stören */ }
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
