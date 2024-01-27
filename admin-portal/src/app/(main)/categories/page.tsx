import React from "react";
import { ICategoryTree } from "@/app/(main)/categories/utils/types";
import DnDCategoryTree from "@/app/(main)/categories/components/DnDCategoryTree";
import { getCategories } from "@/app/(main)/categories/utils/actions";
import { ClassErrorApi } from "@/lib/exceptions";
import { statusCodeApi } from "@/utils/status-code-api";

export default async function CategoriesPage() {
  let categories: ICategoryTree[] = [];
  const fetchedCategories = await getCategories();
  if (!fetchedCategories.success) {
    if (fetchedCategories.status !== statusCodeApi.NOT_FOUND) {
      console.error(fetchedCategories);
      throw new ClassErrorApi(fetchedCategories);
    }
  }
  if (fetchedCategories.success) {
    categories = fetchedCategories.data.categoryTree;
  }
  return (
    <section className={"flex flex-1 flex-col"}>
      <header>Dashboard Categories</header>
      <DnDCategoryTree categories={categories} />
      {/*<CategoryD3Tree />*/}
    </section>
  );
}
