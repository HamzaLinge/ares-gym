"use client";

/**
 * ModalCategory - A Client React component for creating a new category or editing an existing one.
 *
 * @component
 *
 * @example
 * // Example usage of ModalCategory for creating a new category:
 * <ModalCategory type="CREATE" category={parentCategory} />
 *
 * @example
 * // Example usage of ModalCategory for editing an existing category:
 * <ModalCategory type="EDIT" category={categoryToEdit} />
 *
 * @param {TypesModalCategory} [props.type=TypesModalCategory.create] - The type of modal, either 'CREATE' or 'EDIT'.
 * @param {ICategory} props.category - The parent category when creating a new category, or the category to edit.
 *
 * @returns {JSX.Element} React component for category creation or editing.
 */

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import FormError from "@/components/ui/FormError";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  createCategory,
  editCategory,
} from "@/app/(main)/categories/utils/actions";
import {
  ICategory,
  TStateActionModalCategory,
} from "@/app/(main)/categories/utils/types";

const enum TypesModalCategory {
  create = "CREATE",
  edit = "EDIT",
}

type TModalCategory = TypesModalCategory;

interface IModalCategoryProps {
  type?: TModalCategory;
  category: ICategory;
}

export default function ModalCategory({
  type = TypesModalCategory.create,
  category,
}: IModalCategoryProps) {
  const refModalCategory = useRef<HTMLDialogElement>(null);

  const actionCategory =
    type === TypesModalCategory.create ? createCategory : editCategory;

  const prevStateModalCategory: TStateActionModalCategory = {
    id: category ? category._id : undefined,
  };

  const [stateModalCategory, addCategoryAction] = useFormState(
    actionCategory,
    prevStateModalCategory
  );

  useEffect(() => {
    if (stateModalCategory?.category) {
      refModalCategory.current.close();
    }
  }, [stateModalCategory]);

  return (
    <div>
      {type === TypesModalCategory.create ? (
        <PlusIcon
          className={
            "h-7 w-7 rounded-full p-1 text-primary-300 hover:cursor-pointer hover:bg-primary-300 hover:bg-opacity-25"
          }
          onClick={() => refModalCategory.current.showModal()}
        />
      ) : (
        <Pencil2Icon
          className={
            "h-7 w-7 rounded-full p-1 text-text-200 hover:cursor-pointer hover:bg-text-200 hover:bg-opacity-25"
          }
          onClick={() => refModalCategory.current.showModal()}
        />
      )}
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
            {type === TypesModalCategory.create ? "create" : "edit"}
          </h1>
          <div className={"flex w-full flex-col gap-y-8"}>
            <div className={"relative w-full "}>
              <Input
                autoFocus
                onFocus={(e) => {
                  const tmpValue = e.target.value;
                  e.target.value = "";
                  e.target.value = tmpValue;
                }}
                type="text"
                name="name"
                placeholder="Name"
                className={"bg-bg-100 text-text-100"}
                defaultValue={
                  type === TypesModalCategory.create ? "" : category.name
                }
              />
              <FormError
                messageError={stateModalCategory?.error?.errors?.name}
              />
            </div>
            <div className={"relative w-full"}>
              <Textarea
                type="text"
                name="description"
                placeholder="Description"
                className={"bg-bg-100 text-text-100"}
                defaultValue={
                  type === TypesModalCategory.create ? "" : category.description
                }
              />
              <FormError
                messageError={stateModalCategory?.error?.errors?.description}
              />
            </div>
          </div>
          <div className={"relative w-full"}>
            <div
              className={
                "relative flex w-full items-center justify-center gap-x-4"
              }
            >
              <Button type={"submit"} className={"w-1/3"}>
                {type === TypesModalCategory.create ? "New" : "Update"}
              </Button>
              <Button
                variant={"outline"}
                className={"absolute right-0"}
                onClick={() => refModalCategory.current.close()}
                type={"reset"}
                formNoValidate={true}
                aria-label="Cancel"
              >
                Cancel
              </Button>
            </div>
            <FormError withIcon>
              <p>{stateModalCategory?.error?.message}</p>
              <p>{stateModalCategory?.error?.errors?.parent}</p>
            </FormError>
          </div>
        </form>
      </dialog>
    </div>
  );
}
