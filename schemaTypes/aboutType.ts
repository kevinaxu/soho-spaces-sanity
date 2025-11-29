import {defineField, defineType} from 'sanity'

const GROUPS = {
  PROGRESSION: {name: 'progression', title: 'Progression'},
  TIMELINE: {name: 'timeline', title: 'Timeline'},
  TEAM: {name: 'team', title: 'Team'},
  TRAVEL: {name: 'travel', title: 'Travel Gallery'},
}
export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  groups: Object.values(GROUPS),

  fields: [
    // Progression Cross Fade
    defineField({
      name: 'progression',
      title: 'Progression',
      type: 'array',
      group: GROUPS.PROGRESSION.name,
      of: [
        {
          type: 'object',
          name: 'progressImage',
          title: 'Progress Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'reference',
              to: [{type: 'photo'}],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'image.title',
              media: 'image.image',
            },
          },
        },
      ],
    }),

    // Timeline
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      group: GROUPS.TIMELINE.name,
      of: [
        {
          type: 'object',
          name: 'timelineStep',
          title: 'Timeline Step',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Icon Name',
              description: 'Provide the MUI icon name (e.g., "Groups", "Construction")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'reference',
              to: [{type: 'photo'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
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

    // Team
    defineField({
      name: 'team',
      title: 'Team',
      type: 'array',
      group: GROUPS.TEAM.name,
      of: [
        {
          type: 'object',
          name: 'teamMember',
          title: 'Team Member',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'reference',
              to: [{type: 'photo'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'content',
              type: 'text',
              title: 'Bio',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image.image',
            },
          },
        },
      ],
    }),

    // Travel Gallery
    defineField({
      name: 'travel',
      title: 'Travel',
      type: 'array',
      group: GROUPS.TRAVEL.name,
      of: [
        {
          type: 'object',
          name: 'travelItem',
          title: 'Travel Item',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'reference',
              to: [{type: 'photo'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subtitle',
              type: 'string',
              title: 'Subtitle',
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
        title: 'About Page',
      }
    },
  },
})
