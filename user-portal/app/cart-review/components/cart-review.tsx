"use client";

import CartReviewCard from "@/app/cart-review/components/cart-review-card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store-provider";
import { formatPrice } from "@/utils/helpers";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";

function CartReview() {
  const shoppingCartSupplements = useCartStore((state) => state.supplements);
  if (shoppingCartSupplements.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <p className="text-sm italic">
          Uh, you didn't pick any supplements yet!
        </p>
        <Link href="/shop">
          <Button className="flex items-center gap-x-2">
            <HiOutlineShoppingBag className="h-5 w-5" />
            <span>Go to Shop</span>
          </Button>
        </Link>
      </div>
    );
  }

  const totalPrice = shoppingCartSupplements.reduce(
    (accumulator, { price, quantity }) => accumulator + price * quantity,
    0,
  );

  return (
    <div className="flex flex-col gap-y-6">
      <div className="space-y-4">
        {shoppingCartSupplements.map((cartSupplement) => (
          <CartReviewCard
            key={cartSupplement._id}
            cartSupplement={cartSupplement}
          />
        ))}
      </div>
      <p className="bg-card space-x-6 self-end rounded border p-2 font-semibold shadow-lg">
        <span>TOTAL:</span>
        <span>{formatPrice(totalPrice)}</span>
      </p>
      <Link href="/checkout">
        <Button size={"lg"} className="h-14 w-full">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}

export default CartReview;
