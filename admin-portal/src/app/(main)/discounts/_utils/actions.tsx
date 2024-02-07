"use server";

import { fetchData } from "@/utils/fetch-data";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { TDiscount } from "@/app/(main)/discounts/_utils/types";
import { routePaths } from "@/utils/route-paths";

const tag_revalidate_discounts_list_after_mutation = "discounts";

export async function createDiscount(_: any, formData: FormData) {
  console.log(formData);

  const res = await fetchData<{ discount: TDiscount }>({
    url: "/discount",
    method: "POST",
    body: formData,
    isMultipartFormData: true,
    isProtected: true,
  });
  if (!res.success) {
    console.error(res);
    return res;
  }
  revalidateTag(tag_revalidate_discounts_list_after_mutation);
  redirect(routePaths.discounts.path);
}

export async function getDiscounts() {
  const res = await fetchData<{ discounts: TDiscount[] }>({
    url: "/discount",
    tags: [tag_revalidate_discounts_list_after_mutation],
  });
  return res;
}
