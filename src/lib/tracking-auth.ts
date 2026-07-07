import crypto from 'crypto';
import { cookies } from 'next/headers';

/**
 * Auth für das /tracking Dashboard – gleiche Mechanik wie sales-auth
 * (PIN → HMAC-signierter httpOnly-Cookie), aber eigener PIN und Cookie,
 * damit Sales- und Tracking-Zugang unabhängig bleiben.
 */

export const TRACKING_COOKIE = 'sodu_tracking_session';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 Stunden

export function getTrackingPin(): string {
  return process.env.TRACKING_DASHBOARD_PIN?.trim() || 'FJ9999';
}

function getSecret(): string {
  return (
    process.env.TRACKING_DASHBOARD_SECRET ||
    process.env.SALES_DASHBOARD_SECRET ||
    process.env.RESEND_API_KEY ||
    process.env.STRIPE_SECRET_KEY ||
    'sodu-secure-tracking-dashboard-fallback-secret-2026'
  );
}

function sign(data: string): string {
  return crypto.createHmac('sha256', getSecret()).update(data).digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function verifyTrackingPin(input: unknown): boolean {
  if (typeof input !== 'string') return false;
  return safeEqual(input.trim(), getTrackingPin());
}

export function createTrackingSessionToken(now: number): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: now + SESSION_TTL_MS }),
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyTrackingSessionToken(token: string | undefined, now: number): boolean {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;
  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof decoded.exp === 'number' && decoded.exp > now;
  } catch {
    return false;
  }
}

export const TRACKING_SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000);

export async function isTrackingAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(TRACKING_COOKIE)?.value;
  return verifyTrackingSessionToken(token, Date.now());
}
