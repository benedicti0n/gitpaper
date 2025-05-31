import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add your existing config options here

  webpack(config, { isServer }) {
    if (isServer) {
      config.externals.push({
        'puppeteer-core': 'commonjs puppeteer-core',
      });
    }
    return config;
  },
};

export default nextConfig;
