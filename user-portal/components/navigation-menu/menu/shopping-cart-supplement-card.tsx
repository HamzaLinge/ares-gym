import { TCartSupplement } from "@/lib/store/cart-store";
import { formatPrice, getFileUrl } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

function ShoppingCartSupplementCard({
  supplement,
  callback,
}: {
  supplement: TCartSupplement;
  callback: () => void;
}) {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Link href={`/shop/${supplement._id}`} onClick={callback}>
        <div className={"relative aspect-square w-16 overflow-hidden rounded"}>
          <Image
            src={getFileUrl(supplement.thumbnails)}
            alt={supplement.name}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={
              "(max-width: 640px) 50vw, (max-width: 768px) 33.33vw, (max-width: 1024px) 25vw, 20vw"
            }
          />
        </div>
      </Link>
      <div className="flex grow items-center justify-between">
        <Link href={`/shop/${supplement._id}`} onClick={callback}>
          <h3 className="font-semibold capitalize">{supplement.name}</h3>
        </Link>
        <p className="text-sm">
          {supplement.quantity} x {formatPrice(supplement.price)}
        </p>
      </div>
    </div>
  );
}

export default ShoppingCartSupplementCard;
