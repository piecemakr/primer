import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { metadataQuery } from '@/sanity/lib/queries';
import { Metadata } from 'next';

export interface SiteMetadata {
  siteTitle: string | null;
  siteDescription: string | null;
  defaultPageTitle: string | null;
  defaultPageDescription: string | null;
  keywords: string[] | null;
  canonicalUrl: string | null;
  robotsIndex: boolean | null;
  robotsFollow: boolean | null;
  googleVerification: string | null;
  sitePublisher: string | null;
  appleMobileWebAppTitle: string | null;
  favicon: string | null;
  favicon16: string | null;
  favicon32: string | null;
  appleTouchIcon: string | null;
  siteAuthor: string | null;

  ogImage: string | null;
  ogImageAlt: string | null;
  ogType: string | null;
  ogSiteName: string | null;
  ogUrl: string | null;
  ogLocale: string | null;

  twitterCard: string | null;
  twitterSite: string | null;
  twitterCreator: string | null;
  twitterImage: string | null;
  linkedInUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
}

export async function getMetadata(): Promise<SiteMetadata> {
  try {
    const metadata = await client.fetch(metadataQuery);

    if (!metadata) {
      return createEmptyMetadata();
    }

    return {
      siteTitle: metadata.siteTitle || null,
      siteDescription: metadata.siteDescription || null,
      defaultPageTitle: metadata.defaultPageTitle || null,
      defaultPageDescription: metadata.defaultPageDescription || null,
      keywords: metadata.keywords || null,
      canonicalUrl: metadata.canonicalUrl || null,
      robotsIndex: metadata.robotsIndex ?? null,
      robotsFollow: metadata.robotsFollow ?? null,
      googleVerification: metadata.googleVerification || null,
      sitePublisher: metadata.sitePublisher || null,
      appleMobileWebAppTitle: metadata.appleMobileWebAppTitle || null,
      favicon: metadata.favicon ? urlFor(metadata.favicon).url() : null,
      favicon16: metadata.favicon16 ? urlFor(metadata.favicon16).url() : null,
      favicon32: metadata.favicon32 ? urlFor(metadata.favicon32).url() : null,
      appleTouchIcon: metadata.appleTouchIcon
        ? urlFor(metadata.appleTouchIcon).url()
        : null,
      siteAuthor: metadata.siteAuthor || null,

      ogImage: metadata.ogImage ? urlFor(metadata.ogImage).url() : null,
      ogImageAlt: metadata.ogImageAlt || null,
      ogType: metadata.ogType || null,
      ogSiteName: metadata.ogSiteName || null,
      ogUrl: metadata.ogUrl || null,
      ogLocale: metadata.ogLocale || null,

      twitterCard: metadata.twitterCard || null,
      twitterSite: metadata.twitterSite || null,
      twitterCreator: metadata.twitterCreator || null,
      twitterImage: metadata.twitterImage
        ? urlFor(metadata.twitterImage).url()
        : null,
      linkedInUrl: metadata.linkedInUrl || null,
      facebookUrl: metadata.facebookUrl || null,
      instagramUrl: metadata.instagramUrl || null,
      youtubeUrl: metadata.youtubeUrl || null,
    };
  } catch (error) {
    console.error('Error fetching site metadata:', error);
    return createEmptyMetadata();
  }
}

function createEmptyMetadata(): SiteMetadata {
  return {
    siteTitle: null,
    siteDescription: null,
    defaultPageTitle: null,
    defaultPageDescription: null,
    keywords: null,
    canonicalUrl: null,
    robotsIndex: null,
    robotsFollow: null,
    googleVerification: null,
    sitePublisher: null,
    appleMobileWebAppTitle: null,
    favicon: null,
    favicon16: null,
    favicon32: null,
    appleTouchIcon: null,
    siteAuthor: null,

    ogImage: null,
    ogImageAlt: null,
    ogType: null,
    ogSiteName: null,
    ogUrl: null,
    ogLocale: null,

    twitterCard: null,
    twitterSite: null,
    twitterCreator: null,
    twitterImage: null,
    linkedInUrl: null,
    facebookUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
  };
}

// Generate Next.js Metadata for pages
export async function generateMetadata(
  pageTitle?: string,
  pageDescription?: string,
  pageImage?: string,
  pageUrl?: string
): Promise<Metadata> {
  const metadata = await getMetadata();

  const title = pageTitle
    ? metadata.defaultPageTitle?.replace('%s', pageTitle) ||
      `${pageTitle} | ${metadata.siteTitle}`
    : metadata.siteTitle;

  const description =
    pageDescription ||
    metadata.defaultPageDescription ||
    metadata.siteDescription;
  const image = pageImage || metadata.ogImage;

  return {
    title: title || 'EasyLift Doors',
    description: description || 'Professional garage door services in Canada',
    keywords: metadata.keywords || undefined,
    authors: [{ name: metadata.siteAuthor || 'EasyLift Doors' }],
    creator: metadata.siteAuthor || 'EasyLift Doors',
    publisher: metadata.sitePublisher || undefined,
    robots: {
      index: metadata.robotsIndex !== false,
      follow: metadata.robotsFollow !== false,
    },
    verification: metadata.googleVerification
      ? {
          google: metadata.googleVerification,
        }
      : undefined,
    alternates: {
      canonical: metadata.canonicalUrl || 'https://easyliftdoors.com',
    },
    openGraph: {
      title: title || metadata.siteTitle || undefined,
      description: description || undefined,
      url: pageUrl || metadata.ogUrl || undefined,
      siteName: metadata.ogSiteName || undefined,
      images: image
        ? [
            {
              url: image,
              alt: metadata.ogImageAlt || description || undefined,
            },
          ]
        : undefined,
      locale: metadata.ogLocale || 'en_CA',
      type:
        (metadata.ogType as
          | 'website'
          | 'article'
          | 'book'
          | 'profile'
          | 'music.song'
          | 'music.album'
          | 'music.playlist'
          | 'music.radio_station'
          | 'video.movie'
          | 'video.episode'
          | 'video.tv_show'
          | 'video.other') || 'website',
    },
    twitter: {
      card:
        (metadata.twitterCard as
          | 'summary_large_image'
          | 'summary'
          | 'player'
          | 'app') || 'summary_large_image',
      title: title || metadata.siteTitle || undefined,
      description: description || undefined,
      images: metadata.twitterImage || image || undefined,
      creator: metadata.twitterCreator
        ? `@${metadata.twitterCreator}`
        : undefined,
      site: metadata.twitterSite ? `@${metadata.twitterSite}` : undefined,
    },
    icons: {
      icon: [
        {
          url: metadata.favicon32 || '/favicon.ico',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: metadata.favicon16 || '/favicon.ico',
          sizes: '16x16',
          type: 'image/png',
        },
      ],
      apple: metadata.appleTouchIcon
        ? [
            {
              url: metadata.appleTouchIcon,
              sizes: '180x180',
              type: 'image/png',
            },
          ]
        : undefined,
    },
    other: {
      'apple-mobile-web-app-title':
        metadata.appleMobileWebAppTitle ||
        metadata.siteTitle ||
        'EasyLift Doors',
    },
  };
}
