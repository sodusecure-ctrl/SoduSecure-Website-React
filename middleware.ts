import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'de',
  localePrefix: 'never'
});

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
