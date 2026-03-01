import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'de',
  localePrefix: 'never',
  localeDetection: false, // Prevents locale-based redirects that cause Googlebot indexing errors
});

export const config = {
  matcher: [
    // Match all paths except Next.js internals, static assets, API routes, and files with extensions
    '/((?!_next/static|_next/image|_next/webpack|favicon\\.ico|icons/|images/|pdf/|sitemap\\.xml|robots\\.txt|browserconfig\\.xml|site\\.webmanifest|.*\\..*|api/).*)',
  ],
};
