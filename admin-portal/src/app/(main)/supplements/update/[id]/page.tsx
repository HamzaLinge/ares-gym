import React from "react";
import { getCategories } from "@/app/(main)/categories/utils/actions";
import {
  getSupplementById,
  updateSupplement,
} from "@/app/(main)/supplements/_actions";
import FormSupplement from "@/app/(main)/supplements/_components/FormSupplement";
import { ClassErrorApi } from "@/lib/exceptions";

interface IUpdateSupplementPage {
  params: { id: string };
}

export default async function UpdateSupplementPage({
  params,
}: IUpdateSupplementPage) {
  const fetchedCategories = await getCategories();
  if (!fetchedCategories.success) {
    console.error(fetchedCategories);
    throw new ClassErrorApi(fetchedCategories);
  }
  const categories = fetchedCategories.data.categoryTree;
  const supplement = await getSupplementById(params.id);
  return (
    <section>
      <h1>Update {supplement.name}</h1>
      <FormSupplement
        actionSupplement={updateSupplement}
        categories={categories}
        supplement={supplement}
      />
    </section>
  );
}
