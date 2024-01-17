"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { PlusIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/InputError";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  createCategory,
  editCategory,
} from "@/app/(main)/categories/utils/actions";
import {
  ICategory,
  IStateActionModalCategory,
} from "@/app/(main)/categories/utils/types";

enum TypeModalCategory {
  create = "CREATE",
  edit = "EDIT",
}
type TModalCategory = TypeModalCategory;

interface IModalCategoryProps {
  type: TModalCategory;
  category: ICategory;
}

export default function ModalCategory({
  type = TypeModalCategory.create,
  category,
}: IModalCategoryProps) {
  const refModalCategory = useRef<HTMLDialogElement>(null);

  const actionCategory =
    type === TypeModalCategory.create ? createCategory : editCategory;

  const prevState: IStateActionModalCategory = {
    id: category ? category._id : undefined,
  };

  const [result, addCategoryAction] = useFormState(createCategory, prevState);

  useEffect(() => {
    if (result.category) {
      refModalCategory.current.close();
    }
  }, [result]);

  return (
    <div>
      <PlusIcon
        className={
          "h-7 w-7 rounded-full p-1 text-primary-300 hover:cursor-pointer hover:bg-primary-300 hover:bg-opacity-25"
        }
        onClick={() => refModalCategory.current.showModal()}
      />
      <dialog
        role={"dialog"}
        ref={refModalCategory}
        className={
          "z-10 w-full rounded border-none backdrop:bg-black backdrop:bg-opacity-50"
        }
      >
        <form
          action={addCategoryAction}
          className={"flex flex-col items-center gap-y-10 bg-bg-200 p-4 pb-10"}
        >
          <h1 className={"text-lg font-semibold"}>
            {type === TypeModalCategory.create ? "create" : "edit"}
          </h1>
          <div className={"flex w-full flex-col gap-y-8"}>
            <div className={"relative w-full "}>
              <Input
                autoFocus
                type="text"
                name="name"
                placeholder="Name"
                className={"bg-bg-100 text-text-100"}
                defaultValue={category ? category.name : ""}
              />
              <InputError messageError={result?.error?.errors?.name} />
            </div>
            <div className={"relative w-full"}>
              <Textarea
                type="text"
                name="description"
                placeholder="Description"
                className={"bg-bg-100 text-text-100"}
                defaultValue={category ? category.description : ""}
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
                {type === TypeModalCategory.create ? "New" : "Update"}
              </Button>
              <Button
                variant={"outline"}
                className={"absolute right-0"}
                onClick={() => refModalCategory.current.close()}
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
