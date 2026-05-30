import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'never',
  localeDetection: true,
});

export const config = {
  matcher: [
    // Match all paths except Next.js internals, static assets, API routes, and files with extensions
    '/((?!_next/static|_next/image|_next/webpack|favicon\\.ico|icons/|images/|pdf/|sitemap\\.xml|robots\\.txt|browserconfig\\.xml|site\\.webmanifest|lang/|.*\\..*|api/).*)',
  ],
};
