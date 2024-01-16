"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { PlusIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import AlertError from "@/components/ui/AlertError";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addCategory } from "@/app/(main)/categories/actions";

export default function AddCategory({ category }) {
  const refAddModal = useRef<HTMLDialogElement>(null);

  const [result, addCategoryAction] = useFormState(
    addCategory,
    category._id ? category._id : null
  );

  const handleOpenAddModal = () => {
    if (refAddModal.current) refAddModal.current.showModal();
  };
  const handleCloseAddModal = () => {
    if (refAddModal) refAddModal.current.close();
  };

  useEffect(() => {
    if (result?.category) {
      handleCloseAddModal();
    }
  }, [result]);

  return (
    <div>
      <PlusIcon
        className={
          "h-7 w-7 rounded-full p-1 text-primary-300 hover:cursor-pointer hover:bg-primary-300 hover:bg-opacity-25"
        }
        onClick={() => handleOpenAddModal()}
      />
      <dialog
        ref={refAddModal}
        className={
          "z-10 w-full rounded border-none backdrop:bg-black backdrop:bg-opacity-50"
        }
      >
        <form
          action={addCategoryAction}
          className={"flex flex-col items-center gap-y-10 bg-bg-200 p-4"}
        >
          <h1 className={"text-lg font-semibold"}>
            Create new category to {category.name}
          </h1>
          <div className={"flex w-full flex-col gap-y-4"}>
            <div className={"relative grid w-full gap-y-1.5"}>
              <Input
                required
                autoFocus
                type="text"
                name="name"
                placeholder="Name"
                className={"bg-bg-100 text-text-100"}
              />
              <AlertError
                messageError={result?.errors?.email}
                className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
              />
            </div>
            <div className={"relative grid w-full gap-y-1.5"}>
              <Textarea
                required
                type="text"
                name="description"
                placeholder="Description"
                className={"bg-bg-100 text-text-100"}
              />
              <AlertError
                messageError={result?.errors?.email}
                className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
              />
            </div>
          </div>
          <div
            className={
              "relative flex w-full items-center justify-center gap-x-4"
            }
          >
            <Button type={"submit"} className={"w-1/3"}>
              Save
            </Button>
            <Button
              variant={"outline"}
              className={"absolute right-0"}
              onClick={() => handleCloseAddModal()}
              formMethod={"dialog"}
              type={"submit"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
