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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ReactNode } from "react";

export default function DeleteCategory({
  category,
  children,
}: {
  category: ICategory;
  children: ReactNode;
}) {
  const handleDeleteCategory = async () => {
    deleteCategory(category._id).then((err) => {
      if (err) {
        toast.error(err.message);
      } else {
        toast.success(`${category.name} has been successfully deleted`);
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className="text-destructive">Are you absolutely sure?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            You're about to delete{" "}
            <span className="font-semibold capitalize">{category.name}</span>{" "}
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>I changed your mind</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"destructive"} onClick={handleDeleteCategory}>
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
