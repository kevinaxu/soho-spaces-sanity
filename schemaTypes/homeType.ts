import {defineField, defineType} from 'sanity'

const GROUPS = {
  HERO: {name: 'hero', title: 'Hero Video'},
  DESIGN: {name: 'design', title: 'Design Philosophy'},
  SERVICES: {name: 'services', title: 'Services'},
  FEATURED: {name: 'featured', title: 'Featured Project'},
  TESTIMONIALS: {name: 'testimonials', title: 'Testimonials'},
  EXPLORE: {name: 'explore', title: 'Explore'},
  CONTACT: {name: 'contact', title: 'CTA'},
}
export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  groups: Object.values(GROUPS),

  fields: [
    // Hero Video
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: GROUPS.HERO.name,
      fields: [
        defineField({
          name: 'src',
          title: 'Video Source',
          type: 'file',
          options: {
            accept: 'video/mp4,video/webm,video/ogg',
          },
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // Design philosophy
    defineField({
      name: 'designPhilosophy',
      title: 'Design Philosophy',
      type: 'object',
      group: GROUPS.DESIGN.name,
      fields: [
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
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // Services section
    defineField({
      name: 'services',
      title: 'Services',
      type: 'object',
      group: GROUPS.SERVICES.name,
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'string',
          title: 'Description',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'serviceCard',
              title: 'Service Card',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Card Title',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'bg',
                  type: 'string',
                  title: 'Background Color',
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Card Description',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Featured project section
    defineField({
      name: 'featuredProject',
      title: 'Featured Project',
      type: 'object',
      group: GROUPS.FEATURED.name,
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
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'imageItem',
              title: 'Image Item',
              fields: [
                defineField({
                  name: 'src',
                  title: 'Photo',
                  type: 'reference',
                  to: [{type: 'photo'}],
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                }),
                defineField({
                  name: 'subtitle',
                  type: 'string',
                  title: 'Subtitle',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Testimonials section
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      group: GROUPS.TESTIMONIALS.name,
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'quote',
              type: 'text',
              title: 'Quotee',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'author',
              type: 'string',
              title: 'Author',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Job Title',
            }),
          ],
        },
      ],
    }),

    // Explore Section
    defineField({
      name: 'explore',
      title: 'Explore',
      type: 'object',
      group: GROUPS.EXPLORE.name,
      fields: [
        {name: 'title', type: 'string'},
        {
          name: 'description',
          type: 'string',
        },
        defineField({
          name: 'images',
          title: 'Images',
          description: 'Use 9 images (3x3 desktop, 2x4 mobile)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'photo',
                  title: 'Photo',
                  type: 'reference',
                  to: [{type: 'photo'}],
                  validation: (rule) => rule.required(),
                }),
                // defineField({name: 'flex', type: 'number'}),
              ],
              preview: {select: {title: 'title', media: 'photo.image'}},
            },
          ],
        }),
      ],
    }),

    // CTA
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: GROUPS.CONTACT.name,
      fields: [
        {name: 'title', type: 'string'},
        {name: 'cta', type: 'string'},
        {
          name: 'src',
          title: 'Image',
          type: 'reference',
          to: [{type: 'photo'}],
          description: 'Select a photo to use in the contact section',
        },
      ],
      preview: {
        select: {
          title: 'title',
          media: 'src.image',
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'home',
      media: 'aboutImage',
    },
  },
})
