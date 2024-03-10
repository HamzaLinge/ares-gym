"use client";

import FilterSupplements from "@/app/shop/components/filter/FilterSupplements";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Filter() {
  const side = "left";

  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"} className="space-x-2">
          <MixerHorizontalIcon className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-full max-w-sm px-0">
        <SheetHeader className="p-4 pt-0">
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            Set the following parameters to filter your result.
          </SheetDescription>
        </SheetHeader>
        <FilterSupplements callback={close} />
      </SheetContent>
    </Sheet>
  );
}
