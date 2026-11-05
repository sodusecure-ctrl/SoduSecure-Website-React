import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getBlogById, getBlogDateModified } from '@/lib/blogData';

const baseUrl = 'https://sodusecure.com';

// Server-Metadata fuer die Blog-Route: Die Seite selbst ist eine Client-Component,
// daher liefert dieses Layout Titel, Description und Canonical pro Artikel.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = getBlogById(id);

  // Fallback fuer unbekannte ids: neutraler Titel, kein Index
  if (!blog) {
    return {
      title: 'Blog',
      description: 'Fachartikel zu Penetrationstests und IT-Sicherheit von Sodu Secure.',
      robots: { index: false, follow: true },
    };
  }

  const blogUrl = `${baseUrl}/case-studies/blogs/${blog.slug}`;

  return {
    // follow bleibt an: die internen Links der Altartikel sollen weiterhin
    // zaehlen, nur die Seite selbst gehoert nicht in den Index.
    ...(blog.noindex ? { robots: { index: false, follow: true } } : {}),
    title: blog.title,
    description: blog.description,
    keywords: blog.keywords,
    authors: [{ name: blog.author }],
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      type: 'article',
      url: blogUrl,
      title: blog.title,
      description: blog.description,
      publishedTime: blog.date,
      // dateModified-Pendant fuer Open Graph; ohne gepflegtes `updated` identisch mit publishedTime.
      modifiedTime: getBlogDateModified(blog),
      section: blog.category,
      tags: blog.keywords,
      authors: [blog.author],
      images: [
        {
          url: `${baseUrl}${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [`${baseUrl}${blog.image}`],
    },
  };
}

/**
 * Torwaechter fuer die Blog-Route. Die Seite selbst ist eine Client-Component und
 * kann weder einen Status-Code setzen noch umleiten - beides passiert hier.
 *
 * Zwei Aufgaben:
 *
 * 1. Echter 404 fuer unbekannte Artikel. Vorher antwortete *jede* erfundene URL
 *    unter /case-studies/blogs/ mit HTTP 200 und einem leeren Rumpfartikel. Fuer
 *    Google war das eine unendlich grosse Menge gueltiger Adressen - sie wurden
 *    gecrawlt, aber nie indexiert, und haben Crawl-Budget gebunden, das den
 *    echten Seiten fehlte. Das noindex im Fallback unten hat das Indexieren
 *    verhindert, nicht das Crawlen.
 *
 * 2. Dauerhafte Umleitung der Artikelnummern auf ihren Slug. Die Artikel 13-25
 *    waren unter zwei Adressen erreichbar (/blogs/24 und /blogs/it-sicherheits-
 *    test-planen). Das Canonical zeigte bereits auf den Slug, Google hat die
 *    beiden also zusammengefasst - aber gecrawlt wurden weiterhin beide. Der 301
 *    macht die Zuordnung eindeutig und spart den zweiten Abruf.
 *
 * Die Artikel 1-12 tragen ihre Nummer als Slug, fuer sie aendert sich nichts.
 */
export default async function BlogArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = getBlogById(id);

  if (!blog) notFound();
  if (id !== blog.slug) permanentRedirect(`/case-studies/blogs/${blog.slug}`);

  return children;
}
