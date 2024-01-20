"use client";

import CategoryNode from "@/app/(main)/categories/components/CategoryNode";
import { cn } from "@/lib/utils";

import { useDroppable } from "@dnd-kit/core";

export default function CategoryTree({ categories }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const styleDroppable = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} className={cn("w-full")} style={styleDroppable}>
      {categories.map((category) => (
        <CategoryNode key={category.name} category={category} />
      ))}
    </div>
  );
}
