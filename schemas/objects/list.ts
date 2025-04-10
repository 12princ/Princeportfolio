import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'list',
  title: 'List',
  type: 'object',
  fields: [
    defineField({
      name: 'listType',
      title: 'List Type',
      type: 'string',
      options: {
        list: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Number', value: 'number' },
        ],
      },
      initialValue: 'bullet',
    }),
    defineField({
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      listType: 'listType',
      items: 'items',
    },
    prepare({ listType, items }) {
      return {
        title: listType === 'bullet' ? 'Bullet List' : 'Numbered List',
        subtitle: items ? `${items.length} items` : 'No items',
      };
    },
  },
}); 