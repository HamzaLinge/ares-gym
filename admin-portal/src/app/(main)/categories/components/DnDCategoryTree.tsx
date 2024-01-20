"use client";

import React from "react";
import { DndContext } from "@dnd-kit/core";

import CategoryTree from "@/app/(main)/categories/components/CategoryTree";

export default function DnDCategoryTree({ categories }) {
  return (
    <DndContext>
      <CategoryTree categories={categories} />
    </DndContext>
  );
}
