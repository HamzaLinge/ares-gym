"use client";

import { useFormState } from "react-dom";

import { ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import { ICustomError, IErrorAPI } from "@/utils/global-types";
import { isCategory } from "@/utils/helpers";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { SupplementSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import FormError from "@/components/form-error";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  renderCategoryOptions,
  transformCategoryTreeToSelectOption,
} from "@/app/(main)/categories/_utils/helpers";

type TFormProductProps = {
  categories: ICategoryTree[];
  actionSupplement: (params: any) => Promise<ICustomError>;
  supplement?: ISupplement;
  title: string;
};

export default function FormSupplement({
  categories,
  actionSupplement,
  supplement,
  title,
}: TFormProductProps) {
  const [error, setError] = useState<ICustomError | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SupplementSchema>>({
    resolver: zodResolver(SupplementSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      stock: "",
    },
  });

  function inspectFormData(formData: FormData) {
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  }

  async function onSubmit(input: z.infer<typeof SupplementSchema>) {
    setError(undefined);
    startTransition(() => {
      let formData = new FormData();
      for (const [key, value] of Object.entries(input)) {
        formData.append(key, value);
      }
      inspectFormData(formData);

      // actionSupplement(input).then((err) => setError(err));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl flex-col items-center gap-y-8 rounded p-4"
      >
        <div className="flex w-full items-center justify-center">
          <p className="text-3xl font-semibold capitalize">{title}</p>
        </div>
        <div className="flex w-full flex-col gap-y-4 lg:flex-row lg:gap-x-4 lg:gap-y-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="BCAA" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the new supplement food name.
                </FormDescription>
                <FormMessage>{error?.errors?.name}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    // type="number"
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
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    // type="number"
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
        <FormError message={error?.message} />
        <Button disabled={isPending} className="w-full">
          {isPending ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>

        {/* OLD */}
        {/* {title ? (
          <h1 className="text-xl font-semibold capitalize">{title}</h1>
        ) : null}
        <div className={"flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2"}>
          <FormField
            typeField={"text"}
            messageError={stateFormSupplement?.error?.errors?.name}
            textProps={{
              name: "name",
              placeholder: "Name",
              required: true,
              defaultValue: supplement ? supplement.name : undefined,
            }}
          />
          <FormField
            typeField={"select"}
            messageError={stateFormSupplement?.error?.errors?.category}
            selectProps={{
              options: categories.map(transformCategoryTreeToSelectOption),
              name: "category",
              placeholder: "Select Category",
              label: "Category",
              required: true,
              defaultValue: supplement?.category
                ? isCategory(supplement.category)
                  ? supplement.category._id
                  : supplement.category
                : undefined,
            }}
          />
        </div>
        <div className={"flex w-full flex-col gap-y-2 md:flex-row md:gap-x-2"}>
          <FormField
            typeField={"text"}
            messageError={stateFormSupplement?.error?.errors?.price}
            textProps={{
              name: "price",
              placeholder: "Price",
              required: true,
              defaultValue: supplement ? supplement.price : undefined,
            }}
          />
          <FormField
            typeField={"text"}
            messageError={stateFormSupplement?.error?.errors?.stock}
            textProps={{
              name: "stock",
              placeholder: "Stock",
              defaultValue: supplement ? supplement.stock : undefined,
            }}
          />
        </div>
        <FormField
          typeField={"textarea"}
          messageError={stateFormSupplement?.error?.errors?.description}
          textareaProps={{
            name: "description",
            placeholder: "Description",
            defaultValue: supplement ? supplement.description : undefined,
          }}
        />
        {!supplement && (
          <FormField
            typeField={"filepicker"}
            filepickerProps={{
              name: "files",
              label: "Thumbnails",
              placeholder: "Select Thumbnail",
              multiple: true,
              accept: "image/*",
            }}
          />
        )}

        <FormField
          typeField={"submit"}
          messageError={stateFormSupplement?.error?.message}
        /> */}
      </form>
    </Form>
  );
}
