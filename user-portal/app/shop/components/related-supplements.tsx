import { getSupplements } from "@/actions/supplement";
import ShopCard from "./shop-card";

export default async function RelatedSupplements({
  categoryId,
  excludeId,
}: {
  categoryId?: string;
  excludeId: string;
}) {
  if (!categoryId) return null;

  const relatedSupplements = await getSupplements({
    category: categoryId,
    limit: 4,
    excludeId,
  });

  return (
    <div className="space-y-4">
      <h1 className="w-full text-center text-3xl">Maybe you'll like these</h1>
      {relatedSupplements.length === 0 ? (
        <p className="flex items-center justify-center gap-x-2">
          <span className="italic">
            Uh, it seems there are no related supplements yet!
          </span>
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
          {relatedSupplements.map((relatedSupplement) => (
            <ShopCard
              key={relatedSupplement._id}
              supplement={relatedSupplement}
            />
          ))}
        </div>
      )}
    </div>
  );
}
