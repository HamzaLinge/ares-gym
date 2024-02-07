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
      className={"w-full flex flex-col gap-y-4"}
      action={actionFormDiscount}
    >
      {title ? (
        <h1 className="text-xl capitalize font-semibold">{title}</h1>
      ) : null}
      <div className="flex flex-col gap-y-2 w-full">
        <FormField
          typeField="input"
          name={"title"}
          placeholder={"Title"}
          required={true}
          messageError={stateFormDiscount?.error?.errors?.title}
        />
        <FormField
          typeField="input"
          name={"percentage"}
          placeholder={"Percentage"}
          required={true}
          messageError={stateFormDiscount?.error?.errors?.percentage}
        />
      </div>
      <div className="flex flex-col gap-y-2 w-full">
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
