import React from "react";
import CategoryTree from "@/app/(main)/categories/_components/CategoryTree";
import { ICategoryTree } from "../_utils/types";

export default function Categories({
  categories,
}: {
  categories: ICategoryTree[];
}) {
  return <CategoryTree categories={categories} />;
}
