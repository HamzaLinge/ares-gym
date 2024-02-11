"use client";

import { useFormState } from "react-dom";

import { ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import FormField from "@/components/custom/FormField";
import { TSelectOption } from "@/components/custom/FormField/types";
import { IErrorAPI } from "@/utils/global-types";
import { isCategory } from "@/utils/helpers";

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
  const [stateFormProduct, actionFormProduct] = useFormState<
    IErrorAPI,
    FormData
  >(actionSupplement, supplement ? { idSupplement: supplement._id } : null);

  function transformCategoryTreeToSelectOption(
    category: ICategoryTree
  ): TSelectOption {
    return {
      value: category._id,
      label: category.name,
      children: category.children?.map(transformCategoryTreeToSelectOption),
    };
  }

  return (
    <form className={"flex w-full flex-col gap-y-4"} action={actionFormProduct}>
      {title ? (
        <h1 className="text-xl font-semibold capitalize">{title}</h1>
      ) : null}
      <div className={"flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2"}>
        <FormField
          typeField={"text"}
          name={"name"}
          placeholder={"Name"}
          required={true}
          defaultValue={supplement ? supplement.name : ""}
          messageError={stateFormProduct?.error?.errors?.name}
        />
        <FormField
          typeField={"select"}
          name={"category"}
          placeholder={"Category"}
          required={true}
          options={categories.map(transformCategoryTreeToSelectOption)}
          defaultValue={
            supplement?.category
              ? isCategory(supplement.category)
                ? supplement.category._id
                : supplement.category
              : ""
          }
          messageError={stateFormProduct?.error?.errors?.category}
        />
      </div>
      <div className={"flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2"}>
        <FormField
          typeField={"text"}
          name={"price"}
          placeholder={"Price"}
          required={true}
          defaultValue={supplement ? supplement.price : null}
          messageError={stateFormProduct?.error?.errors?.price}
        />
        <FormField
          typeField={"text"}
          name={"stock"}
          placeholder={"Stock"}
          defaultValue={supplement ? supplement.stock : null}
          messageError={stateFormProduct?.error?.errors?.stock}
        />
      </div>
      <FormField
        typeField={"textarea"}
        name={"description"}
        placeholder={"Description"}
        defaultValue={supplement ? supplement.description : null}
        messageError={stateFormProduct?.error?.errors?.description}
      />
      <FormField
        typeField={"filepicker"}
        placeholder={"Thumbnails"}
        multiple={true}
        accept={"image/*"}
        noSelectionText={"No Thumbnails Selected"}
      />
      <FormField
        typeField={"submit"}
        messageError={stateFormProduct?.error?.message}
      />
    </form>
  );
}
