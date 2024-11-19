import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  webpack(config) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },

  reactStrictMode: true,
};

export default nextConfig;
