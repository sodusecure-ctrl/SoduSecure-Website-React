import type { Metadata } from 'next';
import { getBlogById } from '@/lib/blogData';

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

export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
