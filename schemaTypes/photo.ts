import {defineType, defineField} from 'sanity'

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Optional: associate this photo with a project',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'labels',
      title: 'Labels',
      type: 'array',
      description: 'Labels used for search / filtering',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      initialValue: 3,
      options: {
        list: [
          {title: '1', value: 1},
          {title: '2', value: 2},
          {title: '3', value: 3},
          {title: '4', value: 4},
          {title: '5', value: 5},
        ],
        layout: 'dropdown',
      },
      description: 'Priority for ordering (1 = highest, 5 = lowest)',
    }),
    defineField({
      name: 'isHidden',
      title: 'Hide From Explore',
      type: 'boolean',
      initialValue: false,
      description: 'If true, this photo will not appear on the Explore page.',
    }),
  ],
})
