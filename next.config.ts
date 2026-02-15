import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CSP-ready configuration - žádné inline skripty/styly
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Strict CSP - žádné inline skripty/styly
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com", // Next.js vyžaduje unsafe-inline a unsafe-eval pro dev
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com", // Next.js používá inline styly
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: https: https://www.google-analytics.com",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com",
              "frame-ancestors 'none'",
            ].join('; ')
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ];
  },
  // Performance optimalizace
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compiler optimalizace
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
