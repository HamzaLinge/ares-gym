"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TBtnSubmitProps = {
  text?: string;
  className?: string;
};

export default function BtnSubmit({ text, className }: TBtnSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className={cn(className)}>
      {pending ? <ClipLoader size={25} /> : text ? text : "Save"}
    </Button>
  );
}
