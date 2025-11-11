import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  experimental: {
    turbo: {
      root: __dirname,
    },
  },

  outputFileTracingRoot: __dirname,
};

export default nextConfig;
