"use client";

import FormField from "@/components/custom/FormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IErrorAPI } from "@/utils/global-types";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { updateThumbnailsSupplement } from "../../_utils/actions";
import { ISupplement } from "../../_utils/types";

export default function UploadThumbnailsSupplement({
  supplement,
}: {
  supplement: ISupplement;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [stateUploadThumbnailsSupplement, actionUploadThumbnailsSupplement] =
    useFormState<IErrorAPI, FormData>(updateThumbnailsSupplement, {
      idSupplement: supplement._id,
    });

  useEffect(() => {
    if (
      !stateUploadThumbnailsSupplement?.success &&
      stateUploadThumbnailsSupplement?.error
    ) {
      toast.error(stateUploadThumbnailsSupplement.error.message, {
        description: stateUploadThumbnailsSupplement.error?.errors?.files,
      });
    }
  }, [stateUploadThumbnailsSupplement]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Want more Thumbnails?</DialogTitle>
          <DialogDescription>
            You are going to upload thumbnails for{" "}
            <span className={"capitalize font-semibold"}>
              {supplement.name}
            </span>{" "}
            supplement.
          </DialogDescription>
        </DialogHeader>
        <form action={actionUploadThumbnailsSupplement}>
          <FormField
            typeField={"filepicker"}
            filepickerProps={{
              name: "files",
              label: "Thumbnails",
              accept: "image/*",
              multiple: true,
            }}
          />
          <FormField typeField={"submit"} />
        </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
