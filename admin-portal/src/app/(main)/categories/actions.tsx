"use server";

import { cookies } from "next/headers";

import { TError, TToken, TUser } from "@/utils/global.type";
import { getAccessToken } from "@/lib/auth";

export async function addCategory(idCategory, formData: FormData) {
  const addCategoryData = {
    parent: idCategory,
    name: formData.get("name"),
    description: formData.get("description"),
  };
  console.log(addCategoryData);
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
      const response: TError = await res.json();
      return response;
    }
    const response = await res.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Something went wrong when attempting to access to the API"
    );
  }
}

export async function editCategory(prevState: any, formData: FormData) {
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
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const response: TError = await res.json();
      return response;
    }
    const response: TUser & TToken = await res.json();
    cookies().set("AresGymStore", JSON.stringify(response));
  } catch (error) {
    console.error(error);
    const err: TError = { message: "Not Cool" };
    return err;
  }
}
