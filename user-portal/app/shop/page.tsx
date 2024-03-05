export default async function ShopPage({
  searchParams,
}: {
  searchParams: Partial<Record<string, string>>;
}) {
  console.log({ searchParams });

  return (
    <section>
      <p>Shop Page</p>
    </section>
  );
}
