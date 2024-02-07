"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

import colors from "@/styles/colors";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TBtnSubmitProps = {
  text?: string;
  className?: string;
};

export default function BtnSubmit({ text, className }: TBtnSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <Button variant={"primary"} disabled={pending} className={cn(className)}>
      {pending ? (
        <ClipLoader color={colors.bg["100"]} size={25} />
      ) : text ? (
        text
      ) : (
        "Save"
      )}
    </Button>
  );
}
