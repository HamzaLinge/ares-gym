"use client";

import React from "react";
import CategoryTree from "@/app/(main)/categories/components/CategoryTree";

export default function DnDCategoryTree({ categories }) {
  return <CategoryTree categories={categories} />;
}
