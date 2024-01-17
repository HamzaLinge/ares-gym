"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

import { getAccessToken } from "@/lib/auth";
import { TError, TToken, TUser } from "@/app/auth/utils/types";
import { ICustomError } from "@/utils/global-types";
import {
  ICategory,
  IStateActionModalCategory,
} from "@/app/(main)/categories/utils/types";

export async function createCategory(
  { id: parent }: IStateActionModalCategory,
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
    revalidateTag("category");
    return { category };
  } catch (error: Error) {
    console.error(error);
    throw new Error(
      `Something went wrong when attempting to process ${this.name} API` +
        error.message
    );
  }
}

export async function editCategory(
  { id: category }: IStateActionModalCategory,
  formData: FormData
) {
  const editCategoryData = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("No Access Token found!");
  }
  try {
    const res = await fetch(`${process.env.BASE_URL}/category`, {
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
    revalidateTag("category");
    return { category };
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong when attempting to process ${this.name} API` +
        error.message
    );
  }
}
