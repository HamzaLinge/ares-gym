// "use client";

import React from "react";
import { DndContext } from "@dnd-kit/core";

import CategoryTree from "@/app/(main)/categories/components/CategoryTree";
import { ICategoryTree } from "@/app/(main)/categories/utils/types";
import { ICustomError } from "@/utils/global-types";
import DnDCategoryTree from "@/app/(main)/categories/components/DnDCategoryTree";

async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["category"] },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw await res.json();
  }
  const categories: { categoryTree: ICategoryTree[] } = await res.json();
  return categories.categoryTree;
}

export default async function CategoriesPage() {
  let categories: ICategoryTree[] = [
    {
      name: "Ares Gym Store Categories",
      description: "Hamza, this is for the top categories",
    },
  ];
  try {
    categories[0].children = await getCategories();
  } catch (error: ICustomError) {
    console.log(error);
  }
  return (
    <section className={"flex flex-1 flex-col"}>
      <header>Dashboard Categories</header>
      <DnDCategoryTree categories={categories} />
      {/*<CategoryD3Tree />*/}
    </section>
  );
}
