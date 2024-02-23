import FormCategory from "@/app/(main)/categories/_components/FormCategory";
import {
  createCategory,
  getCategories,
} from "@/app/(main)/categories/_utils/actions";

export default async function CreateCategoryPage() {
  const categories = await getCategories();

  return (
    <section className="flex w-full flex-col items-center">
      <FormCategory
        title={"Create new category"}
        actionCategory={createCategory}
        categories={categories}
      />
    </section>
  );
}
