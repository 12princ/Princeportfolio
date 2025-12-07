# Production Deployment Guide

This guide will help you deploy your Next.js portfolio to production with all optimizations in place.

## Pre-Deployment Checklist

### 1. Environment Variables

Ensure all required environment variables are set in your hosting platform:

**Required:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset (usually 'production')
- `SANITY_API_TOKEN` - Sanity API token with read permissions

**Recommended:**
- `NEXT_PUBLIC_SITE_URL` - Your production site URL (e.g., https://yourdomain.com)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console verification code

### 2. Build Verification

Before deploying, run these commands to verify everything works:

```bash
# Type check
npm run type-check

# Lint check
npm run lint

# Production build test
npm run build:production

# Test production build locally
npm run build
npm run start
```

### 3. Security Checklist

- ✅ All sensitive data removed from README
- ✅ Environment variables properly configured
- ✅ Security headers configured in `next.config.js`
- ✅ CORS properly configured for Sanity Studio
- ✅ No API keys or tokens in code

### 4. Performance Optimizations

- ✅ Image optimization enabled (AVIF, WebP formats)
- ✅ Font optimization (display: swap, preload)
- ✅ Code splitting configured
- ✅ Compression enabled
- ✅ SWC minification enabled
- ✅ Bundle size optimization

### 5. SEO Optimizations

- ✅ Sitemap generated (`/sitemap.xml`)
- ✅ Robots.txt configured (`/robots.txt`)
- ✅ Structured data (JSON-LD) added
- ✅ Open Graph metadata configured
- ✅ Twitter Card metadata configured
- ✅ Canonical URLs set

## Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository:**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import project in Vercel dashboard

2. **Configure Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all required variables from `.env.example`

3. **Build Settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install`

4. **Deploy:**
   - Vercel will automatically deploy on every push to main branch
   - Preview deployments for pull requests

### Other Platforms

#### Netlify

1. Connect your repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables in Netlify dashboard

#### Self-Hosted (Docker)

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Check site loads correctly
- [ ] Test all pages (Home, About, Projects, Blog, Contact)
- [ ] Verify images load properly
- [ ] Check mobile responsiveness
- [ ] Test form submissions
- [ ] Verify analytics tracking

### 2. SEO Verification

- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt: `https://yourdomain.com/robots.txt`
- [ ] Verify sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check meta tags with [Open Graph Debugger](https://www.opengraph.xyz/)

### 3. Performance Testing

- [ ] Run Lighthouse audit (target: 90+ scores)
- [ ] Check Core Web Vitals
- [ ] Test page load speeds
- [ ] Verify image optimization

### 4. Security Testing

- [ ] Check security headers with [SecurityHeaders.com](https://securityheaders.com/)
- [ ] Verify HTTPS is enabled
- [ ] Test CORS configuration
- [ ] Check for exposed environment variables

## Monitoring

### Analytics

- Vercel Analytics is automatically enabled
- View analytics in Vercel dashboard

### Error Tracking

Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

### Performance Monitoring

- Vercel Analytics (included)
- Google Analytics (optional)
- Web Vitals monitoring

## Troubleshooting

### Build Fails

1. Check environment variables are set
2. Verify all dependencies are installed
3. Check for TypeScript errors: `npm run type-check`
4. Review build logs for specific errors

### Images Not Loading

1. Verify image domains in `next.config.js`
2. Check Sanity CDN configuration
3. Verify image URLs are correct

### SEO Issues

1. Verify `NEXT_PUBLIC_SITE_URL` is set correctly
2. Check sitemap generation
3. Verify metadata exports

## Maintenance

### Regular Updates

- Keep dependencies updated: `npm update`
- Monitor security advisories
- Update Next.js regularly
- Review and update Sanity schemas

### Performance Monitoring

- Review analytics monthly
- Check Core Web Vitals
- Optimize slow pages
- Update images and assets

## Support

For issues or questions:
1. Check Next.js documentation
2. Review Sanity documentation
3. Check Vercel documentation
4. Review project README

