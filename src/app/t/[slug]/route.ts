import { NextRequest, NextResponse } from 'next/server';
import { getTrackingLink, insertTrackingEvent, SLUG_RE } from '@/lib/tracking-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Kurz-URL eines Tracking-Links: /t/<slug>
 *
 * 1. Klick serverseitig als Event loggen (mit Referer/UA/Land)
 * 2. Attribution- und Besucher-Cookie setzen
 * 3. Auf die Zielseite weiterleiten – inkl. UTM-Parametern (für GA4 /
 *    LinkedIn Insight) und ?sl=<slug> als Cookie-Fallback für den Client.
 */

const UTM_MEDIUM: Record<string, string> = {
  linkedin: 'social',
  youtube: 'video',
  instagram: 'social',
  tiktok: 'social',
  x: 'social',
  facebook: 'social',
  'google-ads': 'cpc',
  email: 'email',
  blog: 'referral',
  podcast: 'audio',
  qr: 'offline',
  other: 'referral',
};

function randomId(): string {
  return Array.from({ length: 24 }, () =>
    'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)],
  ).join('');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug: rawSlug } = await params;
  const slug = (rawSlug || '').toLowerCase();
  const origin = request.nextUrl.origin;

  if (!SLUG_RE.test(slug)) {
    return NextResponse.redirect(new URL('/', origin), 302);
  }

  let target = '/';
  let channel = 'other';
  let campaign: string | null = null;
  try {
    const link = await getTrackingLink(slug);
    if (link) {
      target = link.target || '/';
      channel = link.channel || 'other';
      campaign = link.campaign;
    }
  } catch (err) {
    console.error('[t] link lookup failed:', err);
  }

  // Besucher-ID: vorhandenen Cookie weiterverwenden, sonst neu vergeben
  const vid = request.cookies.get('sodu_vid')?.value || randomId();

  // Klick loggen (best-effort, blockiert den Redirect nicht)
  void insertTrackingEvent({
    linkSlug: slug,
    visitorId: vid,
    sessionId: 'redirect',
    event: 'click',
    path: `/t/${slug}`,
    meta: {
      referer: request.headers.get('referer') || null,
      ua: (request.headers.get('user-agent') || '').slice(0, 300),
      country: request.headers.get('x-vercel-ip-country') || null,
    },
  });

  const url = new URL(target, origin);
  url.searchParams.set('utm_source', channel);
  url.searchParams.set('utm_medium', UTM_MEDIUM[channel] || 'referral');
  url.searchParams.set('utm_campaign', campaign || slug);
  url.searchParams.set('sl', slug);

  const res = NextResponse.redirect(url, 302);
  const cookieBase = { path: '/', sameSite: 'lax' as const, httpOnly: false, secure: process.env.NODE_ENV === 'production' };
  res.cookies.set('sodu_attr', slug, { ...cookieBase, maxAge: 60 * 60 * 24 * 90 });
  res.cookies.set('sodu_vid', vid, { ...cookieBase, maxAge: 60 * 60 * 24 * 365 });
  return res;
}
