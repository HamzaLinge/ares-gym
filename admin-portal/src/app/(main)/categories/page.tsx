import Categories from "@/app/(main)/categories/_components/Categories";
import HeaderCategories from "@/app/(main)/categories/_components/HeaderCategories";
import { getCategories } from "@/app/(main)/categories/_utils/actions";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <section>
      <HeaderCategories />
      <Categories categories={categories} />
    </section>
  );
}
