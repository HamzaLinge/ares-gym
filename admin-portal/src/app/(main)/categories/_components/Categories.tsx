import React from "react";
import CategoryTree from "@/app/(main)/categories/_components/CategoryTree";
import { getCategories } from "@/app/(main)/categories/_utils/actions";

export default async function Categories() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const categories = await getCategories();
  return <CategoryTree categories={categories} />;
}
