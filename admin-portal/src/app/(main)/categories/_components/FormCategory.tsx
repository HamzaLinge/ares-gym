"use client";

import React from "react";
import { useFormState } from "react-dom";

import {
  TFormCategoryProps,
  VariantsFormCategory,
} from "@/app/(main)/categories/_utils/types";
import { IErrorAPI } from "@/utils/global-types";

import { cn } from "@/lib/utils";

import FormError from "@/components/ui/FormError";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function FormCategory({
  actionCategory,
  category,
}: TFormCategoryProps) {
  const isToUpdate = category
    ? category.variant === VariantsFormCategory.update
    : false;

  const updatedCategory = isToUpdate ? category!.data : undefined;

  const [stateFormCategory, actionFormCategory] = useFormState<
    IErrorAPI,
    FormData
  >(actionCategory, { id: category ? category.data._id : undefined });

  return (
    <form
      action={actionFormCategory}
      className={cn(
        "ml-6 flex w-full flex-col border-l border-l-bg-300 bg-bg-100 transition-all transition-height duration-1000 ease-in-out"
      )}
    >
      <h1 className={"text-lg font-semibold"}>
        {!isToUpdate ? "create" : "edit"}
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
            defaultValue={updatedCategory ? updatedCategory.name : ""}
          />
          <FormError messageError={stateFormCategory?.error?.errors?.name} />
        </div>
        <div className={"relative w-full"}>
          <Textarea
            type="text"
            name="description"
            placeholder="Description"
            className={"bg-bg-100 text-text-100"}
            defaultValue={
              updatedCategory
                ? updatedCategory.description
                  ? updatedCategory.description
                  : ""
                : ""
            }
          />
          <FormError
            messageError={stateFormCategory?.error?.errors?.description}
          />
        </div>
      </div>
      <div className={"relative w-full"}>
        <div
          className={"relative flex w-full items-center justify-center gap-x-4"}
        >
          <Button type={"submit"} className={"w-1/3"}>
            Save
          </Button>
          <Button
            variant={"outline"}
            className={"absolute right-0"}
            // onClick={() => props.close()}
            type={"reset"}
            formNoValidate={true}
            aria-label="Cancel"
          >
            Cancel
          </Button>
        </div>
        <FormError withIcon>
          <p>{stateFormCategory?.error?.message}</p>
          <p>{stateFormCategory?.error?.errors?.parent}</p>
        </FormError>
      </div>
    </form>
  );
}
