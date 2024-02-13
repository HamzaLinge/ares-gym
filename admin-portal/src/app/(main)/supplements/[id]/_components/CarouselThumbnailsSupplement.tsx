import Image from "next/image";

import { Carousel, CarouselItem } from "@/components/custom/Carousel";
import { getFileUrl } from "@/utils/helpers";
import { ISupplement } from "../../_utils/types";
import DeleteThumbnailSupplement from "./DeleteThumbnailSupplement";
import UploadThumbnailsSupplement from "./UploadThumbnailsSupplement";

export default function CarouselThumbnailsSupplement({
  supplement,
}: {
  supplement: ISupplement;
}) {
  if (
    !supplement.thumbnails ||
    (supplement.thumbnails && supplement.thumbnails.length === 0)
  ) {
    return <UploadThumbnailsSupplement supplement={supplement} />;
  }

  return (
    <div className={"flex flex-col items-center w-full max-w-lg"}>
      <UploadThumbnailsSupplement supplement={supplement} />
      <Carousel>
        {supplement.thumbnails.map((thumbnail) => (
          <CarouselItem key={thumbnail}>
            <div className={"relative"}>
              <Image
                src={getFileUrl(thumbnail)}
                alt={""}
                width={1280}
                height={1080}
                sizes={
                  "(max-width: 640px) 100vw, (max-width: 1080px) 66.66vw, 50vw"
                }
                className={"border-[4px] border-white rounded"}
              />
              <DeleteThumbnailSupplement
                idThumbnail={thumbnail}
                supplement={supplement}
              />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}
