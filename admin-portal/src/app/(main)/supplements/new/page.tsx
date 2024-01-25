import FormSupplement from "@/app/(main)/supplements/components/FormSupplement";
import { getCategories } from "@/app/(main)/categories/utils/actions";

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <section>
      <FormSupplement categories={categories} />
    </section>
  );
}
