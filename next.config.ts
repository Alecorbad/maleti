import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: "/maleti",
  trailingSlash: true,
  async redirects() {
    return ([
      {
        source: '/',
        destination: '/maleti',
        permanent: true,
        basePath: false,
      },
    ]);
  },
  images: {
    unoptimized: true
  },
 };

export default nextConfig;
