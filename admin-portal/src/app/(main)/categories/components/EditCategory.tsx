"use client";

import { useRef } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/InputError";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditCategory({ category }) {
  const refEditModal = useRef<HTMLDialogElement>(null);
  const handleOpenEditModal = () => {
    if (refEditModal.current) refEditModal.current.showModal();
  };
  const handleCloseEditModal = () => {
    if (refEditModal) refEditModal.current.close();
  };
  return (
    <div>
      <Pencil2Icon
        className={
          "h-7 w-7 rounded-full p-1 text-text-200 hover:cursor-pointer hover:bg-text-200 hover:bg-opacity-25"
        }
        onClick={() => handleOpenEditModal()}
      />
      <dialog
        ref={refEditModal}
        className={
          "z-10 w-full rounded border-none backdrop:bg-black backdrop:bg-opacity-50"
        }
      >
        <form className={"flex flex-col items-center gap-y-10 bg-bg-200 p-4"}>
          <h1>Dashboard ${category.name}'s category</h1>
          <div className={"flex w-full flex-col gap-y-4"}>
            <div className={"relative grid w-full gap-y-1.5"}>
              <Input
                required
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={category.name}
                className={"bg-bg-100 text-text-100"}
              />
              <InputError
                // messageError={state?.errors?.email}
                className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
              />
            </div>
            <div className={"relative grid w-full gap-y-1.5"}>
              <Textarea
                required
                type="text"
                name="description"
                placeholder="Description"
                defaultValue={category.description}
                className={"bg-bg-100 text-text-100"}
              />
              <InputError
                // messageError={state?.errors?.email}
                className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
              />
            </div>
          </div>
          <div
            className={
              "relative flex w-full items-center justify-center gap-x-4"
            }
          >
            <Button className={"w-1/3"}>Save</Button>
            <Button
              variant={"outline"}
              className={"absolute right-0"}
              onClick={() => handleCloseEditModal()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
