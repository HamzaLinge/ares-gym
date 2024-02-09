import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import CardSupplement from "@/app/(main)/supplements/_components/CardSupplement";
import FilterSupplements from "@/app/(main)/supplements/_components/FilterSupplements";

interface SupplementsProps {
  supplements: ISupplement[];
}

export default function Supplements({ supplements }: SupplementsProps) {
  return (
    <div>
      <FilterSupplements />
      <div
        className={
          "grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }
      >
        {supplements.map((product) => (
          <CardSupplement key={product._id} supplement={product} />
        ))}
      </div>
    </div>
  );
}
