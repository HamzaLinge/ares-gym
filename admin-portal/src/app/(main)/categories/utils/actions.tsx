"use server";

import { revalidateTag } from "next/cache";

import { getAccessToken } from "@/lib/auth";
import { ICustomError } from "@/utils/global-types";
import {
  ICategory,
  ICategoryTree,
  TStateActionModalCategory,
} from "@/app/(main)/categories/utils/types";
import { fetchData } from "@/utils/fetch-data";

export async function getCategories() {
  const res = await fetchData<{ categoryTree: ICategoryTree[] }>({
    url: "/category",
    tags: ["categories"],
  });
  return res;
}

export async function createCategory(
  { id: parent }: TStateActionModalCategory,
  formData: FormData
) {
  let addCategoryData: {
    parent?: string;
    name: string;
    description?: string;
  } = { name: formData.get("name") as string };
  if (parent) addCategoryData.parent = parent;
  if ((formData.get("description") as string).length > 0)
    addCategoryData.description = formData.get("description") as string;

  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("No Access Token found!");
  }
  try {
    const res = await fetch(`${process.env.BASE_URL}/category`, {
      method: "POST",
      body: JSON.stringify(addCategoryData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const error: ICustomError = await res.json();
      return { error };
    }
    const category: { category: ICategory } = await res.json();
    revalidateTag("categories");
    return { category };
  } catch (error: Error) {
    console.error(error);
    throw new Error(
      `Something went wrong when attempting to process Create Category API:` +
        error.message
    );
  }
}

export async function editCategory(
  { id: idCategory }: TStateActionModalCategory,
  formData: FormData
) {
  const editCategoryData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("No Access Token found!");
  }
  try {
    const res = await fetch(`${process.env.BASE_URL}/category/${idCategory}`, {
      method: "PUT",
      body: JSON.stringify(editCategoryData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const error: ICustomError = await res.json();
      return { error };
    }
    const category: { category: ICategory } = await res.json();
    revalidateTag("categories");
    return { category };
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong when attempting to process Edit Category API:` +
        error.message
    );
  }
}

export async function deleteCategory(
  { idCategory }: { idCategory: string },
  formData: FormData
) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("No Access Token found!");
  }
  try {
    const res = await fetch(`${process.env.BASE_URL}/category/${idCategory}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const error: ICustomError = await res.json();
      return { error };
    }
    const { idDeletedCategory }: { idDeletedCategory: string } =
      await res.json();
    revalidateTag("categories");
    return { idDeletedCategory };
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong when attempting to process Delete Category API:` +
        error.message
    );
  }
}
