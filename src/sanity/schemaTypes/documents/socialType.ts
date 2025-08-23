import { defineType, defineField } from 'sanity';

export const socialType = defineType({
  name: 'social',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Twitter/X', value: 'x' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Pinterest', value: 'pinterest' },
          { title: 'Threads', value: 'threads' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label (optional override)',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url' },
  },
});
