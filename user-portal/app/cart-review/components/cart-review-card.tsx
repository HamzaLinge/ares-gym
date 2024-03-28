import { TCartSupplement } from "@/lib/store/cart-store";
import { formatPrice, getFileUrl } from "@/utils/helpers";
import Link from "next/link";
import Image from "next/image";
import CartReviewUpdate from "@/app/cart-review/components/cart-review-update";
import CartReviewDelete from "@/app/cart-review/components/cart-review-delete";

function CartReviewCard({
  cartSupplement,
}: {
  cartSupplement: TCartSupplement;
}) {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Link href={`/shop/${cartSupplement._id}`}>
        <div className={"relative aspect-square w-16 overflow-hidden rounded"}>
          <Image
            src={getFileUrl(cartSupplement.thumbnails)}
            alt={cartSupplement.name}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={
              "(max-width: 640px) 50vw, (max-width: 768px) 33.33vw, (max-width: 1024px) 25vw, 20vw"
            }
          />
        </div>
      </Link>
      <div className="flex grow flex-col text-sm">
        <div className="flex items-center justify-between gap-x-2">
          <h3 className="grow font-semibold capitalize">
            {cartSupplement.name}
          </h3>
          <div className="flex items-center gap-x-1">
            <CartReviewDelete cartSupplement={cartSupplement} />
            <CartReviewUpdate cartSupplement={cartSupplement} />
          </div>
        </div>
        <div className="flex justify-between gap-x-2">
          <p>{formatPrice(cartSupplement.price)}</p>
          <div className="flex flex-col items-end">
            <div>
              <p>x {cartSupplement.quantity}</p>
            </div>
            <p className="mt-2 border-t pt-2 font-semibold">
              {formatPrice(cartSupplement.price * cartSupplement.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartReviewCard;
