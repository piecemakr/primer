import { getMetadata } from './metadata';

export default async function robots() {
  const metadata = await getMetadata();

  const robotsIndex = metadata?.robotsIndex !== false;
  const robotsFollow = metadata?.robotsFollow !== false;
  const canonicalUrl =
    metadata?.canonicalUrl || 'https://primer.eveninglabs.io';

  return {
    rules: [
      {
        userAgent: '*',
        allow: robotsIndex ? '/' : '/',
        disallow: robotsIndex ? [] : ['/'],
        ...(robotsFollow ? {} : { nofollow: true }),
      },
    ],
    sitemap: `${canonicalUrl}/sitemap.xml`,
  };
}
