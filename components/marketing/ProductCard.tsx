import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/content";

export function ProductCard({
  product,
  category,
}: {
  product: Product;
  category?: { title: string };
}) {
  return (
    <Card className="ring-border transition-shadow hover:shadow-md">
      <CardContent>
        <Link
          href={`/products/${product.categorySlug}/${product.slug}`}
          className="group flex flex-col gap-2 rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {category && (
            <Badge variant="secondary" className="w-fit">
              {category.title}
            </Badge>
          )}
          <CardTitle className="text-base group-hover:text-primary">
            {product.title}
          </CardTitle>
          <CardDescription>{product.shortDescription}</CardDescription>
        </Link>
      </CardContent>
    </Card>
  );
}
