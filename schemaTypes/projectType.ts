import {defineField, defineType} from 'sanity'

const tags = ['Commercial', 'Residential', 'Kitchen', 'Powder Room', 'Living Room', 'Bedroom']

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'meta', title: 'Project Metadata'},
    {name: 'content', title: 'Project Content'},
    {name: 'portfolio', title: 'Portfolio Page'},
  ],

  fields: [
    // Project Metadata
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'slug',
      title: 'Project Slug',
      description: 'This is used as the URL of the project',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'projectCode',
      title: 'Project Code',
      description: 'Project code associated with this photo',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: 'meta',
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
          {title: 'Deprecated', value: 'DEPRECATED'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      group: 'meta',
    }),

    // Portfolio Page metadata
    defineField({
      name: 'featuredImage',
      title: 'FeaturedImage',
      type: 'reference',
      description: 'Photo that will be used on the Portfolio page',
      to: [{type: 'photo'}],
      validation: (rule) => rule.required(),
      group: 'portfolio',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Tags used for filtering on the Portfolio page',
      of: [{type: 'string', options: {list: tags}}],
      group: 'portfolio',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Lower numbers will appear first on the Portfolio page',
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
      group: 'portfolio',
    }),

    // Project Content
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'array',
      description: 'Hero portfolio at the top of each project',
      of: [
        {
          type: 'reference',
          to: [{type: 'photo'}],
        },
      ],
      validation: (rule) => rule.unique().error('Each photo must be unique'),
      group: 'content',
    }),
    defineField({
      name: 'intro',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Photo grid. Use increments of 6',
      of: [
        {
          type: 'reference',
          to: [{type: 'photo'}],
        },
      ],
      validation: (rule) => rule.unique().error('Each photo must be unique'),
      group: 'content',
    }),
    defineField({
      name: 'comparison',
      title: 'Comparison',
      type: 'comparison',
      group: 'content',
    }),
    defineField({
      name: 'story',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage.image',
    },
  },
})
