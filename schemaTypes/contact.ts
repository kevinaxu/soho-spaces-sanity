import {defineField, defineType} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'reference',
      to: [{type: 'photo'}],
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Contact Us Page',
        media: 'image.image',
      }
    },
  },
})
