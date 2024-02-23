"use client";

import { ICategory, ICategoryTree } from "@/app/(main)/categories/_utils/types";
import { ICustomError } from "@/utils/global-types";

import {
  renderCategoryOptions,
  transformCategoryTreeToSelectOption,
} from "@/app/(main)/categories/_utils/helpers";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CategorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TFormCategoryProps = {
  title: string;
  actionCategory: (params: any) => Promise<ICustomError>; // createCategory or updateCategory action server
  categories: ICategoryTree[];
  categoryToEdit?: ICategory;
};

export default function FormCategory(props: TFormCategoryProps) {
  const [isPending, startTransition] = useTransition();
  const [selectableParentCategory, setSelectableParentCategory] =
    useState<boolean>(
      props.categoryToEdit && props.categoryToEdit.parent ? false : true,
    );
  const previousParentCategoryValue = useRef<string | null | undefined>(null);
  const [errorState, setErrorState] = useState<ICustomError | undefined>(
    undefined,
  );

  const defaultValues: z.infer<typeof CategorySchema> = { name: "" };
  if (props.categoryToEdit) {
    defaultValues.name = props.categoryToEdit.name;
    defaultValues.parent = props.categoryToEdit.parent
      ? typeof props.categoryToEdit.parent === "string"
        ? props.categoryToEdit.parent
        : props.categoryToEdit.parent._id
      : undefined;
    defaultValues.description = props.categoryToEdit?.description;
  }

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(input: z.infer<typeof CategorySchema>) {
    setErrorState(undefined);
    startTransition(() => {
      const id = props.categoryToEdit ? props.categoryToEdit._id : undefined;
      props.actionCategory({ id, input }).then((err) => setErrorState(err));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl flex-col items-center gap-y-8 rounded p-4"
      >
        <div className="flex w-full items-center justify-center">
          <p className="text-3xl font-semibold capitalize">{props.title}</p>
        </div>
        <div className="w-full space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Whey"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Try to give this category an appropriate name.
                </FormDescription>
                <FormMessage>{errorState?.errors?.name}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <div className="flex w-full items-center justify-between">
                  <p className="text-xs">
                    If you want to set this category to the highest level
                    (without parent), activate this switch.
                  </p>
                  <Switch
                    checked={selectableParentCategory}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        previousParentCategoryValue.current =
                          form.getValues("parent");
                        form.setValue("parent", null);
                      } else {
                        form.setValue(
                          "parent",
                          previousParentCategoryValue.current,
                        );
                      }
                      setSelectableParentCategory(checked);
                    }}
                  />
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ? field.value : undefined}
                  disabled={selectableParentCategory}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Whey" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {renderCategoryOptions(
                      props.categories.map(transformCategoryTreeToSelectOption),
                    )}
                  </SelectContent>
                </Select>
                <FormDescription className="w-full">
                  Select a parent for the current category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Whey protein is a high-quality, easily digestible supplement derived from milk, renowned for supporting muscle growth, recovery, and overall health."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A description would be useful to have a more precise idea of
                  the type of food supplement.
                </FormDescription>
                <FormMessage>{errorState?.errors?.description}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormError message={errorState?.message} />
        <Button disabled={isPending} className="w-full">
          {isPending ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
