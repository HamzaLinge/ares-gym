"use client";

import { useFormState } from "react-dom";

import { TDiscount } from "@/app/(main)/discounts/_utils/types";

import { IErrorAPI } from "@/utils/global-types";
import FormField from "@/components/custom/FormField";
import BtnSubmit from "@/components/custom/BtnSubmit";

type TFormDiscountProps = {
  actionDiscount: (
    state: { idDiscount?: string },
    formData: FormData
  ) => Promise<IErrorAPI>;
  discount?: TDiscount;
  title?: string;
};

export default function FormDiscount({
  actionDiscount,
  discount,
  title,
}: TFormDiscountProps) {
  const [stateFormDiscount, actionFormDiscount] = useFormState<
    IErrorAPI,
    FormData
  >(actionDiscount, discount ? { idDiscount: discount._id } : null);

  return (
    <form
      className={"flex w-full flex-col gap-y-4 md:gap-y-8"}
      action={actionFormDiscount}
    >
      {title ? (
        <h1 className="text-xl font-semibold capitalize">{title}</h1>
      ) : null}
      <div className="flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2">
        <FormField
          typeField="text"
          name={"title"}
          placeholder={"Title"}
          required={true}
          messageError={stateFormDiscount?.error?.errors?.title}
        />
        <FormField
          typeField="text"
          name={"percentage"}
          placeholder={"Percentage"}
          required={true}
          messageError={stateFormDiscount?.error?.errors?.percentage}
        />
      </div>
      <div className="flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2">
        <FormField
          typeField="datepicker"
          name={"dateBegin"}
          placeholder={"Start from"}
          required={true}
          messageError={stateFormDiscount?.error?.errors?.dateBegin}
        />
        <FormField
          typeField="datepicker"
          name={"dateEnd"}
          placeholder={"End at"}
          messageError={stateFormDiscount?.error?.errors?.dateEnd}
        />
      </div>
      <FormField
        typeField="textarea"
        name={"description"}
        placeholder={"Description"}
        messageError={stateFormDiscount?.error?.errors?.description}
      />
      <FormField
        typeField="filepicker"
        placeholder={"Thumbnail"}
        accept={"image/*"}
        noSelectionText={"No Selected Thumbnail"}
      />
      <FormField
        typeField="submit"
        messageError={stateFormDiscount?.error?.message}
      />
    </form>
  );
}
