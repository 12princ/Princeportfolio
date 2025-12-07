import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import BotpressChat from '@/components/BotpressChat';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = generateSEOMetadata({
  title: 'Priyanshu Patel - Full Stack Developer & Designer',
  description: 'Portfolio of Priyanshu Patel, a full-stack developer and designer specializing in modern web applications, React, Next.js, and user-centered design.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://princepatel.dev',
  type: 'website',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://princepatel.dev';

  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Priyanshu Patel',
    url: baseUrl,
    jobTitle: 'Full Stack Developer & Designer',
    description: 'Full-stack developer and designer specializing in modern web applications',
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Priyanshu Patel Portfolio',
    url: baseUrl,
    description: 'Portfolio website of Priyanshu Patel, full-stack developer and designer',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <BotpressChat />
          <Analytics />
          <Script
            src="https://cdn.botpress.cloud/webchat/v3.3/inject.js"
            strategy="afterInteractive"
          />
          <Script
            src="https://files.bpcontent.cloud/2025/11/01/09/20251101091224-LSMQ7SFX.js"
            strategy="afterInteractive"
            defer
          />
        </ErrorBoundary>
      </body>
    </html>
  );
} 
