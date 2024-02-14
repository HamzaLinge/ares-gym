"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

import { IErrorAPI, ISuccessAPI } from "@/utils/global-types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type TDeleteAlert = {
  input: string | { [key: string]: string };
  deleteWhat: string;
  triggerElement: React.ReactNode;
  deleteAction: (input: any) => Promise<IErrorAPI>;
};

export default function DeleteAlert({
  input,
  deleteWhat,
  triggerElement,
  deleteAction,
}: TDeleteAlert) {
  const [open, setOpen] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const handleDeleteAction = async () => {
    setPending(true);
    const res = await deleteAction(input);
    if (res && !res.success) {
      toast.error("Error Deletion", {
        className: "!bg-bg-100",
        description: res.error.message,
      });
    } else {
      setOpen(false);
    }
    setPending(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{triggerElement}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Wait, what are you doing?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className={"capitalize font-semibold"}>{deleteWhat}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={handleDeleteAction}
            disabled={pending}
          >
            {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            <span>I'm sure</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}