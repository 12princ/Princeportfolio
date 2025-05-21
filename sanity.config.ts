import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Portfolio Blog',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes
  },
  cors: {
    origin: [
      'http://localhost:3000',
      'https://princeportfolio-ku9nnqtzx-priyanshupatel1253-gmailcoms-projects.vercel.app',
      'https://princeportfolio-6yav7ijxn-priyanshupatel1253-gmailcoms-projects.vercel.app',
      'https://0xlzfddb.api.sanity.io/v2024-03-13/data/query/production?query=*%5B_type+%3D%3D+%22project%22%5D+%7C+order%28_createdAt+desc%29+%7B%0A++_id%2C%0A++title%2C%0A++slug%2C%0A++mainImage%2C%0A++images%2C%0A++category%2C%0A++description%2C%0A++technologies%2C%0A++githubUrl%2C%0A++liveUrl%2C%0A++publishedAt%0A%7D&returnQuery=false',
      process.env.NEXT_PUBLIC_SITE_URL || '*'
    ],
    credentials: true
  }
}); 
