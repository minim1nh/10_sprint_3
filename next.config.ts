import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },  
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
