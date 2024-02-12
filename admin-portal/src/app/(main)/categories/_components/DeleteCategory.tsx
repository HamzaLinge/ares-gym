"use client";

import { ICategory } from "@/app/(main)/categories/_utils/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteCategory } from "@/app/(main)/categories/_utils/actions";

type TDeleteCategoryProps = {
  category: ICategory;
};

export default function DeleteCategory({ category }: TDeleteCategoryProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon
          className={
            "h-7 w-7 rounded-full p-1 text-error hover:cursor-pointer hover:bg-error hover:bg-opacity-25"
          }
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <b>{category.name}</b> category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteCategory(category._id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
