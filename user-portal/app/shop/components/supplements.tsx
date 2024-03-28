import { getSupplements } from "@/actions/supplement";
import ShopCard from "@/app/shop/components/shop-card";

export default async function Supplements({
  searchParams,
}: {
  searchParams: Partial<Record<string, string>>;
}) {
  const supplements = await getSupplements(searchParams);

  return (
    <section className="grid flex-1 grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
      {supplements.map((supplement) => (
        <ShopCard key={supplement._id} supplement={supplement} />
      ))}
    </section>
  );
}
