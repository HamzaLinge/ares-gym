import React from "react";
import { routePaths } from "@/utils/route-paths";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function AddLink({ text, className }: { text: string; className?: string }) {
  return (
    <Link href={routePaths.categories.children.create.path()}>
      <Button
        variant={"primary"}
        type={"button"}
        className={cn("flex items-center gap-x-2", className)}
      >
        <PlusIcon className={"h-7 w-7"} />
        <p>{text}</p>
      </Button>
    </Link>
  );
}

export default async function HeaderCategories() {
  return (
    <header className={"flex items-center"}>
      <AddLink text={"New Category!"} />
      <div className={"ml-4 border border-l"}>Dashboard Categories</div>
    </header>
  );
}
