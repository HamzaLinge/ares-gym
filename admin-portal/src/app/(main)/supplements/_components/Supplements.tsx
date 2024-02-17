import CardSupplement from "@/app/(main)/supplements/_components/CardSupplement";
import { getSupplements } from "@/app/(main)/supplements/_utils/actions";

export default async function Supplements() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const supplements = await getSupplements();
  return (
    <div>
      <div
        className={
          "grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }
      >
        {supplements.map((product) => (
          <CardSupplement key={product._id} supplement={product} />
        ))}
      </div>
    </div>
  );
}
