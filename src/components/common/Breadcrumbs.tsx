'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Remove locale from path if present
    const locale = ['en', 'de'].includes(paths[0]) ? paths.shift() : null;
    
    paths.forEach((path, index) => {
      const href = `/${locale ? locale + '/' : ''}${paths.slice(0, index + 1).join('/')}`;
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({ label, href });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  // Generate JSON-LD for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sudosecure.com',
      },
      ...breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: crumb.label,
        item: `https://sudosecure.com${crumb.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="py-4 px-6 md:px-12 lg:px-24 bg-gray-50">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
