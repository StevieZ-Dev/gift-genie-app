import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    // ============================================================
    // CONFIGURATION SETTINGS FOR BUYER
    // ============================================================
    // INSTRUCTION: Replace "YOUR-TAG-HERE" with your Amazon Associate Tag ID.
    // This will automatically update all product links across the site.
    AMAZON_AFFILIATE_ID: "YOUR-TAG-HERE",
    // ============================================================
  },
};

export default nextConfig;
