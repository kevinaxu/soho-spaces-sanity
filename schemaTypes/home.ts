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
          name: 'video',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/mp4,video/webm,video/ogg',
          },
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: {media: 'video'},
      },
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
        }),
      ],
    }),

    // Services
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

    // Featured project
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
                  name: 'image',
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
              preview: {
                select: {
                  title: 'image.title',
                  media: 'image.image',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // Testimonials
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      group: GROUPS.TESTIMONIALS.name,
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'quote',
              type: 'text',
              title: 'Quote',
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
          preview: {
            select: {
              title: 'author',
              subtitle: 'title',
            },
          },
        }),
      ],
    }),

    // Explore section
    defineField({
      name: 'explore',
      title: 'Explore',
      type: 'object',
      group: GROUPS.EXPLORE.name,
      fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'description', type: 'string'}),
        defineField({
          name: 'images',
          title: 'Images',
          description: 'Use 9 images (3x3 desktop, 2x4 mobile)',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'exploreImage',
              title: 'Explore Image',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Photo',
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
            }),
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
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'cta', type: 'string'}),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'reference',
          to: [{type: 'photo'}],
        }),
      ],
      preview: {
        select: {
          title: 'title',
          media: 'image.image',
        },
      },
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
