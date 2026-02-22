import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sodusecure.com';

  // Static routes with real, stable last-modified dates
  // ⚠️ Update these dates whenever you make meaningful content changes
  const staticRoutes: { path: string; lastModified: string; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '',                    lastModified: '2026-02-01', changeFreq: 'weekly',  priority: 1.0  },
    { path: '/berlin-kmu-pilot',   lastModified: '2026-02-15', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/request-pentest',    lastModified: '2026-01-10', changeFreq: 'monthly', priority: 0.9  },
    { path: '/about',              lastModified: '2025-12-01', changeFreq: 'monthly', priority: 0.8  },
    { path: '/contact',            lastModified: '2025-12-01', changeFreq: 'monthly', priority: 0.8  },
    { path: '/careers',            lastModified: '2026-01-01', changeFreq: 'weekly',  priority: 0.7  },
    { path: '/case-studies',       lastModified: '2026-01-30', changeFreq: 'weekly',  priority: 0.8  },
    { path: '/privacy',            lastModified: '2025-12-23', changeFreq: 'yearly',  priority: 0.3  },
    { path: '/terms',              lastModified: '2025-12-23', changeFreq: 'yearly',  priority: 0.3  },
    { path: '/services/sme-packages', lastModified: '2026-02-22', changeFreq: 'weekly',  priority: 0.95 },
  ];

  // Service pages
  const serviceRoutes: { path: string; lastModified: string }[] = [
    { path: '/services/web-application-testing',  lastModified: '2025-12-01' },
    { path: '/services/mobile-app-testing',       lastModified: '2025-12-01' },
    { path: '/services/api-security-testing',     lastModified: '2025-12-01' },
    { path: '/services/network-audit',            lastModified: '2025-12-01' },
    { path: '/services/infrastructure-testing',   lastModified: '2025-12-01' },
    { path: '/services/cloud-devops-testing',     lastModified: '2025-12-01' },
    { path: '/services/security-audit',           lastModified: '2025-12-01' },
    { path: '/services/vulnerability-assessment', lastModified: '2025-12-01' },
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Static routes
  staticRoutes.forEach(({ path, lastModified, changeFreq, priority }) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(lastModified),
      changeFrequency: changeFreq,
      priority,
    });
  });

  // Service routes
  serviceRoutes.forEach(({ path, lastModified }) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(lastModified),
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // Blog / Case-study article routes
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
