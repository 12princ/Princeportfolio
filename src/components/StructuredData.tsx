import { Metadata } from 'next';

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'Organization';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://princepatel.dev';

  const getStructuredData = () => {
    switch (type) {
      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Priyanshu Patel',
          url: baseUrl,
          jobTitle: 'Full Stack Developer & Designer',
          description: 'Full-stack developer and designer specializing in modern web applications',
          sameAs: [
            // Add your social media profiles here
            // 'https://github.com/yourusername',
            // 'https://linkedin.com/in/yourusername',
            // 'https://twitter.com/yourusername',
          ],
          ...data,
        };
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Priyanshu Patel Portfolio',
          url: baseUrl,
          description: 'Portfolio website of Priyanshu Patel, full-stack developer and designer',
          ...data,
        };
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Priyanshu Patel',
          url: baseUrl,
          ...data,
        };
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

