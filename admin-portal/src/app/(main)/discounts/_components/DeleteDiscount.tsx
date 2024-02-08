"use client";

import React from "react";
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
import { TDiscount } from "@/app/(main)/discounts/_utils/types";
import { deleteDiscount } from "@/app/(main)/discounts/_utils/actions";
import { useToast } from "@/components/ui/use-toast";

type TDeleteDiscountProps = {
  discount: TDiscount;
};

export default function DeleteDiscount({ discount }: TDeleteDiscountProps) {
  const { toast } = useToast();

  const handleDeleteDiscount = async () => {
    const res = await deleteDiscount(discount._id);
    if (!res.success) {
      console.error(res);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: res.error.message,
        // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } else {
      toast({
        title: "Successful Deletion.",
        description: (
          <p>
            <span className={"font-semibold"}>
              {res.data.deletedDiscount.title}
            </span>{" "}
            has successfully deleted.
          </p>
        ),
        // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  };
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
            <span className={"font-semibold capitalize"}>{discount.title}</span>{" "}
            discount.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/*<AlertDialogAction onClick={handleDeleteDiscount}>*/}
          {/*  Continue*/}
          {/*</AlertDialogAction>*/}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
