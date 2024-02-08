"use client";

import React from "react";
import { useFormState } from "react-dom";

import { ICategory, ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { IErrorAPI } from "@/utils/global-types";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import FormField from "@/components/custom/FormField";
import { TSelectOption } from "@/components/custom/FormField/types";

interface IFormProductProps {
  categories: ICategoryTree[];
  actionSupplement: (
    state: { idSupplement?: string },
    formData: FormData
  ) => Promise<IErrorAPI>;
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

  const isICategory = (value: any): value is ICategory => {
    return !!value?._id;
  };

  // function renderCategoryOptions(categoryOptions: ICategoryTree[]) {
  //   return categoryOptions.map((option) =>
  //     option.children && option.children.length > 0 ? (
  //       <SelectGroup key={option._id}>
  //         <SelectLabel>{option.name}</SelectLabel>
  //         <SelectGroup className={"ml-2 border-l"}>
  //           {renderCategoryOptions(option.children)}
  //         </SelectGroup>
  //       </SelectGroup>
  //     ) : (
  //       <SelectItem key={option._id} value={option._id}>
  //         {option.name}
  //       </SelectItem>
  //     )
  //   );
  // }

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
              ? isICategory(supplement.category)
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

  // return (
  //   <form className={"w-full"} action={actionFormProduct}>
  //     <div className={"relative grid w-full gap-y-1.5"}>
  //       <Input
  //         type={"text"}
  //         name={"name"}
  //         placeholder={"Name"}
  //         className={"text-text-100"}
  //         defaultValue={supplement ? supplement.name : ""}
  //         autoFocus
  //         onFocus={(e) => {
  //           const tmpValue = e.target.value;
  //           e.target.value = "";
  //           e.target.value = tmpValue;
  //         }}
  //       />
  //       <FormError
  //         messageError={stateFormProduct?.error?.errors?.name}
  //         className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
  //       />
  //     </div>
  //     <div className={"relative grid w-full gap-y-1.5"}>
  //       <Select
  //         name={"category"}
  //         defaultValue={
  //           supplement?.category
  //             ? isICategory(supplement.category)
  //               ? supplement.category._id
  //               : supplement.category
  //             : ""
  //         }
  //       >
  //         <SelectTrigger className={"w-full"}>
  //           <SelectValue
  //             className={"capitalize"}
  //             placeholder={"Select a category"}
  //           />
  //         </SelectTrigger>
  //         <SelectContent className={"capitalize"}>
  //           <SelectGroup>
  //             <SelectLabel className={"border-b"}>Categories</SelectLabel>
  //             <SelectGroup className={"ml-2"}>
  //               {renderCategoryOptions(categories)}
  //             </SelectGroup>
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //       <FormError
  //         messageError={stateFormProduct?.error?.errors?.category}
  //         className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
  //       />
  //     </div>
  //     <div className={"relative grid w-full gap-y-1.5"}>
  //       <Input
  //         type={"number"}
  //         name={"price"}
  //         placeholder={"Price"}
  //         className={"text-text-100"}
  //         defaultValue={supplement ? supplement.price : ""}
  //       />
  //       <FormError
  //         messageError={stateFormProduct?.error?.errors?.price}
  //         className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
  //       />
  //     </div>
  //     <div className={"relative grid w-full gap-y-1.5"}>
  //       <Input
  //         type={"number"}
  //         name={"stock"}
  //         placeholder={"Stock"}
  //         className={"text-text-100"}
  //         defaultValue={supplement ? supplement.stock : ""}
  //       />
  //       <FormError
  //         messageError={stateFormProduct?.error?.errors?.stock}
  //         className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
  //       />
  //     </div>
  //     <div className={"relative grid w-full gap-y-1.5"}>
  //       <Textarea
  //         name={"description"}
  //         placeholder={"Description"}
  //         className={"text-text-100"}
  //         defaultValue={
  //           supplement && supplement.description ? supplement.description : ""
  //         }
  //       />
  //       <FormError
  //         messageError={stateFormProduct?.error?.errors?.description}
  //         className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
  //       />
  //     </div>
  //     <div className={"relative grid w-full gap-y-1.5"}>
  //       <Input
  //         type={"file"}
  //         multiple
  //         name={"files"}
  //         placeholder={"Pictures"}
  //         className={"text-text-100"}
  //       />
  //       <FormError
  //         messageError={stateFormProduct?.error?.errors?.files}
  //         className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
  //       />
  //     </div>
  //     <div className={"relative my-4 grid w-full gap-y-1.5"}>
  //       <Button variant={"primary"}>Save</Button>
  //       <FormError
  //         messageError={stateFormProduct?.error?.message}
  //         withIcon
  //         className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
  //       />
  //     </div>
  //   </form>
  // );
}
