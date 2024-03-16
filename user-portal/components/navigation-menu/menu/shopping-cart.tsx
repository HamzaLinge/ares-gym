"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store";
import { HiOutlineShoppingCart } from "react-icons/hi";

function ShoppingCart() {
  const cartLength = useCart((state) => state.supplements.length);

  return (
    <div className="relative">
      <Button variant={"ghost"} size={"icon"}>
        <HiOutlineShoppingCart className="h-7 w-7" />
      </Button>
      <span className="absolute bottom-0 right-0 translate-x-2/3 ">
        ({cartLength})
      </span>
    </div>
  );
}

export default ShoppingCart;
