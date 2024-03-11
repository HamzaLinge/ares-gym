import { getCategories } from "@/actions/category";
import FilterForm from "@/app/shop/components/filter-supplements/FilterForm";
import SortSupplements from "./SortSupplements";

export default async function FilterSupplements() {
  const categories = await getCategories();

  return (
    <div className="flex w-full items-center justify-between">
      <FilterForm categories={categories} />
      <SortSupplements />
    </div>
  );
}
