import { TError, TToken, TUser } from "@/utils/global.type";
import { cookies } from "next/headers";

export async function editCategory(prevState: any, formData: FormData) {
  const editCategoryData = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  try {
    const res = await fetch("http://localhost:3001/category", {
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
