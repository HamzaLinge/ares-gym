"use client";

import {
  renderCategoryOptions,
  transformCategoryTreeToSelectOption,
} from "@/app/(main)/categories/_utils/helpers";
import { ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import FormError from "@/components/form-error";
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
import { Textarea } from "@/components/ui/textarea";
import { SupplementSchema } from "@/schemas";
import { ICustomError } from "@/utils/global-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { asUploadButton } from "@rpldy/upload-button";
import Uploady from "@rpldy/uploady";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ThumbnailsPicker from "./ThumbnailsPicker";
import { inspectFormData } from "@/utils/data-form";

type TFormProductProps = {
  categories: ICategoryTree[];
  actionSupplement: (params: any) => Promise<ICustomError>;
  supplementToEdit?: ISupplement;
  title: string;
};

export default function FormSupplement({
  categories,
  actionSupplement,
  supplementToEdit,
  title,
}: TFormProductProps) {
  const [error, setError] = useState<ICustomError | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SupplementSchema>>({
    resolver: zodResolver(SupplementSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "0",
      stock: "0",
    },
  });

  async function onSubmit(input: z.infer<typeof SupplementSchema>) {
    setError(undefined);
    startTransition(() => {
      actionSupplement(input).then((err) => setError(err));
    });
  }

  const handleSelectedFiles = (files?: File[]) => {
    if (files && Array.isArray(files) && files.length > 0) {
      files.forEach((file) => {
        const previousFiles = form.getValues("files") || [];
        form.setValue("files", [...previousFiles, file]);
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl flex-col items-center gap-y-8 rounded p-4 lg:max-w-3xl"
      >
        <div className="flex w-full items-center justify-center">
          <p className="text-3xl font-semibold capitalize">{title}</p>
        </div>
        <div className="flex w-full flex-col gap-y-4 lg:flex-row lg:gap-x-4 lg:gap-y-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="BCAA" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a new supplement food name.
                </FormDescription>
                <FormMessage>{error?.errors?.name}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
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
                  Select an appropriate category.
                </FormDescription>
                <FormMessage>{error?.errors?.category}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-y-4 lg:flex-row lg:gap-x-4 lg:gap-y-0">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    disabled={isPending}
                    placeholder="4000"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter a valuable price.</FormDescription>
                <FormMessage>{error?.errors?.price}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    disabled={isPending}
                    placeholder="10"
                    {...field}
                  />
                </FormControl>
                <FormDescription>How many?</FormDescription>
                <FormMessage>{error?.errors?.stock}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="text-xs"
                    disabled={isPending}
                    placeholder="BCAA supplements are a group of three essential amino acids—leucine, isoleucine, and valine—used to support muscle recovery and enhance exercise performance."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A pertinent description may help the client to decide.
                </FormDescription>
                <FormMessage>{error?.errors?.description}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Uploady noPortal autoUpload={false} multiple>
          <ThumbnailsPicker setValue={handleSelectedFiles} />
        </Uploady>
        <FormError message={error?.message} />
        <Button disabled={isPending} className="w-full">
          {isPending ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
