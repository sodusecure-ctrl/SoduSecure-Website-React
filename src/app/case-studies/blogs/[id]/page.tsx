"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Bookmark, Calendar, ChevronDown, Clock, Share2, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { getBlogById } from '@/lib/blogData';
import DynamicMetaTags from '@/components/common/DynamicMetaTags';

export default function BlogArticleDetail() {
  const [showMobileTOC, setShowMobileTOC] = useState(false);
  const [ctaEmail, setCtaEmail] = useState('');
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id ? parseInt(params.id as string, 10) : 1;

  // Get blog metadata for JSON-LD
  const blogData = getBlogById(blogId);

  const getBlogTranslationKey = (id: number): string => {
    const mapping: Record<number, string> = {
      1: 'blogDetail',
      2: 'blogDetail',
      3: 'blogDetail',
      4: 'blogDetail',
      5: 'blogDetail',
      6: 'blogDetail',
      7: 'react4shellDetail',
      8: 'openClawDetail',
      9: 'smePentestDetail',
      10: 'owaspTop10_2026Detail',
      11: 'oscpPathDetail'
    };
    return mapping[id] || 'blogDetail';
  };

  const t = useTranslations(getBlogTranslationKey(blogId));

  // Generate JSON-LD for Article
  const articleSchema = blogData ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blogData.title,
    description: blogData.description,
    image: `https://sodusecure.de${blogData.image}`,
    datePublished: blogData.date,
    dateModified: blogData.date,
    author: {
      '@type': 'Person',
      name: blogData.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SoduSecure',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sodusecure.de/images/logo.png',
      },
    },
    keywords: blogData.keywords.join(', '),
    articleSection: blogData.category,
    timeRequired: blogData.readTime,
  } : null;


  const handleBack = () => {
    window.history.back();
  };


  const handleRequestConsultation = async () => {
    const trimmedEmail = ctaEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      toast.error(t('toasts.invalidEmail'));
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: 'Blog CTA',
          company: '',
          email: trimmedEmail,
          phone: '',
          message: `${t('cta.title')}\n\n${t('cta.description')}`
        })
      });

      if (!response.ok) {
        throw new Error('Email send failed');
      }

      toast.success(t('toasts.emailSent'));
      setCtaEmail('');
    } catch {
      toast.error(t('toasts.emailFailed'));
    }
  };

  // Table of Contents items
  const tocItems = [
    { id: 1, title: t('sections.introduction.title'), active: true },
    { id: 2, title: t('sections.commonAttackVectors.title') },
    { id: 3, title: t('sections.impactAnalysis.title') },
    { id: 4, title: t('sections.mitigationStrategies.title') },
    { id: 5, title: t('sections.conclusion.title') }
  ];

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('title'),
          text: t('description'),
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t('toasts.linkCopied'));
    }
  };

  const handleSave = () => {
    toast.error(t('toasts.saveNotImplemented'));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dynamic Meta Tags for SEO */}
      {blogData && (
        <DynamicMetaTags
          title={blogData.title}
          description={blogData.description}
          keywords={blogData.keywords}
          author={blogData.author}
          image={`https://sodusecure.de${blogData.image}`}
          url={`https://sodusecure.de/case-studies/blogs/${blogData.slug}`}
          type="article"
          publishedTime={blogData.date}
        />
      )}

      {/* JSON-LD for SEO */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      
      {/* Hero Section */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <button
              onClick={handleBack}
              className="flex items-center cursor-pointer gap-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('backToBlog')}</span>
            </button>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label={t('shareArticle')}
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label={t('bookmarkArticle')}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
            <Badge variant="outline" className="border-red-500 text-red-500 text-xs sm:text-sm">
              {t('category')}
            </Badge>
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('date')}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            {t('title')}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mb-4 sm:mb-6">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('author')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('readTime')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Mobile Table of Contents Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileTOC(!showMobileTOC)}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">{t('tableOfContents')}</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMobileTOC ? 'rotate-180' : ''}`} />
            </button>

            {showMobileTOC && (
              <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`block text-sm py-1.5 transition-colors ${item.active
                        ? 'text-red-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                      onClick={() => setShowMobileTOC(false)}
                    >
                      {item.id}. {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>

          {/* Desktop Sidebar - Table of Contents */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <Card className="border-gray-200">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4">{t('tableOfContents')}</h3>
                  <nav className="space-y-2">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`block text-sm py-1.5 transition-colors ${item.active
                          ? 'text-red-600 font-semibold'
                          : 'text-gray-600 hover:text-gray-900'
                          }`}
                      >
                        {item.id}. {item.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Desktop Actions */}
              <Card className="border-gray-200">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">{t('shareThisArticle')}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button

                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-[120px]"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {t('share')}
                    </Button>
                    <Button
                      onClick={handleSave}
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-[120px]"
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      {t('save')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Introduction */}
            <section id="introduction" className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('sections.introduction.title')}</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                {t('sections.introduction.content')}
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 sm:p-6 my-4 sm:my-6 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('sections.introduction.keyTakeaway.title')}</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {t('sections.introduction.keyTakeaway.content')}
                </p>
              </div>

              <div className="bg-gray-100 border-l-4 border-gray-400 p-4 sm:p-6 my-4 sm:my-6 rounded-r-lg">
                <p className="text-gray-800 leading-relaxed italic text-sm sm:text-base">
                  &ldquo;{t('sections.introduction.quote')}&rdquo;
                </p>
              </div>
            </section>

            {/* Common Attack Vectors */}
            <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('sections.commonAttackVectors.title')}</h2>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {Array.from({ length: 6 }, (_, i) => t(`sections.commonAttackVectors.items.${i}`)).map((item, index) => (
                  <li key={index} className="flex gap-3 text-gray-700 text-sm sm:text-base">
                    <span className="text-red-500 mt-1 text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Impact Analysis */}
            <section id="impact-analysis" className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('sections.impactAnalysis.title')}</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
                {t('sections.impactAnalysis.content')}
              </p>

              {/* Real-World Statistics Card */}
              <Card className="bg-gray-900 text-white border-0 mt-4 sm:mt-6">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">{t('sections.impactAnalysis.statistics.title')}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">{t('sections.impactAnalysis.statistics.averageCost.value')}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{t('sections.impactAnalysis.statistics.averageCost.label')}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">{t('sections.impactAnalysis.statistics.identificationTime.value')}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{t('sections.impactAnalysis.statistics.identificationTime.label')}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">{t('sections.impactAnalysis.statistics.multipleBreaches.value')}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{t('sections.impactAnalysis.statistics.multipleBreaches.label')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Mitigation Strategies */}
            <section id="mitigation-strategies" className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('sections.mitigationStrategies.title')}</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
                {t('sections.mitigationStrategies.content')}
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{t('sections.mitigationStrategies.essentialPractices.title')}</h3>
                  <ul className="space-y-2 ml-4">
                    {Array.from({ length: 8 }, (_, i) => t(`sections.mitigationStrategies.essentialPractices.items.${i}`)).map((item, index) => (
                      <li key={index} className="text-gray-700 text-sm sm:text-base">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('sections.conclusion.title')}</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                {t('sections.conclusion.content1')}
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {t('sections.conclusion.content2')}
              </p>
            </section>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }, (_, i) => t(`tags.${i}`)).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs sm:text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* CTA Section */}
            <Card className="bg-red-600 text-white border-0">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">{t('cta.title')}</h3>
                  <p className="text-red-50 text-sm sm:text-base mb-4 sm:mb-6">
                    {t('cta.description')}
                  </p>
                  <div className="max-w-md mx-auto">
                    <Input
                      placeholder={t('cta.emailPlaceholder')}
                      className="bg-white text-gray-900 border-0 mb-3 text-sm sm:text-base"
                      value={ctaEmail}
                      onChange={(event) => setCtaEmail(event.target.value)}
                    />
                    <Button
                      className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 sm:py-4 text-sm sm:text-base"
                      onClick={handleRequestConsultation}
                    >
                      {t('cta.buttonText')}
                    </Button>
                  </div>
                  <p className="text-red-200 text-xs mt-3">
                    {t('cta.disclaimer')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t('relatedArticles.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {Array.from({ length: 2 }, (_, i) => ({
                  title: t(`relatedArticles.articles.${i}.title`),
                  desc: t(`relatedArticles.articles.${i}.description`),
                  category: t(`relatedArticles.articles.${i}.category`),
                  route: "/case-studies/blogs/2",
                  readTime: t(`relatedArticles.articles.${i}.readTime`),
                  readMore: t(`relatedArticles.articles.${i}.readMore`)
                })).map((article, index) => (
                  <Card key={index} className="border-gray-200 hover:border-red-300 transition-colors cursor-pointer">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-red-500 border-red-500 text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                        {article.desc}
                      </p>
                      <Button onClick={() => router.push(article.route)} variant="link" className="text-red-600 hover:text-red-700 p-0 mt-2 text-sm sm:text-base">
                        {article.readMore}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="border-gray-200 mt-6 sm:mt-8">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{t('authorBio.name')}</h3>
                    <p className="text-sm text-gray-600 mb-2">{t('authorBio.role')}</p>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {t('authorBio.bio')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Mobile Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="font-semibold text-sm">{t('mobileActions.enjoyedArticle')}</p>
              <p className="text-gray-600 text-xs">{t('mobileActions.shareWithNetwork')}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleRequestConsultation}
              >
                {t('mobileActions.getHelp')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}