import Image from "next/image";
import { cloudinaryFetchUrl, isCloudinaryConfigured } from "@/lib/cloudinary";
import { PlaceholderVisual } from "@/components/marketing/PlaceholderVisual";
import { cn } from "@/lib/utils";

/**
 * Renders a real photo via Cloudinary's fetch transform when
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set and a source URL is given;
 * otherwise falls back to the decorative PlaceholderVisual so the site
 * never requests a broken image URL. See lib/cloudinary.ts.
 */
export function CloudinaryImage({
  src,
  alt,
  className,
  width = 800,
  height = 800,
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  if (!src || !isCloudinaryConfigured()) {
    return <PlaceholderVisual className={className} />;
  }

  return (
    <Image
      src={cloudinaryFetchUrl(src, { width, height })}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("rounded-lg object-cover", className)}
    />
  );
}
