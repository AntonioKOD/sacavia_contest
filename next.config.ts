import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lkmjfsdfkqqgxv8z.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sacavia.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sacavia.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vote.sacavia.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    minimumCacheTTL: 31536000,
  },
  
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-popover',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
    ],
  },
  
  // Environment variables for the contest app
  env: {
    NEXT_PUBLIC_MAIN_APP_URL: process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://sacavia.com',
    NEXT_PUBLIC_CONTEST_APP_URL: process.env.NEXT_PUBLIC_CONTEST_APP_URL || 'https://vote.sacavia.com',
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sacavia.com/api',
  },
  
  // Headers for CORS and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Note: Removed API redirects to allow contest app to handle its own API routes
  // async redirects() {
  //   return [];
  // },
};

export default nextConfig;
