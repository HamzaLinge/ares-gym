import { ISupplement } from "@/app/(main)/supplements/_types";
import CardSupplement from "@/app/(main)/supplements/_components/CardSupplement";
import FilterSupplements from "@/app/(main)/supplements/_components/FilterSupplements";

interface SupplementsProps {
  supplements: ISupplement[];
}

export default function Supplements({ supplements }: SupplementsProps) {
  return (
    <div>
      <FilterSupplements />
      <div className={"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"}>
        {supplements.map((product) => (
          <CardSupplement key={product._id} supplement={product} />
        ))}
      </div>
    </div>
  );
}
