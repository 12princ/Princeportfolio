import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'slider',
  title: 'Text Slider',
  type: 'document',
  fields: [
    {
      name: 'items',
      title: 'Slider Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'Text Slider',
    },
  },
}); 