import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import CategoryTree from "@/app/(main)/categories/_components/CategoryTree";
import { Button } from "@/components/ui/button";
import { routePaths } from "@/utils/route-paths";
import Link from "next/link";
import { ICategoryTree } from "../_utils/types";

export default function CategoryNode({
  category,
}: {
  category: ICategoryTree;
}) {
  return (
    <div className={"flex w-full flex-col"}>
      <div
        className={
          "border-border bg-card my-1 flex h-16 w-full items-center border px-2 py-1"
        }
      >
        <div className={"grow"}>
          <div className={"font-semibold capitalize"}>{category.name}</div>
          <div className={"text-xs font-light"}>{category.description}</div>
        </div>
        <Link href={routePaths.categories.children.category.path(category._id)}>
          <Button variant={"outline"} className="flex items-center gap-x-2">
            <DotsHorizontalIcon className="h-5 w-5" />
            <span>More</span>
          </Button>
        </Link>
      </div>
      {category.children && category.children.length > 0 && (
        <div className={"ml-6"}>
          <CategoryTree categories={category.children} />
        </div>
      )}
    </div>
  );
}
