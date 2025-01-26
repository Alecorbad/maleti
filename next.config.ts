import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: "/maleti",
  images: {
    unoptimized: true
  },
};

export default nextConfig;
