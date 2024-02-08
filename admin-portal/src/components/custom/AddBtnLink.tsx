import React from "react";
import Link from "next/link";

import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        type={"button"}
        className={cn("flex items-center gap-x-2", className)}
      >
        <PlusIcon className={"h-7 w-7"} />
        <p>{text}</p>
      </Button>
    </Link>
  );
}
