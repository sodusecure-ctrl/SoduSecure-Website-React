import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = new Set(['de', 'en']);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const targetLocale = SUPPORTED_LOCALES.has(locale) ? locale : 'de';

  const toParam = request.nextUrl.searchParams.get('to');
  const toPath = toParam && toParam.startsWith('/') ? toParam : '/';

  const response = NextResponse.redirect(new URL(toPath, request.url));

  response.cookies.set('NEXT_LOCALE', targetLocale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });

  response.cookies.set('locale', targetLocale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
