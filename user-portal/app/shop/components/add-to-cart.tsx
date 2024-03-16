"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store-provider";
import { TSupplement } from "@/types/supplement";
import { toast } from "sonner";
import { HiPlusCircle, HiMinusCircle, HiTrash } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function AddToCart({ supplement }: { supplement: TSupplement }) {
  const {
    addSupplementToShoppingCart,
    selectedQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeSupplement,
  } = useCartStore((state) => ({
    addSupplementToShoppingCart: state.addSupplement,
    selectedQuantity:
      state.supplements.find((food) => food._id === supplement._id)?.quantity ||
      null,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
    removeSupplement: state.removeSupplement,
  }));

  const handleAddToCart = () => {
    addSupplementToShoppingCart(supplement);
    toast.info(
      `${supplement.name.toUpperCase()} has successfully added to your cart.`,
    );
  };

  const handleIncreaseQuantity = () => {
    increaseQuantity(supplement._id);
  };
  const handleDecreaseQuantity = () => {
    decreaseQuantity(supplement._id);
  };
  const handleRemoveSupplement = () => {
    removeSupplement(supplement._id);
    toast.warning(
      `Oh! You removed ${supplement.name.toUpperCase()} from your cart.`,
    );
  };

  return (
    <>
      {!selectedQuantity ? (
        <Button
          className="h-14 w-full uppercase tracking-wide"
          size={"lg"}
          onClick={handleAddToCart}
        >
          Add to Chart
        </Button>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Good Choice!</CardTitle>
            <CardDescription>Which Quantity do you need?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-14 w-full items-center justify-center gap-x-4">
              <Button
                onClick={handleDecreaseQuantity}
                size={"lg"}
                variant="outline"
                className="h-full"
                disabled={selectedQuantity === 1}
              >
                <HiMinusCircle className="h-7 w-7" />
              </Button>
              <Badge className="text-lg" variant={"outline"}>
                {selectedQuantity}
              </Badge>
              <Button
                onClick={handleIncreaseQuantity}
                size={"lg"}
                variant="outline"
                className="h-full"
              >
                <HiPlusCircle className="h-7 w-7" />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-x-2">
            <p className="text-sm">Do you want to cancel it?</p>
            <Button variant="ghost" onClick={handleRemoveSupplement}>
              <HiTrash className="text-destructive h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default AddToCart;
