import React from "react";

import { ICategoryTree } from "@/app/(main)/categories/_utils/types";
import Categories from "@/app/(main)/categories/_components/Categories";
import { getCategories } from "@/app/(main)/categories/_utils/actions";
import { CustomClassErrorApi } from "@/lib/exceptions";
import { statusCodeApi } from "@/utils/status-code-api";
import HeaderCategories from "@/app/(main)/categories/_components/HeaderCategories";

export default async function CategoriesPage() {
  let categories: ICategoryTree[] = [];
  const fetchedCategories = await getCategories();
  if (!fetchedCategories.success) {
    if (fetchedCategories.status !== statusCodeApi.NOT_FOUND) {
      console.error(fetchedCategories);
      throw new CustomClassErrorApi(fetchedCategories);
    }
  }
  if (fetchedCategories.success) {
    categories = fetchedCategories.data.categoryTree;
  }
  return (
    <section>
      <HeaderCategories />
      <Categories categories={categories} />
    </section>
  );
}
