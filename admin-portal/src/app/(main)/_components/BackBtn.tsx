import React from "react";
import Link from "next/link";

import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

type TBackBtnProps = {
  href: string;
  className?: string;
};

export default function BackBtn({ href, className = "" }: TBackBtnProps) {
  return (
    <Link href={href}>
      <Button variant={"default"} className={className}>
        <ChevronLeftIcon />
      </Button>
    </Link>
  );
}
