import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import CorporateCheck from '../CorporateCheck';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Sicherheits-Schnellcheck für Unternehmen | Sodu Secure',
  description:
    'Kostenloser Sicherheits-Schnellcheck in 60 Sekunden: Sechs Fragen zeigen Ihnen, wie gefährdet Ihr Unternehmen ist und was ein Cyberangriff kosten würde. Danach Pentest vom zertifizierten Experten.',
  alternates: { canonical: `${baseUrl}/corporate/schnellcheck` },
  robots: { index: true, follow: true },
};

export default async function Page() {
  const locale = await getLocale();
  return <CorporateCheck isDe={locale !== 'en'} variant="short" />;
}
