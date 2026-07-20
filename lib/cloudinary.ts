// Cloudinary's "fetch" delivery type optimizes (resize, auto format/
// quality) any publicly reachable image URL on the fly — no upload step,
// so the free-tier stock photos in lib/content/data.ts don't need to live
// in a Cloudinary media library. Requires NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
// (see .env.example); until that's set, isCloudinaryConfigured() is false
// and callers should fall back to a placeholder rather than requesting a
// broken URL.
export function isCloudinaryConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
}

export function cloudinaryFetchUrl(
  sourceUrl: string,
  { width, height }: { width: number; height: number }
) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const transformations = `f_auto,q_auto,c_fill,w_${width},h_${height}`;
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformations}/${encodeURIComponent(sourceUrl)}`;
}
