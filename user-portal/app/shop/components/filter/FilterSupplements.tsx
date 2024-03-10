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
import { FilterSupplementsSchema } from "@/schemas/supplement";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FilterSupplements({
  callback,
}: {
  callback: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  let defaultValues: z.infer<typeof FilterSupplementsSchema> = {};
  searchParams.forEach((value, key) => {
    defaultValues = { ...defaultValues, [key]: parseInt(value) };
  });

  // console.log({ defaultValues });

  const form = useForm<z.infer<typeof FilterSupplementsSchema>>({
    resolver: zodResolver(FilterSupplementsSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof FilterSupplementsSchema>) {
    startTransition(() => {
      const url = Object.entries(values).reduce((accumulator, currentValue) => {
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
        <div className="space-y-4">
          <h1>Filter by Price</h1>
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

        <Button disabled={isPending} className="w-full">
          {isPending ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            "Filter"
          )}
        </Button>
      </form>
    </Form>
  );
}
