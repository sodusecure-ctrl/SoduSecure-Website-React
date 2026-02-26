import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sodusecure.com';

  // Static routes with real, stable last-modified dates
  // ⚠️ Update these dates whenever you make meaningful content changes
  const staticRoutes: { path: string; lastModified: string; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '',                    lastModified: '2026-02-26', changeFreq: 'weekly',  priority: 1.0  },
    { path: '/berlin-kmu-pilot',   lastModified: '2026-02-26', changeFreq: 'weekly',  priority: 1.0  },
    { path: '/services/sme-packages', lastModified: '2026-02-26', changeFreq: 'weekly',  priority: 0.98 },
    { path: '/request-pentest',    lastModified: '2026-02-26', changeFreq: 'monthly', priority: 0.92  },
    { path: '/about',              lastModified: '2026-02-26', changeFreq: 'monthly', priority: 0.82  },
    { path: '/contact',            lastModified: '2026-02-26', changeFreq: 'monthly', priority: 0.82  },
    { path: '/careers',            lastModified: '2026-02-01', changeFreq: 'weekly',  priority: 0.7  },
    { path: '/case-studies',       lastModified: '2026-02-26', changeFreq: 'weekly',  priority: 0.85  },
    { path: '/privacy',            lastModified: '2025-12-23', changeFreq: 'yearly',  priority: 0.3  },
    { path: '/terms',              lastModified: '2025-12-23', changeFreq: 'yearly',  priority: 0.3  },
    { path: '/impressum',          lastModified: '2025-12-23', changeFreq: 'yearly',  priority: 0.3  },
  ];

  // Service pages
  const serviceRoutes: { path: string; lastModified: string }[] = [
    { path: '/services/web-application-testing',  lastModified: '2026-02-26' },
    { path: '/services/mobile-app-testing',       lastModified: '2026-02-26' },
    { path: '/services/api-security-testing',     lastModified: '2026-02-26' },
    { path: '/services/network-audit',            lastModified: '2026-02-26' },
    { path: '/services/infrastructure-testing',   lastModified: '2026-02-26' },
    { path: '/services/cloud-devops-testing',     lastModified: '2026-02-26' },
    { path: '/services/security-audit',           lastModified: '2026-02-26' },
    { path: '/services/vulnerability-assessment', lastModified: '2026-02-26' },
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
    // Give extra priority to KMU-focused content
    const isKmuPost = blog.id === 13 || blog.id === 12 || blog.id === 9;
    routes.push({
      url: `${baseUrl}/case-studies/blogs/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly',
      priority: isKmuPost ? 0.85 : 0.7,
    });
  });

  return routes;
}
