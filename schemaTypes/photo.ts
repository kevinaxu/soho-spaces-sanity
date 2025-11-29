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
      name: 'projectCode',
      title: 'Project Code',
      description: 'Project code associated with this photo',
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

    // add field for priority
    // add field for hiding from explore page
  ],
})
