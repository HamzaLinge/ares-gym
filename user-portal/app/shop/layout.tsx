import Filter from "@/app/shop/components/filter";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="p-2">
      <Filter />
      <main>{children}</main>
    </section>
  );
}
