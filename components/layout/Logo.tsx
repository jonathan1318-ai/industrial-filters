import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Placeholder wordmark — swap for the real Firuta logo file (public/logo/)
 * once provided. Do not redesign the real logo when it lands; just replace
 * this component's markup with an <Image> pointing at the asset.
 */
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      aria-label="Firuta Tech Services — Home"
    >
      <span
        className={cn(
          "font-sans text-lg font-bold tracking-tight",
          isLight ? "text-white" : "text-primary"
        )}
      >
        FIRUTA
        <span className="text-secondary">.</span>
      </span>
      <span
        className={cn(
          "hidden text-xs font-medium tracking-wide uppercase sm:inline",
          isLight ? "text-white/70" : "text-muted-foreground"
        )}
      >
        Tech Services
      </span>
    </Link>
  );
}
