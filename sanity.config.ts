import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schema';
import { deskStructure } from './sanity/desk/deskStructure';

export default defineConfig({
  name: 'default',
  title: 'Portfolio Blog',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    visionTool()
  ],
  schema,
}); 