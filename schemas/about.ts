import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Professional Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'github',
          title: 'GitHub',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Skill Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'proficiency',
              title: 'Proficiency',
              type: 'number',
              options: {
                list: [
                  { title: 'Beginner', value: 1 },
                  { title: 'Intermediate', value: 2 },
                  { title: 'Advanced', value: 3 },
                  { title: 'Expert', value: 4 },
                ],
              },
              validation: (Rule) => Rule.required().min(1).max(4),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'proficiency',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'resumeURL',
      title: 'Resume/CV URL',
      type: 'file',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
  },
}); 