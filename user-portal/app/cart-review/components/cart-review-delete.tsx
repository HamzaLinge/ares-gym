"use client";

import { TCartSupplement } from "@/lib/store/cart-store";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store-provider";

function CartReviewDelete({
  cartSupplement,
}: {
  cartSupplement: TCartSupplement;
}) {
  const removeSupplement = useCartStore((state) => state.removeSupplement);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-destructive hover:text-destructive"
        >
          <RiDeleteBin6Fill className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to remove {cartSupplement.name.toUpperCase()} from
            your cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, I'm not</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => removeSupplement(cartSupplement._id)}
          >
            I'm sure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CartReviewDelete;
