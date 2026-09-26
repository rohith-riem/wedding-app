import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/wedding-app",
  assetPrefix: "/wedding-app/",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
