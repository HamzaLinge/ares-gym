"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";

import { deleteSupplement } from "@/app/(main)/supplements/_utils/actions";

interface IDeleteSupplementProps {
  supplement: ISupplement;
}

export default function DeleteSupplement({
  supplement,
}: IDeleteSupplementProps) {
  const handleDeleteSupplement = async () => {
    const res = await deleteSupplement(supplement._id);
    if (res && !res.success) {
      toast.error("Error Deletion", {
        className: "!bg-bg-100",
        description: res.error.message,
      });
    }
  };
  return <Button onClick={handleDeleteSupplement}>Delete Supplement</Button>;
}
