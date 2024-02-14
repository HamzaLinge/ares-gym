"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { TUserLogged } from "@/app/auth/_utils/types";
import { fetchData } from "@/utils/fetch-data";
import { routePaths } from "@/utils/route-paths";

export async function login(_: any, formData: FormData) {
  const res = await fetchData<TUserLogged>({
    url: "/auth/local/login",
    method: "POST",
    body: formData,
  });
  if (!res.success) {
    console.error(res);
    return res;
  }
  cookies().set("AresGymStore", JSON.stringify(res.data));
  redirect(routePaths.dashboard.path);
}

export async function signOut() {
  if (cookies().has("AresGymStore")) {
    cookies().delete("AresGymStore");
  }
  redirect(routePaths.auth.path);
}
