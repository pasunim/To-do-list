/* cspell:disable-next-line */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - turbopack is a valid experimental flag in Next.js 15+
    turbopack: {
      root: ".",
    },
  },
};

export default nextConfig;
