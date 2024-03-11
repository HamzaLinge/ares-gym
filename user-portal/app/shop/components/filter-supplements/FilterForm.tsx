"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSupplementsSchema } from "@/schemas/supplement";
import { ICategoryTree } from "@/types/category";
import {
  createQueryURL,
  renderCategoryOptions,
  transformCategoryTreeToSelectOption,
} from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { MixerHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FilterFormFields = {
  MIN_PRICE: "minPrice",
  MAX_PRICE: "maxPrice",
  CATEGORY: "category",
};

export default function FilterForm({
  categories,
}: {
  categories: ICategoryTree[];
}) {
  const side = "left";

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValues: z.infer<typeof FilterSupplementsSchema> = Array.from(
    searchParams.entries(),
  ).reduce((accumulator, [key, value]) => {
    if (!value) return accumulator;
    switch (key) {
      case FilterFormFields.MIN_PRICE:
        accumulator = { ...accumulator, [key]: parseInt(value) };
        break;
      case FilterFormFields.MAX_PRICE:
        accumulator = { ...accumulator, [key]: parseInt(value) };
        break;
      case FilterFormFields.CATEGORY:
        accumulator = { ...accumulator, [key]: value };
    }
    return accumulator;
  }, {});

  const form = useForm<z.infer<typeof FilterSupplementsSchema>>({
    resolver: zodResolver(FilterSupplementsSchema),
    defaultValues: selectedValues,
  });

  async function onSubmit(values: z.infer<typeof FilterSupplementsSchema>) {
    startTransition(() => {
      router.push(createQueryURL(values));
      setOpen(false);
    });
  }

  const clear = () => {
    const withoutFilterFormFields = Array.from(searchParams.entries())
      .filter(([key, value]) => !Object.values(FilterFormFields).includes(key))
      .reduce(
        (accumulator, [key, value]) => ({ ...accumulator, [key]: value }),
        {},
      );

    router.push(createQueryURL(withoutFilterFormFields));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="space-x-2">
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-8 rounded p-4"
          >
            <div className="space-y-2">
              <h1 className="text-lg font-semibold">by Category</h1>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Whey" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {renderCategoryOptions(
                          categories.map(transformCategoryTreeToSelectOption),
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a category to filter
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-lg font-semibold">by Price</h1>
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="1500"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Set a minimum price</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder={"20000"}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Set a maximum price</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Button disabled={isPending} className="w-full">
                {isPending ? (
                  <ReloadIcon className="h-4 w-4 animate-spin" />
                ) : (
                  "Filter"
                )}
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className="w-full"
                onClick={clear}
              >
                Clear
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
