import { getCategories } from "@/app/(main)/categories/_utils/actions";
import FormSupplement from "@/app/(main)/supplements/_components/FormSupplement";
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
      <FormSupplement
        title={"Create New Supplement"}
        actionSupplement={createSupplement}
        categories={categories}
      />
    </section>
  );
}
