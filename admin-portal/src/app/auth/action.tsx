"use server";

import { redirect } from "next/navigation";

type ErrorValidationField = {
  type: string;
  value: string | undefined | null;
  msg: string;
  path: string;
  location: string;
};

function formatValidationErrors(errorsArray: ErrorValidationField[]) {
  const formattedErrors = {};

  errorsArray.forEach((error) => {
    const { path, msg } = error;
    if (!formattedErrors[path]) formattedErrors[path] = msg;
  });

  return formattedErrors;
}

export async function login(
  prevState: any,
  formData: FormData
): Promise<{ message: string; email?: string; password?: string }> {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const res = await fetch("http://localhost:3001/auth/local/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const err = await res.json();
      const formattedValidationErrors = formatValidationErrors(
        err.errors ? err.errors : []
      );
      return { message: err.message, ...formattedValidationErrors };
    }
    redirect("/");
  } catch (error) {
    console.error(error);
    return { message: "Not Cool" };
  }
}
