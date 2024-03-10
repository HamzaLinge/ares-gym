import { getCategories } from "@/actions/category";
import Filter from "@/app/shop/components/filter";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <section className="p-2">
      <Filter categories={categories} />
      <main>{children}</main>
    </section>
  );
}
