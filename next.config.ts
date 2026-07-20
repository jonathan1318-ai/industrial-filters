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
    // These are static placeholder photos, not user content — they only
    // change when someone edits lib/content/data.ts and redeploys, which
    // invalidates the build/CDN cache anyway. A long TTL means Next's own
    // image optimizer re-requests the (already-cached-by-Cloudinary)
    // source far less often. Default in Next 16 is 4 hours; this is 30 days.
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
