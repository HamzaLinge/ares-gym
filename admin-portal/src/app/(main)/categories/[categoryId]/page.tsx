export default async function CategoryPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  return <section>Category Page: {categoryId}</section>;
}
