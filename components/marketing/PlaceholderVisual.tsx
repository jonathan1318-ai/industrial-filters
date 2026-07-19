import { AirVent, Droplets, Filter, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Decorative stand-in for real product/facility photography. Swap for
 * next/image once photos are supplied — see CLAUDE.md's imagery rule.
 * Purely decorative, so it's aria-hidden rather than needing alt text.
 */
export function PlaceholderVisual({ className }: { className?: string }) {
  const icons = [Filter, Droplets, AirVent, ShieldCheck];

  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-lg bg-primary",
        "bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--secondary),transparent_60%),transparent_60%)]",
        className
      )}
    >
      <div className="grid h-full grid-cols-2 gap-px bg-white/10 p-px">
        {icons.map((Icon, i) => (
          <div
            key={i}
            className="flex items-center justify-center bg-primary/95 p-8"
          >
            <Icon className="size-10 text-white/70 sm:size-14" strokeWidth={1.25} />
          </div>
        ))}
      </div>
    </div>
  );
}
