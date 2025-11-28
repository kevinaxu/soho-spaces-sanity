import {defineField, defineType} from 'sanity'

const GROUPS = {
  METADATA: {name: 'meta', title: 'Project Metadata'},
  OVERVIEW: {name: 'overview', title: 'Overview'},
  HERO: {name: 'hero', title: 'Hero Horizontal Gallery'},
  BEFORE_AND_AFTER: {name: 'before_after', title: 'Before & After'},
  HOTSPOT: {name: 'hotspot', title: 'Hotspot'},
  CONTACT: {name: 'contact', title: 'CTA'},
}

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: Object.values(GROUPS),

  fields: [
    // Project Metadata
    defineField({
      name: 'slug',
      title: 'Project Slug',
      description: 'This is used as the URL of the project',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
      group: GROUPS.METADATA.name,
    }),
    // TODO: do I need this?
    // Photos will have a reference to the project
    // May be useful for easily scanning the photo list if there are a lot of photos?
    defineField({
      name: 'projectCode',
      title: 'Project Code',
      description: 'Project code associated with this photo',
      type: 'string',
      group: GROUPS.METADATA.name,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: GROUPS.METADATA.name,
    }),
    defineField({
      name: 'featuredImage',
      title: 'FeaturedImage',
      type: 'reference',
      to: [{type: 'photo'}],
      validation: (rule) => rule.required(),
      group: GROUPS.METADATA.name,
    }),
    defineField({
      name: 'projectStatus',
      title: 'Project Status',
      type: 'string',
      initialValue: 'ACTIVE',
      options: {
        list: [
          {title: 'Coming Soon', value: 'COMING_SOON'},
          {title: 'Active', value: 'ACTIVE'},
          {title: 'Hidden', value: 'HIDDEN'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      group: GROUPS.METADATA.name,
    }),

    // Overview section
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: GROUPS.OVERVIEW.name,
    }),
    defineField({
      name: 'description',
      type: 'text',
      group: GROUPS.OVERVIEW.name,
    }),
    defineField({
      name: 'details',
      type: 'array',
      group: GROUPS.OVERVIEW.name,

      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'value', type: 'string'},
          ],
        },
      ],
    }),

    // Hero section
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: GROUPS.HERO.name,
      fields: [
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                // TODO: remove the title!
                // we can grab the photo title from the referenced photo
                defineField({
                  name: 'title',
                  type: 'string',
                }),
                defineField({
                  name: 'photo',
                  title: 'Photo',
                  type: 'reference',
                  to: [{type: 'photo'}],
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {title: 'title', media: 'photo.image'},
              },
            },
          ],
          validation: (rule) => rule.unique().error('Each photo must be unique'),
        }),
      ],
    }),

    // Before & After
    defineField({
      name: 'comparison',
      title: 'Comparison',
      type: 'object',
      group: GROUPS.BEFORE_AND_AFTER.name,
      fields: [
        defineField({
          name: 'images',
          title: 'Before & After Pairs',
          type: 'array',
          of: [
            {
              type: 'object',
              title: 'Before / After Pair',
              fields: [
                defineField({
                  name: 'before',
                  title: 'Before',
                  type: 'reference',
                  to: [{type: 'photo'}],
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'after',
                  title: 'After',
                  type: 'reference',
                  to: [{type: 'photo'}],
                  validation: (rule) => rule.required(),
                }),
              ],

              preview: {
                select: {
                  before: 'before.image',
                  after: 'after.image',
                },
                prepare({before, after}) {
                  return {
                    title: 'Before / After',
                    media: before || after,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),

    // Hotspot
    defineField({
      name: 'hotspot',
      title: 'Hotspot',
      type: 'object',
      group: GROUPS.HOTSPOT.name,
      fields: [
        defineField({
          name: 'hotspotImage',
          title: 'Hotspot Image',
          type: 'reference',
          to: [{type: 'photo'}],
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: 'hotspots',
          title: 'Hotspots',
          type: 'array',
          of: [
            {
              type: 'object',
              title: 'Hotspot',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'percentX',
                  title: 'Percent X Position',
                  type: 'number',
                  validation: (rule) => rule.required().min(0).max(1).precision(3),
                }),
                defineField({
                  name: 'percentY',
                  title: 'Percent Y Position',
                  type: 'number',
                  validation: (rule) => rule.required().min(0).max(1).precision(3),
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // CTA
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: GROUPS.CONTACT.name,
      fields: [
        {name: 'title', type: 'string'},
        {name: 'cta', type: 'string'},
        {
          name: 'src',
          title: 'Image',
          type: 'reference',
          to: [{type: 'photo'}],
          description: 'Select a photo to use in the contact section',
        },
      ],
      preview: {
        select: {
          title: 'title',
          media: 'src.image',
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage.image',
    },
  },
})
