"use server";

import { fetchData } from "@/utils/fetch-data";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { TDiscount } from "@/app/(main)/discounts/_utils/types";
import { routePaths } from "@/utils/route-paths";
import { statusCodeApi } from "@/utils/status-code-api";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import { CustomClassErrorApi } from "@/lib/exceptions";

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
  let discounts: TDiscount[] = [];
  const res = await fetchData<{ discounts: TDiscount[] }>({
    url: "/discount",
    tags: [tag_revalidate_discounts_list_after_mutation],
  });
  if (!res.success) {
    if (res.status !== statusCodeApi.NOT_FOUND) {
      throw new Error(res.error.message);
    }
  } else {
    discounts = res.data.discounts;
  }
  return discounts;
}

export async function getDiscountById(idDiscount) {
  const res = await fetchData<{ discount: TDiscount }>({
    url: `/discount?idDiscount=${idDiscount}`,
    cache: false,
  });
  if (!res.success) {
    console.error(res);
    throw new CustomClassErrorApi(res);
  }
  return res.data.discount;
}

export async function deleteDiscount(idDiscount: string) {
  const res = await fetchData<{ deletedDiscount: TDiscount }>({
    url: `/discount/${idDiscount}`,
    method: "DELETE",
    isProtected: true,
  });
  revalidateTag(tag_revalidate_discounts_list_after_mutation);
  return res;
}
