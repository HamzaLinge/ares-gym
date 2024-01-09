"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  cookies().delete("AresGymStore");
  redirect("/auth");
}
