import { CogIcon } from '@sanity/icons';
import { ALL_FIELDS_GROUP, defineField, defineType } from 'sanity';

export const metaType = defineType({
  name: 'metadata',
  title: 'Metadata & Open Graph Settings',
  type: 'document',
  icon: CogIcon,
  description: 'SEO and social media metadata configuration for EasyLift Doors',
  preview: {
    prepare() {
      return {
        title: 'Metadata & OG Settings',
        subtitle: 'SEO and Open Graph configuration',
        media: CogIcon,
      };
    },
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO Settings',
    },
    {
      name: 'openGraph',
      title: 'Open Graph Settings',
    },
    {
      name: 'social',
      title: 'Social Media Settings',
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description:
        'Main site title that appears in browser tabs and search results',
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning('Keep the site title under 60 characters for optimal SEO'),
      group: 'seo',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      description:
        'Main site description that appears in search results & social media',
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning(
            'Keep the site description under 160 characters for optimal SEO'
          ),
      group: 'seo',
    }),
    defineField({
      name: 'defaultPageTitle',
      title: 'Default Page Title Template',
      type: 'string',
      description:
        'Template for pages without specific titles (e.g., "%s | EasyLift Doors")',
      validation: (Rule) =>
        Rule.max(60).warning('Keep the default page title under 60 characters'),
      group: 'seo',
    }),
    defineField({
      name: 'defaultPageDescription',
      title: 'Default Page Description',
      type: 'text',
      description:
        'Default description for pages without specific descriptions',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
      group: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'Default Keywords',
      type: 'array',
      description: 'Default keywords for SEO (comma-separated)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'seo',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Default canonical URL for your website',
      validation: (Rule) => Rule.required(),
      group: 'seo',
    }),
    defineField({
      name: 'robotsIndex',
      title: 'Allow Search Engine Indexing',
      type: 'boolean',
      description: 'Allow search engines to index your site',
      initialValue: true,
      group: 'seo',
    }),
    defineField({
      name: 'robotsFollow',
      title: 'Allow Search Engine Following',
      type: 'boolean',
      description: 'Allow search engines to follow links on your site',
      initialValue: true,
      group: 'seo',
    }),
    defineField({
      name: 'googleVerification',
      title: 'Google Search Console Verification',
      type: 'string',
      placeholder: 'abc123XYZ456def789ghi',
      description: 'Google Search Console verification code',
      group: 'seo',
    }),
    defineField({
      name: 'sitePublisher',
      title: 'Site Publisher',
      type: 'string',
      description: 'Publisher of the website content',
      initialValue: 'EasyLift Doors',
      validation: (Rule) => Rule.required(),
      group: 'seo',
    }),
    defineField({
      name: 'appleMobileWebAppTitle',
      title: 'iOS App Title',
      type: 'string',
      description: 'Title when added to iOS home screen',
      initialValue: 'EasyLift Doors',
      validation: (Rule) => Rule.required(),
      group: 'seo',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Main favicon for your website (32x32px recommended)',
      options: { hotspot: true },
      group: 'seo',
    }),
    defineField({
      name: 'favicon16',
      title: 'Favicon 16x16',
      type: 'image',
      description: '16x16 favicon for older browsers',
      options: { hotspot: true },
      group: 'seo',
    }),
    defineField({
      name: 'favicon32',
      title: 'Favicon 32x32',
      type: 'image',
      description: '32x32 favicon for modern browsers',
      options: { hotspot: true },
      group: 'seo',
    }),
    defineField({
      name: 'appleTouchIcon',
      title: 'Apple Touch Icon',
      type: 'image',
      description: '180x180 icon for iOS devices',
      options: { hotspot: true },
      group: 'seo',
    }),
    defineField({
      name: 'siteAuthor',
      title: 'Site Author',
      type: 'string',
      description: 'This value is set by the developer and cannot be changed',
      initialValue: 'Troy Hancock',
      readOnly: true,
      validation: (Rule) => Rule.required(),
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
      description:
        'Default image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'openGraph',
    }),
    defineField({
      name: 'ogImageAlt',
      title: 'Open Graph Image Alt Text',
      type: 'string',
      description: 'Alt text for the Open Graph image for accessibility',
      validation: (Rule) => Rule.required(),
      group: 'openGraph',
    }),
    defineField({
      name: 'ogType',
      title: 'Open Graph Type',
      type: 'string',
      description: 'Type of content for Open Graph (website, article)',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'Required';
          const validTypes = [
            'website',
            'article',
            'book',
            'profile',
            'music.song',
            'music.album',
            'music.playlist',
            'music.radio_station',
            'video.movie',
            'video.episode',
            'video.tv_show',
            'video.other',
          ];
          return validTypes.includes(value)
            ? true
            : `Must be one of: ${validTypes.join(', ')}`;
        }),
      initialValue: 'website',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Article', value: 'article' },
          { title: 'Book', value: 'book' },
          { title: 'Profile', value: 'profile' },
          { title: 'Music Song', value: 'music.song' },
          { title: 'Music Album', value: 'music.album' },
          { title: 'Music Playlist', value: 'music.playlist' },
          { title: 'Music Radio Station', value: 'music.radio_station' },
          { title: 'Video Movie', value: 'video.movie' },
          { title: 'Video Episode', value: 'video.episode' },
          { title: 'Video TV Show', value: 'video.tv_show' },
          { title: 'Video Other', value: 'video.other' },
        ],
      },
      group: 'openGraph',
    }),
    defineField({
      name: 'ogSiteName',
      title: 'Open Graph Site Name',
      type: 'string',
      description: 'The name of your overall site for Open Graph',
      initialValue: 'EasyLift Doors',
      validation: (Rule) => Rule.required(),
      group: 'openGraph',
    }),
    defineField({
      name: 'ogUrl',
      title: 'Open Graph URL',
      type: 'url',
      description: 'Default URL for Open Graph sharing',
      initialValue: 'https://easyliftdoors.com',
      validation: (Rule) => Rule.required(),
      group: 'openGraph',
    }),
    defineField({
      name: 'ogLocale',
      title: 'Open Graph Locale',
      type: 'string',
      description: 'Language and region for Open Graph (Canadian English)',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'Required';
          return value === 'en_US' ? true : 'Must be: en_US (American English)';
        }),
      readOnly: true,
      initialValue: 'en_US',
      group: 'openGraph',
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      description:
        'Type of Twitter card to display (summary, summary_large_image, app, player)',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'Required';
          const validCards = [
            'summary',
            'summary_large_image',
            'app',
            'player',
          ];
          return validCards.includes(value)
            ? true
            : `Must be one of: ${validCards.join(', ')}`;
        }),
      initialValue: 'summary_large_image',
      options: {
        list: [
          { title: 'Summary', value: 'summary' },
          { title: 'Summary Large Image', value: 'summary_large_image' },
          { title: 'App', value: 'app' },
          { title: 'Player', value: 'player' },
        ],
      },
      group: 'social',
    }),
    defineField({
      name: 'twitterSite',
      title: 'Twitter Site Handle',
      type: 'string',
      description: 'Your Twitter/X username (without @)',
      placeholder: 'easyliftdoors',
      group: 'social',
    }),
    defineField({
      name: 'twitterCreator',
      title: 'Twitter Creator Handle',
      type: 'string',
      description: 'Content creator Twitter/X username (without @)',
      placeholder: 'easyliftdoors',
      group: 'social',
    }),
    defineField({
      name: 'twitterImage',
      title: 'Twitter Card Image',
      type: 'image',
      description:
        'Specific image for Twitter cards (optional, will use OG image if not set)',
      options: { hotspot: true },
      group: 'social',
    }),
    defineField({
      name: 'linkedInUrl',
      title: 'LinkedIn Profile/Company URL',
      type: 'url',
      description: 'LinkedIn profile or company page URL',
      group: 'social',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'url',
      description: 'Facebook business page URL',
      group: 'social',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      description: 'Instagram business profile URL',
      group: 'social',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Channel URL',
      type: 'url',
      description: 'YouTube channel URL',
      group: 'social',
    }),
  ],
});
