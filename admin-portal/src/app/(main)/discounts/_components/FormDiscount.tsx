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
          messageError={stateFormDiscount?.error?.errors?.title}
          textProps={{
            name: "title",
            placeholder: "Put Title for Discount",
            required: true,
            label: "Title",
          }}
        />
        <FormField
          typeField="text"
          messageError={stateFormDiscount?.error?.errors?.percentage}
          textProps={{
            name: "percentage",
            placeholder: "Percentage",
            required: true,
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2">
        <FormField
          typeField="datepicker"
          messageError={stateFormDiscount?.error?.errors?.dateBegin}
          datepickerProps={{
            name: "dateBegin",
            placeholder: "Select Date Begin",
            label: "Start from",
            required: true,
          }}
        />
        <FormField
          typeField="datepicker"
          messageError={stateFormDiscount?.error?.errors?.dateEnd}
          datepickerProps={{
            name: "dateEnd",
            placeholder: "End at",
            required: true,
          }}
        />
      </div>
      <FormField
        typeField="textarea"
        messageError={stateFormDiscount?.error?.errors?.description}
        textareaProps={{
          name: "description",
          placeholder: "Description",
        }}
      />
      <FormField
        typeField="filepicker"
        filepickerProps={{
          name: "file",
          label: "Thumbnail",
          accept: "image/*",
          placeholder: "Select Thumbnail",
        }}
      />
      <FormField
        typeField="submit"
        messageError={stateFormDiscount?.error?.message}
      />
    </form>
  );
}
