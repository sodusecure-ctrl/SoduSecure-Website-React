import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sodusecure.com';

  // ⚠️ lastModified bei inhaltlichen Änderungen aktualisieren.
  // Nur indexierbare Seiten eintragen — Seiten mit noindex oder Redirect gehören NICHT hierher.
  const staticRoutes: { path: string; lastModified: string; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    // ── Top-Landingpages ──
    { path: '',                                lastModified: '2026-07-13', changeFreq: 'weekly',  priority: 1.0 },
    { path: '/penetration-testing',            lastModified: '2026-07-13', changeFreq: 'weekly',  priority: 1.0 },
    { path: '/pentest-kosten',                 lastModified: '2026-07-13', changeFreq: 'weekly',  priority: 1.0 },
    { path: '/penetrationstest-anbieter',      lastModified: '2026-07-17', changeFreq: 'weekly',  priority: 1.0 },
    { path: '/it-sicherheitscheck',            lastModified: '2026-07-13', changeFreq: 'weekly',  priority: 1.0 },
    { path: '/iso-27001-pentest-anforderungen', lastModified: '2026-07-13', changeFreq: 'weekly', priority: 1.0 },

    // ── Lokal-Cluster ──
    { path: '/pentest-berlin',                 lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.9 },
    { path: '/pentest-berlin/kosten',          lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/pentest-berlin/kmu',             lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/pentest-berlin/intern-extern',   lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/pentest-berlin/iso-27001',       lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/penetration-testing-hamburg',    lastModified: '2026-06-27', changeFreq: 'monthly', priority: 0.9 },
    { path: '/penetration-testing-muenchen',   lastModified: '2026-06-27', changeFreq: 'monthly', priority: 0.9 },
    { path: '/penetration-testing-stuttgart',  lastModified: '2026-06-27', changeFreq: 'monthly', priority: 0.9 },
    { path: '/penetration-testing-koeln',      lastModified: '2026-06-27', changeFreq: 'monthly', priority: 0.9 },
    { path: '/penetrationstest-deutschland',   lastModified: '2026-06-23', changeFreq: 'monthly', priority: 0.9 },

    // ── Compliance-Cluster ──
    { path: '/iso-27001',                      lastModified: '2026-05-18', changeFreq: 'monthly', priority: 0.9 },
    { path: '/iso-27001-zertifizierung',       lastModified: '2026-05-18', changeFreq: 'monthly', priority: 0.8 },
    { path: '/nis2',                           lastModified: '2026-06-14', changeFreq: 'monthly', priority: 0.8 },
    { path: '/dora',                           lastModified: '2026-06-14', changeFreq: 'monthly', priority: 0.8 },
    { path: '/mdr',                            lastModified: '2026-06-14', changeFreq: 'monthly', priority: 0.8 },
    { path: '/bsig',                           lastModified: '2026-06-14', changeFreq: 'monthly', priority: 0.8 },
    { path: '/tlpt',                           lastModified: '2026-06-23', changeFreq: 'monthly', priority: 0.8 },
    { path: '/tisax',                          lastModified: '2026-06-23', changeFreq: 'monthly', priority: 0.8 },
    { path: '/pci-dss-penetrationstest',       lastModified: '2026-06-23', changeFreq: 'monthly', priority: 0.8 },
    { path: '/dsgvo-penetrationstest',         lastModified: '2026-06-26', changeFreq: 'monthly', priority: 0.8 },
    { path: '/bsi-tr-03161',                   lastModified: '2026-04-19', changeFreq: 'monthly', priority: 0.8 },
    { path: '/pentest-gesundheitsanwendungen', lastModified: '2026-04-19', changeFreq: 'monthly', priority: 0.8 },
    { path: '/anfrage-tr03161',                lastModified: '2026-04-19', changeFreq: 'monthly', priority: 0.6 },

    // ── Weitere Keyword-Landingpages ──
    { path: '/cybersecurity-firma',            lastModified: '2026-05-18', changeFreq: 'monthly', priority: 0.8 },
    { path: '/cyber-security-check',           lastModified: '2026-07-13', changeFreq: 'monthly', priority: 0.8 },
    { path: '/cybersecurity-audit',            lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/it-sicherheit-testen',           lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/schwachstellenanalyse',          lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/sicherheitsaudit',               lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/hacker-simulation',              lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.8 },
    { path: '/phishing-simulation',            lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.8 },
    { path: '/red-team-assessment',            lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.8 },
    { path: '/vulnerability-assessment-service', lastModified: '2026-05-18', changeFreq: 'monthly', priority: 0.8 },
    { path: '/pentest-certification',          lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.7 },

    // ── Lead-Gen-Checks ──
    { path: '/pentest-schnellcheck',           lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.8 },
    { path: '/pentest-risiko-check',           lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.8 },
    { path: '/brauche-ich-pentest',            lastModified: '2026-06-22', changeFreq: 'monthly', priority: 0.8 },
    { path: '/brauche-ich-einen-pentest',      lastModified: '2026-06-14', changeFreq: 'monthly', priority: 0.8 },
    { path: '/welche-gesetze-treffen-zu',      lastModified: '2026-06-27', changeFreq: 'monthly', priority: 0.8 },

    // ── Conversion / Preise ──
    { path: '/services/sme-packages',          lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.9 },
    { path: '/pricing',                        lastModified: '2026-06-22', changeFreq: 'weekly',  priority: 0.8 },
    { path: '/pentest-konfigurator',           lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.7 },
    { path: '/request-pentest',                lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.7 },

    // ── AuditAI (Hub + stärkste Satelliten) ──
    { path: '/sodu-audit-ai',                  lastModified: '2026-07-13', changeFreq: 'weekly',  priority: 0.8 },
    { path: '/claude-pentest-deutschland',     lastModified: '2026-07-13', changeFreq: 'monthly', priority: 0.7 },
    { path: '/ai-code-review-deutschland',     lastModified: '2026-07-13', changeFreq: 'monthly', priority: 0.7 },
    { path: '/ki-code-audit-99-euro',          lastModified: '2026-07-13', changeFreq: 'monthly', priority: 0.7 },
    { path: '/claude-code-review',             lastModified: '2026-07-13', changeFreq: 'monthly', priority: 0.7 },
    { path: '/claude-vs-snyk',                 lastModified: '2026-07-13', changeFreq: 'monthly', priority: 0.7 },
    { path: '/github-security-scanner',        lastModified: '2026-07-13', changeFreq: 'monthly', priority: 0.7 },

    // ── Unternehmen ──
    { path: '/about',                          lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.5 },
    { path: '/contact',                        lastModified: '2026-03-16', changeFreq: 'monthly', priority: 0.6 },
    { path: '/case-studies',                   lastModified: '2026-03-16', changeFreq: 'weekly',  priority: 0.7 },
  ];

  // Service-Detailseiten
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

  staticRoutes.forEach(({ path, lastModified, changeFreq, priority }) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(lastModified),
      changeFrequency: changeFreq,
      priority,
    });
  });

  serviceRoutes.forEach(({ path, lastModified }) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(lastModified),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Blog-/Case-Study-Artikel
  blogPosts.forEach((blog) => {
    const isKmuPost = blog.id === 15 || blog.id === 14 || blog.id === 13 || blog.id === 12 || blog.id === 9;
    const isTR03161Post = blog.id === 18 || blog.id === 19 || blog.id === 20;
    routes.push({
      url: `${baseUrl}/case-studies/blogs/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly',
      priority: isKmuPost || isTR03161Post ? 0.7 : 0.6,
    });
  });

  return routes;
}
