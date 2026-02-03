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

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  mainImage,
  images,
  category,
  description,
  technologies,
  githubUrl,
  liveUrl,
  publishedAt
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  images,
  category,
  description,
  body,
  technologies,
  githubUrl,
  liveUrl,
  publishedAt
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

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
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
  body
}`;

export const getPostBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  body,
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

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  author->{
    name,
    image,
    bio
  },
  publishedAt,
  excerpt,
  body,
  tags,
  readingTime
}`;

export const getRecentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  author->{
    name,
    image
  }
}`;

export const recentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  author->{
    name,
    image
  }
}`;

// Timeline queries
export const getTimelineQuery = groq`*[_type == "timeline"] | order(order asc) {
  _id,
  year,
  title,
  company,
  description
}`;

// Document queries
export const getAllDocumentsQuery = groq`
*[_type == "officialDocument"] | order(order asc, publishedAt desc) {
  _id,
  title,
  description,
  category,
  file,
  order,
  publishedAt
}`;

export const getDocumentsByCategoryQuery = groq`
*[_type == "officialDocument" && category == $category] | order(order asc, publishedAt desc) {
  _id,
  title,
  description,
  category,
  file,
  order,
  publishedAt
}`;