"use server";

import React from "react";
import { redirect } from "next/navigation";

import { ICreatedProductResponse } from "@/app/(main)/products/_types";

import { fetchData } from "@/utils/fetch-data";
import { routePaths } from "@/utils/route-paths";

export async function createProduct(stateFormProduct, formData: FormData) {
  const res = await fetchData<ICreatedProductResponse>({
    url: "/supplement",
    method: "POST",
    body: formData,
    isProtected: true,
  });
  console.log(res);
  if (!res.success) {
    return res;
  }
  redirect(routePaths.products.path);
  // revalidate
}
