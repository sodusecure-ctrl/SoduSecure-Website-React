import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  TRACKING_COOKIE,
  TRACKING_SESSION_MAX_AGE_SECONDS,
  createTrackingSessionToken,
  verifyTrackingPin,
} from '@/lib/tracking-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Einfache In-Memory-Bremse gegen PIN-Raten (pro Server-Instanz).
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Zu viele Versuche. Bitte später erneut versuchen.' },
      { status: 429 },
    );
  }

  let pin: unknown;
  try {
    ({ pin } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  if (!verifyTrackingPin(pin)) {
    return NextResponse.json({ error: 'Falscher PIN' }, { status: 401 });
  }

  attempts.delete(ip);

  const store = await cookies();
  store.set(TRACKING_COOKIE, createTrackingSessionToken(Date.now()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: TRACKING_SESSION_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(TRACKING_COOKIE);
  return NextResponse.json({ ok: true });
}
