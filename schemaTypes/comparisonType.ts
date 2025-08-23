import {defineField, defineType} from 'sanity'

export const comparisonType = defineType({
  name: 'comparison',
  title: 'Before / After Comparison',
  type: 'object',
  fields: [
    defineField({
      name: 'before',
      title: 'Before Image',
      type: 'reference',
      to: [{type: 'photo'}],
    }),
    defineField({
      name: 'after',
      title: 'After Image',
      type: 'reference',
      to: [{type: 'photo'}],
    }),
  ],
})
