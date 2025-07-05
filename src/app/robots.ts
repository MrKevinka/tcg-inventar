import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // This will only work if you deploy to Vercel
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/sitemap.xml`,
    };
  } else {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }
}
