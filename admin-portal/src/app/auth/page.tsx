"use client";

import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { login } from "@/app/auth/_utils/actions";
import FormError from "@/components/ui/FormError";
import BtnSubmit from "@/components/custom/BtnSubmit";
import { IErrorAPI } from "@/utils/global-types";

export default function AuthPage() {
  const [state, loginAction] = useFormState<IErrorAPI, FormData>(login, null);

  return (
    <form
      action={loginAction}
      className={
        "grid w-full max-w-md grid-rows-2 gap-y-8 rounded-lg bg-bg-300 p-4 shadow-lg"
      }
    >
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={"text-text-100"}
        />
        <FormError
          messageError={state?.error?.errors?.email}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative grid w-full gap-y-1.5"}>
        <Input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={"text-text-100"}
        />
        <FormError
          messageError={state?.error?.errors?.password}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative my-4 grid w-full gap-y-1.5"}>
        <BtnSubmit text={"login"} />
        <FormError
          messageError={state?.error?.message}
          withIcon
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
    </form>
  );
}
