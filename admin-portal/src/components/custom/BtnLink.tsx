import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Link1Icon } from "@radix-ui/react-icons";

type TBtnLinkProps = {
  path: string;
  className?: string;
  children?: React.ReactNode;
};

export default function BtnLink({ path, className, children }: TBtnLinkProps) {
  return (
    <Link href={path}>
      <Button
        type={"button"}
        className={className ? className : ""}
        variant={"link"}
      >
        {children ? children : <Link1Icon className={"h-7 w-7"} />}
      </Button>
    </Link>
  );
}
