import FormProduct from "@/app/(main)/products/new/components/FormProduct";
import { getCategories } from "@/app/(main)/categories/utils/actions";

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <section>
      <FormProduct categories={categories} />
    </section>
  );
}
