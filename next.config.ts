import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['images.unsplash.com','images.pexels.com','plus.unsplash.com','as2.ftcdn.net','i.ibb.co',"cloud.appwrite.io","api.dicebear.com"]
  }
};

export default nextConfig;
