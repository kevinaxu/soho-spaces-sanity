import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
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
    }),
    defineField({
      name: 'intro',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Photo grid. Use increments of 4',
      of: [
        {
          type: 'reference',
          to: [{type: 'photo'}],
        },
      ],
      validation: (rule) => rule.unique().error('Each photo must be unique'),
    }),
    defineField({
      name: 'comparison',
      title: 'Comparison',
      type: 'comparison',
    }),
    defineField({
      name: 'story',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'hero.0.image', // use the first hero photo as preview
    },
  },
})
