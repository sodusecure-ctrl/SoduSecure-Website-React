import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sodusecure.com'; // Update with your actual domain
  
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

  // Add static routes (without locale prefix)
  staticRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  // Add service routes (without locale prefix)
  serviceRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Add blog routes (without locale prefix)
  blogPosts.forEach((blog) => {
    routes.push({
      url: `${baseUrl}/case-studies/blogs/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
