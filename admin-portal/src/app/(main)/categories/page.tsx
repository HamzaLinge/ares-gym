// "use client";

import React from "react";
import { DndContext } from "@dnd-kit/core";

import CategoryTree from "@/app/(main)/categories/components/CategoryTree";
import { ICategoryTree } from "@/app/(main)/categories/utils/types";
import { ICustomError } from "@/utils/global-types";
import DnDCategoryTree from "@/app/(main)/categories/components/DnDCategoryTree";
import { getCategories } from "@/app/(main)/categories/utils/actions";

export default async function CategoriesPage() {
  let categories: ICategoryTree[] = [];
  // let categories: ICategoryTree[] = [
  //   {
  //     _id: null,
  //     name: "Ares Gym Store Categories",
  //     description: "Hamza, this is for the top categories",
  //   },
  // ];
  try {
    categories = await getCategories();
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
