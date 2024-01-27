import React from "react";
import CategoryTree from "@/app/(main)/categories/components/CategoryTree";
import ModalCategory from "@/app/(main)/categories/components/ModalCategory";

export default function DnDCategoryTree({ categories }) {
  return (
    <div>
      <ModalCategory />
      <CategoryTree categories={categories} />
    </div>
  );
}
