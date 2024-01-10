"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routePaths } from "@/utils/route-paths";

export async function signOut() {
  if (cookies().has("AresGymStore")) cookies().delete("AresGymStore");
  redirect(routePaths.auth.path);
}
