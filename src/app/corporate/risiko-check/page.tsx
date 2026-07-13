import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import CorporateCheck from '../CorporateCheck';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Cyber-Risiko-Check für Unternehmen',
  description:
    'Ausführlicher Sicherheits-Risiko-Check: 14 Fragen zeigen Ihren Gefährdungsgrad, das Schadenspotenzial in Ihrer Branche und konkrete Schwachstellen. Danach Pentest vom zertifizierten Experten.',
  alternates: { canonical: `${baseUrl}/corporate/risiko-check` },
  robots: { index: false, follow: true },
};

export default async function Page() {
  const locale = await getLocale();
  return <CorporateCheck isDe={locale !== 'en'} variant="full" />;
}
