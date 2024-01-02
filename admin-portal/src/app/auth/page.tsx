"use client";
import { useFormState, useFormStatus } from "react-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/auth/action";
import AlertError from "@/components/custom/AlertError";
import { useEffect } from "react";

export default function AuthPage() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(login, null);

  useEffect(() => {
    console.log(pending);
  }, [pending]);

  return (
    <form
      action={formAction}
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
        <AlertError
          messageError={state?.email}
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
        <AlertError
          messageError={state?.password}
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
      <div className={"relative my-4 grid w-full gap-y-1.5"}>
        <Button
          aria-disabled={pending}
          className={"bg-primary-100 text-primary-300 hover:bg-primary-200"}
        >
          Login
        </Button>
        <AlertError
          messageError={state?.message}
          withIcon
          className={"absolute bottom-0 translate-y-[calc(100%_+_2px)]"}
        />
      </div>
    </form>
  );
}
