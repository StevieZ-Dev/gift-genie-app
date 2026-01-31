import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  env: {
    AMAZON_AFFILIATE_ID: "giftgenie0c4-20", 
  },
};

export default nextConfig;