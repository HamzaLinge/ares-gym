"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store-provider";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi2";
import {
  MdOutlineShoppingCartCheckout,
  MdCleaningServices,
} from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ShoppingCartSupplementCard from "./shopping-cart-supplement-card";
import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function ShoppingCart() {
  const side = "right";
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { shoppingCartSupplements, clearCart } = useCartStore((state) => ({
    shoppingCartSupplements: state.supplements,
    clearCart: state.clearCart,
  }));
  const totalPrice = shoppingCartSupplements.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.quantity * currentValue.price,
    0,
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "relative",
            pathname.startsWith("/checkout") && "hidden",
          )}
        >
          <HiOutlineShoppingCart className="h-7 w-7" />
          <span className="absolute bottom-0 right-0 translate-x-2/3 ">
            ({shoppingCartSupplements.length})
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className="flex w-full max-w-sm flex-col sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-center gap-x-2 sm:justify-start">
            <HiOutlineShoppingCart className="h-7 w-7" />
            <span>Your Shopping Cart</span>
          </SheetTitle>
          <SheetDescription>
            {shoppingCartSupplements.length > 0
              ? "How about confirming your order"
              : "How about going shopping?"}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex w-full grow flex-col items-center">
          <div className="flex w-full grow flex-col gap-y-4">
            <div className="flex w-full flex-col gap-y-2">
              {shoppingCartSupplements.length === 0 ? (
                <div className="flex w-full justify-center">
                  <p className="italic">No supplements added</p>
                </div>
              ) : (
                shoppingCartSupplements.map((supplement) => (
                  <ShoppingCartSupplementCard
                    key={supplement._id}
                    supplement={supplement}
                    callback={() => setOpen(false)}
                  />
                ))
              )}
            </div>
            <div className="flex items-center justify-end gap-x-4 border-t py-2">
              <p>TOTAL:</p>
              <p className="font-semibold">{formatPrice(totalPrice)}</p>
            </div>
          </div>
          {shoppingCartSupplements.length > 0 && (
            <div className="flex w-full flex-col gap-y-2">
              <Link href="/cart-review">
                <Button
                  size="lg"
                  className="w-full space-x-2"
                  onClick={() => setOpen(false)}
                >
                  <HiShoppingCart className="h-5 w-5" />
                  <span>Cart Review</span>
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full space-x-2"
                onClick={() => {
                  clearCart();
                  setOpen(false);
                }}
              >
                <MdCleaningServices className="h-5 w-5" />
                <span>Clear</span>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ShoppingCart;
