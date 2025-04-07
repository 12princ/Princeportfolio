import { groq } from 'next-sanity';

// About queries
export const getAboutQuery = groq`*[_type == "about"][0]`;

// Project queries
export const getAllProjectsQuery = groq`
*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  description,
  category,
  technologies,
  featured,
  publishedAt
}`;

export const getFeaturedProjectsQuery = groq`
*[_type == "project" && featured == true] | order(publishedAt desc)[0...6] {
  _id,
  title,
  slug,
  mainImage,
  description,
  category,
  technologies,
  featured,
  publishedAt
}`;

export const getProjectBySlugQuery = groq`
*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  images,
  description,
  content,
  category,
  technologies,
  publishedAt,
  liveUrl,
  githubUrl
}`;

export const getProjectsByCategoryQuery = groq`
*[_type == "project" && category == $category] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  description,
  category,
  technologies,
  publishedAt
}`;

// Service queries
export const getAllServicesQuery = groq`
*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  icon,
  description,
  featured,
  keyPoints
}`;

export const getFeaturedServicesQuery = groq`
*[_type == "service" && featured == true] | order(order asc) {
  _id,
  title,
  slug,
  icon,
  description,
  keyPoints
}`;

export const getServiceBySlugQuery = groq`
*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  icon,
  description,
  detailedDescription,
  keyPoints
}`;

// Blog queries
export const getAllPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  tags,
  publishedAt,
  readingTime,
  author->{
    name,
    image
  }
}`;

export const getPostBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  content,
  tags,
  publishedAt,
  readingTime,
  author->{
    name,
    image,
    bio,
    socialLinks
  }
}`;

export const getRecentPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  readingTime,
  author->{
    name,
    image
  }
}`;

// Contact query
export const getContactQuery = groq`*[_type == "contact"][0]`; 