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
};

export default function FormDiscount({
  actionDiscount,
  discount,
}: TFormDiscountProps) {
  const [stateFormDiscount, actionFormDiscount] = useFormState<
    IErrorAPI,
    FormData
  >(actionDiscount, discount ? { idDiscount: discount._id } : null);

  return (
    <form className={"w-full"} action={actionFormDiscount}>
      <FormField
        typeField="input"
        name={"title"}
        placeholder={"Title"}
        messageError={stateFormDiscount?.error?.errors?.title}
      />
      <FormField
        typeField="input"
        name={"percentage"}
        placeholder={"Percentage"}
        messageError={stateFormDiscount?.error?.errors?.percentage}
      />
      <FormField
        typeField="input"
        type="date"
        name={"dateBegin"}
        placeholder={"Start from"}
        messageError={stateFormDiscount?.error?.errors?.dateBegin}
      />
      <FormField
        typeField="input"
        type="date"
        name={"dateEnd"}
        placeholder={"End at"}
        messageError={stateFormDiscount?.error?.errors?.dateEnd}
      />
      <FormField
        typeField="textarea"
        name={"description"}
        placeholder={"Description"}
        messageError={stateFormDiscount?.error?.errors?.description}
      />
      <BtnSubmit text="Save" />
    </form>
  );
}
