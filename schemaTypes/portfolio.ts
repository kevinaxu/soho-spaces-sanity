import {defineField, defineType} from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',

  fields: [
    // Projects
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'projectItem',
          title: 'Project Item',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'reference',
              to: [{type: 'photo'}],
              description: 'Project vertical thumbnail',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'project',
              title: 'Project',
              type: 'reference',
              to: [{type: 'project'}],
              description: 'Will be used to fetch project title, slug, status',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image.image',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Portfolio Page',
      }
    },
  },
})
