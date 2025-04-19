import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-13',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/studio' : '/studio',
  },
  perspective: 'published',
  withCredentials: true,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source).auto('format').fit('max').quality(80);
}

export const blogQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  author->{
    name,
    image
  },
  publishedAt,
  excerpt,
  readingTime,
  tags
}`; 