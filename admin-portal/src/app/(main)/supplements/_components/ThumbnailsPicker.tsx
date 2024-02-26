"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { asUploadButton } from "@rpldy/upload-button";
import UploadPreview, {
  PreviewComponentProps,
  PreviewType,
} from "@rpldy/upload-preview";
import { useBatchAddListener, useItemFinalizeListener } from "@rpldy/uploady";
import Image from "next/image";

const ThumbnailsUploadButton = asUploadButton((props: any) => (
  <Button {...props} variant={"outline"} type="button">
    Upload Thumbnails
  </Button>
));

interface TPreviewProps extends PreviewComponentProps {
  id: string;
  url: string;
  name: string;
  type: PreviewType;
  isFallback: boolean;
  removePreview: () => void;
}

const MyPreview = (props: TPreviewProps) => {
  return (
    <div className="bg-border relative flex flex-col items-start gap-y-2 rounded p-2">
      <Button
        size={"sm"}
        variant={"destructive"}
        className="bg-destructive/75 absolute right-0 top-0 z-10 aspect-square -translate-y-1/2 translate-x-1/2 p-1"
        onClick={() => props.removePreview()}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={props.url}
          alt={props.name}
          fill={true}
          style={{ objectFit: "cover" }}
          sizes={"100px"}
        />
      </div>
      <p className="text-xs font-semibold">{props.name}</p>
    </div>
  );
};

export default function ThumbnailsPicker({
  setValue,
}: {
  setValue: (files: File[]) => void;
}) {
  useBatchAddListener((batch, options) => {
    console.log(
      `batch ${batch.id} was just added with ${batch.items.length} items`,
    );
    const newFiles = batch.items.map((item) => item.file) as File[];
    setValue(newFiles);
    //return false to cancel the batch
  });

  useItemFinalizeListener((item, options) => {
    console.log(`item ${item.id} is done with state: ${item.state}`);
  });
  return (
    <>
      <ThumbnailsUploadButton />
      <div className="flex w-full flex-wrap items-start justify-center gap-6">
        <UploadPreview
          rememberPreviousBatches
          PreviewComponent={MyPreview}
          // previewComponentProps={{
          //   onLoad: (e) => console.log("Image loaded: ", e.target.src),
          // }}
        />
      </div>
    </>
  );
}
