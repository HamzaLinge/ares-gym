import React from "react";
import CategoryTree from "@/app/(main)/categories/_components/CategoryTree";

export default function Categories({ categories }) {
  return (
    <div>
      <CategoryTree categories={categories} />
    </div>
  );
}
