"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { PlusIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/InputError";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addCategory } from "@/app/(main)/categories/utils/actions";
import {
  ICategory,
  IStateAddCategory,
} from "@/app/(main)/categories/utils/types";

export default function AddCategory({ parent }: { parent: ICategory }) {
  const refAddModal = useRef<HTMLDialogElement>(null);

  const prevState: IStateAddCategory = {
    parent: parent._id ? parent._id : undefined,
  };

  const [result, addCategoryAction] = useFormState(addCategory, prevState);

  useEffect(() => {
    if (result.category) {
      refAddModal.current.close();
    }
  }, [result]);

  return (
    <div>
      <PlusIcon
        className={
          "h-7 w-7 rounded-full p-1 text-primary-300 hover:cursor-pointer hover:bg-primary-300 hover:bg-opacity-25"
        }
        onClick={() => refAddModal.current.showModal()}
      />
      <dialog
        role={"dialog"}
        ref={refAddModal}
        className={
          "z-10 w-full rounded border-none backdrop:bg-black backdrop:bg-opacity-50"
        }
      >
        <form
          action={addCategoryAction}
          className={"flex flex-col items-center gap-y-10 bg-bg-200 p-4 pb-10"}
        >
          <h1 className={"text-lg font-semibold"}>
            Create new category to {parent.name}
          </h1>
          <div className={"flex w-full flex-col gap-y-8"}>
            <div className={"relative w-full "}>
              <Input
                autoFocus
                type="text"
                name="name"
                placeholder="Name"
                className={"bg-bg-100 text-text-100"}
              />
              <InputError messageError={result?.error?.errors?.name} />
            </div>
            <div className={"relative w-full"}>
              <Textarea
                type="text"
                name="description"
                placeholder="Description"
                className={"bg-bg-100 text-text-100"}
              />
              <InputError messageError={result?.error?.errors?.description} />
            </div>
          </div>
          <div className={"relative w-full"}>
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
                onClick={() => refAddModal.current.close()}
                formMethod={"dialog"}
                type={"submit"}
              >
                Cancel
              </Button>
            </div>
            <InputError withIcon>
              <p>{result?.error?.message}</p>
              <p>{result?.error?.errors?.parent}</p>
            </InputError>
          </div>
        </form>
      </dialog>
    </div>
  );
}
