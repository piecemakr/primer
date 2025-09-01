import { defineQuery } from 'next-sanity';

export const metadataQuery = defineQuery(`
  *[_type == "metadata"][0] {
    siteTitle,
    siteDescription,
    defaultPageTitle,
    defaultPageDescription,
    keywords,
    canonicalUrl,
    robotsIndex,
    robotsFollow,
    googleVerification,
    sitePublisher,
    appleMobileWebAppTitle,
    favicon,
    favicon16,
    favicon32,
    appleTouchIcon,
    siteAuthor,
    ogImage,
    ogImageAlt,
    ogType,
    ogSiteName,
    ogUrl,
    ogLocale,
    twitterCard,
    twitterSite,
    twitterCreator,
    twitterImage,
    linkedInUrl,
    facebookUrl,
    instagramUrl,
    youtubeUrl
  }
`);
