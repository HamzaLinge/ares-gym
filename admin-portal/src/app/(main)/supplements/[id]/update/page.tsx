import React from "react";
import { getCategories } from "@/app/(main)/categories/_utils/actions";
import {
  getSupplementById,
  updateSupplement,
} from "@/app/(main)/supplements/_utils/actions";
import { CustomClassErrorApi } from "@/lib/exceptions";
import FormSupplement from "@/app/(main)/supplements/_components/FormSupplement";

interface IUpdateSupplementPage {
  params: { id: string };
}

export default async function UpdateSupplementPage({
  params,
}: IUpdateSupplementPage) {
  console.log(params);

  const fetchedCategories = await getCategories();
  if (!fetchedCategories.success) {
    console.error(fetchedCategories);
    throw new CustomClassErrorApi(fetchedCategories);
  }
  const categories = fetchedCategories.data.categoryTree;
  const supplement = await getSupplementById(params.id);
  return (
    <section>
      <FormSupplement
        title={`Update ${supplement.name} Supplement`}
        actionSupplement={updateSupplement}
        categories={categories}
        supplement={supplement}
      />
    </section>
  );
}
