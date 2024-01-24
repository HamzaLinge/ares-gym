"use server";

import React from "react";
import { redirect } from "next/navigation";

import {
  ICreatedProductResponse,
  IProduct,
} from "@/app/(main)/products/_types";

import { fetchData } from "@/utils/fetch-data";
import { routePaths } from "@/utils/route-paths";
import { revalidateTag } from "next/cache";
import { filterDataForm } from "@/utils/data-form";

export async function getProducts() {
  const res = await fetchData<{ supplements: IProduct[] }>({
    url: "/supplement",
    tags: ["products"],
  });
  return res;
}

export async function createProduct(stateFormProduct, formData: FormData) {
  const res = await fetchData<ICreatedProductResponse>({
    url: "/supplement",
    method: "POST",
    body: formData,
    isMultipartFormData: true,
    isProtected: true,
  });
  if (!res.success) {
    return res;
  }
  revalidateTag("products");
  redirect(routePaths.products.path);
}
