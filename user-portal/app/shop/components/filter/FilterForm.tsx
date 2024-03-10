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
import { FilterSupplementsSchema } from "@/schemas/supplement";
import { ICategoryTree } from "@/types/category";
import {
  renderCategoryOptions,
  transformCategoryTreeToSelectOption,
} from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FilterForm({
  callback,
  categories,
}: {
  callback: () => void;
  categories: ICategoryTree[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  let defaultValues: z.infer<typeof FilterSupplementsSchema> = {};
  searchParams.forEach((value, key) => {
    switch (key) {
      case "minPrice":
        defaultValues = { ...defaultValues, minPrice: parseInt(value) };
        break;
      case "maxPrice":
        defaultValues = { ...defaultValues, maxPrice: parseInt(value) };
        break;
      case "category":
        defaultValues = { ...defaultValues, category: value };
    }
  });
  // console.log({ defaultValues });

  const form = useForm<z.infer<typeof FilterSupplementsSchema>>({
    resolver: zodResolver(FilterSupplementsSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof FilterSupplementsSchema>) {
    startTransition(() => {
      const url = Object.entries(values).reduce((accumulator, currentValue) => {
        if (!currentValue[1]) return accumulator;
        const hasQueryParams = /\?.+/;
        if (hasQueryParams.test(accumulator)) {
          return accumulator + `&${currentValue[0]}=${currentValue[1]}`;
        }
        return accumulator + `?${currentValue[0]}=${currentValue[1]}`;
      }, "/shop");
      router.push(url);
      callback();
    });
  }

  return (
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
                <FormDescription>Choose a category to filter</FormDescription>
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
            onClick={() => router.push("/shop")}
          >
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
}
