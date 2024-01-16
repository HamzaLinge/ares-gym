import { MoveIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import CategoryTree from "@/app/(main)/categories/components/CategoryTree";
import EditCategory from "@/app/(main)/categories/components/EditCategory";
import AddCategory from "@/app/(main)/categories/components/AddCategory";

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
          <AddCategory category={category} />
          <EditCategory category={category} />
          <MoveIcon
            className={
              "h-7 w-7 rounded-full p-1 text-text-200 hover:cursor-pointer hover:bg-text-200 hover:bg-opacity-25"
            }
          />
          <TrashIcon
            className={
              "h-7 w-7 rounded-full p-1 text-error hover:cursor-pointer hover:bg-error hover:bg-opacity-25"
            }
          />
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
