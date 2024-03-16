"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store";
import { TSupplement } from "@/types/supplement";

function AddToCart({ supplement }: { supplement: TSupplement }) {
  const addSupplementToShoppingCart = useCart((state) => state.addSupplement);

  return (
    <Button
      className="h-14 w-full uppercase tracking-wide"
      size={"lg"}
      onClick={() => addSupplementToShoppingCart(supplement)}
    >
      Add to Chart
    </Button>
  );
}

export default AddToCart;
