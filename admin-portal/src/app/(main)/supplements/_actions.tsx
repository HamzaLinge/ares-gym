"use server";

import React from "react";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import {
  ICreatedSupplementResponse,
  ISupplement,
} from "@/app/(main)/supplements/_types";

import { fetchData } from "@/utils/fetch-data";
import { routePaths } from "@/utils/route-paths";

export async function getSupplements() {
  const res = await fetchData<{ supplements: ISupplement[] }>({
    url: "/supplement",
    tags: ["supplements"],
  });
  return res;
}

export async function getSupplementById(idSupplement: string) {
  const res = await fetchData<{ supplement: ISupplement }>({
    url: `/supplement?idSupplement=${idSupplement}`,
    cache: false,
  });
  return res;
}

export async function createSupplement(stateFormProduct, formData: FormData) {
  const res = await fetchData<ICreatedSupplementResponse>({
    url: "/supplement",
    method: "POST",
    body: formData,
    isMultipartFormData: true,
    isProtected: true,
  });
  if (!res.success) {
    return res;
  }
  revalidateTag("supplements");
  redirect(routePaths.supplements.path);
}
