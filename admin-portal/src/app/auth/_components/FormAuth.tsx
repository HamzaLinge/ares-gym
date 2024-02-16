"use client";

import FormField from "@/components/custom/FormField";
import { IErrorAPI } from "@/utils/global-types";
import { useFormState } from "react-dom";
import { login } from "../_utils/actions";
import { signIn } from "@/auth";

export default function FormAuth() {
  const [state, loginAction] = useFormState(login, null);

  return (
    <form
      action={loginAction}
      className={
        "p-2 rounded flex flex-col items-center w-full max-w-md bg-bg-200 gap-y-8"
      }
    >
      <FormField
        typeField={"text"}
        // messageError={state?.error?.errors?.email}
        textProps={{
          name: "email",
          label: "Email",
          placeholder: "Email",
          required: true,
        }}
      />

      <FormField
        typeField={"password"}
        // messageError={state?.error?.errors?.password}
        passwordProps={{
          name: "password",
          label: "Password",
          placeholder: "Password",
          required: true,
        }}
      />

      {/* <button type="submit">Login</button> */}
      <FormField typeField={"submit"} messageError={state?.error} />
    </form>
  );
}
