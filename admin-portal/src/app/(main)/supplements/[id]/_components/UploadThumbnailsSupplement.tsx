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
import { ICustomError, IErrorAPI } from "@/utils/global-types";
import { useEffect, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { updateThumbnailsSupplement } from "../../_utils/actions";
import { ISupplement } from "../../_utils/types";
import { CameraIcon, Pencil2Icon, ReloadIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createGenericFormData } from "@/utils/data-form";
import ImagePicker from "@/components/custom/image-picker";
import FormError from "@/components/form-error";

const FileSchema = z.object({
  files: z.array(z.instanceof(File)).optional(),
});

export default function UploadThumbnailsSupplement({
  supplement,
}: {
  supplement: ISupplement;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<ICustomError | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FileSchema>>({
    resolver: zodResolver(FileSchema),
    defaultValues: { files: undefined },
  });

  async function onSubmit(input: z.infer<typeof FileSchema>) {
    setError(undefined);
    startTransition(async () => {
      const formData = createGenericFormData(input);
      const err = await updateThumbnailsSupplement({
        idSupplement: supplement._id,
        formData,
      });
      if (err) setError(err);
      else {
        setOpen(false);
        toast.success("Successfully uploaded new thumbnails.");
      }
    });
  }

  const setFormWithSelectedFiles = (files?: File[]) => {
    if (files && Array.isArray(files) && files.length > 0) {
      form.setValue("files", files);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <CameraIcon />
          <span className={"ml-2"}>Upload Thumbnails</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Want more Thumbnails?</DialogTitle>
          <DialogDescription>
            You are going to upload thumbnails for{" "}
            <span className={"font-semibold capitalize"}>
              {supplement.name}
            </span>{" "}
            supplement.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-4 flex w-full flex-col items-center gap-y-4"
        >
          <ImagePicker setFormWithSelectedFiles={setFormWithSelectedFiles} />
          <FormError
            message={
              error?.errors?.files
                ? error.errors.files
                : error?.message && error.message
            }
          />

          <Button disabled={isPending} className="w-full">
            {isPending ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
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
