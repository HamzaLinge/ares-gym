import { Button } from "@/components/ui/button";
import { asUploadButton } from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { useBatchAddListener } from "@rpldy/uploady";

const ThumbnailsUploadButton = asUploadButton((props: any) => (
  <Button {...props} variant={"outline"} type="button">
    Upload Thumbnails
  </Button>
));

export default function ThumbnailsPicker({
  setValue,
}: {
  setValue: (files: File[]) => void;
}) {
  useBatchAddListener((batch, options) => {
    const newFiles = batch.items.map((item) => item.file) as File[];
    setValue(newFiles);

    //return false to cancel the batch
  });
  return (
    <>
      <ThumbnailsUploadButton />
      <UploadPreview fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg" />
    </>
  );
}
