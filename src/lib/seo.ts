import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

export const generateMetadata = ({
  title = 'Priyanshu Patel - Portfolio',
  description = 'Personal portfolio website showcasing projects, blog posts, and professional information.',
  image = '/og-image.jpg',
  url = process.env.NEXT_PUBLIC_SITE_URL || 'https://princepatel.dev',
  type = 'website',
}: SEOProps = {}): Metadata => {
  return {
    title,
    description,
    metadataBase: new URL(url),
    openGraph: {
      title,
      description,
      url,
      siteName: 'Prince Patel - Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}; 