import DeleteAlert from "@/components/custom/DeleteAlert";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteThumbnailSupplement } from "../../_utils/actions";
import { ISupplement } from "../../_utils/types";

type TDeleteThumbnailSupplement = {
  supplement: ISupplement;
  idThumbnail: string;
};

export default function DeleteThumbnailSupplement({
  supplement,
  idThumbnail,
}: TDeleteThumbnailSupplement) {
  const triggerElement = (
    <TrashIcon
      className={
        "absolute top-2 right-2 w-8 h-8 p-1 rounded-full text-red-800 bg-slate-100 bg-opacity-50 hover:cursor-pointer hover:bg-opacity-75"
      }
    />
  );
  return (
    <DeleteAlert
      input={{ idThumbnail, idSupplement: supplement._id }}
      deleteWhat={`this ${supplement.name} Thumbnail`}
      deleteAction={deleteThumbnailSupplement}
      triggerElement={triggerElement}
    />
  );
}
