"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type TBtnSubmitProps = {
  text?: string;
};

export default function BtnSubmit({ text }: TBtnSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : text ? (
        text
      ) : (
        "Submit"
      )}
    </Button>
  );
}
