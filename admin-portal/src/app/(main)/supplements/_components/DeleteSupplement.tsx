import { TrashIcon } from "@radix-ui/react-icons";

import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import { Button } from "@/components/ui/button";

import { deleteSupplement } from "@/app/(main)/supplements/_utils/actions";
import DeleteAlert from "@/components/custom/DeleteAlert";

interface IDeleteSupplementProps {
  supplement: ISupplement;
}

export default function DeleteSupplement({
  supplement,
}: IDeleteSupplementProps) {
  const triggerElement = (
    <Button variant={"destructive"}>
      <TrashIcon className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );

  return (
    <DeleteAlert
      id={supplement._id}
      name={supplement.name}
      deleteAction={deleteSupplement}
      triggerElement={triggerElement}
    />
  );
}
