import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'imge.pl',
      },
      {
        protocol: 'https',
        hostname: 'upload.cdn.baselinker.com',
      }
    ],
  },
};

export default nextConfig;