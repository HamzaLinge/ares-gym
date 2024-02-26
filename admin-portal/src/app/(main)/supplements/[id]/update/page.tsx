import React from "react";
import { getCategories } from "@/app/(main)/categories/_utils/actions";
import {
  getSupplementById,
  updateSupplement,
} from "@/app/(main)/supplements/_utils/actions";
import { CustomClassErrorApi } from "@/lib/exceptions";
import FormSupplement from "@/app/(main)/supplements/_components/FormSupplement";

export default async function UpdateSupplementPage({
  params,
}: {
  params: { id: string };
}) {
  const categories = await getCategories();
  const supplement = await getSupplementById(params.id);
  return (
    <section>
      <FormSupplement
        title={`Update ${supplement.name.toUpperCase()} Supplement`}
        actionSupplement={updateSupplement}
        categories={categories}
        supplementToUpdate={supplement}
      />
    </section>
  );
}
