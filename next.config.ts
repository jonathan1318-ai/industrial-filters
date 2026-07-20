import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudinary's "fetch" delivery type proxies + optimizes an external
    // source image (see lib/cloudinary.ts) — no upload step needed for
    // the placeholder stock photos in lib/content/data.ts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
