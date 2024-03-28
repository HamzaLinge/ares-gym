"use client";

import { getSupplementsBySearchItem } from "@/actions/supplement";
import LoadingUI from "@/components/loading-ui";
import SearchSupplementCard from "@/components/navigation-menu/menu/search-supplement-card";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchSchema } from "@/schemas";
import { TSupplement } from "@/types/supplement";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlineSearchOff } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

function Search() {
  const side = "top";

  const [isPending, startTransition] = useTransition();
  const [supplements, setSupplements] = useState<TSupplement[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = form.watch("search");

  useEffect(() => {
    if (!isPending && searchValue && searchValue.length >= 3) {
      const handler = setTimeout(() => onSubmit({ search: searchValue }), 800);
      return () => clearTimeout(handler);
    }
  }, [searchValue]);

  const onSubmit = (data: z.infer<typeof SearchSchema>) => {
    startTransition(async () => {
      const res = await getSupplementsBySearchItem(data.search);
      if (!Array.isArray(res)) {
        toast.error(`Uh oh! ${res.message}.`, {
          description: res.errors?.search
            ? res.errors.search
            : "There was a problem with your search request.",
        });
      } else {
        setSupplements(res);
      }
    });
  };

  const callback = () => {
    setOpen(false);
    setSupplements([]);
    form.reset();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <BsSearch className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="h-5/6 space-y-2">
        <SheetHeader>
          <SheetTitle>You want to find any particular complement?</SheetTitle>
        </SheetHeader>
        <div className="flex w-full flex-col gap-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Search</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center gap-x-2">
                        <div className="relative grow">
                          <Input placeholder="Omega..." {...field} />
                          <HiOutlineXMark
                            className="text-foreground/75 hover:text-foreground absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 hover:cursor-pointer"
                            onClick={() => form.reset()}
                          />
                        </div>
                        <Button type="submit" variant={"ghost"} size={"icon"}>
                          <BsSearch className="h-6 w-6" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Start typing a supplement name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="space-y-2">
            {isPending ? (
              <LoadingUI />
            ) : searchValue.length >= 3 && supplements.length === 0 ? (
              <p className="flex w-full flex-col items-center gap-y-2 text-sm">
                <MdOutlineSearchOff className="h-10 w-10" />
                <span className="text-muted-foreground italic">No Match</span>
              </p>
            ) : (
              supplements.map((supplement) => (
                <SearchSupplementCard
                  key={supplement._id}
                  supplement={supplement}
                  callback={callback}
                />
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Search;
