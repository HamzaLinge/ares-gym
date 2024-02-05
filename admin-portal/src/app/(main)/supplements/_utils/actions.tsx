"use server";

import React from "react";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import {
  ICreatedSupplementResponse,
  ISupplement,
} from "@/app/(main)/supplements/_utils/types";

import { fetchData } from "@/utils/fetch-data";
import { routePaths } from "@/utils/route-paths";
import { CustomClassErrorApi } from "@/lib/exceptions";

const tag_revalidate_categories_list_after_mutation = "supplements";

export async function getSupplements() {
  const res = await fetchData<{ supplements: ISupplement[] }>({
    url: "/supplement",
    tags: [tag_revalidate_categories_list_after_mutation],
  });
  return res;
}

export async function getSupplementById(idSupplement: string) {
  const res = await fetchData<{ supplement: ISupplement }>({
    url: `/supplement?idSupplement=${idSupplement}`,
    cache: false,
  });
  if (!res.success) {
    console.error(res);
    throw new CustomClassErrorApi(res);
  }
  return res.data.supplement;
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
  revalidateTag(tag_revalidate_categories_list_after_mutation);
  redirect(routePaths.supplements.path);
}

export async function deleteSupplement(idSupplement: string) {
  const res = await fetchData<{ deletedIdSupplement: string }>({
    url: `/supplement/${idSupplement}`,
    method: "DELETE",
    isProtected: true,
  });
  if (!res.success) {
    return res;
  }
  revalidateTag(tag_revalidate_categories_list_after_mutation);
  redirect(routePaths.supplements.path);
}

export async function updateSupplement(
  stateFormProduct: { idSupplement: string },
  formData: FormData
) {
  const res = await fetchData<{ supplement: ISupplement }>({
    url: `/supplement/${stateFormProduct.idSupplement}`,
    method: "PUT",
    body: formData,
    isProtected: true,
  });
  if (!res.success) {
    console.error(res);
    return res;
  }
  revalidateTag(tag_revalidate_categories_list_after_mutation);
  redirect(
    routePaths.supplements.children.supplement.path(
      stateFormProduct.idSupplement
    )
  );
}
