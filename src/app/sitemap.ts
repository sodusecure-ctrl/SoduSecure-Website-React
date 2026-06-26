import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sodusecure.com';

  // Static routes with real, stable last-modified dates
  // ⚠️ Update these dates whenever you make meaningful content changes
  const staticRoutes: { path: string; lastModified: string; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '',                    lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 1.0  },
    { path: '/pentest-berlin',     lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 1.0  },
    { path: '/penetration-testing-service',   lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 1.0  },
    { path: '/penetration-testing',           lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 1.0  },
    { path: '/pentesting-service',            lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 1.0  },
    { path: '/pentest-angebot',               lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.95 },
    { path: '/pentest-certification',         lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.9  },
    { path: '/penetration-testing-anbieter',  lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.95 },
    { path: '/penetrationstest-deutschland',  lastModified: '2026-06-23', changeFreq: 'weekly',  priority: 0.96 },
    { path: '/pentest-kosten',                lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.98 },
    { path: '/pentest-konfigurator',          lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/pentest-preis',                 lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/pentest-preis-rechner',         lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/pentest',                       lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.98 },
    { path: '/brauche-ich-einen-pentest',     lastModified: '2026-06-14', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/it-sicherheitscheck',           lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/cybersecurity-audit',           lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/hacker-simulation',             lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/it-sicherheit-testen',          lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/schwachstellenanalyse',         lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.9  },
    { path: '/sicherheitsaudit',              lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.9  },
    { path: '/pentest-berlin/kosten',      lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.95 },
    { path: '/pentest-berlin/kmu',         lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.95 },
    { path: '/pentest-berlin/intern-extern', lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.95 },
    { path: '/pentest-berlin/iso-27001',   lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.95 },
    { path: '/bsi-tr-03161',                    lastModified: '2026-04-19', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/pentest-gesundheitsanwendungen',   lastModified: '2026-04-19', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/anfrage-tr03161',                  lastModified: '2026-04-19', changeFreq: 'monthly', priority: 0.85 },
    { path: '/iso-27001',                        lastModified: '2026-05-18', changeFreq: 'weekly',  priority: 0.98 },
    { path: '/iso-27001-pentest-anforderungen',  lastModified: '2026-05-18', changeFreq: 'weekly',  priority: 0.97 },
    { path: '/iso-27001-zertifizierung',         lastModified: '2026-05-18', changeFreq: 'weekly',  priority: 0.97 },
    { path: '/penetrationstest-anbieter',        lastModified: '2026-05-18', changeFreq: 'weekly',  priority: 0.96 },
    { path: '/nis2',                             lastModified: '2026-06-14', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/dora',                             lastModified: '2026-06-14', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/mdr',                              lastModified: '2026-06-14', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/bsig',                             lastModified: '2026-06-14', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/tlpt',                             lastModified: '2026-06-23', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/tisax',                            lastModified: '2026-06-23', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/pci-dss-penetrationstest',         lastModified: '2026-06-23', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/dsgvo-penetrationstest',          lastModified: '2026-06-26', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/cybersecurity-firma',              lastModified: '2026-05-18', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/vulnerability-assessment-service', lastModified: '2026-05-18', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/red-team-assessment-service',      lastModified: '2026-05-18', changeFreq: 'weekly',  priority: 0.95 },
    { path: '/services/sme-packages', lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.98 },
    { path: '/request-pentest',    lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.92  },
    { path: '/about',              lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.82  },
    { path: '/contact',            lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.82  },
    { path: '/careers',            lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.7  },
    { path: '/case-studies',       lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.85  },
    { path: '/privacy',            lastModified: '2026-03-16', changeFreq: 'yearly',  priority: 0.3  },
    { path: '/terms',              lastModified: '2026-03-16', changeFreq: 'yearly',  priority: 0.3  },
    // Risiko-/Pflicht-Checks (Lead-Gen)
    { path: '/pentest-schnellcheck',   lastModified: '2026-06-22', changeFreq: 'weekly', priority: 0.92 },
    { path: '/pentest-risiko-check',   lastModified: '2026-06-22', changeFreq: 'weekly', priority: 0.92 },
    { path: '/brauche-ich-pentest',    lastModified: '2026-06-22', changeFreq: 'weekly', priority: 0.92 },
    // Preise / Pakete
    { path: '/pricing',                lastModified: '2026-06-22', changeFreq: 'weekly', priority: 0.9 },
    // Core / Service (bisher in Sitemap fehlend)
    { path: '/penetration-testing-service',  lastModified: '2026-06-22', changeFreq: 'weekly',  priority: 0.9 },
    { path: '/pentesting-service',           lastModified: '2026-06-22', changeFreq: 'weekly',  priority: 0.9 },
    { path: '/penetration-testing-anbieter', lastModified: '2026-06-22', changeFreq: 'weekly',  priority: 0.9 },
    { path: '/red-team-assessment',          lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.85 },
    { path: '/red-team-assessment-service',  lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.8 },
    { path: '/vulnerability-assessment-service', lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.8 },
    { path: '/phishing-simulation',          lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.8 },
    // Cyber-Security-Check-Cluster
    { path: '/cyber-security-check',         lastModified: '2026-06-22', changeFreq: 'weekly',  priority: 0.85 },
    { path: '/cyber-security-check-kosten',  lastModified: '2026-06-22', changeFreq: 'weekly',  priority: 0.85 },
    { path: '/cyber-security-check-preis',   lastModified: '2026-06-22', changeFreq: 'weekly',  priority: 0.85 },
    // Trust / Sonstiges
    { path: '/security',                     lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.5 },
  ];

  // Service pages
  const serviceRoutes: { path: string; lastModified: string }[] = [
    { path: '/services/web-application-testing',  lastModified: '2026-03-01' },
    { path: '/services/mobile-app-testing',       lastModified: '2026-03-01' },
    { path: '/services/api-security-testing',     lastModified: '2026-03-01' },
    { path: '/services/network-audit',            lastModified: '2026-03-01' },
    { path: '/services/infrastructure-testing',   lastModified: '2026-03-01' },
    { path: '/services/cloud-devops-testing',     lastModified: '2026-03-01' },
    { path: '/services/security-audit',           lastModified: '2026-03-01' },
    { path: '/services/vulnerability-assessment', lastModified: '2026-03-01' },
    { path: '/services/iso-27001',                lastModified: '2026-05-18' },
    { path: '/services/active-directory',         lastModified: '2026-06-23' },
    { path: '/services/aws-penetrationstest',     lastModified: '2026-06-23' },
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
    // Give extra priority to KMU-focused and Berlin/Ablauf keyword content
    const isKmuPost = blog.id === 15 || blog.id === 14 || blog.id === 13 || blog.id === 12 || blog.id === 9;
    const isTR03161Post = blog.id === 18 || blog.id === 19 || blog.id === 20;
    routes.push({
      url: `${baseUrl}/case-studies/blogs/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly',
      priority: isKmuPost ? 0.85 : isTR03161Post ? 0.85 : 0.7,
    });
  });

  return routes;
}
