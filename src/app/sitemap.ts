import { MetadataRoute } from 'next';
import { client } from '@sanity/lib/client';
import { projectsQuery } from '@sanity/lib/queries';
import { getAllPostsQuery } from '@sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://princepatel.dev';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic project routes
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await client.fetch(projectsQuery);
    projectRoutes = (projects || []).map((project: any) => ({
      url: `${baseUrl}/projects/${project.slug?.current || ''}`,
      lastModified: project.publishedAt ? new Date(project.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    // Silently fail - don't break sitemap if projects can't be fetched
    console.error('Error fetching projects for sitemap:', error);
  }

  // Dynamic blog post routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch(getAllPostsQuery);
    blogRoutes = (posts || []).map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug?.current || ''}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    // Silently fail - don't break sitemap if posts can't be fetched
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}

