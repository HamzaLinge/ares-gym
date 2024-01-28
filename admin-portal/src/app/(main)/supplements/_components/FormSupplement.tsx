"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FormError from "@/components/ui/FormError";
import { ICategory, ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { IErrorAPI } from "@/utils/global-types";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";

interface IFormProductProps {
  categories: ICategoryTree[];
  actionSupplement: (
    state: { idSupplement?: string },
    formData: FormData
  ) => Promise<IErrorAPI>;
  supplement?: ISupplement;
}

export default function FormSupplement({
  categories,
  actionSupplement,
  supplement,
}: IFormProductProps) {
  const [stateFormProduct, actionFormProduct] = useFormState<
    IErrorAPI,
    FormData
  >(actionSupplement, supplement ? { idSupplement: supplement._id } : null);

  const isICategory = (value: any): value is ICategory => {
    return !!value?._id;
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(
    supplement && isICategory(supplement.category)
      ? supplement.category._id
      : ""
  );

  function renderCategoryOptions(categoryOptions: ICategoryTree[]) {
    return categoryOptions.map((option) => (
      <DropdownMenuGroup key={option._id} className={"ml-4 first:ml-0"}>
        <DropdownMenuRadioItem
          value={option._id}
          className={cn(option._id === selectedCategory && "bg-bg-200")}
        >
          {option.name}
        </DropdownMenuRadioItem>
        {option.children ? renderCategoryOptions(option.children) : undefined}
      </DropdownMenuGroup>
    ));
  }

  return (
    <form className={"w-full"} action={actionFormProduct}>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Name"}
          className={"text-text-100"}
          defaultValue={supplement ? supplement.name : ""}
          autoFocus
          onFocus={(e) => {
            const tmpValue = e.target.value;
            e.target.value = "";
            e.target.value = tmpValue;
          }}
        />
        <FormError
          messageError={stateFormProduct?.error?.errors?.name}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Input
              type={"text"}
              readOnly
              value={selectedCategory}
              name={"category"}
              placeholder={"Category"}
              className={"text-text-100"}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              {renderCategoryOptions(categories)}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <FormError
          messageError={stateFormProduct?.error?.errors?.category}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          type={"number"}
          name={"price"}
          placeholder={"Price"}
          className={"text-text-100"}
          defaultValue={supplement ? supplement.price : ""}
        />
        <FormError
          messageError={stateFormProduct?.error?.errors?.price}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          type={"number"}
          name={"stock"}
          placeholder={"Stock"}
          className={"text-text-100"}
          defaultValue={supplement ? supplement.stock : ""}
        />
        <FormError
          messageError={stateFormProduct?.error?.errors?.stock}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Textarea
          name={"description"}
          placeholder={"Description"}
          className={"text-text-100"}
          defaultValue={
            supplement && supplement.description ? supplement.description : ""
          }
        />
        <FormError
          messageError={stateFormProduct?.error?.errors?.description}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          type={"file"}
          multiple
          name={"files"}
          placeholder={"Pictures"}
          className={"text-text-100"}
        />
        <FormError
          messageError={stateFormProduct?.error?.errors?.files}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative my-4 grid w-full gap-y-1.5"}>
        <Button variant={"primary"}>Save</Button>
        <FormError
          messageError={stateFormProduct?.error?.message}
          withIcon
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
    </form>
  );
}
