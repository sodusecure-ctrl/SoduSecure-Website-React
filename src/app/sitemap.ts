import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sudosecure.com'; // Update with your actual domain
  
  const locales = ['en', 'de'];
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/careers',
    '/case-studies',
    '/request-pentest',
    '/privacy',
    '/terms',
  ];

  // Service routes
  const serviceRoutes = [
    '/services/web-application-testing',
    '/services/mobile-app-testing',
    '/services/api-security-testing',
    '/services/network-audit',
    '/services/infrastructure-testing',
    '/services/cloud-devops-testing',
    '/services/security-audit',
    '/services/vulnerability-assessment',
    '/services/sme-packages',
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  locales.forEach((locale) => {
    // Add static routes
    staticRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            de: `${baseUrl}/de${route}`,
          },
        },
      });
    });

    // Add service routes
    serviceRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            de: `${baseUrl}/de${route}`,
          },
        },
      });
    });

    // Add blog routes
    blogPosts.forEach((blog) => {
      routes.push({
        url: `${baseUrl}/${locale}/case-studies/blogs/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/case-studies/blogs/${blog.slug}`,
            de: `${baseUrl}/de/case-studies/blogs/${blog.slug}`,
          },
        },
      });
    });
  });

  return routes;
}
