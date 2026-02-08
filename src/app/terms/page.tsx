import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function TermsAndConditions() {
  const t = useTranslations('terms');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('terms')}</h1>
          <p className="text-gray-600">{t('lastUpdated')}: December 23, 2025</p>
        </div>

        <Alert className="mb-6">
          <AlertDescription>
            {t('sections.introduction.content')}
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('sections.acceptance.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.acceptance.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.license.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                {t('sections.license.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{t('sections.license.items.license')}</li>
                <li>{t('sections.license.items.modify')}</li>
                <li>{t('sections.license.items.commercial')}</li>
                <li>{t('sections.license.items.reverse')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.account.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.account.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.privacy.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.privacy.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.prohibited.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{t('sections.prohibited.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{t('sections.prohibited.items.violating')}</li>
                <li>{t('sections.prohibited.items.framing')}</li>
                <li>{t('sections.prohibited.items.uploading')}</li>
                <li>{t('sections.prohibited.items.impersonate')}</li>
                <li>{t('sections.prohibited.items.harassing')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.intellectual.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.intellectual.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.limitation.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.limitation.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.termination.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.termination.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.changes.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.changes.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.contact.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.contact.intro')}
              </p>
              <div className="mt-4 text-gray-700">
                <p className="font-semibold">{t('sections.contact.email')}: sodusecure@gmail.com</p>
                <p className="font-semibold">{t('sections.contact.phone')}: +49 179 2396294</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
