"use client";

import { Input } from "@/components/ui/input";
import AlertError from "@/components/ui/AlertError";
import { useFormState } from "react-dom";
import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewProductPage() {
  const [state, loginAction] = useFormState(login, null);

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
        <AlertError
          messageError={state?.errors?.name}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <AlertError
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
        <AlertError
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
        <AlertError
          messageError={state?.errors?.stock}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative my-4 grid w-full gap-y-1.5"}>
        <Button variant={"primary"}>Save</Button>
        <AlertError
          messageError={state?.message}
          withIcon
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
    </form>
  );
}
