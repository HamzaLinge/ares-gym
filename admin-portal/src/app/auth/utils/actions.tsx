"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { routePaths } from "@/utils/route-paths";
import { TError, TToken, TUser } from "@/app/auth/utils/types";

export async function login(prevState, formData: FormData) {
  // await new Promise<Boolean>((resolve) => {
  //   setTimeout(() => resolve(true), 2000);
  // });
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
      const response: TError = await res.json();
      return response;
    }
    const response: TUser & TToken = await res.json();
    cookies().set("AresGymStore", JSON.stringify(response));
  } catch (error) {
    console.error(error);
    const err: TError = { message: "Not Cool" };
    return err;
  }
  redirect(routePaths.dashboard.path);
}
