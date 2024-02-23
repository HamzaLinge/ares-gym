import { getCategories } from "@/app/(main)/categories/_utils/actions";
import FormSupplement from "@/app/(main)/supplements/_components/FormSupplement";
import { createSupplement } from "@/app/(main)/supplements/_utils/actions";

export default async function CreateSupplementPage() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const categories = await getCategories();
  return (
    <section className="flex w-full flex-col items-center">
      <FormSupplement
        title={"Create New Supplement"}
        actionSupplement={createSupplement}
        categories={categories}
      />
    </section>
  );
}
