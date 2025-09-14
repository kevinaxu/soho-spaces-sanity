import {defineField, defineType} from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'about',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'reference',
      to: [{type: 'photo'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Project grid',
      of: [
        {
          type: 'reference',
          to: [{type: 'photo'}],
        },
      ],
      validation: (rule) => rule.unique().error('Each photo must be unique'),
    }),
  ],
  preview: {
    select: {
      title: 'home',
      media: 'aboutImage',
    },
  },
})
