"use client";

import { useFormState } from "react-dom";
import Select from "react-select";

import { Input } from "@/components/ui/input";
import FormError from "@/components/ui/FormError";
import { Button } from "@/components/ui/button";
import { login } from "@/app/auth/utils/actions";
import { convertToSelectOptions } from "@/app/(main)/products/new/utils/helpers";

export default function FormProduct({ categories }) {
  const [state, loginAction] = useFormState(login, null);

  const categoriesOptions = convertToSelectOptions(categories);

  return (
    <form className={"w-full"}>
      <h1>Insert a new product</h1>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          required
          type={"text"}
          id="name"
          name="name"
          placeholder="Name"
          className={"text-text-100"}
        />
        <FormError
          messageError={state?.errors?.name}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Select options={categoriesOptions} />
        <FormError
          messageError={state?.errors?.name}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          required
          type={"number"}
          id="price"
          name="price"
          placeholder="Price"
          className={"text-text-100"}
        />
        <FormError
          messageError={state?.errors?.price}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          required
          type={"number"}
          id="stock"
          name="stock"
          placeholder="Stock"
          className={"text-text-100"}
        />
        <FormError
          messageError={state?.errors?.stock}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative my-4 grid w-full gap-y-1.5"}>
        <Button variant={"primary"}>Save</Button>
        <FormError
          messageError={state?.message}
          withIcon
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
    </form>
  );
}
