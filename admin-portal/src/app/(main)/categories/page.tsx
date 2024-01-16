import React from "react";
import CategoryD3Tree from "@/app/(main)/categories/components/CategoryD3Tree";
import CategoryTree from "@/app/(main)/categories/components/CategoryTree";
import categories from "@/app/(main)/categories/utils/fake-categories";

export default function CategoriesPage() {
  return (
    <div className={"flex flex-1 flex-col"}>
      <h1>Categories Page</h1>
      <CategoryTree categories={categories} />
      {/*<CategoryD3Tree />*/}
    </div>
  );
}
