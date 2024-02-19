"use client";

import { useFormState } from "react-dom";

import { ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import FormField from "@/components/custom/FormField";
import { IErrorAPI } from "@/utils/global-types";
import {
  isCategory,
  transformCategoryTreeToSelectOption,
} from "@/utils/helpers";

interface IFormProductProps {
  categories: ICategoryTree[];
  actionSupplement: (state: any, formData: FormData) => Promise<IErrorAPI>;
  supplement?: ISupplement;
  title: string;
}

export default function FormSupplement({
  categories,
  actionSupplement,
  supplement,
  title,
}: IFormProductProps) {
  const [stateFormSupplement, actionFormSupplement] = useFormState<
    IErrorAPI,
    FormData
  >(actionSupplement, supplement ? { idSupplement: supplement._id } : null);

  return (
    <form
      className={"flex w-full flex-col gap-y-4"}
      action={actionFormSupplement}
    >
      {title ? (
        <h1 className="text-xl font-semibold capitalize">{title}</h1>
      ) : null}
      <div className={"flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2"}>
        <FormField
          typeField={"text"}
          messageError={stateFormSupplement?.error?.errors?.name}
          textProps={{
            name: "name",
            placeholder: "Name",
            required: true,
            defaultValue: supplement ? supplement.name : undefined,
          }}
        />
        <FormField
          typeField={"select"}
          messageError={stateFormSupplement?.error?.errors?.category}
          selectProps={{
            options: categories.map(transformCategoryTreeToSelectOption),
            name: "category",
            placeholder: "Select Category",
            label: "Category",
            required: true,
            defaultValue: supplement?.category
              ? isCategory(supplement.category)
                ? supplement.category._id
                : supplement.category
              : undefined,
          }}
        />
      </div>
      <div className={"flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2"}>
        <FormField
          typeField={"text"}
          messageError={stateFormSupplement?.error?.errors?.price}
          textProps={{
            name: "price",
            placeholder: "Price",
            required: true,
            defaultValue: supplement ? supplement.price : undefined,
          }}
        />
        <FormField
          typeField={"text"}
          messageError={stateFormSupplement?.error?.errors?.stock}
          textProps={{
            name: "stock",
            placeholder: "Stock",
            defaultValue: supplement ? supplement.stock : undefined,
          }}
        />
      </div>
      <FormField
        typeField={"textarea"}
        messageError={stateFormSupplement?.error?.errors?.description}
        textareaProps={{
          name: "description",
          placeholder: "Description",
          defaultValue: supplement ? supplement.description : undefined,
        }}
      />
      {!supplement && (
        <FormField
          typeField={"filepicker"}
          filepickerProps={{
            name: "files",
            label: "Thumbnails",
            placeholder: "Select Thumbnail",
            multiple: true,
            accept: "image/*",
          }}
        />
      )}

      <FormField
        typeField={"submit"}
        messageError={stateFormSupplement?.error?.message}
      />
    </form>
  );
}
