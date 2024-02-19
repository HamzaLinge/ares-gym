import FormCategory from "@/app/(main)/categories/_components/FormCategory";
import {
  getCategories,
  getCategoryById,
  updateCategory,
} from "@/app/(main)/categories/_utils/actions";

export default async function EditCategoryPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const category = await getCategoryById(categoryId);
  const categories = await getCategories();
  return (
    <section className="flex w-full flex-col items-center">
      <FormCategory
        title="Edit Category"
        actionCategory={updateCategory}
        categoryToEdit={category}
        categories={categories}
      />
    </section>
  );
}
