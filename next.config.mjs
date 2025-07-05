import BundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'en.onepiece-cardgame.com',
        pathname: '/**',
      },
    ],
  },
};

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
