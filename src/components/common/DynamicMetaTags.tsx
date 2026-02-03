'use client';

import { useEffect } from 'react';

interface DynamicMetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: 'article' | 'website';
  publishedTime?: string;
}

export default function DynamicMetaTags({
  title,
  description,
  keywords = [],
  author,
  image,
  url,
  type = 'article',
  publishedTime,
}: DynamicMetaTagsProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | SudoSecure`;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }
    if (author) {
      updateMetaTag('author', author);
    }

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', type, 'property');
    if (url) {
      updateMetaTag('og:url', url, 'property');
    }
    if (image) {
      updateMetaTag('og:image', image, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (image) {
      updateMetaTag('twitter:image', image);
    }

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, 'property');
      }
      if (author) {
        updateMetaTag('article:author', author, 'property');
      }
      if (keywords.length > 0) {
        keywords.forEach(keyword => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'article:tag');
          meta.setAttribute('content', keyword);
          document.head.appendChild(meta);
        });
      }
    }
  }, [title, description, keywords, author, image, url, type, publishedTime]);

  return null;
}
