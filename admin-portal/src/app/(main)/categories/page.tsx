import React from "react";
import CategoryD3Tree from "@/app/(main)/categories/components/CategoryD3Tree";

export default function CategoriesPage() {
  return (
    <div className={"flex flex-1 flex-col"}>
      <h1>Categories Page</h1>
      <CategoryD3Tree />
    </div>
  );
}
