"use server";

import { fetchData } from "@/utils/fetch-data";
import { IResponseAPI } from "@/utils/global-types";
import { IProduct } from "@/app/(main)/products/_types";

export async function createProduct(stateFormProduct, formData: FormData) {
  const newProduct = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string),
    files: formData.getAll("files"),
  };
  interface ICreatedProductResponse extends IResponseAPI {
    supplement: IProduct;
  }
  return await fetchData<ICreatedProductResponse>({
    url: "/supplement",
    method: "POST",
    body: newProduct,
    isProtected: true,
  });
}
