"use client";
import { useFormState, useFormStatus } from "react-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/auth/action";
import AlertError from "@/components/custom/AlertError";

export default function AuthPage() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(login, null);

  return (
    <form
      action={formAction}
      className={
        "grid w-full max-w-md grid-rows-2 gap-y-8 rounded-lg bg-bg-300 p-4 shadow-lg"
      }
    >
      <div className={"grid w-full gap-y-1.5"}>
        <Input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={"text-text-100"}
        />
        <AlertError messageError={state?.email} />
      </div>
      <div className={"grid w-full gap-y-1.5"}>
        <Input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={"text-text-100"}
        />
        <AlertError messageError={state?.password} />
      </div>
      <div className={"grid w-full gap-y-1.5"}>
        <Button
          aria-disabled={pending}
          className={"bg-primary-100 text-primary-300 hover:bg-primary-200"}
        >
          Login
        </Button>
        <AlertError messageError={state?.message} withIcon />
      </div>
    </form>
  );
}
