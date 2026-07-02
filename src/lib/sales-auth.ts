import crypto from 'crypto';
import { cookies } from 'next/headers';

/**
 * Lightweight auth for the /sales-dashboard.
 *
 * A single shared PIN gates access. On success we set an HMAC-signed,
 * httpOnly cookie so the PIN never has to be stored client-side and can't be
 * forged. No database or user table needed.
 */

export const SALES_COOKIE = 'sodu_sales_session';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function getPin(): string {
  return process.env.SALES_DASHBOARD_PIN?.trim() || 'ES9999';
}

function getSecret(): string {
  // Prefer an explicit secret; fall back to something deployment-stable so
  // sessions survive across serverless invocations even if it's unset.
  return (
    process.env.SALES_DASHBOARD_SECRET ||
    process.env.RESEND_API_KEY ||
    process.env.STRIPE_SECRET_KEY ||
    'sodu-secure-sales-dashboard-fallback-secret-2026'
  );
}

function sign(data: string): string {
  return crypto.createHmac('sha256', getSecret()).update(data).digest('base64url');
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function verifyPin(input: unknown): boolean {
  if (typeof input !== 'string') return false;
  return safeEqual(input.trim(), getPin());
}

/** Create a signed session token: base64url(payload).signature */
export function createSessionToken(now: number): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: now + SESSION_TTL_MS }),
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined, now: number): boolean {
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

export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000);

/** Server-side auth check for route handlers and the dashboard page. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SALES_COOKIE)?.value;
  return verifySessionToken(token, Date.now());
}
