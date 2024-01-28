import React from "react";
import { MoveIcon, Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";

import CategoryTree from "@/app/(main)/categories/_components/CategoryTree";
import Link from "next/link";
import { routePaths } from "@/utils/route-paths";
import DeleteCategory from "@/app/(main)/categories/_components/DeleteCategory";

export default function CategoryNode({ category }) {
  return (
    <div className={"flex w-full flex-col p-2 pr-0"}>
      <div
        className={
          "flex w-full items-center gap-x-4 rounded p-1 hover:bg-accent-200 hover:shadow"
        }
      >
        <div className={"grow"}>
          <div className="">{category.name}</div>
          <div className={"border-l border-l-bg-300 pl-2 text-xs font-light"}>
            {category.description}
          </div>
        </div>
        <div className={"flex gap-x-2"}>
          <Link href={routePaths.categories.children.create.path(category._id)}>
            <PlusIcon
              className={
                "h-7 w-7 rounded-full p-1 text-primary-300 hover:cursor-pointer hover:bg-primary-300 hover:bg-opacity-25"
              }
            />
          </Link>
          <Link href={routePaths.categories.children.update.path(category._id)}>
            <Pencil2Icon
              className={
                "h-7 w-7 rounded-full p-1 text-text-200 hover:cursor-pointer hover:bg-text-200 hover:bg-opacity-25"
              }
            />
          </Link>

          <MoveIcon
            className={
              "h-7 w-7 rounded-full p-1 text-text-200 hover:cursor-pointer hover:bg-text-200 hover:bg-opacity-25"
            }
          />
          <DeleteCategory category={category} />
        </div>
      </div>
      {category.children && category.children.length > 0 && (
        <div className={"ml-6 border-l border-l-bg-300"}>
          <CategoryTree categories={category.children} />
        </div>
      )}
    </div>
  );
}
