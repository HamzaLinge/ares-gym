import FilterSupplements from "@/app/shop/components/filter-supplements";
import Supplements from "@/app/shop/components/Supplements";
import TitlePage from "@/components/title-page";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Partial<Record<string, string>>;
}) {
  return (
    <section className="space-y-6 p-2 pt-4">
      <TitlePage title="Shop" />
      <FilterSupplements />
      <Supplements searchParams={searchParams} />
    </section>
  );
}
