import React from "react";
import CategoryD3Tree from "@/app/(main)/categories/components/CategoryD3Tree";
import CategoryTree from "@/app/(main)/categories/components/CategoryTree";
import categories from "@/app/(main)/categories/utils/fake-categories";

async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function CategoriesPage() {
  return (
    <div className={"flex flex-1 flex-col"}>
      <h1>Categories Page</h1>
      <CategoryTree categories={categories} />
      {/*<CategoryD3Tree />*/}
    </div>
  );
}
