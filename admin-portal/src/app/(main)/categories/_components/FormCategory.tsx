"use client";

import { useFormState } from "react-dom";

import { ICategory } from "@/app/(main)/categories/_utils/types";
import { IErrorAPI } from "@/utils/global-types";

import BtnSubmit from "@/components/BtnSubmit";
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
import { Textarea } from "@/components/ui/textarea";
import { CategorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TFormCategoryProps = {
  actionCategory: (state: any, formData: FormData) => Promise<IErrorAPI>; // createCategory or updateCategory action server
} & ({ idCategoryParent: string | undefined } | { categoryToEdit: ICategory });

export default function FormCategory(props: TFormCategoryProps) {
  const [stateFormCategory, actionFormCategory] = useFormState<
    IErrorAPI,
    FormData
  >(props.actionCategory, {
    id:
      "idCategoryParent" in props
        ? props.idCategoryParent
        : "categoryToEdit" in props
          ? props.categoryToEdit._id
          : undefined,
  });

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form
        action={actionFormCategory}
        className="w-full max-w-md space-y-8 rounded p-4"
      >
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    // disabled={isPending}
                    placeholder="Whey"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your admin email address.
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
                    placeholder="Whey protein is a high-quality, easily digestible supplement derived from milk, renowned for supporting muscle growth, recovery, and overall health."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your admin email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <BtnSubmit text="Save" />
      </form>
    </Form>
  );

  // return (
  //   <form
  //     action={actionFormCategory}
  //     className={cn(
  //       "border-l-bg-300 bg-bg-100 transition-height ml-6 flex w-full flex-col border-l transition-all duration-1000 ease-in-out",
  //     )}
  //   >
  //     <h1 className={"text-lg font-semibold"}>
  //       {!isToUpdate ? "create" : "edit"}
  //     </h1>
  //     <div className={"flex w-full flex-col gap-y-8"}>
  //       <div className={"relative w-full "}>
  //         <Input
  //           autoFocus
  //           onFocus={(e) => {
  //             const tmpValue = e.target.value;
  //             e.target.value = "";
  //             e.target.value = tmpValue;
  //           }}
  //           type="text"
  //           name="name"
  //           placeholder="Name"
  //           className={"bg-bg-100 text-text-100"}
  //           defaultValue={updatedCategory ? updatedCategory.name : ""}
  //         />
  //         <FormError messageError={stateFormCategory?.error?.errors?.name} />
  //       </div>
  //       <div className={"relative w-full"}>
  //         <Textarea
  //           type="text"
  //           name="description"
  //           placeholder="Description"
  //           className={"bg-bg-100 text-text-100"}
  //           defaultValue={
  //             updatedCategory
  //               ? updatedCategory.description
  //                 ? updatedCategory.description
  //                 : ""
  //               : ""
  //           }
  //         />
  //         <FormError
  //           messageError={stateFormCategory?.error?.errors?.description}
  //         />
  //       </div>
  //     </div>
  //     <div className={"relative w-full"}>
  //       <div
  //         className={"relative flex w-full items-center justify-center gap-x-4"}
  //       >
  //         <Button type={"submit"} className={"w-1/3"}>
  //           Save
  //         </Button>
  //         <Button
  //           variant={"outline"}
  //           className={"absolute right-0"}
  //           // onClick={() => props.close()}
  //           type={"reset"}
  //           formNoValidate={true}
  //           aria-label="Cancel"
  //         >
  //           Cancel
  //         </Button>
  //       </div>
  //       <FormError withIcon>
  //         <p>{stateFormCategory?.error?.message}</p>
  //         <p>{stateFormCategory?.error?.errors?.parent}</p>
  //       </FormError>
  //     </div>
  //   </form>
  // );
}
