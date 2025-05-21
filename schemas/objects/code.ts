import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'code',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'Java', value: 'java' },
          { title: 'C++', value: 'cpp' },
          { title: 'C#', value: 'csharp' },
          { title: 'PHP', value: 'php' },
          { title: 'Ruby', value: 'ruby' },
          { title: 'Go', value: 'go' },
          { title: 'Rust', value: 'rust' },
          { title: 'Swift', value: 'swift' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'SQL', value: 'sql' },
          { title: 'Shell', value: 'shell' },
          { title: 'JSON', value: 'json' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Plain Text', value: 'text' },
        ],
      },
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
    }),
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
    },
    prepare({ language, code }) {
      return {
        title: language ? `${language.charAt(0).toUpperCase() + language.slice(1)} Code` : 'Code Block',
        subtitle: code ? code.substring(0, 50) + '...' : '',
      };
    },
  },
}); 