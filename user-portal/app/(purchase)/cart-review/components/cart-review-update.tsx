"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TCartSupplement } from "@/lib/store/cart-store";
import { useCartStore } from "@/lib/store/cart-store-provider";
import { HiPencil, HiChevronRight, HiChevronLeft } from "react-icons/hi2";

function CartReviewUpdate({
  cartSupplement,
}: {
  cartSupplement: TCartSupplement;
}) {
  const { increaseQuantity, decreaseQuantity } = useCartStore((state) => ({
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HiPencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How much Quantity do you want?</DialogTitle>
          <DialogDescription>
            Choose how much{" "}
            <span className="uppercase">{cartSupplement.name}</span> you want to
            take.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex items-center justify-center gap-x-6">
          <Button
            variant={"ghost"}
            size={"icon"}
            disabled={cartSupplement.quantity === 1}
            onClick={() => decreaseQuantity(cartSupplement._id)}
          >
            <HiChevronLeft className="h-7 w-7" />
          </Button>
          <Badge variant={"outline"} className="text-md">
            x {cartSupplement.quantity}
          </Badge>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => increaseQuantity(cartSupplement._id)}
          >
            <HiChevronRight className="h-7 w-7" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CartReviewUpdate;
