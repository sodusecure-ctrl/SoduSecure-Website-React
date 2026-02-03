import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Database, Eye, Lock, Shield, UserCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('privacy');
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: t('sections.collect.title'),
      content: (
        <>
          <p className="text-gray-700 mb-4">{t('sections.collect.intro')}</p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{t('sections.collect.personal')}</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>{t('sections.collect.personalItems.name')}</li>
                <li>{t('sections.collect.personalItems.account')}</li>
                <li>{t('sections.collect.personalItems.payment')}</li>
                <li>{t('sections.collect.personalItems.preferences')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{t('sections.collect.usage')}</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>{t('sections.collect.usageItems.browser')}</li>
                <li>{t('sections.collect.usageItems.pages')}</li>
                <li>{t('sections.collect.usageItems.time')}</li>
                <li>{t('sections.collect.usageItems.referring')}</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: t('sections.use.title'),
      content: (
        <>
          <p className="text-gray-700 mb-4">{t('sections.use.intro')}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{t('sections.use.items.provide')}</li>
            <li>{t('sections.use.items.process')}</li>
            <li>{t('sections.use.items.admin')}</li>
            <li>{t('sections.use.items.respond')}</li>
            <li>{t('sections.use.items.monitor')}</li>
            <li>{t('sections.use.items.detect')}</li>
            <li>{t('sections.use.items.marketing')}</li>
            <li>{t('sections.use.items.comply')}</li>
          </ul>
        </>
      )
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: t('sections.sharing.title'),
      content: (
        <>
          <p className="text-gray-700 mb-4">{t('sections.sharing.intro')}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>{t('sections.sharing.providers')}:</strong> {t('sections.sharing.providersDesc')}</li>
            <li><strong>{t('sections.sharing.transfers')}:</strong> {t('sections.sharing.transfersDesc')}</li>
            <li><strong>{t('sections.sharing.legal')}:</strong> {t('sections.sharing.legalDesc')}</li>
            <li><strong>{t('sections.sharing.consent')}:</strong> {t('sections.sharing.consentDesc')}</li>
          </ul>
          <p className="text-gray-700 mt-4">{t('sections.sharing.notSell')}</p>
        </>
      )
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('sections.security.title'),
      content: (
        <p className="text-gray-700">
          {t('sections.security.content')}
        </p>
      )
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: t('sections.rights.title'),
      content: (
        <>
          <p className="text-gray-700 mb-4">{t('sections.rights.intro')}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>{t('sections.rights.access')}:</strong> {t('sections.rights.accessDesc')}</li>
            <li><strong>{t('sections.rights.correction')}:</strong> {t('sections.rights.correctionDesc')}</li>
            <li><strong>{t('sections.rights.deletion')}:</strong> {t('sections.rights.deletionDesc')}</li>
            <li><strong>{t('sections.rights.portability')}:</strong> {t('sections.rights.portabilityDesc')}</li>
            <li><strong>{t('sections.rights.optOut')}:</strong> {t('sections.rights.optOutDesc')}</li>
            <li><strong>{t('sections.rights.withdraw')}:</strong> {t('sections.rights.withdrawDesc')}</li>
          </ul>
          <p className="text-gray-700 mt-4">
            {t('sections.rights.contact')}
          </p>
        </>
      )
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: t('sections.cookies.title'),
      content: (
        <>
          <p className="text-gray-700 mb-4">
            {t('sections.cookies.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>{t('sections.cookies.essential')}:</strong> {t('sections.cookies.essentialDesc')}</li>
            <li><strong>{t('sections.cookies.performance')}:</strong> {t('sections.cookies.performanceDesc')}</li>
            <li><strong>{t('sections.cookies.functional')}:</strong> {t('sections.cookies.functionalDesc')}</li>
            <li><strong>{t('sections.cookies.marketing')}:</strong> {t('sections.cookies.marketingDesc')}</li>
          </ul>
          <p className="text-gray-700 mt-4">
            {t('sections.cookies.browser')}
          </p>
        </>
      )
    }
  ];

  return (
    <div className=" py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('privacy')}</h1>
          <p className="text-gray-600">{t('lastUpdated')}: December 23, 2025</p>
        </div>

        <Alert className="mb-6 0">
          <AlertDescription className="text-gray-700">
            {t('sections.introduction.content')}
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="t">{section.icon}</div>
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.content}
              </CardContent>
            </Card>
          ))}

          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="w-6 h-6 " />
                <span>{t('sections.retention.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.retention.content')}
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader>
              <CardTitle>{t('sections.children.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.children.content')}
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader>
              <CardTitle>{t('sections.international.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('sections.international.content')}
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader>
              <CardTitle>{t('sections.changes.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                {t('sections.changes.intro')}
              </p>
              <p className="text-gray-700">
                {t('sections.changes.effective')}
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader>
              <CardTitle>{t('sections.contact.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                {t('sections.contact.intro')}
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>{t('sections.contact.email')}:</strong> privacy@yourcompany.com</p>
                <p><strong>{t('sections.contact.phone')}:</strong> +880 123-456-7890</p>
                <p><strong>{t('sections.contact.address')}:</strong> Gazipur, Dhaka Division, Bangladesh</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
