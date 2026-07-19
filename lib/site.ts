// Update NEXT_PUBLIC_SITE_URL in .env.local (and the host's env config)
// to the real production domain before launch.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.firuta-placeholder-domain.com";
