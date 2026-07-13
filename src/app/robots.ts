import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sodusecure.com'; // Update with your actual domain

  // Nur reine Redirect-/API-Endpunkte per robots.txt sperren.
  // Seiten, die aus dem Index sollen, bekommen stattdessen ein noindex-Meta-Tag —
  // dafür muss Google sie crawlen dürfen, also hier NICHT sperren.
  const disallow = ['/api/', '/t/', '/lang/'];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
