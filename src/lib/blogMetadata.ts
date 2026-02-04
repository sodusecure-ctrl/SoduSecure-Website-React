import { Metadata } from 'next';
import { getBlogById } from '@/lib/blogData';

const baseUrl = 'https://sodusecure.com';

interface GenerateBlogMetadataParams {
  params: { id: string };
}

export async function generateMetadata({ params }: GenerateBlogMetadataParams): Promise<Metadata> {
  const blog = getBlogById(params.id);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const blogUrl = `${baseUrl}/case-studies/blogs/${blog.slug}`;

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.keywords,
    authors: [{ name: blog.author }],
    creator: blog.author,
    publisher: 'sodusecure',
    alternates: {
      canonical: blogUrl,
      languages: {
        en: `${baseUrl}/en/case-studies/blogs/${blog.slug}`,
        de: `${baseUrl}/de/case-studies/blogs/${blog.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: blogUrl,
      title: blog.title,
      description: blog.description,
      publishedTime: blog.date,
      authors: [blog.author],
      tags: blog.keywords,
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
      creator: '@sodusecure',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}
