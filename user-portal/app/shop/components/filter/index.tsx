"use client";

import FilterForm from "@/app/shop/components/filter/FilterForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICategoryTree } from "@/types/category";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import SortForm from "./SortForm";

export default function Filter({
  categories,
}: {
  categories: ICategoryTree[];
}) {
  const side = "left";

  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  /**
   * I should put the global state URL's params here with useState, then declare a `filter` function and pass it to children
   */

  return (
    <div className="mb-4 flex w-full items-center justify-between">
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
          <FilterForm callback={close} categories={categories} />
        </SheetContent>
      </Sheet>
      <SortForm />
    </div>
  );
}
