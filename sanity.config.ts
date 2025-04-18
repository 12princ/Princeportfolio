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
      process.env.NEXT_PUBLIC_SITE_URL || '*'
    ],
    credentials: true
  }
}); 
