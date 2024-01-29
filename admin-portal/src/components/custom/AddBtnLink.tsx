import Link from "next/link";
import { routePaths } from "@/utils/route-paths";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

type TAddBtnLinkProps = {
  path: string;
  text: string;
  className?: string;
};

export default function AddBtnLink({
  path,
  text,
  className,
}: TAddBtnLinkProps) {
  return (
    <Link href={path}>
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
