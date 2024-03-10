"use server";

import { fetchData } from "@/lib/fetch";
import { CustomClassErrorApi } from "@/types/api";
import { ICategoryTree } from "@/types/category";
import { codeStatusApi } from "@/utils/code-status-api";

const tag = "categories";

export async function getCategories() {
  const res = await fetchData<{ categoryTree: ICategoryTree[] }>({
    url: "/category",
    tags: [tag],
  });

  if (!res.success) {
    if (res.status === codeStatusApi.NOT_FOUND) {
      return [];
    } else {
      console.error(res);
      throw new CustomClassErrorApi(res);
    }
  }

  return res.data.categoryTree;
}
