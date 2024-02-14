"use server";

import { revalidateTag } from "next/cache";

import { getAccessToken } from "@/lib/auth";
import { ICustomError } from "@/utils/global-types";
import { ICategory, ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { fetchData } from "@/utils/fetch-data";
import { CustomClassErrorApi } from "@/lib/exceptions";
import { redirect } from "next/navigation";
import { routePaths } from "@/utils/route-paths";
import { statusCodeApi } from "@/utils/status-code-api";

const tag_revalidate_categories_list = "categories";

export async function getCategories() {
  const res = await fetchData<{ categoryTree: ICategoryTree[] }>({
    url: "/category",
    tags: [tag_revalidate_categories_list],
  });
  const categories: ICategoryTree[] = [];
  if (!res.success) {
    if (res.status === statusCodeApi.NOT_FOUND) {
      return categories;
    } else {
      console.error(res);
      throw new CustomClassErrorApi(res);
    }
  }
  return res.data.categoryTree;
}

export async function getCategoryById(idCategory: string) {
  const res = await fetchData<{ category: ICategory }>({
    url: `/category?idCategory=${idCategory}`,
  });
  if (!res.success) {
    console.error(res);
    throw new CustomClassErrorApi(res);
  }
  return res.data.category;
}

export async function createCategory(
  { id: parent }: { id?: string },
  formData: FormData
) {
  if (parent) formData.append("parent", parent);
  console.log(formData);
  const res = await fetchData<{ category: ICategory }>({
    url: "/category",
    method: "POST",
    isProtected: true,
    body: formData,
  });
  if (!res.success) {
    console.error(res);
    return res;
  }
  revalidateTag(tag_revalidate_categories_list);
  redirect(routePaths.categories.path);
}

export async function updateCategory(
  { id: idCategory }: { id: string },
  formData: FormData
) {
  const res = await fetchData<{ category: ICategory }>({
    url: `/category/${idCategory}`,
    method: "PUT",
    isProtected: true,
    body: formData,
  });
  if (!res.success) {
    console.error(res);
    return res;
  }
  revalidateTag(tag_revalidate_categories_list);
  redirect(routePaths.categories.path);
}

export async function deleteCategory(idCategory: string) {
  const res = await fetchData<{ idDeletedCategory: string }>({
    url: `/category/${idCategory}`,
    method: "DELETE",
    isProtected: true,
  });
  if (!res.success) {
    console.error(res);
    return res;
  }
  revalidateTag(tag_revalidate_categories_list);
  return res;
}
