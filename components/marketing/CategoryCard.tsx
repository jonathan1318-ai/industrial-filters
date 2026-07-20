import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CloudinaryImage } from "@/components/marketing/CloudinaryImage";
import { CLOUDINARY_SIZES } from "@/lib/cloudinary";

export function CategoryCard({
  title,
  description,
  icon: Icon,
  href,
  imageUrl,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  imageUrl?: string;
}) {
  return (
    <Card size="sm" className="overflow-hidden py-0 ring-border transition-shadow hover:shadow-md">
      <Link
        href={href}
        className="group flex flex-col rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <CloudinaryImage
          src={imageUrl}
          alt={`${title} — representative photography`}
          className="aspect-[4/3] w-full rounded-none"
          width={CLOUDINARY_SIZES.card.width}
          height={CLOUDINARY_SIZES.card.height}
        />
        <CardContent className="flex flex-1 flex-col gap-2 py-4">
          <div className="flex items-center gap-2">
            <Icon className="size-4 shrink-0 text-primary" aria-hidden />
            <CardTitle asChild className="text-base group-hover:text-primary">
              <h3>{title}</h3>
            </CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
