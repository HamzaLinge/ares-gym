"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function login(values: z.infer<typeof AuthSchema>) {
  const validatedFields = AuthSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          // This error type is due `return null` from credentials `authorize` method
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    // `throw error` is mandatory in order to let the redirection proceed
    throw error;
  }
}

export async function logout() {
  await signOut();
}
