import { cn } from "@/lib/utils";
import CategoryNode from "@/app/(main)/categories/_components/CategoryNode";
import { ICategoryTree } from "../_utils/types";

export default function CategoryTree({
  categories,
}: {
  categories: ICategoryTree[];
}) {
  return (
    <div className={cn("w-full")}>
      {categories.map((category) => (
        <CategoryNode key={category.name} category={category} />
      ))}
    </div>
  );
}
