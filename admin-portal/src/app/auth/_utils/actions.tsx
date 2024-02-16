"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { TUserLogged } from "@/app/auth/_utils/types";
import { fetchData } from "@/utils/fetch-data";
import { routePaths } from "@/utils/route-paths";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

// export async function login(_: any, formData: FormData) {
//   const res = await fetchData<TUserLogged>({
//     url: "/auth/local/login",
//     method: "POST",
//     body: formData,
//   });
//   if (!res.success) {
//     console.error(res);
//     return res;
//   }
//   cookies().set("AresGymStore", JSON.stringify(res.data));
//   redirect(routePaths.dashboard.path);
// }

export async function login(_: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    // redirect(routePaths.dashboard.path);
  } catch (error) {
    // console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        case "CallbackRouteError":
          return { error: "Cannot Finish Login" };
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
