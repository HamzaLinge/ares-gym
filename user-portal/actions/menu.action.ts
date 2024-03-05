"use server";

import { fetchData } from "@/lib/fetch";
import { CustomClassErrorApi } from "@/types/api";
import { ICategoryTree } from "@/types/category";
import { TLinkNavigation } from "@/types/ui";
import { codeStatusApi } from "@/utils/code-status-api";
import { mapCategoryLinks } from "@/utils/helpers";

const tag = "categories";

export async function getCategoryLinks() {
  const res = await fetchData<{ categoryTree: ICategoryTree[] }>({
    url: "/category",
    tags: [tag],
  });
  let categories: TLinkNavigation[] = [];
  if (!res.success) {
    if (res.status === codeStatusApi.NOT_FOUND) {
      return categories;
    } else {
      console.error(res);
      throw new CustomClassErrorApi(res);
    }
  }
  return mapCategoryLinks({ categoryTree: res.data.categoryTree });
}
