# Portfolio Blog

A modern portfolio and blog built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS.

## Features

- Modern and responsive design
- Blog functionality with Sanity CMS integration
- Custom animations with Framer Motion
- TypeScript support
- Tailwind CSS for styling
- SEO optimized

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-blog.git
cd portfolio-blog
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Sanity credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-13
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── (pages)/        # Page components
│   ├── api/            # API routes
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # UI components
│   └── blog/          # Blog-specific components
├── lib/               # Utility functions and configurations
└── styles/            # Global styles
```

## Technologies Used

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Sanity CMS](https://www.sanity.io/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 