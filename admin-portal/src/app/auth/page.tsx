"use client";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/auth/action";

const initialState = {
  message: null,
};

export default function AuthPage() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(login, initialState);
  return (
    <form
      action={formAction}
      className={
        "grid w-full max-w-md grid-rows-2 gap-y-8 rounded-lg bg-bg-300 p-4 shadow-lg"
      }
    >
      <Input
        required
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        className={"text-text-100"}
      />
      <Input
        required
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className={"text-text-100"}
      />
      <Button
        aria-disabled={pending}
        className={"bg-primary-100 text-primary-300 hover:bg-primary-200"}
      >
        Login
      </Button>
    </form>
  );
}
