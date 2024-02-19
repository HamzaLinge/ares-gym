"use server";

import { revalidateTag } from "next/cache";

import { ICategory, ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { getAccessToken } from "@/lib/auth";
import { CustomClassErrorApi } from "@/lib/exceptions";
import { CategorySchema } from "@/schemas";
import { fetchData } from "@/utils/fetch-data";
import { ICustomError } from "@/utils/global-types";
import { routePaths } from "@/utils/route-paths";
import { statusCodeApi } from "@/utils/status-code-api";
import { redirect } from "next/navigation";
import { z } from "zod";

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
  id: string | undefined,
  input: z.infer<typeof CategorySchema>,
) {
  const validatedFields = CategorySchema.safeParse(input);
  if (!validatedFields.success) {
    const error: ICustomError = { message: "Fields are invalid" };
    return error;
  }
  const accessToken = await getAccessToken();
  if (!accessToken) {
    const error: ICustomError = { message: "You're unauthorized?" };
    return error;
  }

  const res = await fetchData<{ category: ICategory }>({
    url: "/category",
    method: "POST",
    accessToken: accessToken,
    body: { ...validatedFields.data, parent: id },
  });
  if (!res.success) {
    console.error(res);
    return res.error;
  }
  revalidateTag(tag_revalidate_categories_list);
  redirect(routePaths.categories.path);
}

export async function updateCategory(
  id: string,
  input: z.infer<typeof CategorySchema>,
) {
  const validatedFields = CategorySchema.safeParse(input);
  if (!validatedFields.success) {
    const error: ICustomError = { message: "Fields are invalid" };
    return error;
  }
  const accessToken = await getAccessToken();
  if (!accessToken) {
    const error: ICustomError = { message: "You're unauthorized?" };
    return error;
  }
  console.log({ validatedFields });

  const res = await fetchData<{ category: ICategory }>({
    url: `/category/${id}`,
    method: "PUT",
    accessToken: accessToken,
    body: validatedFields.data,
  });
  if (!res.success) {
    console.error(res);
    return res.error;
  }
  revalidateTag(tag_revalidate_categories_list);
  redirect(routePaths.categories.children.category.path(id));
}

export async function deleteCategory(idCategory: string) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    const error: ICustomError = { message: "You're unauthorized?" };
    return error;
  }
  const res = await fetchData<{ idDeletedCategory: string }>({
    url: `/category/${idCategory}`,
    method: "DELETE",
    accessToken: accessToken,
  });
  if (!res.success) {
    console.error(res);
    return res.error;
  }
  revalidateTag(tag_revalidate_categories_list);
  redirect(routePaths.categories.path);
}
