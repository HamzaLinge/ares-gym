import { getSupplements } from "@/actions/supplement";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Partial<Record<string, string>>;
}) {
  const supplements = await getSupplements(searchParams);
  console.log({ supplements });

  return (
    <section>
      <p>Shop Page</p>
    </section>
  );
}
