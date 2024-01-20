"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { TrashIcon } from "@radix-ui/react-icons";

import {
  ICategory,
  TStateAlertCategory,
} from "@/app/(main)/categories/utils/types";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/FormError";
import { deleteCategory } from "@/app/(main)/categories/utils/actions";

interface IAlertCategoryProps {
  category: ICategory;
}

export default function AlertCategory({ category }: IAlertCategoryProps) {
  const refAlertCategory = useRef<HTMLDialogElement>(null);

  const [stateAlertCategory, alertCategoryAction] =
    useFormState<TStateAlertCategory>(deleteCategory, {
      idCategory: category._id,
    });

  useEffect(() => {
    if (stateAlertCategory.idDeletedCategory) {
      refAlertCategory.current.close();
    }
  }, [stateAlertCategory]);

  return (
    <div>
      <TrashIcon
        className={
          "h-7 w-7 rounded-full p-1 text-error hover:cursor-pointer hover:bg-error hover:bg-opacity-25"
        }
        onClick={() => refAlertCategory.current.showModal()}
      />
      <dialog
        role={"dialog"}
        className={
          "z-10 w-full rounded border-none backdrop:bg-black backdrop:bg-opacity-50"
        }
        ref={refAlertCategory}
      >
        <form
          action={alertCategoryAction}
          className={"flex flex-col items-center gap-y-10 bg-bg-200 p-4 pb-10"}
        >
          <h1>Warning Deletion!</h1>
          <div className={"relative w-full"}>
            <div
              className={
                "relative flex w-full items-center justify-center gap-x-4"
              }
            >
              <Button type={"submit"} className={"w-1/3"}>
                I'm sure
              </Button>
              <Button
                variant={"outline"}
                className={"absolute right-0"}
                onClick={() => refAlertCategory.current.close()}
                type={"reset"}
                formNoValidate={true}
                aria-label="Cancel"
              >
                Cancel
              </Button>
            </div>
            <FormError withIcon>
              <p>{stateAlertCategory.error?.message}</p>
            </FormError>
          </div>
        </form>
      </dialog>
    </div>
  );
}
