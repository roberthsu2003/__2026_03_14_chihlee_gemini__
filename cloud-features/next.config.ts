import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // 允許 Unsplash 的圖片
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // 允許 Vercel Blob（範例 4 會用到）
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
