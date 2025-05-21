/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#6B7280',
        lime: '#D4FF1F',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#D4FF1F',
              '&:hover': {
                color: '#ccc',
              },
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            h4: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            code: {
              color: '#fff',
            },
            blockquote: {
              color: '#ccc',
              borderLeftColor: '#D4FF1F',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 