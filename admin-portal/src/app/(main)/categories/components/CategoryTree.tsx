"use client";

import CategoryNode from "@/app/(main)/categories/components/CategoryNode";
import { cn } from "@/lib/utils";

export default function CategoryTree({ categories }) {
  return (
    <div className={cn("w-full")}>
      {categories.map((category) => (
        <CategoryNode key={category.name} category={category} />
      ))}
    </div>
  );
}
