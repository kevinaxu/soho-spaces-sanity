import {defineType} from 'sanity'

export const mediaType = defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: ['image', 'video', 'gif'], // easy to expand later
        layout: 'radio',
      },
    },
    {
      name: 'file',
      title: 'File',
      type: 'file', // works for images, gifs, videos
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags', // gives you a nice tag input UI
      },
    },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
  ],
})
