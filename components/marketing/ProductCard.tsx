import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudinaryImage } from "@/components/marketing/CloudinaryImage";
import { CLOUDINARY_SIZES } from "@/lib/cloudinary";
import type { Product } from "@/lib/content";

export function ProductCard({
  product,
  category,
}: {
  product: Product;
  category?: { title: string; imageUrl?: string };
}) {
  return (
    <Card
      size="sm"
      className="overflow-hidden py-0 ring-border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      <Link
        href={`/products/${product.categorySlug}/${product.slug}`}
        className="group flex flex-col rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <CloudinaryImage
          src={category?.imageUrl}
          alt={`${category?.title ?? product.title} — representative product photography`}
          className="aspect-[4/3] w-full rounded-none"
          width={CLOUDINARY_SIZES.card.width}
          height={CLOUDINARY_SIZES.card.height}
        />
        <CardContent className="flex flex-1 flex-col gap-2 py-4">
          {category && (
            <Badge variant="secondary" className="w-fit">
              {category.title}
            </Badge>
          )}
          <CardTitle asChild className="text-base group-hover:text-primary">
            <h3>{product.title}</h3>
          </CardTitle>
          <CardDescription>{product.shortDescription}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
