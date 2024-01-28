import FormSupplement from "@/app/(main)/supplements/_components/FormSupplement";

import { getCategories } from "@/app/(main)/categories/_utils/actions";
import { createSupplement } from "@/app/(main)/supplements/_utils/actions";
import { CustomClassErrorApi } from "@/lib/exceptions";

export default async function CreateSupplementPage() {
  const fetchedCategories = await getCategories();
  if (!fetchedCategories.success) {
    console.error(fetchedCategories);
    throw new CustomClassErrorApi(fetchedCategories);
  }
  const categories = fetchedCategories.data.categoryTree;
  return (
    <section>
      <h1>Create New Supplement</h1>
      <FormSupplement
        actionSupplement={createSupplement}
        categories={categories}
      />
    </section>
  );
}
